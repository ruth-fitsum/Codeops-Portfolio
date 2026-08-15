#  1, Build a BST
# this will create a specific node
class Node:
    def __init__(self,value):
        self.value=value
        self.left=None
        self.right=None

# to create a tree - on root
def insert(root,value):
    if root is None:
        # we will just make it the parent
        # root becomes just the node with no left and right things
        return Node(value) 
    # if the root is not empty we need to compare the value to the already existing node on the root
    if value < root.value:
        # so that it could be written down on left side
        # the left side will be the path it will be going
        # recursive 
        root.left=insert(root.left,value)
        # now the left side will become the main root and then it will be inspected 
    else:
        # larger or equal
        # we will be checking on the right side on every condition till we get an empty point were the value can live there 
        root.right=insert(root.right,value)
    # then we will be done 
    return root 

# to read them in in-order pattern 
# we need to go down to the last left side of the root 
def inorder(root):
    # needs to be done on a tree that is in binary search tree mode
    if root is None:
        return 
    inorder(root.left)
    print(root.value)
    inorder(root.right)

# test

balances=[347,89,57,7890,677]
# we need a starter pack here
root=None
for balance in balances:
    root=insert(root,balance)

print("Printing in in-order: ")
inorder(root)

# 2, Tree depth
# we are going to count the height as we go deep down of a tree
# here we need to return the highest one 
# since it's height we need to add 1
def height(node):
    if node is None:
        # the part we will stop
        return 0
    # we need to assign it to the value because we will compare the two values
    left_height=height(node.left)
    right_height=height(node.right)
    return 1 + max(left_height,right_height)

#  we are going to find the max height of the alreadying existing root
print(f"Tree height: {height(root)}")

# 3, Graph BFS 
# the idea of queue and visited will be used for this question and also the next one 

# we will start with empty set for the already visited ones and a queue will start with the first node 
# we will pop the node from the queue and check if it already one those set of visited or not 
# and it's adjancents will be added to the queue so that they can be checked in an order 

from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    # we will go on till queue is empty 
    while queue:
        # this makes it BFS
        vertex = queue.popleft()
        # if it's on the visited set no need of processing it 
        if vertex in visited:
            continue
        # if not we will add it to the visited ones 
        visited.add(vertex)
        # our graph is in the format of dictionary 
        for neighbor in graph[vertex]:
            # since it is a meshed it might be already visited 
            if neighbor not in visited:
                queue.append(neighbor)
    # since the question wants all the reachable sets of reachable vertices /node 
    return visited

# test for BFS
graph = {
    "A": ["B", "C"],
    "B": ["D", "E"],
    "C": ["F"],
    "D": [],
    "E": [],
    "F": []
} 

# call it 
bfs(graph, "A")


# 4, Graph DFS 

def dfs(graph, start):
    visited = set()
    order = []

    def visit(vertex):
        if vertex in visited:
            return

        visited.add(vertex)
        order.append(vertex)

        for neighbor in graph[vertex]:
            visit(neighbor)

    visit(start)

    return order
# they visit the same vertices but the there is a difference between how they manuver through it .
# BFS visits vertices level by level before moving down and deeper 
# DFS goes as deep as possible and backtracking 

# 5, Priority queue

import heapq

tasks = []

heapq.heappush(tasks, (3, "Send report"))
heapq.heappush(tasks, (1, "Fix server"))
heapq.heappush(tasks, (5, "Check email"))
heapq.heappush(tasks, (2, "Backup database"))
heapq.heappush(tasks, (4, "Update documentation"))

# although the number given to them are in a complete mess 
# when we pop them out we will have them in order / priority

# when we remove them

while tasks:
    priority, task = heapq.heappop(tasks)
    print(priority, task)