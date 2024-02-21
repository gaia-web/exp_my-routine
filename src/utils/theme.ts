import { STORAGE_KEYS } from "./constant";
import { appStorage } from "./storage";

const mediaPrefersDarkScheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
);
mediaPrefersDarkScheme.addEventListener("change", () => updateTheme());

export const updateTheme = async () => {
  const currentThemeType =
    (await appStorage.get(STORAGE_KEYS.THEME_TYPE)) ?? "system";
  let isDark = mediaPrefersDarkScheme.matches;
  if (currentThemeType !== "system") {
    isDark = currentThemeType === "dark";
  }
  document.body.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
};
