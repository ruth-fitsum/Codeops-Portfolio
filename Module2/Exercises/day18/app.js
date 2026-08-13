// 1, Map

const prices=[340,670,9000,460,890];
const total=prices
        .map(p=>p*1.15)
        .filter(p=>p<1000)
        .reduce((sum,p)=>sum +p,0);

// 2, Object 

const customer={
    name:"Abebe",
    city:"Addis Ababa",
    balance:789,
};
// object enteries change the key value pairs in to an array 

for (const [key, value] of Object.entries(customer)) {
  console.log(key, value);
};

// 3, Destructuring an object 

const {name,city}=customer;

function greet ({name}){
  console.log(`Hi,${name}`);
};

// test
greet({name});

// 4, Update a customer Object and adding a new key - using spread

// update
const update ={...customer,city:"Hawassa"};
// adding
const withPhone={...customer,phone:"0912345678"};

// 5, Export and Import

import format, {withVat,VAT} from './money.js';

format(withVat(480));