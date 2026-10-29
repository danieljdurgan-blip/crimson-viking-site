# Crimson Viking Games website

The studio website: a home page with the games (`index.html`) and the privacy policy (`privacy.html`). Plain HTML and CSS with no build step, no cookies and no tracking, so it can be hosted anywhere for free.

## Before you publish

Fill these in. They're highlighted in yellow on the pages until you do:

- [ ] **Your name.** Replace `[your name]` in `index.html` and `privacy.html`. If you set the studio up as a company later, use the company's name instead.
- [x] **Contact email.** The pages use `crimsonvikinggames@gmail.com`.
- [ ] **Read the privacy policy through.** It describes how the games work today: settings and progress stay on the player's PC, multiplayer is over LAN, Steam and the Epic Games Store, and there's no analytics or ads. If that changes, update the page and the date at the top. It isn't legal advice, so if you're unsure about anything, get it checked.

## Hosting it free on GitHub Pages, with your own domain

1. **Buy the domain**, for example `crimsonvikinggames.com`, from Cloudflare, Porkbun or Namecheap. They cost about £8–12 a year.
2. **Put the site on GitHub.** Create a new **public** repository (GitHub Pages is free for public repositories), for example `crimson-viking-site`, and upload the contents of this folder.
3. **Turn on Pages.** In the repository, go to **Settings → Pages**, set *Source* to **Deploy from a branch**, choose **main** and **/ (root)**, and save. The site appears at `https://<your-github-name>.github.io/crimson-viking-site/` within a minute or two.
4. **Point the domain at it.** In **Settings → Pages → Custom domain**, type your domain and save. This adds a `CNAME` file to the repository. Then, at your domain registrar, add these DNS records:
   - four **A** records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - a **CNAME** record for `www`, pointing to `<your-github-name>.github.io`

   When GitHub shows the domain as working, tick **Enforce HTTPS**.
5. **Optional: an email address on the domain.** Most registrars offer free email forwarding, so `hello@yourdomain.com` could forward to `crimsonvikinggames@gmail.com`. If you set that up, change the address on the pages to match.

## Verifying the domain for Epic

In the Epic Developer Portal (Epic Account Services → your application → Brand Settings), add the website and privacy policy addresses:

- Website: `https://yourdomain.com`
- Privacy policy: `https://yourdomain.com/privacy.html`

Epic then shows how to verify the domain, usually a **TXT** record to add at your registrar. Add it there, wait a few minutes, and press Verify.
