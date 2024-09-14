from manim import *
import importlib.util
import inspect
import os

def configure_manim():
    config.disable_caching = True
    config.flush_cache = True
    config.background_color = BLACK
    config.frame_rate = 30
    config.pixel_width = 1280
    config.pixel_height = 720
    config.file_format = "gif"
    config.text_to_file = False
    config.tex_to_file = False

def get_classes_from_module(file_path):
    spec = importlib.util.spec_from_file_location("module.name", file_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return [obj for name, obj in inspect.getmembers(module, inspect.isclass) if obj.__module__ == module.__name__]

def create_video_from_code(code_file_path):
    configure_manim()
    file_path = os.path.abspath(code_file_path)
    classes = get_classes_from_module(file_path)
    video_paths = []

    for cls in classes:
        scene = cls()
        scene.render()
        movie_path = str(scene.renderer.file_writer.movie_file_path)
        video_paths.append(movie_path)

    return video_paths