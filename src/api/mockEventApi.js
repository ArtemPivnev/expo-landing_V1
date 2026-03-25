import { DEFAULT_EVENT_DATA } from '../content/defaultEventData.js';

export async function mockFetchEventData(_config) {
  // В реальном проекте здесь будет логика мокирования по eventId.
  // Сейчас просто возвращаем дефолтные данные.
  await new Promise((r) => setTimeout(r, 200));
  return structuredClone(DEFAULT_EVENT_DATA);
}

export async function mockSubmitRegistration(_payload) {
  // Имитируем успешную отправку на сервер.
  await new Promise((r) => setTimeout(r, 1200));
  return { ok: true };
}

