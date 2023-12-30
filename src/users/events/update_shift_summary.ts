import { App } from "firebase-admin/app";
import { shiftSummary, newTransaction , transaction, source } from "../entity";
import { Transaction, getFirestore , Firestore} from "firebase-admin/firestore";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

const placeHolder : newTransaction = {
  methodName : 'cash',
  source : 'cash',
  balance : 75000
}

export function updateShiftSummaryOnTransaction(app: App) {
  const db = getFirestore(app);

  return onDocumentUpdated("transaction/{uuid}", async function (ev) {
    const id = ev.params.uuid;

    //some lines to get the credentials of the transaction

    const newTransaction : newTransaction = {
      methodName : placeHolder.methodName,
      source: placeHolder.source,
      balance : placeHolder.balance
    }

    const documentRef = db.collection("ShiftSummary").doc(id);
    const currentData = (await documentRef.get()).data() as shiftSummary;

    mainLoop: for (const [key, value] of currentData.transactions.entries()) {
      if (value.methodName == newTransaction.methodName) {
        for (const [key1, value1] of currentData.transactions[key].sources.entries()){
          if (value1.name == newTransaction.source) {
            currentData.transactions[key].sources[key1].amount++;
            currentData.transactions[key].sources[key1].total_balance += newTransaction.balance;
            break mainLoop
          } 
          else if (key1 == currentData.transactions[key].sources.length) {
            const source : source = {
              name: newTransaction.source,
              amount: 1,
              total_balance:newTransaction.balance
            }
            currentData.transactions[key].sources.push(source)
            break mainLoop
          }
        }
      } 
      else if (key == currentData.transactions.length-1) {
        const source : source = {
          name: newTransaction.source,
          amount: 1,
          total_balance:newTransaction.balance
        }
        const input : transaction = {
          methodName : newTransaction.methodName,
          sources: [source]
        }
        currentData.transactions.push(input)
      }
    }

  documentRef.update(currentData);

  console.log(`Document upserted successfully`);
  })
    
    // if (JSON.stringify(before) === JSON.stringify(after)) {
    //   console.log("No changes");
    //   return;
    // }

    // await db.collection("ShiftSummary").doc(id).update({
    //   updated_at: new Date(),
    // });
  // });
}
