# NEIGHBOR WORK 拡張機能

- [NEIGHBOR WORK Time Selector (Chrome Web Store)](https://chromewebstore.google.com/detail/bfibpmjaailjebfjgdgfapdpenglolgb)
- [NEIGHBOR WORK Time Selector (Chrome Developer Dashboard)](https://chrome.google.com/webstore/devconsole/f950e9e0-a986-4fd0-91b3-cbf770aaf390/bfibpmjaailjebfjgdgfapdpenglolgb/edit)

# 開発

### Chrome 拡張機能のビルド

```shell
npm run prePublish
```

- `chrome://extensions` から読み込む
  - デベロッパーモードをオン
  - 「パッケージ化されていない拡張機能を読み込む」をクリック
  - `entrypoint` ディレクトリを選択

### Chrome 拡張機能の公開

```shell
npm run prePublish

npm run zip

npm run chromeDashboard
```

`~/Downloads/neighborwork-chrome-extention.zip` をアップロードする。

### Chrome 拡張機能の Web Store ページ

```shell
npm run chromeWebStore
```

### ディレクトリ構成

| ディレクトリ  | 内容                                                      |
| ------------- | --------------------------------------------------------- |
| `/docs`       | プライバリーポリシーの GitHub Pages のソース              |
| `/entrypoint` | ビルドされたファイルのアウトプット先                      |
| `/src`        | Chrome 拡張機能のソースコード                             |
| `/static`     | 静的ファイル。`manifest.json` や css ファイル、ロゴなど。 |
