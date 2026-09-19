# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以純前端方式實作，聚焦在單頁式待辦管理與基本使用者體驗優化，展示如何利用 GitHub Copilot Agent Mode、MCP，以及 `.github/prompts` 的 agentic workflow 來逐步處理需求與修正問題。

## 線上展示

GitHub Pages：
https://<你的帳號>.github.io/<你的repo名稱>/

> 這個網址目前先以佔位形式提供，之後可以依實際 GitHub Pages 設定替換成正式連結。

## 功能

- 新增待辦事項
- 勾選完成／取消完成狀態
- 刪除單一項目
- 依狀態篩選：全部、未完成、已完成
- 保留使用者選擇的篩選條件，重新整理後仍維持狀態
- 切換淺色／深色模式
- 顯示未完成數量
- 在篩選結果為空時，提供明確的空狀態提示
- 批次清除已完成項目，並在操作前顯示確認對話框
- 資料持久化保存於 `localStorage`

## 技術

- HTML
- CSS
- 原生 JavaScript
- 無前端框架
- 無第三方套件
- 不依賴外部 CDN
- 頁面與資料皆可離線運作
- 使用 `localStorage` 保存待辦資料、主題設定與篩選狀態

## 開發方式

這個專案的開發流程是以 GitHub Copilot 相關工作坊作法為核心：

- 使用 GitHub Copilot Agent Mode 協助拆解需求、撰寫與調整前端邏輯
- 透過 MCP 連接 GitHub 與 Microsoft Learn，查閱 issue 與官方文件資料
- 使用 `.github/prompts` 中的 agentic workflow，按照固定流程修正 issue、提交變更與建立 PR
- 依據 issue 描述逐步修正 bug 與功能需求，並保持專案維持在純前端、無額外依賴的範圍內

這種方式讓開發過程更接近真實協作場景：先確認需求、再修正問題、最後驗證 UI 行為與提交版本。 

## 我學到什麼

- 先釐清使用者問題，再修正功能，能避免無意義的重構。
- `localStorage` 對於小型前端 App 很實用，能保留使用者偏好與資料狀態。
- UI 行為不只是「能不能做」，還要考慮清楚的狀態回饋與空白情境。
- 在 Agent Mode 和 MCP 的協作流程中，明確的 issue + prompt 能讓開發更有方向性。
- 純前端專案仍然可以透過良好的結構與測試式驗證，維持穩定與可維護性。

---

這份作品集合體現了以最小成本完成一個可交互待辦清單 App 的過程，並將 GitHub Copilot 的協作方式應用在真實的 issue 修正工作流中。
