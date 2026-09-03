// 1

function vat(amount,rate=0.15){
    return amount*rate;
}

const vat= (amount,rate=0.15)=>amount * rate;

// 2

function makeCounter(){
    // it can be accessed from the public it will be hidden here 
    let count=0;
    // this is the closure
    return function(){
        count ++;
        return count;
    }
}

const counter1=makeCounter();
// we call it as an actual function here because it still holds the inner function(closure)
console.log(counter1());
console.log(counter1());
console.log(counter1());
console.log(counter1()); // it should be 4 here 


// 3
// function Factory here

function discountBy(rate){
    // here we will have an arrow function that will be come true after the specializiation is made using the rate 
    // since it's a discount we are going to find the price value after the discount
    // return because it will be need as a function that for a specific rate but different prices 
    return price => price *(1-rate)
}

const memberPrice=discountBy(0.1);
const saleprice=discountBy(0.3);

// test 
// I forgot $ here - a mistake to remember
console.log(`The price of a 1000 ETB object for a member is ${memberPrice(1000)}`)
console.log(`The price of a 1000 ETB object for a sale is ${salePrice(1000)}`)

// 4
function applyToAll(list,fn){
    const result=[];
    for (let i ; i<=list.length;i++){
        // returns a function so it's a higher order function
        result.push(fn(list[i]));
    }
    return result;
}

//  time to define the fn in our case it's a addVAT
const addVAT= (price, rate=0.15)=> price *(1+rate);

//  let's create the list of price here 
 const price =[24,36,90,678];

// let's call the higher function here 
// applyToAll() returns an array so we need a variable that holds it 

const priceWithVAT= applyToAll(price,addVAT);

console.log(`Original Price : ${price}`)
console.log(`Price with VAT: ${priceWithVAT}`)


// 5

function forEachCity (cities, action){
    // for (const c of cities){ wanted to have the index number here 
    for (let i=0 ; i <cities.length; i++){
        // a callback
        action(cities[i],i);
    }
}

// calling the forEachCity

forEachCity(["Addis Ababa","Hawassa","Bahirdar","Gambella"],(city,index)=>console.log(`${index+1}. {city}`));
