
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
    console.log(stack)
    
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
        