# 1, Recursive sum

# Recursive sum - sums numbers from a list

def total(nums):
    if not nums:
        return 0
    return nums[0]+ total(nums[1:])

# to test 

numbers = [10, 20, 30, 40]
print(total(numbers))

# Recursive count - count down from n to 1

def count_down(n):
    if n <=0:
        return
    print(n)
    count_down(n-1)

# test
count_down(5)

# 2, Binary search 

def binary_search(items, target):
    left = 0
    right = len(items) - 1

    while left <= right:
        middle = (left + right) // 2

        if items[middle] == target:
            return middle

        elif items[middle] < target:
            left = middle + 1

        else:
            right = middle - 1

    return -1

# test 

balances = [1000, 2500, 4000, 5500, 7000, 8500, 10000]

print(binary_search(balances, 7000))
print(binary_search(balances, 5000))

# 3, Merge sort

# merge helper

def merge(left, right):
    result = []

    i = 0
    j = 0

    while i < len(left) and j < len(right):

        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result

# the merge sort function

def merge_sort(items):
    if len(items) <= 1:
        return items

    middle = len(items) // 2

    left = merge_sort(items[:middle])
    right = merge_sort(items[middle:])

    return merge(left, right)

# test 

numbers = [38, 27, 43, 3, 9, 82, 10]

print(merge_sort(numbers))
print(sorted(numbers))

# 4, Sort with a key

students = [("Ruth", 8500),("Abebe", 12000),("Sara", 5000),("John", 15000)]

sorted_students = sorted(
    students,
    key=lambda student: student[1],
    reverse=True
)

print(sorted_students)

# 5, Two Pointers

def has_pair(nums, target):
    left = 0
    right = len(nums) - 1

    while left < right:

        current_sum = nums[left] + nums[right]

        if current_sum == target:
            return True

        elif current_sum < target:
            left += 1

        else:
            right -= 1

    return False

# test

numbers = [1, 3, 4, 6, 8, 10]

print(has_pair(numbers, 14))
print(has_pair(numbers, 20))