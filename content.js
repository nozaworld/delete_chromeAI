// ==UserScript==
// @name         Google AI Overview Hider
// @namespace    http://tampermonkey.net/
// @version      1.4
// @match        https://www.google.com/search*
// @run-at       document-start
// ==/UserScript==
//
// 上記はTampermonkeyなどのユーザースクリプトマネージャー向けのヘッダーです。
// Chrome拡張機能として読み込む場合はmanifest.jsonのcontent_scripts設定が優先され、
// このヘッダーはただのコメントとして無視されます（run_atはmanifest.json側で指定）。

(function () {
    'use strict';

    // MutationObserverが起動するより前の一瞬でも「AIによる概要」が
    // 描画されないよう、JSの実行と同時に<style>を先頭に挿入しておく。
    // manifest.json側のcssとは別に、JS側でも二重に非表示を掛けている。
    const css = `
        div.bzXtMb.M8OgIe.dRpWwb,
        [jsname="dEwkXc"] {
            display: none !important;
        }
    `;

    const style = document.createElement('style');
    style.textContent = css;

    // <head> がまだ存在しなくても入れられるようにする
    (document.head || document.documentElement).appendChild(style);

    // 検索結果上部のタブ一覧（すべて／画像／動画…）から「AI モード」の項目を削除
    const removeAIModeTab = () => {
        document
            .querySelectorAll('div.beZ0tf.O1uzAe')
            .forEach(parent => {
                [...parent.children].forEach(child => {
                    if (child.textContent.replace(/\s+/g, '').startsWith('AIモード')) {
                        child.remove();
                    }
                });
            });
    };

    // 検索ボックス内にある「AI モード」への切り替えボタンを削除
    const removeAIComposeButton = () => {
        document
            .querySelectorAll('cr-searchbox-compose-button#composeButton')
            .forEach(el => el.remove());
    };

    // ページ内に描画された「AIによる概要」「AIモード」関連要素をまとめて除去する
    const removeAI = () => {
        // 「AIによる概要」本体を削除
        // ・div.bzXtMb.M8OgIe.dRpWwb : 旧来のクラス名ベースのセレクタ
        // ・[data-attnms="ec"]      : AI概要ブロックを囲む属性（値は生成状態により変動する。"ec"は成功時）
        // ・[jsname="dEwkXc"]       : AI概要スロットそのものを表す識別子。data-attnmsの値（ec/d等）や
        //                             生成中・生成失敗・成功のどの状態でも共通して付与されているため、
        //                             実質的にこれが一番信頼できる。
        // Googleのクラス名・属性値は難読化されており変わりやすいため、複数を対象にして冗長化している。
        document
            .querySelectorAll('div.bzXtMb.M8OgIe.dRpWwb, [data-attnms="ec"], [jsname="dEwkXc"]')
            .forEach(el => el.remove());

        removeAIModeTab();
        removeAIComposeButton();
    };

    // 検索結果はページ読み込み後も非同期にDOMへ差し込まれるため、
    // MutationObserverでDOM全体の変化を監視し、都度removeAI()を呼び直す。
    const observer = new MutationObserver(removeAI);

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // 初回実行（既にDOMに存在している分の除去）
    removeAI();
})();
