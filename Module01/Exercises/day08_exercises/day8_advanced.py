# Advanced Exercises
# 6, Recursive Problems

# recursive function to reverse a string
def reverse_string(text):
    # Base case
    if len(text) <= 1:
        return text
    return reverse_string(text[1:]) + text[0]

# test
print(reverse_string("hello"))

# recursive function to count number of occurences of a target in a list 

def count_occurrences(numbers, target):
    # Base case
    if len(numbers) == 0:
        return 0
    # Count the first element
    count = 1 if numbers[0] == target else 0
    return count + count_occurrences(numbers[1:], target)

# test
numbers = [2, 5, 2, 8, 2, 9, 2]
print(count_occurrences(numbers, 2))

# 7, Sorting Comparison

# selection sort
def selection_sort(arr):
    comparisons = 0
    swaps = 0
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            comparisons += 1
            if arr[j] < arr[min_index]:
                min_index = j
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
            swaps += 1
    return comparisons, swaps

# test

numbers = [64, 25, 12, 22, 11]
comparisons, swaps = selection_sort(numbers)
print("Sorted:", numbers)
print("Comparisons:", comparisons)
print("Swaps:", swaps)

# Insertion sort
def insertion_sort(arr):
    comparisons = 0
    swaps = 0
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0:
            comparisons += 1
            if arr[j] > key:
                arr[j + 1] = arr[j]
                swaps += 1
                j -= 1
            else:
                break
        arr[j + 1] = key
    return comparisons, swaps

# test
numbers = [64, 25, 12, 22, 11]
comparisons, swaps = insertion_sort(numbers)
print("Sorted:", numbers)
print("Comparisons:", comparisons)
print("Swaps:", swaps)

# 8, Two Pointer Technique

def two_sum(numbers, target):
    left = 0
    right = len(numbers) - 1
    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return numbers[left], numbers[right]
        elif total < target:
            left += 1
        else:
            right -= 1
    return None

# test
numbers = [1, 2, 4, 6, 8, 9, 11]
target = 13
result = two_sum(numbers, target)
print(result)