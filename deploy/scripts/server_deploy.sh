#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/gg320324492-lgtm/Micro-Nano-Bubble-Technology-Lab.git"
APP_DIR="/opt/Micro-Nano-Bubble-Technology-Lab"
WEB_ROOT="/var/www/mnb-lab"

echo "[1/5] Prepare directories..."
sudo mkdir -p /opt
sudo mkdir -p "$WEB_ROOT"

if [ ! -d "$APP_DIR/.git" ]; then
  echo "[2/5] Clone repo..."
  sudo git clone "$REPO_URL" "$APP_DIR"
else
  echo "[2/5] Pull latest..."
  sudo git -C "$APP_DIR" pull
fi

echo "[3/5] Install deps & build (creates out/)..."
cd "$APP_DIR"
sudo npm ci
sudo npm run build

echo "[4/5] Sync out/ to web root..."
sudo rsync -av --delete "$APP_DIR/out/" "$WEB_ROOT/"

echo "[5/5] Reload nginx..."
sudo nginx -t
sudo systemctl reload nginx

echo "Done. Visit: http://www.mnb-lab.cn"
