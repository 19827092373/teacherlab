# 智能 PDF 切分工具 (Smart PDF Splitter)

这是一个基于 Streamlit 和 AI 视觉模型的智能 PDF 切分工具。它可以自动识别扫描版 PDF 的目录，并将每一节课切分成单独的 PDF 文件。

## 功能特点

- **可视化配置**: 在网页端直接输入 API Key、Base URL 和模型名称
- **智能识别**: 利用 AI 视觉模型直接"看懂"目录图片，无需复杂的 OCR
- **多模型支持**: 支持 OpenAI、Google Gemini、Anthropic Claude、智谱 AI、阿里通义千问等
- **所见即所得**: 提供 PDF 预览和交互式表格，允许人工校对 AI 的识别结果
- **一键切分**: 自动计算页码偏移，生成 ZIP 包一键下载

## 本地运行

### 1. 安装依赖

确保您的电脑上安装了 Python (3.8+)。然后运行：

```bash
pip install -r requirements.txt
```

### 2. 安装 Poppler

`pdf2image` 库依赖于 Poppler 工具。

- **Windows**: 下载 Poppler (例如从 [这里](https://github.com/oschwartz10612/poppler-windows/releases/)), 解压后将 `bin` 目录添加到系统的 PATH 环境变量中
- **Mac**: `brew install poppler`
- **Linux**: `sudo apt-get install poppler-utils`

### 3. 启动应用

```bash
streamlit run app.py
```

应用将在 `http://localhost:8501` 启动。

### 4. 使用步骤

1. 打开浏览器访问 `http://localhost:8501`
2. 在左侧侧边栏填入您的 **API Key**（选择对应的 AI 服务商）
3. 上传您的 PDF 教材
4. 根据预览图，填写目录所在的页码范围（例如 3-5 页）
5. 填写"页码偏移量"参考（例如：书上第1页是 PDF 的第 7 页）
6. 点击 **"开始 AI 识别目录"**
7. 在表格中检查识别结果，如有错误直接修改
8. 点击 **"开始切分 PDF"** 并下载结果

## 🚀 部署到阿里云服务器

详细的部署指南请查看 [DEPLOYMENT.md](DEPLOYMENT.md)

### ⭐ 推荐：GitHub Actions 自动部署

配置一次后，每次 `git push` 自动部署到服务器！

1. **配置 GitHub Secrets**（见 [.github/workflows/README.md](.github/workflows/README.md)）
2. **推送代码**：`git push origin main`
3. **自动部署完成** 🎉

代码更新指南请查看 [UPDATE.md](UPDATE.md)

### 快速部署（Docker）

```bash
# 1. 上传项目到服务器
scp -r smart-pdf-splitter root@your-server-ip:/opt/

# 2. SSH 登录服务器
ssh root@your-server-ip

# 3. 进入项目目录
cd /opt/smart-pdf-splitter

# 4. 使用 Docker Compose 部署
docker-compose up -d --build

# 5. 查看日志
docker-compose logs -f
```

访问：`http://your-server-ip:8501`

## 常见问题

- **报错 "Poppler not found"**: 请确保 Poppler 已安装并在 PATH 环境变量中
- **API 报错**: 请检查 API Key 是否有效，或者尝试更换 Base URL（如果您在国内，可能需要代理或中转地址）
- **端口被占用**: 修改 `.streamlit/config.toml` 中的端口配置，或使用 `--server.port` 参数

## 项目结构

```
smart-pdf-splitter/
├── app.py                 # Streamlit 主应用
├── core_logic.py          # 核心业务逻辑
├── requirements.txt       # Python 依赖
├── Dockerfile            # Docker 镜像构建文件
├── docker-compose.yml    # Docker Compose 配置
├── deploy.sh             # 快速部署脚本
├── update.sh             # 代码更新脚本（服务器端）
├── sync.sh               # 本地同步到服务器脚本
├── DEPLOYMENT.md         # 部署指南
├── UPDATE.md             # 更新指南
├── .github/              # GitHub Actions 配置
│   └── workflows/
│       ├── deploy.yml    # 自动部署工作流
│       └── README.md    # 工作流配置说明
├── .streamlit/           # Streamlit 配置
│   └── config.toml
└── README.md             # 本文件
```

## 技术栈

- **Web 框架**: Streamlit
- **PDF 处理**: pypdf, pdf2image
- **AI 服务**: OpenAI / Google Gemini / Anthropic Claude / 智谱 AI / 阿里通义千问
- **数据处理**: pandas
