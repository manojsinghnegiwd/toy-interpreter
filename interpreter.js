const { isChar, isEmpty, isOperator, isStringExpression } = require("./utils/check");

const separator = ""

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
    let combination = []

    while (isChar(input[cursorPosition])) {
        combination += input[cursorPosition]
        cursorPosition++
    }

    return {
        combination,
        cursorPosition
    }
}

class toyInterpreter {
    interpret = script => {
        const tokens = script.split(separator)
        this.buildAst(tokens)
    }

    buildAst = tokens => {
        const ast = []
        let cursorPosition = 0
        const combinedTokens = []

        while (cursorPosition < tokens.length) {
            if (isChar(tokens[cursorPosition])) {
                const combinedResult = combineChar(tokens, cursorPosition)
                cursorPosition = combinedResult.cursorPosition
                const combination = combinedResult.combination
                combinedTokens.push(combination)
            }

            if (isEmpty(tokens[cursorPosition])) {
                cursorPosition++
            }

            if (isOperator(tokens[cursorPosition])) {
                combinedTokens.push(tokens[cursorPosition])
                cursorPosition++
            }

            if (isStringExpression(tokens[cursorPosition])) {
                const combinedResult = combineString(tokens, cursorPosition)
                cursorPosition = combinedResult.cursorPosition
                const combination = combinedResult.combination
                combinedTokens.push(combination)
            }
        }

        console.log(combinedTokens, 'combinedTokens')
    }
}

module.exports = toyInterpreter
