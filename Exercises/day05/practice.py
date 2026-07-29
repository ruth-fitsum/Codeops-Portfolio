class Vehicle:
    def __init__(self,make,model):
        self.make=make
        self.model=model
    def describe(self):
        print(f"Make: {self.make}")
        print(f"Model: {self.model}")

class Car(Vehicle):
    pass
class Truck(Vehicle):
    pass
    