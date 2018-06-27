// navigator.mediaDevices.getUserMedia を利用可能にするポリフィル
//   https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
// navigator.getUserMedia は Deprecated
//   https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia
(function() {
  'use strict';

  // navigator.mediaDevices の存在しないブラウザ
  if (!navigator.mediaDevices) {
    navigator.mediaDevices = {};
  }

  // 対応済ブラウザ
  if (navigator.mediaDevices.getUserMedia) {
    return;
  }

  // navigator.mediaDevices.getUserMedia の仕様に合わせて引数は一つに
  navigator.mediaDevices.getUserMedia = function(constraints) {

    // 古い方の getUserMedia
    var getUserMedia = 
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      null;

    // 非対応ブラウザでは常に reject される Promise オブジェクトを返す
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // navigator.mediaDevices.getUserMedia の仕様に合わせて Promise オブジェクトを返す
    return new Promise(function(resolve, reject) {
      getUserMedia.apply(navigator, [constraints, resolve, reject]);
    });
  };
})();