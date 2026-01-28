import { Tool } from '@/types'

/**
 * 工具列表数据
 *
 * ⚠️ 添加/删除工具时，需要同步更新以下位置：
 *
 * 1. src/data/stats.ts - 更新"实用工具"数量（number: 6）
 * 2. index.html (Meta 描述) - 搜索 "五大/六大核心工具"
 * 3. index.html (keywords) - 搜索 "教师工具, 教学辅助..."
 * 4. index.html (Open Graph) - 搜索 "og:description"
 * 5. index.html (WebSite 结构化数据) - 搜索 "四大/五大核心工具"
 * 6. index.html (ItemList 结构化数据) - 搜索 "itemListElement"
 * 7. index.html (ItemList items) - 在 itemListElement 数组中添加/删除工具项
 * 8. PROJECT_STRUCTURE.md - 更新项目结构文档中的工具数量
 *
 * 快速定位命令：
 * - 在 index.html 中搜索关键词："核心工具" 或 "itemListElement"
 * - 在 stats.ts 中搜索："实用工具"
 */

export const tools: Tool[] = [
  {
    id: 'pdf-to-ppt',
    title: 'PDF 习题转 PPT 工具',
    description:
      '从 PDF 习题册中快速提取题目制作成 PPT，节省大量复制粘贴时间。支持精准裁剪、批量处理，让课件制作效率提升 10 倍！',
    link: 'https://ppt.teacherlab.cn',
    icon: 'FileText',
    tags: ['文档处理', '课件制作', '效率工具'],
    userCount: '230+',
    isNew: true,
    isRecommended: true,
    gradient: 'from-neon-green to-neon-blue',
    borderColor: 'border-emerald-200',
    hoverShadow: '0 0 40px rgba(0, 255, 65, 0.3)',
    scenario: {
      title: '💡 使用场景',
      content:
        '讲评试卷时，从 PDF 习题册中快速提取题目制作成 PPT，节省大量复制粘贴时间。支持精准裁剪、批量处理，让课件制作效率提升 10 倍！',
    },
    features: [
      { icon: 'Upload', text: '上传 PDF 文件并实时预览' },
      { icon: 'Scissors', text: '鼠标框选精准裁剪区域' },
      { icon: 'Layout', text: '幻灯片自由排序和编辑' },
      { icon: 'RefreshCw', text: '多张图片合并到一页' },
      { icon: 'Download', text: '一键导出标准 PPTX 格式' },
      { icon: 'Palette', text: '现代化界面操作简单' },
    ],
    steps: [
      { number: 1, content: '上传包含习题的 PDF 文件' },
      { number: 2, content: '在预览页面用鼠标框选需要的题目' },
      { number: 3, content: '调整幻灯片顺序，合并或删除' },
      { number: 4, content: '点击"导出PPT"下载课件' },
    ],
  },
  {
    id: 'recitation',
    title: '背诵任务管理系统',
    description:
      '管理多个班级的背诵任务（语文、英语、历史等），实时跟踪每位学生的完成情况。批量导入名单、一键标记完成、可视化进度条，让背诵检查井然有序！',
    link: 'https://recitation.teacherlab.cn',
    icon: 'BookOpen',
    tags: ['任务管理', '多班级', '全学科适用'],
    userCount: '350+',
    isHot: true,
    gradient: 'from-neon-blue to-neon-purple',
    borderColor: 'border-teal-200',
    hoverShadow: '0 0 40px rgba(0, 255, 255, 0.3)',
    scenario: {
      title: '💡 使用场景',
      content:
        '管理多个班级的背诵任务（语文、英语、历史等），实时跟踪每位学生的完成情况。批量导入名单、一键标记完成、可视化进度条，让背诵检查井然有序！',
    },
    features: [
      { icon: 'School', text: '多班级独立管理和切换' },
      { icon: 'FileEdit', text: '任务创建、复制和编辑' },
      { icon: 'Users', text: '批量导入学生名单' },
      { icon: 'CheckCircle', text: '一键切换完成状态' },
      { icon: 'BarChart', text: '实时统计和进度条' },
      { icon: 'Save', text: '导出图片/Excel/CSV' },
      { icon: 'Search', text: '学生快速搜索定位' },
      { icon: 'Smartphone', text: '手机端完美适配' },
    ],
    steps: [
      { number: 1, content: '创建班级并批量导入学生名单' },
      { number: 2, content: '添加背诵任务（如"Unit 1-3"）' },
      { number: 3, content: '学生完成后点击卡片标记完成' },
      { number: 4, content: '导出数据留存或分享家长' },
    ],
  },
  {
    id: 'mistakes',
    title: '错题统计与诊断系统',
    description:
      '提供两种统计模式：课堂匿名极速版可快速识别高频错题；实名学情诊断版可记录每位学生的具体错题，生成多维度诊断报告。',
    link: 'https://mistakes.teacherlab.cn',
    icon: 'Flame',
    tags: ['实时统计', '学情分析', '数据可视化'],
    userCount: '280+',
    isHot: true,
    gradient: 'from-neon-purple to-neon-pink',
    borderColor: 'border-cyan-200',
    hoverShadow: '0 0 40px rgba(123, 97, 255, 0.3)',
    variants: [
      {
        id: 'mistakes-lite',
        title: '匿名极速版',
        description: '无需导入名单，学生直接点击题号，秒出全班错题热力图。适用于课堂讲评即时反馈。',
        link: 'https://mistakes.teacherlab.cn',
        icon: 'Zap',
        color: 'orange'
      },
      {
        id: 'mistakes-pro',
        title: '实名诊断版',
        description: '导入学生名单，精准记录个人错题。自动生成班级诊断报表及学生个人画像。',
        link: 'https://mistakes.teacherlab.cn/pro',
        icon: 'Activity',
        color: 'red'
      }
    ],
    scenario: {
      title: '💡 使用场景',
      content:
        '课堂教学中，老师需要快速了解学生的答题情况。匿名版适合随堂练习的快速反馈；实名版则适合单元测试、课后作业的深度分析，帮助精准定位薄弱环节。',
    },
    features: [
      { icon: 'Dices', text: '智能随机抽样系统' },
      { icon: 'ClipboardList', text: '支持批量学生名单导入' },
      { icon: 'Hash', text: '动态自适应题号矩阵' },
      { icon: 'Flame', text: '错题热度可视化 (Heatmap)' },
      { icon: 'TrendingUp', text: '学情诊断报告自动生成' },
      { icon: 'UserCircle', text: '学生个人错题画像分析' },
      { icon: 'Camera', text: '报告图片/CSV 快捷导出' },
      { icon: 'Database', text: '数据本地持久化存储' },
    ],
    steps: [
      { number: 1, content: '选择合适的统计模式 (匿名/实名)' },
      { number: 2, content: '配置题目数量及抽样比例' },
      { number: 3, content: '学生点击错题，系统实时分析' },
      { number: 4, content: '查看诊断报告，导出讲评资料' },
    ],
  },

  {
    id: 'grade-analysis',
    title: '学生成绩分析系统',
    description:
      '导入Excel成绩表，智能生成多维度分析报告。班级整体分析、学生个人画像、可视化图表、一键导出Excel/PDF报告，让成绩分析专业又高效！',
    link: 'https://data.teacherlab.cn',
    icon: 'TrendingUp',
    tags: ['成绩分析', '数据可视化', '报告生成'],
    userCount: '150+',
    isNew: true,
    gradient: 'from-neon-pink to-neon-orange',
    borderColor: 'border-rose-200',
    hoverShadow: '0 0 40px rgba(255, 20, 147, 0.3)',
    scenario: {
      title: '💡 使用场景',
      content:
        '考试结束后，导入Excel成绩表，系统自动分析班级整体情况、识别优秀/后进学生、生成每位学生的个人成绩画像。支持雷达图、柱状图等可视化展示，一键导出专业分析报告！',
    },
    features: [
      { icon: 'FileSpreadsheet', text: '支持Excel文件导入' },
      { icon: 'Settings', text: '智能字段映射识别' },
      { icon: 'BarChart', text: '班级多维度统计分析' },
      { icon: 'Target', text: '优秀/后进学生识别' },
      { icon: 'Globe', text: '学生个人雷达图' },
      { icon: 'TrendingUp', text: '成绩趋势对比分析' },
      { icon: 'Download', text: '导出Excel/PDF报告' },
      { icon: 'Save', text: '数据本地缓存保存' },
    ],
    steps: [
      { number: 1, content: '上传Excel成绩表文件' },
      { number: 2, content: '配置字段映射和评分标准' },
      { number: 3, content: '查看班级整体分析报告' },
      { number: 4, content: '浏览学生个人成绩详情' },
      { number: 5, content: '导出分析报告和图表' },
    ],
  },
  {
    id: 'pdf-splitter',
    title: '智能 PDF 切分工具',
    description:
      '基于 AI 视觉模型的智能 PDF 切分工具。自动识别扫描版 PDF 的目录，将每一节课智能切分成单独的 PDF 文件。支持 OpenAI、Claude、智谱等多种 AI 模型，提供可视化预览和人工校对功能。',
    link: 'https://pdf.teacherlab.cn',
    icon: 'Scissors',
    tags: ['PDF处理', 'AI识别', '智能切分'],
    userCount: '50+',
    isBeta: true,
    gradient: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-200',
    hoverShadow: '0 0 40px rgba(245, 158, 11, 0.3)',
    scenario: {
      title: '💡 使用场景',
      content:
        '当您有一整本扫描版 PDF 教材需要按章节分发给学生时，只需上传 PDF，AI 会自动识别目录结构并按课程章节切分成独立的 PDF 文件。支持人工校对识别结果，一键下载 ZIP 包，让教材分发变得轻松高效！',
    },
    features: [
      { icon: 'Eye', text: '可视化配置 AI 参数' },
      { icon: 'Brain', text: 'AI 视觉模型智能识别' },
      { icon: 'Layout', text: 'PDF 预览和目录定位' },
      { icon: 'FileEdit', text: '交互式表格校对结果' },
      { icon: 'Calculator', text: '自动计算页码偏移' },
      { icon: 'Package', text: 'ZIP 打包一键下载' },
      { icon: 'Cpu', text: '多 AI 模型支持' },
      { icon: 'CheckCircle', text: '所见即所得操作' },
    ],
    steps: [
      { number: 1, content: '配置 AI 服务商和 API Key' },
      { number: 2, content: '上传扫描版 PDF 教材文件' },
      { number: 3, content: '设置目录页码范围和偏移量' },
      { number: 4, content: 'AI 识别目录并校对结果' },
      { number: 5, content: '一键切分并下载 ZIP 包' },
    ],
  },
  {
    id: 'commenter',
    title: 'AI 学生评语助手',
    description:
      '通过 AI 技术为教师快速生成个性化、有温度的期末评语。支持批量处理、特征标签系统、Excel 导入导出，让评语写作效率提升 10 倍！',
    link: 'https://recitation.teacherlab.cn/commenter',
    icon: 'MessageSquare',
    tags: ['评语生成', 'AI 驱动', '批量处理'],
    userCount: '100+',
    isNew: true,
    isRecommended: true,
    gradient: 'from-violet-500 to-purple-600',
    borderColor: 'border-violet-200',
    hoverShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
    scenario: {
      title: '💡 使用场景',
      content:
        '每学期末需要为全班学生撰写评语时，只需导入学生名单，设置特征标签，AI 即可批量生成个性化评语。评语自然流畅、富有感情，融入诗词名言，拒绝套路，让评语写作从数小时缩短至数分钟！',
    },
    features: [
      { icon: 'Users', text: '批量导入学生名单' },
      { icon: 'Tags', text: '特征标签系统' },
      { icon: 'Sparkles', text: 'AI 批量生成评语' },
      { icon: 'FileEdit', text: '评语手动编辑优化' },
      { icon: 'Download', text: '导出 Excel 评语表' },
      { icon: 'Settings', text: '自定义评语模板' },
      { icon: 'Shield', text: '数据本地安全存储' },
      { icon: 'RotateCcw', text: '支持重新生成' },
    ],
    steps: [
      { number: 1, content: '配置 AI 模型 API（DeepSeek/OpenAI）' },
      { number: 2, content: '导入学生名单（文本/Excel）' },
      { number: 3, content: '设置学生特征标签和成绩档位' },
      { number: 4, content: '一键批量生成个性化评语' },
      { number: 5, content: '编辑优化并导出 Excel' },
    ],
  },
]

