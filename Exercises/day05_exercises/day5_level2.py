# Level 2: Intermediate

# 4, Method Overriding
# done on the mini project Day 5 

# 5, Polymorphism Practice

from Mini_Project.Addis_Bank_Account_management_system.account import Account,SavingsAccount,CurrentAccount
#commented because the Account class has been abstract class
# account1 = Account("Ruth", 1001, 5000)
savings1 = SavingsAccount("Abebe", 1002, 10000, 5)
current1 = CurrentAccount("Mekdes", 1003, 15000, 5000)

accounts_list = [
    # account1,
    savings1,
    current1
]

for account in accounts_list:
    print(account.statement())
    account.deposit(100)

# 6, Abstract Base Class - will be done on Mini Project 
