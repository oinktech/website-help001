# Loading animation and external link confirmation script


## 目錄
- [英文說明](#english-instructions)
- [繁體中文說明](#繁體中文說明)

## 英文說明

### Features
1. **Loading Spinner**: Displays a loading spinner during page navigation.
2. **External Link Confirmation**: Prompts for user confirmation when clicking on an external link.

### Usage
1. **Include the Script**: Add the following line to your HTML file within the `<head>` or at the end of the `<body>`:
    ```html
    <script src="https://oinktech.github.io/website-help001/script.js"></script>
    ```
2. **Automatic Handling**: The script will automatically:
    - Show a loading spinner when navigating within the site.
    - Prompt a confirmation dialog when navigating to an external website.

### Customization
- **Spinner Appearance**: Modify the spinner's appearance by editing the `.loading-spinner` CSS within the script.
- **Confirmation Message**: Update the text inside `confirm('Are you sure you want to navigate to an external website?');` to change the external link confirmation message.

### Example
Here’s a simple example to integrate the script into your HTML:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <script src="https://oinktech.github.io/website-help001/script.js"></script>
    <style>
        /* Custom Spinner Style */
        .loading-spinner {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 16px solid #f3f3f3;
            border-top: 16px solid #00bfff;
            border-radius: 50%;
            width: 120px;
            height: 120px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <a href="https://externalwebsite.com">Visit External Website</a>
</body>
</html>
```

## 繁體中文說明

### 功能
1. **加載動畫**: 在頁面跳轉時顯示加載動畫。
2. **外部鏈接確認**: 當點擊外部鏈接時提示用戶確認。

### 使用方法
1. **引入腳本**: 在您的 HTML 文件中引入此腳本，將以下代碼添加到 `<head>` 或 `<body>` 末尾：
    ```html
    <script src="https://oinktech.github.io/website-help001/script.js"></script>
    ```
2. **自動處理**: 腳本將自動處理以下情況：
    - 在站點內導航時顯示加載動畫。
    - 在跳轉到外部網站時彈出確認對話框。

### 自訂
- **動畫外觀**: 通過修改腳本中的 `.loading-spinner` CSS 來更改加載動畫的外觀。
- **確認消息**: 編輯 `confirm('Are you sure you want to navigate to an external website?');` 中的文本以更改外部鏈接確認消息。

### 示例
以下是一個將腳本集成到您的 HTML 中的簡單示例：
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的網站</title>
    <script src="https://oinktech.github.io/website-help001/script.js"></script>
    <style>
        /* 自訂加載動畫樣式 */
        .loading-spinner {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 16px solid #f3f3f3;
            border-top: 16px solid #00bfff;
            border-radius: 50%;
            width: 120px;
            height: 120px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <h1>歡迎來到我的網站</h1>
    <a href="https://externalwebsite.com">訪問外部網站</a>
</body>
</html>
```

### 其他資源
- [CSS Tricks - Loading Spinners](https://css-tricks.com/snippets/css/loading-spinners/)
- [JavaScript Confirmation Dialog](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)
```

