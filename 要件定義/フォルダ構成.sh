#!/bin/bash

# プロジェクトのルートディレクトリを作成
mkdir -p my_project

# バックエンド用のフォルダとファイルの作成
cd my_project
mkdir -p app/models app/schemas app/crud app/api app/core app/dependencies migrations tests config services middleware
touch app/{models,schemas,crud,api,core,dependencies}/.gitkeep migrations/.gitkeep tests/.gitkeep config/.gitkeep services/.gitkeep middleware/.gitkeep
touch main.py

# フロントエンド用のフォルダとファイルの作成
mkdir -p src/{components,pages,api,hooks,utils,context,assets,styles,routes}
touch src/{components,pages,api,hooks,utils,context,assets,styles,routes}/.gitkeep
touch src/App.js src/index.js

# Reactのpublicフォルダ作成
mkdir -p public
touch public/index.html

echo "プロジェクト構造の作成が完了しました。"
