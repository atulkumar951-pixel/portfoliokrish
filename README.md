# 💼 Krishna — Portfolio Website

A fully responsive, animated single-page portfolio for a **B.Tech CSE student**.
Built with **pure HTML, CSS & JavaScript** (no frameworks needed).

## 📁 Project Structure

```
Krishna/
├── index.html              ← all the content (text, projects, certificates, CV data)
├── css/style.css           ← design, colors, animations, responsive layout
├── js/script.js            ← typing effect, scroll animations, lightbox, form
├── js/download-cv.js       ← generates the single-page PDF resume on "Download"
└── assets/
    ├── profile/photo.jpg   ← 👤 your photo (replace this file)
    ├── certificates/       ← 🏆 certificate images (your real files)
    └── resume/Krishna_Resume.pdf  ← fallback resume (optional, see "PDF Resume" below)
```

> **Placeholder files** (photo.jpg, cert1.jpg…cert6.jpg, Krishna_Resume.pdf) already
> exist as empty files. Just **replace them** with your real files — keep the same names.

---

## ✏️ Where to update what

Search for these comments in `index.html` — every one starts with `<!-- ✏️`.

| What you want to change | Section | What to do |
|---|---|---|
| **Your name** | Home | Edit the `<h1 class="hero-name">Krishna</h1>` line and the logo `Krishna<span>…</span>` |
| **Typing words** | Home | Open `js/script.js`, edit the `roles` array (line ~32) |
| **Your intro text** | Home | Edit the `<p class="hero-desc">` paragraph |
| **Photo (the person)** | Home | Replace `assets/profile/photo.jpg` with your photo. If no photo is added, a gradient "K" shows automatically |
| **GitHub & LinkedIn links** | Done ✅ | Already set — `github.com/kn345870-dotcom`, `linkedin.com/in/krishna-nand-0222aa434`, Instagram `@krishnand_0011` + `@intellcoders.in` |
| **About text** | About | Edit the two `<p class="about-p">` paragraphs |
| **Email / phone / location** | About + Contact | Replace `your.email@gmail.com`, `+91 99999 99999`, "India" |
| **Stats (projects / CGPA)** | About | Edit `data-target` values on the `.stat-num` elements |
| **Skill percentages** | Skills | Edit the `data-width="90"` values under each skill |
| **Extra tech chips** | Skills | Edit the `.skill-chip` spans |
| **Projects** | Projects | Copy/paste a whole `<article class="project-item">` block (list row), change number, title, text and tags |
| **Education details** | Education | Edit the 3 `.timeline-card` blocks (degree, college name, CGPA/%) |
| **Certificates** | Certificates | Put images in `assets/certificates/` and edit the titles near each card |
| **Achievements** | Certificates | Edit the `.achievement` items |
| **Internships** | Experience | Edit the 2 `.exp-card` blocks |
| **Resume DOWNLOAD (PDF)** | All | See the **📄 Single-page PDF resume** section below |
| **Email for the form** | Contact | Replace `your-email@gmail.com` in the form `action` (see ☑ Activation below) |

---

## 🏆 Adding a certificate (step-by-step example)

1. Save your certificate image in the `assets/certificates/` folder (e.g. `aws.png`).
2. In `index.html`, copy one of the existing `<article class="cert-card">` blocks
   and paste it right after the last card inside `<div class="certs-grid">`.
3. Update the **two** file references and the title:

```html
<article class="cert-card reveal">
  <figure class="cert-thumb">
    <img src="assets/certificates/aws.png"
         data-lightbox-img="assets/certificates/aws.png"
         data-lightbox-title="AWS Cloud Practitioner" />
    …
  </figure>
  <div class="cert-body">
    <h4 class="cert-title">AWS Cloud Practitioner</h4>
    <p class="cert-meta"><span class="cert-org">Amazon</span> • <span class="cert-year">2025</span></p>
  </div>
</article>
```

4. Change the **title**, **organisation**, **year**, and picture file name.
5. You can have as many as you want — the lightbox preview updates automatically.

---

## 📄 Single-page PDF resume (Download button)

Clicking any **"Download Resume / CV"** button now generates a **single-page A4 PDF**
automatically — it contains **all your details** (summary, education, skills, projects,
experience, certificates, achievements) in a clean CV layout.

- **How it works:** `js/download-cv.js` renders the hidden `#cv-print` block (in
  `index.html`) into a PDF using html2canvas + jsPDF. If the content is ever too big,
  it auto-shrinks until it fits exactly **one** page.
- **✏️ To change the PDF contents:** edit the `<!-- CV ... -->` block in `index.html`
  (name, email, education, projects, etc.). No need to touch the JS.
- **Internet needed once:** html2canvas and jsPDF load from a CDN, so the first PDF
  download needs a connection. After that the browser caches them.
- **Fallback:** `assets/resume/Krishna_Resume.pdf` still exists — if the JS ever fails,
  links point there instead of doing nothing.

---

## ☑ Making the contact form work (FormSubmit — free)

The form is already wired to FormSubmit, which emails you the messages — just:

1. In `index.html`, find the line `action="https://formsubmit.co/your-email@gmail.com"`.
2. Replace `your-email@gmail.com` with **your own email address**.
3. Open the site in your browser, send any test message.
4. FormSubmit emails you a one-time **activation link** → click it once.
5. Done — every message sent from the site lands in your inbox.

---

## 🚀 How to preview / deploy

**Preview (offline):** just double-click `index.html`, or run a local server:
```bash
python -m http.server 8000
```
then open http://localhost:8000

**Free deploy — GitHub Pages (recommended):**
1. Create a repo on GitHub named `kn345870-dotcom.github.io`.
2. In PowerShell (from the project folder):
```bash
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/kn345870-dotcom/kn345870-dotcom.github.io.git
git push -u origin main
```
3. Wait ~1 minute → your site is live at `https://kn345870-dotcom.github.io`.

**Free deploy — Netlify (no git needed):** drag-and-drop the whole folder at https://app.netlify.com/drop

---

## 🎨 Customizing the colors

Open `css/style.css`, near the top there is a `:root` block. Change the two main colors:

```css
--primary: #8b5cf6;   /* purple   → pick any color */
--accent:  #22d3ee;   /* cyan     → pick any color */
```

The whole site (buttons, gradients, hover states) updates automatically.