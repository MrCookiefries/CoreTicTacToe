var origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var huPlayer = null;
var aiPlayer = null;
var fc = 0;

function minimax(newBoard, player) {
  fc++;
  var availSpots = emptyIndexies(newBoard);
  if (winning(newBoard, huPlayer)) {
    return {
      score: -10
    };
  } else if (winning(newBoard, aiPlayer)) {
    return {
      score: 10
    };
  } else if (availSpots.length === 0) {
    return {
      score: 0
    };
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
  if (player === huPlayer) {
    $('.final-msg').html('Player 1 Won');
  } else {
    if (numPlayers == 1) {
      $('.final-msg').html('CPU Won');
    } else {
      $('.final-msg').html('Player 2 Won');
    }
  }
}

function stopGame() {
  $('.spot').addClass("filled");
  setTimeout(() => {
    $('.spot').addClass("complete");
  }, 500)
  setTimeout(() => {
    $('.game').hide();
    $('.end').show();
  }, 2000)
}

let turn = 0;
let numPlayers = null;
let playsFirst = null;
let moveOn = false;
setInterval(() => {
  let currentlyPlaying = document.getElementById("currently-playing");
  currentlyPlaying.innerHTML = playsFirst;
}, 1000)

$(document).ready(() => {
  $('.help').on('click', () => {
    window.open('https://www.wikihow.com/Play-Tic-Tac-Toe', '_blank');
  })
  $('.play').on('click', () => {
    $('.play').css({
      "top": "4px",
      "left": "4px"
    });
    setTimeout(() => {
      $('.main').hide();
      $('.options').show();
    }, 200)
  })
  $('.players p').on('click', event => {
    $('.players p').css({
      'border': "4px inset var(--blue)"
    })
    $(event.currentTarget).css({
      "border": '4px inset var(--green)'
    })
    if ($(event.currentTarget).html() == 1) {
      numPlayers = 1;
      $("#cpu").html("CPU");
      playsFirst = "CPU";
      $("#random-selection").show();
    } else {
      numPlayers = 2;
      $("#cpu").html("P2");
      playsFirst = "P2";
      $("#random-selection").hide();
      $("#random-selection").css({
        "border": '4px inset var(--blue)'
      })
    }
    $('.numPlayers').slideUp(600);
    $('.playerIcon').slideDown(600);
    $(".startMessage").hide();
  })
  $('.player-choice p').on('click', event => {
    $('.player-choice p').css({
      'border': "4px inset var(--blue)"
    })
    $(event.currentTarget).css({
      "border": '4px inset var(--green)'
    })
    if ($(event.currentTarget).html() == "P1 - X") {
      huPlayer = "X";
      aiPlayer = "O";
    } else {
      huPlayer = "O";
      aiPlayer = "X";
    }
    $('.playerIcon').slideUp(600);
    $('.firstPlay').slideDown(600);
    $(".startMessage").hide();
  })
  $('.plays-first p').on('click', event => {
    $('.plays-first p').css({
      'border': "4px inset var(--blue)"
    })
    $(event.currentTarget).css({
      "border": '4px inset var(--green)'
    })
    if ($(event.currentTarget).html() == "P1") {
      playsFirst = "P1";
    } else if ($(event.currentTarget).html() == "P2") {
      playsFirst = "P2";
    } else if ($(event.currentTarget).html() == "CPU") {
      playsFirst = "CPU";
    } else {
      playsFirst = "Random";
    }
    moveOn = true;
    $(".startMessage").hide();
  })
  $(".startGame").on('click', function() {
    let errMsg = {
      players: "You must select the number of players!",
      icon: "You must select the icon for player one!",
      first: "You must select who goes first!"
    }
    if (numPlayers === null) {
      $(".startMessage").html(errMsg.players);
      $(".startMessage").show();
    } else if (huPlayer === null) {
      $(".startMessage").html(errMsg.icon);
      $(".startMessage").show();
    } else if (moveOn === false) {
      $(".startMessage").html(errMsg.first);
      $(".startMessage").show();
    } else {
      $(".startMessage").hide();
      $(".menu").hide();
      $('.game').show();
      if (playsFirst == "CPU") {
        cpuGame();
      } else if (playsFirst == "Random" && numPlayers == 1) {
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        if (randomNumber < 50) {
          cpuGame();
          playsFirst = "CPU";
        } else {
          playsFirst = "P1";
        }
      }
    }
  })
  $('.restart').on('click', () => {
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 800)
  })

  function checkDraw() {
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
        setTimeout(() => {
          $('.final-msg').html('Draw');
          $('.game').hide();
          $('.end').show();
        }, 2000)
      }
    }
  }

  function cpuGame() {
    let breakPoint = false;
    if (breakPoint === false) {
      let ranNum = Math.floor(Math.random() * 5) + 1;
      if (ranNum === 1) {
        $('#s0').addClass("filled");
        setTimeout(() => {
          $('#s0').addClass("complete");
        }, 500)
        origBoard[0] = aiPlayer;
        updateBoard(aiPlayer, 0);
        if (winning(origBoard, aiPlayer)) {
          win(aiPlayer);
          stopGame();
        }
        turn = 0;
      } else if (ranNum === 2) {
        $('#s2').addClass("filled");
        setTimeout(() => {
          $('#s2').addClass("complete");
        }, 500)
        origBoard[2] = aiPlayer;
        updateBoard(aiPlayer, 2);
        if (winning(origBoard, aiPlayer)) {
          win(aiPlayer);
          stopGame();
        }
        turn = 0;
      } else if (ranNum === 3) {
        $('#s4').addClass("filled");
        setTimeout(() => {
          $('#s4').addClass("complete");
        }, 500)
        origBoard[4] = aiPlayer;
        updateBoard(aiPlayer, 4);
        if (winning(origBoard, aiPlayer)) {
          win(aiPlayer);
          stopGame();
        }
        turn = 0;
      } else if (ranNum === 4) {
        $('#s6').addClass("filled");
        setTimeout(() => {
          $('#s6').addClass("complete");
        }, 500)
        origBoard[6] = aiPlayer;
        updateBoard(aiPlayer, 6);
        if (winning(origBoard, aiPlayer)) {
          win(aiPlayer);
          stopGame();
        }
        turn = 0;
      } else if (ranNum === 5) {
        $('#s8').addClass("filled");
        setTimeout(() => {
          $('#s8').addClass("complete");
        }, 500)
        origBoard[8] = aiPlayer;
        updateBoard(aiPlayer, 8);
        if (winning(origBoard, aiPlayer)) {
          win(aiPlayer);
          stopGame();
        }
        turn = 0;
      }
    }
    breakPoint = true;
  }
  $('.spot').on('click', event => {
    $(".currently-playing").hide();
    let oneGame = () => {
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
          checkDraw();
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
            checkDraw();
          }, 1800)
        }
      } else {
        console.log("Can't play here, the spot is already taken");
      }
    }
    let twoGame = () => {
      let twoPlayer = playsFirst;
      if (twoPlayer == "P1") {
        twoPlayer = huPlayer;
      } else if (twoPlayer == "P2") {
        twoPlayer = aiPlayer;
      } else {
        let numRandom = Math.floor(Math.random() * 100) + 1;
        if (numRandom < 50) {
          twoPlayer = huPlayer;
        } else {
          twoPlayer = aiPlayer;
        }
      }
      if (!$(event.currentTarget).hasClass('filled')) {
        if (turn === 0) {
          $(event.currentTarget).addClass("filled");
          setTimeout(() => {
            $(event.currentTarget).addClass("complete");
          }, 500)
          let id2 = findSpot($(event.currentTarget));
          origBoard[id2] = twoPlayer;
          updateBoard(twoPlayer, id2);
          if (winning(origBoard, twoPlayer)) {
            win(twoPlayer);
            stopGame();
          }
          turn = 1;
          checkDraw();
        } else {
          return;
        }
      } else {
        console.log("Can't play here, the spot is already taken");
      }
      if (turn === 1) {
        if (twoPlayer === huPlayer) {
          playsFirst = "P2";
        } else if (twoPlayer === aiPlayer) {
          playsFirst = "P1";
        }
        turn = 0;
      }
    }
    if (numPlayers == 1) {
      oneGame();
    } else {
      twoGame();
    }
  })
})