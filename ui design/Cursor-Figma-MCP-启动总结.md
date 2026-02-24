# Cursor Figma MCP 启动总结

通过本文档可完成 **Cursor** 与 **Figma** 的 MCP 连接，从而在 Cursor 中通过对话读写、修改 Figma 设计稿。

---

## 一、启动 Bun 服务

### 1.1 安装 Bun（Windows 用 PowerShell）

```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

### 1.2 配置 Bun 环境变量

安装完成后，确保 Bun 已加入系统 PATH。可在新开 PowerShell 中执行：

```powershell
bun --version
```

若有版本号输出则说明安装成功。若提示找不到命令，需将 Bun 安装目录（如 `C:\Users\<用户名>\.bun\bin`）加入系统环境变量 PATH。

### 1.3 下载官方插件

```bash
git clone https://github.com/grab/cursor-talk-to-figma-mcp.git
```

### 1.4 启动服务

进入克隆后的项目目录，首次需安装依赖并启动 WebSocket 服务：

```bash
cd cursor-talk-to-figma-mcp
bun install
bun socket
```

> **说明**：第一次安装成功后，后续只需进入 `cursor-talk-to-figma-mcp` 目录，执行 `bun socket` 即可。该终端需保持运行，关闭后 Cursor 与 Figma 将无法通信。

**若出现 TLS/SSL 报错**：可修改项目内 `src/socket.ts`，使仅在配置了 `SSL_KEY_PATH` 和 `SSL_CERT_PATH` 时才启用 TLS（本地开发一般不需要）。

---

## 二、配置 MCP

### 2.1 Cursor 添加 MCP

在 Cursor 的 MCP 配置中（如 `~/.cursor/mcp.json` 或项目内 mcp 配置）添加：

```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "C:\\Users\\40555\\.bun\\bin\\bun.exe",
      "args": ["x", "cursor-talk-to-figma-mcp@latest"]
    }
  }
}
```

> 请将 `C:\\Users\\40555\\.bun\\bin\\bun.exe` 替换为你本机 Bun 的实际路径（可用 `where bun` 查看）。

### 2.2 Figma 添加插件

在 Figma 中安装 **Cursor Talk to Figma MCP** 插件：

- 打开链接：[Figma 社区 - Cursor Talk to Figma MCP Plugin](https://www.figma.com/community/plugin/1485687494525374295/cursor-talk-to-figma-mcp-plugin)
- 在页面中点击 **Install** / **安装**，或通过 Figma 内 **Plugins → Find more plugins** 搜索 “Cursor Talk to Figma” 后安装。

---

## 三、连接

1. 确保 **Bun 服务已启动**（在 `cursor-talk-to-figma-mcp` 目录执行 `bun socket` 且终端未关闭）。
2. 在 Figma 中打开目标设计文件，运行 **Talk To Figma MCP Plugin**，在插件中连接 WebSocket（端口默认 3055），连接成功后会显示：**Connected to server in channel: xxxxxxx**。
3. 在 **Cursor 对话框**中输入（将 `xxxxxxx` 替换为 Figma 插件中显示的 channel 名）：

   ```text
   用 TalkToFigma 加入 channel xxxxxxx
   ```

4. AI 会调用 `join_channel`，与 Figma 进入同一 channel，即可开始通过对话操作 Figma。

> **注意**：Figma 插件与 Cursor 必须使用**同一个 channel 名**，否则会超时或无法通信。若 Cursor 侧之前加入过其他 channel，需重新加入当前 Figma 插件显示的 channel。

---

## 四、开始对话修改设计稿

连接成功后，可在 Cursor 中直接通过自然语言操作 Figma，例如：

- 「获取当前文档信息」
- 「读取当前选中的设计」
- 「把当前选中的文字改成 XXX」
- 「创建一个 200×100 的矩形」
- 「给这个 frame 加 16px 内边距」

AI 会通过 TalkToFigma MCP 调用相应工具，在 Figma 中执行读写与修改。

---

## 五、常见错误与解决（实战记录）

以下为实际使用中遇到的报错及对应处理，便于按错误信息快速排查。

### 错误 1：MCP 启动失败 —— 找不到 `bunx`

**报错示例（Cursor MCP 日志）：**

```text
Starting new stdio process with command: bunx cursor-talk-to-figma-mcp@latest
'bunx' 不是内部或外部命令，也不是可运行的程序或批处理文件。
Client error for command spawn bunx ENOENT
```

**原因**：系统里没有 `bunx` 命令，或 Cursor 启动 MCP 时用的环境里 Bun 不在 PATH 中（Windows 常见）。

**解决**：

1. 确认已安装 Bun：新开 PowerShell 执行 `bun --version`，有版本号即正常。
2. 在 MCP 配置里**不要用 `bunx`**，改用 **Bun 的完整路径**，例如：

   ```json
   "TalkToFigma": {
     "command": "C:\\Users\\40555\\.bun\\bin\\bun.exe",
     "args": ["x", "cursor-talk-to-figma-mcp@latest"]
   }
   ```

3. 用 `where bun` 查本机 Bun 路径，把上面 `command` 换成你的路径（路径中的 `\` 写成 `\\`）。
4. 保存配置后重启 Cursor。

---

### 错误 2：MCP 连不上 WebSocket —— Socket error / Disconnected

**报错示例（Cursor MCP 日志）：**

```text
[INFO] Connecting to Figma socket server at ws://localhost:3055...
[ERROR] Socket error: [object ErrorEvent]
[INFO] Disconnected from Figma socket server
[INFO] Attempting to reconnect in 2 seconds...
```

**原因**：本机没有运行 WebSocket 服务（默认端口 3055），或 MCP 启动时服务还没起来。

**解决**：

1. 先进入 `cursor-talk-to-figma-mcp` 目录，执行 `bun socket`，看到 `WebSocket server running on port 3055` 后**保持该终端不关**。
2. 再**重启 Cursor**（或 Command Palette → “Developer: Reload Window”），让 MCP 在「socket 已在运行」的情况下重新连接。
3. 之后每次使用前，都先执行 `bun socket` 再开 Cursor 或再操作 Figma。

---

### 错误 3：执行 `bun socket` 时报 TLS 错误

**报错示例（终端）：**

```text
$ bun socket
$ bun run src/socket.ts
TypeError: Expected file path string or file descriptor
 code: "ERR_INVALID_ARG_TYPE"
    at G:\...\cursor-talk-to-figma-mcp\src\socket.ts:44:14
    at loadAndEvaluateModule (2:1)
```

**原因**：代码里无条件使用了 `tls.key` / `tls.cert`，而环境变量 `SSL_KEY_PATH`、`SSL_CERT_PATH` 未设置，导致 `Bun.file(undefined)` 报错。

**解决**：修改项目里的 `src/socket.ts`，让 **只有配置了 SSL 环境变量时才启用 TLS**。找到：

```ts
const server = Bun.serve({
  port: ...,
  tls: {
    key: Bun.file(process.env.SSL_KEY_PATH!),
    cert: Bun.file(process.env.SSL_CERT_PATH!),
  },
  fetch(req, server) { ... }
});
```

改为：

```ts
const useTls = process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH;

const server = Bun.serve({
  port: ...,
  ...(useTls && {
    tls: {
      key: Bun.file(process.env.SSL_KEY_PATH!),
      cert: Bun.file(process.env.SSL_CERT_PATH!),
    },
  }),
  fetch(req, server) { ... }
});
```

保存后重新执行 `bun socket` 即可（本地开发一般不需要 TLS）。

---

### 错误 4：操作 Figma 超时 / 插件已连但 Cursor 无反应

**报错示例（Cursor 调用 MCP 工具时）：**

```text
Error getting styles: Request to Figma timed out
Error getting document info: Request to Figma timed out
```

**现象**：Figma 插件里显示 **Connected to server in channel: nc6xfjck**，但 Cursor 里操作一直超时。

**原因**：Figma 插件和 Cursor 不在**同一个 channel**。例如插件在 `nc6xfjck`，而 Cursor 之前加入的是 `b335gpoo`，两边无法通信。

**解决**：

1. 看 Figma 插件里 **“Connected to server in channel:”** 后面显示的 channel 名（如 `nc6xfjck`）。
2. 在 Cursor 对话框里输入（把 `nc6xfjck` 换成你插件里显示的）：

   ```text
   用 TalkToFigma 加入 channel nc6xfjck
   ```

3. 等 AI 调用 `join_channel` 成功后再试「获取文档信息」「创建文字」等操作。

---

## 常见问题速查

| 现象 | 处理建议 |
|------|----------|
| `bunx` 不是内部或外部命令 | 使用 Bun 的**完整路径**作为 `command`，并配 `args: ["x", "cursor-talk-to-figma-mcp@latest"]`。 |
| Socket error / Disconnected | 先启动 `bun socket`，再重启 Cursor（或 Reload Window）。 |
| `bun socket` 报 ERR_INVALID_ARG_TYPE / TLS | 修改 `src/socket.ts`，仅在有 `SSL_KEY_PATH`、`SSL_CERT_PATH` 时启用 `tls`。 |
| Request to Figma timed out | 让 Cursor 加入与 Figma 插件**相同的 channel**（在对话中说「用 TalkToFigma 加入 channel xxxxxxx」）。 |
