# 1, Book class

class Book:
    def __init__(self,title,author,pages):
        self.title=title
        self.author=author
        self.pages=pages
    def describe(self):
        print(f"The book {self.title} was written by {self.author} and has {self.pages} pages.")

# making an instance 

book1=Book("The old man and the sea","Ernest Hemingway",140)
book2=Book("Fiker eske mekaber","Haddis Alemayehu",522)  

# 2, Product class

class Product:
    def __init__(self,name,price,quantity):
        self.name=name
        self.price=price
        # made quantity private
        self.__quantity=quantity

    
    def restock(self,n):
        n=int(n)
        if n <0:
            raise ValueError("Stock has to be greater than zero.")
        self.__quantity +=n

    
    def sell(self,n):
        n=int(n)
        if n <0:
            raise ValueError("Stock has to be greater than zero.")
        #Validating for the stock not to go below zero
        if self.__quantity < n:
            raise ValueError("Not enough stock available")
        self.__quantity -=n

    # adding a @property for a getter
    @property
    def quantity(self):
        return self.__quantity

# 5, Prove independence 

product1 = Product("Laptop", 50000, 10)
product2 = Product("Mouse", 1000, 20)
product3 = Product("Keyboard", 2000, 15)

# checking their initial quantities

print(product1.quantity)
print(product2.quantity)
print(product3.quantity)

# let's change product1
product1.restock(5)

# print all three 

print(product1.quantity)
print(product2.quantity)
print(product3.quantity)

# sell product 2

product2.sell(3)

# print all three

print(product1.quantity)  
print(product2.quantity)  
print(product3.quantity)  