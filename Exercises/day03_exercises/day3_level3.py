# # Level 3:Advanced

# # 8, File Reading & Writing

# try:
#     total=0
#     with open("students.txt","r") as f:
#         for line in f:
#             name,score=line.strip().split(",")
#             total +=int(score)
#         average_score=total/5
#         print(f"The average score of the students is {average_score}")
# except FileNotFoundError:
#     print("No Student File found.")

# # 9, Error Handling 

# try:
#     num1=int(input("Enter the first number: "))
#     num2=int(input("Enter the second number: "))
#     result=num1/num2
# except ValueError:
#     print("The number/s that you have entered are non-numeric.")
# except ZeroDivisionError:
#     print("The second number can't be zero.")
# else:
#     print(f"The division of {num1} by {num2} is {result}.")
# finally:
#     print("Calculation attempt completed.")

# 10, Full Program - Inventory Manager

inventory = {
    "Laptop": 10,
    "Mouse": 25,
    "Keyboard": 15,
    "Monitor": 8,
    "USB Cable": 40
}

# The ultimate goal is to build a menu for the 6 type of function 


# 1, Add new product 

def add_new(item,qt):
    inventory[item]=int(qt)

# 2, Update quantity 

def update_qt(item,qt):
    inventory[item]=inventory.get(item,0)+int(qt)

# 3, View all products 

def all_pro():
    print(f"The products are : {inventory}")

# 4, save to file 

def save_file():
    with open ("saved.txt","w") as f:
        for product,quantity in inventory.items():
            f.write(f"{product},{quantity}\n")
        print("File saved")

# 5, Load from file 

def load_file():
    inventory={}
    with open("saved.txt","r") as f:
        for line in f:
            product,quantity=line.strip().split(",")
            inventory[product]=int(quantity)
    return inventory 

    
# 6, Exit  - commented because it doesn't have an effect 
# def exit():
#     looper=False

looper=True
while looper:
    print('''Menu for the inventory \n 1. Add new product \n 2. Update quantity \n 3. View all products \n 4. Save to file \n 5. Load from file \n 6. Exit ''')
    try:
        choice=int(input("choose an option: "))
        if choice == 1:
            item=input("Enter a new product:")
            amount=input("Enter the quantity amount for this new product: ")
            add_new(item,amount)

        elif choice ==2:
            item=input("Enter the product for it's quantity to be updated: ")
            amount=input("Enter the amount to update the product: ")
            update_qt(item,amount)

        elif choice==3:
            all_pro()

        elif choice==4:
            save_file()

        elif choice ==5:
            inventory=load_file()
        elif choice==6:
            # exit()
            looper=False

    except ValueError:
        print("Please enter a numeric value.")
     
