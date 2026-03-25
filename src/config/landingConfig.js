export const LANDING_CONFIG = {
  // Base URL вашего API (например, "https://example.com/api").
  // Если пусто — используется mock-логика (для фронтенда без backend).
  apiBaseUrl: '',

  // Идентификатор мероприятия/лендинга в вашей БД.
  eventId: 'expo-landing_V1',

  endpoints: {
    event: (eventId) => `/events/${eventId}`,
    registration: () => `/registrations`,
  },

  assets: {
    // Фоллбек-картинка на случай, если API не вернул URL изображения.
    heroFallbackUrl: './assets/hero-photo.png',
  },
};

