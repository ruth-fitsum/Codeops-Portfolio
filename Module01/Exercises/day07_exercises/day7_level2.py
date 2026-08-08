# Intermediate Exercises
# 5, Big-O Analysis

# O(n)
def find_max(arr):
    if not arr:
        return None
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val

# This function uses two nested loops to check if there are any duplicate elements in a list.

def has_duplicates(arr):
    n = len(arr)
    for i in range(n):
        for j in range(i + 1, n):
            if arr[i] == arr[j]:
                return True
    return False

# O(n²) because the function uses two nested loops, causing the number of comparisons to grow approximately as n²

# 6, Linked Lists Basics

class Node:

    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:

    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)

        new_node.next = self.head
        self.head = new_node

    def print_list(self):
        current = self.head

        while current is not None:
            print(current.data)
            current = current.next

# 7, Stack (LIFO)

class Stack:

    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop()

    def peek(self):
        return self.items[-1]

text="Addis Ababa"
stack=Stack()
# we first get all the chars in to a stack 
for char in text:
    stack.push(char)
# since a string is also a stack 
reversed_text=""
while stack.items:
    reversed_text+=stack.pop()
print(reversed_text)


# Queue (FIFO)

from collections import deque

class Queue:
    def __init__(self):
        self.items=deque()
    def enqueue(self,customer):
        self.items.append(customer)
        print(f"{customer} entered the bank and joined the line")
    def dequeue(self):
        if self.is_empty():
            print("The line is empty! No customers to serve.")
            return 
        customer = self.items.popleft()
        return (f"{customer} is now being served at the counter.")
    def is_empty(self):
        return len(self.items)==0

bank_line=Queue()
bank_line.enqueue("Abebe")
bank_line.enqueue("Almaz")
bank_line.enqueue("Beyene")
bank_line.dequeue()
bank_line.dequeue()
bank_line.enqueue("Beti")
bank_line.dequeue()