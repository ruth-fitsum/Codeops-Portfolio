//  1

const prices=[35,67,89,789];

// map
const mappedPrices=prices.map(p=>p*1.15);

// filter
const filteredPrices=prices.filter(p=>p<1000);

// reduce
const total =prices.reduce((sum,p)=>sum+p,0);

// 2
const customer={
    name:"Abebe",
    city:"Addis Ababa",
    balance:1000
}

for (const info of Object.entries(customer)){
    console.log(info)
}


// 3

const [name,age]=customer;

function greet({ name }) {
  console.log(`Hello, ${name}!`);
}

greet(customer);

// 4
const updatedCustomer={
    ...customer,
    city:"Hawassa",
    phone:"+2519876543"
}