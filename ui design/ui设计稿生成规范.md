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

**规则 2：错误处理**
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

### 颜色使用
- [ ] **SOLID 类型颜色** - 只包含 `{ r, g, b }`，不包含 `a`
- [ ] **渐变类型颜色** - 必须包含 `{ r, g, b, a: 1 }`
- [ ] **渐变必须包含 `gradientTransform`** - 使用 `[[1, 0, 0], [0, 1, 0]]` 作为默认值
- [ ] **颜色转换函数不返回 `a`** - `hexToRgb` 只返回 `{ r, g, b }`

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

## 📚 相关文档

- **错误处理流程** - 参考 `错误处理流程.md`（仅在处理错误时使用）
- **快速参考** - 参考 `QUICK_REFERENCE.md`
- **设计规范** - 参考 `DESIGN_SPEC.md`

---

**版本：** 1.0  
**最后更新：** 2024-12  
**适用插件：** 钢琴练习应用工具

