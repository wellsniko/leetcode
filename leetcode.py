def bubble_sort(nums):
    sorted = False
    while sorted is False:
        sorted = True
        for i in range(len(nums)-1):
            if nums[i] > nums[i+1]:
                sorted = False
                nums[i], nums[i+1] = nums[i+1], nums[i]
    return nums

# print(bubble_sort([0, 1, 3, 2, 44, 6]))

def multiply_num_strings(num1: str, num2: str) -> str:
    h = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4,'5': 5, '6': 6, '7': 7, '8': 8, '9': 9}

    res1 = 0
    for char in num1:
        res1 = 10*res1 + h[char]

    res2 = 0
    for char in num2:
        res2 = 10*res2 + h[char]

    return str(res1 * res2)

# print(multiply_num_strings("12", "10"))

def combinationSum(candidates, target):

    candidates.sort()
    solution = []

    def summer(targ, temp, index):
        if sum(temp) == target:
            solution.append(temp)
        if candidates[index] > targ:
            return

        while index < len(candidates):
            summer(targ-candidates[index], temp + [candidates[index]], index)
            index += 1

    summer(target, [], 0)
    return solution

# print(combinationSum([2,3,4],5))


# print(1000*(1.02**250))
