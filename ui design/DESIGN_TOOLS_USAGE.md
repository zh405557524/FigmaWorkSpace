# 设计工具使用指南

本工具集基于 `DESIGN_SPEC.md` 设计规范，提供了完整的颜色、字体、间距、组件等设计令牌和工具函数。

## 📁 文件结构

```
ui design/
├── design-tokens.js      # 完整设计令牌（颜色、字体、间距等）
├── design-colors.js      # 颜色配置（兼容旧代码）
├── design-utils.js       # 工具函数（创建组件等）
└── DESIGN_TOOLS_USAGE.md # 本使用指南
```

## 🎨 使用方式

### 1. 导入设计令牌

```javascript
import { designTokens } from './design-tokens.js';

const { colors, typography, components, layout } = designTokens;
```

### 2. 使用颜色

```javascript
// 主题色
const primaryColor = colors.primary;        // indigo-600
const primaryLight = colors.primaryLight;  // indigo-50

// 功能色
const successColor = colors.success;       // green-600
const errorColor = colors.error;          // red-800
const warningColor = colors.warning;      // orange-500

// 文字颜色
const textPrimary = colors.textPrimary;    // gray-800
const textSecondary = colors.textSecondary; // gray-600
const textInactive = colors.textInactive;  // gray-400
const textActive = colors.textActive;       // indigo-600

// 在 Figma 中使用
rect.fills = [{ type: 'SOLID', color: colors.primary }];
```

### 3. 使用渐变

```javascript
import { gradients } from './design-tokens.js';

// 应用渐变背景
const gradient = gradients.primaryButton;
frame.fills = [{
  type: 'GRADIENT_LINEAR',
  gradientStops: [
    { position: 0, color: gradient.from },
    { position: 1, color: gradient.to },
  ],
}];
```

### 4. 使用字体

```javascript
import { typography } from './design-tokens.js';

// 字体大小
const h1Size = typography.sizes['2xl'];  // 24px
const bodySize = typography.sizes.base;  // 16px
const smallSize = typography.sizes.sm;   // 14px

// 字重
const normalWeight = typography.weights.normal;  // 400
const mediumWeight = typography.weights.medium;  // 500

// 文字颜色
const textColor = typography.colors.primary;  // 主要文字
```

### 5. 使用间距

```javascript
import { components } from './design-tokens.js';

// 内边距
const paddingSmall = components.spacing.padding.sm;   // 16px
const paddingMedium = components.spacing.padding.md; // 24px

// 外边距
const marginSmall = components.spacing.margin.sm;    // 8px
const marginLarge = components.spacing.margin.lg;    // 16px

// 间隙
const gapSmall = components.spacing.gap.sm;         // 12px
const gapLarge = components.spacing.gap.lg;         // 24px
```

### 6. 使用圆角

```javascript
// 圆角
const radiusXL = components.borderRadius.xl;      // 12px - 小卡片
const radius2XL = components.borderRadius['2xl']; // 16px - 主要卡片、按钮
const radiusFull = components.borderRadius.full;  // 9999px - 圆形元素

rect.cornerRadius = radius2XL;
```

### 7. 使用阴影

```javascript
// 阴影效果
const shadowSm = components.shadows.sm;  // 细微阴影（卡片）
const shadowLg = components.shadows.lg;  // 较强阴影（主按钮）
const shadowXl = components.shadows.xl;  // 强阴影（hover 状态）

rect.effects = [shadowSm];
```

## 🛠️ 使用工具函数

### 创建卡片

```javascript
import { createCard } from './design-utils.js';

const card = createCard(0, 0, 200, 100, '统计卡片', {
  color: colors.white,
  borderRadius: components.borderRadius.xl,
  shadow: 'sm',
  border: true,
  parent: mainFrame,
});
```

### 创建按钮

```javascript
import { createButton } from './design-utils.js';

// 主按钮
const primaryBtn = await createButton(0, 0, 200, 60, '开始练习', {
  type: 'primary',
  text: '开始练习',
  parent: mainFrame,
});

// 次级按钮
const secondaryBtn = await createButton(0, 80, 200, 60, '取消', {
  type: 'secondary',
  text: '取消',
  parent: mainFrame,
});
```

### 创建文本

```javascript
import { createText } from './design-utils.js';

const title = await createText(20, 20, '页面标题', {
  name: '标题',
  fontSize: typography.sizes['2xl'],
  fontWeight: typography.weights.medium,
  color: colors.textPrimary,
  parent: mainFrame,
});
```

### 创建进度条

```javascript
import { createProgressBar } from './design-utils.js';

const progress = createProgressBar(20, 100, 200, 8, '进度条', 0.6, {
  parent: mainFrame,
});
```

### 创建底部导航

```javascript
import { createBottomNav } from './design-utils.js';

const nav = createBottomNav(0, 748, 375, 64, '底部导航', {
  activeIndex: 0,
  parent: mainFrame,
});
```

### 创建反馈提示框

```javascript
import { createFeedbackBox } from './design-utils.js';

// 成功提示
const successBox = createFeedbackBox(20, 200, 200, 60, '成功提示', 'success', {
  parent: mainFrame,
});

// 错误提示
const errorBox = createFeedbackBox(20, 280, 200, 60, '错误提示', 'error', {
  parent: mainFrame,
});
```

### 创建目标卡片

```javascript
import { createGoalCard } from './design-utils.js';

const goalCard = createGoalCard(20, 360, 335, 100, '今日目标', {
  parent: mainFrame,
});
```

## 📐 布局尺寸

```javascript
import { layout, componentSizes } from './design-tokens.js';

// 屏幕尺寸
const screenWidth = layout.screen.width;   // 375
const screenHeight = layout.screen.height;  // 812

// 移动端布局
const containerWidth = layout.mobile.containerWidth;  // 448
const padding = layout.mobile.padding;                // 24
const bottomNavHeight = layout.mobile.bottomNavHeight; // 64

// 组件尺寸
const logoSize = componentSizes.logo.md;              // 64
const progressBarHeight = componentSizes.progressBar.height; // 8
```

## 🎯 完整示例

```javascript
import { designTokens } from './design-tokens.js';
import { createCard, createButton, createText } from './design-utils.js';

const { colors, typography, components, layout } = designTokens;

// 创建主框架
const mainFrame = figma.createFrame();
mainFrame.name = '首页';
mainFrame.resize(layout.screen.width, layout.screen.height);
mainFrame.fills = [{ type: 'SOLID', color: colors.primaryLight }];

// 创建标题
const title = await createText(24, 60, '钢琴识谱练习', {
  fontSize: typography.sizes['2xl'],
  fontWeight: typography.weights.medium,
  color: colors.textPrimary,
  parent: mainFrame,
});

// 创建统计卡片
const statCard = createCard(24, 160, 100, 100, '统计卡片', {
  color: colors.white,
  borderRadius: components.borderRadius.xl,
  shadow: 'sm',
  parent: mainFrame,
});

// 创建主按钮
const button = await createButton(24, 290, 327, 80, '开始练习', {
  type: 'primary',
  text: '开始练习',
  parent: mainFrame,
});

// 创建底部导航
const nav = createBottomNav(0, 748, 375, 64, '底部导航', {
  activeIndex: 0,
  parent: mainFrame,
});

figma.currentPage.appendChild(mainFrame);
```

## 📋 颜色速查表

| 用途 | 颜色变量 | 值 |
|------|---------|-----|
| 主色 | `colors.primary` | indigo-600 (#4F46E5) |
| 主色浅色 | `colors.primaryLight` | indigo-50 (#EEF2FF) |
| 成功色 | `colors.success` | green-600 (#16A34A) |
| 错误色 | `colors.error` | red-800 (#991B1B) |
| 警告色 | `colors.warning` | orange-500 (#F97316) |
| 主要文字 | `colors.textPrimary` | gray-800 (#1F2937) |
| 次要文字 | `colors.textSecondary` | gray-600 (#4B5563) |
| 未激活 | `colors.textInactive` | gray-400 (#9CA3AF) |
| 激活状态 | `colors.textActive` | indigo-600 (#4F46E5) |
| 边框 | `colors.border` | gray-200 (#E5E7EB) |

## 📝 注意事项

1. **字体加载**：创建文本前需要先加载字体
   ```javascript
   await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
   ```

2. **异步函数**：`createButton` 和 `createText` 是异步函数，需要使用 `await`

3. **渐变**：Figma 的渐变需要 `gradientStops` 数组，每个 stop 包含 `position` 和 `color`

4. **阴影**：阴影效果需要符合 Figma API 格式，已预定义在 `components.shadows` 中

5. **兼容性**：`design-colors.js` 保持向后兼容，新代码建议使用 `design-tokens.js`

## 🔗 相关文件

- `DESIGN_SPEC.md` - 完整设计规范文档
- `design-tokens.js` - 完整设计令牌
- `design-utils.js` - 工具函数
- `code.js` - Figma 插件主文件

