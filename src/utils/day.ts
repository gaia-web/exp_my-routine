export function getWeekDays() {
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    weekDays.unshift(date);
  }
  return weekDays;
}

export function getWeekDayName(day: Date, locale: string) {
  return day.toLocaleDateString(locale, { weekday: "short" });
}
