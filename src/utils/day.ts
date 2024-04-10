import { Temporal } from "@js-temporal/polyfill";

export function getWeekDays(from?: Temporal.PlainDate) {
  const startDate = from ?? Temporal.Now.plainDateISO().add({ days: -6 });
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const date = startDate.add({ days: i });
    weekDays.push(date);
  }
  return weekDays;
}

export function getWeekDayName(
  day: Temporal.PlainDate,
  locale: string,
  format: "long" | "short" | "narrow" = "short"
) {
  return day.toLocaleString(locale, { weekday: format });
}

export function getFirstDayOfWeek(
  date: Temporal.PlainDate,
  firstDayNumber: number
) {
  const firstDayOfWeek = date.add({
    days: -1 * ((7 + date.dayOfWeek - firstDayNumber) % 7),
  });
  return firstDayOfWeek;
}
