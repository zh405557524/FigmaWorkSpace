/**
 * 示例：如何在 Figma 插件中使用设计工具
 * 
 * 在 code.js 中，你可以这样使用：
 */

// 方式 1: 导入设计令牌
const { colors, typography, components, layout } = require('./design-tokens.js');

// 方式 2: 导入完整的设计令牌对象
const { designTokens } = require('./design-tokens.js');
const { colors: designColors } = designTokens;

// 方式 3: 导入工具函数
const { createCard, createButton, createText, createProgressBar } = require('./design-utils.js');

// 使用示例
async function example() {
  // 1. 使用颜色
  const rect = figma.createRectangle();
  rect.fills = [{ type: 'SOLID', color: colors.primary }];
  
  // 2. 使用字体大小
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  const text = figma.createText();
  text.fontSize = typography.sizes['2xl']; // 24px
  text.characters = '标题';
  
  // 3. 使用圆角
  rect.cornerRadius = components.borderRadius['2xl']; // 16px
  
  // 4. 使用间距
  const padding = components.spacing.padding.md; // 24px
  
  // 5. 使用工具函数创建卡片
  const card = createCard(0, 0, 200, 100, '统计卡片', {
    color: colors.white,
    borderRadius: components.borderRadius.xl,
    shadow: 'sm',
    parent: figma.currentPage,
  });
  
  // 6. 使用工具函数创建按钮
  const button = await createButton(0, 120, 200, 60, '开始练习', {
    type: 'primary',
    text: '开始练习',
    parent: figma.currentPage,
  });
  
  // 7. 使用工具函数创建进度条
  const progress = createProgressBar(0, 200, 200, 8, '进度条', 0.6, {
    parent: figma.currentPage,
  });
}


