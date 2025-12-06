/**
 * 设计系统工具函数
 * 用于在 Figma 插件中快速创建符合设计规范的组件
 */

const { designTokens } = require('./design-tokens.js');

const { colors, typography, components, layout, componentSizes } = designTokens;

/**
 * 创建带样式的矩形（卡片）
 */
function createCard(x, y, width, height, name, options = {}) {
  const {
    color = colors.white,
    borderRadius = components.borderRadius['2xl'],
    shadow = 'sm',
    border = false,
    parent = null,
  } = options;
  
  const rect = figma.createRectangle();
  rect.name = name;
  rect.x = x;
  rect.y = y;
  rect.resize(width, height);
  rect.fills = [{ type: 'SOLID', color }];
  rect.cornerRadius = borderRadius;
  
  // 添加阴影
  if (shadow && components.shadows[shadow]) {
    rect.effects = [components.shadows[shadow]];
  }
  
  // 添加边框
  if (border) {
    rect.strokes = [{
      type: 'SOLID',
      color: border === true ? components.borders.color : border,
    }];
    rect.strokeWeight = components.borders.width;
  }
  
  if (parent) {
    parent.appendChild(rect);
  } else {
    figma.currentPage.appendChild(rect);
  }
  
  return rect;
}

/**
 * 创建按钮
 */
async function createButton(x, y, width, height, name, options = {}) {
  const {
    type = 'primary',  // 'primary' | 'secondary'
    text = '',
    parent = null,
  } = options;
  
  const button = figma.createFrame();
  button.name = name;
  button.x = x;
  button.y = y;
  button.resize(width, height);
  button.cornerRadius = components.borderRadius['2xl'];
  
  // 主按钮：渐变背景
  if (type === 'primary') {
    const gradient = designTokens.gradients.primaryButton;
    button.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientStops: [
        { position: 0, color: gradient.from },
        { position: 1, color: gradient.to },
      ],
    }];
    button.effects = [components.shadows.lg];
  } else {
    // 次级按钮：白色背景 + 边框
    button.fills = [{ type: 'SOLID', color: colors.white }];
    button.strokes = [{ type: 'SOLID', color: components.borders.color }];
    button.strokeWeight = components.borders.width;
    button.effects = [components.shadows.sm];
  }
  
  // 添加文字
  if (text) {
    await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
    const textNode = figma.createText();
    textNode.name = `${name}-文字`;
    textNode.characters = text;
    textNode.fontSize = typography.sizes.base;
    textNode.fontName = { family: 'Inter', style: 'Medium' };
    textNode.fills = [{ 
      type: 'SOLID', 
      color: type === 'primary' ? colors.white : colors.textPrimary 
    }];
    
    // 居中文字
    textNode.x = (width - textNode.width) / 2;
    textNode.y = (height - textNode.height) / 2;
    
    button.appendChild(textNode);
  }
  
  if (parent) {
    parent.appendChild(button);
  } else {
    figma.currentPage.appendChild(button);
  }
  
  return button;
}

/**
 * 创建文本节点
 */
async function createText(x, y, text, options = {}) {
  const {
    name = '文本',
    fontSize = typography.sizes.base,
    fontWeight = typography.weights.normal,
    color = colors.textPrimary,
    parent = null,
  } = options;
  
  await figma.loadFontAsync({ family: 'Inter', style: fontWeight === 500 ? 'Medium' : 'Regular' });
  
  const textNode = figma.createText();
  textNode.name = name;
  textNode.x = x;
  textNode.y = y;
  textNode.characters = text;
  textNode.fontSize = fontSize;
  textNode.fontName = { 
    family: 'Inter', 
    style: fontWeight === 500 ? 'Medium' : 'Regular' 
  };
  textNode.fills = [{ type: 'SOLID', color }];
  
  if (parent) {
    parent.appendChild(textNode);
  } else {
    figma.currentPage.appendChild(textNode);
  }
  
  return textNode;
}

/**
 * 创建统计卡片
 */
function createStatCard(x, y, width, height, name, options = {}) {
  const {
    value = '',
    label = '',
    highlight = false,
    parent = null,
  } = options;
  
  const card = createCard(x, y, width, height, name, {
    color: colors.white,
    borderRadius: components.borderRadius.xl,
    shadow: 'sm',
    parent,
  });
  
  // 这里可以添加数值和标签文字（需要异步加载字体）
  // 为了简化，先只创建卡片框架
  
  return card;
}

/**
 * 创建进度条
 */
function createProgressBar(x, y, width, height, name, progress = 0.6, options = {}) {
  const {
    parent = null,
  } = options;
  
  // 进度条容器
  const container = figma.createFrame();
  container.name = `${name}-容器`;
  container.x = x;
  container.y = y;
  container.resize(width, height);
  container.fills = [{ type: 'SOLID', color: colors.white }];
  container.cornerRadius = components.borderRadius.full;
  
  // 进度条填充
  const fillWidth = width * Math.max(0, Math.min(1, progress));
  const fill = figma.createRectangle();
  fill.name = `${name}-填充`;
  fill.x = 0;
  fill.y = 0;
  fill.resize(fillWidth, height);
  
  const gradient = designTokens.gradients.progress;
  fill.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: gradient.from },
      { position: 1, color: gradient.to },
    ],
  }];
  fill.cornerRadius = components.borderRadius.full;
  
  container.appendChild(fill);
  
  if (parent) {
    parent.appendChild(container);
  } else {
    figma.currentPage.appendChild(container);
  }
  
  return container;
}

/**
 * 创建底部导航栏
 */
function createBottomNav(x, y, width, height, name, options = {}) {
  const {
    activeIndex = 0,
    parent = null,
  } = options;
  
  const nav = figma.createFrame();
  nav.name = name;
  nav.x = x;
  nav.y = y;
  nav.resize(width, height);
  nav.fills = [{ type: 'SOLID', color: colors.white }];
  
  // 顶部边框
  nav.strokes = [{ type: 'SOLID', color: components.borders.color }];
  nav.strokeWeight = components.borders.width;
  nav.strokeTopWeight = components.borders.width;
  
  // 导航项占位（3个）
  const itemWidth = width / 3;
  const iconSize = componentSizes.bottomNav.iconSize;
  
  for (let i = 0; i < 3; i++) {
    const itemX = i * itemWidth + (itemWidth - iconSize) / 2;
    const itemY = (height - iconSize) / 2;
    
    const icon = figma.createRectangle();
    icon.name = `导航图标-${i}`;
    icon.x = itemX;
    icon.y = itemY;
    icon.resize(iconSize, iconSize);
    icon.fills = [{
      type: 'SOLID',
      color: i === activeIndex ? colors.textActive : colors.textInactive,
    }];
    icon.cornerRadius = 4;
    
    nav.appendChild(icon);
  }
  
  if (parent) {
    parent.appendChild(nav);
  } else {
    figma.currentPage.appendChild(nav);
  }
  
  return nav;
}

/**
 * 创建反馈提示框
 */
function createFeedbackBox(x, y, width, height, name, type = 'success', options = {}) {
  const {
    parent = null,
  } = options;
  
  let bgColor, textColor;
  
  if (type === 'success') {
    bgColor = colors.successBg;
    textColor = colors.successText;
  } else if (type === 'error') {
    bgColor = colors.errorBg;
    textColor = colors.error;
  } else {
    bgColor = colors.warningBg;
    textColor = colors.warning;
  }
  
  const box = createCard(x, y, width, height, name, {
    color: bgColor,
    borderRadius: components.borderRadius.xl,
    shadow: 'sm',
    parent,
  });
  
  return box;
}

/**
 * 创建目标卡片（带渐变背景）
 */
function createGoalCard(x, y, width, height, name, options = {}) {
  const {
    parent = null,
  } = options;
  
  const card = figma.createFrame();
  card.name = name;
  card.x = x;
  card.y = y;
  card.resize(width, height);
  card.cornerRadius = components.borderRadius['2xl'];
  
  // 渐变背景
  const gradient = designTokens.gradients.goalCard;
  card.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: gradient.from },
      { position: 1, color: gradient.to },
    ],
  }];
  
  // 边框
  card.strokes = [{ type: 'SOLID', color: components.borders.colorAmber }];
  card.strokeWeight = components.borders.width;
  
  // 阴影
  card.effects = [components.shadows.sm];
  
  if (parent) {
    parent.appendChild(card);
  } else {
    figma.currentPage.appendChild(card);
  }
  
  return card;
}

/**
 * 应用渐变背景到框架
 */
function applyGradientBackground(frame, gradientName) {
  const gradient = designTokens.gradients[gradientName];
  if (!gradient) return;
  
  frame.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: gradient.from },
      { position: 1, color: gradient.to },
    ],
  }];
}

/**
 * 查找节点（递归）
 */
function findNode(parent, name) {
  if (parent.name === name) {
    return parent;
  }
  if ('children' in parent) {
    for (const child of parent.children) {
      const found = findNode(child, name);
      if (found) return found;
    }
  }
  return null;
}

/**
 * 检查元素是否存在
 */
function elementExists(parent, name) {
  if (!parent || !('children' in parent)) return false;
  return parent.children.some(child => child.name === name);
}

// CommonJS 导出
module.exports = {
  createCard,
  createButton,
  createText,
  createStatCard,
  createProgressBar,
  createBottomNav,
  createFeedbackBox,
  createGoalCard,
  applyGradientBackground,
  findNode,
  elementExists,
};

