const { isNumberExpression, isStringExpression, isChar } = require('./check')

const combineNumber = (input, cursorPosition) => {
    let combination = ''

    while (isNumberExpression(input[cursorPosition])) {
        combination += input[cursorPosition]
        cursorPosition++
    }

    return {
        combination: parseInt(combination),
        cursorPosition
    }
}

const combineString = (input, cursorPosition) => {
    let combination = '"'

    // skip starting quote
    cursorPosition++

    while (!isStringExpression(input[cursorPosition])) {
        combination += input[cursorPosition]
        cursorPosition++
    }

    combination += '"'

    // skip ending quote
    cursorPosition++

    return {
        combination,
        cursorPosition
    }
}

const combineChar = (input, cursorPosition) => {
    let combination = ""

    while (isChar(input[cursorPosition])) {
        combination += input[cursorPosition]
        cursorPosition++
    }

    return {
        combination,
        cursorPosition
    }
}

module.exports = {
    combineNumber,
    combineChar,
    combineString
}
