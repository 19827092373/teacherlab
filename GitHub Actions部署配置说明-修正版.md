# GitHub Actions 自动部署配置说明（修正版）

## 📋 4个独立仓库的部署文件

已为以下4个独立的GitHub仓库创建了正确的自动部署配置：

### 1. ✅ 背诵管理（纯HTML项目）
**文件位置**：`背诵管理/.github/workflows/deploy.yml`
- **GitHub仓库**：独立的"背诵管理"仓库
- **类型**：纯HTML项目（无需构建）
- **部署路径**：`/www/wwwroot/recitation.teacherlab.cn`
- **上传内容**：当前目录所有文件

### 2. ✅ 错题统计（纯HTML项目）
**文件位置**：`错题统计/.github/workflows/deploy.yml`
- **GitHub仓库**：独立的"错题统计"仓库
- **类型**：纯HTML项目（无需构建）
- **部署路径**：`/www/wwwroot/mistakes.teacherlab.cn`
- **上传内容**：当前目录所有文件

### 3. ✅ teacherelab（主页，纯HTML项目）
**文件位置**：`teacherelab/.github/workflows/deploy.yml`
- **GitHub仓库**：独立的"teacherlab"仓库
- **类型**：纯HTML项目（无需构建）
- **部署路径**：`/www/wwwroot/teacherlab.cn`
- **上传内容**：当前目录所有文件

### 4. ✅ PDF转PPT（React项目）
**文件位置**：`习题转ppt/teacher-ppt-splitter2/.github/workflows/deploy.yml`
- **GitHub仓库**：独立的"PDF转PPT"仓库
- **类型**：React项目（需要构建）
- **部署路径**：`/www/wwwroot/ppt.teacherlab.cn`
- **构建步骤**：npm install → npm run build → 上传 dist 目录

---

## 🔐 每个仓库需要配置的GitHub Secrets

**重要**：每个独立的GitHub仓库都需要单独配置以下Secrets：

### Secret 1: SERVER_IP
```
Name: SERVER_IP
Value: 你的阿里云服务器IP地址（如：47.xxx.xxx.xxx）
```

### Secret 2: SERVER_SSH_KEY
```
Name: SERVER_SSH_KEY
Value: 你的SSH私钥内容（~/.ssh/id_rsa文件的完整内容）
```

**配置步骤**（对每个仓库重复）：
1. 进入GitHub仓库页面
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加上述两个Secrets

---

## 📁 仓库与文件夹对应关系

| GitHub仓库 | 本地文件夹 | 部署路径 | 类型 |
|-----------|-----------|---------|------|
| 背诵管理 | `背诵管理/` | `/www/wwwroot/recitation.teacherlab.cn` | 纯HTML |
| 错题统计 | `错题统计/` | `/www/wwwroot/mistakes.teacherlab.cn` | 纯HTML |
| teacherlab | `teacherelab/` | `/www/wwwroot/teacherlab.cn` | 纯HTML |
| PDF转PPT | `习题转ppt/teacher-ppt-splitter2/` | `/www/wwwroot/ppt.teacherlab.cn` | React |

---

## 🚀 使用方法

### 自动部署触发条件

- **触发分支**：`main` 分支
- **触发事件**：当代码推送到 `main` 分支时自动触发

### 部署流程

#### 对于纯HTML项目（背诵管理、错题统计、主页）：
1. 代码推送到对应仓库的 `main` 分支
2. GitHub Actions 自动运行
3. 直接上传所有文件到服务器对应路径

#### 对于React项目（PDF转PPT）：
1. 代码推送到对应仓库的 `main` 分支
2. GitHub Actions 自动运行
3. 安装依赖：`npm install`
4. 构建项目：`npm run build`
5. 上传 `dist` 目录内容到服务器

---

## ✅ 验证部署

### 1. 检查GitHub Actions运行状态

对每个仓库：
1. 进入GitHub仓库
2. 点击 **Actions** 标签
3. 查看最新的工作流运行状态
4. 绿色✅表示成功，红色❌表示失败

### 2. 检查服务器文件

SSH登录服务器检查：

```bash
# 检查主页
ls -la /www/wwwroot/teacherlab.cn

# 检查PDF转PPT
ls -la /www/wwwroot/ppt.teacherlab.cn

# 检查错题统计
ls -la /www/wwwroot/mistakes.teacherlab.cn

# 检查背诵管理
ls -la /www/wwwroot/recitation.teacherlab.cn
```

### 3. 访问网站

部署成功后，访问：
- https://teacherlab.cn
- https://ppt.teacherlab.cn
- https://mistakes.teacherlab.cn
- https://recitation.teacherlab.cn

---

## 🔧 常见问题

### Q1: 部署路径不对怎么办？

如果某个项目的部署路径需要修改，编辑对应的 `.github/workflows/deploy.yml` 文件，修改 `target` 参数：

```yaml
target: "/www/wwwroot/你的路径"
```

### Q2: GitHub Actions 运行失败，提示 "Permission denied"

**解决**：
1. 检查 `SERVER_SSH_KEY` Secret是否正确（包含完整私钥）
2. 确认公钥已添加到服务器的 `~/.ssh/authorized_keys`
3. 测试SSH连接：`ssh root@你的服务器IP`

### Q3: React项目部署后显示404

**解决**：在宝塔面板中，网站 → 设置 → 配置文件，添加：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## 📝 部署文件清单

确保以下文件已创建：

- [x] `背诵管理/.github/workflows/deploy.yml`
- [x] `错题统计/.github/workflows/deploy.yml`
- [x] `teacherelab/.github/workflows/deploy.yml`
- [x] `习题转ppt/teacher-ppt-splitter2/.github/workflows/deploy.yml`

---

## 🎯 下一步操作

1. **将部署文件推送到各自的GitHub仓库**
   - 每个仓库需要单独推送对应的 `.github/workflows/deploy.yml` 文件

2. **在每个仓库配置GitHub Secrets**
   - SERVER_IP
   - SERVER_SSH_KEY

3. **测试部署**
   - 推送代码到 `main` 分支
   - 查看GitHub Actions运行状态
   - 验证网站是否更新

---

配置完成后，每个仓库的代码推送到 `main` 分支时，都会自动部署到对应的服务器路径！🚀

