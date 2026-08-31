/* =================================================================
   Render logic — no necesitas tocar este archivo para personalizar
   una tarjeta, solo edita data.js
================================================================= */

const ICONS = {
  whatsapp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1.3-4.1A8 8 0 1 1 8.6 19L4 20Z"/><path d="M9 10.5c.3 1.8 2.2 3.7 4 4"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none"/></svg>`,
  catalog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7l1.5-3h11L19 7"/><path d="M4.5 7h15v11a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V7Z"/><path d="M9 11a3 3 0 0 0 6 0"/></svg>`,
  payment: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="M3.5 10h17"/><path d="M7 14.2h3"/></svg>`,
  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>`,
  reviews: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.9-5.2-2.7-5.2 2.7 1-5.9-4.3-4.1 5.9-.9L12 3.5Z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 14.5l5-5"/><path d="M13.2 8.3l1.4-1.4a3 3 0 1 1 4.2 4.2l-1.9 1.9"/><path d="M10.8 15.7l-1.4 1.4a3 3 0 1 1-4.2-4.2l1.9-1.9"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`
};

function initials(name){
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() || "")
    .join("");
}

function buildRow(link){
  const icon = ICONS[link.type] || ICONS.link;

  if (link.type === "whatsapp"){
    const msg = encodeURIComponent(link.message || "");
    const href = `https://wa.me/${link.phone}${msg ? `?text=${msg}` : ""}`;
    return rowLink(href, icon, link.label, null);
  }

  if (link.type === "instagram"){
    return rowLink(link.url, icon, link.label, link.handle);
  }

  if (link.type === "payment"){
    return rowPayment(link, icon);
  }

  // catalog / location / reviews / genérico
  return rowLink(link.url, icon, link.label, link.sub);
}

function rowLink(href, iconSvg, label, sub){
  const a = document.createElement("a");
  a.className = "row";
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener";
  a.innerHTML = `
    <span class="row__icon">${iconSvg}</span>
    <span class="row__label">${label}${sub ? `<span class="row__sub">${sub}</span>` : ""}</span>
    <span class="row__chevron">${ICONS.chevron}</span>
  `;
  return a;
}

function rowPayment(link, iconSvg){
  const wrapper = document.createDocumentFragment();

  const btn = document.createElement("button");
  btn.className = "row";
  btn.type = "button";
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = `
    <span class="row__icon">${iconSvg}</span>
    <span class="row__label">${link.label}</span>
    <span class="row__chevron">${ICONS.chevron}</span>
  `;

  const panel = document.createElement("div");
  panel.className = "panel";
  const inner = document.createElement("div");
  inner.className = "panel__inner";

  (link.methods || []).forEach(m => {
    const row = document.createElement("div");
    row.className = "method";
    row.innerHTML = `
      <span class="method__text">
        <span class="method__name">${m.name}</span>
        <span class="method__value">${m.value}</span>
      </span>
      <button class="method__copy" type="button">Copiar</button>
    `;
    row.querySelector(".method__copy").addEventListener("click", async (e) => {
      const b = e.currentTarget;
      try{
        await navigator.clipboard.writeText(m.value);
        b.textContent = "Copiado";
        b.classList.add("is-copied");
        setTimeout(() => { b.textContent = "Copiar"; b.classList.remove("is-copied"); }, 1500);
      }catch(err){ /* clipboard no disponible, se ignora */ }
    });
    inner.appendChild(row);
  });

  panel.appendChild(inner);

  btn.addEventListener("click", () => {
    const open = panel.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });

  wrapper.appendChild(btn);
  wrapper.appendChild(panel);
  return wrapper;
}

function renderCard(data){
  document.title = `${data.name}${data.role ? " · " + data.role : ""}`;

  const avatarEl = document.getElementById("avatar");
  if (data.avatar){
    avatarEl.style.backgroundImage = `url(${data.avatar})`;
  } else {
    avatarEl.textContent = initials(data.name);
  }

  document.getElementById("name").textContent = data.name;
  document.getElementById("role").textContent = data.role || "";
  document.getElementById("footText").textContent = data.footerText || "";

  const linksEl = document.getElementById("links");
  linksEl.innerHTML = "";
  (data.links || []).forEach(link => linksEl.appendChild(buildRow(link)));

  const card = document.getElementById("card");
  requestAnimationFrame(() => card.classList.add("is-ready"));
}

function initGate(data){
  const gate = document.getElementById("gate");
  const form = document.getElementById("gateForm");
  const input = document.getElementById("gateInput");
  const error = document.getElementById("gateError");
  const stage = document.querySelector(".stage");

  const sessionKey = `card_unlocked_${data.name}`;
  if (sessionStorage.getItem(sessionKey) === "1"){
    return true; // ya se desbloqueó en esta sesión
  }

  stage.style.display = "none";
  gate.hidden = false;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value === data.password){
      sessionStorage.setItem(sessionKey, "1");
      gate.hidden = true;
      stage.style.display = "";
      renderCard(data);
    } else {
      error.hidden = false;
      input.value = "";
      input.focus();
    }
  });

  return false;
}

// ---- Arranque ----
document.addEventListener("DOMContentLoaded", () => {
  if (typeof CARD === "undefined"){
    console.error("No se encontró CARD en data.js");
    return;
  }

  // if (CARD.password){
  //   const unlocked = initGate(CARD);
  //   if (!unlocked) return; // el render pasa cuando se desbloquea
  // }

  renderCard(CARD);
});
