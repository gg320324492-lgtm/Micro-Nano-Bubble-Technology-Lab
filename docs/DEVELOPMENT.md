# 微纳气泡实验室网站 - 开发流程指南

## 项目概述

本项目是一个基于 **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4** 的实验室官方网站，支持静态导出并部署到 GitHub Pages。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.1.6 | React 框架 |
| React | 19.2.3 | UI 库 |
| TypeScript | ^5 | 类型安全 |
| Tailwind CSS | ^4 | 样式框架 |
| Framer Motion | ^12 | 动画效果 |
| Sharp | ^0.34 | 图片优化 |

---

## 一、环境配置

### 1.1 准备工作

确保本地已安装以下环境：

- **Node.js** (推荐 v18+)
- **npm** 或 **yarn**
- **Git**

### 1.2 克隆项目

```bash
git clone https://github.com/gg320324492-lgtm/Micro-Nano-Bubble-Technology-Lab.git
cd Micro-Nano-Bubble-Technology-Lab
```

### 1.3 安装依赖

```bash
npm install
```

### 1.4 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

---

## 二、项目结构

```
lab-site/
├── public/                  # 静态资源（图片、文件）
│   ├── home/               # 首页轮播图
│   ├── people/             # 团队成员照片
│   ├── research/           # 研究方向图片
│   └── ...
├── src/
│   ├── app/                # Next.js App Router 页面
│   │   ├── page.tsx       # 首页
│   │   ├── people/        # 团队页面
│   │   ├── publications/  #  publications 页面
│   │   ├── research/      # 研究页面
│   │   └── ...
│   ├── components/         # 可复用组件
│   │   ├── ui/            # 基础 UI 组件
│   │   └── motion/        # 动画组件
│   ├── data/              # 数据文件（JSON/TS）
│   │   ├── people.ts      # 团队成员数据
│   │   ├── publications.ts #  publications 数据
│   │   └── ...
│   ├── lib/               # 工具函数
│   └── content/           # 内容数据
├── scripts/               # 构建脚本
│   └── optimize-images.mjs # 图片优化脚本
├── package.json
├── next.config.ts         # Next.js 配置
├── tailwind.config.*      # Tailwind 配置
└── tsconfig.json          # TypeScript 配置
```

### 2.1 目录说明

| 目录 | 用途 |
|------|------|
| `src/app/` | 页面路由，每个子目录对应一个页面 |
| `src/components/` | 可复用的 React 组件 |
| `src/data/` | 网站内容数据（修改内容主要在这里） |
| `src/lib/` | 工具函数和辅助逻辑 |
| `public/` | 静态文件（图片、图标等） |

---

## 三、日常开发流程

### 3.1 修改网站内容

大部分内容修改只需修改 `src/data/` 目录下的数据文件：

#### 添加/修改团队成员
编辑 `src/data/people.ts`：

```typescript
export const people: Person[] = [
  {
    name: "姓名",
    role: "角色",
    photo: "/people/photo.jpg",  // 照片放在 public/people/
    email: "email@example.com",
    bio: "个人简介",
    // ... 其他字段
  },
];
```

#### 添加/修改 publications
编辑 `src/data/publications.ts`：

```typescript
export const publications: Publication[] = [
  {
    title: "论文标题",
    authors: ["作者1", "作者2"],
    venue: "会议/期刊名称",
    year: 2024,
    // ... 其他字段
  },
];
```

#### 添加/修改新闻
编辑 `src/data/news.ts`：

```typescript
export const news: NewsItem[] = [
  {
    date: "2024-01-01",
    title: "新闻标题",
    content: "新闻内容",
  },
];
```

### 3.2 添加新页面

1. 在 `src/app/` 下创建新目录，例如 `src/app/new-page/`
2. 创建 `page.tsx` 文件：
```tsx
import Container from "@/components/Container";

export default function NewPage() {
  return (
    <Container>
      <h1>新页面标题</h1>
      <p>页面内容</p>
    </Container>
  );
}
```
3. 在导航栏中添加链接（修改相关组件）

### 3.3 添加新组件

1. 在 `src/components/` 下创建组件文件，例如 `MyComponent.tsx`
2. 编写组件代码
3. 在页面中导入使用：

```tsx
import MyComponent from "@/components/MyComponent";

export default function Page() {
  return (
    <MyComponent prop1="value" />
  );
}
```

### 3.4 添加图片资源

1. 将图片放入 `public/` 目录下对应的文件夹
2. 在数据文件中引用路径（相对于 public 目录）

---

## 四、构建与部署

### 4.1 本地构建

```bash
# 构建生产版本（包含图片优化）
npm run build

# 仅构建 Next.js（不优化图片）
next build
```

构建产物将生成在 `out/` 目录。

### 4.2 部署到 GitHub Pages

项目已配置 GitHub Actions，自动部署到 GitHub Pages。

**手动部署步骤：**

1. 在 GitHub 仓库设置中启用 GitHub Pages
2. Source 选择 "GitHub Actions"
3. 推送代码到 main 分支，Action 会自动构建并部署

**手动构建部署：**

```bash
# 设置 GitHub Actions 环境变量
set GITHUB_ACTIONS=1

# 构建
npm run build

# 将 out 目录内容推送到 gh-pages 分支
```

---

## 五、常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本（包含图片优化） |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | 代码检查 |
| `npm run images:optimize` | 仅优化图片 |

---

## 六、开发规范

### 6.1 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 配置的代码风格
- 组件使用函数式组件 + Hooks

### 6.2 图片规范

- 团队成员照片：放入 `public/people/` 目录
- 首页轮播图：放入 `public/home/` 目录
- 研究图片：放入 `public/research/` 对应子目录
- 使用 WebP 格式以获得更好的加载性能

### 6.3 数据格式

- 数据文件使用 TypeScript 导出
- 保持数据类型一致，参考现有数据格式

---

## 七、常见问题

### Q1: 开发服务器启动失败？

确保已安装所有依赖：
```bash
npm install
```

### Q2: 图片不显示？

检查图片路径是否正确，确保图片放在 `public/` 目录下。

### Q3: 构建失败？

1. 检查是否有 TypeScript 错误：`npx tsc --noEmit`
2. 检查是否有 ESLint 错误：`npm run lint`
3. 查看错误信息进行修复

### Q4: 如何添加新语言？

当前版本为单语言（中文），如需多语言支持需要进行额外配置。

---

## 八、相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Framer Motion 文档](https://www.framer.com/motion/)

---

## 九、移动App开发

### 9.1 项目概述

本实验室同时提供配套的移动App，支持 iOS、Android 和鸿蒙系统。

**技术栈：**
- **框架**: React Native + Expo SDK 52
- **语言**: TypeScript
- **导航**: React Navigation (Bottom Tabs)

### 9.2 项目位置

移动App源代码位于 `lab-app/` 目录。

### 9.3 快速开始

```bash
# 进入App目录
cd lab-app

# 安装依赖
npm install

# 启动开发服务器
npm start

# 运行Android
npm run android

# 运行iOS
npm run ios
```

### 9.4 App功能模块

| 模块 | 功能说明 |
|------|----------|
| 首页 | 实验室简介、研究方向概览、新闻轮播 |
| 团队成员 | PI、教师、学生列表，个人简介、联系方式 |
| publications | 论文列表（按年份分类）、DOI链接 |
| 研究方向 | 5大研究方向详情（图文展示） |
| 新闻动态 | 实验室最新通知和活动 |

### 9.5 数据同步

App 数据文件位于 `lab-app/src/data/` 目录，与网站数据保持同步更新。

---

*本文档由实验室维护，如有问题请联系网站管理员。*
