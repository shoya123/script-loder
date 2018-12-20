# script-loder
scriptタグをJSから動的に読み込む。

## 概要
JavaScript実行時に動的に外部のjsファイルを読み込みむモジュールです。
スクリプトをjsファイルに分けて管理したいけれど、ビルドツールが使えない時があったので作成しました。
依存関係を解決するために、直列に読み込むことを可能にしています。

## 使い方の例
    sl.setSrc('https://code.jquery.com/jquery-3.3.1.js', 'parallel');
    sl.setSrc('https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore.js', 'parallel');
    sl.setSrc('https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js', 'series');
    sl.setSrc('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.js', 'series');
    sl.load(
    () => {
        console.log('success!');
    },
    () => {
        console.log('error!');
    });

## 簡単な仕様

setSrcメソッドで読み込みたいソースを指定します。第1引数が読み込みたいソース、第2引数が読み込み方を直列にするか並列にするか指定できます。
以下の順で読み込まれます。

並列指定したソース　→　直列指定したソース


    sl.stSrc('xxxx.js', 'parallel');
    sl.stSrc('xxxx.js', 'series');

loadメソッドで読み込みを実行します。第1引数が成功時、第2引数がエラー発生時に実行されるコールバックです。

    sl.load(
    () => {
        console.log('success!');
    },
    () => {
        console.log('error!');
    });