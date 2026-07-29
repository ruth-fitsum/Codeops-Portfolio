# 1, Spot the SRP violation - different classes

# class Report:
#     def builds(self):
#         print("Building report!")
#     def saves(self):
#         print("Saving report!")
#     def email(self):
#         print("Emailing report!")

# The above doesn't go along with the SOLID principles

# let's say that the main class previous just generate the email
class Report:
    def builds(self):
        print("Building report!")

class Reportsaver:
    def save():
        print("Saving report!")

class Reportemailer:
    def email():
        print("Emailing report!")


# 2, Refactor to OCP - to different subclasses 

def calculate_area(shape,value):
    if shape=="triangle":
        return 0.5* value**2
    elif shape=="square":
        return value **2
    elif shape =="circle":
        return 3.14*value**2

# when ever there will be a modification the above need to be changing 

class Shape:
    def area(self):
        pass

class Circle(Shape):
    def __init__(self,radius):
        self.radius=radius
    def area(self):
        return 3.14 * self.radius **2

class Square(Shape):
    def __init__(self,side):
        self.side=side
    def area(self):
        return self.side**2

class Triangle(Shape):
    def __init__(self,base, height): # infact this is the right way to calculate area where in the above we were limited
        self.base=base
        self.height=height
    def area(self):
        return 0.5* self.base * self.height 


# 3, Write a Singleton - appsetting 
class Appsettings:
    _instance=None
    def __new__(cls):
        if cls._instance is None:
            cls._instance=super().__new__(cls)
        return cls._instance

# 4, Write a Factory

class Shape:
    def area(self):
        pass

class Circle(Shape):
    def __init__(self,radius):
        self.radius=radius
    def area(self):
        return 3.14 * self.radius **2

class Square(Shape):
    def __init__(self,side):
        self.side=side
    def area(self):
        return self.side**2

class Triangle(Shape):
    def __init__(self,base, height): # infact this is the right way to calculate area where in the above we were limited
        self.base=base
        self.height=height
    def area(self):
        return 0.5* self.base * self.height 

class Shape_factory:
    @staticmethod # because the factory doesn't need an object to be created
    def create(kind,v1,v2=0):
        if kind=="circle":
            return Circle(v1)
        elif kind=="triangle":
            return Triangle(v1,v2)
        elif kind=="square":
            return Square(v1)

shape1=Shape_factory.create("circle",4)
shape2=Shape_factory.create("triangle",4,8)

# 5, Write an Observer pair

# let's create the subscribers first
class Subscriber:
    def __init__(self,firstname,lastname):
        self.firstname=firstname
        self.lastname=lastname
    def update(self,news):
        print(f"New news is here {self.lastname}")

class NewsAgency:
    def __init__(self):
        self.subscribers=[]
        self.news=[]
    def new_sub(self,sub):
        self.subscribers.append(sub)
    def notify(self,news):
        for subscriber in self.subscribers:
            subscriber.update(news)


