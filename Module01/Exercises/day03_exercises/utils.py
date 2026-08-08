def add_tax(price,rate=0.15):
    tax_amount=price*rate
    price_tax=price+tax_amount
    print(f"Your total price has become {price_tax} Birr.")
    
