import { Temporal } from "@js-temporal/polyfill";

export function getWeekDays() {
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const date = Temporal.Now.plainDateISO().add({ days: -i });
    weekDays.unshift(date);
  }
  return weekDays;
}

export function getWeekDayName(day: Temporal.PlainDate, locale: string) {
  return day.toLocaleString(locale, { weekday: "short" });
}
