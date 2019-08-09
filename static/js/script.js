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
const colors = {
    white: "hsla(0, 100%, 100%, 1)",
    black: "hsla(0, 0%, 0%, 1)",
    blue: "hsla(225, 85%, 60%, 1)",
    red: "hsla(0, 100%, 72%, 1)",
    yellow: "hsla(60, 90%, 72%, 1)",
    green: "hsla(110, 100%, 72%, 1)"
}
function win(player) {
    let winSpots = [];
    let backGround = null;
    if (origBoard[0] === player && origBoard[1] === player && origBoard[2] === player) {
        winSpots.push(0, 1, 2);
    }
    if (origBoard[3] === player && origBoard[4] === player && origBoard[5] === player) {
        winSpots.push(3, 4, 5);
    }
    if (origBoard[6] === player && origBoard[7] === player && origBoard[8] === player) {
        winSpots.push(6, 7, 8);
    }
    if (origBoard[0] === player && origBoard[3] === player && origBoard[6] === player) {
        winSpots.push(0, 3, 6);
    }
    if (origBoard[1] === player && origBoard[4] === player && origBoard[7] === player) {
        winSpots.push(1, 4, 7);
    }
    if (origBoard[2] === player && origBoard[5] === player && origBoard[8] === player) {
        winSpots.push(2, 5, 8);
    }
    if (origBoard[0] === player && origBoard[4] === player && origBoard[8] === player) {
        winSpots.push(0, 4, 8);
    }
    if (origBoard[2] === player && origBoard[4] === player && origBoard[6] === player) {
        winSpots.push(2, 4, 6);
    }
    if (player === huPlayer) {
        backGround = colors.green;
    } else if (player === aiPlayer) {
        backGround = colors.red;
    }
    winSpots.forEach((spot) => {
        let space = null;
        if (spot === 0) {
            space = $('#s0');
        } else if (spot === 1) {
            space = $('#s1');
        } else if (spot === 2) {
            space = $('#s2');
        } else if (spot === 3) {
            space = $('#s3');
        } else if (spot === 4) {
            space = $('#s4');
        } else if (spot === 5) {
            space = $('#s5');
        } else if (spot === 6) {
            space = $('#s6');
        } else if (spot === 7) {
            space = $('#s7');
        } else if (spot === 8) {
            space = $('#s8');
        }
        space.css('background-color', backGround);
    })
}

function stopGame() {
    $('.spot').addClass("filled");
    setTimeout(() => {
        $('.spot').addClass("complete");
    }, 500)
}

let turn = 0;

$(document).ready(() => {
    $('.spot').on('click', event => {
        if (!$(event.currentTarget).hasClass('filled')) {
            if (turn === 0) {
                $(event.currentTarget).addClass("filled");
                setTimeout(() => {
                    $(event.currentTarget).addClass("complete");
                }, 500)
                let id = findSpot($(event.currentTarget));
                origBoard[id] = huPlayer;
                updateBoard(huPlayer, id);
                if (winning(origBoard, huPlayer)) {
                    win(huPlayer);
                    stopGame();
                }
                turn = 1;
            } else {
                return;
            }
            if (turn === 1) {
                setTimeout(() => {
                    let aiSpot = getAiNum();
                    if (aiSpot === 0) {
                        $('#s0').addClass("filled");
                        setTimeout(() => {
                            $('#s0').addClass("complete");
                        }, 500)
                    } else if (aiSpot === 1) {
                        $('#s1').addClass("filled");
                        setTimeout(() => {
                            $('#s1').addClass("complete");
                        }, 500)
                    } else if (aiSpot === 2) {
                        $('#s2').addClass("filled");
                        setTimeout(() => {
                            $('#s2').addClass("complete");
                        }, 500)
                    } else if (aiSpot === 3) {
                        $('#s3').addClass("filled");
                        setTimeout(() => {
                            $('#s3').addClass("complete");
                        }, 500)
                    } else if (aiSpot === 4) {
                        $('#s4').addClass("filled");
                        setTimeout(() => {
                            $('#s4').addClass("complete");
                        }, 500)
                    } else if (aiSpot === 5) {
                        $('#s5').addClass("filled");
                        setTimeout(() => {
                            $('#s5').addClass("complete");
                        }, 500)
                    } else if (aiSpot === 6) {
                        $('#s6').addClass("filled");
                        setTimeout(() => {
                            $('#s6').addClass("complete");
                        }, 500)
                    } else if (aiSpot === 7) {
                        $('#s7').addClass("filled");
                        setTimeout(() => {
                            $('#s7').addClass("complete");
                        }, 500)
                    } else if (aiSpot === 8) {
                        $('#s8').addClass("filled");
                        setTimeout(() => {
                            $('#s8').addClass("complete");
                        }, 500)
                    }
                    origBoard[aiSpot] = aiPlayer;
                    updateBoard(aiPlayer, aiSpot);
                    setTimeout(() => {
                        if (winning(origBoard, aiPlayer)) {
                            win(aiPlayer);
                            stopGame();
                        }
                    }, 600)
                }, 1000)
                setTimeout(() => {
                    turn = 0;
                }, 1800)
            }
        } else {
            console.log("Can't play here, the spot is already taken");
        }
        if (!winning(origBoard, huPlayer) && !(winning(origBoard, aiPlayer))) {
            if ($('#s0').hasClass("filled") && $('#s1').hasClass("filled") && $('#s2').hasClass("filled") && $('#s3').hasClass("filled") && $('#s4').hasClass("filled") && $('#s5').hasClass("filled") && $('#s6').hasClass("filled") && $('#s7').hasClass("filled") && $('#s8').hasClass("filled")) {
                $('#s0').css('background-color', colors.yellow);
                $('#s1').css('background-color', colors.yellow);
                $('#s2').css('background-color', colors.yellow);
                $('#s3').css('background-color', colors.yellow);
                $('#s4').css('background-color', colors.yellow);
                $('#s5').css('background-color', colors.yellow);
                $('#s6').css('background-color', colors.yellow);
                $('#s7').css('background-color', colors.yellow);
                $('#s8').css('background-color', colors.yellow);
            }
        }
    })
})