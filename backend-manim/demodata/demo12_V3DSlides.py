from manim import *

Tex.set_default(tex_template=TexTemplate(
    tex_compiler = "lualatex", 
    # tex_compiler = "luatex" でも可
    output_format = ".pdf", 
    preamble = r"""
        \usepackage{amsmath}
        \usepackage{amssymb}
        \usepackage{luatexja}
        \usepackage[haranoaji]{luatexja-preset}
    """
))


class V3DSlides(Scene):
    def construct(self):
        # スライド1: タイトル
        title = Tex("V3D: ビデオ拡散モデルによる\\\\効果的な3D生成手法", font_size=72)
        # title.to_edge(UP)
        self.play(Write(title))
        self.wait(2)
        self.play(FadeOut(title))

        # スライド2: 概要
        overview_title = Tex("概要", font_size=48)
        overview_title.to_edge(UP)
        overview_points1 = BulletedList(
            "自動3D生成への注目が高まっている",
            "最近の手法は生成速度を大幅に向上させたが、\\\\モデル容量や3Dデータの限界により詳細度が低い",
            "ビデオ拡散モデルの進歩に着目し、事前学習済み\\\\モデルの世界シミュレーション能力を活用するV3Dを提案",
            "幾何学的整合性の事前情報を導入し、ビデオ拡散モデルを\\\\マルチビュー整合性のある3Dジェネレータへと拡張",
        )
        overview_points1.scale(0.7)
        overview_points1.arrange(DOWN, aligned_edge=LEFT)
        overview_points1.next_to(overview_title, DOWN)

        overview_points2 = BulletedList(
            "これにより、最先端のビデオ拡散モデルを単一画像から\\\\360度のオービットフレームを生成するように微調整可能に",
            "専用の再構成パイプラインにより、3分以内に\\\\高品質なメッシュや3Dガウシアンを生成可能",
            "シーンレベルのノベルビュー合成にも拡張可能で、\\\\疎な入力ビューでカメラパスを正確に制御",
        )
        overview_points2.scale(0.7)
        overview_points2.arrange(DOWN, aligned_edge=LEFT)
        overview_points2.next_to(overview_points1, DOWN)

        self.play(Write(overview_title))
        self.play(Create(overview_points1), run_time=3)
        self.wait(1)
        self.play(Create(overview_points2), run_time=2)
        self.wait(2)
        self.play(FadeOut(overview_title), FadeOut(overview_points1), FadeOut(overview_points2))

        # スライド3: 提案手法 - オブジェクト中心の3D生成
        object_title = Tex("提案手法 - オブジェクト中心の3D生成", font_size=48)
        object_title.to_edge(UP)
        object_points1 = BulletedList(
            "1. ビデオ拡散モデルを合成3Dオブジェクトの\\\\360度オービットビデオでファインチューニング",
            "   - 前面ビューを条件として使用",
            "2. 生成されたマルチビューから3D再構成するためのパイプラインを設計",
            "   - 知覚的損失を採用し不整合の詳細を解消",
        )
        object_points1.scale(0.6)
        object_points1.arrange(DOWN, aligned_edge=LEFT)
        object_points1.next_to(object_title, DOWN)

        object_points2 = BulletedList(
            "   - 3D表現としてガウシアンスプラッティングを採用",
            "   - スペースカービングによる初期化で再構成を高速化",
            "   - メッシュ抽出のためのパイプラインも提案",
            "     - SDFで表面を抽出し、生成ビューでテクスチャをリファイン",
        )
        object_points2.scale(0.6)
        object_points2.arrange(DOWN, aligned_edge=LEFT)
        object_points2.next_to(object_points1, DOWN)

        self.play(Write(object_title))
        self.play(Create(object_points1), run_time=3)
        self.wait(1)
        self.play(Create(object_points2), run_time=2)
        self.wait(2)
        self.play(FadeOut(object_title), FadeOut(object_points1), FadeOut(object_points2))

        # スライド4: 提案手法 - シーンレベルのノベルビュー合成
        scene_title = Tex("提案手法 - シーンレベルのノベルビュー合成", font_size=48)
        scene_title.to_edge(UP)
        scene_points = BulletedList(
            "1. PixelNeRFエンコーダを統合し、ビデオ拡散モデルに\\\\ロバストな3D信号を与える",
            "   - カメラパスを正確に制御し、マルチビュー入力に対応",
            "2. 補助損失と実世界のポーズ付きビデオでのファインチューニングにより拡張",
            "   - 疎なビュー入力から任意のカメラパスでノベルビューを生成可能に",
        )
        scene_points.scale(0.7)
        scene_points.arrange(DOWN, aligned_edge=LEFT)
        scene_points.next_to(scene_title, DOWN)
        self.play(Write(scene_title))
        self.play(Create(scene_points), run_time=3)
        self.wait(2)
        self.play(FadeOut(scene_title), FadeOut(scene_points))

        # スライド5: 実験結果
        results_title = Tex("実験結果", font_size=48)
        results_title.to_edge(UP)
        results_points = BulletedList(
            "定性的および定量的評価により、提案手法の優位性を実証",
            "  - 特に生成品質とマルチビューの整合性において優れた性能",
            "オブジェクト中心およびシーンレベルの両方の実験で最先端の性能を達成",
        )
        results_points.scale(0.7)
        results_points.arrange(DOWN, aligned_edge=LEFT)
        results_points.next_to(results_title, DOWN)
        self.play(Write(results_title))
        self.play(Create(results_points), run_time=2)
        self.wait(2)
        self.play(FadeOut(results_title), FadeOut(results_points))

        # スライド6: まとめ
        summary_title = Tex("まとめ", font_size=48)
        summary_title.to_edge(UP)
        summary_points1 = BulletedList(
            "ビデオ拡散モデルを活用した効果的な3D生成手法V3Dを提案",
            "3Dデータセットでファインチューニングすることで、\\\\ビデオ拡散モデルを3Dジェネレータへと拡張",
            "専用の再構成パイプラインにより、3分以内に高品質な3Dアセットを生成可能",
        )
        summary_points1.scale(0.7)
        summary_points1.arrange(DOWN, aligned_edge=LEFT)
        summary_points1.next_to(summary_title, DOWN)

        summary_points2 = BulletedList(
            "広範な実験により提案手法の有効性を実証し、\\\\3Dタスクにおけるビデオ拡散モデルのさらなる応用の可能性を示唆",
        )
        summary_points2.scale(0.7)
        summary_points2.arrange(DOWN, aligned_edge=LEFT)
        summary_points2.next_to(summary_points1, DOWN)

        self.play(Write(summary_title))
        self.play(Create(summary_points1), run_time=2)
        self.wait(1)
        self.play(Create(summary_points2), run_time=1)
        self.wait(2)
        self.play(FadeOut(summary_title), FadeOut(summary_points1), FadeOut(summary_points2))

        # 終了
        self.wait(2)