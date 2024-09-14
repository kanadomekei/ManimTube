import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ManimAboutPage() {
  return (
    <div className='min-h-screen p-4 text-white'>
      <h1 className='text-3xl font-bold mb-4'>Manim について</h1>
      <p className='mb-8'>
        Manim（Mathematical Animation Engine）は、Pythonライブラリの一つで、
        数学的概念を視覚化するためのアニメーションを作成することができます。
        特に教育や研究で使用されることが多く、複雑な数式やグラフをアニメーションで
        わかりやすく表現するのに役立ちます。ManimTubeに投稿されている動画は、
        すべてManimが使われています。
      </p>

      <section id='quickstart' className='mb-8'>
        <h1 className='text-3xl font-bold mb-4'>Manim チュートリアル</h1>

        <section id='overview' className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>概要</h2>
          <p>
            このチュートリアルでは、正確なプログラム アニメーションを実現するアニメーション
            エンジンである Manim を使用してサンプル プロジェクトを作成する手順を説明します。
          </p>
        </section>

        <h2 className='text-2xl font-bold mb-4'>新しいプロジェクトの開始</h2>
        <p>
          まず、新しいフォルダを作成します。このガイドでは、フォルダに次の名前を付けます{' '}
          <code>project</code>。このフォルダはプロジェクトのルートフォルダです。
          Manimが機能するために必要なすべてのファイルと、プロジェクトが生成するすべての
          出力が含まれます。
        </p>
      </section>

      <section id='example1' className='mb-8'>
        <h2 className='text-xl font-bold mb-4'>Example 1: 円をアニメーション化する</h2>
        <p>この例では、Manimを使って基本的な円のアニメーションを作成する方法を紹介します。</p>
        <SyntaxHighlighter language='python' style={dark} className='mt-4 rounded'>
          {`from manim import *

class CreateCircle(Scene):
    def construct(self):
        circle = Circle()  # create a circle
        circle.set_fill(PINK, opacity=0.5)  # set the color and transparency
        self.play(Create(circle))  # show the circle on screen`}
        </SyntaxHighlighter>
        <p className='mt-4'>
          上記のコードを <code>scene.py</code>{' '}
          という名前でプロジェクトフォルダに保存し、以下のコマンドを実行してアニメーションを生成します。
        </p>
        <SyntaxHighlighter language='bash' style={dark} className='mt-4 rounded'>
          {`manim -pql scene.py CreateCircle`}
        </SyntaxHighlighter>
        <p className='mt-4'>
          このコマンドは、Manimがレンダリング情報を出力し、MP4ファイルを作成します。デフォルトのムービープレーヤーでMP4ファイルが再生され、アニメーションが表示されます。
        </p>
        <video controls className='mt-4'>
          <source src='path_to_video.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </section>

      <section id='example2'>
        <h2 className='text-xl font-bold'>Example 2: グラフのプロット</h2>
        <p>この例では、Manimを使ってグラフをプロットする方法を紹介します。</p>
        <SyntaxHighlighter language='python' style={dark} className='mt-4 rounded'>
          {`from manim import *

class GraphPlot(Scene):
    def construct(self):
        axes = Axes(x_range=(-3, 3), y_range=(-2, 2))
        graph = axes.plot(lambda x: x**2, color=WHITE)
        self.play(Create(axes), Create(graph))`}
        </SyntaxHighlighter>
        <video controls className='mt-4'>
          <source src='path_to_video.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </section>
    </div>
  )
}
