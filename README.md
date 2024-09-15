

# Loading Animation and External Link Confirmation Script

## Table of Contents
- [English Instructions](#english-instructions)
- [繁體中文說明](#繁體中文說明)

## English Instructions

### Features
1. **Loading Spinner**: Displays a stylish loading spinner during page navigation.
2. **External Link Confirmation**: Prompts users for confirmation before navigating to external links.
3. **Customizable Configuration**: Easily configure spinner appearance, audio, and light mode using global variables.
4. **Dynamic Loading**: The script can be dynamically loaded and initialized.
5. **Copy Button**: Allows users to copy the configuration code to clipboard.

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
        lightMode: false, // Set to true to enable light mode
        message: 'Loading...', // Custom loading message
        onComplete: function() {
            console.log('Loading complete!');
            alert('The content is now loaded.');
            document.getElementById('main-content').style.display = 'block';
        }
    };
</script>
```

### Customization
- **Spinner Appearance**: Adjust the spinner's size, color, and animation by editing the CSS in the script or your stylesheet.
- **Confirmation Message**: Modify the confirmation dialog text in the script to better fit your needs.
- **Image and Audio Paths**: Set `imagePath` and `audioPath` in `window.loaderConfig` to use custom images and sounds.
- **Completion Callback**: Use the `onComplete` function to define actions after loading is complete.
- **Copy Button**: Added for users to easily copy the configuration code.

### Example
Here’s a simple example to integrate the script into your HTML with configuration, improved styles, and a copy button:

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
            lightMode: true, // Enable light mode
            message: 'Loading...', // Custom loading message
            onComplete: function() {
                console.log('Loading complete!');
                alert('The content is now loaded.');
                document.getElementById('main-content').style.display = 'block';
            }
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

        /* Copy Button Style */
        .copy-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 20px;
            background-color: #00bfff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }

        .copy-button:hover {
            background-color: #009acd;
        }

        .copy-button:focus {
            outline: none;
        }
    </style>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <a href="https://externalwebsite.com">Visit External Website</a>
    <div id="main-content" style="display: none;">
        <!-- Main content of your website -->
    </div>
    <button class="copy-button" onclick="copyConfig()">Copy Config Code</button>
    <script>
        function copyConfig() {
            const configCode = `
<script>
    window.loaderConfig = {
        imagePath: 'path/to/your-image.png', // Replace with your image path
        audioPath: 'path/to/loading-sound.mp3', // Replace with your audio path
        lightMode: true, // Enable light mode
        message: 'Loading...', // Custom loading message
        onComplete: function() {
            console.log('Loading complete!');
            alert('The content is now loaded.');
            document.getElementById('main-content').style.display = 'block';
        }
    };
</script>`;
            navigator.clipboard.writeText(configCode).then(() => {
                alert('Config code copied to clipboard!');
            }, (err) => {
                console.error('Failed to copy config code: ', err);
            });
        }
    </script>
</body>
</html>
```

### Additional Resources
- [CSS Tricks - Loading Spinners](https://css-tricks.com/snippets/css/loading-spinners/)
- [JavaScript Confirmation Dialog](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

---
