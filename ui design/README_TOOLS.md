# 设计工具使用说明

## 📁 文件位置

所有工具文件都在 `ui design/` 目录下：

- `design-tokens.js` - 完整设计令牌（颜色、字体、间距等）
- `design-utils.js` - 工具函数（创建组件等）
- `design-colors.js` - 颜色配置（兼容旧代码）

## 🚀 在插件中使用

### 1. 导入设计令牌

```javascript
// 在 code.js 文件顶部添加
const { colors, typography, components, layout } = require('./design-tokens.js');
```

### 2. 导入工具函数

```javascript
// 导入需要的工具函数
const { createCard, createButton, createText } = require('./design-utils.js');
```

### 3. 使用示例

```javascript
// 使用颜色
const rect = figma.createRectangle();
rect.fills = [{ type: 'SOLID', color: colors.primary }];

// 使用字体大小
text.fontSize = typography.sizes['2xl']; // 24px

// 使用圆角
rect.cornerRadius = components.borderRadius['2xl']; // 16px

// 使用工具函数创建卡片
const card = createCard(0, 0, 200, 100, '统计卡片', {
  color: colors.white,
  borderRadius: components.borderRadius.xl,
  shadow: 'sm',
  parent: mainFrame,
});

// 使用工具函数创建按钮
const button = await createButton(0, 120, 200, 60, '开始练习', {
  type: 'primary',
  text: '开始练习',
  parent: mainFrame,
});
```

## ⚠️ 注意事项

1. **文件路径**：确保 `require` 路径正确，文件在同一目录下使用 `./` 前缀
2. **异步函数**：`createButton` 和 `createText` 是异步函数，需要使用 `await`
3. **字体加载**：创建文本前需要先加载字体
   ```javascript
   await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
   ```

## 📚 完整文档

详细使用说明请查看 `DESIGN_TOOLS_USAGE.md`


