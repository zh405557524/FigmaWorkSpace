
---
description: 
globs: 
alwaysApply: true
---
# 🚨 强制工作流程 - 必须首先执行
# UI 设计稿生成规范

## 📋 工作流程规范

### 第一步：任务类型判断

在开始任何工作之前，必须先判断当前任务类型：

#### 1. 处理错误
- **触发条件：** 插件运行报错、用户反馈错误、测试发现错误
- **处理流程：** 参考 `错误处理流程.md` 文档
- **检查清单：**
  - [ ] 查看错误信息（控制台或用户反馈）
  - [ ] 定位错误代码位置
  - [ ] 参考错误处理文档中的解决方案
  - [ ] 修复后测试验证
  - [ ] 更新错误处理文档（如发现新错误）

#### 2. 生成新的设计界面
- **触发条件：** 需要创建全新的页面布局、组件或设计元素
- **处理流程：** 按照本规范的设计生成流程执行
- **检查清单：**
  - [ ] 明确设计需求（参考设计规范文档）
  - [ ] 准备颜色和字体定义
  - [ ] 按照组件创建规范实现
  - [ ] 测试所有功能
  - [ ] 验证设计规范一致性

#### 3. 修改现有页面
- **触发条件：** 需要调整已有页面的布局、样式或内容
- **处理流程：** 按照修改流程执行
- **检查清单：**
  - [ ] 定位需要修改的代码位置
  - [ ] 确认修改范围（避免影响其他功能）
  - [ ] 按照设计规范进行修改
  - [ ] 测试修改后的功能
  - [ ] 验证未破坏现有功能

---

## 🎯 设计生成流程

### 阶段 1：准备工作

#### 1.1 需求分析
- 明确要生成的设计元素类型（页面、组件、颜色展示等）
- 确认设计规范要求（颜色、字体、间距等）
- 确定功能范围

#### 1.2 代码准备
- 检查颜色定义是否完整
- 检查字体定义是否完整
- 确认所有设计令牌已定义

### 阶段 2：代码实现

#### 2.1 颜色使用规范（必须遵守）

**规则 1：SOLID 类型颜色**
```javascript
// ✅ 正确：只包含 r, g, b
const color = { r: 0.31, g: 0.27, b: 0.90 };
rect.fills = [{ type: 'SOLID', color }];

// ❌ 错误：包含 a 属性
const color = { r: 0.31, g: 0.27, b: 0.90, a: 1 };  // 会报错
```

**规则 2：渐变类型颜色**
```javascript
// ✅ 正确：必须包含 a 和 gradientTransform
const gradientFrom = { r: 0.31, g: 0.27, b: 0.90, a: 1 };
const gradientTo = { r: 0.58, g: 0.20, b: 0.92, a: 1 };

frame.fills = [{
  type: 'GRADIENT_LINEAR',
  gradientTransform: [[1, 0, 0], [0, 1, 0]],  // 必须包含
  gradientStops: [
    { position: 0, color: gradientFrom },
    { position: 1, color: gradientTo },
  ],
}];
```

**规则 3：颜色转换函数**
```javascript
// ✅ 正确：不包含 a
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
    // 不包含 a
  } : { r: 0, g: 0, b: 0 };
}
```

**规则 4：透明度处理**
```javascript
// ❌ 错误：SOLID 类型不支持 a 属性来设置透明度
element.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 0.2 } }];

// ✅ 正确：使用 opacity 属性设置透明度
element.fills = [{ type: 'SOLID', color: grayColors.white }];
element.opacity = 0.2;  // 使用 opacity 属性

// ✅ 正确：或者使用接近的不透明颜色
element.fills = [{ type: 'SOLID', color: grayColors[200] }];  // 浅灰色
```

**重要提示：**
- SOLID 类型的 `fills` 颜色对象**不接受** `a` 属性
- 如需透明效果，使用元素的 `opacity` 属性（范围 0-1）
- 或者选择视觉上接近的不透明颜色

#### 2.2 文字创建规范（必须遵守）

**规则 1：字体加载顺序**
```javascript
// ✅ 正确顺序
async function createTextNode(text, fontSize, fontWeight, color) {
  // 步骤 1: 加载字体
  const fontStyle = fontWeight === 500 ? 'Medium' : 'Regular';
  await figma.loadFontAsync({ family: 'Inter', style: fontStyle });
  
  // 步骤 2: 创建节点
  const textNode = figma.createText();
  
  // 步骤 3: 先设置 fontName（必须在 characters 之前）
  textNode.fontName = { family: 'Inter', style: fontStyle };
  
  // 步骤 4: 设置 fontSize
  textNode.fontSize = fontSize;
  
  // 步骤 5: 最后设置 characters
  textNode.characters = text;
  
  // 步骤 6: 设置颜色
  textNode.fills = [{ type: 'SOLID', color }];
  
  return textNode;
}
```

**规则 2：字体预加载（推荐）**
```javascript
// 创建大量文本前，预加载所有需要的字体
async function createDesignSystemExample() {
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
  ]);
  
  // 然后创建文本...
}
```

#### 2.3 代码组织规范（必须遵守）

**规则 1：不使用模块系统**
```javascript
// ❌ 错误：不支持 require
const { colors } = require('./design-tokens.js');

// ❌ 错误：不支持 import
import { colors } from './design-tokens.js';

// ✅ 正确：内联定义
const colors = {
  primary: { r: 0.31, g: 0.27, b: 0.90 },
  // ...
};
```

**规则 2：code.js 文件组织规范（避免臃肿）** ⭐ **重要**

`code.js` 是统一插件的入口文件，为了保持代码清晰和可维护性，必须遵循以下组织规则：

**code.js 的职责：**
```javascript
// ✅ code.js 只负责以下内容：

// 1. 颜色和字体系统定义（设计令牌）
const themeColors = { /* ... */ };
const grayColors = { /* ... */ };
const typography = { /* ... */ };

// 2. 公共工具函数（如 hexToRgb, createTextNode）
function hexToRgb(hex) { /* ... */ }
async function createTextNode(...) { /* ... */ }

// 3. 各个页面的生成函数（保持精简）
async function createHomePage() { /* ... */ }
async function createProgressPage() { /* ... */ }
async function createSettingsPage() { /* ... */ }
// ... 其他页面函数

// 4. 插件 UI 界面（HTML + 按钮）
figma.showUI(`...`, { width: 300, height: 340 });

// 5. 消息路由处理
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-homepage') {
    await createHomePage();
  } else if (msg.type === 'create-settings-page') {
    await createSettingsPage();
  }
  // ... 其他路由
};
```

**独立页面文件规范：**

为了便于维护和分发单个功能，每个页面都应该有对应的独立文件：

```javascript
// ✅ 文件：create-homepage.js （独立可运行）
// ✅ 文件：create-settings-page.js （独立可运行）
// ✅ 文件：create-progress-page.js （独立可运行）

// 独立文件包含：
// 1. 完整的颜色和字体定义（从 code.js 复制）
// 2. 页面生成函数（createXxxPage）
// 3. 独立的插件 UI 界面
// 4. 独立的消息处理

// 示例结构（create-settings-page.js）：
/**
 * 独立插件 - 设置页面
 * 可单独导入到 Figma，不依赖其他文件
 */

// 1. 颜色系统定义
function hexToRgb(hex) { /* ... */ }
const themeColors = { /* ... */ };
// ... 其他颜色定义

// 2. 文字系统定义
const typography = { /* ... */ };

// 3. 公共函数
async function createTextNode(...) { /* ... */ }

// 4. 页面生成函数
async function createSettingsPage() {
  try {
    // 页面生成逻辑
    figma.notify('设置页面创建成功！✅');
  } catch (error) {
    figma.notify(`创建失败: ${error.message}`);
    console.error('错误详情:', error);
  }
}

// 5. 独立的 UI 界面
figma.showUI(`
  <html>
    <body>
      <h1>创建设置页面</h1>
      <button onclick="parent.postMessage({pluginMessage: {type: 'create'}}, '*')">
        创建设计稿
      </button>
    </body>
  </html>
`, { width: 280, height: 160 });

// 6. 独立的消息处理
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create') {
    await createSettingsPage();
  }
};
```

**文件组织最佳实践：**

```
ui design/
├── code.js                          # 统一插件（包含所有功能）
│   ├── 颜色系统定义
│   ├── 文字系统定义
│   ├── createHomePage()             # 首页生成函数
│   ├── createProgressPage()         # 进度页面生成函数
│   ├── createSettingsPage()         # 设置页面生成函数
│   ├── createPracticeModeAndGoal()  # 练习模式生成函数
│   ├── createPianoKeys()            # 钢琴键盘生成函数
│   ├── createDesignSystemExample()  # 设计系统示例
│   ├── 插件 UI 界面（6个按钮）
│   └── 消息路由处理
│
├── create-homepage.js               # 独立插件：首页（参考示例）
├── create-settings-page.js          # 独立插件：设置页面
├── create-progress-page.js          # 独立插件：进度页面（已删除，已集成到 code.js）
└── ...
```

**使用场景：**

1. **日常开发和使用** → 使用 `code.js` 统一插件
   - 包含所有功能
   - 一次导入，所有功能可用
   - 方便快速切换不同页面

2. **分发单个功能** → 使用独立插件文件
   - 只需要某个特定功能时
   - 分享给其他开发者
   - 代码更简洁，易于理解

3. **新增页面时** → 创建两个版本
   - 先创建独立文件（如 `create-new-page.js`）
   - 测试功能正常
   - 将核心函数复制到 `code.js`
   - 在 `code.js` 中添加按钮和路由

**规则 3：错误处理**
```javascript
// ✅ 必须使用 try-catch
async function createDesign() {
  try {
    // 创建代码...
    figma.notify('创建成功！');
  } catch (error) {
    figma.notify(`创建失败: ${error.message}`);
    console.error('错误详情:', error);
    console.error('错误堆栈:', error.stack);
  }
}
```

### 阶段 3：测试验证

#### 3.1 功能测试
- [ ] 所有元素正确创建
- [ ] 颜色显示正确
- [ ] 文字显示正确
- [ ] 渐变显示正确
- [ ] 布局符合设计规范

#### 3.2 错误检查
- [ ] 控制台无错误信息
- [ ] 无用户反馈错误
- [ ] 所有功能正常运行

---

## 📐 设计规范

### 颜色系统

#### 主色调（品牌色）
```javascript
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
```

#### 中性色（灰度）
```javascript
const grayColors = {
  white: hexToRgb('#FFFFFF'),  // 卡片背景、键盘
  50: hexToRgb('#F9FAFB'),
  200: hexToRgb('#E5E7EB'),    // 卡片边框、分隔线
  400: hexToRgb('#9CA3AF'),    // 未激活图标、辅助文字
  600: hexToRgb('#4B5563'),    // 次要文字
  800: hexToRgb('#1F2937'),    // 主要文字、标题
  900: hexToRgb('#111827'),    // 黑键
};
```

#### 功能色
```javascript
const functionalColors = {
  green: {
    100: hexToRgb('#DCFCE7'),  // 正确反馈背景
    600: hexToRgb('#16A34A'),  // 正确反馈图标
    800: hexToRgb('#166534'),  // 正确反馈文字
  },
  red: {
    100: hexToRgb('#FEE2E2'),  // 错误反馈背景
    800: hexToRgb('#991B1B'),  // 错误反馈文字
  },
  amber: {
    50: hexToRgb('#FFFBEB'),   // 目标卡片背景
    200: hexToRgb('#FDE68A'),  // 目标卡片边框
    400: hexToRgb('#FBBF24'),  // 进度条起始
  },
  orange: {
    500: hexToRgb('#F97316'),  // 进度条终点、连击背景
  },
  blue: {
    100: hexToRgb('#DBEAFE'),  // 功能卡片背景
    600: hexToRgb('#2563EB'),  // 功能图标
  },
};
```

#### 渐变配色
```javascript
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
    to: hexToRgb('#F59E0B'),  // amber-500
  },
  // 启动页渐变
  splash: {
    from: themeColors.indigo[600],
    via: themeColors.purple[600],
    to: themeColors.pink[500],
  },
};
```

### 文字系统

#### 字体大小
```javascript
const typography = {
  sizes: {
    xs: 12,      // 标签、小字提示
    sm: 14,      // 辅助说明
    base: 16,    // 正文、按钮文字、基础字号
    lg: 18,      // 次级标题 (H3)
    xl: 20,      // 区块标题、数据统计 (H2)
    '2xl': 24,   // 页面主标题、大号数据 (H1)
    '4xl': 36,   // 启动页应用名
  },
  weights: {
    normal: 400,  // 正文、输入框
    medium: 500,  // 标题、按钮、标签
  },
  textColors: {
    primary: grayColors[800],      // 标题、重要信息
    secondary: grayColors[600],    // 辅助说明、描述
    tertiary: grayColors[400],     // 未激活状态、占位符
    white: grayColors.white,       // 按钮文字、启动页文字
    active: themeColors.indigo[600], // 激活状态、强调数据
  },
};
```

---

## ✅ 必须遵守的规范清单

### 代码组织
- [ ] **禁止使用 `require` 或 `import`** - 所有代码必须内联
- [ ] **所有设计令牌直接定义在代码中** - 颜色、字体、间距等
- [ ] **使用 `try-catch` 包裹所有异步操作** - 提供错误处理
- [ ] **保持 `code.js` 简洁** - 只包含必要的代码，避免臃肿 ⭐ **新增**
- [ ] **每个页面创建独立文件** - 如 `create-settings-page.js`，可单独运行 ⭐ **新增**
- [ ] **code.js 只负责 UI 和路由** - 页面生成函数保持精简 ⭐ **新增**
- [ ] **独立文件必须完整** - 包含所有必要的定义，不依赖外部文件 ⭐ **新增**

### 颜色使用
- [ ] **SOLID 类型颜色** - 只包含 `{ r, g, b }`，不包含 `a`
- [ ] **渐变类型颜色** - 必须包含 `{ r, g, b, a: 1 }`
- [ ] **渐变必须包含 `gradientTransform`** - 使用 `[[1, 0, 0], [0, 1, 0]]` 作为默认值
- [ ] **颜色转换函数不返回 `a`** - `hexToRgb` 只返回 `{ r, g, b }`
- [ ] **透明度使用 `opacity` 属性** - 不在颜色对象中使用 `a` 属性

### 文字创建
- [ ] **先加载字体** - 使用 `await figma.loadFontAsync()`
- [ ] **先设置 `fontName`** - 必须在设置 `characters` 之前
- [ ] **再设置 `fontSize`** - 在 `fontName` 之后
- [ ] **最后设置 `characters`** - 在 `fontName` 和 `fontSize` 之后
- [ ] **大量文本前预加载字体** - 使用 `Promise.all()` 预加载

### 错误处理
- [ ] **使用 `figma.notify()` 显示用户友好的错误信息**
- [ ] **使用 `console.error()` 记录详细错误信息**
- [ ] **记录错误堆栈** - 使用 `error.stack`

---

## 🔄 修改现有页面流程

### 步骤 1：定位代码
- 找到需要修改的函数或代码块
- 确认修改范围，避免影响其他功能

### 步骤 2：备份检查
- 确认当前功能正常
- 记录当前代码状态（如有必要）

### 步骤 3：执行修改
- 按照设计规范进行修改
- 遵循必须遵守的规范清单

### 步骤 4：测试验证
- 测试修改后的功能
- 验证未破坏现有功能
- 检查控制台无错误

---

## 🎯 快速决策指南

### 何时修改 code.js？
```
✅ 添加新页面功能（集成到统一插件）
✅ 修改插件 UI 界面（添加/删除按钮）
✅ 修改消息路由逻辑
✅ 更新公共的颜色或字体定义
❌ 不要让单个函数超过 500 行
❌ 不要添加过于复杂的逻辑
```

### 何时创建独立文件？
```
✅ 创建新页面（如 create-xxx-page.js）
✅ 需要分享单个功能给其他人
✅ 测试新功能（先独立测试，再集成）
✅ 提供可选的独立版本
```

### 新增页面的标准流程：
```
步骤 1: 创建独立文件（如 create-new-page.js）
        ├── 完整的颜色和字体定义
        ├── 页面生成函数
        ├── 独立的 UI 界面
        └── 独立的消息处理

步骤 2: 测试独立文件
        └── 确保功能正常运行

步骤 3: 集成到 code.js
        ├── 复制页面生成函数到 code.js
        ├── 在 UI 中添加新按钮
        └── 在消息处理中添加路由

步骤 4: 创建使用文档
        └── 如 "xxx页面使用说明.md"

步骤 5: 更新项目文档
        ├── 更新 README_插件使用.md
        ├── 更新 设计稿工具总览.md
        └── 创建完成说明文档
```

---

## 📚 相关文档

- **错误处理流程** - 参考 `错误处理流程.md`（仅在处理错误时使用）
- **快速参考** - 参考 `QUICK_REFERENCE.md`
- **设计规范** - 参考 `DESIGN_SPEC.md`
- **代码组织示例** - 参考 `create-homepage.js`、`create-settings-page.js` ⭐ **新增**
- **插件使用指南** - 参考 `README_插件使用.md`
- **工具总览** - 参考 `设计稿工具总览.md`

---

## 📌 重要更新说明

### v1.1 - 2024-12-17
- ✅ **新增代码组织规范** - 避免 `code.js` 文件臃肿
- ✅ **独立文件规范** - 每个页面创建独立的可运行文件
- ✅ **职责分离** - `code.js` 只负责 UI 界面和消息路由
- ✅ **参考示例** - `create-homepage.js`、`create-settings-page.js`

---

**版本：** 1.1  
**最后更新：** 2024-12-17  
**适用插件：** 钢琴练习应用工具

