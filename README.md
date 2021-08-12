# 老爸的私房錢專案
練習Node.js環境中Express框架練習

heroku: https://quiet-meadow-02693.herokuapp.com/
![image](https://github.com/joeyWuTRKTR/expense-tracker/blob/main/expense-tracker-index.png)
## 功能說明 Features
* 使用者可以在首頁看支出的所有項目，如:支出項目、時間、金額
* 使用者可以新增、修改、刪除支出資訊
* 使用者可以選擇分類，查看該分類的所有支出
* 使用者可以查看總花費及各分類所支出的金額
* 使用者可以註冊、登入(也可以Facebook登入)
![image](picture or gif url)

## 環境建置 Environment
* 開發環境: VS Code ^1.59.0
* 執行環境: Node.js ^14.17.1
* 框架: Express ^4.17.1
* 模板引擎: Express-handlebars ^5.3.2
* 實用套件: Nodemon ^2.0.7

## 測試帳號 Testing-Account
測試帳號一: 
* 信箱: root1@example.com
* 密碼: root1

測試帳號二: 
* 信箱: root2@example.com
* 密碼: root2

## 專案安裝 Installing
  1. 在終端機輸入指令clone專案到本機電腦

    git clone https://github.com/joeyWuTRKTR/expense-tracker.git
  2. 進入專案目錄  

    cd expense-tracker
  3. 安裝相關套件  

    npm install
  4. 輸入code. 進入VS code

    修改.evn.example檔案，將名稱改為.env、設定facebook-develope密鑰
  5. 載入種子資料  

    npm run seed
  6. 啟動專案  

    npm run dev
  7. 終端機出現以下訊息後，即可在 http://localhost:3000 使用  

    Web app is connected on http://localhost:3000
