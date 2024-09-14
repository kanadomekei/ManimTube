import sys
import os

# srcディレクトリをPythonのモジュール検索パスに追加
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_create_video():
    file_path = os.path.join(os.path.dirname(__file__), "..", "demodata", "demo01_square_to_circle.py")
    with open(file_path, "rb") as file:
        response = client.post("/uploadcode/", files={"file": file})
    
    assert response.status_code == 200
    assert response.headers["content-type"] == "video/mp4"

if __name__ == "__main__":
    pytest.main([__file__])