import { Timestamp } from "firebase-admin/firestore";

export type shiftSummary = {
    uuid        : string;
    start_time  : number;
    start_cash  : number;
    end_time    : number;
    end_cash    : number;
    expectedDif : number;
    actualDif   : number;
    transactions: transaction[];
}

export type newTransaction = {
    methodName  : string;
    source : string;
    balance : number;
} 

export type transaction = {
    methodName  : string;
    sources     : source[];
}

export type source = {
    name            : string;
    amount          : number;
    total_balance   : number;
}

export type newPayment = {
    uuid     : string;
    methodID : number;
    sourceID : number;
    amount   : number;
    time     : number;
}

export type payment = {
    transactions    : src[][][]
}

export type src = {
    uuid                : string;
    methodName          : string;
    methodID            : number;
    sourceName          : string;
    sourceID            : number;
    time                : number;
    transactionAmount   : number;
}