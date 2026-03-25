export function normalizeInn(value) {
  return String(value || '').replace(/\s+/g, '');
}

export function validateInn(value) {
  const inn = normalizeInn(value);
  if (!inn) return 'Поле обязательно для заполнения.';
  if (!/^\d{10}$|^\d{12}$/.test(inn)) {
    return 'Введите ИНН из 10 или 12 цифр (только числа).';
  }
  return null;
}

export function validateRequiredText(value, fieldLabel) {
  const v = String(value || '').trim();
  if (!v) return `Поле «${fieldLabel}» обязательно для заполнения.`;
  return null;
}

export function validateEmail(value) {
  const v = String(value || '').trim();
  if (!v) return 'Поле обязательно для заполнения.';
  // Базовая валидация формата email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(v)) return 'Введите корректный email (например, name@company.ru).';
  return null;
}

