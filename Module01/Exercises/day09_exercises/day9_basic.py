# Basic Exercises
# 1, Tree Basics

class TreeNode:
    def __init__(self, name):
        self.name = name
        self.children = []

    def add_child(self, child):
        self.children.append(child)

# to print a tree 
def print_tree(node, level=0):
    print("  " * level + node.name)

    for child in node.children:
        print_tree(child, level + 1)

# test

head_office = TreeNode("Head Office")
bole_branch = TreeNode("Bole Branch")
teller = TreeNode("Teller")
loan_officer = TreeNode("Loan Officer")
bole_branch.add_child(teller)
bole_branch.add_child(loan_officer)
piassa_branch = TreeNode("Piassa Branch")
head_office.add_child(bole_branch)
head_office.add_child(piassa_branch)

print_tree(head_office)

# 2, Binary Search Tree

class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    def insert(self, value):
        if self.root is None:
            self.root = BSTNode(value)
            return
        self._insert(self.root, value)

    def _insert(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = BSTNode(value)
            else:
                self._insert(node.left, value)
        elif value > node.value:
            if node.right is None:
                node.right = BSTNode(value)
            else:
                self._insert(node.right, value)

    def search(self, value):
        current = self.root
        while current is not None:
            if value == current.value:
                return True
            elif value < current.value:
                current = current.left
            else:
                current = current.right
        return False

# test

bst = BST()
values = [50, 30, 70, 20, 40, 60]

for value in values:
    bst.insert(value)

print("Search for 40:", bst.search(40))
print("Search for 100:", bst.search(100))

# 3, Graph Basics

class Graph:
    def __init__(self):
        self.graph = {}

    def add_customer(self, customer):
        if customer not in self.graph:
            self.graph[customer] = []

    def add_connection(self, customer1, customer2):
        self.add_customer(customer1)
        self.add_customer(customer2)

        self.graph[customer1].append(customer2)
        self.graph[customer2].append(customer1)
    def print_graph(self):
        for customer, connections in self.graph.items():
            print(f"{customer} -> {connections}")

# test 

customer_graph = Graph()
customers = ["Almaz", "Dawit", "Tigist", "Hanna"]

for customer in customers:
    customer_graph.add_customer(customer)

customer_graph.add_connection("Almaz", "Dawit")
customer_graph.add_connection("Almaz", "Tigist")
customer_graph.add_connection("Dawit", "Hanna")
customer_graph.add_connection("Tigist", "Hanna")

customer_graph.print_graph()

# 4, Heap Basics

priority_queue = []

# heapq creates a MIN-HEAP.
# The smallest priority number is processed first.
import heapq
heapq.heappush(priority_queue, (5000, "Big Loan"))
heapq.heappush(priority_queue, (200, "Small Deposit"))
heapq.heappush(priority_queue, (10000, "Fraud Alert"))

print("Priority Queue:")
print(priority_queue)

highest_priority = heapq.heappop(priority_queue)
print("Processed transaction:", highest_priority)