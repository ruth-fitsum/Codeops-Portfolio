# 1, Simple Class - Person

class Person:
    def __init__(self,name,age):
        self.name=name
        self.age=age
    def introduce(self):
        print(f"Hello,{self.name}")

p1=Person("Jack",23)
p1.introduce()
p2=Person("Abeba",19)
p2.introduce()

# 2, Rectangle Class

class Rectangle:
    def __init__(self,length,width):
        self.length=length
        self.width=width

    def area(self):
        return self.length * self.width
    
    def perimeter(self):
        return (2*self.length)+(2*self.width)
    
R1=Rectangle(3,4)
R1.area()
R1.perimeter()
R2=Rectangle(5,10)
R2.area()
R2.perimeter()

# 3, Bank Account(Basic)

class Account:
    def __init__(self,owner,balance):
        self.owner=owner
        self.balance=balance

    def deposit(self,amount):
        amount=int(amount)
        if amount <0:
            raise ValueError("Deposit amount has to be greater than zero.")
        self.balance +=amount

    def withdraw(self,amount):
        amount=int(amount)
        if self.balance < amount:
            raise ValueError("Insufficient balance.")
        if amount < 0:
            raise ValueError("Withdraw amount has to be greater than zero.")
        self.balance -=amount
