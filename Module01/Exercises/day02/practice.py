# 1, Temperature Label

temp=int(input("Enter a temperature in Celsius (°C)"))
if temp >15:
    print("cold")
elif temp <=15 and temp >=28:
    print("warm")
else:
    print("hot")


# 2, Receipt numbers

for i in range(1,11):
    print(f"Receipt #{i}")

# 3, Even numbers

for i in range(1,21):
    if i %2==0:
        print(i)

# 4, Discount function

def apply_discount(price,percent=10):
    discount_amount=price*(percent/100)
    price -= discount_amount
    return price

# Trial 1
original_price1=100
print(f"The price has gone down from {original_price1} ETB to {apply_discount(original_price1)} ETB")

# Trial 2
original_price2=3000
discount_percent=20
print(f"The price has gone down from {original_price2} ETB to {apply_discount(original_price2,discount_percent)} ETB")

# 5, Countdown

i=5
while i>0:
    print(i)
    i-=1
print("Liftoff!")