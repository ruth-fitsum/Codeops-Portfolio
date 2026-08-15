from datetime import datetime
from abc import ABC,abstractmethod
from collections import deque
import heapq


# based on Day 5 let's make it Abstract class 
class Account():
    #created_date is not passed by user but automatically generated 
    def __init__(self,name,number,balance):
        #after some taught the other attributes also need to be private cause they are facts 
        self.__name=name
        self.__number=int(number)
        # balance has to be private
        self.__balance=int(balance)
        self.__created_date=datetime.now()
        # adding an observer list
        self._observers=[]
        # Day 7 history will have all the transaction
        self.__history=[]
    #gettter for name
    @property
    def name(self):
        return self.__name

    #gettter for number
    @property
    def number(self):
        return self.__number
        
    #gettter for balance
    @property
    def balance(self):
        return self.__balance

    #gettter for created date
    @property
    def created_date(self):
        return self.__created_date

    @property 
    def subscribers(self):
        return self._observers

    def get_history(self):
        return self.__history
    
    def deposit(self,amount):
        if amount <=0:
            raise ValueError("Amount has be greater than zero.")
        self.__balance+=amount
        self._notify(f"{amount} ETB")
        # Day 7 push to transaction
        # Day 8 add time 
        self.__history.append(("deposit", amount,datetime.now()))

    def withdraw(self,amount):
        if amount <= 0:
            raise ValueError("Amount has to be greater than zero.")
        if self.__balance < amount:
            raise ValueError("Insufficient balance")
        self._Account__balance -= amount
        self._notify(f"-{amount} ETB")
        # Day 7 push to transaction
        # Day 8 add time 
        self._Account__history.append(("withdraw", amount,datetime.now()))
    #based on day05_exercises 
    # @abstractmethod
    # def calculate_interest(self):
    #     pass - commented based on Day 6 

    def statement(self):
     # return not print because it will be useful on __str__()
     return(f"""
--------------------------------
        ACCOUNT STATEMENT
--------------------------------
Name:           {self.name}
Account Number: {self.number}
# thousand separation ,
Balance:        {self.balance:,} ETB
# to format it to a year month and date 
Created Date:   {self.created_date:%Y-%m-%d}
--------------------------------
""")
    def __str__(self):
        return self.statement()

    def subscribe(self, subscriber):
        self._observers.append(subscriber)

    def _notify(self,event):
        for obs in self._observers:
            obs.update(event)  
    # Day 7 undo last transcation
    def undo_last(self):
        transaction=self.__history.pop()
        transaction_type,amount,transaction_date=transaction

        if transaction_type=="deposit":
            self.__balance -=amount
        elif transaction_type=="withdraw":
            self.__balance +=amount
# BankConfig Singleton Creation 

class BankConfig :
    _instance=None
    # cls is for the class as self is for object 
    # super- cause there is upper built in class called object where every class that we create is a subclass of it 
    # and when ever we create an object for a specific class __new__ is called 
    # which is created by the parent class object and this has to know for which type of class we are creating an object for so we feed cls 
     
    def __new__(cls):
        if cls._instance is None:
           cls._instance=super().__new__(cls)
           # instance is the instance hahaha
           # and know we are giving some attributes for the instance 
           cls._instance.interest_rate =5
           cls._instance.overdraft_limit=1000
        return cls._instance # with everything we are setting it on


class InterestBearing:
    # abstractmethod 
    @abstractmethod 
    def calculate_interest(self):
        pass


# Day 5

# SavingsAccount
class SavingsAccount(Account,InterestBearing):
    def __init__(self,name,number,balance):
        super().__init__(name,number,balance)
        # wanted to make sure that the rate argument is in the float format
        self.__rate=BankConfig().interest_rate

    @property
    def rate(self):
        return self.__rate

    def calculate_interest(self):
        interest=self.balance * self.__rate /100
        return interest    
    def  add_interest(self):
        interest=self.calculate_interest()
        # Reusing deposit 
        self.deposit(interest)

    # overriding statement
    def statement(self):
        return (f"""
        --------------------------------
                ACCOUNT STATEMENT
        --------------------------------
        Account type:   Savings Account
        Name:           {self.name}
        Account Number: {self.number}
        # thousand separation ,
        Balance:        {self.balance:,} ETB
        Rate:           {self.rate:}%
        # to format it to a year month and date 
        Created Date:   {self.created_date:%Y-%m-%d}
        --------------------------------
        """)
# second level of inheritance - Fixed Deposit account

class FixedDepositAccount(SavingsAccount):
    def __init__(self,name,number,balance,term):
        super().__init__(name,number,balance)
        self.__term=term

    @property 
    def term(self):
        return self.__term

    def statement (self):
        return f"""
--------------------------------
        ACCOUNT STATEMENT
--------------------------------
Account type:   Fixed Deposit Account
Name:           {self.name}
Account Number: {self.number}
Balance:        {self.balance:,} ETB
Rate:           {self.rate}%
Term:           {self.term} months
Created Date:   {self.created_date:%Y-%m-%d}
--------------------------------
"""


#Current Account

class CurrentAccount(Account):
    def __init__(self,name,number,balance):
        super().__init__(name,number,balance)
        self.__overdraft=BankConfig().overdraft_limit

    @property
    def overdraft(self):
        return self.__overdraft

    # from Day 5 
    def calculate_interest(self):
        return 0
    
    # overriding withdraw
    def withdraw(self, amount):
        # one point from withdraw
        if amount <=0:
            raise ValueError("Withdraw amount has to be grater than zero")
        if amount > self.balance+self.__overdraft:
            raise ValueError("Overdraft limit exceeded.")
        self._Account__balance -= amount
        self._notify(f"-{amount} ETB")
        self._Account__history.append(("withdraw", amount, datetime.now()))
          
    # overriding statement 
    def statement(self):
        return (f"""
                --------------------------------
                        ACCOUNT STATEMENT
                --------------------------------
                Account type:   Current Account
                Name:           {self.name}
                Account Number: {self.number}
                # thousand separation ,
                Balance:        {self.balance:,} ETB
                # Overdraft amount
                Overdraft Amount:{self.__overdraft:,} ETB 
                # to format it to a year month and date 
                Created Date:   {self.created_date:%Y-%m-%d}
                --------------------------------
                """)


# trial for polymorphism 

savings1 = SavingsAccount("Abebe", 1002, 10000)
current1 = CurrentAccount("Mekdes", 1003, 15000)
accounts=[savings1,current1]
for account in accounts:
    print(account.statement())




# Factory 
class AccountFactory:
    # since we don't need an instance for this particular class for the create method to function - AccountFactory.create
    @staticmethod
    def create(kind,name,number,balance=0):
        if kind=="savings":
            return SavingsAccount(name,number,balance)
        elif kind=="current":
            #less argument because of the Bankconfig
            return CurrentAccount(name,number,balance)
        else:
            raise ValueError("No such account type is available")

# Observer

class SMSAlert:
    def update(self,message):
        print(f"SMS: {message}")

class AuditLog:
    def update(self,message):
            print(f"Audit: {message}")
    


# Day 7
# Day 8 - Binary Search for account numbers
def binary_search_accounts(numbers, target):
    left = 0
    right = len(numbers) - 1

    while left <= right:
        middle = (left + right) // 2

        if numbers[middle] == target:
            return middle

        elif numbers[middle] < target:
            left = middle + 1

        else:
            right = middle - 1

    return -1


# Day 7 & Day 8
class AccountRegistry:
    def __init__(self):
        self.by_number = {}   # Fast lookup by account number
        self.order = []       # Keeps insertion order

    def add(self, acc):
        self.by_number[acc.number] = acc
        self.order.append(acc.number)

    def find(self, number):
        return self.by_number.get(number)

    def list_all(self):
        return self.order

    # Day 8 - Top accounts by balance
    def top_by_balance(self, n=5):
        accts = sorted(
            self.by_number.values(),
            key=lambda a: a.balance,
            reverse=True
        )
        return accts[:n]

    # Day 8 - Binary search for account number
    def find_by_number(self, number):
        nums = sorted(self.by_number)

        index = binary_search_accounts(nums, number)

        if index >= 0:
            return self.by_number[nums[index]]

        return None

    # Day 8 - Recursive total transactions
    def total_transactions(self, number):
        account = self.find(number)

        if account is None:
            return 0

        history = account.get_history()

        def sum_history(index):
            if index == len(history):
                return 0

            return history[index][1] + sum_history(index + 1)

        return sum_history(0)

    # Day 8 - Sort transactions by date
    def sort_transactions_by_date(self, number):
        account = self.find(number)

        if account is None:
            return []

        return sorted(
            account.get_history(),
            key=lambda transaction: transaction[2]
        )

    # Day 8 - Binary search transaction by date
    def binary_search_transactions(self, number, target_date):
        account = self.find(number)

        if account is None:
            return None

        transactions = sorted(
            account.get_history(),
            key=lambda transaction: transaction[2]
        )

        left = 0
        right = len(transactions) - 1

        while left <= right:
            middle = (left + right) // 2

            transaction_date = transactions[middle][2]

            if transaction_date == target_date:
                return transactions[middle]

            elif transaction_date < target_date:
                left = middle + 1

            else:
                right = middle - 1

        return None
 
# Day 9 
class Branch:
    def __init__(self,name):
        self.name=name
        self.children=[]
        self.accounts=[]
        self.employees = []
    # based on Day 9 exercises  
    def add_branch(self, branch):
        self.children.append(branch)
    def add_employee(self, employee):
        self.employees.append(employee)
    def total_balance(self):
        total=sum(a.balance for a in self .accounts)
        for child in self.children:
            total +=child.total_balance()
        return total
# transfer graph

class TransferGraph:
    def __init__(self):
        self.transfers = {}

    def add_transfer(self, sender, recipient):
        if sender not in self.transfers:
            self.transfers[sender] = []

        self.transfers[sender].append(recipient)

    def bfs(self, start):
        visited = set()
        queue = deque([start])

        while queue:
            account = queue.popleft()

            if account in visited:
                continue

            visited.add(account)

            for recipient in self.transfers.get(account, []):
                if recipient not in visited:
                    queue.append(recipient)

        return visited

    # Let's add a DFS based on day 9 exercise 
    def dfs(self, start, visited=None):
        if visited is None:
            visited = set()

        if start in visited:
            return visited

        visited.add(start)

        for recipient in self.transfers.get(start, []):
            self.dfs(recipient, visited)

        return visited

# Urgent transactions 
# Time Complexity: O(log n)
urgent_transactions = []   
def add_urgent_transaction(sender, recipient, amount, priority):
    transaction = (priority, sender, recipient, amount)

    heapq.heappush(urgent_transactions, transaction)

    print("Urgent transaction added successfully.")

# O(log n)
# process highest priority transaction 
def process_urgent_transaction():
    if not urgent_transactions:
        print("No urgent transactions to process.")
        return

    transaction = heapq.heappop(urgent_transactions)

    priority, sender, recipient, amount = transaction

    print("Processing urgent transaction...")
    print(f"Priority: {priority}")
    print(f"Sender: {sender}")
    print(f"Recipient: {recipient}")
    print(f"Amount: {amount} ETB")

# Search for customer account in BST
# Worst-case Time Complexity: O(n)

class AccountNode:
    def __init__(self, account):
        self.account = account
        self.left = None
        self.right = None


class AccountBST:
    def __init__(self):
        self.root = None

    # Add account to BST
    def insert(self, account):
        new_node = AccountNode(account)

        if self.root is None:
            self.root = new_node
            return

        current = self.root

        while True:
            if account.number < current.account.number:

                if current.left is None:
                    current.left = new_node
                    return

                current = current.left

            elif account.number > current.account.number:

                if current.right is None:
                    current.right = new_node
                    return

                current = current.right

            else:
                print("Account number already exists.")
                return

    # Search for customer account
    def search(self, account_number):
        current = self.root

        while current is not None:

            if account_number == current.account.number:
                return current.account

            elif account_number < current.account.number:
                current = current.left

            else:
                current = current.right

        return None

# Store all accounts in a dictionary
accounts = {}

# Day 9 data structures
root_branch = Branch("Main Branch")
transfer_graph = TransferGraph()
account_bst = AccountBST()

running = True

while running:

    print("""
========== ADDIS BANK ==========

1. Create new account
2. Deposit
3. Withdraw
4. Check balance
5. View account info
6. Add new branch / employee
7. Add money transfer connection
8. Show all connected customers using BFS/DFS
9. Add urgent transaction
10. Process highest priority transaction
11. Search for customer account in BST
12. Exit

=================================
""")
    choice = input("Enter your choice: ")
    try:
        if choice == "1":

            name = input("Enter customer's name: ")
            initial_balance = int(input("Enter initial balance: "))
            account_number = int(input("Enter account number: "))

            if account_number in accounts:
                print("Account number already exists.")

            else:
                account = Account(
                    name,
                    account_number,
                    initial_balance
                )
                # Store in dictionary
                accounts[account_number] = account
                # Also store in BST
                account_bst.insert(account)
                print("Account created successfully.")
        elif choice == "2":
            account_number = int(
                input("Enter account number: ")
            )
            amount = int(
                input("Enter deposit amount: ")
            )
            account = accounts[account_number]
            account.deposit(amount)
            print("Deposit successful.")
        elif choice == "3":
            account_number = int(
                input("Enter account number: ")
            )
            amount = int(
                input("Enter withdrawal amount: ")
            )
            account = accounts[account_number]
            account.withdraw(amount)
            print("Withdrawal successful.")
        elif choice == "4":
            account_number = int(
                input("Enter account number: ")
            )
            account = accounts[account_number]
            print(f"Balance: {account.balance:,} ETB")
        elif choice == "5":
            account_number = int(
                input("Enter account number: ")
            )
            account = accounts[account_number]
            print(account)
        elif choice == "6":
            branch_name = input(
                "Enter branch name: "
            )
            new_branch = Branch(branch_name)
            root_branch.add_branch(new_branch)
            employee = input(
                "Enter employee name: "
            )
            new_branch.add_employee(employee)
            print(
                "Branch and employee added successfully."
            )        
        elif choice == "7":
            sender = int(
                input("Enter sender account number: ")
            )
            if sender not in accounts:
                print("Sender account not found.")
                continue
            recipient = int(
                input("Enter recipient account number: ")
            )
            if recipient not in accounts:
                print("Recipient account not found.")
                continue
            transfer_graph.add_transfer(
                sender,
                recipient
            )
            print(
                "Money transfer connection added successfully."
            )
        elif choice == "8":
            start = int(
                input("Enter starting customer account: ")
            )
            if start not in accounts:
                print("Account not found.")
                continue
            method = input(
                "Choose BFS or DFS: "
            ).upper()
            if method == "BFS":
                connected = transfer_graph.bfs(start)
                print(
                    "BFS connected customers:",
                    connected
                )
            elif method == "DFS":

                connected = transfer_graph.dfs(start)
                print(
                    "DFS connected customers:",
                    connected
                )
            else:
                print(
                    "Please choose BFS or DFS."
                )
        elif choice == "9":

            sender = int(
                input("Enter sender account number: ")
            )
            if sender not in accounts:
                print("Sender account not found.")
                continue

            recipient = int(
                input("Enter recipient account number: ")
            )

            if recipient not in accounts:
                print("Recipient account not found.")
                continue
            amount = int(
                input("Enter transaction amount: ")
            )

            priority = int(
                input("Enter priority: ")
            )

            add_urgent_transaction(
                sender,
                recipient,
                amount,
                priority
            )
        elif choice == "10":
            process_urgent_transaction()
        elif choice == "11":
            account_number = int(
                input("Enter account number to search: ")
            )
            account = account_bst.search(
                account_number
            )
            if account:
                print("Account found!")
                print(account)
            else:
                print("Account not found.")
        elif choice == "12":
            print(
                "Thank you for using Addis Bank."
            )
            running = False
        else:
            print(
                "Please select only from 1-12."
            )
    except ValueError as error:
        print(f"Error: {error}")
    except KeyError:
        print("Account not found.")