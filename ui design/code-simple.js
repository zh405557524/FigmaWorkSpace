/**
 * Figma 插件 - 简化版本
 * 只包含最基本的功能，用于测试
 */

// 显示简单的 UI
figma.showUI(`
  <html>
    <head>
      <meta charset="utf-8">
      <title>测试插件</title>
      <style>
        body {
          font-family: Inter, sans-serif;
          padding: 16px;
          margin: 0;
          background: #ffffff;
        }
        h1 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 12px 0;
        }
        .button {
          width: 100%;
          padding: 10px;
          background: #18a0fb;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-bottom: 8px;
          font-size: 14px;
        }
        .button:hover {
          background: #1592e6;
        }
      </style>
    </head>
    <body>
      <h1>测试插件</h1>
      <p>点击按钮创建一个简单的矩形</p>
      <button class="button" onclick="parent.postMessage({pluginMessage: {type: 'create-rect'}}, '*')">
        创建矩形
      </button>
      <button class="button" onclick="parent.postMessage({pluginMessage: {type: 'cancel'}}, '*')">
        取消
      </button>
    </body>
  </html>
`, { width: 300, height: 200 });

// 监听消息
figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === 'create-rect') {
      // 创建一个简单的矩形
      const rect = figma.createRectangle();
      rect.x = 100;
      rect.y = 100;
      rect.resize(200, 100);
      rect.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.4, b: 0.8, a: 1 } }];
      rect.cornerRadius = 8;
      
      figma.currentPage.appendChild(rect);
      figma.currentPage.selection = [rect];
      figma.viewport.scrollAndZoomIntoView([rect]);
      
      figma.notify('矩形创建成功！');
    } else if (msg.type === 'cancel') {
      figma.closePlugin();
    }
  } catch (error) {
    figma.notify(`错误: ${error.message}`);
    console.error('错误:', error);
  }
};

