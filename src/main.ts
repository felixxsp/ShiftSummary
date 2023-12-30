import { initializeApp } from "firebase-admin/app";
import { updateShiftSummaryOnTransaction } from "./users/events/update_shift_summary";
import { setGlobalOptions } from "firebase-functions/v2/options";

const app = initializeApp();

setGlobalOptions({ maxInstances: 10 });

export const updateUpdatedAtOnUserUpdate =
  updateShiftSummaryOnTransaction(app);
