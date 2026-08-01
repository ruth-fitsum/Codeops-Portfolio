# Intermediate Exercises

# 1, Apply SRP + DIP

# from the basic level we have where the account class has violated whichof the SOLID principles
# Let's fix it 

# class Account:
#     def __init__(self):
#         self.notifier=EmailNotifier()
#         ...
#     def withdraw(self,amount):
#         ...
#         self.notifier.send_email(...)
#         self.save_to_db(...)

# Let's refactor it 
# will take a snippet from the Mini project 
# I made notifiers a list where there could be more than one notifiers
class Account:
    def __init__(self,name,number,balance,notifiers):
        self.name=name
        self.number=number
        self.balance=balance
        self.notifiers=notifiers
    def deposit(self,amount):
        if amount <=0:
            raise ValueError("Amount has be greater than zero.")
        self.balance+=amount
        for notifier in self.notifiers:
            notifier.send(f"{self.name} deposited {amount} ETB")

    def withdraw(self,amount):
        if amount <= 0:
            raise ValueError("Amount has to be greater than zero.")
        if self.balance < amount:
            raise ValueError("Insufficient balance")
        self.balance -= amount
        for notifier in self.notifiers:
            notifier.send(f"{self.name} withdrew {amount} ETB")


class EmailNotifier:
    def send(self,message):
        print(f"Email: {message}")

class SMSNotifier:
    def send(self,message):
        print(f"SMS:{message}")

class AuditLog:
    def send(self,message):
        print(f"Audit:{message}")

# 2, Factory Pattern 

class AccountFactory:
    # since we don't need an instance for this particular class for the create method to function - AccountFactory.create
    @staticmethod
    def create(kind,name,number,balance=0):
        if kind=="savings":
            return SavingsAccount(name,number,balance)
        elif kind=="current":
            return CurrentAccount(name,number,balance)
        else:
            raise ValueError("No such account type is available")

# 3, Observer Pattern

class Account:
    def __init__(self,name,number,balance,notifiers):
        self.name=name
        self.number=number
        self.balance=balance
        self.notifiers=notifiers

    def withdraw(self,amount):
        if amount <= 0:
            raise ValueError("Amount has to be greater than zero.")
        if self.balance < amount:
            raise ValueError("Insufficient balance")
        if amount >3000:
            for notifier in self.notifiers:
                notifier.send(f"{self.name} withdrew {amount} ETB which is greater than 3000 ETB")
        self.balance -= amount

class SMSNotifier:
    def send(self,message):
        print(f"SMS:{message}")

class AuditLog:
    def send(self,message):
        print(f"Audit:{message}")

# 4, Interface Segregation (ISP)
from abc import ABC ,abstractmethod 
class Account(ABC):
    ...
class InterestBearing(ABC):
    def calculate_interest(self):
        ...
class SavingsAccount(Account,InterestBearing):
    ...