# 🐾 Recycled Pomeranians

**A Progressive Web App (PWA) for the Recycled Pomeranians dog rescue NGO.**

Live at: **[https://gauravsharma2.github.io/RecyclePom/](https://gauravsharma2.github.io/RecyclePom/)**

---

## Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started (Run Locally)](#getting-started-run-locally)
- [How to Access the App](#how-to-access-the-app)
  - [On a Website (Browser)](#on-a-website-browser)
  - [On Android](#on-android)
  - [On iPhone / iPad](#on-iphone--ipad)
  - [Publish to App Store / Play Store](#publish-to-app-store--play-store)
- [How to Update Content](#how-to-update-content)
  - [Updating Dogs, Events, Team & Stories](#updating-dogs-events-team--stories)
  - [Updating Page Text & Layout](#updating-page-text--layout)
  - [Updating Theme Colors & Fonts](#updating-theme-colors--fonts)
  - [Updating Social Links](#updating-social-links)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Next Steps & Future Improvements](#next-steps--future-improvements)
- [Social & Contact](#social--contact)
- [License](#license)

---

## About the Project

Recycled Pomeranians is a non-profit organization dedicated to rescuing, rehabilitating, and rehoming Pomeranians in need. This app serves as their digital home — helping potential adopters browse available dogs, learn about fostering, donate, discover upcoming events, and connect with the team.

**Key Features:**
- Browse adoptable Pomeranians with photos, personality tags, and medical info
- Search & filter dogs by name, gender, and availability
- Foster application form
- Donation page with one-time and monthly options
- Events calendar (adoption days, workshops, fundraisers)
- About page with team bios and success stories
- Contact form with email, phone, and social links
- **Fully installable as a mobile app** (Progressive Web App)
- **Works offline** with service worker caching
- **Responsive** — looks great on phone, tablet, and desktop

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI framework (component-based) |
| **Vite** | 6.4 | Build tool & dev server (fast HMR) |
| **React Router** | 7.1 | Client-side routing (7 pages) |
| **React Icons** | 5.4 | Icon library (Font Awesome, etc.) |
| **PWA (manual)** | — | Service worker + manifest for installability & offline |
| **GitHub Actions** | — | CI/CD auto-deploy to GitHub Pages |
| **CSS** | — | Custom design system (CSS variables, no framework) |
| **Google Fonts** | — | Quicksand (body) + Playfair Display (headings) |

---

## Project Structure

```
RecyclePom/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions — auto-deploy on push
├── public/
│   ├── manifest.json           # PWA manifest (app name, icons, theme)
│   ├── sw.js                   # Service worker (offline caching)
│   ├── paw-favicon.svg         # Browser tab favicon
│   └── pwa-icon-512.svg        # PWA install icon (512x512)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .css       # Top navigation bar
│   │   ├── Footer.jsx / .css       # Site footer with social links
│   │   ├── DogCard.jsx / .css      # Reusable dog profile card
│   │   ├── ScrollToTop.jsx         # Auto-scroll on route change
│   │   ├── InstallPrompt.jsx / .css # "Add to Home Screen" banner
│   │   └── OfflineBanner.jsx / .css # Offline notification banner
│   ├── pages/
│   │   ├── Home.jsx / .css         # Landing page (hero, stats, featured dogs)
│   │   ├── Adopt.jsx / .css        # Browse & filter adoptable dogs
│   │   ├── Foster.jsx / .css       # Foster info & application form
│   │   ├── Donate.jsx / .css       # Donation options & impact stats
│   │   ├── About.jsx / .css        # Mission, team, success stories
│   │   ├── Events.jsx / .css       # Upcoming events calendar
│   │   └── Contact.jsx / .css      # Contact info & message form
│   ├── App.jsx                 # Main app — router & layout
│   ├── main.jsx                # Entry point — renders React + registers SW
│   ├── index.css               # Global styles & design system (CSS variables)
│   └── data.js                 # ⭐ ALL content data (dogs, events, team, stories)
├── index.html                  # HTML shell (meta tags, PWA config)
├── vite.config.js              # Vite config (base path for GitHub Pages)
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

---

## Getting Started (Run Locally)

### Prerequisites

- **Node.js** 18+ (recommended: 22)
- **npm** 9+

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/gauravsharma2/RecyclePom.git
cd RecyclePom

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will open at `http://localhost:5173/RecyclePom/`.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. To preview the production build:

```bash
npm run preview
```

---

## How to Access the App

### On a Website (Browser)

Visit **[https://gauravsharma2.github.io/RecyclePom/](https://gauravsharma2.github.io/RecyclePom/)** in any modern browser (Chrome, Firefox, Safari, Edge). It works on desktop and mobile browsers.

### On Android

1. Open the app URL in **Chrome** on your Android device
2. You'll see an **"Install App"** banner at the bottom of the screen (or tap the 3-dot menu → "Add to Home screen")
3. Tap **Install**
4. The app icon appears on your home screen — it opens full-screen like a native app
5. It also works offline after the first visit!

### On iPhone / iPad

1. Open the app URL in **Safari** on your iPhone/iPad
2. Tap the **Share** button (square with arrow at the bottom of Safari)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **Add**
5. The app icon appears on your home screen — opens without Safari's address bar

> **Note:** iOS does not show PWA install banners automatically. The share menu is the only way to install on iPhone. The app will still work offline and feel like a native app once installed.

### Publish to App Store / Play Store

To wrap this PWA as a native app for the stores:

1. Go to **[PWABuilder.com](https://www.pwabuilder.com/)**
2. Enter the app URL: `https://gauravsharma2.github.io/RecyclePom/`
3. PWABuilder will analyze the PWA and generate:
   - **Android APK/AAB** — Submit to Google Play Store
   - **iOS IPA** — Submit to Apple App Store (requires Apple Developer account, $99/yr)
   - **Windows MSIX** — Submit to Microsoft Store
4. Follow PWABuilder's guides to complete the store submission

---

## How to Update Content

### Updating Dogs, Events, Team & Stories

All the app's content lives in a **single file**: `src/data.js`

Open this file, and you'll find these sections:

#### 🐕 Dogs (`dogs` array)

Each dog is an object with these fields:

```js
{
  id: 7,                        // Unique number (increment from the last dog)
  name: 'Fluffy',               // Dog's name
  age: '2 years',               // Age as text
  gender: 'Female',             // 'Male' or 'Female'
  weight: '6 lbs',              // Weight as text
  status: 'available',          // 'available', 'pending', or 'adopted'
  description: 'A sweet girl...', // Bio paragraph
  personality: ['Playful', 'Sweet'], // Array of trait tags
  image: 'https://...',         // Photo URL (use Unsplash or upload your own)
  medicalNotes: 'Spayed...',    // Medical history
}
```

**To add a new dog:** Copy an existing dog object, paste it at the end of the `dogs` array, update all the fields, and give it the next `id` number.

**To remove a dog:** Delete the entire object (from `{` to `},`) for that dog.

**To mark a dog as adopted:** Change `status: 'available'` to `status: 'adopted'`.

#### 📖 Success Stories (`successStories` array)

```js
{
  id: 4,                        // Unique number
  dogName: 'Buddy',             // Name of the dog
  family: 'The Smith Family',   // Adopter name
  story: 'Buddy was found...',  // The story text
  image: 'https://...',         // Photo URL
}
```

#### 📅 Events (`events` array)

```js
{
  id: 5,                        // Unique number
  title: 'Spring Pom Meetup',   // Event name
  date: 'June 10, 2026',       // Date as text
  time: '10:00 AM - 2:00 PM',  // Time range
  location: 'City Park, TX',   // Venue
  description: 'Join us...',   // Description
  type: 'adoption',            // 'adoption', 'workshop', or 'fundraiser'
}
```

#### 📊 Stats (`stats` array)

```js
{ value: '500+', label: 'Dogs Rescued' },
```

#### 👥 Team Members (`teamMembers` array)

```js
{
  name: 'Emily Carter',
  role: 'Founder & Director',
  bio: 'Emily founded...',
  image: 'https://...',
}
```

#### After editing `data.js`:

1. Save the file
2. If running locally (`npm run dev`), changes appear instantly (hot reload)
3. Push to GitHub → the site auto-deploys in ~2 minutes

### Updating Page Text & Layout

Each page has its own file in `src/pages/`:

| Page | File | What's there |
|---|---|---|
| Home | `src/pages/Home.jsx` | Hero section, stats, how-it-works, featured dogs, success stories, CTA |
| Adopt | `src/pages/Adopt.jsx` | Search bar, filters, dog cards grid, adoption process steps |
| Foster | `src/pages/Foster.jsx` | Benefits section, foster application form, FAQ |
| Donate | `src/pages/Donate.jsx` | Donation amounts, one-time/monthly toggle, impact section |
| About | `src/pages/About.jsx` | Mission statement, team bios, success stories, social links |
| Events | `src/pages/Events.jsx` | Event cards with type badges and details |
| Contact | `src/pages/Contact.jsx` | Contact info (email, phone, address), message form |

Open the `.jsx` file for any page and edit the text directly. The text is written as HTML-like JSX, for example:

```jsx
<h1>Give a Pom a Second Chance</h1>
<p>Every Pomeranian deserves a loving home.</p>
```

Just change the text between the tags.

### Updating Theme Colors & Fonts

The entire color palette is defined in `src/index.css` using CSS variables:

```css
:root {
  --color-primary: #d4577b;       /* Pink — main brand color */
  --color-primary-dark: #b8456a;  /* Darker pink for hover states */
  --color-primary-light: #f0c4d3; /* Light pink for backgrounds */
  --color-secondary: #7b5ea7;     /* Purple — accent color */
  --color-bg: #fef6f8;            /* Page background (very light pink) */
  --color-surface: #ffffff;       /* Card/section background */
  --color-text: #2d2d2d;          /* Body text */
  --color-text-light: #666666;    /* Secondary text */
}
```

Change any of these hex values to update the entire app's color scheme at once.

**Fonts** are loaded from Google Fonts in `index.html`:
- **Quicksand** — used for body text
- **Playfair Display** — used for headings

To change fonts, update the Google Fonts link in `index.html` and the `font-family` values in `src/index.css`.

### Updating Social Links

Social media links appear in the **Footer** and **About** page:

- **Footer:** `src/components/Footer.jsx` — look for the Facebook, Instagram, and website URLs
- **About:** `src/pages/About.jsx` — look for the social links section

Search for `facebook.com`, `instagram.com`, or `recycledpomeranians.com` in those files and replace with the correct URLs.

---

## Deployment (GitHub Pages)

This project auto-deploys to GitHub Pages whenever you push to the `main` branch.

### How it works:

1. Push code to `main` branch
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers automatically
3. It runs `npm install` → `npm run build`
4. Uploads the `dist/` folder to GitHub Pages
5. Site is live in ~1-2 minutes

### Manual deployment:

If you want to deploy to a different hosting service:

```bash
npm run build
# Upload the contents of the 'dist/' folder to your hosting provider
```

Works with: Netlify, Vercel, Cloudflare Pages, Amazon S3, or any static hosting.

---

## Next Steps & Future Improvements

Here are some ideas for making the app even better:

### Content Management (No-Code Editing)
- **Add a CMS** (like [Sanity](https://www.sanity.io/), [Contentful](https://www.contentful.com/), or [Strapi](https://strapi.io/)) so non-developers can update dogs, events, and stories through a visual dashboard instead of editing code
- Alternatively, use a simple **Google Sheets → JSON** pipeline for content updates

### Backend & Forms
- Connect the Contact and Foster forms to a **backend service** (e.g., [Formspree](https://formspree.io/), [EmailJS](https://www.emailjs.com/), or a custom API) so form submissions actually send emails
- Add a **donation payment integration** (Stripe, PayPal) for real online donations

### User Accounts
- Add **user authentication** so adopters can track their application status
- Add an **admin panel** for the NGO team to manage content without touching code

### Analytics
- Add **Google Analytics** or **Plausible** to track visitor behavior and adoption interest

### SEO & Performance
- Add **meta tags** and **Open Graph** tags for better social media sharing
- Add **image optimization** (lazy loading, WebP format)
- Implement **server-side rendering** (SSR) or **static site generation** (SSG) with a framework like Next.js for better SEO

### Real Photos
- Replace the Unsplash stock photos with **actual photos of the rescue dogs**

---

## Social & Contact

- **Website:** [recycledpomeranians.com](https://recycledpomeranians.com)
- **Facebook:** [facebook.com/RecycledPomeranians](https://facebook.com/RecycledPomeranians)
- **Instagram:** [@recycledpomeranians](https://instagram.com/recycledpomeranians)
- **Email:** hello@recycledpomeranians.com

---

## License

This project was built with love for Recycled Pomeranians NGO. All rights reserved.
