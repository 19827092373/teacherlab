# 教师实验室 (Teacher Lab)

> 专为教师打造的免费在线工具平台 - 让教学更高效

## 🌟 项目简介

教师实验室是一个现代化的 React 单页应用，展示三大核心教学工具。采用最新的前端技术栈，提供流畅的用户体验和丰富的交互动画。

### ✨ 核心特性

- 🎨 **专业蓝紫色系UI** - 避免常见的AI紫色，采用专业、沉稳的配色方案
- 🎭 **丰富的微交互动画** - Magnetic按钮、Glow发光、Staggered交错动画等
- 📱 **完全响应式** - 支持手机、平板、桌面等各种设备
- 🚀 **高性能** - 代码分割、懒加载、优化的构建产物
- 🔧 **易于扩展** - 数据驱动设计，添加新工具只需修改配置文件
- ♿ **无障碍设计** - 支持键盘导航，符合WCAG标准

## 🛠️ 技术栈

- **框架**: React 19.2.0 + TypeScript 5.9.3
- **构建工具**: Vite 7.2.4
- **样式方案**: Tailwind CSS 4.1.18
- **动画库**: Framer Motion 12.25.0
- **图标库**: Lucide React 0.562.0
- **代码规范**: ESLint + Prettier

## 📦 安装依赖

```bash
npm install
```

## 🚀 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

## 📦 生产构建

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 🏗️ 项目结构

```
src/
├── components/          # React组件
│   ├── layout/          # 布局组件（Header、Footer、Container）
│   ├── stats/           # 统计组件（StatCard、StatsOverview）
│   ├── tools/           # 工具卡片组件（ToolCard及其子组件）
│   ├── ui/              # 基础UI组件（Button、Badge、Card、Tooltip）
│   ├── effects/          # 特效组件（LoadingBar、FloatingShapes）
│   └── animations/       # 动画组件（StaggeredGrid、MagneticButton、GlowEffect）
│
├── data/               # 数据配置
│   ├── tools.ts         # 工具数据（支持轻松添加新工具）
│   ├── stats.ts         # 统计数据
│   └── contact.ts       # 联系方式
│
├── hooks/              # 自定义Hooks
│   ├── useCountUp.ts    # 数字滚动动画
│   └── useScrollReveal.ts # 滚动显示动画
│
├── types/              # TypeScript类型定义
│   ├── tool.ts          # 工具类型
│   └── stats.ts         # 统计类型
│
├── utils/              # 工具函数
│   ├── cn.ts            # className合并
│   ├── analytics.ts      # 统计埋点
│   └── animations.ts    # 动画配置
│
├── styles/             # 样式文件
│   └── index.css        # 全局样式
│
├── App.tsx             # 主应用组件
└── main.tsx            # 入口文件
```

## ➕ 添加新工具

在 `src/data/tools.ts` 中添加新工具对象即可：

```typescript
{
  id: 'new-tool',
  title: '新工具名称',
  description: '工具描述...',
  link: 'https://new-tool.teacherlab.cn',
  icon: 'IconName',  // Lucide图标名称
  gradient: 'from-blue-500 to-purple-500',
  tags: ['标签1', '标签2'],
  userCount: '100+',
  isNew: true,
  scenario: { title: '💡 使用场景', content: '...' },
  features: [
    { icon: 'IconName1', text: '功能描述1' },
    { icon: 'IconName2', text: '功能描述2' },
  ],
  steps: [
    { number: 1, content: '步骤1' },
    { number: 2, content: '步骤2' },
  ],
},
```

## 📝 可用命令

| 命令 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | 运行ESLint检查 |
| `npm run lint:fix` | 自动修复ESLint问题 |
| `npm run format` | 格式化代码 |
| `npm run format:check` | 检查代码格式 |

## 🎨 设计系统

### 配色方案

**主色（深海蓝）**: #3B82F6
**辅助色（藏青紫）**: #8B5CF6
**强调色（活力橙）**: #F97316

### 工具渐变

- PDF转PPT: `from-blue-600 to-indigo-600`
- 背诵管理: `from-indigo-500 to-purple-600`
- 错题统计: `from-violet-600 to-fuchsia-600`

### 动画效果

- 页面加载：淡入+上移
- 工具卡片：交错淡入上移
- 卡片悬停：阴影加深+轻微上移
- 工具图标：旋转360°+放大
- 按钮：Magnetic磁性效果
- 统计数字：从0增长到目标值

## 📄 License

MIT

## 👨‍💻 开发者

@感恩烧饼

## 🌐 网站

- **主页**: https://teacherlab.top
- **PDF转PPT**: https://ppt.teacherlab.cn
- **背诵管理**: https://recitation.teacherlab.cn
- **错题统计**: https://mistakes.teacherlab.cn


You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
