# 5, Grade Classifier
score=int(input("Please enter your score: "))
if score >= 90 and score <= 100:
    print("Excellent!")
elif score >= 89 and score <= 80:
    print("Very Good!")
elif score >= 79 and score <= 70 :
    print("Good")
elif score >= 69 and score <= 50 :
    print("Pass")
else:
    print("Fail")

# 6, Number Pattern
#Printing from 1 to 20
print("Printing numbers starting from 1 to 20")
for i in range(1,21):
    print(i)

#Printing odd numbers in the range of 1-20
print("Printing odd numbers ")
for i in range (1,21):
    if i%2==1:
        print(i)

#Printing numbers that are divisble by 5 
print("Printing numbers that are divisble by 5")
for i in range (1,21):
    if i % 5==0:
        print(i)
    else:
        continue

# 7, While Loop Practice
positive_number=int(input("Enter a positive number: "))
total=0
while positive_number != 0:
    total+=positive_number
    positive_number=int(input("Add the number again(0 or a negative number to stop): "))
print(f"The sum is {total}")

# 8, Function Practice 
def greet(name):
    return (f"Welcome,{name}")

def square(number):
    return number*number

def is_even(number):
    if number %2==0:
        return True
    else:
        return False
    

name=input("what is your first name: ")
greet(name)
num=int(input("Enter a number that you want to square: "))
square(num)
num_even=int(input("Enter a number: "))
is_even(num_even)

