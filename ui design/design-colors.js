/**
 * 设计系统颜色配置 - 用于 Figma 插件
 * 从 design-system.config.ts 提取的颜色值
 */

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

// ========== 主题色（Indigo/Purple/Pink 系列）==========

export const themeColors = {
  // Indigo 系列
  indigo: {
    50: hexToRgb('#EEF2FF'),   // 浅背景
    100: hexToRgb('#E0E7FF'),  // 高亮色
    600: hexToRgb('#4F46E5'),  // 主要操作按钮、激活状态
  },
  // 主色（兼容旧代码）
  primary: {
    50: hexToRgb('#EEF2FF'),
    100: hexToRgb('#E0E7FF'),
    500: hexToRgb('#6366F1'),
    600: hexToRgb('#4F46E5'),
    700: hexToRgb('#4338CA'),
  },
  
  // Purple 系列
  purple: {
    50: hexToRgb('#FAF5FF'),   // 浅背景
    100: hexToRgb('#F3E8FF'),
    500: hexToRgb('#A855F7'),
    600: hexToRgb('#9333EA'),  // 渐变辅助色
  },
  
  // Pink 系列
  pink: {
    50: hexToRgb('#FDF2F8'),
    500: hexToRgb('#EC4899'),  // 渐变终点色
  },
};

// ========== 辅助色 ==========

export const accentColors = {
  // 橙色/琥珀色 - 连击提示
  orange: {
    500: hexToRgb('#F97316'),  // orange-500 - 进度条终点、连击背景
  },
  amber: {
    50: hexToRgb('#FFFBEB'),   // 目标卡片背景
    200: hexToRgb('#FDE68A'),  // 目标卡片边框
    400: hexToRgb('#FBBF24'),  // 进度条起始
    500: hexToRgb('#F59E0B'),  // amber-500 - 连击渐变终点
  },
  
  // 绿色 - 正确反馈
  green: {
    100: hexToRgb('#DCFCE7'),  // 正确反馈背景
    600: hexToRgb('#16A34A'),  // 正确反馈图标
    800: hexToRgb('#166534'),  // 正确反馈文字
  },
  
  // 红色 - 错误反馈
  red: {
    100: hexToRgb('#FEE2E2'),  // 错误反馈背景
    800: hexToRgb('#991B1B'),   // 错误反馈文字
  },
  
  // 蓝色 - 辅助色
  blue: {
    100: hexToRgb('#DBEAFE'),  // 功能卡片背景
    600: hexToRgb('#2563EB'),   // 功能图标
  },
};

// ========== 灰色系统 ==========

export const grayColors = {
  white: hexToRgb('#FFFFFF'),  // 卡片背景、键盘
  50: hexToRgb('#F9FAFB'),
  200: hexToRgb('#E5E7EB'),    // 卡片边框、分隔线
  400: hexToRgb('#9CA3AF'),    // 未激活图标、辅助文字
  600: hexToRgb('#4B5563'),    // 次要文字
  700: hexToRgb('#374151'),    // 次要文字（补充）
  800: hexToRgb('#1F2937'),    // 主要文字、标题
  900: hexToRgb('#111827'),    // 黑键
};

// ========== 常用颜色组合 ==========

export const colors = {
  // 基础色
  white: grayColors.white,
  black: grayColors[900],
  
  // 主题色快捷方式
  primary: themeColors.indigo[600],
  primaryLight: themeColors.indigo[50],
  primaryHighlight: themeColors.indigo[100],
  purple: themeColors.purple[600],
  purpleLight: themeColors.purple[50],
  
  // 辅助色快捷方式
  success: accentColors.green[600],
  successBg: accentColors.green[100],
  successText: accentColors.green[800],
  error: accentColors.red[800],
  errorBg: accentColors.red[100],
  warning: accentColors.orange[500],
  warningBg: accentColors.amber[50],
  warningBorder: accentColors.amber[200],
  info: accentColors.blue[600],
  infoBg: accentColors.blue[100],
  
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

// ========== 渐变配置 ==========

export const gradients = {
  // 主背景渐变
  mainBackground: {
    from: themeColors.indigo[50],
    via: themeColors.purple[50],
    to: themeColors.pink[50],
  },
  
  // 主按钮渐变
  primaryButton: {
    from: themeColors.indigo[600],
    to: themeColors.purple[600],
  },
  
  // 连击渐变
  combo: {
    from: accentColors.orange[500],
    to: accentColors.amber[500],
  },
  
  // 启动页渐变
  splash: {
    from: themeColors.indigo[600],
    via: themeColors.purple[600],
    to: themeColors.pink[500],
  },
  
  // 进度条渐变
  progress: {
    from: accentColors.amber[400],
    to: accentColors.orange[500],
  },
  
  // 目标卡片渐变
  goalCard: {
    from: accentColors.amber[50],
    to: { r: 1.0, g: 0.969, b: 0.902, a: 1 }, // orange-50 近似值
  },
  
  // 练习页背景（兼容旧代码）
  practicePage: {
    from: themeColors.indigo[50],
    via: themeColors.purple[50],
    to: themeColors.pink[50],
  },
  
  // 移动端背景（兼容旧代码）
  mobilePage: {
    from: themeColors.indigo[50],
    to: colors.white,
  },
};

