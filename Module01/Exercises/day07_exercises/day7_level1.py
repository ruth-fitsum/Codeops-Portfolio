# Basic Exercises

# 1, Big-O Notation 

# Accessing an element in a python list by index - O(1)
# Searching for an element in a list using in - O(n)
# Inserting at the beginning of a list - O(n)
# Dictionary lookup by key - O(1)

# 2, Compare Complexities 

# O(1) -> O(log n) -> O(n) -> O(n^2)

# 3, Arrays / Lists

students=["Abebe","Abel","Beti","Sara", "John", "Marta",
    "Daniel", "Hana", "Samuel", "Liya"]

# Accessing by index - O(1)
print(students[3])

# Adding at the end - O(1) amortized
students.append("Helen")
print(students)

# Inserting at position 0 - O(n)
students.insert(0, "Peter")
print(students)

# 4, Hashmaps(Dictionaries)

student_grades={"Abebe":67,"Abel":54,"Beti":80,"Sara":39, "John":78}

# Add a new student 
student_grades["Marta"]=45

# Update a grade

student_grades["Abel"]=70

# Check if a student exists(fast lookup)

if "Marta" in student_grades:
    print("Marta exists")