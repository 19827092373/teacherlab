# GitHub Actions 自动部署配置说明

## 📋 已创建的部署文件

已为以下4个项目创建了自动部署配置：

1. ✅ **主页项目** (`teacherelab/.github/workflows/deploy.yml`)
   - 类型：纯HTML项目
   - 目标路径：`/www/wwwroot/teacherlab.cn`

2. ✅ **PDF转PPT工具** (`习题转ppt/teacher-ppt-splitter2/.github/workflows/deploy.yml`)
   - 类型：React项目（需要构建）
   - 目标路径：`/www/wwwroot/ppt.teacherlab.cn`

3. ✅ **错题管理** (`错题统计/.github/workflows/deploy.yml`)
   - 类型：纯HTML项目
   - 目标路径：`/www/wwwroot/mistakes.teacherlab.cn`

4. ✅ **背诵管理统计系统** (`背诵管理统计系统/.github/workflows/deploy.yml`)
   - 类型：Vue3项目（需要构建）
   - 目标路径：`/www/wwwroot/recitation.teacherlab.cn`

---

## 🔐 GitHub Secrets 配置步骤

### 步骤1：获取SSH私钥

在本地电脑生成SSH密钥对（如果还没有）：

```bash
# 生成SSH密钥对
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 保存路径：~/.ssh/id_rsa（私钥）和 ~/.ssh/id_rsa.pub（公钥）
```

### 步骤2：将公钥添加到服务器

```bash
# 方法1：使用ssh-copy-id（推荐）
ssh-copy-id root@你的服务器IP

# 方法2：手动复制
cat ~/.ssh/id_rsa.pub | ssh root@你的服务器IP "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### 步骤3：在GitHub仓库配置Secrets

对**每个项目仓库**（如果它们是独立仓库），都需要配置：

1. 进入GitHub仓库页面
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加以下两个Secrets：

#### Secret 1: SERVER_IP
```
Name: SERVER_IP
Value: 你的阿里云服务器IP地址（如：47.xxx.xxx.xxx）
```

#### Secret 2: SERVER_SSH_KEY
```
Name: SERVER_SSH_KEY
Value: 你的SSH私钥内容（~/.ssh/id_rsa文件的完整内容）
```

**获取私钥内容：**
```bash
# Windows PowerShell
cat ~/.ssh/id_rsa

# Linux/Mac
cat ~/.ssh/id_rsa
```

**注意**：复制私钥时，要包含完整的文件内容，包括：
```
-----BEGIN OPENSSH PRIVATE KEY-----
...（密钥内容）...
-----END OPENSSH PRIVATE KEY-----
```

---

## 🚀 使用方法

### 自动部署触发条件

- **触发分支**：`main` 分支
- **触发事件**：当代码推送到 `main` 分支时自动触发

### 部署流程

#### 对于纯HTML项目（主页、错题管理）：
1. 代码推送到 `main` 分支
2. GitHub Actions 自动运行
3. 直接上传所有文件到服务器

#### 对于React/Vue项目（PDF转PPT、背诵管理）：
1. 代码推送到 `main` 分支
2. GitHub Actions 自动运行
3. 安装依赖：`npm install`
4. 构建项目：`npm run build`
5. 上传 `dist` 目录内容到服务器

---

## ✅ 验证部署

### 1. 检查GitHub Actions运行状态

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

# 检查错题管理
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

### Q1: GitHub Actions 运行失败，提示 "Permission denied"

**原因**：SSH私钥配置错误或公钥未添加到服务器

**解决**：
1. 检查 `SERVER_SSH_KEY` Secret是否正确（包含完整私钥）
2. 确认公钥已添加到服务器的 `~/.ssh/authorized_keys`
3. 测试SSH连接：`ssh root@你的服务器IP`

### Q2: 部署成功但网站无法访问

**检查**：
1. 文件是否上传成功：`ls -la /www/wwwroot/xxx.teacherlab.cn`
2. 文件权限是否正确：`chmod -R 755 /www/wwwroot/xxx.teacherlab.cn`
3. Nginx配置是否正确：宝塔面板 → 网站 → 设置 → 网站目录
4. Nginx是否运行：`systemctl status nginx`

### Q3: React/Vue项目部署后显示404

**原因**：Nginx未配置SPA路由支持

**解决**：在宝塔面板中，网站 → 设置 → 配置文件，添加：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Q4: 构建失败（npm install 报错）

**原因**：Node.js版本不匹配或网络问题

**解决**：
1. 检查 `package.json` 中的Node版本要求
2. 在GitHub Actions中使用正确的Node版本
3. 如果使用国内服务器，可以配置npm镜像：

```yaml
- name: Install dependencies
  run: |
    npm config set registry https://registry.npmmirror.com
    npm install
```

### Q5: 部署后文件不完整

**检查**：
1. `.gitignore` 是否排除了必要文件
2. `strip_components` 参数是否正确
3. 查看GitHub Actions日志，确认上传的文件列表

---

## 📝 部署文件说明

### 纯HTML项目配置

```yaml
source: "."                    # 上传当前目录所有文件
strip_components: 0            # 不去除目录层级
```

### React/Vue项目配置

```yaml
source: "./dist/*"             # 只上传dist目录内容
strip_components: 1            # 去除dist这一层，直接上传内容
```

**为什么使用 `strip_components: 1`？**
- 上传前：`dist/index.html`, `dist/assets/...`
- 上传后：`/www/wwwroot/xxx.teacherlab.cn/index.html`, `/www/wwwroot/xxx.teacherlab.cn/assets/...`
- 这样可以直接访问，不需要 `/dist/` 路径

---

## 🎯 快速检查清单

### 首次配置
- [ ] SSH密钥对已生成
- [ ] 公钥已添加到服务器
- [ ] GitHub Secrets已配置（SERVER_IP 和 SERVER_SSH_KEY）
- [ ] 测试SSH连接成功：`ssh root@服务器IP`

### 每次部署
- [ ] 代码已推送到 `main` 分支
- [ ] GitHub Actions运行成功（绿色✅）
- [ ] 服务器文件已更新
- [ ] 网站可以正常访问

---

## 💡 优化建议

### 1. 使用缓存加速构建

对于React/Vue项目，可以添加npm缓存：

```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### 2. 添加部署通知

可以集成企业微信、钉钉等通知，部署完成后发送消息。

### 3. 使用环境变量

如果不同环境需要不同配置，可以使用GitHub Environments。

---

配置完成后，每次推送代码到 `main` 分支，GitHub Actions 就会自动部署到服务器！🚀


