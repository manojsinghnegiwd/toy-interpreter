const separator = ""

const isChar = token => {
    return !!/([a-z])/ig.exec(token)
}

const isEmpty = token => {
    return !!/ /g.exec(token)
}

const isOperator = token => {
    return !!/(\+|-|\*|\/|=|>|<|>=|<=|&|\||%|!|\^|\(|\))/ig.exec(token)
}

const isStringExpression = token => {
    return !!/("|')/g.exec(token)
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

// let x = "manoj singh"

// char ["let", "x"]
// operators ["="]
// strings ['"manoj singh"']
