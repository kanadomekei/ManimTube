from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from starlette.background import BackgroundTask
from .manim_utils import create_video_from_code, configure_manim

def remove_file(path: str):
    os.remove(path)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可する場合
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def hello_world():
    return {"message": "http://localhost:10000/docs"}

@app.post("/uploadcode/")
async def create_video(file: UploadFile = File(...)):
    save_path = f"./saved_files/{file.filename}"
    os.makedirs(os.path.dirname(save_path), exist_ok=True)

    contents = await file.read()
    with open(save_path, "wb") as f:
        f.write(contents)
    
    video_paths = create_video_from_code(save_path)

    os.remove(save_path)
    
    if video_paths:
        # 動画ファイルを送信後に削除するバックグラウンドタスクを設定
        response = FileResponse(path=video_paths[0], filename=os.path.basename(video_paths[0]), media_type='video/mp4')
        response.background = BackgroundTask(remove_file, path=video_paths[0])
        return response
    else:
        return {"message": "動画の生成に失敗しました。"}

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=10000, reload=True)