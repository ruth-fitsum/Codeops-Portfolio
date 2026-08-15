from abc import ABC, abstractmethod

class Employee(ABC):
    def __init__(self, empId, name, salary):
        self.empId = empId
        self.name = name
        self.__salary = salary

    @property
    def salary(self):
        return self.__salary

    @salary.setter
    def salary(self, salary):
        if salary <= 0:
            print("Salary cannot be negative or zero.")
        self.__salary = salary

    def display(self):
        print(f"Employee ID: {self.empId}")
        print(f"Employee Name: {self.name}")
        print(f"Employee Salary: {self.__salary}")

    @abstractmethod
    def calculate_salary(self):
        ...

class FTEmployee(Employee):
    def calculate_salary(self):
        return self.salary


class PTEmployee(Employee):
    def __init__(self, empId, name, salary, hours):
        super().__init__(empId, name, salary)
        self.hours = hours

    def calculate_salary(self):
        return self.salary * self.hours


abe = FTEmployee("XYZ0001", "Abebe Kebede", 50000)

alm = FTEmployee("XYZ0002", "Almaz Kebede", 70000)

# abe.display()

ale = PTEmployee("XYZ0003", "Alemu Kebede", 1000, 40)

ale.display()
print(ale.calculate_salary())