# 2022 Fall NTU Web Programming Final Project

## RedactNews

- A modify version of [redactle](https://www.redactle.com/#).

## 安裝與測試步驟

### 安裝及環境建構

1. 安裝所需套件：`yarn install:all`
2. 確認套件皆有完成安裝，無出現 Error Messages
3. 在 backend 資料夾下，放置 .env 檔案，其中包含以下內容：
   ```
   MONGO_URL=mongodb+srv://starsstars:hermes1111@cluster0.bae3ozx.mongodb.net/?retryWrites=true&w=majority
   GUARDIANS_KEY=88a6b377-661c-40c6-9a84-a516a316bfe2
   ```
   - 以上內容為開發者提供之資料庫及相關 API Token 請避免外流。
   - `GUARDIANS_KEY` 為本專案新聞相關 API 使用之 Token。
4. 確認已在與此 README 同資料夾下，開啟兩個 terminal 中分別完成以下兩步驟：
   - 執行 `yarn start` 開啟前端
   - 執行 `yarn server` 開啟後端

### 功能測試

1. 支援登入、註冊基本功能
   - 帳戶註冊時，密碼須為長度 > 8 的字串，且 Email 也須符合 Email 格式（使用 Regular Expression 檢查）。
   - 帳戶註冊時檢查是否為 Unique 的 Username。
   - 若登入、註冊有異常情形，會跳出 Toast 告訴用戶是哪裡有錯、異常。
   - 註冊成功會跳轉至登入介面，登入成功則會進入遊戲。
2. 遊戲功能：
   - 不論是否登入，皆可進行遊戲。惟登入才能保存作答紀錄，未登入作答紀錄則會在重新整理後被清除。
   - 遊戲進行方式同 Redactle ，在輸入框中輸入想猜測的單字，點按 Enter 或是 + 會送出該筆作答紀錄。
     - 成功送出符合條件的猜測內容，會顯示在畫面右側的 Table 中， Hits! 顯示之數字則為該單字（大小寫皆可）出現在該新聞（含標題）之次數。
     - 若已猜測該單字，則會跳出 Toast 訊息提醒，並滾動右側 Table 至該單字猜測紀錄；錯誤、不符格式之猜測，亦會顯示 Toast 訊息告知。
     - 成功猜測，且有 Hits > 0 的單字，在猜測送出，或點擊該筆猜測時，左方文章會 Highlight 該單字出現之處，並滾動至第一個出現該單字的地方，再次點擊猜測紀錄時，則會依序滾動至接續出現該詞的地方。
     - 點按下方 Input 旁的 Top 則會將左邊文章處滾動至最上方。
   - 登入狀態時，若先前已有相關猜測紀錄，則會自動顯示在右方 Table 中。
3. 帳號功能：僅限登入帳號使用
   - 點按 Header 右上角的按鈕展開選單，選擇 Profile 會進入帳戶資訊頁面。
   - 帳戶資訊主頁可以看到用戶姓名及信箱。
   - 選擇 Settings 可進行帳戶名稱、信箱修改（修改規則同註冊）。
   - 選擇 Change
4. 歷史紀錄功能：僅限登入帳號使用
