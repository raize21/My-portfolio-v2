const P = [
 {t:"Kingdom of Words",c:"personal",img:"https://i.ibb.co/QF8FhRxV/kow.jpg",d:"A 2D RPG for learning French. Explore dungeons, battle enemies with vocabulary and unlock the story. Built as my WVSU capstone.",gh:"Kingdom-of-Words-A-2D-RPG-Game-For-Learning-French-Language"},
 {t:"Bakeshop Sales & Inventory",c:"personal",img:"asset/image/bake.png",d:"POS and inventory system for small bakeshops with real-time stock, sales reports and role-based access.",live:"https://baketally.infinityfreeapp.com/"},
 {t:"WanderLust Travel",c:"personal",d:"Responsive travel booking site with animated sections, a destination gallery and a multi-step reservation flow.",gh:"Travel-Website-WanderLust",live:"https://wander-lust-one-chi.vercel.app/"},
 {t:"Animax Gallery",c:"personal",d:"Anime wallpaper gallery with an organized layout and easy browsing for fans.",gh:"Anime-Website",live:"https://animax-gallery.vercel.app/",prev:"https://animax-gallery.vercel.app/Jujutsu3d/index.html"},
 {t:"Comfort Room Utilization Report System",c:"personal",d:"Web system for monitoring comfort room usage, with separate checker and admin access and centralized reports.",gh:"Comfort-Room-Utilization-Report-System",live:"https://comfort-room-utilization-report-sys.vercel.app/"},
 {t:"J.A BarberShop",c:"personal",d:"Business website with services, prices, reviews and online appointment booking.",gh:"BarberShop",live:"https://barber-shop-one-nu.vercel.app/"},
 {t:"Zee Rodriguez",c:"client",d:"Portfolio for business operations, social media, web management and AI automation support.",gh:"Zee.Rodrigue-Portfolio",live:"https://zee-rodriguez-portfolio.vercel.app/"},
 {t:"Josielyn Rosalejos",c:"client",d:"Portfolio for customer service, lead generation, telesales and virtual assistance.",gh:"JOSIELYN-ROSALEJOS-PORTOFLIO",live:"https://josielyn-rosalejos.vercel.app/"},
 {t:"Archie Sarmiento",c:"client",d:"Developer portfolio covering HTML, CSS, JavaScript, PHP, MySQL and Node.js.",gh:"Archie-Sarmiento",live:"https://archie-sarmiento-portfolio.vercel.app/"},
 {t:"Diether Ang",c:"client",d:"Portfolio for customer service, e-commerce support, healthcare assistance and escalation management.",gh:"Diether-Ang-portfolio",live:"https://diether-ang-portfolio.vercel.app/"},
 {t:"Ghein",c:"client",d:"Personal portfolio presenting skills, creative work and completed projects.",gh:"Christel-Ghein-Reginio-Portfolio",live:"https://ghein-portfolio.vercel.app/"},
 {t:"Kervel Sobrevilla",c:"client",d:"Portfolio for social media management, digital marketing, graphic design and video editing.",gh:"portfolio-kervel",live:"https://kervel-sobrevilla-portfolio.vercel.app/"},
 {t:"Abigail Malinit",c:"client",d:"Portfolio for virtual assistance, administrative support and workflow automation.",gh:"abigail-malinit-portfolio",live:"https://abigail-malinit-portfolio.vercel.app/"},
 {t:"Jairus Cruz",c:"client",d:"Personal site showcasing technical skills, creative projects and professional development.",gh:"Jairus-Cruz-Portfolio",live:"https://jairus-cruz-portfolio.vercel.app/"},
 {t:"Mark Jenzer",c:"client",d:"Portfolio for virtual assistance, executive support, graphic design and music education.",gh:"Mark-Jenzer-Portfolio",live:"https://mark-jenzer-portfolio.vercel.app/"},
 {t:"Maria Kathryn Armenta",c:"client",d:"Portfolio for digital marketing, social media, lead generation and property management.",gh:"Maria-Kathryn-portfolio",live:"https://maria-kathryn-armenta-portfolio.vercel.app/"}
];
const esc = s => s.replace(/&/g,"&amp;");
const grid = document.getElementById("grid");
grid.innerHTML = P.map(p => {
  const src = p.prev || p.live;
  const shot = p.img ? `<img src="${p.img}" alt="${esc(p.t)} screenshot" loading="lazy">`
    : `<iframe data-src="${src}" title="${esc(p.t)} preview" tabindex="-1" loading="lazy"></iframe>`;
  const links = (p.gh ? `<a class="pb gh" href="https://github.com/raize21/${p.gh}" target="_blank" rel="noopener noreferrer">GitHub</a>` : "")
    + (p.live ? `<a class="pb live" href="${p.live}" target="_blank" rel="noopener noreferrer">Live demo</a>` : "");
  return `<article class="card" data-c="${p.c}"><div class="shot">${shot}</div><div class="body"><h3>${esc(p.t)}</h3><p>${p.d}</p><div class="pbs">${links}</div></div></article>`;
}).join("");
document.getElementById("count").textContent = P.length;

// scale iframes to fit their frame; load them only when near the viewport
const fit = el => { const f = el.querySelector("iframe"); if (f) f.style.transform = `scale(${el.clientWidth / 1280})`; };
const ro = new ResizeObserver(es => es.forEach(e => fit(e.target)));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const f = e.target.querySelector("iframe");
  if (f && !f.src) f.src = f.dataset.src;
  io.unobserve(e.target);
}), {rootMargin: "300px"});
document.querySelectorAll(".shot").forEach(s => { ro.observe(s); io.observe(s); });

// filters
document.querySelectorAll(".chip").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".chip").forEach(x => x.classList.toggle("active", x === b));
  document.querySelectorAll(".card").forEach(c => c.hidden = b.dataset.f !== "all" && c.dataset.c !== b.dataset.f);
}));

// role typer (static text if reduced motion)
const words = ["websites", "business systems", "capstone projects", "2D games"];
const el = document.getElementById("typed");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let w = 0, i = 0, del = false;
  (function tick() {
    const full = words[w];
    el.textContent = full.slice(0, i);
    i += del ? -1 : 1;
    let wait = del ? 40 : 90;
    if (!del && i > full.length) { del = true; wait = 1400; }
    else if (del && i < 0) { del = false; i = 0; w = (w + 1) % words.length; wait = 300; }
    setTimeout(tick, wait);
  })();
}

// nav shadow + active link
const nav = document.querySelector(".nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 20), {passive: true});
const links = [...document.querySelectorAll(".nav nav a")];
const so = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
}), {rootMargin: "-45% 0px -50% 0px"});
document.querySelectorAll("main section[id]").forEach(s => so.observe(s));
