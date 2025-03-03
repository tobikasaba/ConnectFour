let player1 = prompt("Player One: Enter Your Name, you will be Blue");
let player1Color = 'rgb(86, 151, 255)';

let player2 = prompt("Player Two: Enter Your Name, you will be Red");
let player2Color = 'rgb(237, 45, 73)';

let game_on = true;
let table = $("table tr");

function reportWin(rowNum, colNum) {
    console.log("You won starting at this row, col");
    console.log(rowNum);
    console.log(colNum);
}
// Change the color of a button
function changeColor(rowIndex, colIndex, color) {
    // for each row with index rowIndex,
    // find all the td elements in that row
    // get a td element that is in a specific column
    // find the button in that specific row and column
    // change the background color of the button to the color specified
    return table.eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color", color)
}
// Report Back to current color of a button
function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color");
}

// this function returns the row number of the first grey button found in a column
function checkBottom(colIndex) {
    // initiliasing the color report 
    let colorReport = returnColor(5, colIndex)

    for (let row = 5; row > -1; row--) {
        colorReport = returnColor(row, colIndex)
        if (colorReport === "rgb(128, 128, 128)") {
            return row
        }
    }
}

// this function ensures that 4 buttons are the same color
// that color is not grey
// and the four buttons arent undefined 
// the function returns true if all the conditions are met
function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== "rgb(128, 128, 128)" && one !== undefined)
}

// Check for Horizontal Wins
function horizontalWinCheck() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
                console.log("horiz");
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// Check for Vertical Wins
function verticalWinCheck() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
                console.log("vertical");
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
    for (let col = 0; col < 5; col++) {
        for (let row = 0; row < 7; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
                console.log("diag");
                reportWin(row, col);
                return true;
            } else if (colorMatchCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
                console.log("diag");
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// Game End
function gameEnd(winningPlayer) {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 7; row++) {
            $("h3").fadeOut("fast");
            $("h2").fadeOut("fast");
            $("h1").text(winningPlayer + " has won! Refresh your browser to play again!").css("fontSize", "50px")
        }
    }
}

// Start with Player One
let currentPlayer = 1
let currentName = player1;
let currentColor = player1Color;
// Start with Player One
$('h3').text(player1 + ": it is your turn, please pick a column to drop your blue chip.");

$('.board button').on('click', function () {
    // Recognize what column was chosen
    let col = $(this).closest("td").index();

    // Get back bottom available row to change
    let bottomAvail = checkBottom(col);

    // Drop the chip in that column at the bottomAvail Row
    changeColor(bottomAvail, col, currentColor);

    // Check for a win or a tie.
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        gameEnd(currentName);
        $('h1').text(currentName + " You have won!");
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
    }

    // If no win or tie, continue to next player
    currentPlayer = currentPlayer * -1;


    // Re-Check who the current Player is.
    if (currentPlayer === 1) {
        currentName = player1;
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
        currentColor = player1Color;
    } else {
        currentName = player2
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your red chip.");
        currentColor = player2Color;
    }
})