# Namira Web App

Namira is a lightweight, modern web interface built with **SvelteKit** to display and filter VPN configurations (such as `vmess`, `vless`, `trojan`, and `ss`) and provide users with a **dynamic subscription link**.

The core parsing and testing logic is handled by the backend project [NamiraCore](https://github.com/NaMiraNet/namira-core), while this repository contains the frontend Progressive Web App (PWA) interface.

---

## 🌟 Features

- 🌐 Displays tested VPN configurations from a remote API
- 🔗 Generates a personalized and filterable subscription link
- 🎛️ Supports filtering by protocol, country, latency, and more
- 📱 Fully installable **PWA** — works seamlessly on mobile and desktop
- ⚡ Built with SvelteKit for speed and simplicity
- 🐳 Easy to deploy using Docker

---

## 🔗 Subscription Link Parameters

Users can customize their subscription link using query parameters:

| Parameter   | Type     | Description                                                                  |
| ----------- | -------- | ---------------------------------------------------------------------------- |
| `protocols` | `string` | Comma-separated list of allowed protocols (`vmess`, `vless`, `trojan`, `ss`) |
| `countries` | `string` | Comma-separated list of allowed country codes (e.g., `ir,us,de`)             |
| `sort`      | `flag`   | Sort by delay in descending order                                            |
| `limit`     | `number` | Maximum number of configurations to return (up to 10000)                     |

Example:

```
https://namira-web.example.com/api/subscription?protocols=vmess,ss&countries=ir,de&sort&limit=50
```

## 🐳 Self-Hosting with Docker

### ✅ Requirements

- Docker installed
- A backend like [NamiraCore](https://github.com/NaMiraNet/namira-core) serving the config file

### 🖼 Prebuilt Image

You can pull and run the prebuilt image:

```bash
docker pull xerodl/namira-web

docker run -d \
  -p 4500:80 \
  -e API_URL=https://your.backend.url/results.txt \
  -e SECRET_KEY=YOUR_SECRET_KEY \
  xerodl:namira-web
```

### 🔨 Build Locally

```bash
git clone https://github.com/NamiraNet/namira-web.git
cd namira-web

docker build -t namira-web .
docker run -d \
  -p 80:80 \
  -e API_URL=https://your.backend.url/results.txt \
  -e SECRET_KEY=YOUR_SECRET_KEY \
  namira-web
```

## ⚙️ Environment Variables

| Variable     | Required | Description                                      |
| ------------ | -------- | ------------------------------------------------ |
| `API_URL`    | ✅       | Remote URL to fetch VPN test results (plaintext) |
| `SECRET_KEY` | ✅       | Must match the backend's encryption key          |

# 📝 LICENSE

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). See the [LICENSE](https://github.com/NaMiraNet/namira-web/LICENSE) file for more details.
