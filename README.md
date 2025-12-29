# Tone Studio - 表达工作台

一个基于 React + Vite + TypeScript + TailwindCSS 的单页应用，用于生成多种语气版本的文案。

## 功能特性

- 🎯 **多场景支持**：邮件、会议开场、跟进、社媒短帖
- 💬 **多种语气**：温暖版、专业版、精炼版、幽默版、中英双语版
- 📝 **模板管理**：保存、搜索、导出/导入模板
- 💾 **自动保存**：输入内容实时保存到 localStorage
- ⌨️ **快捷键**：Cmd/Ctrl + Enter 生成，Cmd/Ctrl + S 保存模板

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev
```

打开浏览器访问显示的本地地址（通常是 `http://localhost:5173`）

### 构建生产版本

```bash
pnpm run build
```

## 使用说明

1. **填写输入区**：选择场景、关系、目的等参数，输入关键信息点
2. **点击"载入示例"**：快速查看效果
3. **点击"生成版本"**：生成 5 种不同语气的版本
4. **编辑和保存**：可以编辑任意版本，保存为模板供下次使用

## 技术栈

- React 18
- Vite 5
- TypeScript 5
- TailwindCSS 3
- localStorage（数据持久化）

## 项目结构

```
├── src/
│   ├── components/      # React 组件
│   │   ├── InputArea.tsx
│   │   ├── OutputArea.tsx
│   │   ├── TemplateLibrary.tsx
│   │   └── Toast.tsx
│   ├── utils/           # 工具函数
│   │   ├── generator.ts # 文案生成器
│   │   └── storage.ts   # localStorage 管理
│   ├── types.ts         # TypeScript 类型定义
│   ├── App.tsx          # 主应用组件
│   ├── main.tsx         # 入口文件
│   └── index.css        # 全局样式
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

