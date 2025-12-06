/**
 * 钢琴识谱应用 - 完整设计令牌
 * 基于 DESIGN_SPEC.md 设计规范
 * 用于 Figma 插件（CommonJS 格式）
 */

// ========== 颜色系统 ==========

/**
 * 十六进制转 RGB（Figma 格式）
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
    a: 1
  } : { r: 0, g: 0, b: 0, a: 1 };
}

// 主题色（Indigo/Purple 系列）
const themeColors = {
  indigo: {
    50: hexToRgb('#EEF2FF'),   // 浅背景
    100: hexToRgb('#E0E7FF'),  // 高亮色
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
  700: hexToRgb('#374151'),    // 次要文字（补充）
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
  amber500: hexToRgb('#F59E0B'), // amber-500 (连击渐变终点)
  // 辅助色（蓝色）
  blue: {
    100: hexToRgb('#DBEAFE'),  // 功能卡片背景
    600: hexToRgb('#2563EB'),  // 功能图标
  },
};

// 常用颜色快捷方式
const colors = {
  // 基础色
  white: grayColors.white,
  black: grayColors[900],
  
  // 主题色
  primary: themeColors.indigo[600],
  primaryLight: themeColors.indigo[50],
  primaryHighlight: themeColors.indigo[100],
  purple: themeColors.purple[600],
  purpleLight: themeColors.purple[50],
  
  // 功能色
  success: functionalColors.green[600],
  successBg: functionalColors.green[100],
  successText: functionalColors.green[800],
  error: functionalColors.red[800],
  errorBg: functionalColors.red[100],
  warning: functionalColors.orange[500],
  warningBg: functionalColors.amber[50],
  warningBorder: functionalColors.amber[200],
  info: functionalColors.blue[600],
  infoBg: functionalColors.blue[100],
  
  // 灰色快捷方式
  gray: grayColors[600],
  grayLight: grayColors[50],
  grayDark: grayColors[800],
  border: grayColors[200],
  textPrimary: grayColors[800],
  textSecondary: grayColors[600],
  textTertiary: grayColors[400],
  textInactive: grayColors[400],
  textActive: themeColors.indigo[600],
};

// 渐变配置
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
  // 进度条渐变
  progress: {
    from: functionalColors.amber[400],
    to: functionalColors.orange[500],
  },
  // 目标卡片渐变
  goalCard: {
    from: functionalColors.amber[50],
    to: { r: 1.0, g: 0.969, b: 0.902, a: 1 }, // orange-50 近似值
  },
};

// ========== 文字系统 ==========

const typography = {
  // 字体大小（px）
  sizes: {
    xs: 12,      // 标签、小字提示
    sm: 14,      // 辅助说明
    base: 16,    // 正文、按钮文字、基础字号
    lg: 18,      // H3 - 次级标题
    xl: 20,      // H2 - 区块标题、数据统计
    '2xl': 24,   // H1 - 页面主标题、大号数据
    '4xl': 36,   // 启动页应用名
  },
  
  // 字重
  weights: {
    normal: 400,  // 正文、输入框
    medium: 500,  // 标题、按钮、标签
  },
  
  // 行高
  lineHeights: {
    normal: 1.5,  // 默认行高
  },
  
  // 文字颜色（快捷方式）
  colors: {
    primary: colors.textPrimary,      // 标题、重要信息
    secondary: colors.textSecondary,  // 辅助说明、描述
    tertiary: colors.textTertiary,    // 未激活状态、占位符
    white: colors.white,              // 按钮文字、启动页文字
    white90: { r: 1, g: 1, b: 1, a: 0.9 },  // 90% 透明度
    white80: { r: 1, g: 1, b: 1, a: 0.8 },  // 80% 透明度
    active: colors.textActive,       // 激活状态、强调数据
  },
};

// ========== 图标系统 ==========

const icons = {
  // 图标尺寸（px）
  sizes: {
    small: 16,   // 连击标记
    medium: 18,  // 功能按钮辅助图标
    normal: 20,  // 中型功能图标
    large: 24,   // 标准图标（导航、功能卡片）
    xlarge: 32,  // 大图标（启动页音符）
  },
  
  // 常用图标清单（参考 Lucide React）
  names: {
    // 导航相关
    home: 'Home',
    trendingUp: 'TrendingUp',
    settings: 'Settings',
    arrowLeft: 'ArrowLeft',
    
    // 功能相关
    play: 'Play',
    book: 'Book',
    award: 'Award',
    music: 'Music',
    trophy: 'Trophy',
    barChart3: 'BarChart3',
    helpCircle: 'HelpCircle',
    
    // 反馈相关
    check: 'Check',
    x: 'X',
  },
  
  // 图标颜色配置
  colors: {
    navInactive: colors.textInactive,
    navActive: colors.textActive,
    functional: functionalColors.blue[600],
    success: functionalColors.green[800],
    error: functionalColors.red[800],
    white: colors.white,
  },
};

// ========== 组件规范 ==========

const components = {
  // 圆角（px）
  borderRadius: {
    xl: 12,        // 小卡片、列表项
    '2xl': 16,     // 主要卡片、按钮
    full: 9999,    // 圆形元素、进度条
    bottomLg: 8,   // 底部圆角（钢琴键）
  },
  
  // 阴影（Figma 效果）
  shadows: {
    sm: {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.05 },
      offset: { x: 0, y: 1 },
      radius: 2,
      spread: 0,
    },
    lg: {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: 4 },
      radius: 6,
      spread: 0,
    },
    xl: {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.15 },
      offset: { x: 0, y: 8 },
      radius: 12,
      spread: 0,
    },
    md: {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.08 },
      offset: { x: 0, y: 2 },
      radius: 4,
      spread: 0,
    },
  },
  
  // 间距（px）
  spacing: {
    // 内边距
    padding: {
      xs: 12,      // p-3 - 小卡片
      sm: 16,      // p-4 - 标准卡片
      md: 24,      // p-6 - 大容器、页面边距
      lg: 32,      // p-8 - 特大区域
      buttonX: 24, // px-6 - 标准按钮水平
      buttonY: 12, // py-3 - 标准按钮垂直
      buttonYLarge: 16, // py-4 - 大按钮垂直
    },
    // 外边距
    margin: {
      xs: 4,       // mb-1 - 标题与副标题间距
      sm: 8,       // mb-2 - 小间距
      md: 12,      // mb-3 - 元素间距
      lg: 16,      // mb-4 - 标准间距
      xl: 24,      // mb-6 - 大间距
      '2xl': 32,   // mb-8 - 区块间距
    },
    // 间隙
    gap: {
      xs: 8,       // gap-2 - 图标与文字
      sm: 12,      // gap-3 - 列表项、卡片网格
      md: 16,      // gap-4 - 较大间隙
      lg: 24,      // gap-6 - 大区块间隙
    },
  },
  
  // 边框
  borders: {
    width: 1,      // 1px 实线边框
    color: colors.border,
    colorAmber: functionalColors.amber[200],
  },
};

// ========== 布局规范 ==========

const layout = {
  // 竖屏布局（手机端）
  mobile: {
    containerWidth: 448,      // max-w-md (28rem)
    padding: 24,               // p-6
    bottomNavHeight: 64,      // h-16
    bottomSafeArea: 80,       // pb-20
  },
  
  // 横屏布局（练习页面）
  landscape: {
    padding: 24,               // p-6
    sidebarWidth: 192,        // w-48
    gap: 24,                   // gap-6
  },
  
  // 屏幕尺寸
  screen: {
    width: 375,                // 标准移动端宽度
    height: 812,               // 标准移动端高度
  },
};

// ========== 特定组件尺寸 ==========

const componentSizes = {
  // Logo
  logo: {
    sm: 48,   // w-12 h-12
    md: 64,   // w-16 h-16
    lg: 96,   // w-24 h-24
  },
  
  // 启动页钢琴键
  pianoKey: {
    white: { width: 48, height: 128 },  // w-12 h-32
    black: { width: 32, height: 80 },   // w-8 h-20
  },
  
  // 上方交互键盘（7个白键）
  interactiveKeyboard: {
    whiteHeight: 128,  // h-32
    blackHeight: 77,   // 白键的 60%
    blackWidth: 0.6,   // 白键的 60%
  },
  
  // 下方 88 键缩略键盘
  miniKeyboard: {
    height: 64,  // h-16
  },
  
  // 进度条
  progressBar: {
    height: 8,   // h-2
  },
  
  // 底部导航
  bottomNav: {
    height: 64,  // h-16
    iconSize: 24,
  },
};

// ========== 导出完整配置 ==========

const designTokens = {
  colors,
  themeColors,
  grayColors,
  functionalColors,
  gradients,
  typography,
  icons,
  components,
  layout,
  componentSizes,
  utils: {
    hexToRgb,
  },
};

// CommonJS 导出
module.exports = {
  themeColors,
  grayColors,
  functionalColors,
  colors,
  gradients,
  typography,
  icons,
  components,
  layout,
  componentSizes,
  designTokens,
  hexToRgb,
};

