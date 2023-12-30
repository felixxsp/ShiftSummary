import { App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

export function updateUpdatedAtOnUserUpdateHandler(app: App) {
  const db = getFirestore(app);
  // const functions = getFunctions(app)

  return onDocumentUpdated("users/{docId}", async function (ev) {
    const id = ev.params.docId;

    // KEYWORD: Idempotent, what does it mean to make an idempotent function

    const before = ev.data?.before.data();
    const after = ev.data?.after.data();
    console.log(before);
    console.log(after);

    {
      people: [
        {
          name: "Billy",
          age: 40,
        },
        {
          name: "Rio",
          age: 30,
        },
        {
          name: "Felix",
          age: 25,
        },
      ];
      average_age: 31.67;
    }

    // the bad way
    delete before?.updated_at;
    delete after?.updated_at;

    // Optional good way
    // const {updated_at, ...refinedBefore} = before ?? {};

    if (JSON.stringify(before) === JSON.stringify(after)) {
      console.log("No changes");
      return;
    }

    await db.collection("users").doc(id).update({
      updated_at: new Date(),
    });
  });
}
