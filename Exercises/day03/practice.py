# 1, Unique Cities

cities=["New York","Kingston","Hawassa","Venice","Addis Ababa","Venice","Rio de Janeiro","Kingston"]
unique_cities=set(cities)
print(f"Unique cities {unique_cities}")
print(f"The total number of cities {len(unique_cities)}")

# 2, Price report

products={"shiro":145,"tefe":200,"oil":300,"bread":15,"yogurt":100}
for product,price in products.items():
    print(f"{product}:{price}ETB")

# 3, Tax comprehension

prices = [100, 250, 400, 80]
price_tax=[price*1.15 for price in prices]

# 4, Cheap items

price_under=[price for price in prices if price < 200]

# 5, Write & read

with open("names.txt") as names:
    for name in names:
        print(name.strip())

# 6, Safe division

try:
    num=int(input("Enter a number: "))
    num_div=1000/num
except ValueError:
    print("You didn't enter a number.")
except ZeroDivisionError:
    print("Your number has to be different from 0.")
else:
    print(num_div)
finally:
    print("Division has ended.")




      
   