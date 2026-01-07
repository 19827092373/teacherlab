# TeacherLab.cn DNS解析配置说明

## 📍 解析记录配置

### 主域名解析

在域名服务商（如阿里云、腾讯云、GoDaddy等）的DNS解析控制台添加：

#### 1. 主域名（www可选）

```
记录类型：A
主机记录：@
记录值：你的服务器IP地址（如：47.xxx.xxx.xxx）
TTL：600（10分钟）或默认
```

**说明**：`@` 表示根域名，即 `teacherlab.cn`

#### 2. www子域名（可选）

```
记录类型：A
主机记录：www
记录值：你的服务器IP地址
TTL：600
```

**说明**：`www` 表示 `www.teacherlab.cn`，如果需要可以添加

---

### 子域名解析（3个工具）

#### 3. PDF转PPT工具

```
记录类型：A
主机记录：ppt
记录值：你的服务器IP地址
TTL：600
```

**说明**：解析到 `ppt.teacherlab.cn`

#### 4. 错题管理工具

```
记录类型：A
主机记录：mistakes
记录值：你的服务器IP地址
TTL：600
```

**说明**：解析到 `mistakes.teacherlab.cn`

#### 5. 背诵管理工具

```
记录类型：A
主机记录：recitation
记录值：你的服务器IP地址
TTL：600
```

**说明**：解析到 `recitation.teacherlab.cn`

---

## 📋 完整DNS记录列表

| 记录类型 | 主机记录 | 记录值 | 说明 |
|---------|---------|--------|------|
| A | @ | 服务器IP | 主域名 teacherlab.cn |
| A | www | 服务器IP | www.teacherlab.cn（可选） |
| A | ppt | 服务器IP | ppt.teacherlab.cn |
| A | mistakes | 服务器IP | mistakes.teacherlab.cn |
| A | recitation | 服务器IP | recitation.teacherlab.cn |

---

## ⏰ DNS解析生效时间

- **最快**：5-10分钟
- **一般**：30分钟-2小时
- **最慢**：24-48小时（很少见）

**TTL设置建议**：
- 测试阶段：600秒（10分钟），方便快速修改
- 稳定运行：3600秒（1小时）或更长

---

## ✅ 验证DNS解析

### Windows PowerShell

```powershell
# 检查主域名
nslookup teacherlab.cn

# 检查子域名
nslookup ppt.teacherlab.cn
nslookup mistakes.teacherlab.cn
nslookup recitation.teacherlab.cn
```

### Linux/Mac

```bash
# 检查主域名
dig teacherlab.cn
# 或
nslookup teacherlab.cn

# 检查子域名
dig ppt.teacherlab.cn
dig mistakes.teacherlab.cn
dig recitation.teacherlab.cn
```

### 在线工具

- https://tool.chinaz.com/dns/
- https://www.whatsmydns.net/
- https://dnschecker.org/

---

## 🚨 注意事项

### 1. 解析顺序

**正确顺序**：
1. ✅ 先在宝塔面板配置好所有网站
2. ✅ 测试可以用IP访问
3. ✅ 再配置DNS解析
4. ✅ DNS生效后测试域名访问
5. ✅ 最后申请SSL证书

**错误顺序**：
- ❌ 先配置DNS → 服务器还没准备好 → 域名无法访问

### 2. 服务器IP地址

- 确保使用**公网IP**，不是内网IP
- 如果使用云服务器，在控制台查看公网IP
- 确保服务器防火墙开放80和443端口

### 3. 多个域名指向同一IP

- 所有子域名可以指向同一个IP
- 宝塔面板会根据域名自动路由到对应网站
- 这是正常且推荐的做法

### 4. 域名备案（国内服务器）

如果使用**国内服务器**（阿里云、腾讯云等）：
- ⚠️ **必须备案**才能使用80/443端口
- 备案需要：域名实名认证 + 服务器备案
- 备案时间：通常7-20个工作日
- 未备案只能使用其他端口（如8080）

如果使用**海外服务器**（香港、美国等）：
- ✅ 无需备案
- ✅ 可以直接使用80/443端口

---

## 🔄 修改DNS解析

如果需要修改解析：

1. 登录域名服务商控制台
2. 找到DNS解析设置
3. 修改对应记录的**记录值**（IP地址）
4. 等待DNS生效（根据TTL时间）

---

## 📱 各服务商配置入口

### 阿里云
1. 登录阿里云控制台
2. **产品与服务** → **域名** → **域名解析**
3. 选择 `teacherlab.cn` 域名
4. 点击 **添加记录**

### 腾讯云
1. 登录腾讯云控制台
2. **云产品** → **域名与网站** → **DNS解析DNSPod**
3. 选择 `teacherlab.cn` 域名
4. 点击 **添加记录**

### GoDaddy
1. 登录GoDaddy账户
2. **我的产品** → **DNS**
3. 选择 `teacherlab.cn` 域名
4. 点击 **添加** → **A记录**

### 其他服务商
- 找到"DNS解析"、"域名解析"或"DNS管理"功能
- 添加A记录，填写主机记录和IP地址

---

## 🎯 配置示例（阿里云）

### 步骤1：进入解析设置
1. 登录阿里云 → 控制台
2. 产品与服务 → 域名
3. 找到 `teacherlab.cn` → 点击"解析"

### 步骤2：添加记录
点击"添加记录"，依次添加：

**记录1：主域名**
```
记录类型：A
主机记录：@
解析线路：默认
记录值：47.xxx.xxx.xxx（你的服务器IP）
TTL：600
```

**记录2：PDF转PPT**
```
记录类型：A
主机记录：ppt
解析线路：默认
记录值：47.xxx.xxx.xxx
TTL：600
```

**记录3：错题管理**
```
记录类型：A
主机记录：mistakes
解析线路：默认
记录值：47.xxx.xxx.xxx
TTL：600
```

**记录4：背诵管理**
```
记录类型：A
主机记录：recitation
解析线路：默认
记录值：47.xxx.xxx.xxx
TTL：600
```

### 步骤3：保存并等待生效
- 点击"确认"保存
- 等待5-30分钟生效
- 使用 `nslookup` 验证

---

## ✅ 配置完成检查

DNS配置完成后，检查清单：

- [ ] 所有A记录已添加
- [ ] 记录值（IP）正确
- [ ] 等待DNS生效（5-30分钟）
- [ ] 使用nslookup验证解析成功
- [ ] 浏览器可以访问域名（HTTP）
- [ ] 宝塔面板已配置对应网站
- [ ] SSL证书已申请（HTTPS）

---

配置完成后，你的网站就可以通过域名访问了！🎉

