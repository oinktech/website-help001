# Loading Animation and External Link Confirmation Script

## Table of Contents
- [English Instructions](#english-instructions)
- [繁體中文說明](#繁體中文說明)

## English Instructions

### Features
1. **Loading Spinner**: Displays a stylish loading spinner during page navigation.
2. **External Link Confirmation**: Prompts for user confirmation before navigating to external links.
3. **Customizable Configuration**: Easily configure spinner appearance, audio, and light mode using global variables.

### Usage

1. **Include the Script**: Add the following line to your HTML file within the `<head>` or at the end of the `<body>`:
    ```html
    <script src="https://oinktech.github.io/website-help001/script.js"></script>
    ```
2. **Dynamic Loading**: Alternatively, you can dynamically load the script with the following JavaScript code:
    ```html
    <script>
        const script = document.createElement('script');
        script.src = 'https://oinktech.github.io/website-help001/script.js';
        document.head.appendChild(script);
    </script>
    ```
3. **Automatic Handling**: The script will automatically:
    - Show a loading spinner when navigating within the site.
    - Prompt a confirmation dialog when navigating to an external website.

### Configuration
To customize the loading spinner, audio, and light mode, define global variables before including the script. Add the following JavaScript code to your HTML file:

```html
<script>
    window.loaderConfig = {
        imagePath: 'path/to/your-image.png', // Replace with your image path
        audioPath: 'path/to/loading-sound.mp3', // Replace with your audio path
        lightMode: false // Set to true to enable light mode
    };
</script>
```

### Customization
- **Spinner Appearance**: Adjust the spinner's size, color, and animation by editing the CSS in the script or your stylesheet.
- **Confirmation Message**: Modify the confirmation dialog text to better fit your needs.
- **Image and Audio Paths**: Set `imagePath` and `audioPath` in `window.loaderConfig` to use custom images and sounds.

### Example
Here’s a simple example to integrate the script into your HTML with configuration:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <script>
        window.loaderConfig = {
            imagePath: 'path/to/your-image.png', // Replace with your image path
            audioPath: 'path/to/loading-sound.mp3', // Replace with your audio path
            lightMode: true // Enable light mode
        };
    </script>
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
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Custom Loading Overlay Style */
        .loading-overlay {
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <a href="https://externalwebsite.com">Visit External Website</a>
</body>
</html>
```

### Additional Resources
- [CSS Tricks - Loading Spinners](https://css-tricks.com/snippets/css/loading-spinners/)
- [JavaScript Confirmation Dialog](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)

---

## 繁體中文說明

### 功能
1. **加載動畫**: 在頁面跳轉時顯示時尚的加載動畫。
2. **外部鏈接確認**: 在導航到外部鏈接之前提示用戶確認。
3. **可自訂配置**: 使用全局變量輕鬆配置動畫外觀、音頻和光明模式。

### 使用方法

1. **引入腳本**: 在您的 HTML 文件中引入此腳本，將以下代碼添加到 `<head>` 或 `<body>` 末尾：
    ```html
    <script src="https://oinktech.github.io/website-help001/script.js"></script>
    ```
2. **動態加載**: 如果您希望通過 JavaScript 動態加載腳本，可以使用以下代碼：
    ```html
    <script>
        const script = document.createElement('script');
        script.src = 'https://oinktech.github.io/website-help001/script.js';
        document.head.appendChild(script);
    </script>
    ```
3. **自動處理**: 腳本將自動處理以下情況：
    - 在站點內導航時顯示加載動畫。
    - 在跳轉到外部網站時彈出確認對話框。

### 設置全局變量
要自訂加載動畫、音頻和光明模式，您可以在引入腳本之前定義全局變量。在您的 HTML 文件中添加以下 JavaScript 代碼：

```html
<script>
    window.loaderConfig = {
        imagePath: 'path/to/your-image.png', // 替換為您的圖片路徑
        audioPath: 'path/to/loading-sound.mp3', // 替換為您的音頻路徑
        lightMode: false // 設置為 true 以啟用光明模式
    };
</script>
```

### 自訂
- **動畫外觀**: 通過修改腳本中的 `.loading-spinner` CSS 來更改加載動畫的大小、顏色和動畫效果，或在您的樣式表中進行修改。
- **確認消息**: 編輯確認對話框中的文本，以更好地適應您的需求。
- **圖片和音頻路徑**: 在 `window.loaderConfig` 中設置 `imagePath` 和 `audioPath` 以使用自訂圖片和聲音。

### 示例
以下是一個將腳本集成到您的 HTML 中的簡單示例，並進行了配置：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的網站</title>
    <script>
        window.loaderConfig = {
            imagePath: 'path/to/your-image.png', // 替換為您的圖片路徑
            audioPath: 'path/to/loading-sound.mp3', // 替換為您的音頻路徑
            lightMode: true // 啟用光明模式
        };
    </script>
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
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* 自訂加載覆蓋樣式 */
        .loading-overlay {
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
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
