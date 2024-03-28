const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export function getWeekDays(from?: Date) {
  const startDate = from ?? new Date(Date.now() - 6 * DAY_IN_MILLISECONDS);
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate.getTime() + i * DAY_IN_MILLISECONDS);
    weekDays.push(date);
  }
  return weekDays;
}

export function getWeekDayName(
  day: Date,
  locale: string,
  format: "long" | "short" | "narrow" = "short"
) {
  return day.toLocaleDateString(locale, { weekday: format });
}

export function getFirstDayOfWeek(date: Date, firstDayNumber: number) {
  const firstDayOfWeek = new Date(
    date.getTime() - ((7 - (firstDayNumber - 1)) % 7) * DAY_IN_MILLISECONDS
  );
  return firstDayOfWeek;
}
