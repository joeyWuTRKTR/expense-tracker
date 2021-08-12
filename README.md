# 老爸的私房錢專案
1. 練習與mongodb資料庫的連結以及node.js環境、express框架、handlebars樣板引擎的練習
2. (2021/08/12)加入使用者認證功能

## Features - 功能說明
* 使用者可以在首頁看支出的所有項目，如:支出項目、時間、金額
* 使用者可以新增、修改、刪除支出資訊
* 使用者可以選擇分類，查看該分類的所有支出
* 使用者可以查看總花費及各分類所支出的金額
* 使用者可以註冊、登入(也可以Facebook登入)

## Environment - 環境建置
* 開發環境: VS Code ^1.59.0
* 執行環境: Node.js ^14.17.1
* 框架: Express ^4.17.1
* 模板引擎: Express-handlebars ^5.3.2
* 實用套件: Nodemon ^2.0.7

## Test Account - 測試帳號
1. 測試帳號一: 
信箱: root1@example.com
密碼: root1
2. 測試帳號一: 
信箱: root2@example.com
密碼: root2

## Installation - 專案安裝
1. 在終端機輸入指令clone專案到本機電腦  
```git clone https://github.com/joeyWuTRKTR/expense-tracker.git```
2. 進入專案目錄  
```cd expense-tracker```
3. 安裝相關套件  
```npm install```
4. 載入種子資料  
``` npm run seed```
5. 啟動專案  
```npm run dev```
6. 終端機出現以下訊息後，即可在http://localhost:3000使用  
```Web app is connected on http://localhost:3000```
