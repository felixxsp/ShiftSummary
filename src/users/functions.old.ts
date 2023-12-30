import { Firestore } from "firebase-admin/firestore";

// It's a task or a job that will be queued
export async function getUsers(fs: Firestore) {
  const result = await fs.collection("users").get();
  const data = result.docs;

  //   console.log(data);
  //   for (const doc of data) {
  // console.log(doc.data());
  //   }
}

function sleep(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
}

// This is a bad way because we're writing twice
// export async function insertUsers(
//   fs: Firestore,
//   data: { name: string; age: number }
// ) {
//   const resultOfTheInsert = await fs.collection("users").add({
//     name: data.name,
//     age: data.age,
//   });

//   await sleep(5);

//   const idOfDoc = resultOfTheInsert.id;
//   await resultOfTheInsert.update({
//     id: idOfDoc,
//   });
// }

// Better way
export async function insertUsers(
  fs: Firestore,
  data: { name: string; age: number }
) {
  const documentRef = fs.collection("users").doc();

  console.log("I HAVE THE DOC REFERENCE", documentRef.id);
  await sleep(5);

  await documentRef.set({
    ...data, // KEYWORD: spread operator
    id: documentRef.id,
  });
}
