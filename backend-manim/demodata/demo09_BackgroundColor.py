from manim import *

config.background_color = WHITE
config["background_color"] = WHITE

class BackgroundColor(Scene):
    def construct(self):
        axes = Axes(
            x_range=[-4, 4],
            y_range=[-6, 6],
            axis_config={"color": BLUE},
        )

        # Create Graph using the new plot method
        graph = axes.plot(lambda x: x**1, color=RED)
        graph_label = axes.get_graph_label(graph, label='x^{1}')

        graph2 = axes.plot(lambda x: x**4, color=RED)
        graph_label2 = axes.get_graph_label(graph2, label='x^{4}')

        # Display graph
        self.play(Create(axes), Create(graph), Write(graph_label))
        self.wait(1)
        self.play(Transform(graph, graph2), Transform(graph_label, graph_label2))
        self.wait(1)
