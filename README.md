# Pkc Solutions

Build a modern, single-page company website for "PKC Solutions Inc." (domain: pkcsolutionsinc.com). It's a global software consulting and technology company serving Canada, India and international markets. The site must look like a trendy, premium 2026 tech/SaaS website (think Linear, Vercel, Stripe, Framer): beautiful UI, black and green theme, and rich animations in every section. Single page with smooth-scroll sections, no backend.

## Color palette (use exactly, define as CSS variables / Tailwind theme colors)
- Primary green: #0DA654 (brand color, matches the logo)
- Green hover: #0B8F48
- Green light / gradient end: #34D27B
- Green glow: rgba(13,166,84,0.25)
- Background: #000000, alternate section background #050806
- Card surface: #0A0F0C, card border #1C2A21
- Text white #FFFFFF, muted text #9CA8A0
- Gradient for headings, buttons and borders: linear-gradient(135deg, #0DA654, #34D27B)
- Use only black, green and white. No purple, blue or other accent colors.

## Logo
Use the attached logo (green PKC box + "PKC Solutions Inc." text). Put it in the navbar (symbol + full name) and footer. Use the symbol only for the favicon and the page-load intro (the green box animates in first, then the text slides out beside it).

## Design style
- Pure black background with subtle green aurora/mesh gradient blobs, a faint grid or dot pattern and a light noise texture.
- Glassmorphism cards: translucent dark surface, backdrop blur, 1px green-tinted gradient borders, soft green glow on hover.
- Bento-grid layouts for Services and Why Choose Us, with cards of different sizes.
- Cursor-follow spotlight glow on cards.
- Big bold headings (Space Grotesk or Sora) with tight spacing and green gradient on key words. Body font Inter.
- Rounded corners (16-24px), generous whitespace, pill-shaped buttons: a primary solid green button with glow, and a secondary glass outline button.
- Floating pill-shaped navbar with blur that shrinks on scroll, a green active-section underline, and a hamburger menu on mobile.
- Fully responsive on mobile, tablet and desktop. Good contrast and accessible focus states.

## Sections (in this order)
1. Hero: Headline "Your Global Technology Partner" with "Global" in the green gradient. Rotating/typing taglines: "Think Global. Build Smart. Grow Together." and "Innovating Today. Transforming Tomorrow." Subtext: "PKC Solutions is a global software consulting and technology solutions company committed to helping businesses innovate, grow and succeed in the digital world." Buttons: "Explore Services" and "Contact Us". Animated green aurora background, floating glowing orbs, small floating tech icons and a scroll-down indicator. Add a glass strip: Canada · India · International.
2. About Us: Two columns. Text: "PKC Solutions is a global software consulting and technology solutions company committed to helping businesses innovate, grow and succeed in the digital world. We partner with startups, small businesses and established enterprises across Canada, India and international markets to deliver innovative, reliable and scalable technology solutions. Our expertise spans software development, IT consulting, web and mobile applications, cloud technologies, AI-driven solutions and digital transformation. We combine technical expertise, business understanding and a customer-first approach to turn complex challenges into smart technology solutions." On the right, a glass card with animated count-up stats (Countries Served, Projects Delivered, Happy Clients, Years of Experience), using placeholder numbers.
3. Services: Bento grid of 7 cards, each with an icon, title and one-line description: Software Development, IT Consulting, Web & Mobile Applications, Cloud Solutions, AI & Automation, Digital Transformation, Business Technology Consulting.
4. Our Process: 4 steps (Discover → Design → Develop → Deliver) connected by a green line that draws itself on scroll.
5. Mission & Vision: Two large glass cards with animated green gradient borders. Mission: "To empower businesses worldwide with innovative technology, exceptional consulting and solutions that create lasting value." Vision: "To become a globally trusted technology partner, connecting businesses with the future of digital innovation."
6. Why Choose Us: Bento grid: Technical Expertise, Business Understanding, Customer-First Approach, Reliable & Scalable Delivery, each with an animated icon. Include the line: "We believe in building more than software — we build long-term partnerships, drive innovation and turn ideas into impactful digital experiences."
7. Global Presence: Dotted world map (SVG) with pulsing green markers on Canada and India and an animated line between them.
8. Contact: Split layout. A glass contact form (name, email, message) with validation, floating labels, animated focus glow, loading state and success message. Next to it: company email, location and social icons (placeholders).
9. Footer: Logo, quick links, "Think Global. Build Smart. Grow Together.", back-to-top button, "© 2026 PKC Solutions Inc."

## Animations (every section must have its own)
- Scroll-triggered reveals (fade, slide, scale, blur-in), once per element, with staggered children in grids.
- Hero: animated aurora, floating orbs, typing text.
- Animated gradient text and rotating gradient borders on cards.
- Count-up numbers, magnetic buttons, card tilt on hover, icon wiggle, glow that follows the cursor.
- Scroll progress bar at the top (green), page-load logo intro.
- A slow-scrolling marquee strip of service keywords between sections.
- Respect prefers-reduced-motion, and animate only transform and opacity for smooth performance.

## SEO
Title "PKC Solutions Inc. | Global Software Consulting & Technology Solutions", meta description, Open Graph tags, favicon, theme-color #000000.

## Production & Deployment

- **Official Website:** [https://pkcsolutionsinc.com](https://pkcsolutionsinc.com)
- **Framework:** TanStack Start, React 19, Vite, Tailwind CSS
- **Deployment Targets:** Cloudflare Pages, Vercel, Netlify

## Local Development

```sh
npm install
npm run dev
npm run build
npm run test
```
