# タイピングゲーム

これは英語学習のためのタイピングゲームです。

# インストール

ubuntu の場合は以下のパッケージが必要になります

```sh
sudo apt-get update
sudo apt-get install javascriptcoregtk-4.1 libsoup-3.0 webkit2gtk-4.1 librsvg2-dev -y
```

```sh
git pull
git checkout $(git tag -l "app-v*" | sort -V | tail -n 1)
npm ci
npm run tauri build
```

# バックアップ

このアプリはデータを JSON ファイルで保存しています。移行する際やバックアップしたものをリストアする際はそれらのファイルをコピーしてください。

### Mac の場合

-   `$HOME/Library/Application Support/com.typing-game.app`に保存されます

### その他 OS の場合

実機を持っていないのでわかりません。このアプリは`app_data_dir`を呼び出しているので、詳しくは以下のドキュメントを参照してください。

-   https://docs.rs/tauri/2.2.5/tauri/path/struct.PathResolver.html#method.app_data_dir

# ライセンス

MIT
