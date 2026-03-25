import { LANDING_CONFIG } from "./config/landingConfig.js";
import { fetchEventData, submitRegistration } from "./api/eventApi.js";
import { DEFAULT_EVENT_DATA } from "./content/defaultEventData.js";
import { renderLanding } from "./components/renderLanding.js";
import { initRegistrationForm } from "./components/registrationForm.js";
import { initSmoothScroll } from "./components/smoothScroll.js";

function safeInit(viewModel) {
  const config = window.__LANDING_CONFIG__ || LANDING_CONFIG;
  renderLanding(viewModel);
  initSmoothScroll({ headerOffset: 92 });

  initRegistrationForm({
    submitRegistration: (payload) =>
      submitRegistration({
        apiBaseUrl: config.apiBaseUrl,
        endpoints: config.endpoints,
        eventId: config.eventId,
        payload,
      }),
    strings: viewModel.registration,
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const eventIdFromQuery = params.get("eventId");
    const config = eventIdFromQuery
      ? { ...LANDING_CONFIG, eventId: eventIdFromQuery }
      : LANDING_CONFIG;
    const viewModel = await fetchEventData(config);
    window.__LANDING_CONFIG__ = config;
    safeInit(viewModel);
  } catch (e) {
    // Если API недоступен — показываем дефолт.
    // Консоль оставляем для диагностики.
    console.error(e);
    safeInit(DEFAULT_EVENT_DATA);
  }
});
