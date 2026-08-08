# 1, Name the Big-O

# a, List index - O(1)
numbers = [10, 20, 30, 40, 50]
print(numbers[3])  # cause it's one operation it will be just accessed through the index number 

# b, Single loop - O(n)
numbers = [10, 20, 30, 40, 50]

for number in numbers:
    print(number) # each element has to be gone through and on worst case it will be at the end 

# c, Nested loop - O(n²)
numbers = [10, 20, 30, 40, 50]

for x in numbers:
    for y in numbers:
        print(x, y) # the outer loop runs n times and the inner loop runs n times 

# d, Dictionary lookup - O(1) by key, O(n) by value

ages = {
    "Ruth": 24,
    "Abebe": 30,
    "Sara": 25
}

print(ages["Ruth"])  # - O(1)

# e, Binary search → O(log n)

numbers = [10, 20, 30, 40, 50, 60, 70]

# Each step eliminates roughly half of the search space.

# 2, List VS. dict lookup

import time

# Create 100,000 fake account numbers
accounts_list = [f"ACC{i:06d}" for i in range(100_000)]

# Create a dictionary using account number as the key
accounts_dict = {account: True for account in accounts_list}

# Search for an account near the end
target = "ACC099999"

# List lookup
start = time.perf_counter()

target in accounts_list

list_time = time.perf_counter() - start

# Dictionary lookup
start = time.perf_counter()

target in accounts_dict

dict_time = time.perf_counter() - start

print("List time:", list_time)
print("Dict time:", dict_time)


# 3, Build a stack. 

class Stack:

    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop()

    def peek(self):
        return self.items[-1]

names = ["Beti", "Abebe", "Sara", "John"]

stack = Stack()

for name in names:
    stack.push(name)

reversed_names = []

while stack.items:
    reversed_names.append(stack.pop())

print(reversed_names)

# 4, Build a queue.

from collections import deque
queue=deque()

queue.append("Customer 1")
queue.append("Customer 2")
queue.append("Customer 3")
queue.append("Customer 4")
queue.append("Customer 5")

while queue:
    customer = queue.popleft()
    print("Serving:", customer)

# 5, Singly linked list

class Node:

    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:

    def __init__(self):
        self.head = None

    def push_front(self, data):
        new_node = Node(data)

        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        current = self.head

        while current is not None:
            print(current.data)
            current = current.next