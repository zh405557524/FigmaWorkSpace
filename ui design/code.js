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

/**
 * 创建钢琴识谱练习首页
 */
async function createHomePage() {
  try {
    // 预加载字体
    await Promise.all([
      figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
      figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    ]);
    
    // 创建主容器
    const container = figma.createFrame();
    container.name = '钢琴识谱练习-首页';
    container.x = 0;
    container.y = 0;
    container.resize(375, 812);  // 移动端尺寸
    container.fills = [{ type: 'SOLID', color: grayColors[50] }];
    
    const padding = 24;
    const cardSpacing = 12;
    let currentY = 60;
    
    // ========== 1. 顶部标题区域 ==========
    
    // Logo 图标（紫色圆形）
    const logoCircle = figma.createEllipse();
    logoCircle.name = 'Logo';
    logoCircle.x = padding;
    logoCircle.y = currentY;
    logoCircle.resize(64, 64);
    logoCircle.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: { r: themeColors.indigo[600].r, g: themeColors.indigo[600].g, b: themeColors.indigo[600].b, a: 1 } },
        { position: 1, color: { r: themeColors.purple[600].r, g: themeColors.purple[600].g, b: themeColors.purple[600].b, a: 1 } },
      ],
    }];
    container.appendChild(logoCircle);
    
    // Logo 中的钢琴键图标（简化为白色矩形）
    const pianoIcon = figma.createFrame();
    pianoIcon.name = '钢琴图标';
    pianoIcon.x = padding + 18;
    pianoIcon.y = currentY + 18;
    pianoIcon.resize(28, 28);
    pianoIcon.fills = [];
    container.appendChild(pianoIcon);
    
    // 简化的钢琴键图标（3个白色矩形）
    for (let i = 0; i < 3; i++) {
      const key = figma.createRectangle();
      key.x = padding + 20 + i * 8;
      key.y = currentY + 22;
      key.resize(6, 20);
      key.fills = [{ type: 'SOLID', color: grayColors.white }];
      key.cornerRadius = 1;
      container.appendChild(key);
    }
    
    // 标题
    const title = await createTextNode(
      padding + 80,
      currentY + 10,
      '钢琴识谱练习',
      typography.sizes.xl,
      typography.weights.medium,
      typography.textColors.primary,
      '标题'
    );
    container.appendChild(title);
    
    // 副标题
    const subtitle = await createTextNode(
      padding + 80,
      currentY + 38,
      '提升你的视谱能力',
      typography.sizes.sm,
      typography.weights.normal,
      typography.textColors.secondary,
      '副标题'
    );
    container.appendChild(subtitle);
    
    currentY += 120;
    
    // ========== 2. 统计卡片区域 ==========
    
    const cardWidth = (375 - padding * 2 - cardSpacing * 2) / 3;
    const cardHeight = 100;
    
    const statsData = [
      { value: '7', label: '连续天数', color: themeColors.indigo[600] },
      { value: '127', label: '练习次数', color: themeColors.purple[600] },
      { value: '85%', label: '准确率', color: functionalColors.green[600] },
    ];
    
    for (let i = 0; i < statsData.length; i++) {
      const stat = statsData[i];
      const cardX = padding + i * (cardWidth + cardSpacing);
      
      // 卡片背景
      const card = figma.createRectangle();
      card.name = `统计卡片-${stat.label}`;
      card.x = cardX;
      card.y = currentY;
      card.resize(cardWidth, cardHeight);
      card.fills = [{ type: 'SOLID', color: grayColors.white }];
      card.cornerRadius = 16;
      card.effects = [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.05 },
        offset: { x: 0, y: 2 },
        radius: 8,
        visible: true,
        blendMode: 'NORMAL',
      }];
      container.appendChild(card);
      
      // 数值
      const valueText = await createTextNode(
        cardX + cardWidth / 2 - 15,
        currentY + 25,
        stat.value,
        typography.sizes['2xl'],
        typography.weights.medium,
        stat.color,
        `数值-${stat.label}`
      );
      container.appendChild(valueText);
      
      // 标签
      const labelText = await createTextNode(
        cardX + cardWidth / 2 - 24,
        currentY + 60,
        stat.label,
        typography.sizes.xs,
        typography.weights.normal,
        typography.textColors.secondary,
        `标签-${stat.label}`
      );
      container.appendChild(labelText);
    }
    
    currentY += cardHeight + 32;
    
    // ========== 3. 开始练习按钮 ==========
    
    const buttonHeight = 96;
    const button = figma.createRectangle();
    button.name = '开始练习按钮';
    button.x = padding;
    button.y = currentY;
    button.resize(375 - padding * 2, buttonHeight);
    button.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: { r: themeColors.indigo[600].r, g: themeColors.indigo[600].g, b: themeColors.indigo[600].b, a: 1 } },
        { position: 1, color: { r: themeColors.purple[600].r, g: themeColors.purple[600].g, b: themeColors.purple[600].b, a: 1 } },
      ],
    }];
    button.cornerRadius = 20;
    button.effects = [{
      type: 'DROP_SHADOW',
      color: { r: themeColors.purple[600].r, g: themeColors.purple[600].g, b: themeColors.purple[600].b, a: 0.3 },
      offset: { x: 0, y: 4 },
      radius: 12,
      visible: true,
      blendMode: 'NORMAL',
    }];
    container.appendChild(button);
    
    // 播放图标（圆形）
    const playCircle = figma.createEllipse();
    playCircle.name = '播放图标';
    playCircle.x = padding + 20;
    playCircle.y = currentY + 28;
    playCircle.resize(40, 40);
    // 注意：SOLID 类型不支持透明度，使用浅灰色代替
    playCircle.fills = [{ type: 'SOLID', color: grayColors[200] }];
    playCircle.opacity = 0.3;  // 使用 opacity 属性设置透明度
    container.appendChild(playCircle);
    
    // 播放三角形（用圆形代替）
    const playIcon = figma.createEllipse();
    playIcon.x = padding + 30;
    playIcon.y = currentY + 38;
    playIcon.resize(20, 20);
    playIcon.fills = [{ type: 'SOLID', color: grayColors.white }];
    container.appendChild(playIcon);
    
    // 按钮主文字
    const buttonText = await createTextNode(
      padding + 75,
      currentY + 28,
      '开始练习',
      typography.sizes.xl,
      typography.weights.medium,
      grayColors.white,
      '按钮文字'
    );
    container.appendChild(buttonText);
    
    // 按钮副文字
    const buttonSubtext = await createTextNode(
      padding + 75,
      currentY + 56,
      '继续你的学习之旅',
      typography.sizes.sm,
      typography.weights.normal,
      { r: 1, g: 1, b: 1 },
      '按钮副文字'
    );
    container.appendChild(buttonSubtext);
    
    currentY += buttonHeight + 32;
    
    // ========== 4. 练习模式区域 ==========
    
    // 练习模式标题
    const modeTitle = await createTextNode(
      padding,
      currentY,
      '练习模式',
      typography.sizes.lg,
      typography.weights.medium,
      typography.textColors.primary,
      '练习模式标题'
    );
    container.appendChild(modeTitle);
    
    currentY += 40;
    
    // 练习模式卡片数据
    const modesData = [
      { 
        title: '音符识别', 
        subtitle: '识别五线谱上的音符',
        iconBg: functionalColors.blue[100],
        iconColor: functionalColors.blue[600],
      },
      { 
        title: '视奏挑战', 
        subtitle: '快速视奏音符序列',
        iconBg: themeColors.purple[100],
        iconColor: themeColors.purple[600],
      },
      { 
        title: '和弦练习', 
        subtitle: '识别常见和弦',
        iconBg: functionalColors.green[100],
        iconColor: functionalColors.green[600],
      },
    ];
    
    for (let i = 0; i < modesData.length; i++) {
      const mode = modesData[i];
      const modeCardHeight = 80;
      
      // 模式卡片背景
      const modeCard = figma.createRectangle();
      modeCard.name = `模式卡片-${mode.title}`;
      modeCard.x = padding;
      modeCard.y = currentY;
      modeCard.resize(375 - padding * 2, modeCardHeight);
      modeCard.fills = [{ type: 'SOLID', color: grayColors.white }];
      modeCard.cornerRadius = 16;
      modeCard.effects = [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.05 },
        offset: { x: 0, y: 2 },
        radius: 8,
        visible: true,
        blendMode: 'NORMAL',
      }];
      container.appendChild(modeCard);
      
      // 图标背景
      const iconBg = figma.createRectangle();
      iconBg.name = `图标背景-${mode.title}`;
      iconBg.x = padding + 16;
      iconBg.y = currentY + 20;
      iconBg.resize(40, 40);
      iconBg.fills = [{ type: 'SOLID', color: mode.iconBg }];
      iconBg.cornerRadius = 12;
      container.appendChild(iconBg);
      
      // 图标（简化为圆形）
      const icon = figma.createEllipse();
      icon.x = padding + 26;
      icon.y = currentY + 30;
      icon.resize(20, 20);
      icon.fills = [{ type: 'SOLID', color: mode.iconColor }];
      container.appendChild(icon);
      
      // 标题
      const modeCardTitle = await createTextNode(
        padding + 70,
        currentY + 20,
        mode.title,
        typography.sizes.base,
        typography.weights.medium,
        typography.textColors.primary,
        `标题-${mode.title}`
      );
      container.appendChild(modeCardTitle);
      
      // 副标题
      const modeCardSubtitle = await createTextNode(
        padding + 70,
        currentY + 44,
        mode.subtitle,
        typography.sizes.sm,
        typography.weights.normal,
        typography.textColors.secondary,
        `副标题-${mode.title}`
      );
      container.appendChild(modeCardSubtitle);
      
      // 右箭头
      const arrow = figma.createRectangle();
      arrow.name = `箭头-${mode.title}`;
      arrow.x = 375 - padding - 24;
      arrow.y = currentY + 30;
      arrow.resize(8, 20);
      arrow.fills = [{ type: 'SOLID', color: grayColors[400] }];
      arrow.cornerRadius = 2;
      container.appendChild(arrow);
      
      currentY += modeCardHeight + 16;
    }
    
    // ========== 5. 今日目标区域 ==========
    
    currentY += 8;  // 额外间距
    
    const goalCardHeight = 120;
    const goalCard = figma.createRectangle();
    goalCard.name = '今日目标卡片';
    goalCard.x = padding;
    goalCard.y = currentY;
    goalCard.resize(375 - padding * 2, goalCardHeight);
    goalCard.fills = [{ type: 'SOLID', color: functionalColors.amber[50] }];
    goalCard.cornerRadius = 20;
    goalCard.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.05 },
      offset: { x: 0, y: 2 },
      radius: 8,
      visible: true,
      blendMode: 'NORMAL',
    }];
    container.appendChild(goalCard);
    
    // 标题
    const goalTitle = await createTextNode(
      padding + 20,
      currentY + 20,
      '今日目标',
      typography.sizes.lg,
      typography.weights.medium,
      typography.textColors.primary,
      '今日目标标题'
    );
    container.appendChild(goalTitle);
    
    // 进度条背景
    const progressBg = figma.createRectangle();
    progressBg.name = '进度条背景';
    progressBg.x = padding + 20;
    progressBg.y = currentY + 50;
    progressBg.resize(375 - padding * 2 - 100, 12);  // 留出百分比空间
    progressBg.fills = [{ type: 'SOLID', color: grayColors[200] }];
    progressBg.cornerRadius = 6;
    container.appendChild(progressBg);
    
    // 进度条填充（橙色到琥珀色渐变）
    const progressValue = 0.6;  // 60%
    const progressWidth = (375 - padding * 2 - 100) * progressValue;
    const progressFill = figma.createRectangle();
    progressFill.name = '进度条填充';
    progressFill.x = padding + 20;
    progressFill.y = currentY + 50;
    progressFill.resize(progressWidth, 12);
    progressFill.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: { r: functionalColors.amber[400].r, g: functionalColors.amber[400].g, b: functionalColors.amber[400].b, a: 1 } },
        { position: 1, color: { r: functionalColors.orange[500].r, g: functionalColors.orange[500].g, b: functionalColors.orange[500].b, a: 1 } },
      ],
    }];
    progressFill.cornerRadius = 6;
    container.appendChild(progressFill);
    
    // 百分比文字
    const progressPercent = await createTextNode(
      375 - padding - 60,
      currentY + 48,
      '60%',
      typography.sizes.base,
      typography.weights.medium,
      typography.textColors.primary,
      '进度百分比'
    );
    container.appendChild(progressPercent);
    
    // 目标提示文字
    const goalHint = await createTextNode(
      padding + 20,
      currentY + 75,
      '再完成 4 个练习达成今日目标!',
      typography.sizes.sm,
      typography.weights.normal,
      typography.textColors.primary,
      '目标提示'
    );
    container.appendChild(goalHint);
    
    currentY += goalCardHeight + 32;
    
    // ========== 6. 底部导航栏 ==========
    
    const navHeight = 70;
    const navY = 812 - navHeight;
    
    // 导航栏背景
    const navBar = figma.createRectangle();
    navBar.name = '导航栏';
    navBar.x = 0;
    navBar.y = navY;
    navBar.resize(375, navHeight);
    navBar.fills = [{ type: 'SOLID', color: grayColors.white }];
    navBar.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: -2 },
      radius: 8,
      visible: true,
      blendMode: 'NORMAL',
    }];
    container.appendChild(navBar);
    
    const navItems = [
      { label: '首页', active: true },
      { label: '进度', active: false },
      { label: '设置', active: false },
    ];
    
    const navItemWidth = 375 / 3;
    
    for (let i = 0; i < navItems.length; i++) {
      const item = navItems[i];
      const navX = i * navItemWidth;
      const color = item.active ? themeColors.indigo[600] : grayColors[400];
      
      // 图标（简化为圆形）
      const navIcon = figma.createEllipse();
      navIcon.x = navX + navItemWidth / 2 - 12;
      navIcon.y = navY + 12;
      navIcon.resize(24, 24);
      navIcon.fills = [{ type: 'SOLID', color }];
      container.appendChild(navIcon);
      
      // 标签
      const navLabel = await createTextNode(
        navX + navItemWidth / 2 - 16,
        navY + 42,
        item.label,
        typography.sizes.xs,
        typography.weights.normal,
        color,
        `导航-${item.label}`
      );
      container.appendChild(navLabel);
    }
    
    // 添加到画布
    figma.currentPage.appendChild(container);
    figma.currentPage.selection = [container];
    figma.viewport.scrollAndZoomIntoView([container]);
    
    figma.notify('首页创建成功！');
  } catch (error) {
    figma.notify(`创建失败: ${error.message}`);
    console.error('错误详情:', error);
  }
}

/**
 * 创建练习模式和今日目标UI组件
 */
async function createPracticeModeAndGoal() {
  try {
    // 预加载字体
    await Promise.all([
      figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
      figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    ]);
    
    // 创建容器框架
    const container = figma.createFrame();
    container.name = '练习模式与今日目标';
    container.x = 0;
    container.y = 0;
    container.resize(375, 600);
    container.fills = [{ type: 'SOLID', color: grayColors[50] }];
    
    const padding = 24;
    let currentY = 40;
    
    // ========== 1. 练习模式区域 ==========
    
    // 练习模式标题
    const modeTitle = await createTextNode(
      padding,
      currentY,
      '练习模式',
      typography.sizes.lg,
      typography.weights.medium,
      typography.textColors.primary,
      '练习模式标题'
    );
    container.appendChild(modeTitle);
    
    currentY += 40;
    
    // 练习模式卡片数据
    const modesData = [
      { 
        title: '音符识别', 
        subtitle: '识别五线谱上的音符',
        iconBg: functionalColors.blue[100],
        iconColor: functionalColors.blue[600],
      },
      { 
        title: '视奏挑战', 
        subtitle: '快速视奏音符序列',
        iconBg: themeColors.purple[100],
        iconColor: themeColors.purple[600],
      },
      { 
        title: '和弦练习', 
        subtitle: '识别常见和弦',
        iconBg: functionalColors.green[100],
        iconColor: functionalColors.green[600],
      },
    ];
    
    for (let i = 0; i < modesData.length; i++) {
      const mode = modesData[i];
      const modeCardHeight = 80;
      
      // 模式卡片背景
      const modeCard = figma.createRectangle();
      modeCard.name = `模式卡片-${mode.title}`;
      modeCard.x = padding;
      modeCard.y = currentY;
      modeCard.resize(375 - padding * 2, modeCardHeight);
      modeCard.fills = [{ type: 'SOLID', color: grayColors.white }];
      modeCard.cornerRadius = 16;
      modeCard.effects = [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.05 },
        offset: { x: 0, y: 2 },
        radius: 8,
        visible: true,
        blendMode: 'NORMAL',
      }];
      container.appendChild(modeCard);
      
      // 图标背景
      const iconBg = figma.createRectangle();
      iconBg.name = `图标背景-${mode.title}`;
      iconBg.x = padding + 16;
      iconBg.y = currentY + 20;
      iconBg.resize(40, 40);
      iconBg.fills = [{ type: 'SOLID', color: mode.iconBg }];
      iconBg.cornerRadius = 12;
      container.appendChild(iconBg);
      
      // 图标（简化为圆形，实际应该是音符图标）
      const icon = figma.createEllipse();
      icon.x = padding + 26;
      icon.y = currentY + 30;
      icon.resize(20, 20);
      icon.fills = [{ type: 'SOLID', color: mode.iconColor }];
      container.appendChild(icon);
      
      // 标题
      const modeCardTitle = await createTextNode(
        padding + 70,
        currentY + 20,
        mode.title,
        typography.sizes.base,
        typography.weights.medium,
        typography.textColors.primary,
        `标题-${mode.title}`
      );
      container.appendChild(modeCardTitle);
      
      // 副标题
      const modeCardSubtitle = await createTextNode(
        padding + 70,
        currentY + 44,
        mode.subtitle,
        typography.sizes.sm,
        typography.weights.normal,
        typography.textColors.secondary,
        `副标题-${mode.title}`
      );
      container.appendChild(modeCardSubtitle);
      
      // 右箭头
      const arrow = figma.createRectangle();
      arrow.name = `箭头-${mode.title}`;
      arrow.x = 375 - padding - 24;
      arrow.y = currentY + 30;
      arrow.resize(8, 20);
      arrow.fills = [{ type: 'SOLID', color: grayColors[400] }];
      arrow.cornerRadius = 2;
      container.appendChild(arrow);
      
      currentY += modeCardHeight + 16;
    }
    
    // ========== 2. 今日目标区域 ==========
    
    currentY += 8;  // 额外间距
    
    const goalCardHeight = 120;
    const goalCard = figma.createRectangle();
    goalCard.name = '今日目标卡片';
    goalCard.x = padding;
    goalCard.y = currentY;
    goalCard.resize(375 - padding * 2, goalCardHeight);
    goalCard.fills = [{ type: 'SOLID', color: functionalColors.amber[50] }];
    goalCard.cornerRadius = 20;
    goalCard.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.05 },
      offset: { x: 0, y: 2 },
      radius: 8,
      visible: true,
      blendMode: 'NORMAL',
    }];
    container.appendChild(goalCard);
    
    // 标题
    const goalTitle = await createTextNode(
      padding + 20,
      currentY + 20,
      '今日目标',
      typography.sizes.lg,
      typography.weights.medium,
      typography.textColors.primary,
      '今日目标标题'
    );
    container.appendChild(goalTitle);
    
    // 进度条背景
    const progressBg = figma.createRectangle();
    progressBg.name = '进度条背景';
    progressBg.x = padding + 20;
    progressBg.y = currentY + 50;
    progressBg.resize(375 - padding * 2 - 100, 12);  // 留出百分比空间
    progressBg.fills = [{ type: 'SOLID', color: grayColors[200] }];
    progressBg.cornerRadius = 6;
    container.appendChild(progressBg);
    
    // 进度条填充（橙色到琥珀色渐变）
    const progressValue = 0.6;  // 60%
    const progressWidth = (375 - padding * 2 - 100) * progressValue;
    const progressFill = figma.createRectangle();
    progressFill.name = '进度条填充';
    progressFill.x = padding + 20;
    progressFill.y = currentY + 50;
    progressFill.resize(progressWidth, 12);
    progressFill.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: { r: functionalColors.amber[400].r, g: functionalColors.amber[400].g, b: functionalColors.amber[400].b, a: 1 } },
        { position: 1, color: { r: functionalColors.orange[500].r, g: functionalColors.orange[500].g, b: functionalColors.orange[500].b, a: 1 } },
      ],
    }];
    progressFill.cornerRadius = 6;
    container.appendChild(progressFill);
    
    // 百分比文字
    const progressPercent = await createTextNode(
      375 - padding - 60,
      currentY + 48,
      '60%',
      typography.sizes.base,
      typography.weights.medium,
      typography.textColors.primary,
      '进度百分比'
    );
    container.appendChild(progressPercent);
    
    // 目标提示文字
    const goalHint = await createTextNode(
      padding + 20,
      currentY + 75,
      '再完成 4 个练习达成今日目标!',
      typography.sizes.sm,
      typography.weights.normal,
      typography.textColors.primary,
      '目标提示'
    );
    container.appendChild(goalHint);
    
    // 添加到画布
    figma.currentPage.appendChild(container);
    figma.currentPage.selection = [container];
    figma.viewport.scrollAndZoomIntoView([container]);
    
    figma.notify('练习模式与今日目标创建成功！');
  } catch (error) {
    figma.notify(`创建失败: ${error.message}`);
    console.error('错误详情:', error);
  }
}

/**
 * 创建学习进度页面
 */
async function createProgressPage() {
  try {
    // 预加载字体
    await Promise.all([
      figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
      figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    ]);
    
    // 创建主框架
    const mainFrame = figma.createFrame();
    mainFrame.name = '学习进度页面';
    mainFrame.x = 0;
    mainFrame.y = 0;
    mainFrame.resize(375, 812);
    mainFrame.fills = [{ type: 'SOLID', color: grayColors[50] }];
    figma.currentPage.appendChild(mainFrame);
    
    const padding = 24;
    let currentY = 60;
    
    // ========== 1. 页面标题 ==========
    const title = await createTextNode(
      padding,
      currentY,
      '学习进度',
      typography.sizes['2xl'],
      typography.weights.medium,
      typography.textColors.primary,
      '页面标题'
    );
    mainFrame.appendChild(title);
    currentY += 36;
    
    const subtitle = await createTextNode(
      padding,
      currentY,
      '跟踪你的学习表现',
      typography.sizes.sm,
      typography.weights.normal,
      typography.textColors.secondary,
      '页面副标题'
    );
    mainFrame.appendChild(subtitle);
    currentY += 32;
    
    // ========== 2. 本周概览卡片（紫色渐变） ==========
    const overviewCardWidth = 375 - padding * 2;
    const overviewCardHeight = 180;
    
    const overviewCard = figma.createRectangle();
    overviewCard.name = '本周概览卡片';
    overviewCard.x = padding;
    overviewCard.y = currentY;
    overviewCard.resize(overviewCardWidth, overviewCardHeight);
    overviewCard.cornerRadius = 16;
    overviewCard.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: { r: themeColors.indigo[600].r, g: themeColors.indigo[600].g, b: themeColors.indigo[600].b, a: 1 } },
        { position: 1, color: { r: themeColors.purple[600].r, g: themeColors.purple[600].g, b: themeColors.purple[600].b, a: 1 } },
      ],
    }];
    overviewCard.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: 4 },
      radius: 6,
      visible: true,
      blendMode: 'NORMAL',
    }];
    mainFrame.appendChild(overviewCard);
    
    // 卡片标题
    const overviewTitle = await createTextNode(
      padding + 20,
      currentY + 20,
      '📈 本周概览',
      typography.sizes.base,
      typography.weights.medium,
      grayColors.white,
      '本周概览标题'
    );
    mainFrame.appendChild(overviewTitle);
    
    // 统计数据（2x2网格）
    const statsData = [
      { label: '平均准确率', value: '84%', x: 0, y: 0 },
      { label: '练习次数', value: '28', x: 1, y: 0 },
      { label: '学习时长', value: '3.5h', x: 0, y: 1 },
      { label: '连续天数', value: '7天', x: 1, y: 1 },
    ];
    
    const statsSpacing = 12;
    const statItemWidth = (overviewCardWidth - 40 - statsSpacing) / 2;
    const statsStartY = currentY + 60;
    
    for (const stat of statsData) {
      const statX = padding + 20 + stat.x * (statItemWidth + statsSpacing);
      const statY = statsStartY + stat.y * 50;
      
      // 数值
      const valueText = await createTextNode(
        statX,
        statY,
        stat.value,
        typography.sizes['2xl'],
        typography.weights.medium,
        grayColors.white,
        `${stat.label}-数值`
      );
      mainFrame.appendChild(valueText);
      
      // 标签
      const labelText = await createTextNode(
        statX,
        statY + 32,
        stat.label,
        typography.sizes.xs,
        typography.weights.normal,
        grayColors.white,
        `${stat.label}-标签`
      );
      mainFrame.appendChild(labelText);
    }
    
    currentY += overviewCardHeight + 24;
    
    // ========== 3. 每日得分图表 ==========
    const chartCardHeight = 240;
    const chartCard = figma.createRectangle();
    chartCard.name = '每日得分卡片';
    chartCard.x = padding;
    chartCard.y = currentY;
    chartCard.resize(overviewCardWidth, chartCardHeight);
    chartCard.fills = [{ type: 'SOLID', color: grayColors.white }];
    chartCard.cornerRadius = 16;
    chartCard.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.05 },
      offset: { x: 0, y: 1 },
      radius: 2,
      visible: true,
      blendMode: 'NORMAL',
    }];
    mainFrame.appendChild(chartCard);
    
    // 图表标题
    const chartTitle = await createTextNode(
      padding + 20,
      currentY + 20,
      '📅 每日得分',
      typography.sizes.base,
      typography.weights.medium,
      typography.textColors.primary,
      '每日得分标题'
    );
    mainFrame.appendChild(chartTitle);
    
    // 柱状图数据
    const dailyScores = [
      { day: '周一', score: 45 },
      { day: '周二', score: 62 },
      { day: '周三', score: 58 },
      { day: '周四', score: 73 },
      { day: '周五', score: 85 },
      { day: '周六', score: 78 },
      { day: '周日', score: 90 },
    ];
    
    const chartStartY = currentY + 60;
    const chartHeight = 120;
    const barWidth = 32;
    const chartWidth = overviewCardWidth - 40;
    const barSpacing = (chartWidth - barWidth * 7) / 6;
    
    for (let i = 0; i < dailyScores.length; i++) {
      const barX = padding + 20 + i * (barWidth + barSpacing);
      const barHeightValue = (dailyScores[i].score / 100) * chartHeight;
      const barY = chartStartY + chartHeight - barHeightValue;
      
      // 柱状图
      const bar = figma.createRectangle();
      bar.name = `${dailyScores[i].day}-柱状图`;
      bar.x = barX;
      bar.y = barY;
      bar.resize(barWidth, barHeightValue);
      bar.fills = [{ type: 'SOLID', color: themeColors.indigo[600] }];
      bar.cornerRadius = 6;
      mainFrame.appendChild(bar);
      
      // 分数标签
      const scoreLabel = await createTextNode(
        barX + 8,
        barY - 20,
        dailyScores[i].score.toString(),
        typography.sizes.xs,
        typography.weights.medium,
        typography.textColors.primary,
        `${dailyScores[i].day}-分数`
      );
      mainFrame.appendChild(scoreLabel);
      
      // 星期标签
      const dayLabel = await createTextNode(
        barX,
        chartStartY + chartHeight + 8,
        dailyScores[i].day,
        typography.sizes.xs,
        typography.weights.normal,
        typography.textColors.secondary,
        `${dailyScores[i].day}-标签`
      );
      mainFrame.appendChild(dayLabel);
    }
    
    currentY += chartCardHeight + 24;
    
    // ========== 4. 成就激励 ==========
    const achievementTitle = await createTextNode(
      padding,
      currentY,
      '🏆 成就激励',
      typography.sizes.base,
      typography.weights.medium,
      typography.textColors.primary,
      '成就激励标题'
    );
    mainFrame.appendChild(achievementTitle);
    currentY += 32;
    
    const achievementCardWidth = (overviewCardWidth - 12) / 2;
    const achievementCardHeight = 120;
    
    const achievements = [
      { icon: '🎯', title: '首次练习', desc: '完成第一次识谱练习', active: true },
      { icon: '🔥', title: '连续7天', desc: '连续练习7天', active: true },
      { icon: '⭐', title: '准确率90%', desc: '单次练习准确率达90%', active: true },
      { icon: '🏆', title: '百发百中', desc: '单次练习全对', active: false },
    ];
    
    for (let i = 0; i < achievements.length; i++) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const cardX = padding + col * (achievementCardWidth + 12);
      const cardY = currentY + row * (achievementCardHeight + 12);
      
      // 成就卡片
      const achievementCard = figma.createRectangle();
      achievementCard.name = `${achievements[i].title}-卡片`;
      achievementCard.x = cardX;
      achievementCard.y = cardY;
      achievementCard.resize(achievementCardWidth, achievementCardHeight);
      achievementCard.fills = [{ type: 'SOLID', color: achievements[i].active ? functionalColors.amber[50] : grayColors.white }];
      achievementCard.cornerRadius = 12;
      achievementCard.effects = [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.05 },
        offset: { x: 0, y: 1 },
        radius: 2,
        visible: true,
        blendMode: 'NORMAL',
      }];
      if (!achievements[i].active) {
        achievementCard.opacity = 0.5;
      }
      mainFrame.appendChild(achievementCard);
      
      // 图标
      const iconText = await createTextNode(
        cardX + 16,
        cardY + 20,
        achievements[i].icon,
        32,
        typography.weights.normal,
        typography.textColors.primary,
        `${achievements[i].title}-图标`
      );
      mainFrame.appendChild(iconText);
      
      // 标题
      const titleText = await createTextNode(
        cardX + 16,
        cardY + 65,
        achievements[i].title,
        typography.sizes.sm,
        typography.weights.medium,
        typography.textColors.primary,
        `${achievements[i].title}-标题`
      );
      mainFrame.appendChild(titleText);
      
      // 描述
      const descText = await createTextNode(
        cardX + 16,
        cardY + 87,
        achievements[i].desc,
        typography.sizes.xs,
        typography.weights.normal,
        typography.textColors.secondary,
        `${achievements[i].title}-描述`
      );
      mainFrame.appendChild(descText);
    }
    
    currentY += 2 * (achievementCardHeight + 12) + 24;
    
    // ========== 5. 下一个目标 ==========
    const goalCard = figma.createRectangle();
    goalCard.name = '下一个目标卡片';
    goalCard.x = padding;
    goalCard.y = currentY;
    goalCard.resize(overviewCardWidth, 80);
    goalCard.fills = [{ type: 'SOLID', color: functionalColors.green[100] }];
    goalCard.cornerRadius = 12;
    goalCard.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.05 },
      offset: { x: 0, y: 1 },
      radius: 2,
      visible: true,
      blendMode: 'NORMAL',
    }];
    mainFrame.appendChild(goalCard);
    
    const goalIcon = await createTextNode(
      padding + 16,
      currentY + 20,
      '🎯',
      typography.sizes['2xl'],
      typography.weights.normal,
      typography.textColors.primary,
      '目标图标'
    );
    mainFrame.appendChild(goalIcon);
    
    const goalTitle = await createTextNode(
      padding + 56,
      currentY + 20,
      '下一个目标',
      typography.sizes.sm,
      typography.weights.medium,
      functionalColors.green[800],
      '目标标题'
    );
    mainFrame.appendChild(goalTitle);
    
    const goalDesc = await createTextNode(
      padding + 56,
      currentY + 44,
      '再练习 23 次即可解锁「练习达人」徽章！',
      typography.sizes.xs,
      typography.weights.normal,
      functionalColors.green[800],
      '目标描述'
    );
    mainFrame.appendChild(goalDesc);
    
    currentY += 100;
    
    // ========== 6. 底部导航栏 ==========
    const navY = 812 - 64;
    const navBar = figma.createRectangle();
    navBar.name = '底部导航栏';
    navBar.x = 0;
    navBar.y = navY;
    navBar.resize(375, 64);
    navBar.fills = [{ type: 'SOLID', color: grayColors.white }];
    mainFrame.appendChild(navBar);
    
    // 顶部边框
    const navBorder = figma.createRectangle();
    navBorder.name = '导航栏边框';
    navBorder.x = 0;
    navBorder.y = navY;
    navBorder.resize(375, 1);
    navBorder.fills = [{ type: 'SOLID', color: grayColors[200] }];
    mainFrame.appendChild(navBorder);
    
    const navItems = [
      { label: '首页', icon: '🏠', active: false },
      { label: '进度', icon: '📈', active: true },
      { label: '设置', icon: '⚙️', active: false },
    ];
    
    const navItemWidth = 375 / 3;
    
    for (let i = 0; i < navItems.length; i++) {
      const navX = i * navItemWidth;
      const item = navItems[i];
      const color = item.active ? themeColors.indigo[600] : grayColors[400];
      
      // 图标
      const navIcon = await createTextNode(
        navX + navItemWidth / 2 - 12,
        navY + 10,
        item.icon,
        typography.sizes['2xl'],
        typography.weights.normal,
        color,
        `${item.label}-图标`
      );
      mainFrame.appendChild(navIcon);
      
      // 标签
      const navLabel = await createTextNode(
        navX + navItemWidth / 2 - 16,
        navY + 40,
        item.label,
        typography.sizes.xs,
        typography.weights.medium,
        color,
        `${item.label}-文本`
      );
      mainFrame.appendChild(navLabel);
    }
    
    // 选中主框架并滚动到视图
    figma.currentPage.selection = [mainFrame];
    figma.viewport.scrollAndZoomIntoView([mainFrame]);
    
    figma.notify('学习进度页面创建成功！✅');
  } catch (error) {
    figma.notify(`创建失败: ${error.message}`);
    console.error('错误详情:', error);
  }
}

/**
 * 创建设置页面
 */
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
    mainFrame.resize(375, 812);
    mainFrame.fills = [{ type: 'SOLID', color: grayColors[50] }];
    figma.currentPage.appendChild(mainFrame);
    
    const padding = 24;
    let currentY = 60;
    const cardWidth = 375 - padding * 2;
    
    // 页面标题
    const title = await createTextNode(
      padding,
      currentY,
      '设置',
      typography.sizes['2xl'],
      typography.weights.medium,
      typography.textColors.primary,
      '页面标题'
    );
    mainFrame.appendChild(title);
    currentY += 36;
    
    const subtitle = await createTextNode(
      padding,
      currentY,
      '个性化你的学习体验',
      typography.sizes.sm,
      typography.weights.normal,
      typography.textColors.secondary,
      '页面副标题'
    );
    mainFrame.appendChild(subtitle);
    currentY += 40;
    
    // 用户信息卡片
    const userCardHeight = 88;
    const userCard = figma.createRectangle();
    userCard.name = '用户信息卡片';
    userCard.x = padding;
    userCard.y = currentY;
    userCard.resize(cardWidth, userCardHeight);
    userCard.fills = [{ type: 'SOLID', color: grayColors.white }];
    userCard.cornerRadius = 16;
    userCard.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.05 },
      offset: { x: 0, y: 1 },
      radius: 2,
      visible: true,
      blendMode: 'NORMAL',
    }];
    mainFrame.appendChild(userCard);
    
    // 用户头像
    const avatarSize = 56;
    const avatar = figma.createEllipse();
    avatar.name = '用户头像';
    avatar.x = padding + 16;
    avatar.y = currentY + 16;
    avatar.resize(avatarSize, avatarSize);
    avatar.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: { r: themeColors.indigo[600].r, g: themeColors.indigo[600].g, b: themeColors.indigo[600].b, a: 1 } },
        { position: 1, color: { r: themeColors.purple[600].r, g: themeColors.purple[600].g, b: themeColors.purple[600].b, a: 1 } },
      ],
    }];
    mainFrame.appendChild(avatar);
    
    const avatarIcon = await createTextNode(
      padding + 28,
      currentY + 24,
      '🎹',
      28,
      typography.weights.normal,
      grayColors.white,
      '头像图标'
    );
    mainFrame.appendChild(avatarIcon);
    
    const userName = await createTextNode(
      padding + 84,
      currentY + 20,
      '钢琴学习者',
      typography.sizes.base,
      typography.weights.medium,
      typography.textColors.primary,
      '用户名称'
    );
    mainFrame.appendChild(userName);
    
    const userStatus = await createTextNode(
      padding + 84,
      currentY + 44,
      '初级 · 已学习 7 天',
      typography.sizes.sm,
      typography.weights.normal,
      typography.textColors.secondary,
      '用户状态'
    );
    mainFrame.appendChild(userStatus);
    
    currentY += userCardHeight + 32;
    
    // 练习设置区域
    const sectionTitle1 = await createTextNode(
      padding,
      currentY,
      '练习设置',
      typography.sizes.sm,
      typography.weights.medium,
      grayColors[600],
      '练习设置标题'
    );
    mainFrame.appendChild(sectionTitle1);
    currentY += 32;
    
    // 设置项数据
    const settingItems = [
      { icon: '🎵', title: '音符与练习', desc: '音符范围、调号、练习设置', bg: themeColors.indigo[100], spacing: 16 },
      { icon: '🔊', title: '音效设置', desc: '开启练习反馈音效', bg: functionalColors.blue[100], spacing: 16 },
      { icon: '🔔', title: '练习提醒', desc: '每天 20:00 提醒练习', bg: themeColors.pink[50], spacing: 32 },
    ];
    
    for (const item of settingItems) {
      const itemCardHeight = 80;
      const itemCard = figma.createRectangle();
      itemCard.name = `${item.title}-卡片`;
      itemCard.x = padding;
      itemCard.y = currentY;
      itemCard.resize(cardWidth, itemCardHeight);
      itemCard.fills = [{ type: 'SOLID', color: grayColors.white }];
      itemCard.cornerRadius = 16;
      itemCard.effects = [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.05 },
        offset: { x: 0, y: 1 },
        radius: 2,
        visible: true,
        blendMode: 'NORMAL',
      }];
      mainFrame.appendChild(itemCard);
      
      const iconBg = figma.createRectangle();
      iconBg.name = '图标背景';
      iconBg.x = padding + 16;
      iconBg.y = currentY + 20;
      iconBg.resize(40, 40);
      iconBg.fills = [{ type: 'SOLID', color: item.bg }];
      iconBg.cornerRadius = 12;
      mainFrame.appendChild(iconBg);
      
      const itemIcon = await createTextNode(
        padding + 26,
        currentY + 26,
        item.icon,
        typography.sizes['2xl'],
        typography.weights.normal,
        typography.textColors.primary,
        `${item.title}-图标`
      );
      mainFrame.appendChild(itemIcon);
      
      const itemTitle = await createTextNode(
        padding + 68,
        currentY + 20,
        item.title,
        typography.sizes.base,
        typography.weights.medium,
        typography.textColors.primary,
        `${item.title}-标题`
      );
      mainFrame.appendChild(itemTitle);
      
      const itemDesc = await createTextNode(
        padding + 68,
        currentY + 44,
        item.desc,
        typography.sizes.sm,
        typography.weights.normal,
        typography.textColors.secondary,
        `${item.title}-描述`
      );
      mainFrame.appendChild(itemDesc);
      
      currentY += itemCardHeight + item.spacing;
    }
    
    // 账户与帮助区域
    const sectionTitle2 = await createTextNode(
      padding,
      currentY,
      '账户与帮助',
      typography.sizes.sm,
      typography.weights.medium,
      grayColors[600],
      '账户与帮助标题'
    );
    mainFrame.appendChild(sectionTitle2);
    currentY += 32;
    
    const accountItems = [
      { icon: '👤', title: '账户信息', desc: '管理个人资料', bg: functionalColors.green[100], spacing: 16 },
      { icon: '❓', title: '帮助中心', desc: '常见问题解答', bg: functionalColors.amber[50], spacing: 16 },
      { icon: 'ℹ️', title: '关于应用', desc: '版本 1.0.0', bg: grayColors[200], spacing: 24 },
    ];
    
    for (const item of accountItems) {
      const itemCardHeight = 80;
      const itemCard = figma.createRectangle();
      itemCard.name = `${item.title}-卡片`;
      itemCard.x = padding;
      itemCard.y = currentY;
      itemCard.resize(cardWidth, itemCardHeight);
      itemCard.fills = [{ type: 'SOLID', color: grayColors.white }];
      itemCard.cornerRadius = 16;
      itemCard.effects = [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.05 },
        offset: { x: 0, y: 1 },
        radius: 2,
        visible: true,
        blendMode: 'NORMAL',
      }];
      mainFrame.appendChild(itemCard);
      
      const iconBg = figma.createRectangle();
      iconBg.name = '图标背景';
      iconBg.x = padding + 16;
      iconBg.y = currentY + 20;
      iconBg.resize(40, 40);
      iconBg.fills = [{ type: 'SOLID', color: item.bg }];
      iconBg.cornerRadius = 12;
      mainFrame.appendChild(iconBg);
      
      const itemIcon = await createTextNode(
        padding + 26,
        currentY + 26,
        item.icon,
        typography.sizes['2xl'],
        typography.weights.normal,
        typography.textColors.primary,
        `${item.title}-图标`
      );
      mainFrame.appendChild(itemIcon);
      
      const itemTitle = await createTextNode(
        padding + 68,
        currentY + 20,
        item.title,
        typography.sizes.base,
        typography.weights.medium,
        typography.textColors.primary,
        `${item.title}-标题`
      );
      mainFrame.appendChild(itemTitle);
      
      const itemDesc = await createTextNode(
        padding + 68,
        currentY + 44,
        item.desc,
        typography.sizes.sm,
        typography.weights.normal,
        typography.textColors.secondary,
        `${item.title}-描述`
      );
      mainFrame.appendChild(itemDesc);
      
      currentY += itemCardHeight + item.spacing;
    }
    
    // 底部版本信息
    const versionText = await createTextNode(
      375 / 2 - 70,
      currentY,
      '钢琴识谱练习 v1.0.0',
      typography.sizes.xs,
      typography.weights.normal,
      typography.textColors.secondary,
      '版本信息'
    );
    mainFrame.appendChild(versionText);
    currentY += 20;
    
    const versionSubtext = await createTextNode(
      375 / 2 - 56,
      currentY,
      '让音乐学习更简单',
      typography.sizes.xs,
      typography.weights.normal,
      typography.textColors.tertiary,
      '版本副标题'
    );
    mainFrame.appendChild(versionSubtext);
    
    // 底部导航栏
    const navY = 812 - 64;
    const navBar = figma.createRectangle();
    navBar.name = '底部导航栏';
    navBar.x = 0;
    navBar.y = navY;
    navBar.resize(375, 64);
    navBar.fills = [{ type: 'SOLID', color: grayColors.white }];
    mainFrame.appendChild(navBar);
    
    const navBorder = figma.createRectangle();
    navBorder.name = '导航栏边框';
    navBorder.x = 0;
    navBorder.y = navY;
    navBorder.resize(375, 1);
    navBorder.fills = [{ type: 'SOLID', color: grayColors[200] }];
    mainFrame.appendChild(navBorder);
    
    const navItems = [
      { label: '首页', icon: '🏠', active: false },
      { label: '进度', icon: '📈', active: false },
      { label: '设置', icon: '⚙️', active: true },
    ];
    
    const navItemWidth = 375 / 3;
    
    for (let i = 0; i < navItems.length; i++) {
      const navX = i * navItemWidth;
      const item = navItems[i];
      const color = item.active ? themeColors.indigo[600] : grayColors[400];
      
      const navIcon = await createTextNode(
        navX + navItemWidth / 2 - 12,
        navY + 10,
        item.icon,
        typography.sizes['2xl'],
        typography.weights.normal,
        color,
        `${item.label}-图标`
      );
      mainFrame.appendChild(navIcon);
      
      const navLabel = await createTextNode(
        navX + navItemWidth / 2 - 16,
        navY + 40,
        item.label,
        typography.sizes.xs,
        typography.weights.medium,
        color,
        `${item.label}-文本`
      );
      mainFrame.appendChild(navLabel);
    }
    
    figma.currentPage.selection = [mainFrame];
    figma.viewport.scrollAndZoomIntoView([mainFrame]);
    
    figma.notify('设置页面创建成功！✅');
  } catch (error) {
    figma.notify(`创建失败: ${error.message}`);
    console.error('错误详情:', error);
  }
}

/**
 * 创建钢琴键盘（白键和黑键）
 */
async function createPianoKeys() {
  try {
    // 创建容器框架
    const container = figma.createFrame();
    container.name = '钢琴键盘';
    container.x = 0;
    container.y = 0;
    container.resize(800, 400);
    container.fills = [{ type: 'SOLID', color: grayColors[50] }];
    
    // 键盘参数
    const whiteKeyWidth = 60;      // 白键宽度
    const whiteKeyHeight = 200;    // 白键高度
    const blackKeyWidth = 36;      // 黑键宽度
    const blackKeyHeight = 120;    // 黑键高度
    const startX = 100;            // 起始 X 坐标
    const startY = 100;            // 起始 Y 坐标
    const blackKeyOffset = 12;     // 黑键相对白键的偏移量
    
    // 白键名称（一个八度：C, D, E, F, G, A, B）
    const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    
    // 黑键位置（相对于白键的索引和偏移）
    // 格式：[白键索引, 偏移量（-1=左侧，0=中间，1=右侧）]
    const blackKeys = [
      { index: 0, offset: 1, name: 'C#' },  // C 和 D 之间
      { index: 1, offset: 1, name: 'D#' },  // D 和 E 之间
      { index: 3, offset: 1, name: 'F#' },  // F 和 G 之间
      { index: 4, offset: 1, name: 'G#' },  // G 和 A 之间
      { index: 5, offset: 1, name: 'A#' },  // A 和 B 之间
    ];
    
    // 预加载字体
    await Promise.all([
      figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
      figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    ]);
    
    // ========== 创建白键 ==========
    const whiteKeysGroup = figma.createFrame();
    whiteKeysGroup.name = '白键组';
    whiteKeysGroup.x = 0;
    whiteKeysGroup.y = 0;
    whiteKeysGroup.resize(800, 400);
    whiteKeysGroup.fills = [];
    container.appendChild(whiteKeysGroup);
    
    // 创建所有白键和标签
    const whiteKeyPromises = whiteKeys.map(async (keyName, index) => {
      const x = startX + index * whiteKeyWidth;
      const y = startY;
      
      // 创建白键矩形
      const whiteKey = figma.createRectangle();
      whiteKey.name = `白键-${keyName}`;
      whiteKey.x = x;
      whiteKey.y = y;
      whiteKey.resize(whiteKeyWidth, whiteKeyHeight);
      whiteKey.fills = [{ type: 'SOLID', color: grayColors.white }];
      whiteKey.strokes = [{ type: 'SOLID', color: grayColors[200] }];
      whiteKey.strokeWeight = 1;
      whiteKey.cornerRadius = 0;
      whiteKeysGroup.appendChild(whiteKey);
      
      // 添加白键标签
      const label = await createTextNode(
        x + whiteKeyWidth / 2 - 5,
        y + whiteKeyHeight - 30,
        keyName,
        typography.sizes.base,
        typography.weights.medium,
        grayColors[800],
        `白键标签-${keyName}`
      );
      whiteKey.appendChild(label);
      
      return whiteKey;
    });
    
    await Promise.all(whiteKeyPromises);
    
    // ========== 创建黑键 ==========
    const blackKeysGroup = figma.createFrame();
    blackKeysGroup.name = '黑键组';
    blackKeysGroup.x = 0;
    blackKeysGroup.y = 0;
    blackKeysGroup.resize(800, 400);
    blackKeysGroup.fills = [];
    container.appendChild(blackKeysGroup);
    
    // 创建所有黑键和标签
    const blackKeyPromises = blackKeys.map(async ({ index, offset, name }) => {
      // 计算黑键位置
      // 黑键位于两个白键之间，稍微偏右
      const x = startX + index * whiteKeyWidth + whiteKeyWidth - blackKeyWidth / 2 + blackKeyOffset;
      const y = startY;
      
      // 创建黑键矩形
      const blackKey = figma.createRectangle();
      blackKey.name = `黑键-${name}`;
      blackKey.x = x;
      blackKey.y = y;
      blackKey.resize(blackKeyWidth, blackKeyHeight);
      blackKey.fills = [{ type: 'SOLID', color: grayColors[900] }];
      blackKey.cornerRadius = 0;
      blackKeysGroup.appendChild(blackKey);
      
      // 添加黑键标签
      const label = await createTextNode(
        x + blackKeyWidth / 2 - 8,
        y + blackKeyHeight - 25,
        name,
        typography.sizes.sm,
        typography.weights.medium,
        grayColors.white,
        `黑键标签-${name}`
      );
      blackKey.appendChild(label);
      
      return blackKey;
    });
    
    await Promise.all(blackKeyPromises);
    
    // 添加标题
    const title = await createTextNode(
      startX,
      startY - 40,
      '钢琴键盘（一个八度）',
      typography.sizes.xl,
      typography.weights.medium,
      typography.textColors.primary,
      '键盘标题'
    );
    container.appendChild(title);
    
    // 添加到画布
    figma.currentPage.appendChild(container);
    figma.currentPage.selection = [container];
    figma.viewport.scrollAndZoomIntoView([container]);
    
    figma.notify('钢琴键盘创建成功！');
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
      <title>钢琴识谱练习工具</title>
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
      <h1>钢琴识谱练习工具</h1>
      <p>创建应用界面和设计元素</p>
      
      <button class="button" onclick="parent.postMessage({pluginMessage: {type: 'create-homepage'}}, '*')" style="background: #4F46E5;">
        🏠 创建应用首页
      </button>
      
      <button class="button" onclick="parent.postMessage({pluginMessage: {type: 'create-progress-page'}}, '*')" style="background: #2563EB;">
        📈 创建学习进度页面
      </button>
      
      <button class="button" onclick="parent.postMessage({pluginMessage: {type: 'create-settings-page'}}, '*')" style="background: #10B981;">
        ⚙️ 创建设置页面
      </button>
      
      <button class="button" onclick="parent.postMessage({pluginMessage: {type: 'create-practice-mode-goal'}}, '*')" style="background: #9333EA;">
        📚 创建练习模式与今日目标
      </button>
      
      <button class="button" onclick="parent.postMessage({pluginMessage: {type: 'create-piano-keys'}}, '*')" style="background: #F97316;">
        🎹 创建钢琴键盘
      </button>
      
      <button class="button" onclick="parent.postMessage({pluginMessage: {type: 'create-example'}}, '*')" style="background: #6B7280;">
        🎨 创建设计系统示例
      </button>
    </body>
  </html>
`, { width: 300, height: 340 });

// 监听来自 UI 的消息
figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === 'create-homepage') {
      await createHomePage();
    } else if (msg.type === 'create-progress-page') {
      await createProgressPage();
    } else if (msg.type === 'create-settings-page') {
      await createSettingsPage();
    } else if (msg.type === 'create-practice-mode-goal') {
      await createPracticeModeAndGoal();
    } else if (msg.type === 'create-piano-keys') {
      await createPianoKeys();
    } else if (msg.type === 'create-example') {
      await createDesignSystemExample();
    }
  } catch (error) {
    const errorMessage = error.message || String(error);
    figma.notify(`操作失败: ${errorMessage}`);
    console.error('插件错误:', error);
  }
};
