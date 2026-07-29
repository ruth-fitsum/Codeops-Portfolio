from datetime import datetime

class Account:
    #created_date is not passed by user but automatically generated 
    def __init__(self,name,number,balance):
        #after some taught the other attributes also need to be private cause they are facts 
        self.__name=name
        self.__number=int(number)
        # balance has to be private
        self.__balance=int(balance)
        self.__created_date=datetime.now()

    #gettter for name
    @property
    def name(self):
        return self.__name

    #gettter for number
    @property
    def number(self):
        return self.__number
        
    #gettter for balance
    @property
    def balance(self):
        return self.__balance

    #gettter for created date
    @property
    def created_date(self):
        return self.__created_date

    def deposit(self,amount):
        if amount <=0:
            raise ValueError("Amount has be greater than zero.")
        self.__balance+=amount
        print("\nDeposit successful.")
        print(f"New balance: {self.__balance:,} ETB")

    def withdraw(self,amount):
        if amount <= 0:
            raise ValueError("Amount has to be greater than zero.")
        if self.__balance < amount:
            raise ValueError("Insufficient balance")
        self.__balance -= amount

    def statement(self):
     # return not print because it will be useful on __str__()
     return(f"""
--------------------------------
        ACCOUNT STATEMENT
--------------------------------
Name:           {self.name}
Account Number: {self.number}
# thousand separation ,
Balance:        {self.balance:,} ETB
# to format it to a year month and date 
Created Date:   {self.created_date:%Y-%m-%d}
--------------------------------
""")
    def __str__(self):
        return self.statement()
#Store all accounts in a dictionary
accounts={} # account_number → account object
running =True
while running:
    print("""
========== ADDIS BANK ==========

1.Create new account
2.Deposit
3.Withdraw
4.Check balance
5.View account info
6.Exit
=================================
""")
    
    choice=input("Enter your choice: ")
try :
    if choice =="1":
        name=input("Enter customer's name: ")
        initial_balance=int(input("Enter inital balance: "))
        account_number=int(input("Enter the account number: "))
        if account_number in accounts:
            print("Account number already exists.")
        else:
            account=Account(name,account_number,initial_balance)
            accounts[account_number]=account
            print("Account created successfully.")

    elif choice=="2":
        account_number=int(input("Enter account number: "))
        amount=int(input("Enter deposit amount: "))
        account=accounts[account_number]
        account.deposit(amount)

    elif choice =="3":
        account_number=int(input("Enter account number: "))
        amount=int(input("Enter withdrawal amount: "))
        account=accounts[account_number]
        account.withdraw(amount)

    elif choice =="4":
        account_number=int(input("Enter account number: "))
        account=accounts[account_number]
        print(f"{account.balance} ETB")

    elif choice=="5":
        account_number=int(input("Enter account number: "))
        account=accounts[account_number]
        # I prefer __str__()
        print(account)

    elif choice=="6":
        print("Thank you for using Addis Bank.")
        running=False
    else:
        print("Please select only from 1-6.")
# for every user entry
except ValueError as error:
    print(f"Error: {error}")
# when the user wants to change or update an account that doesn't exist
except KeyError:
    print("Account not found.")

# Day 5

# SavingsAccount
class SavingsAccount(Account):
    def __init__(self,name,number,balance,rate=0.05):
        super().__init__(name,number,balance)
        # wanted to make sure that the rate argument is in the float format
        self.__rate=float(rate)

    @property
    def rate(self):
        return self.__rate
    
    def  add_interest(self):
        interest=self.__balance * self.__rate /100
        # Reusing deposit 
        self.deposit(interest)

    # overriding statement
    def statement(self):
        return (f"""
        --------------------------------
                ACCOUNT STATEMENT
        --------------------------------
        Account type:   Savings Account
        Name:           {self.name}
        Account Number: {self.number}
        # thousand separation ,
        Balance:        {self.balance:,} ETB
        Rate:           {self.rate:}%
        # to format it to a year month and date 
        Created Date:   {self.created_date:%Y-%m-%d}
        --------------------------------
        """)

#Current Account

class CurrentAccount(Account):
    def __init__(self,name,number,balance,overdraft):
        super().__init__(name,number,balance)
        self.__overdraft=int(overdraft)

    @property
    def overdraft(self):
        return self.__overdraft
    
    # overriding withdraw
    def withdraw(self, amount):
        # one point from withdraw
        if amount <=0:
            raise ValueError("Withdraw amount has to be grater than zero")
        if amount > self.__balance+self.__overdraft:
            raise ValueError("Overdraft limit exceeded.")
          
    # overriding statement 
    def statement(self):
        return (f"""
                --------------------------------
                        ACCOUNT STATEMENT
                --------------------------------
                Account type:   Current Account
                Name:           {self.name}
                Account Number: {self.number}
                # thousand separation ,
                Balance:        {self.balance:,} ETB
                # Overdraft amount
                Overdraft Amount:{self.__overdraft:,} ETB 
                # to format it to a year month and date 
                Created Date:   {self.created_date:%Y-%m-%d}
                --------------------------------
                """)






        
