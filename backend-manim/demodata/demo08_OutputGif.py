from manim import *

class OutputGif(Scene):
    def construct(self):
        left_square = Square(color=RED, fill_opacity=0.4).shift(3 * LEFT)
        right_square = Square(color=BLUE, fill_opacity=0.8).shift(1 * RIGHT)
        self.play(
            left_square.animate.rotate(PI), Rotate(right_square, angle=PI), run_time=4
        )

        left_square2 = Square(color=BLUE, fill_opacity=0.8).shift(1 * LEFT)
        right_square2 = Square(color=BLUE, fill_opacity=0.3).shift(7 * RIGHT)
        self.play(Transform(left_square, left_square2))  # interpolate the square into the circle
        self.play(Transform(right_square, right_square2))  # interpolate the square into the circle

        self.play(
            left_square.animate.rotate(PI), Rotate(right_square, angle=PI), run_time=4
        )
        self.wait()