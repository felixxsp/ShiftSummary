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