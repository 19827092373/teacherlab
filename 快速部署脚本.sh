#!/bin/bash
# 教师实验室一键部署脚本
# 使用方法：chmod +x 快速部署脚本.sh && ./快速部署脚本.sh

set -e  # 遇到错误立即退出

echo "=========================================="
echo "   教师实验室网站部署脚本"
echo "=========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否为root用户
if [ "$EUID" -ne 0 ]; then 
    echo -e "${YELLOW}提示：建议使用sudo运行此脚本${NC}"
fi

# 1. 更新系统
echo -e "${GREEN}[1/8] 更新系统包列表...${NC}"
sudo apt update

# 2. 安装基础工具
echo -e "${GREEN}[2/8] 安装基础工具...${NC}"
sudo apt install -y curl wget git vim

# 3. 安装Node.js（如果未安装）
if ! command -v node &> /dev/null; then
    echo -e "${GREEN}[3/8] 安装Node.js 18...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
    
    # 配置npm国内镜像
    echo -e "${GREEN}配置npm国内镜像源...${NC}"
    npm config set registry https://registry.npmmirror.com
    echo "✅ Node.js版本: $(node -v)"
    echo "✅ npm版本: $(npm -v)"
else
    echo -e "${GREEN}[3/8] Node.js已安装: $(node -v)${NC}"
    # 确保使用国内镜像
    npm config set registry https://registry.npmmirror.com
fi

# 4. 安装Nginx（如果未安装）
if ! command -v nginx &> /dev/null; then
    echo -e "${GREEN}[4/8] 安装Nginx...${NC}"
    sudo apt install -y nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
    echo "✅ Nginx已安装并启动"
else
    echo -e "${GREEN}[4/8] Nginx已安装${NC}"
fi

# 5. 配置防火墙
echo -e "${GREEN}[5/8] 配置防火墙...${NC}"
sudo ufw allow 80/tcp 2>/dev/null || true
sudo ufw allow 443/tcp 2>/dev/null || true
sudo ufw allow 22/tcp 2>/dev/null || true
echo "✅ 防火墙端口已开放"

# 6. 创建网站目录
echo -e "${GREEN}[6/8] 创建网站目录...${NC}"
PROJECT_DIR="/var/www/teacherlab"
sudo mkdir -p $PROJECT_DIR
sudo chown -R $USER:$USER $PROJECT_DIR
echo "✅ 目录已创建: $PROJECT_DIR"

# 7. 提示用户上传文件
echo -e "${YELLOW}[7/8] 请上传项目文件到: $PROJECT_DIR${NC}"
echo "可以使用以下方式："
echo "  1. SCP: scp -r ./teacherlab教师实验室/* root@服务器IP:$PROJECT_DIR/"
echo "  2. Git: cd $PROJECT_DIR && git clone <你的仓库> ."
echo "  3. FTP工具: WinSCP、FileZilla等"
echo ""
read -p "文件已上传完成？(y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}请先上传文件后再运行此脚本${NC}"
    exit 1
fi

# 8. 构建项目
echo -e "${GREEN}[8/8] 构建前端项目...${NC}"
cd $PROJECT_DIR

# 构建Vue3项目
if [ -d "背诵管理统计系统" ]; then
    echo "构建Vue3项目（背诵管理统计系统）..."
    cd 背诵管理统计系统
    if [ ! -d "node_modules" ]; then
        npm install
    fi
    npm run build
    cd ..
    echo "✅ Vue3项目构建完成"
else
    echo -e "${YELLOW}⚠️  未找到Vue3项目目录${NC}"
fi

# 构建React项目
if [ -d "习题转ppt/teacher-ppt-splitter2" ]; then
    echo "构建React项目（PDF转PPT）..."
    cd 习题转ppt/teacher-ppt-splitter2
    if [ ! -d "node_modules" ]; then
        npm install
    fi
    npm run build
    cd ../../..
    echo "✅ React项目构建完成"
else
    echo -e "${YELLOW}⚠️  未找到React项目目录${NC}"
fi

# 9. 配置Nginx
echo -e "${GREEN}[9/9] 配置Nginx...${NC}"
NGINX_CONFIG="/etc/nginx/sites-available/teacherlab"

# 检查配置文件是否存在
if [ ! -f "$NGINX_CONFIG" ]; then
    echo "创建Nginx配置文件..."
    sudo tee $NGINX_CONFIG > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;
    
    root /var/www/teacherlab;
    index index.html;
    
    location = / {
        alias /var/www/teacherlab/teacherelab/index.html;
    }
    
    location /lab {
        alias /var/www/teacherlab/teacherelab;
        try_files $uri $uri/ =404;
        index index.html;
    }
    
    location /recitation {
        alias /var/www/teacherlab/背诵管理;
        try_files $uri $uri/ =404;
        index index.html;
    }
    
    location /recitation-vue {
        alias /var/www/teacherlab/背诵管理统计系统/dist;
        try_files $uri $uri/ /recitation-vue/index.html;
        index index.html;
    }
    
    location /ppt {
        alias /var/www/teacherlab/习题转ppt/teacher-ppt-splitter2/dist;
        try_files $uri $uri/ /ppt/index.html;
        index index.html;
    }
    
    location /mistakes {
        alias /var/www/teacherlab/错题统计;
        try_files $uri $uri/ =404;
        index index.html;
    }
    
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
EOF
    echo "✅ Nginx配置文件已创建"
else
    echo -e "${YELLOW}⚠️  Nginx配置文件已存在，跳过创建${NC}"
fi

# 启用配置
sudo ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/teacherlab

# 删除默认配置（可选）
if [ -f "/etc/nginx/sites-enabled/default" ]; then
    echo "删除默认Nginx配置..."
    sudo rm /etc/nginx/sites-enabled/default
fi

# 测试配置
echo "测试Nginx配置..."
if sudo nginx -t; then
    echo "✅ Nginx配置测试通过"
    sudo systemctl reload nginx
    echo "✅ Nginx已重载"
else
    echo -e "${RED}❌ Nginx配置测试失败，请检查配置文件${NC}"
    exit 1
fi

# 设置文件权限
echo "设置文件权限..."
sudo chown -R www-data:www-data $PROJECT_DIR
sudo chmod -R 755 $PROJECT_DIR

echo ""
echo "=========================================="
echo -e "${GREEN}部署完成！${NC}"
echo "=========================================="
echo ""
echo "访问地址："
echo "  - 教师实验室主站: http://你的服务器IP/lab"
echo "  - 背诵管理(旧版): http://你的服务器IP/recitation"
echo "  - 背诵管理(Vue3): http://你的服务器IP/recitation-vue"
echo "  - PDF转PPT: http://你的服务器IP/ppt"
echo "  - 错题统计: http://你的服务器IP/mistakes"
echo ""
echo "常用命令："
echo "  - 查看Nginx状态: sudo systemctl status nginx"
echo "  - 查看访问日志: sudo tail -f /var/log/nginx/access.log"
echo "  - 查看错误日志: sudo tail -f /var/log/nginx/error.log"
echo "  - 重载Nginx: sudo systemctl reload nginx"
echo ""



