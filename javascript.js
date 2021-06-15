
var isValidSudoku = function(board) {
    
    for (let i = 0; i < board.length; i++){
        let rowHash = {};
        for (let k = 0; k < board[i].length; k++){
     
            if (board[i][k] === '.') continue;
            let current = board[i][k];
            if (rowHash[current] === undefined) {
                rowHash[current] = current;
            } else {
                return false;
            }
        }
    }
    
    for (let i = 0; i < board.length; i++){
        let colHash = {};
        for (let k = 0; k < board[i].length; k++){
            
            if (board[k][i] === '.') continue;
            let current = board[k][i];
            if (colHash[current] === undefined) {
                colHash[current] = current;
            } else {
                return false;
            }
        }
    }
    
    for (let i = 0; i < board.length; i += 3){
        for (let k = 0; k < board[i].length; k += 3) {
            let boxHash = {};
            for (let x = i; x < i+3; x++) {
                for (let y = k; y < k+3; y++) {
                    
                    let current = board[x][y];
                    if (current === '.') continue;
                    if (boxHash[current] === undefined) {
                        boxHash[current] = current;
                    } else {
                        return false;
                    }
                }
            }
        }
    }
    
    return true
};



//!slow solution

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var buildTree = function(preorder, inorder) {
    if (preorder.length === 0 || inorder.length === 0) return 
    const root = preorder.shift()
    const inIndex = inorder.indexOf(root)

    let leftPre = []
    let leftIn = []

    inorder.splice(inIndex, 1)
    let i = 0
    while (i < inIndex ){
        leftPre.push(preorder.shift())
        leftIn.push(inorder.shift())
        i+=1
    }

    return new TreeNode(
        root,
        buildTree(leftPre, leftIn),
        buildTree(preorder, inorder)
    )
};


var sortedArrayToBST = function(nums) {
    if (!nums.length) return null;
    
    let mid = Math.floor(nums.length/2);
    let root = new TreeNode(nums[mid]);
    
    root.left = sortedArrayToBST(nums.slice(0, mid))
    root.right = sortedArrayToBST(nums.slice(mid+1, nums.length));
    
    return root
};



//checks if binary tree is balanced

function isBalanced(root) {
    if(root === null) return true;
    
    var right = treeSize(root.right)
    var left = treeSize(root.left)
    var difference = Math.abs( right - left )
    var result = true;
    
    if(difference > 1) result = false;
    
    return result && isBalanced(root.left) && isBalanced(root.right);
};

var treeSize = function(root){
    if(root === null) return 0;
    return 1 + Math.max(treeSize(root.right), treeSize(root.left));
};

//




var removeNthFromEnd = function(head, n) {
    
    if (!head.next) return null
  
    
    let stack = [head]
    for (let node = head; node.next; node = node.next){
        stack.push(node.next)
    }

    if (n > 1) {
        let removeIdx = stack.length-n
        if (removeIdx === 0 ){
            return stack[1]
        }
        stack[removeIdx-1].next = stack[removeIdx+1]
        stack[removeIdx].next = null
    } else if (n === 1) {
        stack[stack.length-2].next = null
    }
    
    return stack[0]
    
};


var canJump = function(nums) {
    let i =0
    let max=0
    
    for(let i=0;i<nums.length;i++){
        if(i > max){
           return false
           }
        if(i + nums[i] >= nums.length-1){
           return true
           }
        max = Math.max(max,i+nums[i])
    }
    
};


var groupAnagrams = function (strs) {
    var newArr = [];
    strs.forEach((elem) => {
        key = elem.split('').sort();
        newArr[key] instanceof Array ? newArr[key].push(elem) : newArr[key] = [elem];
    });
    return Object.keys(newArr).map(function (k) { return newArr[k] });
}

var searchMatrix = function(matrix, target) {
    let i = 0
    let k = 0

    if (matrix[i][k] > target) return false

    while (i < matrix.length && matrix[i][k] < target  ){
        if (matrix[i][k] === target) return true
        i++
    }

    if (i >= matrix.length) i--

    let spot
    while (i > -1 && k < matrix[i].length){
        spot = matrix[i][k]
        if (spot === target ) {
            return true
        } else if (spot > target){
            i--
        } else {
            k++
        }
    }
    
    return false
};


var combine = function(n, k) {
    let solution = [];
    
    function dfs(curr, start){
        if (curr.length === k){   
            solution.push(curr)
        }
        if (curr.length > k) return
        
        for (let i=start;i<=n; i++){  
            dfs(curr.concat(i), i+1)
        }
    }
    
    dfs([], 1)
    return solution
};


var generateParenthesis = function(n) {
    let solution = []
    
    function dfs(string, left, right){
        if (string.length === n * 2){
            solution.push(string)
            return
        }
        if (left < n){
            dfs(string+"(", left+1, right)
        }
        if (left > right){
            dfs(string+")", left, right+1)
        }
    }

    dfs("", 0, 0)
    return solution
};

//swap every other node
var swapPairs = function(head) {
        if (!head) return null
        let tempNode = head.next
        if (!tempNode) return head
    
        head.next = tempNode.next
        tempNode.next = head
        head.next = swapPairs(head.next)
        return tempNode

};



// var nextPermutation = function(nums) {
//     let idx = -1
//     let decreaser = -1
//     let last = nums.length - 1
//     for(let i = nums.length-1; i >0; i--){
        
//         if (nums[i-1] < nums[i]){
//             decreaser = i - 1
//             break;
//         }
//         idx = i
//     }
//     console.log(decreaser)
//     if (decreaser === -1) return nums.sort()
    
    
//     let leftHalf = nums.slice(0, decreaser)
//     console.log(typeof leftHalf)
//     let mid = nums[decreaser]
//     console.log(typeof mid)
//     let rightHalf = nums.slice(decreaser + 1, nums.length).sort()
//     console.log(typeof rightHalf)
//     leftHalf.push(rightHalf.shift())
//     // console.log(leftHalf)
//     // console.log(rightHalf)
//     rightHalf.push(mid)
//     rightHalf.sort()
   
//     console.log(rightHalf)
//     console.log(leftHalf)
//     let solution 
//     solution = leftHalf.concat(rightHalf)
//     console.log(typeof solution)
//     // console.log(rightHalf)
//     let hello = [1,2]
//     console.log(typeof hello)
//     return solution
    
    
    
// };

// console.log(typeof nextPermutation([2,1,3,4]))


var searchRange = function(nums, target) {
    let i = 0
    let k = nums.length - 1
    let solution = [-1,-1]
    
    while (k >= i && (solution[0] === -1 || solution[1] === -1)){
        
        if (nums[k] === target && solution[1] === -1){
            solution[1] = k    
        }
        if (nums[i] === target && solution[0] === -1) {
            solution[0] = i
        }
        
        if (solution[0] === -1) i++
        if (solution[1] === -1) k --
           
    }
    
    return solution
        
};

// console.log(searchRange([5,7,7,8,8,10], 6))

var combinationSum = function(candidates, target) {
    let solution = []

    function dfs(candidates, target, start, temp){
        if (target < 0) return
        if (target === 0) {
            // needs to be copy of temp
            solution.push(temp.slice())
            return
        }
            
        for (var i = start; i < candidates.length; i++) {
            temp.push(candidates[i])
            dfs(candidates, target - candidates[i], i, temp)
            temp.pop()
        }
    }
    
    dfs(candidates, target, 0, [])
    return solution
    
      
};


//combo sum none of the same nums
var combinationSum2 = function(candidates, target) {
    candidates = candidates.sort()
    solution = [];
    dfs(candidates, target, [], 0)
    return solution
    
    function dfs(candidates, target, temp, start){
        if (target === 0) {
            if (!solution.some(arr => String(arr) === String(temp))) {
                solution.push(temp.slice())
            }
            
            return
        }
        if (target < 0) return
        
        for (let i = start; i < candidates.length; i++){
            temp.push(candidates[i])
            curr = candidates.slice()
            dfs(curr, target-candidates[i], temp, i+1)
            temp.pop()
        }
        
    }
};


var permute = function(nums) {
    
    let solution = []
    dfs(nums, solution)
    return solution

    function dfs(nums, solution, temp = new Set()){
  
        if (temp.size === nums.length) {
            solution.push([...temp])
            return
        }
            
        for (let value of nums) {
            console.log(value)
            if (temp.has(value)){
                continue
            }
            
            temp.add(value)
            dfs(nums, solution, temp)               
            temp.delete(value)
        }
    }  
    
    
};


// """
// Given a binary tree, with characters as nodes, return the path from leaf node to root, but smallest alphabetically
// for example, A is root, DEA, BAEA, BCA are all paths from leaf to the root A, but returns BCA because B comes DEA and BCA is shorter than BAEA
// A
//     / \
// E   C
//     / \  /
// D  A B
//     /
//     B
// Each node should have the property of:
// -value
// - left
// - right


var removeDuplicates = function(nums) {
    if (nums.length < 2) return nums
    
    let i = 0
    let k
    while(i<nums.length-1){
        k = i+1
       
        if (nums[i]=== nums[k]){
            nums.splice(k, 1)
        } else {
            i++
        }
    }
    
    return nums.length 
    
};


var removeDuplicates2 = function(nums) {

    let i = 0
    let k
    let j
    
    while(i<nums.length-2){
        k = i+1
        j = i+2
       
        if (nums[i]=== nums[k] && nums[i]===nums[j]){
            nums.splice(k, 1)
        } else {
            i++
        }
    }
    
    return nums.length 

};


var minFallingPathSum = function(matrix) {
    
    for (let i = 1; i<matrix.length;i++){
        for (let j=0; j<matrix[i].length;j++){
            let left = Infinity
            let right = Infinity
            if (j >= 1){
                left = matrix[i-1][j-1]
            }
            if (j +1 < matrix[i].length){
                right = matrix[i-1][j+1]
            }
            
            let center = matrix[i-1][j]
            
            matrix[i][j] += Math.min(left, right, center)
            
        }
    }
    
    return Math.min(...matrix[matrix.length-1]) 
};



//memoization technique
var change = function(amount, coins, memo = {}) {
    let key = amount + '-' + coins;
    if (key in memo) return memo[key];
    if (amount === 0) return 1;
    
    let currentCoin = coins[coins.length-1]
    let total = 0;
    
    for (let qty = 0; qty * currentCoin <= amount; qty++){
        total += change(amount - qty * currentCoin, coins.slice(0, -1), memo);
    }
    
    memo[key] = total;
    return memo[key];
};



var minPathSum = function(grid) {
    let m = grid.length
    let n = grid[0].length
    let table = new Array(m).fill().map(()=> new Array(n).fill(Infinity))
    table[0][0] = grid[0][0]
    
    
    for (let i = 0; i < grid.length; i++){
        
        for (let j = 0; j< grid[0].length; j++){
            if (j < grid[0].length-1){
              table[i][j+1] = Math.min(grid[i][j+1] + table[i][j], table[i][j+1])  
            }
            
            if (i < grid.length-1) {
              table[i+1][j] = Math.min(grid[i+1][j] + table[i][j], table[i+1][j])  
            }
            
            
        }
    }
    
    return table[grid.length-1][grid[0].length-1]
};



var climbStairs = function(n) {
    let table = new Array(n+1)
    
    table[0] = 1
    table[1] = 1
    
    for (let i = 2; i < table.length; i++) {
        table[i] = table[i-1] + table[i-2]
    }
    
    return table[table.length-1]
};







var twoCitySchedCost = function(costs) {
    // let newCost = costs.map((cost, i)=>{
    //     return Math.min(cost[0], cost[1])
    // })
    
    costs.sort((a,b) => (a[0]-a[1])- (b[0]-b[1]))
    
    let cost = 0
    let n = costs.length/2
    
    for (let i=0; i<costs.length; i++){
        if (i<n) {
            cost+=costs[i][0]
        } else {
            cost +=costs[i][1]
        }
    }
    
    return cost
};


var removeDuplicates = function(s, k) {
    const stack = [];
    
    for(let char of s) {
        if(stack.length && stack[stack.length-1][0] === char) {
            stack[stack.length-1][1] += 1;
            if(stack[stack.length-1][1] === k) {
                stack.pop();
            }
        } else {
            stack.push([char, 1]);
        }
    }
    
    let res = '';
    
    for(let [char, count] of stack) {
        res += char.repeat(count);
    }
    
    return res;
};



var removeDuplicatesOfKAmountInString = function(s, k) {
    let stack = []
    
    for (let char of s){
        if (stack.length && stack[stack.length-1][0] === char){
            stack[stack.length-1][1]++
            if (stack[stack.length-1][1]=== k){
                stack.pop()
            }
        } else {
          stack.push([char, 1])   
        }
        
    }
    
    let solution = ""
    stack.forEach(index =>{
        solution+= index[0].repeat(index[1])
    })
    
    return solution
};

var jump2 = function(nums) {
    
    let jumps = new Array(nums.length).fill(Infinity)
    jumps[0] = 0
    
    for (let i = 1; i<jumps.length; i++){
        for (let k = 0; k < i; k++){
            if (jumps[k] !== Infinity && k + nums[k] >= i){
                jumps[i] = Math.min(jumps[i], jumps[k] + 1)
            }
        }
    }
    console.log(jumps)
    
    return jumps[jumps.length-1]
}


var canReach = function(arr, start, visited = {}) {
    if (arr[start] === undefined || visited[start]) return false
    if (arr[start] === 0) return true
    visited[start] = true
      
    return canReach(arr, start-arr[start], visited) || canReach(arr, start+arr[start], visited)
    
};



var firstUniqChar = function(s) {
    let map = {}
    
    for (let i = 0; i<s.length; i++){
        if (map[s[i]]){
            map[s[i]]++
        } else {
            map[s[i]] = 1
        }
    }
    
    for (let i = 0; i<s.length; i++){
        if (map[s[i]] === 1){
            return i
        }
    }
    
    return -1
};



//! change
var lengthOfLongestSubstring = function(s) {
    if (s.length == 0) return '';
    let memory = new Map();
    let l = 0;
    let max = 0;
    // console.log(memory)
    // growing window algorithm
    // console.log([...s].entries([]))
    for ([e,r] of [...s].entries()) {

        if (memory.has(e)) {
            // shrink left...
            l = Math.max(l, memory.get(e) + 1);
        }
        // increase window
            // console.log(memory)

        memory.set(e, r);
        if (r+1 - l > max) max = r+1 - l;
    }
        // console.log(memory)

    return max;
};

// console.log(lengthOfLongestSubstring("abcabca"))


var searchBST = function(root, val) {
    if (!root) return null
    if (root.val === val) return root
    
    if (root.val > val){
        return searchBST(root.left, val)
        
    } else if (root.val < val){
        return searchBST(root.right, val)
    }
    
};


var isValidBST = function(root, min, max) {
    
    if (!root) return true
    
    if (max !== undefined && root.val >=max){
        return false
    }
    
    if (min !== undefined && root.val <= min){
        return false
    }
    
    return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max)
};


var invertTree = function(root) {
    if (!root) return root
    let tempLeft
    let tempRight
    if (root.left) tempRight = root.left
    if (root.right) tempLeft = root.right
    
    if (tempRight) {
        root.right = tempRight
        if (root.left === root.right) root.left = null
    }
    if (tempLeft) {
        root.left = tempLeft
        if (root.left === root.right) root.right = null
    }
    
    invertTree(root.left)
    invertTree(root.right)
    
    return root
    
};



var numIslands = function(grid) {
    let answer = 0
    function coverIsland(i, j){
        if ( i >= 0 && i < grid.length && j >= 0 && j < grid[0].length && grid[i][j] === "1"){
            grid[i][j] = "0"
            coverIsland(i+1, j)
            coverIsland(i, j+1)
            coverIsland(i-1, j)
            coverIsland(i, j-1)
        }
    }
    
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j <grid[0].length; j++){
            if (grid[i][j] === "1"){
                answer+=1
                
                coverIsland(i, j)
            }
        }
    }
    
    return answer
};



var myPow = function(x, n) {
    if (n === 0) return 1
    if (n === 1) return x
    
    if (n > 0) {

        
        if (n % 2 === 0){
            let result = myPow(x, n/2)
            return result * result
        } else {
            return x * myPow(x, n-1)
        }
        
    } else if (n < 0){
        if (n % 2 === 0){
            let result = myPow(x, n/2)
            return result * result
        } else {
            return myPow(x, n+1)/x 
        }
        
    }
};


function listNodeAdd(l1, l2){
	let first = new ListNode()
	let curr = first
	let sum = 0
	while (l1 || l2 || sum > 0){
	if (l1){
	    sum+= l1.val
	    L1 = l1.next
    }
    if (l2){
	sum+= l2.val
	l2 = l2.next
}
    curr.next = new ListNode(sum % 10)
    curr = curr.next
    sum = Math.floor(sum/10)
}
	return first.next	
}


var mergeInBetween = function(list1, a, b, list2) {
    let index = 1
    let sentinel = new ListNode(0,list1)
    let nodeA = list1
	let nodeB = list1
    while(index<a){
        nodeA = nodeA.next
        index++
    }
    index = -1
    while(index<b){
        nodeB = nodeB.next
        index++
    }

    nodeA.next = list2
    getLastIndex(list2).next = nodeB
    return sentinel.next
};

function getLastIndex(node) {
    let outputNode = node
    while(outputNode.next !== null){
        outputNode = outputNode.next
    }
    return outputNode
};



var maxDepth = function(s) {
    if (s.length <= 1) return 0;
    
    //use a stack, put only left parentheses in, keep track of how deep you are based on length of the stack
    //if you see the other direction, pop one off the stack
    
    let solution = 0
    
    let stack = []
    
    for (char of s){
        char === "(" ? stack.push(char) : null
        stack.length > solution ? solution = stack.length : null
        char === ")" ? stack.pop() : null
    }
    
    return solution
};


var allPathsSourceTarget = function(graph) {
    //dfs
    //collection of arrays, until the last index equals the last number index (array[array.length-1] === graph[graph.length -1])
    // recursive, start with an array of [0], and run recursively on each number, then go to that index (store index in args of dfs)
    // check to see if the index was already visited and only go to unvisited.  if you get to an index with no length, return nothing
    // dfs args = (graph[idx], visited, target)
    //visited will already be in the path
    
    //could possibly put visited indexes to null with dynamic programming
    if (!graph) return []
    
    
    let solution = []
    dfs([0], graph[0], graph.length-1)
    return solution
    
    function dfs(path, options, target){
 
        if (path[path.length-1] === target){
            let ans = path.slice()
            solution.push(ans)
            
            return
        }
        
        //mutating weirdly
        options.forEach(step =>{
            if (!path.includes(step)) {
                path.push(step)
                dfs(path, graph[step], target)
                path.pop()
            }
        })
        
    }
};

var copyRandomList = function(head) {
    //go through every old Node and set a copiecat with the same val
    // keep track of newHead
    //go through every oldNode again and set the copy's values to its copys
    if (!head) return null
    newHead = new Node(head.val)
    
    head.copyCat = newHead
    oldNode = head.next
    while (oldNode){
        oldNode.copyCat = new Node(oldNode.val)
        oldNode = oldNode.next
    }
    
    oldNode = head

    while (oldNode){
        oldNode.next ? oldNode.copyCat.next = oldNode.next.copyCat : oldNode.copyCat.next = null
        oldNode.random ? oldNode.copyCat.random = oldNode.random.copyCat : oldNode.copyCat.random = null
        oldNode = oldNode.next
    }
    
    
    return newHead
    
    
};


var isValid = function(s) {
    
    let stack = []
    for (let char of s){
        if (char === "(" || char === "[" || char === "{") stack.push(char);
        
        if (char === ")" ){
            if (stack[stack.length-1] !== "(") {
                return false
            } else {
                stack.pop()
            }
        }
        
        if (char === "]" ){
            if (stack[stack.length-1] !== "[") {
                return false
            } else {
                stack.pop()
            }
        }
        
        if (char === "}" ){
            if (stack[stack.length-1] !== "{") {
                return false
            } else {
                stack.pop()
            }
        }
    }
    
    
    return stack.length === 0
};


// mergeInterval method 1 
var merge = function(intervals) {
    intervals.sort((a, b)=> a[0]-b[0])
    let solution = []

    for (let i = 0; i<intervals.length; i++){
        let curr = intervals[i]
        if (i === 0){
            solution.push(curr)
            continue;
        } 
        let prev= solution[solution.length-1]
        
        if (prev[1]>=curr[0]){
            prev[1] = Math.max(prev[1], curr[1])
        } else {
            solution.push(curr)
        }
    }
    return solution
};

//mergeInterval method 2
var merge = function(intervals) {
    intervals.sort((a,b)=> a[0]-b[0])
    
    for (let i = 0; i < intervals.length-1; i++){
        while (intervals[i+1] && intervals[i][1]>=intervals[i+1][0]){
            intervals[i]= [intervals[i][0], Math.max(intervals[i][1], intervals[i+1][1])]
            intervals.splice(i+1, 1)
        }
    }
    
    return intervals
};
//



var subsets = function(nums) {
    let solution = []
    dfs([], 0, nums)
    
    return solution
    
    function dfs(curr, index, nums){
        let copy = curr.slice()
        solution.push(copy)     
        
        for (let i = index; i<nums.length; i++){        
            curr.push(nums[i])
            dfs(curr, i+1, nums)
            curr.pop()
        }
    
        return
    }
};


var isPalindrome = function(s) {
    let array = []
    let alphabet = "abcdefghijklmnopqrstuvwxyz"
    
    for (let char of s){
        if (alphabet.includes(char.toLowerCase())){
            array.push(char.toLowerCase())
        }
    }
    
    console.log(array)
  
    let arrayR = array.reverse()
    console.log(arrayR)
    console.log(array == arrayR)
    return array.join("") === arrayR.join("")
    

};

var isAnagram = function(s, t) {
    let map = {}
    for (let char of s){
        map[char] ? map[char]++ : map[char] = 1
    }
    
    for (let char of t){
        if (map[char] || map[char] === 0){
            map[char]--
        } else {
            return false
        }
    }
    
    return Object.values(map).every(val => val === 0)
};


var invalidTransactions = function(transactions) {
    transactions = transactions.map(trans => trans.split(","))
    let solution = []
    
    for (let i = 0; i<transactions.length; i++){
        if (parseInt(transactions[i][2])>1000){
            solution.push(transactions[i].join(","))
            continue
        }
        for (let k = 0; k<transactions.length; k++){
            
            if (k !== i && transactions[i][0] === transactions[k][0] && transactions[k][3] !== transactions[i][3]){
                let difference = parseInt(transactions[i][1])-parseInt(transactions[k][1])
                if (difference <= 60 && difference >= -60 && transactions[i][0]){
                    solution.push(transactions[i].join(","))
                    break
                }
                            
            }

        }
    }
    
    return solution

};

var addTwoNumbers = function(l1, l2) {
    let reversed1 = reverseList(l1)
    let reversed2 = reverseList(l2)
    
    let sum = 0
    let sentinalNode = new ListNode(25)
    let oldNode = sentinalNode

    while(reversed1 || reversed2 || sum > 0){
        if (reversed1){
            sum+=reversed1.val
            reversed1 = reversed1.next
        }
        if (reversed2){
            sum+=reversed2.val
            reversed2 = reversed2.next
        }
        console.log(sum)
        newNode = new ListNode(sum%10)
        oldNode.next = newNode
        oldNode = newNode
        sum=Math.floor(sum/10)
        
    }
    
    
    let correct = sentinalNode.next
    
    sentinalNode.next = null
    
    return reverseList(correct)
    
    
    function reverseList(list){
        if (!list.next || !list) return list
        let prev = list
        
        let nextNode = prev.next
        prev.next = null
        
        while (nextNode.next){
            let tempHead = nextNode.next
            nextNode.next = prev
            prev = nextNode
            nextNode = tempHead
        }
        nextNode.next = prev
        return nextNode
        
    }
};


var topKFrequent = function (words, k) {
    let map = {}

    words.forEach(word => {
        map[word] ? map[word]++ : map[word] = 1
    })

    let sorted = Object.entries(map).sort((a, b) => {
        if (b[1] === a[1]) {
            return a[0] > b[0] ? 1 : -1
        }
        return b[1] - a[1]

    })
    let solution = []
    let i = 0
    console.log(sorted)
    while (i < k) {
        solution.push(sorted[i][0])
        i++
    }

    return solution
};

var UndergroundSystem = function() {
    this.checkIns = new Map()
    this.averageTimes = new Map()
};

/** 
 * @param {number} id 
 * @param {string} stationName 
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkIn = function(id, stationName, t) {
    this.checkIns.set(id, {stationName, time: t})
};

/** 
 * @param {number} id 
 * @param {string} stationName 
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkOut = function(id, stationName, t) {
    const averageTimes = this.averageTimes
    const checkIn = this.checkIns.get(id)

    const key = `${checkIn.stationName} - ${stationName}`
    
    
    if (averageTimes.has(key)){
        averageTimes.set(key, {
            total: averageTimes.get(key).total + t - checkIn.time,
            count: averageTimes.get(key).count + 1
        })
        
    } else {
        averageTimes.set(key, {total: t - checkIn.time, count:1})
    }

};

/** 
 * @param {string} startStation 
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem.prototype.getAverageTime = function(startStation, endStation) {
    let key = `${startStation} - ${endStation}`
    const value = this.averageTimes.get(key)

    return value.total/value.count
};


var RandomizedSet = function() {
    this.map = new Map()    
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    
    if (this.map.has(val)){
        return false
    } else {
        this.map.set(val, val)
        return true
    }
    
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (this.map.has(val)){
        this.map.delete(val)
        return true
    } else {
        return false
    }
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    let randomIdx = Math.floor(Math.random() * this.map.size)
    let keys = [...this.map.keys()]
    return this.map.get(keys[randomIdx])
};



function minimizeCost(numPeople, x, y) {
    // Write your code here
    console.log(numPeople)
    let xArray = Array(Math.max(...x)).fill(null)
    let yArray = Array(Math.max(...y)).fill(null)
    
    let newX = xArray.map((space, index)=>{
        let sum = 0
        for (let i = 0; i< x.length; i++){
            
            sum += numPeople[i] * Math.abs(x[i]-(index+1))
            
            
        }
        
        return sum
    })
    
    let newY = yArray.map((space, index)=>{
        let sum = 0
        for (let i = 0; i< y.length; i++){
            
            sum += numPeople[i] * Math.abs(y[i]-(index+1))
            
            
        }
        return sum
        
    })
        return Math.min(...newX) + Math.min(...newY)
}




var coinChange = function(coins, amount) {
    let numCoins = new Array(amount+1).fill(Infinity)
    numCoins[0]= 0
    
    for (let coin of coins){
        for (let i = 0; i < numCoins.length; i++){
            if (coin > i) continue
            numCoins[i] = Math.min(numCoins[i], numCoins[i-coin]+1)
        }
    }
    
    return numCoins[numCoins.length -1] === Infinity ? -1 : numCoins[numCoins.length-1]
};


var smallestFromLeaf = function(root, parent="") {
    if (root === null) return parent;
    const char = String.fromCharCode(root.val + 97);
    if (root.right === null) return smallestFromLeaf(root.left, char + parent);
    if (root.left === null) return smallestFromLeaf(root.right, char + parent);
    
    const leftSmallest = smallestFromLeaf(root.left, char + parent);
    const rightSmallest = smallestFromLeaf(root.right, char + parent);
    return leftSmallest < rightSmallest ? leftSmallest : rightSmallest;   
};




//product from root to leaf
		// 			1
				
		// 	2 				3
			
	// 6		2		4		1
 
	// 							   4
class Node {
    constructor(val, parent=null){
        this.val = val
        this.parent = parent
        this.left = null
        this.right = null 
    }
}



    
    
    
function binaryProduct(root, target){
    let count = 0
    dfs(root, root.val, [root.val])
    return count
         
    function dfs(node, product, visited){

        while (product > target || product === 0){
            product/=visited.shift()
        }
            
        if (product === target) {
            count++
        }
        
            
        if (node.left){
            let newVisited = visited.slice()
            newVisited.push(node.left.val)
            dfs(node.left, product * node.left.val, newVisited)
        }
            
        if (node.right){
            let newVisited2 = visited.slice()
            newVisited2.push(node.right.val)
            dfs(node.right, product * node.right.val, newVisited2)
        }
            
            
        while (product >= target || product === 0){
            product/=visited.shift()
            if (product === target) count++
        }
            
            
    } 
}
    
    // array.push(node.val)
    // n >= 0
    // if product is greater than target, array.shift()
    // 
    
    
    		// 	    0
				
		// 	2 				1
			
	// 6		2		4		1
 
	// 							   12
    
    //sample output = 4
    
let node1 = new Node(0)
let node2 = new Node(2)
let node3  = new Node(1)
let node4 = new Node(6)
let node5 = new Node(2)
let node6 = new Node(4)
let node7  = new Node(1)
let node8 = new Node(12)
    
node1.left = node2
node1.right = node3
node2.left = node4
node2.right = node5
node3.left = node6
node3.right = node7    
node7.right = node8
    
    //   a 10
    // b 2  c 3
   
    
console.log(binaryProduct(node1, 12))





// word search

var exist = function(board, word) {
    let starts = findFirstLetter(word[0])
    
    for (let s = 0; s<starts.length; s++){
        if (search(starts[s][0], starts[s][1], word, board)) return true
    }
    
    function findFirstLetter(letter){
        let starts = []
        
        for (let i = 0; i<board.length; i++){
            for (let k = 0; k<board[0].length; k++){
                if (board[i][k] === letter) starts.push([i,k])
            }
        }
        return starts
    }
    
    return false
    
};

function search(row, col, word, board){
    if (board[row][col] !== word[0]) return false
    if (word.length === 1) return true
    let temp = board[row][col]
    board[row][col] = null
        
    if (row > 0 && search(row-1, col, word.slice(1), board)) return true
    if (col > 0 && search(row, col-1, word.slice(1), board)) return true
    if (row +1 < board.length && search(row+1, col, word.slice(1), board)) return true
    if (col + 1 < board[0].length && search(row, col+1, word.slice(1), board)) return true
    board[row][col]= temp
        
}


///BST Iterator smallest in line

var BSTIterator = function(root) {
        this.stack = []
        this.smallest = null
        let temp = root
        
        while(temp){
            this.stack.push(temp)
            this.smallest = temp.val
            temp = temp.left
        }
    
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
   if (this.hasNext) {
       let node = this.stack.pop()
       this.smallest = node.val
       let temp = node.right
       while (temp){
           this.stack.push(temp)
           temp = temp.left
       }
   }
    
    return this.smallest
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this.stack.length > 0

};
        



//! merge linked lists
var mergeKLists = function(lists) {
  
    function merge(l1, l2){
        if (!l1 || !l2) return l1 || l2
        let node = {}
        let fakeNode = node
        let temp = null
        
        while (l1 && l2){
            if (l1.val < l2.val){
                node.next = l1
                temp = l1
                l1 = l1.next
                temp.next = null
                node = node.next
            } else {
                node.next = l2
                temp = l2
                l2 = l2.next
                temp.next = null
                node = node.next
            }
        }
        
        if (l1) node.next = l1
        if (l2) node.next = l2
        
        return fakeNode.next
        
    }
    
    let root = lists[0]
    
    for (let i = 1; i< lists.length; i++){
        root = merge(root, lists[i])
    }
    

    return root || null
};


//permutation II

var permuteUnique = function(nums) {
    nums.sort((a,b)=> a-b)
    let solution = []
    dfs([], {})
    return solution
    
    function dfs(curr, visited){
        if (curr.length === nums.length){
            solution.push(curr.slice())
            return
        }
        
        for (let i = 0; i < nums.length; i++){
            if (visited[i]) continue
            
            visited[i] = true
            curr.push(nums[i])
            dfs(curr, visited)
            visited[i] = false
            curr.pop()
            
            while (nums[i] === nums[i+1]) i++ 
        }
    }
};


// combination sum 3

var combinationSum3 = function(k, n) {
    let solution = []
    
    dfs([],1,0)

    return solution
    
    function dfs(curr, num, sum){
        if (sum === n && curr.length === k){
            solution.push(curr.slice())
            return
        }
        
        
        for (let i = num; i < 10; i++ ){
            
            curr.push(i)
            sum+=i
            dfs(curr, i+1, sum)
            sum-=i
            curr.pop()
        }
        
    }
};



//check if number is sum of distinct powers of 3

var checkPowersOfThree = function(n) {
    
    while (n !== 0){
        if (n % 3 === 0){
            n = n / 3
        } else if (n % 3 === 1){
            n = (n-1) / 3
        } else {
            return false
        }
    }
    return true
};

// binary tree biggest sum path -- hard

var maxPathSum = function(root) {
    const maxSum = (root) => {
        if(!root) return 0;
        let lsum = Math.max(maxSum(root.left), 0);
        let rsum = Math.max(maxSum(root.right), 0);
        let curr = lsum + rsum + root.val;
        sum = Math.max(sum, curr);
        return root.val + Math.max(lsum, rsum);
    };
    let sum = -Infinity
    maxSum(root);
    return sum;
};


// asteroid collision
var asteroidCollision = function(asteroids) {
    const stack = []
    
    for (let i = 0; i < asteroids.length; i++) {
        const curr = asteroids[i]
        
        if (curr > 0) {
            stack.push(curr)
        } else if (!stack.length) {
            stack.push(curr)
        } else {
            let last = stack[stack.length-1]
            while ((Math.abs(curr) > Math.abs(last)) && (last > 0)) {
                stack.pop()
                last = stack[stack.length-1]
            }
            if ((curr + last) === 0) {
                stack.pop()
            } else if (!stack.length || (last < 0)) {
                stack.push(curr)
            }
        }
    }
    
    return stack
};


var constructMaximumBinaryTree = function(nums) {
    if (!nums.length) return null
    let biggest = Math.max(...nums)
    
    let bigIdx = nums.indexOf(biggest)
    let left = constructMaximumBinaryTree(nums.slice(0, bigIdx))
    let right = constructMaximumBinaryTree(nums.slice(bigIdx+1))
    return new TreeNode(biggest,left, right)
};



//sliding window method
var maximumUniqueSubarray = function(nums) {
    let set = new Set()
    let sum = 0
    let res = 0
    let l = 0
    let r = 0
    
    while(l<nums.length && r < nums.length){
        if (!set.has(nums[r])){
            set.add(nums[r])
            sum+=nums[r]
            res = Math.max(sum, res)
            r++
        } else {
            sum-=nums[l]
            set.delete(nums[l])
            l++
        }
    }
    
    return res
};


/// dynamic programming
var uniquePaths = function(m, n) {
 
    const table = [...new Array(m)].map(_ => new Array(n).fill(0));
    table[0][0]= 1
    
    for (let i = 0; i < table.length; i++){
        for (let k= 0; k<table[i].length; k++){

            let top = 0
            let left = 0
            if (i !== 0){
             top = table[i-1][k]   
            }
            if (k !== 0){
              left = table[i][k-1]  
            }
            
            table[i][k]+= (left+top)
            
        }
    }
    
    return table[table.length-1][table[0].length-1]
};

var pathSum = function(root, targetSum) {
    
    if (!root) return []
    let res = []
    
    dfs(root, root.val, [root.val])
    
    return res
    
    function dfs(node, sum, curr){
        if (!node.left && !node.right && sum === targetSum){
            res.push(curr)
            return
        }
        
        if (node.left){
            dfs(node.left, sum+node.left.val, curr.concat(node.left.val))
        }
        
        if (node.right){
            dfs(node.right, sum+node.right.val, curr.concat(node.right.val))
        }
        
    }
};


//pathSum III

var pathSum = function(root, targetSum) {
    
    if (!root) return 0
    let count = 0
    dfs(root, root.val)
    
    return count + pathSum(root.left, targetSum) + pathSum(root.right, targetSum)
    
    function dfs(node, sum){
        
        if ( sum === targetSum){
            count++   
        }
        
        if (node.left){
            dfs(node.left, sum+node.left.val)
        }
        if (node.right){
            dfs(node.right, sum+node.right.val)
        }   
    }
    
};




///unique paths with obstacles

var uniquePathsWithObstacles = function(obstacleGrid) {

    if (obstacleGrid[0][0] === 1) return 0
    for (let i = 0; i<obstacleGrid.length; i++){
        for (let k= 0; k<obstacleGrid[0].length; k++){
            if (obstacleGrid[i][k]=== 1){
                obstacleGrid[i][k]= false
            }
        }
    }
    
    obstacleGrid[0][0] = 1
    for (let i = 0; i<obstacleGrid.length; i++){
        for (let k= 0; k<obstacleGrid[0].length; k++){
            if (obstacleGrid[i][k]=== false) continue
            let left = 0
            let top = 0
            if (i >0){
                top = obstacleGrid[i-1][k]
            }
            if (k>0){
                left = obstacleGrid[i][k-1]
            }
            
            obstacleGrid[i][k]+=left+top
        }
    }
    
    
    return obstacleGrid[obstacleGrid.length-1][obstacleGrid[0].length-1]
};

//uniqe paths in 4 directions with obstacles (need to hit every empty point)
var uniquePathsIII = function(grid) {
    if (!grid || grid.length === 0) return 0
    
    const dirs = [[0,1], [1,0], [-1, 0], [0, -1]]
    let res = 0
    let start
    let end
    let height = grid.length
    let width = grid[0].length
    let totalZ = 0
    
    for (let i = 0; i < height; i++){
        for (let k = 0; k < width; k++){
            if (grid[i][k] === 1) start = [i,k]
            if (grid[i][k] === 2) end = [i,k]
            if (grid[i][k] === 0) totalZ++
        }
    }
    
    function goFind(row, col, count){
        if (grid[row][col]=== -1 || grid[row][col]=== Infinity) return 
        
        if (end[0]=== row && end[1]=== col){
            if (count === totalZ+1) res++
            return
        }
        
        grid[row][col] = Infinity 

        for (const [di, dj] of dirs) {    
            const i = row + di;
            const j = col + dj;
            if (i < 0 || i >= height || j < 0 || j >= width) continue;
            goFind(i, j, count + 1);
        }

        grid[row][col]= 0
    }
    
    goFind(start[0], start[1], 0) 
    return res
};

//binary path - used BFS with queue
var shortestPathBinaryMatrix = function(grid) {
    let len = grid.length
    if (grid[0][0] === 1 || grid[len-1][len-1]===1) return -1
    let dirs = [[0,1],[1,0],[-1,-1],[1,1], [0,-1], [-1,0], [1,-1], [-1,1]]

    let q = [[0,0, 1]]
    grid[0][0] = 1
    for (const [row, col, d] of q){

        if (row === len-1 && col === len-1) return d
        for (const [x,y] of dirs){
            let i = row + x
            let k = col + y
            if (i > -1 && i < len && k > -1 && k < len && grid[i][k]=== 0){
                grid[i][k]=1
                q.push([i, k, d+1])

            }
        }
    }
    
    return -1
};



//! Magic Dictionary 65-90+% time, 90+% space with simple array
/**
 * Initialize your data structure here.
 */
var MagicDictionary = function() {
    this.words = []
};

/** 
 * @param {string[]} dictionary
 * @return {void}
 */
MagicDictionary.prototype.buildDict = function(dictionary) {
    this.words = this.words.concat(dictionary)
};

/** 
 * @param {string} searchWord
 * @return {boolean}
 */
MagicDictionary.prototype.search = function(searchWord) {
    
    for (let i = 0; i < this.words.length; i++){
        let wrongL = 0
        for (let k = 0; k < this.words[i].length; k++ ){
            if (this.words[i].length !== searchWord.length) break
            if (this.words[i][k] !== searchWord[k]) wrongL++
        }
        if (wrongL === 1) return true
    }
    
    return false
};

/** 
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */


//! (-2*1) + (-1*2) + (1*3) + (6*4)
var maxSatisfaction = function(satisfaction) {
    satisfaction.sort((a,b)=> a-b)
    let max = satisfaction.reduce((a,b,i)=> a + b * (i+1))
    let sum = satisfaction.reduce((a,b)=> a+b, 0)
    
    for (let i = 0; i < satisfaction.length; i++){
        if (max > max-sum) return max
        max-=sum
        sum-=satisfaction[i]
    }
    
    return 0
};


// swimming in rising water
var swimInWater = function(grid) {
    let visited = new Set()
    let time = 0
    let n = grid.length;
    let dirs = [[-1,0], [0,-1], [0,1],[1,0]];
    
    const dfs = (r, c) => {
        if(r < 0 || r > n -1 || c < 0 || c > n -1 || time < grid[r][c] || visited.has(r*n + c)) return;
        visited.add(r * n + c);
        for(let [rr, cc] of dirs) 
            dfs(r + rr, c + cc);
    };
    
    while(!visited.has(n * n-1)) {
        visited.clear();
        dfs(0,0);
        time++;
    }
    
    return time-1;
};


//*Trap rain water -- used DP
var trap = function(height) {
    let res = 0, len = height.length, maxLeft = new Array(len), maxRight = new Array(len)
    maxLeft[0]= height[0]
    maxRight[len-1]= height[len-1]
    
    for (let i = 1; i < len; i++){
        maxLeft[i]= Math.max(maxLeft[i-1], height[i])
        maxRight[len-i-1]= Math.max(maxRight[len-i], height[len-i-1])
    }

    for (let i = 1; i < len; i++){
        res+=Math.min(maxRight[i], maxLeft[i])- height[i]
    }
    
    return res
};



//*Word ladder - hard difficulty.. solved with BFS and queue
var ladderLength = function(beginWord, endWord, wordList2) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const wordList = new Set(wordList2)
    const map = new Map()
    let steps = 1
    let queue = [beginWord]
    let set = new Set()
    
    while (queue.length){
        let next = []
        for (let word of queue){
            if (word === endWord) return steps
            let word2 = word.split("")

            for (let i = 0; i < word2.length; i++){
                for (let char of alphabet){
                    word2[i]=char
                    let nw = word2.join("")

                    if (wordList.has(nw) && !set.has(nw)){
                        next.push(nw)
                        set.add(nw) 
                    } 
                    word2[i]= word[i]   
                }
            }
        }
        steps++
        queue=next
    }
    
    return 0
};


// Candy Crush
var candyCrush = function(board) {
    let set = findElims(board)
    if (set.size === 0 ) return board
        set.forEach(num=>{
            let row
            let col
            if (num<board[0].length){
                row = 0
                col = num
            } else {
                row = Math.floor(num/board[0].length)
                col = num%board[0].length
            }
            
            board[row][col]=0
        })

    let myNew = dropCandy(board)
    return candyCrush(myNew)
    // return myNew
};


function dropCandy(board){
    
    let trans = _.zip(...board)
    let fixed = trans.map(col=>{
        let newCol = col.filter(num => num !== 0)
        while (newCol.length !== board.length){
            newCol.unshift(0)
        }

        return newCol
    })
    
    let myThing = _.zip(...fixed)
    return myThing
}


function findElims(board){
    let set = new Set()
    
    for (let row = 0; row<board.length; row++){
        for (let col = 0; col<board[0].length; col++){
            if (board[row][col]=== 0) continue
            let adder=1
            let curr = [row * board[0].length + col]
            while(col < board[0].length && board[row][col+adder]=== board[row][col]){
                curr.push((row * board[0].length) +col+adder)
                adder++
            }
            
            if (curr.length >=3){
                 curr.forEach(num=> set.add(num))
            }
            curr = [row * board[0].length + col]
            adder=1
            while(row+adder < board.length && board[row+adder][col]=== board[row][col]){
                curr.push(((row+adder) * board[0].length) +col)
                adder++
            }
            if (curr.length >=3){
                 curr.forEach(num=> set.add(num))
            }

        }
    }
    
  
    return set
    
}



//* Design Browser History

/**
 * @param {string} homepage
 */
var BrowserHistory = function(homepage) {
    this.history = {0: homepage}
    this.current = 0
    this.length = 1
};

/** 
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function(url) {
    if (this.current === this.length-1){
        this.history[this.length]=url
        this.current = this.length++
    } else {
        this.history[++this.current]=url
        this.length = this.current+1
    }

};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function(steps) {
    if (steps > this.current){
        this.current = 0
        return this.history[0]
    } else {
        this.current = this.current - steps
        return this.history[this.current]
    }
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function(steps) {
    if (this.current+ steps >= this.length){
        this.current = this.length-1
        return this.history[this.current]
    } else {
        this.current = this.current + steps
        return this.history[this.current]
    }
};

/** 
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */

//* flatten binary tree to linked list
var flatten = function(root) {
    if (!root) return null
    let temp = root.right
    root.right = flatten(root.left)
    root.left = null
    let last = root

    while (last.right){
        last = last.right
    }
    
    last.right = flatten(temp)
    return root
};


//*flatten binary tree to linked list -- with dfs & stack

var flatten = function(root) {
    if (!root) return null
    let stack = []
    dfs(root)
    flattenN(stack)
    
    function flattenN(st){
        if (st.length === 1) {
            st[0].left = null
            return st[0]
        }
        
        let first = st.shift()
        first.left = null
        first.right = flattenN(st)
        return first
    }
    
    function dfs(node){
        if (!node) return  
        stack.push(node)
        dfs(node.left)
        dfs(node.right)
    }
};


//flatten multilevel doubly linked list  -- with node.child
var flatten = function(head) {
    if (!head) return null
    let parent = head

    while (!parent.child && parent.next){
        parent =parent.next
    }
    
    if (parent.child){
        let temp = parent.next
        parent.child.prev = parent
        parent.next = flatten(parent.child)
        parent.child = null
        let last = parent.next

        while (last.next){
            last = last.next
        }
        last.next = temp
        if (temp) temp.prev = last
        return head 
    } 
    
    return head
};

// minimum meeting rooms
var minMeetingRooms = function(intervals) {
    let starts = []
    let ends = []
    
    for (const [s,e] of intervals){
        starts.push(s)
        ends.push(e)
    }
    starts.sort((a,b)=> a-b)
    ends.sort((a,b)=>a-b)
    
    let s = 0
    let e = 0
    let count = 0
    
    while (s < intervals.length){
        if (starts[s]>=ends[e]){
            count--
            e++
        }
        s++
        count++
    }
    
    return count
};


//valid tictactoe
var validTicTacToe = function(board) {
    
    let count = 0
    
    for (let i = 0; i < 3; i++){
        for (let k = 0; k<3; k++){
            let char = board[i][k]
            if (char === "X") count++
            if (char === "O") count--
        }
    }

    if (count > 1 || count < 0 ) return false
    let curr = ""
    let currCol = ""
    let xWin = false
    let oWin = false
    for (let i = 0; i < 3; i++){
        for (let k = 0; k<3; k++){
            let char = board[i][k]
            let char2 = board[k][i]
            curr+=char
            currCol+=char2
        }
        
        if (curr === "XXX" || currCol === "XXX") xWin = true
        if (curr === "OOO" || currCol==="OOO") oWin = true
        curr = ""
        currCol = ""
    }
    
    if ("".concat(board[0][0], board[1][1], board[2][2]) === "OOO" || "".concat(board[0][2], board[1][1], board[2][0]) === "OOO") oWin = true
    if ("".concat(board[0][0], board[1][1], board[2][2]) === "XXX" || "".concat(board[0][2], board[1][1], board[2][0]) === "XXX") xWin = true
    
    if (xWin && count <= 0) return false
    if (oWin && count !== 0) return false
    if (oWin && xWin) return false
    return true
};



///* design leaderboard OOP


var Leaderboard = function() {
    this.board = []
    this.first = null
};

/** 
 * @param {number} playerId 
 * @param {number} score
 * @return {void}
 */
Leaderboard.prototype.addScore = function(playerId, score) {
    let scoreA = this.reset(playerId)
    
    this.board.push([playerId, score+scoreA])
    this.board.sort((a,b)=> b[1]-a[1])
    this.first = this.board[0][1]
};

/** 
 * @param {number} K
 * @return {number}
 */
Leaderboard.prototype.top = function(K) {
    let i = 0
    let count = 0
    while (i < K){
        count+=this.board[i][1]
        i++
    }
    
    return count
};

/** 
 * @param {number} playerId
 * @return {void}
 */
Leaderboard.prototype.reset = function(playerId) {
    let i = 0
    let score = 0
    
    while (i < this.board.length){
        
        if (this.board[i][0] === playerId){
            score = this.board[i][1]
            this.board.splice(i, 1)
            i--
        }
        
        i++
    }
    
    return score
};

/** 
 * Your Leaderboard object will be instantiated and called as such:
 * var obj = new Leaderboard()
 * obj.addScore(playerId,score)
 * var param_2 = obj.top(K)
 * obj.reset(playerId)
 */



//* decode string (3[a2[c] => accaccacc)
var decodeString = function(s) {
    let queue = [...s]
    return decode(queue)
};

var decode = function(queue){
    let multiplier = 0
    let string = ""
    
    while (queue.length){
        let char = queue.shift()
        
        if (!isNaN(char)){
            multiplier= multiplier*10 + parseInt(char)
        } else if (char==="["){
            let res = decode(queue)
            string+=res.repeat(multiplier)
            multiplier = 0
        } else if (char === "]"){
            break
        } else {
            string+=char
        }
    }
    
    return string
}


//* unhappy friends
var unhappyFriends = function(n, preferences, pairs) {
    let map = {}
    let pairMap = {}
    let count = 0
    
    for (let i = 0; i < n; i++){
        map[i]= preferences[i]
    }
    
    for (let i = 0; i < pairs.length; i++){
        let first = pairs[i][0]
        let second = pairs[i][1]
        pairMap[first]=second
        pairMap[second]=first
    }
    
    for (let i = 0; i < n; i++) {
        const pair = pairMap[i]
        if (pair === map[i][0]) continue
        
        let prefs = map[i].slice(0,map[i].indexOf(pair))
        for (let p = 0; p < prefs.length; p++){
            let ratherHave = prefs[p]

            if (map[ratherHave].indexOf(i) < map[ratherHave].indexOf(pairMap[ratherHave])){
                count++
                break
            }
        }
    }
    
    return count
};


//*minimum steps to make anagram
var minSteps = function(s, t) {
    let map = {}
    for (let i = 0; i<s.length; i++){
        map[s[i]] ? map[s[i]]+=1 : map[s[i]]= 1
        map[t[i]] ? map[t[i]]-=1 : map[t[i]]= -1
    }
 
    let first = 0
    for (const key in map){
        if (map[key] > 0) first+=map[key]
    }
    
    return first
};


//combination sum 4 
var combinationSum4 = function(nums, target) {
    let table = new Array(target + 1).fill(0)
    table[0]=1

    for (let i = 1; i < target+1; i++){
        for (num of nums){
           table[i]+= (i - num >=0) ? table[i-num] : 0 
        }
    }
    
    return table[target]
};


//* all paths lead to destination? -- T or F
var leadsToDestination = function(n, edges, source, destination) {
    let map = {}
    
    for (let [edge1, edge2] of edges){
        if (!map[edge1]){
            map[edge1]=[edge2]
        } else {
            map[edge1].push(edge2)
        }
    }
    
    if (map[destination]) return false
    let visited = new Set()
    return dfs(source)
    
    function dfs(curr){
        if (!map[curr]){
            return curr === destination
        }
        
        for (let neighbor of map[curr]){
            
            if (visited.has(neighbor)) return false
            visited.add(neighbor)
            if (!dfs(neighbor)) return false
            visited.delete(neighbor)
        } 
        return true
    }
};



var pushDominoes = function(dominoes) {
    dominoes = dominoes.split("")
    let done = false
    
    while (!done){
        done = true
        for (let i = 0; i < dominoes.length-1; i++){
            let domino = dominoes[i]
            if (domino === "."){
                if (dominoes[i+1]=== "L" && (i-1 < 0 || dominoes[i-1]!=="R")){
                    dominoes[i]="L"
                    done = false
                }
            } else if (domino ==="R"){
                if (dominoes[i+1]==="." && (i+2 >= dominoes.length || dominoes[i+2]!=="L")){
                    dominoes[i+1]="R"
                    i++
                    done = false
                    if (dominoes[i+2]==="L" && dominoes[i+1]===".") dominoes[i+1]="L"
                }
            }
        }
    }
    
    return dominoes.join("")
};



//* Binary Tree Level Order Traversal - BFS

var levelOrder = function(root) {
    if (!root) return []
    let ans = []
    let queue = [root]
    
    while (queue.length){
        ans.push(queue.map(n => n.val))
        let curr = []
        
        for (let node of queue){
            if (node.left) curr.push(node.left)
            if (node.right) curr.push(node.right)
        }
        queue = curr 
    }
    
    return ans
};


//* Vertical Order Traversal of Binary Tree(rows and cols) - Hard  // [1,2,3,4,6,5,7] => [[4],[2],[1,5,6],[3],[7]]
var verticalTraversal = function(root) {
    let map = {}
    let array = []
    dfs(root, 0, 0)
    
    function dfs(node, row, col){
        if (map[col]){
            map[col].push({val: node.val, row: row})
        } else {
            map[col]=[{val: node.val, row: row}]
        }
        if (node.left) dfs(node.left, row+1, col-1)
        if (node.right) dfs(node.right, row+1, col+1)
    }

    let keys = Object.keys(map).sort((a,b)=> a-b)
    for (let key of keys){
        array.push(map[key])
    }

    array = array.map(col => {
        col.sort((a, b)=>{
            if (a.row === b.row) return a.val-b.val
            return a.row-b.row
        })
        return col.map(c => c.val)
    })
    
    return array
};



//* Evaluation Division
// Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
// Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
var calcEquation = function(equations, values, queries) {
    let map = {}
    let idx = 0
    for (let eq of equations){
        if (!map[eq[0]]){
            map[eq[0]]= {[eq[1]]: values[idx]}
        } else {
            map[eq[0]][eq[1]]= values[idx]
        }
        
        if (!map[eq[1]]){
            map[eq[1]]= {[eq[0]]: 1/values[idx]}
        } else {
            map[eq[1]][eq[0]]= 1/values[idx]
        }
        idx++
    }
    
    let ans = []
    
    for (let i = 0; i< queries.length; i++){
        let start = queries[i][0]
        let end = queries[i][1]
        ans.push(find(start,end, 1))
    }

    return ans

    function find(start, end, curr, visited=new Set()){
        if (!map[start]) return -1.0
        if (map[start][end]) return curr * map[start][end]
        visited.add(start)
        
        for (let path in map[start]){
            if (!visited.has(path)){
                let currRes = find(path, end, curr*map[start][path], visited)
                if (currRes>0) return currRes
            }
        }
        return -1.0
    }
};


//* restore/ generate IP addresses - used DFS with backtracking
// Input: s = "25525511135"
// Output: ["255.255.11.135","255.255.111.35"]
var restoreIpAddresses = function(s) {
    let solution = []
    dfs([], 0)
    return solution
    
    function dfs(curr, idx){
        if (curr.length === 4 && idx ===s.length){
            solution.push(curr.join("."))
            return
        }
        
        if (idx === s.length || curr.length === 4) return
        for (let i= idx; i < s.length; i++){
            if (i !== idx && s[idx]==="0") return
            let num= parseInt(s.slice(idx, i+1))

            if (num > 255){
                return
            }

            curr.push(num)
            dfs(curr, i+1)
            curr.pop()
        }
    }
};




//design lottery system

var Lottery = function(){
    this.names = []
    this.indices = {}
    this.size = 0
}

Lottery.prototype.addParticipant = function(participant){
    if (this.indices[participant] === undefined) {
        this.names.push(participant)
        this.indices[participant] = this.size
        this.size++
    }
}

Lottery.prototype.removeParticipant = function(participant){
    if (this.indices[participant] !== undefined){
        //switch particiapnt and last participant in the array, also switch the object values. Delete the removed participant's kv pair and pop() end of the array
        let last = this.names[this.names.length-1]
        let index = this.indices[participant]
        this.indices[last] = index
        this.names[index] = last
        this.names.pop()
        delete this.indices[participant]
        this.size--
    }
}

Lottery.prototype.getWinner = function (){
    let i = Math.floor(Math.random()* this.size)
    console.log("Winner is " + this.names[i])
    return this.names[i]
}


var lottery = new Lottery()

lottery.addParticipant("Niko")
lottery.addParticipant("Baba")
lottery.addParticipant("Juliana")
lottery.addParticipant("Jon")
lottery.addParticipant("Maria")
lottery.addParticipant("Maria")

lottery.removeParticipant("Baba")
lottery.addParticipant("Person")
lottery.removeParticipant("Person")
lottery.removeParticipant("Niko")
lottery.removeParticipant("Jon")
lottery.removeParticipant("Juliana")
lottery.removeParticipant("Maria")

console.log(lottery)
lottery.getWinner()

