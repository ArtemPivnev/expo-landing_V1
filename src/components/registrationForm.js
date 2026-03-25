import {
  validateEmail,
  validateInn,
  validateRequiredText,
} from '../lib/validators.js';

function $(id) {
  return document.getElementById(id);
}

function setHidden(el, hidden) {
  if (!el) return;
  el.hidden = Boolean(hidden);
}

function updateFieldError(input, errorEl, message) {
  if (!input || !errorEl) return;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  errorEl.textContent = message || '';
  setHidden(errorEl, !message);
}

export function initRegistrationForm({ submitRegistration, strings }) {
  const form = $('registration-form');
  const notice = $('form-notice');
  const submitBtn = $('submit-btn');

  if (!form || !notice || !submitBtn) return;

  const innInput = $('inn');
  const companyInput = $('company');
  const nameInput = $('name');
  const emailInput = $('email');

  const fields = {
    inn: { input: innInput, errorEl: $('inn-error') },
    company: { input: companyInput, errorEl: $('company-error') },
    name: { input: nameInput, errorEl: $('name-error') },
    email: { input: emailInput, errorEl: $('email-error') },
  };

  let isSubmitting = false;
  let isSuccess = false;

  function getFormPayload() {
    const inn = String(fields.inn.input?.value || '').replace(/\s+/g, '');
    const company = String(fields.company.input?.value || '').trim();
    const name = String(fields.name.input?.value || '').trim();
    const email = String(fields.email.input?.value || '').trim();
    return { inn, company, name, email };
  }

  function hasAnyValue(payload) {
    return Object.values(payload).some((v) => String(v || '').trim().length > 0);
  }

  function computeSubmitDisabled() {
    const payload = getFormPayload();
    const hasData = hasAnyValue(payload);

    // После успешной отправки кнопка неактивна, пока пользователь не начнет новый ввод.
    if (isSuccess) return !hasData;
    return isSubmitting;
  }

  function setSubmitDisabled(disabled) {
    submitBtn.disabled = Boolean(disabled);
  }

  function clearNotice() {
    notice.textContent = '';
    setHidden(notice, true);
  }

  function showNotice(message) {
    notice.textContent = message;
    setHidden(notice, false);
    if (!notice.hasAttribute('tabindex')) notice.setAttribute('tabindex', '-1');
    notice.focus();
  }

  const inputs = Object.values(fields).map((f) => f.input).filter(Boolean);
  for (const input of inputs) {
    input.addEventListener('input', () => {
      if (isSuccess) {
        isSuccess = false;
        clearNotice();
      }
      setSubmitDisabled(computeSubmitDisabled());
    });

    input.addEventListener('blur', () => {
      if (input === innInput) updateFieldError(innInput, fields.inn.errorEl, validateInn(input.value));
      if (input === companyInput)
        updateFieldError(companyInput, fields.company.errorEl, validateRequiredText(input.value, 'Название компании'));
      if (input === nameInput)
        updateFieldError(nameInput, fields.name.errorEl, validateRequiredText(input.value, 'ФИО представителя'));
      if (input === emailInput)
        updateFieldError(emailInput, fields.email.errorEl, validateEmail(input.value));
    });
  }

  setSubmitDisabled(false);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    clearNotice();
    setHidden(notice, true);

    const innMsg = validateInn(innInput.value);
    const companyMsg = validateRequiredText(companyInput.value, 'Название компании');
    const nameMsg = validateRequiredText(nameInput.value, 'ФИО представителя');
    const emailMsg = validateEmail(emailInput.value);

    updateFieldError(innInput, fields.inn.errorEl, innMsg);
    updateFieldError(companyInput, fields.company.errorEl, companyMsg);
    updateFieldError(nameInput, fields.name.errorEl, nameMsg);
    updateFieldError(emailInput, fields.email.errorEl, emailMsg);

    const isValid = !innMsg && !companyMsg && !nameMsg && !emailMsg;
    if (!isValid) {
      const firstError = [fields.inn, fields.company, fields.name, fields.email].find(
        (f) => f.errorEl && !f.errorEl.hidden
      );
      firstError?.input?.focus?.();
      return;
    }

    const payload = getFormPayload();
    isSubmitting = true;
    setSubmitDisabled(true);

    try {
      await submitRegistration(payload);
      isSuccess = true;
      showNotice(strings.success);

      form.reset();
      // После сброса скрываем ошибки
      updateFieldError(innInput, fields.inn.errorEl, null);
      updateFieldError(companyInput, fields.company.errorEl, null);
      updateFieldError(nameInput, fields.name.errorEl, null);
      updateFieldError(emailInput, fields.email.errorEl, null);

      setSubmitDisabled(true);
    } catch {
      showNotice(strings.error);
    } finally {
      isSubmitting = false;
      setSubmitDisabled(computeSubmitDisabled());
    }
  });
}

