function createLoyalty(earnRule = etb => Math.floor(etb / 10)) {
    let points = 0; // private state (closure)
    return {
        earn(etb) { points += earnRule(etb); }, // HOF: rule passed in
        redeem(p) { points = Math.max(0, points - p); },
        balance() { return points; },
    };
}

const card = createLoyalty();
card.earn(250); // +25 points
card.redeem(10);
console.log(card.balance()); // 15

// holiday rule: double points
const holiday = createLoyalty(etb => Math.floor(etb / 10) * 2);