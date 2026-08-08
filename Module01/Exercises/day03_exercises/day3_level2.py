# Level 2 : Intermediate

# 4,List operations

num_List= [10, 25, 40, 15, 60, 30]
for i in range(len(num_List)):
    if num_List[i] > 30:
        print(num_List[i])

# this will sort it in place 
print(num_List.sort())

# by using only a method we can have the sum
total=sum(num_List)

# there is no built in method for average 
average=total/len(num_List)

# 5, Dictionary Operations

products={"shiro":145,"tefe":200,"oil":300,"bread":15,"yogurt":100}
for product,price in products.items():
    print(f"The current price for {product} is {price} Birr.")

user=input("Enter a product name to know the price: ")
print(products.get(user,"Product is not available in the price book."))

# 6, List Comprehension

nums=[i for i in range(1,21)]
even_nums=[i for i in range(1,31) if i%2==0 ]
odd_nums=[i for i in range(1,11) if i%2==1]

# 7, Modules & Import

from utils import add_tax

add_tax(20,0.2)

