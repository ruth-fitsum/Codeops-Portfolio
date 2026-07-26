# 9, Tip Calculator
bill_amount=int(input("Enter the bill amount: "))
tip_percentage=int(input("Enter the amount of tip percentage that you want to tip: "))
number_ppl=int(input("Enter the number of people who is gonna split the bill with: "))

def tip_amount_calc(bill_amount,tip_percentage): 
    return (bill_amount*tip_percentage)/100
tip_amount=tip_amount_calc(bill_amount,tip_percentage)

def total_bill_amount(tip_amount,bill_amount):
    return tip_amount + bill_amount
total_amount=total_bill_amount(tip_amount,bill_amount)

def amount_per_each(total_amount,number_ppl):
    return total_amount/number_ppl
each_person=amount_per_each(total_amount,number_ppl)

print(f""" 
Bill amount:{bill_amount} birr
Tip percentage:{tip_percentage}%
Tip amount:{tip_amount} birr
Total amount:{total_amount} birr
Number of people:{number_ppl}
Amount per people:{each_person} birr
""")

# 10, Simple Quiz Game
score=0
q1=input("Which part of africa is ethiopia found ? 'East' or 'West': ")  
if q1.lower()=='east':
    score +=1
    print("That was correct")
else:
    print("That is not right")

try:
    q2=input("What is 4 * 3: ")
    if int(q2) == 12:
        score +=1
        print("That was correct")
    elif int(q2)!= 12:
        print("That is not right")
except ValueError:
    print("You didn't enter a number") 

q3=input("What is the largest continent?'Asia' or 'Africa': " )
if q3.lower()=='asia':
    score +=1
    print("That was correct")
else:
    print("That is not right")

q4=input("What is color of Ethiopian flag in the middle? 'Yellow' or 'Black': ")
if q4.lower()=='yellow':
    score +=1
    print("That was correct")
else:
    print("That is not right")

q5=input("Is 5 even or odd?: ")  
if q5.lower=="odd":
    score +=1
    print("That was correct")
else:
    print("That is not right")
print(f"You have scored {score} points in total.")     

# 11, Function with Default & Return
# tax rate is given a 0.15  and discount being 0 as a default 
def calculate_final_price(price,tax_rate=0.15,discount=0):
    discounted_price=price-discount
    tax_amount=discounted_price*tax_rate
    final_price=discounted_price + tax_amount
    return (f"The final price will be {final_price} birr.")
calculate_final_price(100)
calculate_final_price(65,0.1,1)
# calculate_final_price(1000,,90)
# keyword argument 
calculate_final_price(1000,discount=90)



