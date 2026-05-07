# Product Requirements Document (PRD)
## FilmEclipse — Window Tinting Landing Page

**Version:** 1.1  
**Date:** May 2026  
**Status:** Ready for Development  
**Tools:** Visual Studio Code + Claude Code  
**Company:** FilmEclipse  
**Market:** Quebec, Canada (bilingual EN / FR)

---

## 1. Project Overview

### 1.1 Purpose
Build a high-converting, modern landing page for **FilmEclipse**, a professional window tinting company based in Quebec. The page must establish trust, clearly communicate value propositions, and above all **drive potential clients to submit a free quote request form**. The design should feel premium, technical, and sleek — like a luxury automotive or architectural brand.

### 1.2 Business Goals
- **Primary conversion goal:** Get visitors to submit their contact information via a "Get a Free Quote" form — every design and copy decision should serve this objective
- Showcase FilmEclipse's product range across residential, commercial, and automotive markets
- Build credibility through social proof and technical education
- Serve Quebec's bilingual market with a seamless **English / French language toggle**
- Perform flawlessly on **mobile and desktop** — mobile-first development approach required

### 1.3 Target Audience
- Homeowners in Quebec seeking energy savings, privacy, and UV protection
- Car owners wanting heat reduction, aesthetics, and UV/glare protection
- Commercial property managers and businesses seeking energy efficiency and security
- Architects and contractors specifying glazing solutions

---

## 2. Design Direction & Aesthetic

### 2.1 Inspiration Reference
**Velvera Hair Salon Template** (provided `velvera_framer_website.html` + screenshot)

Key design patterns to borrow from Velvera:
- **Clean section hierarchy** with generous vertical padding between sections
- **Small uppercase eyebrow labels** above section headings (e.g., "our services", "how it works")
- **Editorial typography** — large serif display headings paired with a lighter sans-serif body
- **Card-based service layouts** with photo + label + short description
- **Testimonials section** with quotes + star ratings
- **"How it works" step-by-step section**
- **FAQ accordion section**
- **Before/After transformations gallery**
- **Sticky top navigation** with CTA button

### 2.2 Aesthetic Direction
- **Tone:** Luxury industrial — dark, precise, confident. Think automotive detail photography meets architectural minimalism.
- **Color Palette:**
  - Primary background: `#080A0C` (near black)
  - Surface/cards: `#0E1115`
  - Accent: `#C8A96E` (warm gold) — used for CTAs, highlights, eyebrows
  - Text: `#F0EDE8` (warm white)
  - Muted text: `rgba(240,237,232,0.5)`
  - Borders: `rgba(255,255,255,0.07)`
- **Typography:**
  - Display/headings: `Cormorant Garamond` (elegant, editorial serif) — Google Fonts
  - Body/UI: `Sora` (clean, technical sans-serif) — Google Fonts
  - Eyebrow labels: uppercase, wide letter-spacing, small size, gold color
- **Motion:** Subtle fade-up on scroll (Intersection Observer), smooth hover states on cards and buttons, pulse animation on active badges, stat counter animation
- **Layout:** Generous whitespace, full-bleed sections, grid-based card layouts, asymmetry in hero
- **Background detail:** Subtle grain texture overlay, gold-tinted radial gradient in hero, faint geometric grid lines

### 2.3 Brand Concept
The name **FilmEclipse** carries a built-in metaphor — the interplay of light and shadow, control of what passes through. Hero copy, visual language, and the brand mark should all lean into this: controlling light, shielding from the sun, clarity revealed. The logo wordmark should use a serif font with "Eclipse" visually distinguished (e.g., italic or gold).

---

## 3. Bilingual Requirements (EN / FR)

### 3.1 Language Toggle
- A visible **EN | FR toggle button** must appear in the **top navigation bar** on all screen sizes
- Toggling language switches **all visible text** on the page **instantly with no page reload**
- Default language: **English**
- Active language persists in `localStorage` so returning visitors see their preferred language
- `<html lang="">` attribute updates dynamically on toggle (`en` ↔ `fr`)
- The mobile menu must also contain the language toggle

### 3.2 Implementation Pattern
```js
const translations = {
  en: {
    "nav.services": "Services",
    "nav.quote":    "Get a Free Quote",
    "hero.headline": "Control the Light. Shield Your Space.",
    // ... all keys
  },
  fr: {
    "nav.services": "Services",
    "nav.quote":    "Obtenez une soumission gratuite",
    "hero.headline": "Maîtrisez la lumière. Protégez votre espace.",
    // ... all keys
  }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = translations[lang][el.dataset.i18n] || el.textContent;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = translations[lang][el.dataset.i18nPlaceholder] || el.placeholder;
  });
  document.documentElement.lang = lang;
  localStorage.setItem('filmeclipse-lang', lang);
}
```

HTML pattern:
```html
<a data-i18n="nav.services">Services</a>
<input data-i18n-placeholder="form.name" placeholder="John Smith" />
```

### 3.3 French Copy Conventions
- Professional, warm, and direct — avoid overly formal register
- Quebec French: use "courriel" not "e-mail", "soumission" for quote, "pose" for installation
- Primary CTA in French: **"Obtenez une soumission gratuite"**

---

## 4. Mobile-First & Responsive Requirements

### 4.1 Breakpoints
| Name | Min-width | Notes |
|---|---|---|
| Mobile | 320px | Minimum supported, primary design target |
| Tablet | 768px | 2-column layouts begin |
| Desktop | 1024px | Full nav visible, 3-column grids |
| Wide | 1280px+ | Max-width container centered |

### 4.2 Mobile-Specific Behavior
- **Nav:** Hamburger → full-screen overlay with large touch-friendly links + language toggle
- **Hero:** Single-column stacked, reduced heading size, full-width buttons
- **Cards:** 1-col mobile → 2-col tablet → 3-col desktop
- **Stats bar:** 2×2 grid on mobile → 4-col row on desktop
- **Quote form:** Full-width single-column
- **Before/After gallery:** Swipeable horizontal scroll
- **FAQ accordion:** Touch-friendly tap targets (min 48px height)
- **Footer:** Fully stacked on mobile

### 4.3 Touch & Performance Standards
- All tap targets ≥ 44×44px
- No hover-only interactions — all states accessible by tap
- Lazy-load all images (`loading="lazy"`)
- Use `srcset` for responsive image sizes
- Target: Lighthouse mobile score ≥ 90

---

## 5. Page Structure & Sections

### Section 1 — Navigation (Sticky)
- **Left:** FilmEclipse logo (serif wordmark, "Eclipse" in gold or italic)
- **Center (desktop):** Services | Applications | Why Us | FAQ | Transformations
- **Right:** `EN | FR` toggle + **"Get a Free Quote"** gold CTA button
- Frosted glass background (`backdrop-filter: blur`) activates on scroll
- **Mobile:** Logo + hamburger → full-screen overlay menu

---

### Section 2 — Hero
**Goal:** Immediate visual impact + value statement + drive to CTA form

| | English | French |
|---|---|---|
| Eyebrow | `● Quebec's Premium Window Film Specialists` | `● Spécialistes en film teinté au Québec` |
| Headline | *"Control the Light. Shield Your Space."* | *"Maîtrisez la lumière. Protégez votre espace."* |
| Subheadline | "Professional window tinting for homes, vehicles and commercial properties. Block solar heat, eliminate UV damage, and enhance privacy — without sacrificing your view." | "Pose professionnelle de film teinté pour résidences, véhicules et commerces. Réduisez la chaleur, bloquez les UV et préservez votre intimité — sans perdre votre vue." |
| Primary CTA | **Get a Free Quote** | **Obtenez une soumission gratuite** |
| Secondary CTA | Explore Our Films | Découvrez nos films |

**Trust row below CTAs:**
- ★ 4.9/5 Rating / Évaluation
- 500+ Installations
- Certified Installers / Installateurs certifiés
- Solar Screen Authorized / Autorisé Solar Screen

**Visual:** Full-bleed dark background with subtle gold radial glow, faint geometric grid lines, angular light-refraction graphic element suggesting glass

---

### Section 3 — Pain Points
| | English | French |
|---|---|---|
| Eyebrow | `The Problem` | `Le problème` |
| Headline | "Common problems window film solves" | "Les problèmes que le film teinté résout" |

**6-card icon grid:**

| Icon | EN Title | EN Body | FR Title | FR Body |
|---|---|---|---|---|
| 🌡️ | Unbearable Indoor Heat | Solar films block up to 79% of solar heat gain | Chaleur intérieure insupportable | Nos films bloquent jusqu'à 79 % de la chaleur solaire |
| ☀️ | UV Damage to Interiors | Block up to 99% of UV — protect floors, furniture, and art | Dommages UV sur vos intérieurs | Bloquez jusqu'à 99 % des rayons UV nocifs |
| 👁️ | Lack of Privacy | One-way mirror films protect without blocking natural light | Manque d'intimité | Films miroir : intimité sans sacrifier la lumière |
| ⚡ | High Energy Bills | Reduce AC usage and cut energy costs year-round | Factures d'énergie élevées | Réduisez la clim et vos coûts énergétiques |
| 🔒 | Security Vulnerabilities | Safety films hold shattered glass in place | Vulnérabilités de sécurité | Les films de sécurité retiennent le verre brisé |
| 💻 | Glare on Screens & Eyes | Anti-glare films improve visual comfort at home and office | Reflets et éblouissements | Films anti-reflets pour votre confort visuel |

---

### Section 4 — How It Works
| | English | French |
|---|---|---|
| Eyebrow | `The Process` | `Notre processus` |
| Headline | "From consultation to perfect finish" | "De la consultation à la finition parfaite" |

**3 numbered steps:**

| Step | EN Title | EN Body | FR Title | FR Body |
|---|---|---|---|---|
| 01 | Free Consultation | We assess your space, windows, and goals. Together we choose the right film for your needs and budget. | Consultation gratuite | Nous évaluons votre espace et vos besoins, puis choisissons ensemble le bon film. |
| 02 | Expert Installation | Our certified installers apply the film with precision — bubble-free and clean. Most jobs done in a single visit. | Installation professionnelle | Nos installateurs certifiés posent le film sans bulles, en une seule visite. |
| 03 | Lasting Protection | Enjoy years of comfort, energy savings, and protection backed by a full manufacturer warranty. | Protection durable | Des années de confort et d'économies, couvertes par une garantie fabricant complète. |

---

### Section 5 — Product / Services
| | English | French |
|---|---|---|
| Eyebrow | `Our Films` | `Nos films` |
| Headline | "Professional window film for every need" | "Un film professionnel pour chaque besoin" |

**6-card grid (image + title + description):**

| EN Title | EN Body | FR Title | FR Body |
|---|---|---|---|
| Solar Control Films | Reduce heat gain, block UV and glare. Available in Silver, Transparent, Neutral, One-Way Mirror, and Coloured variants. | Films de contrôle solaire | Réduisez la chaleur, les UV et les reflets. Disponibles en plusieurs finitions. |
| Security & Safety Films | Reinforce glass against break-ins and accidents. Holds shattered glass in place to prevent injury. | Films de sécurité | Renforcez le verre contre intrusions et accidents. Retient les éclats en cas de bris. |
| Privacy & Decorative Films | Frosted, tinted, and patterned films for partitions, bathrooms, and storefronts. Brightness preserved. | Films décoratifs et d'intimité | Films givrés et texturés. Lumière préservée, intimité garantie. |
| Thermal Insulation Films | Dual-season performance: blocks summer heat, retains winter warmth. Cuts energy costs year-round. | Films d'isolation thermique | Bloque la chaleur en été, retient la chaleur en hiver. Économies toute l'année. |
| Anti-Graffiti Films | Transparent sacrificial layer protecting surfaces from scratches and paint. Easily replaced. | Films anti-graffiti | Couche protectrice transparente contre rayures et peinture. Remplacement simple. |
| Automotive Window Tinting | Enhance your vehicle's comfort, privacy, and style. Blocks heat and UV while maintaining outward visibility. | Vitres teintées automobile | Confort, intimité et style pour votre véhicule. Blocage de chaleur et des UV. |

---

### Section 6 — Applications
| | English | French |
|---|---|---|
| Eyebrow | `Applications` | `Applications` |
| Headline | "Window film for every environment" | "Un film pour chaque environnement" |

**4 large cards with image:**
- 🏠 Residential / Résidentiel
- 🏢 Commercial & Office / Commercial et bureaux
- 🚗 Automotive / Automobile
- 🏗️ New Construction & Renovation / Construction neuve et rénovation

---

### Section 7 — Stats Bar
Full-width dark section, numbers animate counting-up on scroll:

| Stat | EN Label | FR Label |
|---|---|---|
| Up to 79% | Solar heat rejected | Chaleur solaire rejetée |
| Up to 99% | UV rays blocked | Rayons UV bloqués |
| 10+ years | Average film lifespan | Durée de vie moyenne |
| 500+ | Satisfied clients | Clients satisfaits |

---

### Section 8 — Why Choose FilmEclipse
| | English | French |
|---|---|---|
| Eyebrow | `Why Us` | `Pourquoi nous` |
| Headline | "The experts behind every perfect installation" | "Les experts derrière chaque installation parfaite" |

**2-column layout — checklist left, image right:**

| ✅ EN | ✅ FR |
|---|---|
| Authorized Solar Screen Installer | Installateur Solar Screen agréé |
| Certified & insured technicians | Techniciens certifiés et assurés |
| Bubble-free precision application | Pose sans bulles et sans défauts |
| Full manufacturer warranty support | Garantie fabricant complète |
| Free on-site consultation | Consultation sur place gratuite |
| Residential, commercial & automotive | Résidentiel, commercial et automobile |
| Serving all of Quebec | Service partout au Québec |

---

### Section 9 — Testimonials
| | English | French |
|---|---|---|
| Eyebrow | `Client Reviews` | `Avis clients` |
| Headline | "What our clients say about FilmEclipse" | "Ce que nos clients disent de FilmEclipse" |

**3-column card grid — ★★★★★ + quote + name + type:**

| Quote EN | Quote FR | Name | Type EN | Type FR |
|---|---|---|---|---|
| "The temperature difference is incredible. My home office is finally comfortable all summer." | "La différence de température est incroyable. Mon bureau est enfin confortable tout l'été." | Marc T. | Residential | Résidentiel |
| "Professional installation on my car in barely 2 hours. The tint is absolutely flawless." | "Pose professionnelle sur ma voiture en à peine 2 heures. Résultat impeccable." | Sophie K. | Automotive | Automobile |
| "Our office now has full privacy from the street. The team was fast and professional." | "Notre bureau est maintenant protégé des regards. L'équipe a été rapide et pro." | David R. | Commercial | Commercial |

*(Replace with real testimonials before launch)*

---

### Section 10 — Before / After Gallery
| | English | French |
|---|---|---|
| Eyebrow | `Transformations` | `Transformations` |
| Headline | "See the difference FilmEclipse makes" | "Voyez la différence que FilmEclipse apporte" |

**Interactive drag-handle before/after image slider** — 4–6 examples:
- Car windows tint
- Home living room solar film
- Office exterior mirror film
- Glass partition frosted film

Mobile: swipeable horizontal card scroll.

---

### Section 11 — FAQ Accordion
| | English | French |
|---|---|---|
| Eyebrow | `FAQ` | `FAQ` |
| Headline | "Answers to your most common questions" | "Réponses à vos questions les plus fréquentes" |

All items have EN + FR question and answer text. Click/tap to expand.

| # | Question EN | Question FR |
|---|---|---|
| 1 | How long does installation take? | Combien de temps prend la pose ? |
| 2 | Will film affect my inside view? | Est-ce que le film affecte ma vue de l'intérieur ? |
| 3 | What's the difference between solar and security film? | Quelle est la différence entre film solaire et film de sécurité ? |
| 4 | How long does the film last? | Quelle est la durée de vie du film ? |
| 5 | Can film be applied to any glass? | Le film peut-il être posé sur n'importe quel verre ? |
| 6 | Is window film removable? | Le film est-il amovible ? |
| 7 | Do you offer a warranty? | Offrez-vous une garantie ? |
| 8 | Can car windows be tinted to any level? | Peut-on teinter les vitres auto à n'importe quel niveau ? |
| 9 | How do I clean windows after installation? | Comment nettoyer les fenêtres après la pose ? |
| 10 | Do you serve my area in Quebec? | Desservez-vous ma région au Québec ? |

---

### Section 12 — Quote Request Form ⭐ PRIMARY CTA
**This is the most important section on the page. Treat it as the conversion destination.**

| | English | French |
|---|---|---|
| Eyebrow | `Get Started` | `Commencez` |
| Headline | "Get your free window tinting quote today" | "Obtenez votre soumission gratuite aujourd'hui" |
| Subtext | "Fill out the form and we'll get back to you within 24 hours with a tailored recommendation." | "Remplissez le formulaire et nous vous répondrons dans les 24 heures." |

**Form fields:**

| Field | Type | EN Label | FR Label | EN Placeholder | FR Placeholder |
|---|---|---|---|---|---|
| Full Name | text | Full Name | Nom complet | John Smith | Jean Tremblay |
| Email | email | Email Address | Adresse courriel | you@example.com | vous@exemple.com |
| Phone | tel | Phone Number | Numéro de téléphone | (514) 000-0000 | (514) 000-0000 |
| Project Type | select | Type of Project | Type de projet | Select… | Sélectionnez… |
| → | option | Residential | Résidentiel | | |
| → | option | Commercial | Commercial | | |
| → | option | Automotive | Automobile | | |
| → | option | Other | Autre | | |
| Message | textarea | Tell us about your project | Décrivez votre projet | Window count, size, specific concerns… | Nombre de fenêtres, dimensions, besoins spécifiques… |
| Submit | button | **Request My Free Quote** | **Demander ma soumission gratuite** | | |

**Post-submit success state (no page reload):**
- EN: "Thank you! We'll be in touch within 24 hours."
- FR: "Merci ! Nous vous contacterons dans les 24 heures."

**Design note:** Desktop layout = 2 columns (headline + trust signals left / form right). Visually distinct section — dark card with gold accent border or line. Secondary contact options below form (click-to-call phone, click-to-email).

---

### Section 13 — Footer
4-column desktop / fully stacked mobile:

- **Col 1:** FilmEclipse logo + short tagline + social icons (Instagram, Facebook, LinkedIn)
- **Col 2:** Nav links (bilingual)
- **Col 3:** Contact info — phone, email, Quebec location
- **Col 4:** Language toggle + copyright

| Copyright EN | Copyright FR |
|---|---|
| © 2026 FilmEclipse. All rights reserved. | © 2026 FilmEclipse. Tous droits réservés. |

---

## 6. Technical Requirements

### 6.1 Stack
- **HTML5 / CSS3 / Vanilla JavaScript** — no framework, maximum portability
- CSS custom properties (variables) for all design tokens
- Single `translations` JS object drives all bilingual copy — no page reload on switch
- Intersection Observer API for scroll-triggered animations
- No jQuery or heavy libraries required

### 6.2 Performance Targets
- Images: WebP format, `loading="lazy"`, `srcset` for responsive sizes
- Preload: hero image + display font (`Cormorant Garamond`)
- JS: single deferred file
- CSS: single stylesheet
- **Lighthouse score target: ≥ 90 on both mobile and desktop**

### 6.3 Accessibility
- WCAG 2.1 AA compliance
- All images: descriptive `alt` in active language
- Form: `<label for>` + `id` on every input
- Keyboard navigable (Tab, Enter, Space)
- `focus-visible` outlines on all interactive elements
- FAQ: `aria-expanded` + `aria-controls` on accordion triggers
- Color contrast ≥ 4.5:1 for all text
- `<html lang="">` updates dynamically on language switch

### 6.4 SEO
```html
<title>FilmEclipse — Professional Window Tinting in Quebec</title>
<meta name="description" content="FilmEclipse offers professional window tinting for homes, vehicles and commercial spaces across Quebec. Block UV, reduce heat, enhance privacy. Free quote." />
```
- Open Graph + Twitter Card tags
- H1 → H2 → H3 heading hierarchy
- Schema.org `LocalBusiness` JSON-LD block in `<head>`

---

## 7. Product Knowledge Reference
*(Source: solarscreen.eu/en — FilmEclipse's manufacturer/supplier)*

### Film Ranges

**Solar Control:** Silver (mirror, max heat rejection) · Transparent (clarity + solar filter) · Neutral (discreet, non-reflective) · One-Way Mirror (outside privacy, inside visibility) · Coloured · Thermal Insulation (summer + winter dual-season) · Polycarbonate Application · Anti-Discoloration · Photochromic

**Safety:** Security (impact / break-in / explosion resistance) · Anti-Graffiti (sacrificial layer, easy replace) · Specialty

**Design:** Privacy (frosted, preserves light) · Decorative (patterns, textures) · Coloured · Whiteboards

### Key Verified Claims
- Blocks **up to 99% of UV rays**
- Reduces **solar heat gain significantly** — lowers AC usage and energy costs
- **Holds shattered glass in place** — safety and intrusion deterrent
- **Dual-season thermal performance** — summer heat block + winter heat retention
- Reduces **glare** for visual comfort
- **Durable and discreet** — professional-grade, long-lasting

---

## 8. File Structure

```
filmeclipse/
├── index.html
├── css/
│   ├── style.css          ← Design tokens, layout, all components
│   └── animations.css     ← Keyframes, scroll-triggered fade-up
├── js/
│   ├── main.js            ← Nav, hamburger, FAQ accordion, stat counter, scroll
│   └── i18n.js            ← Translation strings object + language toggle logic
├── images/
│   ├── hero.webp
│   ├── services/          ← 6 service card images
│   ├── gallery/           ← Before/after pairs
│   └── icons/             ← SVG icons for pain points & steps
└── PRD.md
```

---

## 9. Development Milestones

| # | Phase | Deliverable |
|---|---|---|
| 1 | ✅ PRD | Requirements finalized |
| 2 | Setup | Folder structure, CSS tokens, font imports |
| 3 | i18n | Full `translations` object + toggle function + `data-i18n` on all elements |
| 4 | Nav | Sticky nav, hamburger menu, language toggle wired |
| 5 | Hero | Desktop + mobile hero section |
| 6 | Sections 3–11 | All content sections built |
| 7 | Form | Quote form, validation, success state, bilingual |
| 8 | Footer | Responsive footer |
| 9 | Animations | Fade-up on scroll, stat counter, hover states |
| 10 | Mobile QA | All breakpoints 320px → 1440px |
| 11 | a11y | Accessibility audit + fixes |
| 12 | Performance | Image optimization, Lighthouse ≥ 90 |
| 13 | Copy | Replace placeholders with real FilmEclipse content |
| 14 | Launch | Deploy |

---

## 10. Open Questions (Complete Before or During Build)

- [ ] FilmEclipse phone number and email address?
- [ ] Which city/region in Quebec? (for local SEO + footer)
- [ ] Real before/after photos available?
- [ ] Real customer testimonials to use?
- [ ] Where do quote form submissions go? (email, CRM, Notion, etc.)
- [ ] Is there an existing FilmEclipse logo file?
- [ ] Which specific Solar Screen films does FilmEclipse carry?
- [ ] Hosting platform? (Netlify, Vercel, cPanel, etc.)

---

*PRD v1.1 — FilmEclipse. Feed this file to Claude Code at the start of your VS Code session for best results.*
