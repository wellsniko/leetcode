
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