# Introduction


## Quickstart

http://weex.apache.org/cn/guide/

https://github.com/weexteam/weex-pack

#### web端开发：

$ npm install -g weex-toolkit

$ yarn

$ npm start

浏览器中打开http://192.168.1.7:8081/web/preview.html?page=index.js

#### 移动端开发：

安装jdk-8u181-windows-x64.exe

安装androidSDK：installer_r24.4.1-windows.exe

控制面板-程序-去除hyper-v

安装haxm-windows_v7_3_0.zip

启动AVD安卓模拟器

$ weex platform add android

$ weex run android

#### 移动端发布

$ npm run pack:android

keytool -genkey -alias hitb.keystore -keyalg RSA -validity 1000 -keystore hitb.keystore

keytool -list -v -keystore .\hitb.keystore

jarsigner -verbose -keystore hitb.keystore -signedjar clipalm.apk app-release-unsigned.apk hitb.keystore

#### 修改App名称

C:\git\clipalm\platforms\android\app\src\main\res\values-zh-rCN\strings.xml:

   <resources>
   <string name="app_name">WEEX APP</string>

C:\git\clipalm\platforms\android\app\src\main\res\values\strings.xml:
    <resources>
    <string name="app_name">WEEX APP</string>
    <string name="dummy_content">Hello WEEX</string>
