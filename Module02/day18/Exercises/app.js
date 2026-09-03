import addVat,{VAT} from "./money";

const itemPrice = 500;
const priceWithVat = addVat(itemPrice);

console.log(`VAT Rate: ${VAT * 100}%`);
console.log(`Total Price: ${priceWithVat} ETB`);