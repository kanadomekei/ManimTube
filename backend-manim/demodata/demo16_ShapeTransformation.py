from manim import *

class ShapeTransformation(Scene):
    def construct(self):
        # 円と三角形を作成
        circle = Circle(radius=2, color=BLUE)
        triangle = Triangle(color=RED).scale(2)

        # 最初の形（円）を追加
        self.add(circle)

        # 1分間（60秒）のアニメーション
        for _ in range(30):  # 30回の変換で1分間
            # 円から三角形へ
            self.play(Transform(circle, triangle), run_time=1)
            # 三角形から円へ
            self.play(Transform(circle, Circle(radius=2, color=BLUE)), run_time=1)

        self.wait()