# SSH认证失败问题排查指南

## 错误信息
```
ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey], no supported methods remain
```

这个错误表示SSH私钥认证失败。

## 解决步骤

### 1. 检查GitHub Secrets配置

确保在GitHub仓库中配置了以下Secrets：

**仓库地址**：https://github.com/19827092373/teacherlab

**配置路径**：Settings → Secrets and variables → Actions

#### Secret 1: SERVER_SSH_KEY
- **名称**：必须完全匹配 `SERVER_SSH_KEY`
- **内容**：SSH私钥的完整内容

**如何获取私钥：**

**Windows PowerShell:**
```powershell
cat ~/.ssh/id_rsa
```

**如果私钥不存在，需要生成：**
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

**重要**：复制私钥时，必须包含完整的格式：
```
-----BEGIN OPENSSH PRIVATE KEY-----
（密钥内容）
-----END OPENSSH PRIVATE KEY-----
```

#### Secret 2: SERVER_IP
- **名称**：必须完全匹配 `SERVER_IP`
- **内容**：你的阿里云服务器IP地址（如：`47.xxx.xxx.xxx`）

---

### 2. 将公钥添加到服务器

**方法1：使用ssh-copy-id（推荐）**
```bash
ssh-copy-id root@你的服务器IP
```

**方法2：手动添加**
```bash
# 1. 复制公钥内容
cat ~/.ssh/id_rsa.pub

# 2. SSH登录服务器
ssh root@你的服务器IP

# 3. 在服务器上执行
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "你的公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

### 3. 测试SSH连接

在本地测试SSH连接是否正常：
```bash
ssh root@你的服务器IP
```

如果能够成功连接，说明密钥配置正确。

---

### 4. 检查服务器SSH配置

SSH登录服务器后，检查以下配置：

```bash
# 检查authorized_keys文件权限
ls -la ~/.ssh/authorized_keys
# 应该是 -rw------- (600)

# 检查.ssh目录权限
ls -la ~/.ssh
# 应该是 drwx------ (700)

# 如果权限不对，修复：
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

---

### 5. 检查SSH服务配置

在服务器上检查SSH配置：
```bash
# 编辑SSH配置
sudo vi /etc/ssh/sshd_config

# 确保以下配置正确：
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication no  # 如果只使用密钥认证

# 重启SSH服务
sudo systemctl restart sshd
```

---

### 6. 常见问题

#### 问题1：私钥格式错误
- **症状**：GitHub Actions报错"unable to authenticate"
- **解决**：确保私钥是完整的，包括BEGIN和END行

#### 问题2：公钥未添加到服务器
- **症状**：本地可以SSH连接，但GitHub Actions失败
- **解决**：使用 `ssh-copy-id` 重新添加公钥

#### 问题3：服务器权限问题
- **症状**：公钥已添加但认证失败
- **解决**：检查 `.ssh` 目录和 `authorized_keys` 文件权限

#### 问题4：Secrets名称不匹配
- **症状**：GitHub Actions读取不到密钥
- **解决**：确保Secrets名称完全匹配 `SERVER_SSH_KEY` 和 `SERVER_IP`

---

### 7. 验证步骤

完成以上配置后：

1. **测试本地SSH连接**
   ```bash
   ssh root@你的服务器IP
   ```

2. **检查GitHub Secrets**
   - 进入仓库 Settings → Secrets and variables → Actions
   - 确认 `SERVER_SSH_KEY` 和 `SERVER_IP` 都存在

3. **重新运行GitHub Actions**
   - 推送一个小的更改触发部署
   - 查看Actions日志确认是否成功

---

## 快速修复脚本

如果以上步骤都正确，可以尝试这个快速修复：

```bash
# 在服务器上执行
mkdir -p ~/.ssh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys 2>/dev/null || true

# 确保SSH服务允许密钥认证
sudo sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config
sudo sed -i 's/PubkeyAuthentication no/PubkeyAuthentication yes/' /etc/ssh/sshd_config
sudo systemctl restart sshd
```

---

## 如果仍然失败

1. **检查GitHub Actions日志**
   - 查看完整的错误信息
   - 确认Secrets是否正确读取

2. **使用详细模式测试**
   ```bash
   ssh -v root@你的服务器IP
   ```
   查看详细的SSH连接过程

3. **检查服务器日志**
   ```bash
   # 在服务器上查看SSH日志
   sudo tail -f /var/log/auth.log
   # 或
   sudo journalctl -u sshd -f
   ```

---

配置完成后，GitHub Actions应该可以成功部署了！

