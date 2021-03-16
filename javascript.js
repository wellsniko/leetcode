
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