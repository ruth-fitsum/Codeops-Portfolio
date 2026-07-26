# 1, Variables & Data Types
full_name="Ruth Fitsum Endeshaw"
age=24
height=1.50
is_student=False
favorite_food="Genfo"
# I am using f string to have the variables joined together that will make up a sentence.
print(f"My name is {full_name}.Although I am {height} m tall,I am {age} year old and {'a student' if is_student else 'not a student'} at the moment.when it comes to food I enjoy {favorite_food}. ")


# 2, Arithmetic Operations 

# asks the user to enter inputs
a=int(input("Enter the first number: "))
b=int(input("Enter the second number: "))

def add(num1,num2):
    return num1+num2
# functio has to be called inside {}
print(f"The sum of {a} and {b} becomes {add(a,b)}")

def difference(num1,num2):
    return num1-num2
print(f"The difference between {a} and {b} becomes {difference(a,b)}")

def product(num1,num2):
    return num1*num2
print(f"The product of {a} and {b} becomes {product(a,b)}")

def division(num1,num2):
    return num1/num2
print(f"The division of {a} by {b} becomes {division(a,b)}")

def floor_division(num1,num2):
    return num1//num2
print(f"The floor division of {a} by {b} becomes {floor_division(a,b)}")

def remainder(num1,num2):
    return num1%num2
print(f"The remainder when we divied {a} by {b} becomes {remainder(a,b)}")


# 3, Type Conversion
birth_year=int(input("what year were you born? "))
print(f"That makes you {2026 - birth_year} year old.")


# 4, Simple Decision(if/else)
score=int(input("How much did you score? "))
print(f"That means you have {'passed' if score >= 50 else 'failed'}.")
