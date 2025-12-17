/**
 * Figma 插件：创建钢琴识谱练习应用 - 设置页面
 * 根据设计规范自动生成设置页面设计稿
 */

// ========== 屏幕尺寸和间距 ==========
const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 812;
const PADDING = 24;

// ========== 颜色定义 ==========

/**
 * 十六进制转 RGB（不含 a，用于 SOLID 填充）
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

/**
 * 十六进制转 RGBA（含 a，用于渐变）
 */
function hexToRgba(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
    a: 1
  } : { r: 0, g: 0, b: 0, a: 1 };
}

// 主题色
const COLORS = {
  // 基础色
  white: hexToRgb('#FFFFFF'),
  black: hexToRgb('#111827'),
  
  // 品牌色
  indigo50: hexToRgb('#EEF2FF'),
  indigo100: hexToRgb('#E0E7FF'),
  indigo600: hexToRgb('#4F46E5'),
  purple600: hexToRgb('#9333EA'),
  
  // 灰色
  gray50: hexToRgb('#F9FAFB'),
  gray200: hexToRgb('#E5E7EB'),
  gray400: hexToRgb('#9CA3AF'),
  gray600: hexToRgb('#4B5563'),
  gray700: hexToRgb('#374151'),
  gray800: hexToRgb('#1F2937'),
  
  // 功能色背景
  musicBg: hexToRgb('#EEF2FF'),    // 淡紫色
  soundBg: hexToRgb('#DBEAFE'),    // 淡蓝色
  notifyBg: hexToRgb('#FCE7F3'),   // 淡粉色
  userBg: hexToRgb('#D1FAE5'),     // 淡绿色
  helpBg: hexToRgb('#FEF3C7'),     // 淡黄色
  infoBg: hexToRgb('#E5E7EB'),     // 淡灰色
};

// 渐变色（含 a）
const GRADIENTS = {
  avatarBg: {
    from: hexToRgba('#4F46E5'),
    to: hexToRgba('#9333EA'),
  },
};

// ========== 工具函数 ==========

/**
 * 加载字体
 */
async function loadFont(weight = 400) {
  const style = weight === 500 ? 'Medium' : 'Regular';
  await figma.loadFontAsync({ family: 'Inter', style });
}

/**
 * 创建文本节点
 */
async function createText(text, x, y, options = {}) {
  const {
    fontSize = 16,
    fontWeight = 400,
    color = COLORS.gray800,
    parent = null,
    name = '文本',
    textAlign = 'LEFT',
    width = null,
  } = options;
  
  await loadFont(fontWeight);
  
  const textNode = figma.createText();
  textNode.name = name;
  
  // 先设置字体
  textNode.fontName = {
    family: 'Inter',
    style: fontWeight === 500 ? 'Medium' : 'Regular',
  };
  
  // 再设置大小
  textNode.fontSize = fontSize;
  
  // 最后设置内容
  textNode.characters = text;
  
  // 设置颜色
  textNode.fills = [{ type: 'SOLID', color }];
  
  // 设置位置
  textNode.x = x;
  textNode.y = y;
  
  // 设置宽度（如果指定）
  if (width) {
    textNode.resize(width, textNode.height);
  }
  
  // 设置对齐
  if (textAlign === 'CENTER') {
    textNode.textAlignHorizontal = 'CENTER';
  } else if (textAlign === 'RIGHT') {
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
 * 创建矩形卡片
 */
function createCard(x, y, width, height, options = {}) {
  const {
    color = COLORS.white,
    cornerRadius = 16,
    shadow = true,
    parent = null,
    name = '卡片',
    border = false,
  } = options;
  
  const rect = figma.createRectangle();
  rect.name = name;
  rect.x = x;
  rect.y = y;
  rect.resize(width, height);
  rect.fills = [{ type: 'SOLID', color }];
  rect.cornerRadius = cornerRadius;
  
  // 添加阴影
  if (shadow) {
    rect.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.05 },
      offset: { x: 0, y: 1 },
      radius: 2,
      visible: true,
      blendMode: 'NORMAL',
    }];
  }
  
  // 添加边框
  if (border) {
    rect.strokes = [{ type: 'SOLID', color: COLORS.gray200 }];
    rect.strokeWeight = 1;
  }
  
  if (parent) {
    parent.appendChild(rect);
  } else {
    figma.currentPage.appendChild(rect);
  }
  
  return rect;
}

/**
 * 创建图标背景
 */
function createIconBg(x, y, size, color, parent = null) {
  const rect = figma.createRectangle();
  rect.name = '图标背景';
  rect.x = x;
  rect.y = y;
  rect.resize(size, size);
  rect.fills = [{ type: 'SOLID', color }];
  rect.cornerRadius = 12;
  
  if (parent) {
    parent.appendChild(rect);
  } else {
    figma.currentPage.appendChild(rect);
  }
  
  return rect;
}

// ========== 主函数：创建设置页面 ==========

async function createSettingsPage() {
  try {
    // 预加载字体
    await Promise.all([
      figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
      figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    ]);
    
    // 创建主框架
    const mainFrame = figma.createFrame();
    mainFrame.name = '设置页面';
    mainFrame.x = 0;
    mainFrame.y = 0;
    mainFrame.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    mainFrame.fills = [{ type: 'SOLID', color: COLORS.gray50 }];
    figma.currentPage.appendChild(mainFrame);
    
    let currentY = 60;
    const cardWidth = SCREEN_WIDTH - PADDING * 2;
    
    // ========== 1. 页面标题 ==========
    await createText('设置', PADDING, currentY, {
      fontSize: 24,
      fontWeight: 500,
      color: COLORS.gray800,
      parent: mainFrame,
      name: '页面标题',
    });
    
    currentY += 36;
    
    await createText('个性化你的学习体验', PADDING, currentY, {
      fontSize: 14,
      fontWeight: 400,
      color: COLORS.gray600,
      parent: mainFrame,
      name: '页面副标题',
    });
    
    currentY += 40;
    
    // ========== 2. 用户信息卡片 ==========
    const userCardHeight = 88;
    const userCard = createCard(
      PADDING,
      currentY,
      cardWidth,
      userCardHeight,
      {
        color: COLORS.white,
        cornerRadius: 16,
        shadow: true,
        parent: mainFrame,
        name: '用户信息卡片',
      }
    );
    
    // 用户头像（渐变圆形）
    const avatarSize = 56;
    const avatar = figma.createEllipse();
    avatar.name = '用户头像';
    avatar.x = PADDING + 16;
    avatar.y = currentY + 16;
    avatar.resize(avatarSize, avatarSize);
    avatar.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: GRADIENTS.avatarBg.from },
        { position: 1, color: GRADIENTS.avatarBg.to },
      ],
    }];
    mainFrame.appendChild(avatar);
    
    // 头像中的图标（钢琴键）
    await createText('🎹', PADDING + 28, currentY + 24, {
      fontSize: 28,
      fontWeight: 400,
      color: COLORS.white,
      parent: mainFrame,
      name: '头像图标',
    });
    
    // 用户名称
    await createText('钢琴学习者', PADDING + 84, currentY + 20, {
      fontSize: 16,
      fontWeight: 500,
      color: COLORS.gray800,
      parent: mainFrame,
      name: '用户名称',
    });
    
    // 用户状态
    await createText('初级 · 已学习 7 天', PADDING + 84, currentY + 44, {
      fontSize: 14,
      fontWeight: 400,
      color: COLORS.gray600,
      parent: mainFrame,
      name: '用户状态',
    });
    
    // 右箭头
    await createText('›', SCREEN_WIDTH - PADDING - 24, currentY + 32, {
      fontSize: 24,
      fontWeight: 400,
      color: COLORS.gray400,
      parent: mainFrame,
      name: '箭头',
    });
    
    currentY += userCardHeight + 32;
    
    // ========== 3. 练习设置区域 ==========
    await createText('练习设置', PADDING, currentY, {
      fontSize: 14,
      fontWeight: 500,
      color: COLORS.gray700,
      parent: mainFrame,
      name: '练习设置标题',
    });
    
    currentY += 32;
    
    // 设置项数据
    const settingItems = [
      { 
        icon: '🎵', 
        iconBg: COLORS.musicBg,
        title: '音符与练习', 
        desc: '音符范围、调号、练习设置',
        spacing: 16
      },
      { 
        icon: '🔊', 
        iconBg: COLORS.soundBg,
        title: '音效设置', 
        desc: '开启练习反馈音效',
        spacing: 16
      },
      { 
        icon: '🔔', 
        iconBg: COLORS.notifyBg,
        title: '练习提醒', 
        desc: '每天 20:00 提醒练习',
        spacing: 32
      },
    ];
    
    // 创建设置项卡片
    for (const item of settingItems) {
      const itemCardHeight = 80;
      
      createCard(
        PADDING,
        currentY,
        cardWidth,
        itemCardHeight,
        {
          color: COLORS.white,
          cornerRadius: 16,
          shadow: true,
          parent: mainFrame,
          name: `${item.title}-卡片`,
        }
      );
      
      // 图标背景
      createIconBg(
        PADDING + 16,
        currentY + 20,
        40,
        item.iconBg,
        mainFrame
      );
      
      // 图标
      await createText(item.icon, PADDING + 26, currentY + 26, {
        fontSize: 24,
        fontWeight: 400,
        color: COLORS.gray800,
        parent: mainFrame,
        name: `${item.title}-图标`,
      });
      
      // 标题
      await createText(item.title, PADDING + 68, currentY + 20, {
        fontSize: 16,
        fontWeight: 500,
        color: COLORS.gray800,
        parent: mainFrame,
        name: `${item.title}-标题`,
      });
      
      // 描述
      await createText(item.desc, PADDING + 68, currentY + 44, {
        fontSize: 14,
        fontWeight: 400,
        color: COLORS.gray600,
        parent: mainFrame,
        name: `${item.title}-描述`,
      });
      
      // 右箭头
      await createText('›', SCREEN_WIDTH - PADDING - 24, currentY + 30, {
        fontSize: 24,
        fontWeight: 400,
        color: COLORS.gray400,
        parent: mainFrame,
        name: `${item.title}-箭头`,
      });
      
      currentY += itemCardHeight + item.spacing;
    }
    
    // ========== 4. 账户与帮助区域 ==========
    await createText('账户与帮助', PADDING, currentY, {
      fontSize: 14,
      fontWeight: 500,
      color: COLORS.gray700,
      parent: mainFrame,
      name: '账户与帮助标题',
    });
    
    currentY += 32;
    
    const accountItems = [
      { 
        icon: '👤', 
        iconBg: COLORS.userBg,
        title: '账户信息', 
        desc: '管理个人资料',
        spacing: 16
      },
      { 
        icon: '❓', 
        iconBg: COLORS.helpBg,
        title: '帮助中心', 
        desc: '常见问题解答',
        spacing: 16
      },
      { 
        icon: 'ℹ️', 
        iconBg: COLORS.infoBg,
        title: '关于应用', 
        desc: '版本 1.0.0',
        spacing: 24
      },
    ];
    
    // 创建账户与帮助项卡片
    for (const item of accountItems) {
      const itemCardHeight = 80;
      
      createCard(
        PADDING,
        currentY,
        cardWidth,
        itemCardHeight,
        {
          color: COLORS.white,
          cornerRadius: 16,
          shadow: true,
          parent: mainFrame,
          name: `${item.title}-卡片`,
        }
      );
      
      // 图标背景
      createIconBg(
        PADDING + 16,
        currentY + 20,
        40,
        item.iconBg,
        mainFrame
      );
      
      // 图标
      await createText(item.icon, PADDING + 26, currentY + 26, {
        fontSize: 24,
        fontWeight: 400,
        color: COLORS.gray800,
        parent: mainFrame,
        name: `${item.title}-图标`,
      });
      
      // 标题
      await createText(item.title, PADDING + 68, currentY + 20, {
        fontSize: 16,
        fontWeight: 500,
        color: COLORS.gray800,
        parent: mainFrame,
        name: `${item.title}-标题`,
      });
      
      // 描述
      await createText(item.desc, PADDING + 68, currentY + 44, {
        fontSize: 14,
        fontWeight: 400,
        color: COLORS.gray600,
        parent: mainFrame,
        name: `${item.title}-描述`,
      });
      
      // 右箭头
      await createText('›', SCREEN_WIDTH - PADDING - 24, currentY + 30, {
        fontSize: 24,
        fontWeight: 400,
        color: COLORS.gray400,
        parent: mainFrame,
        name: `${item.title}-箭头`,
      });
      
      currentY += itemCardHeight + item.spacing;
    }
    
    // ========== 5. 底部版本信息 ==========
    await createText('钢琴识谱练习 v1.0.0', SCREEN_WIDTH / 2 - 70, currentY, {
      fontSize: 12,
      fontWeight: 400,
      color: COLORS.gray600,
      parent: mainFrame,
      name: '版本信息',
    });
    
    currentY += 20;
    
    await createText('让音乐学习更简单', SCREEN_WIDTH / 2 - 56, currentY, {
      fontSize: 12,
      fontWeight: 400,
      color: COLORS.gray400,
      parent: mainFrame,
      name: '版本副标题',
    });
    
    // ========== 6. 底部导航栏 ==========
    const navY = SCREEN_HEIGHT - 64;
    
    createCard(
      0,
      navY,
      SCREEN_WIDTH,
      64,
      {
        color: COLORS.white,
        cornerRadius: 0,
        shadow: false,
        parent: mainFrame,
        name: '底部导航栏',
      }
    );
    
    // 顶部边框
    const navBorder = figma.createRectangle();
    navBorder.name = '导航栏边框';
    navBorder.x = 0;
    navBorder.y = navY;
    navBorder.resize(SCREEN_WIDTH, 1);
    navBorder.fills = [{ type: 'SOLID', color: COLORS.gray200 }];
    mainFrame.appendChild(navBorder);
    
    const navItems = [
      { label: '首页', icon: '🏠', active: false },
      { label: '进度', icon: '📈', active: false },
      { label: '设置', icon: '⚙️', active: true },
    ];
    
    const navItemWidth = SCREEN_WIDTH / 3;
    
    for (let i = 0; i < navItems.length; i++) {
      const navX = i * navItemWidth;
      const item = navItems[i];
      const color = item.active ? COLORS.indigo600 : COLORS.gray400;
      
      // 图标
      await createText(item.icon, navX + navItemWidth / 2 - 12, navY + 10, {
        fontSize: 24,
        fontWeight: 400,
        color: color,
        parent: mainFrame,
        name: `${item.label}-图标`,
      });
      
      // 标签
      await createText(item.label, navX + navItemWidth / 2 - 16, navY + 40, {
        fontSize: 12,
        fontWeight: 500,
        color: color,
        parent: mainFrame,
        name: `${item.label}-文本`,
      });
    }
    
    // 选中主框架并滚动到视图
    figma.currentPage.selection = [mainFrame];
    figma.viewport.scrollAndZoomIntoView([mainFrame]);
    
    figma.notify('设置页面创建成功！✅');
    
  } catch (error) {
    figma.notify(`创建失败: ${error.message}`);
    console.error('错误详情:', error);
    console.error('错误堆栈:', error.stack);
  }
}

// ========== 插件 UI ==========

figma.showUI(`
  <html>
    <head>
      <meta charset="utf-8">
      <title>创建设置页面设计稿</title>
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
          background: #4F46E5;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        .button:hover {
          background: #4338CA;
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
      <h1>⚙️ 创建设置页面设计稿</h1>
      <p>自动生成钢琴识谱练习应用的设置页面，包含用户信息、练习设置和账户帮助。</p>
      <button class="button" onclick="parent.postMessage({pluginMessage: {type: 'create'}}, '*')">创建设计稿</button>
      <button class="button secondary" onclick="parent.postMessage({pluginMessage: {type: 'cancel'}}, '*')">取消</button>
    </body>
  </html>
`, { width: 300, height: 200 });

// ========== 监听消息 ==========

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create') {
    createSettingsPage().then(() => {
      figma.closePlugin();
    }).catch((error) => {
      figma.notify(`创建失败: ${error.message}`);
      console.error(error);
    });
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

