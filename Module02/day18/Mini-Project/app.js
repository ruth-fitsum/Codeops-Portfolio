import { transactions } from "./transactions.js";

import {
    totalByType,
    formatReceipts,
    correctTransaction
} from "./report.js";


console.log("=== TeleBirr Transaction Report ===");

console.log(
    `Total Credits: ${totalByType(transactions, "credit")} ETB`
);

console.log(
    `Total Debits: ${totalByType(transactions, "debit")} ETB`
);


console.log("\n=== Receipts ===");

const receipts = formatReceipts(transactions);

receipts.forEach(receipt => {
    console.log(receipt);
});


console.log("\n=== Corrected Transaction ===");

const corrected = correctTransaction(transactions[0], 300);

console.log(corrected);

console.log("\n=== Original Transaction ===");

console.log(transactions[0]);