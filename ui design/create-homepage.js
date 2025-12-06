/**
 * Figma 插件：创建钢琴识谱练习应用首页
 * 根据 UI 设计图自动生成设计稿
 */

// 屏幕尺寸
const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 812;
const PADDING = 20;
const CARD_SPACING = 12;

// 颜色定义
const COLORS = {
  white: '#FFFFFF',
  black: '#111827',
  gray: '#6B7280',
  blue: '#2563EB',
  purple: '#8B5CF6',
  purpleLight: '#A78BFA',
  border: '#E5E7EB',
};

// 字体配置
const FONTS = {
  primary: 'PingFang SC',
  fallback: 'Inter',
};

/**
 * 加载字体
 */
async function loadFont(family, weight) {
  try {
    await figma.loadFontAsync({
      family: family,
      style: weight === 700 ? 'Bold' : weight === 600 ? 'Semi Bold' : weight === 500 ? 'Medium' : 'Regular',
    });
  } catch (error) {
    // 如果 PingFang SC 不可用，使用 Inter
    try {
      await figma.loadFontAsync({
        family: 'Inter',
        style: weight === 700 ? 'Bold' : weight === 600 ? 'Semi Bold' : weight === 500 ? 'Medium' : 'Regular',
      });
      return 'Inter';
    } catch (e) {
      console.error('字体加载失败:', e);
      return 'Inter';
    }
  }
  return family;
}

/**
 * 创建文本节点
 */
async function createText(content, x, y, width, style, parent) {
  const textNode = figma.createText();
  const fontFamily = await loadFont(style.fontFamily, style.fontWeight);
  
  textNode.characters = content;
  textNode.fontSize = style.fontSize;
  textNode.fontName = {
    family: fontFamily,
    style: style.fontWeight === 700 ? 'Bold' : style.fontWeight === 600 ? 'Semi Bold' : style.fontWeight === 500 ? 'Medium' : 'Regular',
  };
  textNode.fills = [{ type: 'SOLID', color: hexToRgb(style.color) }];
  textNode.x = x;
  textNode.y = y;
  if (width) {
    textNode.resize(width, textNode.height);
  }
  
  if (style.textAlign === 'center') {
    textNode.textAlignHorizontal = 'CENTER';
  } else if (style.textAlign === 'right') {
    textNode.textAlignHorizontal = 'RIGHT';
  }
  
  if (parent) {
    parent.appendChild(textNode);
  } else {
    figma.currentPage.appendChild(textNode);
  }
  
  return textNode;
}

/**
 * 创建矩形（卡片、按钮等）
 */
function createRectangle(x, y, width, height, style, parent) {
  const rect = figma.createRectangle();
  rect.x = x;
  rect.y = y;
  rect.resize(width, height);
  
  if (style.backgroundColor) {
    rect.fills = [{ type: 'SOLID', color: hexToRgb(style.backgroundColor) }];
  } else if (style.backgroundGradient) {
    const gradient = style.backgroundGradient;
    const colors = gradient.colors.map(hexToRgb);
    rect.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: colors[0] },
        { position: 1, color: colors[1] },
      ],
    }];
  } else {
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  }
  
  if (style.borderRadius) {
    rect.cornerRadius = style.borderRadius;
  }
  
  if (style.borderColor && style.borderWidth) {
    rect.strokes = [{ type: 'SOLID', color: hexToRgb(style.borderColor) }];
    rect.strokeWeight = style.borderWidth;
  }
  
  if (style.shadow) {
    rect.effects = [{
      type: 'DROP_SHADOW',
      color: hexToRgb(style.shadow.color),
      offset: { x: style.shadow.x, y: style.shadow.y },
      radius: style.shadow.blur,
      visible: true,
      blendMode: 'NORMAL',
    }];
  }
  
  if (parent) {
    parent.appendChild(rect);
  } else {
    figma.currentPage.appendChild(rect);
  }
  
  return rect;
}

/**
 * 创建框架
 */
function createFrame(x, y, width, height, name, parent) {
  const frame = figma.createFrame();
  frame.name = name;
  frame.x = x;
  frame.y = y;
  frame.resize(width, height);
  frame.fills = [];
  
  if (parent) {
    parent.appendChild(frame);
  } else {
    figma.currentPage.appendChild(frame);
  }
  
  return frame;
}

/**
 * 十六进制转 RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  } : { r: 0, g: 0, b: 0 };
}

/**
 * 创建首页设计
 */
async function createHomePage() {
  // 创建主框架
  const mainFrame = createFrame(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, '钢琴识谱练习 - 首页');
  mainFrame.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.white) }];
  
  // 1. 标题区域
  await createText(
    '钢琴识谱练习',
    PADDING,
    60,
    SCREEN_WIDTH - PADDING * 2,
    {
      fontFamily: FONTS.primary,
      fontSize: 28,
      fontWeight: 700,
      color: COLORS.black,
      textAlign: 'left',
    },
    mainFrame
  );
  
  await createText(
    '提升你的视谱能力',
    PADDING,
    100,
    SCREEN_WIDTH - PADDING * 2,
    {
      fontFamily: FONTS.primary,
      fontSize: 16,
      fontWeight: 400,
      color: COLORS.gray,
      textAlign: 'left',
    },
    mainFrame
  );
  
  // 2. 统计卡片
  const cardWidth = (SCREEN_WIDTH - PADDING * 2 - CARD_SPACING * 2) / 3;
  const cardHeight = 100;
  const statsY = 160;
  
  // 连续天数卡片
  const card1 = createRectangle(
    PADDING,
    statsY,
    cardWidth,
    cardHeight,
    {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      shadow: { x: 0, y: 2, blur: 8, color: 'rgba(0, 0, 0, 0.1)' },
    },
    mainFrame
  );
  await createText('7', PADDING + cardWidth / 2 - 20, statsY + 20, 40, {
    fontFamily: FONTS.primary,
    fontSize: 32,
    fontWeight: 700,
    color: COLORS.blue,
    textAlign: 'center',
  }, mainFrame);
  await createText('连续天数', PADDING + cardWidth / 2 - 30, statsY + 65, 60, {
    fontFamily: FONTS.primary,
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.gray,
    textAlign: 'center',
  }, mainFrame);
  
  // 练习次数卡片
  const card2 = createRectangle(
    PADDING + cardWidth + CARD_SPACING,
    statsY,
    cardWidth,
    cardHeight,
    {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      shadow: { x: 0, y: 2, blur: 8, color: 'rgba(0, 0, 0, 0.1)' },
    },
    mainFrame
  );
  await createText('127', PADDING + cardWidth + CARD_SPACING + cardWidth / 2 - 30, statsY + 20, 60, {
    fontFamily: FONTS.primary,
    fontSize: 32,
    fontWeight: 700,
    color: COLORS.blue,
    textAlign: 'center',
  }, mainFrame);
  await createText('练习次数', PADDING + cardWidth + CARD_SPACING + cardWidth / 2 - 30, statsY + 65, 60, {
    fontFamily: FONTS.primary,
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.gray,
    textAlign: 'center',
  }, mainFrame);
  
  // 准确率卡片
  const card3 = createRectangle(
    PADDING + (cardWidth + CARD_SPACING) * 2,
    statsY,
    cardWidth,
    cardHeight,
    {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      shadow: { x: 0, y: 2, blur: 8, color: 'rgba(0, 0, 0, 0.1)' },
    },
    mainFrame
  );
  await createText('85%', PADDING + (cardWidth + CARD_SPACING) * 2 + cardWidth / 2 - 25, statsY + 20, 50, {
    fontFamily: FONTS.primary,
    fontSize: 32,
    fontWeight: 700,
    color: COLORS.blue,
    textAlign: 'center',
  }, mainFrame);
  await createText('准确率', PADDING + (cardWidth + CARD_SPACING) * 2 + cardWidth / 2 - 25, statsY + 65, 50, {
    fontFamily: FONTS.primary,
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.gray,
    textAlign: 'center',
  }, mainFrame);
  
  // 3. 开始练习按钮
  const buttonY = 290;
  const button = createRectangle(
    PADDING,
    buttonY,
    SCREEN_WIDTH - PADDING * 2,
    80,
    {
      backgroundGradient: {
        type: 'linear',
        colors: [COLORS.purple, COLORS.purpleLight],
        angle: 90,
      },
      borderRadius: 16,
      shadow: { x: 0, y: 4, blur: 12, color: 'rgba(139, 92, 246, 0.3)' },
    },
    mainFrame
  );
  
  // 播放图标（用圆形代替）
  const playIcon = figma.createEllipse();
  playIcon.x = PADDING + 20;
  playIcon.y = buttonY + 20;
  playIcon.resize(40, 40);
  playIcon.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  mainFrame.appendChild(playIcon);
  
  await createText('开始练习', PADDING + 70, buttonY + 20, 200, {
    fontFamily: FONTS.primary,
    fontSize: 20,
    fontWeight: 600,
    color: COLORS.white,
    textAlign: 'left',
  }, mainFrame);
  
  await createText('继续你的学习之旅', PADDING + 70, buttonY + 48, 200, {
    fontFamily: FONTS.primary,
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.white,
    textAlign: 'left',
  }, mainFrame);
  
  // 4. 练习模式区域
  const modesY = 400;
  await createText('练习模式', PADDING, modesY - 20, SCREEN_WIDTH - PADDING * 2, {
    fontFamily: FONTS.primary,
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.black,
    textAlign: 'left',
  }, mainFrame);
  
  // 音符识别卡片
  const modeCard1 = createRectangle(
    PADDING,
    modesY,
    SCREEN_WIDTH - PADDING * 2,
    80,
    {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      borderColor: COLORS.border,
      borderWidth: 1,
    },
    mainFrame
  );
  
  // 图标（用矩形代替）
  const icon1 = figma.createRectangle();
  icon1.x = PADDING + 20;
  icon1.y = modesY + 20;
  icon1.resize(40, 40);
  icon1.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.blue) }];
  icon1.cornerRadius = 8;
  mainFrame.appendChild(icon1);
  
  await createText('音符识别', PADDING + 70, modesY + 20, 200, {
    fontFamily: FONTS.primary,
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.black,
    textAlign: 'left',
  }, mainFrame);
  
  await createText('识别五线谱上的音符', PADDING + 70, modesY + 45, 200, {
    fontFamily: FONTS.primary,
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.gray,
    textAlign: 'left',
  }, mainFrame);
  
  // 视奏挑战卡片
  const modeCard2 = createRectangle(
    PADDING,
    modesY + 92,
    SCREEN_WIDTH - PADDING * 2,
    80,
    {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      borderColor: COLORS.border,
      borderWidth: 1,
    },
    mainFrame
  );
  
  const icon2 = figma.createRectangle();
  icon2.x = PADDING + 20;
  icon2.y = modesY + 112;
  icon2.resize(40, 40);
  icon2.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.purple) }];
  icon2.cornerRadius = 8;
  mainFrame.appendChild(icon2);
  
  await createText('视奏挑战', PADDING + 70, modesY + 112, 200, {
    fontFamily: FONTS.primary,
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.black,
    textAlign: 'left',
  }, mainFrame);
  
  await createText('快速视奏音符序列', PADDING + 70, modesY + 137, 200, {
    fontFamily: FONTS.primary,
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.gray,
    textAlign: 'left',
  }, mainFrame);
  
  // 和弦练习卡片
  const modeCard3 = createRectangle(
    PADDING,
    modesY + 184,
    SCREEN_WIDTH - PADDING * 2,
    80,
    {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      borderColor: COLORS.border,
      borderWidth: 1,
    },
    mainFrame
  );
  
  const icon3 = figma.createRectangle();
  icon3.x = PADDING + 20;
  icon3.y = modesY + 204;
  icon3.resize(40, 40);
  icon3.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.8, b: 0.4 } }];
  icon3.cornerRadius = 8;
  mainFrame.appendChild(icon3);
  
  await createText('和弦练习', PADDING + 70, modesY + 204, 200, {
    fontFamily: FONTS.primary,
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.black,
    textAlign: 'left',
  }, mainFrame);
  
  await createText('识别常见和弦', PADDING + 70, modesY + 229, 200, {
    fontFamily: FONTS.primary,
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.gray,
    textAlign: 'left',
  }, mainFrame);
  
  // 5. 底部导航栏
  const navY = SCREEN_HEIGHT - 80;
  const navBar = createRectangle(
    0,
    navY,
    SCREEN_WIDTH,
    80,
    {
      backgroundColor: COLORS.white,
      borderColor: COLORS.border,
      borderWidth: 1,
    },
    mainFrame
  );
  
  // 导航图标和文本
  const navItemWidth = SCREEN_WIDTH / 3;
  
  // 首页（激活状态）
  const homeIcon = figma.createRectangle();
  homeIcon.x = navItemWidth / 2 - 12;
  homeIcon.y = navY + 10;
  homeIcon.resize(24, 24);
  homeIcon.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.blue) }];
  homeIcon.cornerRadius = 4;
  mainFrame.appendChild(homeIcon);
  
  await createText('首页', navItemWidth / 2 - 20, navY + 40, 40, {
    fontFamily: FONTS.primary,
    fontSize: 12,
    fontWeight: 500,
    color: COLORS.blue,
    textAlign: 'center',
  }, mainFrame);
  
  // 进度
  const progressIcon = figma.createRectangle();
  progressIcon.x = navItemWidth + navItemWidth / 2 - 12;
  progressIcon.y = navY + 10;
  progressIcon.resize(24, 24);
  progressIcon.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray) }];
  progressIcon.cornerRadius = 4;
  mainFrame.appendChild(progressIcon);
  
  await createText('进度', navItemWidth + navItemWidth / 2 - 20, navY + 40, 40, {
    fontFamily: FONTS.primary,
    fontSize: 12,
    fontWeight: 500,
    color: COLORS.gray,
    textAlign: 'center',
  }, mainFrame);
  
  // 设置
  const settingsIcon = figma.createRectangle();
  settingsIcon.x = navItemWidth * 2 + navItemWidth / 2 - 12;
  settingsIcon.y = navY + 10;
  settingsIcon.resize(24, 24);
  settingsIcon.fills = [{ type: 'SOLID', color: hexToRgb(COLORS.gray) }];
  settingsIcon.cornerRadius = 4;
  mainFrame.appendChild(settingsIcon);
  
  await createText('设置', navItemWidth * 2 + navItemWidth / 2 - 20, navY + 40, 40, {
    fontFamily: FONTS.primary,
    fontSize: 12,
    fontWeight: 500,
    color: COLORS.gray,
    textAlign: 'center',
  }, mainFrame);
  
  // 选中主框架并滚动到视图
  figma.currentPage.selection = [mainFrame];
  figma.viewport.scrollAndZoomIntoView([mainFrame]);
  
  figma.notify('首页设计稿创建成功！');
}

// 插件入口
figma.showUI(`
  <html>
    <head>
      <meta charset="utf-8">
      <title>创建首页设计稿</title>
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
          color: #000000;
        }
        p {
          font-size: 12px;
          color: #666666;
          margin: 0 0 16px 0;
          line-height: 1.5;
        }
        .button {
          width: 100%;
          padding: 8px 16px;
          background: #18a0fb;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        .button:hover {
          background: #1592e6;
        }
        .button.secondary {
          background: #f0f0f0;
          color: #000;
        }
        .button.secondary:hover {
          background: #e0e0e0;
        }
      </style>
    </head>
    <body>
      <h1>创建首页设计稿</h1>
      <p>根据 UI 设计图自动生成钢琴识谱练习应用的首页设计稿。</p>
      <button class="button" onclick="parent.postMessage({pluginMessage: {type: 'create'}}, '*')">创建设计稿</button>
      <button class="button secondary" onclick="parent.postMessage({pluginMessage: {type: 'cancel'}}, '*')">取消</button>
    </body>
  </html>
`, { width: 300, height: 180 });

// 监听消息
figma.ui.onmessage = (msg) => {
  if (msg.type === 'create') {
    createHomePage().then(() => {
      figma.closePlugin();
    }).catch((error) => {
      figma.notify(`创建失败: ${error.message}`);
      console.error(error);
    });
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

