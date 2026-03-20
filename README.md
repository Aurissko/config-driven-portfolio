# 🚀 Config-Driven Professional Portfolio

This is a modern, 100% configuration-driven portfolio application built with React, Vite, and Cloudflare (Pages, Functions, and D1 Database). 

You do not need to know React or touch any frontend code to build a beautiful, interactive portfolio. Simply edit one JSON file, and the application dynamically generates your profile, experience, projects, and a secure peer-recommendation system.

## ✨ Key Features
- **Zero Code Required:** Populate your entire portfolio by editing `src/data/config.json`.
- **Dynamic Filtering:** Click on any skill or employer to instantly filter and display relevant projects.
- **LinkedIn Authentication:** Allows peers to log in securely via LinkedIn and leave testimonials.
- **Serverless Database:** Uses Cloudflare D1 (SQLite at the edge) to store and retrieve recommendations.
- **Secure Admin Dashboard:** Manage and approve references directly from a protected `/admin` route using LinkedIn SSO and cryptographic signatures (no passwords needed!).
- **Terminal-Style UI:** Designed with an aesthetic that resonates with systems, DevOps, and software engineers.
- **Dark/Light Mode:** Built-in theme toggling that respects system preferences natively.

## 🛠️ Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, React Router v7, Recharts, Lucide Icons
- **Backend:** Cloudflare Pages Functions (Serverless Edge Workers)
- **Database:** Cloudflare D1 (Serverless SQLite)
- **Security:** Strict CSRF and Origin validation

## 📂 Project Structure
- `/src/data/config.json` - The single source of truth for all your portfolio content.
- `/src/components/` - React components divided cleanly into layouts, sections, and admin features.
- `/functions/api/` - Serverless backend API routes mapped automatically by Cloudflare.
- `/schema.sql` - The database schema for the Cloudflare D1 table initialization.

---

## 💻 1. Local Development Guide

Follow these steps to run the portfolio and database locally on your machine.

### Prerequisites
- Node.js (v18 or higher)
- Cloudflare Wrangler CLI (`npm install -g wrangler`)

### Step 1: Clone & Install
```bash
git clone <your-repo-url>
cd config-driven-portfolio
npm install
```

### Step 2: Configure the Local Database (Cloudflare D1)
This project uses Cloudflare D1 for the references section. You need to create a local database and apply the schema.

```bash
# 1. Create a local D1 database
npx wrangler d1 create portfolio-db

# 2. IMPORTANT: Wrangler will output a `database_id`. 
# Open `wrangler.toml` and replace `<PASTE_YOUR_DATABASE_ID_HERE>` with this ID.

# 3. Apply the database schema locally
npx wrangler d1 execute portfolio-db --local --file=./schema.sql
```

### Step 3: Setup Environment Variables
To use LinkedIn Authentication and the Admin Dashboard, create a file named `.dev.vars` in the root directory:

```env
LINKEDIN_CLIENT_ID="your_linkedin_client_id"
LINKEDIN_CLIENT_SECRET="your_linkedin_client_secret"
SESSION_SECRET="a_random_secure_string_for_cryptography"
```
*(To get LinkedIn credentials, create an app in the LinkedIn Developer Portal, request "Sign In with LinkedIn using OpenID Connect", and set your callback URL to `http://localhost:8788/api/linkedin/callback`)*.

### Step 4: Start the Dev Server
```bash
npm run dev
```
Your portfolio will be live at `http://localhost:8788`.

---

## ⚙️ 2. How to Customize (`config.json`)

All data for the portfolio is stored in `src/data/config.json`. Open this file and replace the placeholder data with your own.

- **`requireReferenceApproval`**: Set to `true` if you want to manually approve comments before they go live.
- **`adminEmails`**: Add your LinkedIn email address here (e.g., `["your.email@example.com"]`). Logging in with this email grants you access to the `/admin` dashboard.
- **`profileData` & `contactConfig`**: Your name, headline, and social links.
- **`skillsConfig`**: Your core competencies.
- **`experienceData` & `projects`**: Your work history. Link projects to specific jobs by matching the `employerId` in a project to the `id` of an experience block.

---

## ☁️ 3. Production Deployment (Cloudflare Pages)

Because this application relies on Cloudflare's edge network (Pages Functions and D1 Database), it is specifically designed to be deployed to **Cloudflare Pages**.

### Step 1: Create the Production Database
Log in to your Cloudflare Dashboard, go to **Workers & Pages > D1**, and click **Create Database**. Name it `portfolio-db`. 

Then, apply your schema to the production database using your terminal:

```bash
npx wrangler d1 execute portfolio-db --remote --file=./schema.sql
```

### Step 2: Connect & Deploy via Cloudflare Pages
1. Push your code to a GitHub repository.
2. In the Cloudflare Dashboard, go to **Workers & Pages > Create > Pages > Connect to Git**.
3. Select your repository.
4. Configure the **Build Settings**:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**. *(Note: The first build might fail or lack API functionality because we haven't bound the database yet. That is normal!)*

### Step 3: Configure Bindings & Secrets
Once the project is created, navigate to the project's **Settings** tab in Cloudflare Pages.

1. **Database Binding:**
   - Go to **Settings > Functions > D1 database bindings**.
   - Add a binding: 
     - **Variable name:** `DB`
     - **D1 database:** Select `portfolio-db`
2. **Environment Variables:**
   - Go to **Settings > Environment variables**.
   - Add your production secrets (ensure you encrypt them):
     - `LINKEDIN_CLIENT_ID`
     - `LINKEDIN_CLIENT_SECRET`
3. **LinkedIn Redirect URI:**
   - Go back to your LinkedIn Developer Portal and add your production callback URL (e.g., `https://yourdomain.com/api/linkedin/callback`).

### Step 4: Redeploy
Go to the **Deployments** tab and click **Retry deployment**. Your app is now live, secure, and fully functional!

---

## 🐳 4. Docker Containerization (Local Emulation)

Since the backend relies entirely on Cloudflare Workers and D1, deploying it behind a standard Nginx Docker container for production will break the API routes. 

However, if you want to containerize the **local development environment** (running Wrangler/Miniflare inside Docker) for testing or self-hosting, follow these steps:

### Step 1: Create a `Dockerfile`
Create a `Dockerfile` in the root of your project:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the Wrangler dev port
EXPOSE 8788

# Start the Wrangler server bound to all network interfaces
CMD ["npm", "run", "dev", "--", "--ip", "0.0.0.0"]
```

### Step 2: Build and Run
```bash
# Build the Docker image
docker build -t config-portfolio .

# Run the container (passing your environment variables)
docker run -p 8788:8788 \
  -e LINKEDIN_CLIENT_ID="your_linkedin_client_id" \
  -e LINKEDIN_CLIENT_SECRET="your_linkedin_client_secret" \
  -e ADMIN_SECRET="your_admin_secret" \
  config-portfolio
```
*(Note: Data stored in the local D1 database inside the container will be lost when the container is stopped unless you map a Docker volume to the `.wrangler/state` directory).*