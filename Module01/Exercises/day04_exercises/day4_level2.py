# Level 2: Intermediate

# 4, Student Class

class Student:
    def __init__(self,name,student_id):
        self.name=name
        self.student_id=student_id
        self.grades=[]

    def add_grade(self,grade):
        self.grades.append(grade)

    def average_grade(self):
        return sum(self.grades)/len(self.grades)

# printing and creating  

s1=Student("Abebe Kebede","CC001")
s1.add_grade(85)
s1.add_grade(90)
s1.add_grade(78)

print(f"{s1.name} has an average grade of {s1.average_grade()}.")

# 5, Product Class

class Product:
    def __init__(self,name,price,stock):
        self.name=name
        self.price=price
        self.stock=stock

    def sell(self,quantity):
        quantity=int(quantity)
        if self.stock < quantity:
            raise ValueError("Not enough stock available.")
        if quantity <0:
            raise ValueError("Quantity has to be greater than zero.")
        self.stock -=quantity

    def restock(self,quantity):
        quantity=int(quantity)
        if quantity <0:
            raise ValueError("Quantity has to be greater than zero.")
        self.stock+=quantity

product = Product("Laptop", 50000, 10)
print(product.stock)  

product.sell(3)
print(product.stock)  

product.restock(5)
print(product.stock)  
   
# 6, Encapsulation Practice

class Account:
    def __init__(self,owner,balance):
        self.owner=owner
        self.__balance=balance

    def deposit(self,amount):
        amount=int(amount)
        if amount <0:
            raise ValueError("Deposit amount has to be greater than zero.")
        self.__balance +=amount

    @property
    def balance(self):
        return self.__balance

    def withdraw(self,amount):
        amount=int(amount)
        if self.__balance < amount:
            raise ValueError("Insufficient balance.")
        if amount < 0:
            raise ValueError("Withdraw amount has to be greater than zero.")
        self.__balance -=amount

