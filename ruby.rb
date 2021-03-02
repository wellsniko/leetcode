# You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
# You may assume the two numbers do not contain any leading zero, except the number 0 itself.



def add_two_numbers(l1, l2)
    
    curr = try = ListNode.new()
    sum = 0

    while l1 || l2 || sum > 0
      # puts l1.val
        if l1
            sum += l1.val
            l1 = l1.next
        end
        if l2
            sum += l2.val
            l2 = l2.next
        end
    
        curr.next = ListNode.new(sum % 10)
        curr = curr.next
        sum /= 10
    end
  
    try.next
 
end


def length_of_longest_substring(s)
 
            substring = []
            max = 0
            s.each_char do |char|
                if substring.include?(char)
                    if substring.length > max
                        max = substring.length
                    end
                    prev_index = substring.index(char)
                    substring = substring[prev_index+1..-1]
                    substring.push(char)
                else
                    substring.push(char)
                end
            end
    
    if substring.length > max
        return substring.length
    else
        return max
    end
            
end


def find_median_sorted_arrays(nums1, nums2)
    new_array = nums1.concat(nums2)
    new_array.sort!
    p new_array
    len = new_array.length
    if len % 2 == 0
        puts new_array[len/2]
        puts new_array[(len/2) - 1]
        return (new_array[len/2] + new_array[(len/2) - 1].to_f)/2.0
    else
        return new_array[len/2].to_f
    end
end




def two_sum(nums, target)
    (0...nums.length).each do |i1|
        break if i1 == nums.length-1

        (i1+1...nums.length).each do |i2|
            if nums[i1] + nums[i2] == target
                return [i1, i2]
            end
        end
    end
    nil

end


##longest palindrome

def longest_palindrome(s)

    return "" if s.empty?
    
    head, tail = 0, 0
    
    i = 0
    while i < s.size
        len1 = find_palindrome(s, i, i)
        len2 = find_palindrome(s, i, i + 1)
        len = [len1, len2].max
        if tail - head < len
            head = i - (len - 1) / 2
            tail = i + len / 2
        end
        
        i += 1
    end
    
    s[head..tail]
end

def find_palindrome(s, left, right)
    l, r = left, right
    while 0 <= l && r < s.size && s[l] == s[r]
        l -= 1
        r += 1
    end
    r - l - 1
end

##^^


def convert(s, num_rows)
    return s if num_rows==1 or s.length<=1
    num_rows=s.length if num_rows>s.length
    row_hash = Hash.new
    zig = true
    row = 0
    s.chars.each do |chr|
        row_hash[row]=[] if row_hash[row]==nil
        row_hash[row]<<chr
        if zig
            row+=1
            zig=false if row==num_rows-1
        else
            row-=1
            zig=true if row==0
        end
    end
    ret_string=""
    for i in 0...num_rows
        ret_string.concat(row_hash[i].join(''))
    end
   ret_string
end


##string to integer (atoi)

def my_atoi(s)
    new_string = ""
    nums = "+-01234567890."
    
    s.each_char do |char| 
        if !nums.include?(char) && char != " " && new_string == ""
            return 0
        elsif !nums.include?(char) && char !=" "
            break
        else nums.include?(char)
            new_string << char 
        end
    end
    
    if new_string.to_i < -2**31
        return -2**31
    elsif new_string.to_i > 2**31 - 1
        return 2**31 - 1
    else
        return new_string.to_i
    end
end


#container with most water

def max_area(height)
    max_area = 0
    left = 0
    right = height.length - 1
    while right > left
        min_height = [height[left], height[right]].min
        area = find_area(min_height, left, right)
        if area > max_area
            max_area = area
        end
        
        if height[left] >= height[right]
            right -= 1
        else
            left += 1
        end
    
    end
    
    max_area
    
    
end


def find_area(high, left, right)
    return (right - left) * high

end

# ^^


def int_to_roman(num)
    data = { "1": "I", "4":"IV",  "5": "V",  "9":"IX", "10":"X",  "40":"XL",
           "50":"L", "90":"XC",  "100":"C", "400":"CD",  "500":"D", "900":"CM", "1000": "M"}
    
    return data[num.to_s.to_sym] if data.key?(num.to_s.to_sym)
    
    solution = ""
    
    [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1].each do |value|
        
        while num >= value
            p value
            solution << data[value.to_s.to_sym]
            num -= value 
            
            
        end
    end
    
    solution
end



def three_sum(nums)
    arr = nums
    return [] if arr.empty? || arr.length < 3
    arr_uniq = arr.uniq  
    return [[arr_uniq[0],arr_uniq[0],arr_uniq[0]]] if arr_uniq.length == 1 && arr_uniq[0] == 0
    return [] if arr.length  == 3 && arr.sum != 0
  
    arr = arr.sort!
    results = []
    0.upto(arr.length - 2) do |pointer_c|

        pointer_a = 1 + pointer_c
        pointer_b = arr.length - 1

        while(pointer_b > pointer_a)
            sum = arr[pointer_a] + arr[pointer_b] + arr[pointer_c]

            if sum == 0
                my_array = [arr[pointer_c],arr[pointer_a],arr[pointer_b]]
                results << my_array
                pointer_a += 1
                pointer_b -= 1
            elsif sum > 0
                pointer_b -= 1
            elsif sum < 0
                pointer_a += 1
            end
        end
  
    end

  return results.uniq

end


def three_sum_closest(nums, target)
    nums.sort!
    result = nums.slice(0..2).sum
    0.upto(nums.size-2) do |i|
        j = i+1
        k = nums.size-1
        while j < k
            sum = nums[i]+nums[j]+nums[k]
            return sum if sum == target
            result = sum if (sum-target).abs < (result-target).abs
            if sum < target 
                j+=1
            else
                k-=1
            end
        end
    end
    result
end


# Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
# A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

def letter_combinations(digits)

    map = "- - abc def ghi jkl mno pqrs tuv wxyz".split
    charsets = digits.chars.map { |d| map[d.to_i].chars }
    digits == "" ? [] : [''].product(*charsets).map(&:join)

end


#!practice
def four_sum(nums, target)
    
    nums.sort!
    map = Hash.new { |hash, key| hash[key] = Set.new }
    result = Set.new
    n = nums.length
    
    for i in 0...n
        for j in ((i + 1)...n)
            sum = nums[i] + nums[j]

             for item in map[target - sum]
                 s = item.to_a + [nums[i], nums[j]]
                 result.add(s)
             end
        end
        
        for k in (0...i)
            sum = nums[i] + nums[k]
            item = [nums[i], nums[k]]
            
            map[sum].add(item)
        end
    end
	    
    result.to_a

end


# Given an array nums and a value val, remove all instances of that value in-place and return the new length.
# Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
# The order of elements can be changed. It doesn't matter what you leave beyond the new length.
# Clarification:
# Confused why the returned value is an integer but your answer is an array?
# Note that the input array is passed in by reference, which means a modification to the input array will be known to the caller as well.


def remove_element(nums, val)
    nums.each_with_index do |num, i|
        if num == val
            nums[i] = nil
        end
    end
    nums.compact!
    nums.length
end



def divide(dividend, divisor)
    
    flag = [dividend, divisor].one?(&:positive?)
    dividend, divisor = dividend.abs, divisor.abs
    res = 0
    while dividend >= divisor
        tmp, mul = divisor, 1
        while dividend >= tmp
            dividend -= tmp
            res += mul
            mul = mul << 1
            tmp = tmp << 1
        end
    end

    flag ? [res * -1, -2147483648].max : [res, 2147483647].min

end


def my_pow(x, n)
    return 1 if n == 0
    return x if n == 1
    
    if n > 0
          result = my_pow(x,n/2) 
          result *= result

          if n.odd?
            result *=  x
          end

          return result
    elsif n < 0
        return 1/my_pow(x, -n)

    end
        
end

def rotate_right(head, k)
    return head if head.nil? or k.zero?
    
    len = 0    
    node = head
    until node.nil?
        last = node
        node = node.next
        len += 1
    end
    
    k %= len
    return head if k.zero?
    
    node = head
    prev = nil
    (len - k).times do
        prev = node
        node = node.next
    end
    
    prev.next = nil
    last.next = head
    
    node
end