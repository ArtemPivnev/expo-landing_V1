function $(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const el = $(id);
  if (!el) return;
  el.textContent = value ?? '';
}

function setHref(id, value) {
  const el = $(id);
  if (!el) return;
  el.setAttribute('href', value || '#');
}

export function renderLanding(viewModel) {
  // 1) Шапка/подвал
  setText('brand-name', viewModel.brandName);
  setText('footer-company-name', viewModel.companyName);
  setText('footer-year', String(viewModel.footer?.year ?? new Date().getFullYear()));

  // 2) Герой
  setText('event-eyebrow', viewModel.event.eyebrow);
  setText('event-title', viewModel.event.title);
  setText('event-description', viewModel.event.description);
  setText('event-date', viewModel.event.date);
  setText('event-location', viewModel.event.location);
  setText('event-format', viewModel.event.format);
  setText('event-image-caption', viewModel.event.caption);

  const img = $('event-image');
  if (img) {
    img.src = viewModel.heroImage?.url || './assets/hero-photo.png';
    if (viewModel.heroImage?.alt) img.alt = viewModel.heroImage.alt;
  }

  // 3) Блок о мероприятии
  setText('about-title', viewModel.about.title);
  setText('about-subtitle', viewModel.about.subtitle);
  setText('who-text', viewModel.about.whoText);
  setText('why-text', viewModel.about.whyText);

  const valueList = $('value-list');
  if (valueList) {
    valueList.innerHTML = '';
    for (const item of viewModel.about.valueList || []) {
      const li = document.createElement('li');
      li.textContent = item;
      valueList.appendChild(li);
    }
  }

  // 4) Форма
  setText('form-subtitle', viewModel.registration.subtitle);
  setText('form-hint', viewModel.registration.hint);
  setText(
    'form-contact',
    `${viewModel.registration.contact.email} · ${viewModel.registration.contact.phone}`
  );

  setText('footer-email', viewModel.registration.contact.email);
  setHref('footer-email', `mailto:${viewModel.registration.contact.email}`);
  setText('footer-phone', viewModel.registration.contact.phone);
  setHref('footer-phone', `tel:${viewModel.registration.contact.phone.replace(/[^\d+]/g, '')}`);
}

