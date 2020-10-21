import React from 'react';
import { Text, View, Alert } from 'react-native';
import WebView from 'react-native-webview';
//猫眼选票地址
const uri = 'https://m.maoyan.com/seats/202010220105068?cinemaId=28541&movieId=1328712&$from=canary#';
//暗号：技术为生活服务
const INJECT_JS = (window, document) => {
  let submitBtn;
  function waitForBtnRender() {
    submitBtn = document.querySelector('.submit-block');
    if (!submitBtn) { //检测是否有按钮，否则轮训
      setTimeout(waitForBtnRender, 2000);
    } else {
      //猫眼对提交，有事件阻止，所有用的touchstart事件，
      submitBtn.addEventListener('touchstart',function(){
        const seats = [];
        document.querySelectorAll('.selected-seat-info').forEach((node) => {
          seats.push(node.textContent);
        });
        window.ReactNativeWebView.postMessage(seats.join(', '));
      });
    }
  }
  waitForBtnRender();
};

export default function Movie() {
  return (
    <WebView
      source={{ uri }}
      injectedJavaScript={`(${INJECT_JS.toString()})(window, document)`}
      onMessage={(e) => {
        Alert.alert('技术为生活服务：' + e.nativeEvent.data);
      }}
    />
  );
}
