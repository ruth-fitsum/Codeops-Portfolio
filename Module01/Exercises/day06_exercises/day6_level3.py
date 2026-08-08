# Advanced Exercises

# 9, Full SOLID Refactoring

class AccountRepository:
    def save(self, account):
        print(f"Saving {account.name} to database...")

# 10, Observer
class SMSAlert:
    def send(self, message):
        print(f"SMS Alert: {message}")


class AuditLog:
    def send(self, message):
        print(f"Audit Log: {message}")

# 10, Singleton
class Account:
    def __init__(self, name, number, balance, repository, observers):
        self.name = name
        self.number = number
        self.balance = balance
        self.repository = repository
        self.observers = observers

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be greater than zero.")

        self.balance += amount
        self.repository.save(self)

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be greater than zero.")

        if self.balance < amount:
            raise ValueError("Insufficient balance.")

        self.balance -= amount

        if amount > 3000:
            self.notify(f"{self.name} withdrew {amount} ETB")

        self.repository.save(self)

    def notify(self, message):
        for observer in self.observers:
            observer.send(message)


class SavingsAccount(Account):
    def calculate_interest(self):
        return self.balance * 0.05


class CurrentAccount(Account):
    def calculate_interest(self):
        return 0


class FixedDepositAccount(Account):
    def calculate_interest(self):
        return self.balance * 0.08

class InvestmentAccount(Account):
    ...
# 11, Refactoring Challenge - the factory has to be changed  

# 10, Factory desgin pattern 
class AccountFactory:

    @staticmethod
    def create(kind, name, number, balance, repository, observers):

        if kind == "savings":
            return SavingsAccount(name,number,balance,repository,observers)

        elif kind == "current":
            return CurrentAccount(name,number,balance,repository,observers)

        elif kind == "fixed":
            return FixedDepositAccount(name,number,balance,repository,observers)
        elif kind=="investment":
            return InvestmentAccount(name,number,balance,repository,observers) 
        else:
            raise ValueError("Unknown account type.")


class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

