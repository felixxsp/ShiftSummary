import { App } from "firebase-admin/app";
import { newPayment, payment,  src } from "../entity";
import { Transaction, getFirestore , Firestore} from "firebase-admin/firestore";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import { methodMap, sourceMap } from "../map";

export function updateShiftSummaryOnTransaction(app: App) {
    const db = getFirestore(app);
  
    return onDocumentUpdated("transaction/{uuid}", async function (ev) {
      const id = ev.params.uuid;
  
      //some lines to get the credentials of the transaction
      var newData : newPayment = {
        uuid :'e381e4ca-8950-408e-967f-0b78ff7f374e',
        methodID : 1,
        sourceID : 2,
        time : Date.now(),
        amount : 69000
      }
      //end of credentials

      const documentRef = db.collection("payements").doc();
      const currentData = (await documentRef.get()).data() as payment;

      const newSrc : src = {
        methodID : newData.methodID,
        methodName : methodMap.get(newData.methodID)!,
        uuid : newData.uuid,
        sourceID : newData.sourceID,
        sourceName : sourceMap.get(newData.sourceID)!,
        time : newData.time,
        transactionAmount : newData.amount
      }

      currentData.transactions[newData.methodID][newData.sourceID].push(newSrc)
      documentRef.update(currentData);

      console.log(`Document upserted successfully`);
    })
}