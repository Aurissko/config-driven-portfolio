# 🚀 Config-Driven Portfolio Template

A sleek, highly customizable, and fully dynamic portfolio template designed specifically for Network, DevOps, and Platform Engineers. 

This template is **100% config-driven**. You do not need to know React or touch any frontend code to build a beautiful, interactive portfolio. Simply edit one JSON file, and the application does the rest.

**👀 Live Demo:** [https://aurimas.sh](https://aurimas.sh) (Built using this template)

## ✨ Features

- **Zero Code Required:** Populate your entire portfolio by editing a single `config.json` file.
- **Bulletproof Architecture:** The app features an anti-corruption layer. If you leave a JSON array empty or accidentally delete a section, the app will gracefully adapt instead of crashing.
- **Dynamic Filtering:** Click on any skill or employer to instantly filter and display relevant projects.
- **Terminal-Style UI:** Designed with an aesthetic that resonates with systems and infrastructure engineers.
- **Responsive Design:** Fully mobile-friendly and optimized for all screen sizes.
- **Dark/Light Mode:** Includes a built-in theme toggle.
- **Skill Radar Chart:** Automatically visualizes your proficiency levels based on your JSON data.

## 🛠️ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Aurissko/config-driven-portfolio.git
cd config-driven-portfolio
```

### 2. Install Dependencies
Ensure you have Node.js installed, then run:
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Your portfolio will be live at `http://localhost:3000` (or whichever port Vite/React assigns).

## ⚙️ How to Customize (`config.json`)

All data for the portfolio is stored in `src/data/config.json`. Open this file and replace the placeholder data with your own. 

Here is a breakdown of the key sections:

### `profileData` & `contactConfig`
Set your name, headline, current focus, and social links. These populate the main Hero and Contact sections.

### `skillsConfig`
Define your core competencies. The keys (e.g., `categoryOne`) are automatically formatted into readable titles (e.g., "Category One") on the frontend.
```json
"skillsConfig": {
  "automationAndIac": ["Python", "Golang", "Terraform", "Ansible"],
  "cloudNetworking": ["AWS", "TGW", "BGP"]
}
```

### `experienceData`
List your work history. **Crucial Step:** Pay attention to the `id` field you assign to each job (e.g., `"id": "company-a"`).

### `projects`
List the projects you want to feature. 

**Linking Projects to Experience:**
If you want a "View Featured Projects" button to appear under a specific job in your Experience section, make sure the `employerId` in your project matches the `id` in your experience data.

```json
// In experienceData:
{
  "id": "google-inc",
  "company": "Google",
  "role": "Network Engineer"
}

// In projects:
{
  "id": "global-routing-project",
  "employerId": "google-inc", // <-- This links the project to the job!
  "title": "BGP Optimization"
}
```

### `skillsRadarData`
Update the `subject` and `score` (0-100) to populate the animated radar chart in the Competencies section.

### `references`
Add peer feedback or testimonials. If you don't have any, simply leave the array empty (`"references": []`), and the section will gracefully remain blank.

## 🚀 Deployment

Because this is a standard React application (likely powered by Vite or Create React App), you can easily deploy it for free using services like:
- Vercel
- Netlify
- GitHub Pages

Simply connect your GitHub repository to one of these platforms, and they will automatically build and host your portfolio every time you push to the `main` branch.