/**
 * Figma 插件 - 设计系统示例
 * 展示颜色和文字大小的使用
 */

// ========== 颜色系统 ==========

/**
 * 十六进制转 RGB（Figma 格式）
 * 注意：Figma API 的 fills 不接受 'a' 属性，只接受 r, g, b
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

// 主色调（品牌色）
const themeColors = {
  indigo: {
    50: hexToRgb('#EEF2FF'),   // 浅背景
    100: hexToRgb('#E0E7FF'),
    600: hexToRgb('#4F46E5'),  // 主要操作按钮、激活状态
  },
  purple: {
    50: hexToRgb('#FAF5FF'),   // 浅背景
    100: hexToRgb('#F3E8FF'),
    600: hexToRgb('#9333EA'),  // 渐变辅助色
  },
  pink: {
    50: hexToRgb('#FDF2F8'),
    500: hexToRgb('#EC4899'),  // 渐变终点色
  },
};

// 中性色（灰度）
const grayColors = {
  white: hexToRgb('#FFFFFF'),  // 卡片背景、键盘
  50: hexToRgb('#F9FAFB'),
  200: hexToRgb('#E5E7EB'),    // 卡片边框、分隔线
  400: hexToRgb('#9CA3AF'),    // 未激活图标、辅助文字
  600: hexToRgb('#4B5563'),    // 次要文字
  800: hexToRgb('#1F2937'),    // 主要文字、标题
  900: hexToRgb('#111827'),    // 黑键
};

// 功能色
const functionalColors = {
  // 成功（绿色）
  green: {
    100: hexToRgb('#DCFCE7'),  // 正确反馈背景
    600: hexToRgb('#16A34A'),  // 正确反馈图标
    800: hexToRgb('#166534'),  // 正确反馈文字
  },
  // 错误（红色）
  red: {
    100: hexToRgb('#FEE2E2'),  // 错误反馈背景
    800: hexToRgb('#991B1B'),  // 错误反馈文字
  },
  // 警告（橙/琥珀色）
  amber: {
    50: hexToRgb('#FFFBEB'),   // 目标卡片背景
    200: hexToRgb('#FDE68A'),  // 目标卡片边框
    400: hexToRgb('#FBBF24'),  // 进度条起始
  },
  orange: {
    500: hexToRgb('#F97316'),  // 进度条终点、连击背景
  },
  amber500: hexToRgb('#F59E0B'), // amber-500
  // 辅助色（蓝色）
  blue: {
    100: hexToRgb('#DBEAFE'),  // 功能卡片背景
    600: hexToRgb('#2563EB'),  // 功能图标
  },
};

// 渐变配色
const gradients = {
  // 主背景渐变
  mainBackground: {
    from: themeColors.indigo[50],
    via: themeColors.purple[50],
    to: themeColors.pink[50],
  },
  // 按钮渐变
  primaryButton: {
    from: themeColors.indigo[600],
    to: themeColors.purple[600],
  },
  // 连击渐变
  combo: {
    from: functionalColors.orange[500],
    to: functionalColors.amber500,
  },
  // 启动页渐变
  splash: {
    from: themeColors.indigo[600],
    via: themeColors.purple[600],
    to: themeColors.pink[500],
  },
};

// ========== 文字系统 ==========

const typography = {
  // 字体大小（px）
  sizes: {
    xs: 12,      // 标签、小字提示 (text-xs)
    sm: 14,      // 辅助说明 (text-sm)
    base: 16,    // 正文、按钮文字、基础字号 (text-base / H4)
    lg: 18,      // 次级标题 (text-lg / H3)
    xl: 20,      // 区块标题、数据统计 (text-xl / H2)
    '2xl': 24,   // 页面主标题、大号数据 (text-2xl / H1)
    '4xl': 36,   // 启动页应用名 (text-4xl)
  },
  
  // 字重
  weights: {
    normal: 400,  // 正文、输入框 (font-normal)
    medium: 500,  // 标题、按钮、标签 (font-medium)
  },
  
  // 行高
  lineHeights: {
    normal: 1.5,  // 默认行高 (leading-normal)
  },
  
  // 文字颜色
  textColors: {
    primary: grayColors[800],      // 标题、重要信息 (text-gray-800)
    secondary: grayColors[600],    // 辅助说明、描述 (text-gray-600)
    tertiary: grayColors[400],     // 未激活状态、占位符 (text-gray-400)
    white: grayColors.white,       // 按钮文字、启动页文字 (text-white)
    // 注意：Figma 文本不支持透明度，如果需要透明度需要使用其他方式
    active: themeColors.indigo[600], // 激活状态、强调数据 (text-indigo-600)
  },
};

// ========== 示例：创建设计系统展示 ==========

/**
 * 创建文本节点
 */
async function createTextNode(x, y, text, fontSize, fontWeight, color, name) {
  const fontStyle = fontWeight === 500 ? 'Medium' : 'Regular';
  
  // 先加载字体
  await figma.loadFontAsync({ 
    family: 'Inter', 
    style: fontStyle
  });
  
  // 创建文本节点
  const textNode = figma.createText();
  textNode.name = name || '文本';
  textNode.x = x;
  textNode.y = y;
  
  // 必须先设置 fontName，再设置 characters
  textNode.fontName = { 
    family: 'Inter', 
    style: fontStyle
  };
  textNode.fontSize = fontSize;
  textNode.characters = text;
  textNode.fills = [{ type: 'SOLID', color }];
  
  return textNode;
}

/**
 * 创建颜色示例卡片
 */
function createColorCard(x, y, width, height, name, color, label) {
  const frame = figma.createFrame();
  frame.name = name;
  frame.x = x;
  frame.y = y;
  frame.resize(width, height);
  frame.fills = [{ type: 'SOLID', color }];
  frame.cornerRadius = 8;
  
  // 添加标签文本（异步，稍后添加）
  return frame;
}

/**
 * 创建设计系统示例
 */
async function createDesignSystemExample() {
  try {
    const container = figma.createFrame();
    container.name = '设计系统示例';
    container.x = 0;
    container.y = 0;
    container.resize(800, 1200);
    container.fills = [{ type: 'SOLID', color: grayColors[50] }];
    
    let currentY = 40;
    const spacing = 60;
    const cardWidth = 180;
    const cardHeight = 100;
    
    // 标题
    const title = await createTextNode(
      40, 
      currentY, 
      '设计系统示例 - 颜色与文字', 
      typography.sizes['2xl'], 
      typography.weights.medium,
      typography.textColors.primary,
      '标题'
    );
    container.appendChild(title);
    currentY += 60;
    
    // ========== 颜色示例 ==========
    
    const colorTitle = await createTextNode(
      40,
      currentY,
      '颜色系统',
      typography.sizes.xl,
      typography.weights.medium,
      typography.textColors.primary,
      '颜色标题'
    );
    container.appendChild(colorTitle);
    currentY += 50;
    
    // 主色调
    const themeTitle = await createTextNode(
      40,
      currentY,
      '主色调（Indigo/Purple/Pink）',
      typography.sizes.base,
      typography.weights.medium,
      typography.textColors.secondary,
      '主题色标题'
    );
    container.appendChild(themeTitle);
    currentY += 30;
    
    // Indigo 系列
    const indigo50 = createColorCard(40, currentY, cardWidth, cardHeight, 'Indigo-50', themeColors.indigo[50], 'Indigo 50');
    container.appendChild(indigo50);
    
    const indigo100 = createColorCard(240, currentY, cardWidth, cardHeight, 'Indigo-100', themeColors.indigo[100], 'Indigo 100');
    container.appendChild(indigo100);
    
    const indigo600 = createColorCard(440, currentY, cardWidth, cardHeight, 'Indigo-600', themeColors.indigo[600], 'Indigo 600');
    container.appendChild(indigo600);
    
    // 添加标签
    const indigo50Label = await createTextNode(50, currentY + 10, 'Indigo 50', typography.sizes.sm, typography.weights.normal, grayColors[800], '');
    indigo50.appendChild(indigo50Label);
    
    const indigo100Label = await createTextNode(250, currentY + 10, 'Indigo 100', typography.sizes.sm, typography.weights.normal, grayColors[800], '');
    indigo100.appendChild(indigo100Label);
    
    const indigo600Label = await createTextNode(450, currentY + 10, 'Indigo 600', typography.sizes.sm, typography.weights.medium, grayColors.white, '');
    indigo600.appendChild(indigo600Label);
    
    currentY += cardHeight + spacing;
    
    // Purple 系列
    const purple50 = createColorCard(40, currentY, cardWidth, cardHeight, 'Purple-50', themeColors.purple[50], 'Purple 50');
    container.appendChild(purple50);
    
    const purple100 = createColorCard(240, currentY, cardWidth, cardHeight, 'Purple-100', themeColors.purple[100], 'Purple 100');
    container.appendChild(purple100);
    
    const purple600 = createColorCard(440, currentY, cardWidth, cardHeight, 'Purple-600', themeColors.purple[600], 'Purple 600');
    container.appendChild(purple600);
    
    const purple50Label = await createTextNode(50, currentY + 10, 'Purple 50', typography.sizes.sm, typography.weights.normal, grayColors[800], '');
    purple50.appendChild(purple50Label);
    
    const purple100Label = await createTextNode(250, currentY + 10, 'Purple 100', typography.sizes.sm, typography.weights.normal, grayColors[800], '');
    purple100.appendChild(purple100Label);
    
    const purple600Label = await createTextNode(450, currentY + 10, 'Purple 600', typography.sizes.sm, typography.weights.medium, grayColors.white, '');
    purple600.appendChild(purple600Label);
    
    currentY += cardHeight + spacing;
    
    // Pink 系列
    const pink50 = createColorCard(40, currentY, cardWidth, cardHeight, 'Pink-50', themeColors.pink[50], 'Pink 50');
    container.appendChild(pink50);
    
    const pink500 = createColorCard(240, currentY, cardWidth, cardHeight, 'Pink-500', themeColors.pink[500], 'Pink 500');
    container.appendChild(pink500);
    
    const pink50Label = await createTextNode(50, currentY + 10, 'Pink 50', typography.sizes.sm, typography.weights.normal, grayColors[800], '');
    pink50.appendChild(pink50Label);
    
    const pink500Label = await createTextNode(250, currentY + 10, 'Pink 500', typography.sizes.sm, typography.weights.medium, grayColors.white, '');
    pink500.appendChild(pink500Label);
    
    currentY += cardHeight + spacing;
    
    // 功能色
    const funcTitle = await createTextNode(
      40,
      currentY,
      '功能色（Green/Red/Orange/Blue）',
      typography.sizes.base,
      typography.weights.medium,
      typography.textColors.secondary,
      '功能色标题'
    );
    container.appendChild(funcTitle);
    currentY += 30;
    
    // Green
    const green100 = createColorCard(40, currentY, cardWidth, cardHeight, 'Green-100', functionalColors.green[100], 'Green 100');
    container.appendChild(green100);
    
    const green600 = createColorCard(240, currentY, cardWidth, cardHeight, 'Green-600', functionalColors.green[600], 'Green 600');
    container.appendChild(green600);
    
    const green800 = createColorCard(440, currentY, cardWidth, cardHeight, 'Green-800', functionalColors.green[800], 'Green 800');
    container.appendChild(green800);
    
    const green100Label = await createTextNode(50, currentY + 10, 'Green 100', typography.sizes.sm, typography.weights.normal, grayColors[800], '');
    green100.appendChild(green100Label);
    
    const green600Label = await createTextNode(250, currentY + 10, 'Green 600', typography.sizes.sm, typography.weights.medium, grayColors.white, '');
    green600.appendChild(green600Label);
    
    const green800Label = await createTextNode(450, currentY + 10, 'Green 800', typography.sizes.sm, typography.weights.medium, grayColors.white, '');
    green800.appendChild(green800Label);
    
    currentY += cardHeight + 20;
    
    // Red, Orange, Blue
    const red100 = createColorCard(40, currentY, cardWidth, cardHeight, 'Red-100', functionalColors.red[100], 'Red 100');
    container.appendChild(red100);
    
    const red800 = createColorCard(240, currentY, cardWidth, cardHeight, 'Red-800', functionalColors.red[800], 'Red 800');
    container.appendChild(red800);
    
    const orange500 = createColorCard(440, currentY, cardWidth, cardHeight, 'Orange-500', functionalColors.orange[500], 'Orange 500');
    container.appendChild(orange500);
    
    const red100Label = await createTextNode(50, currentY + 10, 'Red 100', typography.sizes.sm, typography.weights.normal, grayColors[800], '');
    red100.appendChild(red100Label);
    
    const red800Label = await createTextNode(250, currentY + 10, 'Red 800', typography.sizes.sm, typography.weights.medium, grayColors.white, '');
    red800.appendChild(red800Label);
    
    const orange500Label = await createTextNode(450, currentY + 10, 'Orange 500', typography.sizes.sm, typography.weights.medium, grayColors.white, '');
    orange500.appendChild(orange500Label);
    
    currentY += cardHeight + 20;
    
    const blue100 = createColorCard(40, currentY, cardWidth, cardHeight, 'Blue-100', functionalColors.blue[100], 'Blue 100');
    container.appendChild(blue100);
    
    const blue600 = createColorCard(240, currentY, cardWidth, cardHeight, 'Blue-600', functionalColors.blue[600], 'Blue 600');
    container.appendChild(blue600);
    
    const blue100Label = await createTextNode(50, currentY + 10, 'Blue 100', typography.sizes.sm, typography.weights.normal, grayColors[800], '');
    blue100.appendChild(blue100Label);
    
    const blue600Label = await createTextNode(250, currentY + 10, 'Blue 600', typography.sizes.sm, typography.weights.medium, grayColors.white, '');
    blue600.appendChild(blue600Label);
    
    currentY += cardHeight + spacing;
    
    // ========== 文字大小示例 ==========
    
    const textTitle = await createTextNode(
      40,
      currentY,
      '文字系统',
      typography.sizes.xl,
      typography.weights.medium,
      typography.textColors.primary,
      '文字标题'
    );
    container.appendChild(textTitle);
    currentY += 50;
    
    // 标题层级
    const h1 = await createTextNode(
      40,
      currentY,
      'H1 - 页面主标题 (24px)',
      typography.sizes['2xl'],
      typography.weights.medium,
      typography.textColors.primary,
      'H1'
    );
    container.appendChild(h1);
    currentY += 40;
    
    const h2 = await createTextNode(
      40,
      currentY,
      'H2 - 区块标题 (20px)',
      typography.sizes.xl,
      typography.weights.medium,
      typography.textColors.primary,
      'H2'
    );
    container.appendChild(h2);
    currentY += 35;
    
    const h3 = await createTextNode(
      40,
      currentY,
      'H3 - 次级标题 (18px)',
      typography.sizes.lg,
      typography.weights.medium,
      typography.textColors.primary,
      'H3'
    );
    container.appendChild(h3);
    currentY += 30;
    
    const h4 = await createTextNode(
      40,
      currentY,
      'H4 - 小标题 (16px)',
      typography.sizes.base,
      typography.weights.medium,
      typography.textColors.primary,
      'H4'
    );
    container.appendChild(h4);
    currentY += 30;
    
    // 正文
    const body = await createTextNode(
      40,
      currentY,
      '正文 - 正文、按钮文字 (16px)',
      typography.sizes.base,
      typography.weights.normal,
      typography.textColors.primary,
      '正文'
    );
    container.appendChild(body);
    currentY += 30;
    
    const sm = await createTextNode(
      40,
      currentY,
      '辅助说明 (14px)',
      typography.sizes.sm,
      typography.weights.normal,
      typography.textColors.secondary,
      '辅助说明'
    );
    container.appendChild(sm);
    currentY += 25;
    
    const xs = await createTextNode(
      40,
      currentY,
      '标签、小字提示 (12px)',
      typography.sizes.xs,
      typography.weights.normal,
      typography.textColors.tertiary,
      '标签'
    );
    container.appendChild(xs);
    currentY += 30;
    
    // 特殊尺寸
    const xl4 = await createTextNode(
      40,
      currentY,
      '启动页应用名 (36px)',
      typography.sizes['4xl'],
      typography.weights.medium,
      typography.textColors.primary,
      '特殊尺寸'
    );
    container.appendChild(xl4);
    
    // 文字颜色示例
    currentY += 60;
    const colorTextTitle = await createTextNode(
      40,
      currentY,
      '文字颜色示例',
      typography.sizes.base,
      typography.weights.medium,
      typography.textColors.secondary,
      '文字颜色标题'
    );
    container.appendChild(colorTextTitle);
    currentY += 30;
    
    const textPrimary = await createTextNode(
      40,
      currentY,
      '主要文字 (Gray 800)',
      typography.sizes.base,
      typography.weights.normal,
      typography.textColors.primary,
      '主要文字'
    );
    container.appendChild(textPrimary);
    currentY += 25;
    
    const textSecondary = await createTextNode(
      40,
      currentY,
      '次要文字 (Gray 600)',
      typography.sizes.base,
      typography.weights.normal,
      typography.textColors.secondary,
      '次要文字'
    );
    container.appendChild(textSecondary);
    currentY += 25;
    
    const textTertiary = await createTextNode(
      40,
      currentY,
      '浅色文字 (Gray 400)',
      typography.sizes.base,
      typography.weights.normal,
      typography.textColors.tertiary,
      '浅色文字'
    );
    container.appendChild(textTertiary);
    currentY += 25;
    
    const textActive = await createTextNode(
      40,
      currentY,
      '激活状态 (Indigo 600)',
      typography.sizes.base,
      typography.weights.medium,
      typography.textColors.active,
      '激活状态'
    );
    container.appendChild(textActive);
    
    // 渐变示例
    currentY += 50;
    const gradientTitle = await createTextNode(
      40,
      currentY,
      '渐变示例',
      typography.sizes.base,
      typography.weights.medium,
      typography.textColors.secondary,
      '渐变标题'
    );
    container.appendChild(gradientTitle);
    currentY += 30;
    
    // 按钮渐变
    const buttonGradient = figma.createFrame();
    buttonGradient.name = '按钮渐变';
    buttonGradient.x = 40;
    buttonGradient.y = currentY;
    buttonGradient.resize(200, 60);
    buttonGradient.cornerRadius = 8;
    
    // 渐变需要 gradientTransform 和颜色需要包含 alpha
    // 确保颜色对象包含 a 属性
    const gradientFrom = {
      r: gradients.primaryButton.from.r,
      g: gradients.primaryButton.from.g,
      b: gradients.primaryButton.from.b,
      a: 1
    };
    const gradientTo = {
      r: gradients.primaryButton.to.r,
      g: gradients.primaryButton.to.g,
      b: gradients.primaryButton.to.b,
      a: 1
    };
    
    buttonGradient.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]], // 水平渐变
      gradientStops: [
        { position: 0, color: gradientFrom },
        { position: 1, color: gradientTo },
      ],
    }];
    container.appendChild(buttonGradient);
    
    const buttonGradientLabel = await createTextNode(
      50,
      currentY + 20,
      '按钮渐变',
      typography.sizes.base,
      typography.weights.medium,
      grayColors.white,
      '按钮渐变标签'
    );
    buttonGradient.appendChild(buttonGradientLabel);
    
    figma.currentPage.appendChild(container);
    figma.currentPage.selection = [container];
    figma.viewport.scrollAndZoomIntoView([container]);
    
    figma.notify('设计系统示例创建成功！');
  } catch (error) {
    figma.notify(`创建失败: ${error.message}`);
    console.error('错误详情:', error);
  }
}

// ========== 插件 UI ==========

figma.showUI(`
  <html>
    <head>
      <meta charset="utf-8">
      <title>设计系统示例</title>
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
          padding: 10px 16px;
          background: #4F46E5;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        .button:hover {
          background: #4338CA;
        }
      </style>
    </head>
    <body>
      <h1>设计系统示例</h1>
      <p>创建颜色和文字大小的展示示例</p>
      
      <button class="button" onclick="parent.postMessage({pluginMessage: {type: 'create-example'}}, '*')">
        🎨 创建设计系统示例
      </button>
    </body>
  </html>
`, { width: 300, height: 150 });

// 监听来自 UI 的消息
figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === 'create-example') {
      await createDesignSystemExample();
    }
  } catch (error) {
    const errorMessage = error.message || String(error);
    figma.notify(`操作失败: ${errorMessage}`);
    console.error('插件错误:', error);
  }
};
