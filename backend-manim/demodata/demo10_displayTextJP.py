from manim import *

config.background_color = WHITE
Mobject.set_default(color = BLACK)

Tex.set_default(tex_template=TexTemplate(
    tex_compiler="xelatex",
    output_format=".xdv",
    preamble=r"""
    \usepackage{amsmath}
    \usepackage{amssymb}
    \usepackage{xeCJK}
    \setCJKmainfont{IPAexMincho}
    \usepackage[utf8]{inputenc}
    """
))

class displayTextJP(Scene):
    def construct(self):
        # Create Text objects
        first_line = Text('Manimを使用して', font="IPAexMincho", font_size=36)
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