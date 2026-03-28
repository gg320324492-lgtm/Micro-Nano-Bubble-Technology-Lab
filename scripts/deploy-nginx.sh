#!/bin/bash

################################################################################
# Nginx 项目部署脚本
# 用法: ./deploy-nginx.sh <项目名> <域名> <端口> <类型>
# 示例: ./deploy-nginx.sh mnb-lab mnb-lab.cn 3001 static
#       ./deploy-nginx.sh miniapp mnb-lims.cn 3000 proxy
################################################################################

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 函数：打印错误
error() {
    echo -e "${RED}✗ 错误: $1${NC}" >&2
    exit 1
}

# 函数：打印成功
success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# 函数：打印警告
warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# 函数：打印信息
info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# 验证参数
if [ $# -lt 4 ]; then
    echo "用法: $0 <项目名> <域名> <端口> <类型>"
    echo ""
    echo "参数说明:"
    echo "  项目名: 项目的简短名称 (如: mnb-lab, miniapp)"
    echo "  域名: 项目的主域名 (如: mnb-lab.cn, mnb-lims.cn)"
    echo "  端口: 应用运行的端口 (如: 3000, 3001)"
    echo "  类型: static (静态文件) 或 proxy (反向代理)"
    echo ""
    echo "示例:"
    echo "  $0 mnb-lab mnb-lab.cn 3001 static"
    echo "  $0 miniapp mnb-lims.cn 3000 proxy"
    exit 1
fi

PROJECT_NAME=$1
DOMAIN=$2
PORT=$3
TYPE=$4

# 验证参数值
if [[ ! "$PROJECT_NAME" =~ ^[a-z0-9-]+$ ]]; then
    error "项目名只能包含小写字母、数字和连字符"
fi

if [[ ! "$DOMAIN" =~ ^[a-z0-9.-]+\.[a-z]{2,}$ ]]; then
    error "域名格式不正确"
fi

if [[ ! "$PORT" =~ ^[0-9]+$ ]] || [ "$PORT" -lt 1024 ] || [ "$PORT" -gt 65535 ]; then
    error "端口号必须在 1024-65535 之间"
fi

if [[ "$TYPE" != "static" && "$TYPE" != "proxy" ]]; then
    error "类型必须是 'static' 或 'proxy'"
fi

# 检查是否为 root
if [ "$EUID" -ne 0 ]; then
    error "此脚本需要 root 权限，请使用 sudo 运行"
fi

# 检查 Nginx 是否安装
if ! command -v nginx &> /dev/null; then
    error "Nginx 未安装，请先安装 Nginx"
fi

# 检查配置文件是否已存在
CONFIG_FILE="/etc/nginx/sites-available/$PROJECT_NAME"
if [ -f "$CONFIG_FILE" ]; then
    warning "配置文件已存在: $CONFIG_FILE"
    read -p "是否覆盖? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        error "操作已取消"
    fi
fi

# 检查是否有重复的域名
info "检查是否有重复的域名配置..."
if grep -r "server_name.*$DOMAIN" /etc/nginx/sites-available/ /etc/nginx/conf.d/ 2>/dev/null | grep -v "$CONFIG_FILE"; then
    warning "发现其他配置中已有此域名，请检查是否冲突"
    read -p "是否继续? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        error "操作已取消"
    fi
fi

# 检查 SSL 证书
info "检查 SSL 证书..."
CERT_PATH="/etc/letsencrypt/live/$DOMAIN"
if [ ! -d "$CERT_PATH" ]; then
    warning "未找到 SSL 证书: $CERT_PATH"
    warning "请先运行: certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN"
    read -p "是否继续（仅使用 HTTP）? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        error "操作已取消"
    fi
    USE_SSL=false
else
    success "找到 SSL 证书"
    USE_SSL=true
fi

# 创建 Nginx 配置
info "创建 Nginx 配置文件..."

if [ "$USE_SSL" = true ]; then
    if [ "$TYPE" = "static" ]; then
        cat > "$CONFIG_FILE" <<'NGINX_CONFIG'
server {
    listen 80;
    listen [::]:80;
    server_name DOMAIN www.DOMAIN;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name DOMAIN www.DOMAIN;

    ssl_certificate /etc/letsencrypt/live/DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/DOMAIN/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # 安全头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    root /opt/PROJECT_NAME/out;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
NGINX_CONFIG
    else
        cat > "$CONFIG_FILE" <<'NGINX_CONFIG'
server {
    listen 80;
    listen [::]:80;
    server_name DOMAIN www.DOMAIN;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name DOMAIN www.DOMAIN;

    ssl_certificate /etc/letsencrypt/live/DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/DOMAIN/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # 安全头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:PORT;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection "upgrade";
        proxy_set_header Upgrade $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
NGINX_CONFIG
    fi
else
    if [ "$TYPE" = "static" ]; then
        cat > "$CONFIG_FILE" <<'NGINX_CONFIG'
server {
    listen 80;
    listen [::]:80;
    server_name DOMAIN www.DOMAIN;

    root /opt/PROJECT_NAME/out;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
NGINX_CONFIG
    else
        cat > "$CONFIG_FILE" <<'NGINX_CONFIG'
server {
    listen 80;
    listen [::]:80;
    server_name DOMAIN www.DOMAIN;

    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:PORT;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection "upgrade";
        proxy_set_header Upgrade $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
NGINX_CONFIG
    fi
fi

# 替换占位符
sed -i "s|DOMAIN|$DOMAIN|g" "$CONFIG_FILE"
sed -i "s|PROJECT_NAME|$PROJECT_NAME|g" "$CONFIG_FILE"
sed -i "s|PORT|$PORT|g" "$CONFIG_FILE"

success "配置文件已创建: $CONFIG_FILE"

# 启用配置
info "启用 Nginx 配置..."
ln -sf "$CONFIG_FILE" "/etc/nginx/sites-enabled/$PROJECT_NAME"
success "配置已启用"

# 测试配置
info "测试 Nginx 配置..."
if nginx -t 2>&1 | grep -q "successful"; then
    success "Nginx 配置测试通过"
else
    error "Nginx 配置测试失败，请检查配置文件"
fi

# 重启 Nginx
info "重启 Nginx..."
systemctl restart nginx
success "Nginx 已重启"

# 验证
info "验证配置..."
if systemctl is-active --quiet nginx; then
    success "Nginx 运行正常"
else
    error "Nginx 启动失败"
fi

# 显示总结
echo ""
echo "================================"
echo "✓ 部署完成！"
echo "================================"
echo ""
echo "项目信息:"
echo "  项目名: $PROJECT_NAME"
echo "  域名: $DOMAIN"
echo "  端口: $PORT"
echo "  类型: $TYPE"
echo "  配置文件: $CONFIG_FILE"
echo ""
echo "后续步骤:"
if [ "$TYPE" = "proxy" ]; then
    echo "  1. 确保应用运行在 http://127.0.0.1:$PORT"
    echo "  2. 访问 https://$DOMAIN 测试"
else
    echo "  1. 确保项目构建输出在 /opt/$PROJECT_NAME/out"
    echo "  2. 访问 https://$DOMAIN 测试"
fi
echo ""
echo "常用命令:"
echo "  查看配置: cat $CONFIG_FILE"
echo "  编辑配置: nano $CONFIG_FILE"
echo "  测试配置: nginx -t"
echo "  重启 Nginx: systemctl restart nginx"
echo "  查看日志: tail -f /var/log/nginx/error.log"
echo ""
