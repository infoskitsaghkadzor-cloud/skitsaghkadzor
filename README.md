# Skitsaghkadzor.com — Ski & Snowboard School

A professional multi-page website for **skitsaghkadzor.com**, a ski and snowboard school offering lessons for juniors and adults.

## Pages

- **Home** (`index.html`) — Hero, offer overview, call-to-action to register and book
- **About** (`about.html`) — Story, stats, lesson types (ski/snowboard, juniors/adults), why choose us
- **Register** (`register.html`) — Sign up with Gmail (UI ready for Google OAuth) or email/password
- **Book a Lesson** (`booking.html`) — Lesson type (Ski / Snowboard), age group (Junior / Adult), date, time, participants, notes; then payment via Visa/Mastercard or IDram (QR)

## Running locally

Open `index.html` in a browser, or serve the folder with any static server:

```bash
cd skitsaghkadzor-website
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Payments

The booking flow includes a **payment step** with:

- **Visa / Mastercard** — Card form (number, expiry, CVV, cardholder name). For real processing, integrate a PCI-compliant gateway (e.g. Stripe, Idram Pay, or your bank’s gateway).
- **IDram (Armenia)** — QR code generated with the amount and a payment link. Replace the placeholder URL in `updateIdramQR()` in `booking.html` with your **IDram merchant payment URL** from the [IDram merchant dashboard](https://idram.am).

The QR is generated client-side using the [qrcode](https://www.npmjs.com/package/qrcode) library (CDN). Price per lesson is set in `PRICE_PER_PERSON_AMD` (default 15,000 AMD).

## Gmail / Google sign-in

The “Sign up with Gmail” button is wired for display only. To enable real sign-in:

1. Use [Firebase Authentication](https://firebase.google.com/docs/auth) (recommended) or [Google Sign-In](https://developers.google.com/identity/gsi/web).
2. Add your config (e.g. Firebase `config` or Google Client ID).
3. Replace the `#google-signup` click handler with the OAuth flow and redirect/callback to your app.

## Domain & publishing (GoDaddy + GitHub Pages)

The site is set up to use **skitsaghkadzor.com** on GitHub Pages.

1. **Push the repo** (including the `CNAME` file) to GitHub:
   ```bash
   cd /Users/t.yayloyan/skitsaghkadzor-website
   git add CNAME && git commit -m "Add custom domain CNAME for GitHub Pages" && git push origin main
   ```

2. **Turn on GitHub Pages**
   - Open [github.com/TatevikY/skitsaghkadzor](https://github.com/TatevikY/skitsaghkadzor) → **Settings** → **Pages**.
   - Under **Source**, choose **Deploy from a branch**.
   - Branch: **main**, folder: **/ (root)** → **Save**.
   - Under **Custom domain**, type `skitsaghkadzor.com` → **Save**. Wait until it shows “DNS check successful” (can take a few minutes).

3. **Point GoDaddy to GitHub**
   - In [GoDaddy Domain Manager](https://dcc.godaddy.com/), select **skitsaghkadzor.com** → **DNS** or **Manage DNS**.
   - **A records** for the root domain: replace or add so you have exactly these (remove any other A records for `@`):
     - `@` → `185.199.108.153`
     - `@` → `185.199.109.153`
     - `@` → `185.199.110.153`
     - `@` → `185.199.111.153`
   - **CNAME** for www (optional):  
     - Name: `www`  
     - Value: `TatevikY.github.io`  
     - (Or leave www as-is if you don’t use it.)
   - Save and wait 5–60 minutes for DNS to update.

4. **HTTPS**  
   In GitHub Pages settings, leave **Enforce HTTPS** on once the domain check is green.

After DNS propagates, **https://skitsaghkadzor.com** will open your site.

## Push to GitHub

To commit and push this project to [github.com/TatevikY/skitsaghkadzor](https://github.com/TatevikY/skitsaghkadzor), run in Terminal from this folder:

```bash
cd /Users/t.yayloyan/skitsaghkadzor-website
git init
git add .
git commit -m "Add Skitsaghkadzor ski school website"
git branch -M main
git remote add origin https://github.com/TatevikY/skitsaghkadzor.git
git push -u origin main
```

If the repo already has content (e.g. a README), use `git pull origin main --allow-unrelated-histories` before the first push, or force-push only if you intend to replace the remote history.
