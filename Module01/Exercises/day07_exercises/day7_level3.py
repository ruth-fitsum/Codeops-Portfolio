# Advanced Exercises

# 9, Performance Comparison

import time 
import collections

numbers_list=list(range(100000))
numbers_dict={i:i for i in range(100000)}

target=99999

# Search in list
start_list=time.time()

if target in numbers_list:
    pass

list_time=time.time()-start_list

# Search in dictionary
start_dict=time.time()

if target in numbers_dict:
    ...

dict_time=time.time()-start_dict

print(f"List search time: {list_time:.6f} seconds")
print(f"Dict search time: {dict_time:.6f} seconds")

# Insert 10,000 elements at the beginning of a list vs using “collections.deque”
num_elements=10,000

# Inserting at the beginning of a list
insert_list=[]
start_insert_list=time.time()

for i in range(num_elements):
    insert_list.insert(0,i)

insert_time_list=time.time()-start_insert_list

# Inserting at the beginning of a queue

deque_collection=collections.deque()

start_deque=time.time()

for i in range(num_elements):
    deque_collection.appendleft(i)

insert_time_deque=time.time()-start_deque

print(f"Standard List insert(0) time:   {insert_time_list:.6f} seconds")
print(f"collections.deque appendleft time: {insert_time_deque:.6f} seconds")


# 10, Choose the Right Structure 

# Checking if a username is already taken - we need to use a dictionary or a hashmap
# Processing tasks in the order they arrive (customer support) - Queue is the perfect choice we use
# Implementing "Undo" feature in a text editor - Stack is the best choice and in fact used for such things
# Storing student IDs for fast lookup - we need to use hash map or dictionary here again 

# 11 , Linked List vs Array 

# Array 
numbers = [10, 20, 30, 40, 50]
def remove_middle_array(numbers):
    middle_idx=len(numbers)//2
    numbers.pop(middle_idx)
    return numbers

# Linkedlist Node

class Node:

  def __init__(self, data=0):
    self.data = data
    self.next = None


def remove_middle_linked_list(head):
  if head is None or head.next is None:
    return None

  slow = head
  fast = head
  prev = None

  # Fast and slow pointer to find middle
  while fast and fast.next:
    fast = fast.next.next
    prev = slow
    slow = slow.next
# Remove middle node
  if prev:
    prev.next = slow.next

  return head


