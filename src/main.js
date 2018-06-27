// アプリケーション作成用のモジュールを読み込み
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// メインウィンドウ
let mainWindow;

//パワーセーブ禁止
const powerSaveBlocker = require('electron').powerSaveBlocker
var id = powerSaveBlocker.start('prevent-display-sleep')


function createWindow() {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({
    // ウィンドウ作成時のオプション
      width: 240,
      height: 120,
      transparent: true,    // ウィンドウの背景を透過
      frame: false,     // 枠の無いウィンドウ
      resizable: false,  // ウィンドウのリサイズを禁止
      hasShadow: false, //シャドウ
      alwaysOnTop: true, //最前面表示


      webPreferences: {
        defaultFontFamily: {
          standard: 'Meiryo UI',
          serif: 'MS PMincho',
          sansSerif: 'Meiryo UI',
          monospace: 'MS Gothic'
        }
        // 他、以下のパラメータが設定可能
        // defaultFontSize
        // defaultMonospaceFontSize
        // minimumFontSize
        // defaultEncoding
      }

  });

  // メインウィンドウに表示するURLを指定します
  // （今回はmain.jsと同じディレクトリのindex.html）
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  //クリックスルーさせる
  // mainWindow.setIgnoreMouseEvents(true);

  // デベロッパーツールの起動
  // mainWindow.webContents.openDevTools();

  // メインウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

//  初期化が完了した時の処理
app.on('ready', createWindow);

// 全てのウィンドウが閉じたときの処理
app.on('window-all-closed', () => {
  // macOSのとき以外はアプリケーションを終了させます
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
app.on('activate', () => {
  // メインウィンドウが消えている場合は再度メインウィンドウを作成する
  if (mainWindow === null) {
    createWindow();
  }
});


//============================================================================================
//
//============================================================================================
