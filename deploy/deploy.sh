#!/usr/bin/env bash
# Build the site here and ship it to the Linux preview server.
# Usage (from the repo root, Git Bash):  bash deploy/deploy.sh
# Requires passwordless SSH (key) to $HOST. Never touches anything outside ~/torre-acqua
# and the torre-acqua user service.
set -euo pipefail

HOST="${DEPLOY_HOST:-atlas@192.168.101.145}"
APP_DIR="torre-acqua"   # relative to the remote home

echo "==> Building frontend"
(cd frontend && npm run build --silent)

echo "==> Shipping backend + frontend/dist to $HOST:~/$APP_DIR"
tar czf - \
  --exclude='backend/.venv' --exclude='backend/leads.db' --exclude='backend/.env' --exclude='__pycache__' \
  backend frontend/dist deploy/torre-acqua.service \
  | ssh "$HOST" "mkdir -p ~/$APP_DIR && tar xzf - -C ~/$APP_DIR"

echo "==> Installing dependencies and (re)starting the service"
ssh "$HOST" bash -s <<'REMOTE'
set -euo pipefail
cd ~/torre-acqua/backend
# uv (in ~/.local/bin) creates the venv with the same Python as development; the system
# Python has no ensurepip, so plain `python3 -m venv` is not an option without root
UV="$HOME/.local/bin/uv"
[ -d .venv ] || "$UV" venv --quiet --python 3.12 .venv
"$UV" pip install --quiet --python .venv/bin/python -r requirements.txt
if [ ! -f .env ]; then
  echo "!! ~/torre-acqua/backend/.env is missing. Create it first (see deploy/README.md)." >&2
  exit 1
fi
mkdir -p ~/.config/systemd/user
cp ~/torre-acqua/deploy/torre-acqua.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now torre-acqua.service
systemctl --user restart torre-acqua.service
# The laptop needs a few seconds to boot uvicorn
for i in $(seq 1 20); do
  curl -fsS http://127.0.0.1:8100/api/health >/dev/null 2>&1 && { echo "  service healthy"; break; }
  sleep 1
  [ "$i" = 20 ] && { echo "!! service did not answer; see: journalctl --user -u torre-acqua -n 50" >&2; exit 1; }
done
REMOTE

echo "==> Done"
