balance=0
def add_income():
    try:
        income=float(input("Enter your income: "))
        balance+=income
        print(f"""Income of {income} birr was added successfully.\n
              your balance has become {balance} birr""")
    # need to have an except clause if not it will raise an error even when just writing the code 
    except:
        print("Please enter a valid number")

def add_expense():
    try:
        expense=float(input("Enter your expense: "))
        if expense > balance:
            print("You don't have sufficient balance.")
        else:
            balance -=expense
            print(f"""Expense of {expense} birr was added successfully.\n
                  your balance has become {balance} birr""")
    except:
        print("Please enter a valid expense")

def show_balance():
    print(f"Your current balance is {balance} birr")


print(""" 
Personal Finance Menu
1,Add income
2,Add expense
3,Show balance
4,Exit
""")

try:
    choice=int(input("Choose an option(1-4) from the Personal Finance Menu above"))
    if choice ==1:
       add_income()
    elif choice ==2:
        add_expense()
    elif choice==3:
        show_balance()
    elif choice==4:
        print("Thank you, goodbye!")
    else:
        print("Please choose only between 1 and 4.")
except:
    print("Please enter a valid input which a number between 1 and 4.")
    
        