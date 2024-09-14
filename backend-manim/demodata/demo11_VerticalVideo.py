from manim import *

config.background_color = WHITE
Mobject.set_default(color=BLACK)

Tex.set_default(tex_template=TexTemplate(
    tex_compiler="xelatex",  # xelatexに変更
    output_format=".xdv",    # .xdvに変更
    preamble=r"""
        \usepackage{amsmath}
        \usepackage{amssymb}
        \usepackage{xeCJK}
        \setCJKmainfont{Noto Sans CJK JP}
    """
))

class VerticalVideo(Scene):
    def construct(self):
        # Create Text objects
        first_line = Tex(r'\textrm{Manim\CJKfamily{を使用して}}')
        second_line = Text('クールなアニメーションを作成する')
        third_line = Text('自分で試してみてください', color=RED)

        # Position second line underneath first line
        second_line.next_to(first_line, DOWN)

        # Displaying text
        self.wait(1)
        self.play(Write(first_line), Write(second_line))
        self.wait(1)
        self.play(ReplacementTransform(first_line, third_line), FadeOut(second_line))
        self.wait(2)