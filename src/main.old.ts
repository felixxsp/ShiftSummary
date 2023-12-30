// DEPRECATED WAY OF IMPORTING
// import * as firebase from "firebase-admin"

// MODULAR IMPORTS
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getUsers, insertUsers } from "./users/functions.old";

const app = initializeApp({
  credential: cert("service-account.json"),
});

const fs = getFirestore(app);

// These two are quite similar
// await for1second()
// console.log("Hello")
// -----------------------
// setTimeout(() => {
//     console.log('Hello')
// }, 1000)

async function badWork() {
  for (let i = 0; i < 100000000000000; i++) {}
}

// Keywords to remember
// 1. async = unblocking
// 2. sync = blocking = idle = waiting
// Javascript isn't multithreaded

// This will be queued

getUsers(fs);
insertUsers(fs, {
  name: "Billy",
  age: 40,
});
// DO NOT UNCOMMENT THIS
// badWork()
