# Loading Spinner and External Link Confirmation Script

This script shows a loading spinner during page navigation and prompts users when attempting to navigate to external websites. The script is multilingual (English/Chinese) and can be easily included in any website.

## Table of Contents
- [English Instructions](#english-instructions)
- [中文说明](#中文说明)

## English Instructions

### Features
1. Displays a loading spinner during page navigation.
2. Prompts for user confirmation when clicking on an external link.

### Usage
1. Include the script in your HTML file by adding the following line within the `<head>` or at the end of the `<body>`:
    ```html
    <script src="https://oinktech.github.io/website-help001/script.js"></script>
    ```
2. The script will automatically handle the following:
    - Show a loading spinner when navigating within the site.
    - Prompt a confirmation dialog when navigating to an external website.

### Customization
- The spinner's appearance can be modified by editing the `.loading-spinner` CSS within the script.
- To change the external link confirmation message, update the text inside `confirm('Are you sure you want to navigate to an external website?');`.

## 中文说明

### 功能
1. 在页面跳转时显示加载圈。
2. 当点击外部链接时提示用户确认。

### 使用方法
1. 在您的 HTML 文件中引入此脚本，将以下代码添加到 `<head>` 或 `<body>` 末尾：
    ```html
    <script src="https://oinktech.github.io/website-help001/script.js"></script>
    ```
2. 脚本将自动处理以下情况：
    - 在站点内导航时显示加载圈。
    - 在跳转到外部网站时弹出确认对话框。

### 自定义
- 您可以通过修改脚本中的 `.loading-spinner` CSS 来更改加载圈的外观。
- 如需更改外部链接确认消息，请编辑 `confirm('Are you sure you want to navigate to an external website?');` 中的文本。
