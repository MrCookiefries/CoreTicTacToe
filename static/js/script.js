var origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var huPlayer = "O";
var aiPlayer = "X";
var fc = 0;
function minimax(newBoard, player) {
    fc++;
    var availSpots = emptyIndexies(newBoard);
    if (winning(newBoard, huPlayer)) {
        return { score: -10 };
    } else if (winning(newBoard, aiPlayer)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;
        if (player == aiPlayer) {
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }
        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }
    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}
function emptyIndexies(board) {
    return board.filter(s => s != "O" && s != "X");
}
function winning(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}

function getAiNum() {
    let result = minimax(origBoard, aiPlayer);
    let num = result.index;
    return num;
}

function findSpot(target) {
    if (target.attr('id') === 's0') {
        return 0;
    } else if (target.attr('id') === 's1') {
        return 1;
    } else if (target.attr('id') === 's2') {
        return 2;
    } else if (target.attr('id') === 's3') {
        return 3;
    } else if (target.attr('id') === 's4') {
        return 4;
    } else if (target.attr('id') === 's5') {
        return 5;
    } else if (target.attr('id') === 's6') {
        return 6;
    } else if (target.attr('id') === 's7') {
        return 7;
    } else if (target.attr('id') === 's8') {
        return 8;
    } else {
        console.log('Error in finding current spot by id');
    }
}

function updateBoard(text, num) {
    let loop = 0;
    origBoard.forEach((index) => {
        if (index === text) {
            if (num === 0) {
                $('#s0 .text').html(text);
            } else if (num === 1) {
                $('#s1 .text').html(text);
            } else if (num === 2) {
                $('#s2 .text').html(text);
            } else if (num === 3) {
                $('#s3 .text').html(text);
            } else if (num === 4) {
                $('#s4 .text').html(text);
            } else if (num === 5) {
                $('#s5 .text').html(text);
            } else if (num === 6) {
                $('#s6 .text').html(text);
            } else if (num === 7) {
                $('#s7 .text').html(text);
            } else if (num === 8) {
                $('#s8 .text').html(text);
            } else {
                console.log('Error with updateBoard function');
            }
        }
        loop++;
    })
}

$(document).ready(() => {
    $('.spot').on('click', event => {
        if (!$(event.currentTarget).hasClass('filled')) {
            $(event.currentTarget).addClass("filled");
            let id = findSpot($(event.currentTarget));
            origBoard[id] = huPlayer;
            updateBoard(huPlayer, id);
            setTimeout(() => {
                let aiSpot = getAiNum();
                if (aiSpot === 0) {
                    $('#s0').addClass("filled");
                } else if (aiSpot === 1) {
                    $('#s1').addClass("filled");
                } else if (aiSpot === 2) {
                    $('#s2').addClass("filled");
                } else if (aiSpot === 3) {
                    $('#s3').addClass("filled");
                } else if (aiSpot === 4) {
                    $('#s4').addClass("filled");
                } else if (aiSpot === 5) {
                    $('#s5').addClass("filled");
                } else if (aiSpot === 6) {
                    $('#s6').addClass("filled");
                } else if (aiSpot === 7) {
                    $('#s7').addClass("filled");
                } else if (aiSpot === 8) {
                    $('#s8').addClass("filled");
                }
                origBoard[aiSpot] = aiPlayer;
                updateBoard(aiPlayer, aiSpot);
            }, 1000)
        } else {
            console.log("Can't play here, the spot is already taken");
        }
    })
})