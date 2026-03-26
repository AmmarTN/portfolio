# Deployment Plan

This repo is configured to deploy as a static Astro site on your Linux server using Docker Compose for the app container and your existing host Nginx for the public domain `ammaross.duckdns.org`.

## Current deployment shape

- Astro stays `output: "static"` in [`astro.config.mjs`](/Users/ahmed/Astro-portfolio/astro.config.mjs).
- [`Dockerfile`](/Users/ahmed/Astro-portfolio/Dockerfile) uses a multi-stage build:
  - build stage: installs dependencies and runs `npm run build`
  - runtime stage: copies `dist/` into an Nginx image
- [`docker-compose.yml`](/Users/ahmed/Astro-portfolio/docker-compose.yml) runs one `portfolio` service and binds it only to `127.0.0.1:8080`.
- [`nginx.container.conf`](/Users/ahmed/Astro-portfolio/nginx.container.conf) serves the generated Astro files inside the container.
- [`nginx.host.conf.example`](/Users/ahmed/Astro-portfolio/nginx.host.conf.example) is the host Nginx reverse-proxy example for `ammaross.duckdns.org`.

## Deployment model

- Host: your Linux server
- Public domain: `ammaross.duckdns.org`
- Public web server: your existing host Nginx
- App runtime: one local Docker container serving the static Astro build
- Reverse proxy target: `http://127.0.0.1:8080`

Because `ammaross.duckdns.org` is a DuckDNS hostname, the record must keep pointing to your server public IP. If the IP changes, update DuckDNS first.

## Files involved

- [`Dockerfile`](/Users/ahmed/Astro-portfolio/Dockerfile)
- [`docker-compose.yml`](/Users/ahmed/Astro-portfolio/docker-compose.yml)
- [`nginx.container.conf`](/Users/ahmed/Astro-portfolio/nginx.container.conf)
- [`nginx.host.conf.example`](/Users/ahmed/Astro-portfolio/nginx.host.conf.example)
- [`.dockerignore`](/Users/ahmed/Astro-portfolio/.dockerignore)

## Local validation flow

Run the containerized site locally:

```bash
docker compose up --build
```

Then open `http://127.0.0.1:8080`.

Useful checks:

```bash
npm run build
docker compose config
docker compose ps
```

## Linux server prerequisites

1. Confirm that `ammaross.duckdns.org` resolves to your server public IP.
2. Install Docker Engine and Docker Compose v2 on the server.
3. Make sure host Nginx is installed and running.
4. Open inbound `80/tcp` and `443/tcp` on the server firewall and router/provider firewall.
5. Create a deployment directory on the server and place the repo there, or pull the repo there.

If you use UFW:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload
```

## First deployment

From the project directory on the Linux server:

```bash
docker compose up -d --build
```

Confirm the container is up:

```bash
docker compose ps
docker compose logs -f portfolio
```

At this point the app should be reachable locally at `http://127.0.0.1:8080`.

## Host Nginx setup

Use [`nginx.host.conf.example`](/Users/ahmed/Astro-portfolio/nginx.host.conf.example) as the basis for the site config on the host server.

Recommended path:

```bash
sudo cp nginx.host.conf.example /etc/nginx/sites-available/ammaross.duckdns.org
sudo ln -s /etc/nginx/sites-available/ammaross.duckdns.org /etc/nginx/sites-enabled/ammaross.duckdns.org
```

Then test and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

The host Nginx config proxies requests to the local container on `127.0.0.1:8080`.

## HTTPS

If Nginx and TLS are already configured on your server, keep using your existing certificate flow.

If not, the usual path is Certbot on the host:

```bash
sudo certbot --nginx -d ammaross.duckdns.org
```

That is expected to write certificates under `/etc/letsencrypt/live/ammaross.duckdns.org/`.

## Ongoing deploys

### Option 1: build directly on the server

1. Pull the latest code.
2. Rebuild and restart:

```bash
docker compose up -d --build
```

### Option 2: publish an image first

1. Build and tag the image.
2. Push it to your registry.
3. Update `IMAGE_NAME` and `IMAGE_TAG` if needed.
4. Run:

```bash
docker compose pull
docker compose up -d
```

## Rollback

### If you build on the server

1. Check out the previous git commit or tag.
2. Re-run:

```bash
docker compose up -d --build
```

### If you deploy from a registry

1. Set `IMAGE_TAG` back to the previous known-good tag.
2. Run:

```bash
docker compose pull
docker compose up -d
```

## Concrete first-run checklist

1. Confirm `ammaross.duckdns.org` points to the Linux server.
2. Open ports `80` and `443`.
3. Start the portfolio container:

```bash
docker compose up -d --build
```

4. Install the host Nginx site config based on [`nginx.host.conf.example`](/Users/ahmed/Astro-portfolio/nginx.host.conf.example).
5. Run:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

6. If TLS is not already configured, run:

```bash
sudo certbot --nginx -d ammaross.duckdns.org
```

7. Open `https://ammaross.duckdns.org`.

## Recommended next step

Add a GitHub Actions workflow later that:

- runs `npm run build`
- builds and pushes the production image
- optionally SSHes into the server and runs `docker compose pull && docker compose up -d`

That is the cleanest next improvement, but it is not required for first deployment.
