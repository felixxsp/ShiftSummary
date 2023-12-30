import { initializeApp } from "firebase-admin/app";
import { updateUpdatedAtOnUserUpdateHandler } from "./users/events/updated-at-handler";
import { setGlobalOptions } from "firebase-functions/v2/options";

const app = initializeApp();

setGlobalOptions({ maxInstances: 10 });

export const updateUpdatedAtOnUserUpdate =
  updateUpdatedAtOnUserUpdateHandler(app);
