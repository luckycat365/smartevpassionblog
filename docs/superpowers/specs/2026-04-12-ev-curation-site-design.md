# Smart EV Curation Site Design Specification

## 1. Goal and Scope
A personal curation/blog website to showcase global Smart EV cars using embedded YouTube videos, categorized by manufacturer. The site provides a premium "digital showroom" experience tailored for EV enthusiasts.

## 2. Architecture & Data Flow
**Architecture (Two-Level Structure):**
1. **Homepage (Brands Grid):** Displays a grid of brand cards (e.g., BYD, Mercedes-Benz). Each card features a representative "hero" YouTube video embedded at the top, the brand name, and the user's short introductory thought. Clicking a brand navigates to its specific Brand Page.
2. **Brand Page (Cars Grid):** Displays the full curation text/review for the selected manufacturer. Below the text is a grid of individual EV models (e.g., BYD Seal, BYD Atto 3), each represented by a card with its own embedded YouTube video.

**Data Storage:**
A lightweight, centralized JavaScript data object (e.g., `data.js`) will hold all site content (brands, YouTube IDs, lists of car models, textual reviews). This static data injection eliminates the need for an external database while keeping content updates frictionless. 

## 3. Technology Stack
- **Structure:** Vanilla HTML5 utilizing semantic markup.
- **Logic:** Vanilla JavaScript for DOM updates and state management. The site will likely use a lightweight Single Page Application (SPA) approach to smoothly transition between the Homepage and Brand pages without full reloads.
- **Styling:** Vanilla CSS. 

## 4. Design & Aesthetics
**Theme: "Deep Premium" (Dark Mode)**
- **Colors:** Deep black backgrounds combined with subtle "electric neon" accents (e.g., electric blue) for hover states, buttons, and decorative elements.
- **Typography:** Modern, clean sans-serif ("Inter" or "Outfit" via Google Fonts) to represent technological advancement. 
- **Interactions:** Dynamic micro-animations. Cards will feature smooth scaling, glow-effects upon hover, and glass-morphism to ensure the site feels responsive and alive.
- **Media:** YouTube `iframe` embeddings structured cleanly inside responsive container grids. 

## 5. Performance & Edge Cases
- **YouTube Embed Performance:** Embedding many iframes on a single page can degrade load times. The implementation will use `loading="lazy"` attributes or a lightweight thumbnail facade approach where the video iframe only loads when clicked.
