# 1, Simple Inheritance

class Vehicle:
    def __init__(self,name,model,year):
        self.name=name
        self.model=model
        self.year=year
    def info(self):
        print(f"""
              Name: {self.name}
              Model: {self.model}
              Year:  {self.year}
              """)

class Car(Vehicle):
    def __init__(self,name,model,year,doors):
        super.__init__(name,model,year)
        self.doors=doors
    def start(self):
        print("The engine has started")

class Motorcycle(Vehicle):
    def __init__(self,name,model,year,engine):
        super.__init__(name,model,year)
        self.engine=engine

    def vroom(self):
        print("The engine has started!")


# 2, SavingsAccount Inheritance done on the mini project Day 5
# 3, CurrentAccount Inheritance done on the mini project Day 5
 
    