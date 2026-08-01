# Basic Exercises
# 1, Single Responsibility Principles(SRP)
# class Employee:
#     def __init__(self, empId, name, salary):
#             self.empId = empId
#             self.name = name
#             self.__salary = salary
#     def salary_calculation(self):
#           ...
#     def saving_file(self):
#           ...
#     def sendemail(self):
#           pass


 # when refactored 
class Employee:
    def __init__(self, empId, name, salary):
        self.empId = empId
        self.name = name
        self.salary = salary


class SalaryCalculator:
    def calculate(self, employee):
        # salary calculation logic
        return employee.salary


class EmployeeFileSaver:
    def save(self, employee):
        # file-saving logic
        print(f"Saving {employee.name} to file...")


class EmailService:
    def send(self, employee):
        # email-sending logic
        print(f"Sending email to {employee.name}...")

# 2, Open/Closed Principles(OCP)

# def calculate_bonus(employee_type):
#     if employee_type == "manager":
#         return 10000

#     elif employee_type == "developer":
#         return 7000

#     elif employee_type == "intern":
#         return 2000

#     else:
#         return 0

       
# When refactored 
class Employee:
    def calculate_bonus(self):
        pass

class Manager(Employee):
    def calculate_bonus(self):
        return 10000


class Developer(Employee):
    def calculate_bonus(self):
        return 7000


class Intern(Employee):
    def calculate_bonus(self):
        return 2000

# Liskov Substitution Principles

# class Bird:
#     def fly(self):
#         print("Flying...")


# class Penguin(Bird):
#     def fly(self):
#         raise Exception("Penguins can't fly!")


# def make_bird_fly(bird):
#     bird.fly()

# This violates Liskov Principles 
# To fix it 

class Bird:
    pass

# we will move that violation to a different sub class 
class FlyingBird(Bird):
    def fly(self):
        print("I am a Bird which can fly.")

class Penguin(Bird):
    def fly(self):
        print("I am a penguin and I can't fly.")
# To check if this is working or not on each object we will call this function 
# which is the object's fly method that will be called inside this function
def make_bird_fly(bird):
    bird.fly()

# Time to create the objects 
bird1=FlyingBird()
penguin1=Penguin()

make_bird_fly(bird1)
make_bird_fly(penguin1)


# 4, Identify SOLID violation

class Account:
    def __init__(self):
        self.notifier=EmailNotifier()
        ...
    def withdraw(self,amount):
        ...
        self.notifier.send_email(...)
        self.save_to_do(...)

# This code violates - SIP - single responsibility principle

