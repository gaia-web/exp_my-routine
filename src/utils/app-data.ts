import { STORAGE_KEYS } from "./constant";
import { appStorage } from "./storage";

export type RoutineRecord = {
  date: Date;
  value?: number;
  notes?: string;
};

export type Routine = {
  name: string;
  records: RoutineRecord[];
};

export type AppData = {
  routines: Routine[];
};

export const INITIAL_APP_DATA: AppData = {
  routines: [],
};

export async function initializeAppData() {
  const appData = await appStorage.get(STORAGE_KEYS.APP_DATA);
  if (!appData) {
    await appStorage.set(STORAGE_KEYS.APP_DATA, INITIAL_APP_DATA);
  }
}
