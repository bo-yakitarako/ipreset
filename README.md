## IPを書き換えるやつ
[SocialDog](https://social-dog.net/)開発者用、クラウド開発環境にてVS Codeで作業する人向けのものです。それ以外の人にはあんま関係ないかも☆

## 事前準備
TypeScriptで書いてCommonJS形式にコンパイルしたものを実行します。なのでNode.jsが必要です。Node環境が無い場合は用意しておいてください。<br>
Node環境合っても動かないってときはバージョンを確認してください。当方は``v10.15.3``にて確認しています。

とりあえずこのリポジトリをクローンしたら``yarn install``でパッケージをインストールしてください。

あくまで"書き換えるやつ"なので、あらかじめ元ファイルを書いておく必要があります。

#### /etc/hosts
以下の行を含むように``vi``かなんかで編集しておいてください
```
~
127.0.0.1 socialdog
~
```

#### ~/.ssh/config
こちらにはssh接続用のHostを書いておきます。名前はなんでもいいですが、ここでは``socialdog``というHostにしています。
```
Host socialdog
    HostName 35.243.90.169
    User bo-yakitarako
    Port 22
    IdentityFile /Users/bo-yakitarako/.ssh/id_rsa
```
詳細はコンフルにもありますが、[VSCode公式の機能で、リモートサーバにSSHして編集する【Insiders Preview】](https://qiita.com/suzuki_sh/items/245b9817536eba808842)を参考にしてください。macの場合は``~/.ssh/config``に設定ファイルが生成されます。

ちなみに、上記Qiita記事ではVS Code Insiderを使おうみたいに言ってますが、通常のVS Codeにも拡張機能はインストールできますのでわざわざVS Code Insiderを使う必要はないです。

## スクリプトいじる

``src/index.ts``にスクリプトがあります。ご自身の環境に合わせて少し書き換えましょう。

```TypeScript
// ここは適宜書き換えましょう
const configFilePath = '/Users/bo-yakitarako/.ssh/config';
```

ここは``~/.ssh/config``の絶対パスを指定します。多分``bo-yakitarako``のところを自分のmacユーザー名に変えるだけでいいでしょう。

```TypeScript
// ~/.ssh/configに設定したHostの名前を含むように"socialdog"を適宜変更しましょう
const isUpdate = canRewrite || text.includes('socialdog');
```

``~/.ssh/config``で設定したHost名が``socialdog``でない場合は、対応したものに書き換えるようにしてください。

## デバッグ、コンパイル
#### TSのまま実行
```bash
$ yarn debug {IPアドレス}
```

#### コンパイル
```bash
$ yarn compile
```

#### 実行
```bash
$ yarn exe {IPアドレス}
```

#### コンパイルして実行
```bash
$ yarn start {IPアドレス}
```

## エイリアスの作成
毎回このディレクトリ開いて上記コマンド打つのは面倒なので、エイリアスを作成しましょう。

当方はzshなので``~/.zshrc``に書いてますが、``~/.bashrc``だったりもするでしょう。``vi``かなんかで編集してください。

追記するエイリアスは

```bash
alias ipset='(){node ~/Desktop/Node/ipreset/build/index.js $1}'
```

こんな感じで、``node (プロジェクトのディレクトリのパス}/build/index.js) $1``のように設定します。

ファイルを保存して閉じたら``source ~/.zshrc``とかもお忘れなく。

あとはどこからでも
```bash
$ ipset {IPアドレス}
```

を実行すれば簡単にIPアドレスを書き換えることができます。
