
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

//^