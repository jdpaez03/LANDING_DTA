# Preview deployment (Linux laptop + Tailscale Funnel)

Private preview for internal review. The app runs as a systemd **user** service on the `atlas` account,
listens only on `127.0.0.1:8100`, and Tailscale Funnel publishes it over HTTPS on port **10000** (Funnel only allows 443, 8443 and 10000;
443 and 8443 are already used by ATLAS, tailnet-only) so nothing existing is touched. Every page asks for a username and password.

## One-time setup on the server

1. Passwordless SSH from the dev machine (run once, asks for the `atlas` password):
   `ssh-copy-id -i ~/.ssh/id_ed25519.pub atlas@192.168.101.145`
2. Create `~/torre-acqua/backend/.env` on the server:
   ```
   STATIC_DIR=/home/atlas/torre-acqua/frontend/dist
   DATABASE_URL=sqlite:////home/atlas/torre-acqua/backend/leads.db
   PREVIEW_USER=<usuario>
   PREVIEW_PASSWORD=<contraseña>
   CORS_ORIGINS=
   ```
   `chmod 600` it. It is never committed.
3. Keep user services running without an open session: `loginctl enable-linger atlas` (needs sudo once if not already enabled).
4. Funnel (needs Funnel allowed for this node in the Tailscale admin console):
   `tailscale funnel --bg --https=10000 http://127.0.0.1:8100`
   The preview URL is `https://atlas.tail642bf8.ts.net:10000/`.

The venv is created with `uv` (`~/.local/bin/uv`, Python 3.12): the system Python has no `ensurepip`.

## Each deploy

From the repo root on the dev machine: `bash deploy/deploy.sh`

## Turn it off

- Stop publishing: `tailscale funnel --https=10000 off`
- Stop the app: `systemctl --user disable --now torre-acqua.service`
