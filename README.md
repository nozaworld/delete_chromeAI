# delete_chromeAI

<p style="display: inline">
	<img src="https://img.shields.io/badge/-JavaScript-F7DF1E.svg?logo=javascript&style=for-the-badge&logoColor=black">
	<img src="https://img.shields.io/badge/-Google%20Chrome-4285F4.svg?logo=googlechrome&style=for-the-badge&logoColor=white">
</p>

このプロジェクトは，Google検索結果ページに表示される「AIによる概要」と「AIモード」を非表示にするChrome拡張機能です．CSSによる即時非表示とMutationObserverによるDOM監視を組み合わせており，外部サーバーとの通信やユーザー情報の収集は行いません．

## 概要

検索結果ページの読み込み時にstyle.cssで対象要素を即座に非表示にしつつ，content.jsのMutationObserverでページ内のDOM変化を継続的に監視し，非同期に挿入される「AIによる概要」や関連UIを検出次第削除します．

主な機能として，以下を扱います．

- 検索結果上部に表示される「AIによる概要」セクションの非表示
- 検索結果タブ（すべて／画像／動画など）にある「AIモード」項目の非表示
- 検索ボックス内の「AIモード」切り替えボタンの非表示
- Geminiアイコン・関連コンテナの非表示

## 制約

- Googleの検索ページのDOM構造やクラス名は難読化されており，予告なく変更されることがあります．変更された場合，本拡張機能のセレクタが一致しなくなり，非表示処理が効かなくなる可能性があります．
- 動作確認は日本語・日本からのアクセスに限られており，他言語・他地域での表示には対応していない場合があります．
- クラス名ベースのセレクタと属性ベースのセレクタを併用し冗長化していますが，将来的な互換性を保証するものではありません．
- 拡張機能が機能しなくなった場合でも，利用者へ通知する仕組みはありません．このリポジトリの更新状況を確認してください．

## 使い方

1. リポジトリをクローンします．

```bash
git clone https://github.com/nozaworld/delete_chromeAI.git
cd delete_chromeAI
```

2. Chromeで`chrome://extensions`を開きます．

3. 右上の「デベロッパーモード」をオンにします．

4. 「パッケージ化されていない拡張機能を読み込む」をクリックし，クローンしたディレクトリを選択します．

読み込みが完了すると，Google検索を行った際に「AIによる概要」と「AIモード」が自動的に非表示になります．Googleの仕様変更などで動作しなくなった場合は，`chrome://extensions`で本拡張機能を再読み込みしたうえで，このリポジトリの更新を確認してください．