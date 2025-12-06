# Figma 插件开发 - 快速参考

## 🚨 常见错误速查

### 错误 1: `require is not defined`
**解决：** 所有代码内联，不使用 `require` 或 `import`

### 错误 2: `Unrecognized key(s) in object: 'a'`
**解决：** SOLID 颜色不要包含 `a`，只使用 `{ r, g, b }`

### 错误 3: `Required value missing at gradientTransform`
**解决：** 渐变必须包含 `gradientTransform: [[1, 0, 0], [0, 1, 0]]`

### 错误 4: `Required value missing at color.a`
**解决：** 渐变颜色必须包含 `a`，使用 `{ r, g, b, a: 1 }`

### 错误 5: `Cannot write to node with unloaded font`
**解决：** 先设置 `fontName`，再设置 `characters`

---

## ✅ 正确代码模板

### 颜色转换
```javascript
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}
```

### SOLID 颜色
```javascript
rect.fills = [{ 
  type: 'SOLID', 
  color: { r: 0.31, g: 0.27, b: 0.90 }  // 不含 a
}];
```

### 渐变颜色
```javascript
frame.fills = [{
  type: 'GRADIENT_LINEAR',
  gradientTransform: [[1, 0, 0], [0, 1, 0]],  // 必须
  gradientStops: [
    { position: 0, color: { r: 0.31, g: 0.27, b: 0.90, a: 1 } },  // 含 a
    { position: 1, color: { r: 0.58, g: 0.20, b: 0.92, a: 1 } },  // 含 a
  ],
}];
```

### 创建文本
```javascript
// 1. 加载字体
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

// 2. 创建节点
const text = figma.createText();

// 3. 先设置 fontName
text.fontName = { family: 'Inter', style: 'Regular' };

// 4. 设置 fontSize
text.fontSize = 16;

// 5. 最后设置 characters
text.characters = '文本';
```

---

## 📋 检查清单

创建组件前检查：
- [ ] 颜色格式正确（SOLID 不含 `a`，渐变含 `a`）
- [ ] 渐变包含 `gradientTransform`
- [ ] 文本先设置 `fontName` 再设置 `characters`
- [ ] 字体已加载（使用 `await`）

