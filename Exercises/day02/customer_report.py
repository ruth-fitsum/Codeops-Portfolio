customers = [
 ("Almaz", 1500), ("Dawit", 700), ("Tigist", 200),
 ("Hanna", 1200), ("Samuel", 450),
]

def tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    else:
        return "Basic"

premium_count=0
standard_count=0
basic_count=0

for name, balance in customers:
    print(f"{name}: {tier(balance)} ({balance} ETB)")
    if tier(balance)=="Premium":
        premium_count += 1
    elif tier(balance)=="Standard":
        standard_count += 1
    else:
        basic_count += 1

print(f"There are {premium_count} number of premium customers.")
print(f"There are {standard_count} number of standard customers.")
print(f"There are {basic_count} number of basic customers.")


