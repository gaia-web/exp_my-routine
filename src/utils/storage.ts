import { Storage } from "@ionic/storage";

export const appStorage = await new Storage({
  name: "app-storage",
}).create();
