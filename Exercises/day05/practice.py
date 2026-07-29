# 5, Abstract method 
from abc import ABC, abstractmethod
# 1, Vehicle hierarchy.
class Vehicle(ABC):
    def __init__(self,make,model):
        self.make=make
        self.model=model
    def describe(self):
        print(f"Make: {self.make}")
        print(f"Model: {self.model}")
    @abstractmethod
    def wheels(self):
        pass 

class Car(Vehicle):
    pass
class Truck(Vehicle):
    # 2, Use super()
    def __init__(self,make,model,capacity):
        super().__init__(make,model)
        self.capacity=capacity
    # 3, Override.
    def describe(self):
        super().describe()
        print(f"Capacity: {self.capacity}")

# 4, Polymorphism
vehicles=[
    Car("Toyota","Corolla"),
    Truck("Volvo","FH",20)
]

for vehicle in vehicles:
    vehicle.describe()


