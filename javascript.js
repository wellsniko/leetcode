
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

let colin = undefined
let savio = undefined



const configureStore = (preloadedState = {}) => (
  createStore(RootReducer, preloadedState, applyMiddleware(thunk))
);

export default configureStore;




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