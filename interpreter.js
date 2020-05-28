const util = require('util')
const { isChar, isEmpty, isOperator, isStringExpression } = require("./utils/check");

const isKeyword = input => ["let"].includes(input)

const isValidValue = token => ["string"].includes(token.type)

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

const buildVariableDeclaration = (rawAst, position) => {
    let result = {
        ...rawAst[position],
        declaration: {}
    }

    if (rawAst[position + 1].type === "variable") {
        result.declaration["identifier"] = rawAst[position + 1]
    } else {
        throw `invalid use of ${declaration.identifier.value}`
    }

    if (rawAst[position + 2].type === "operator" && rawAst[position + 2].value === "=") {
        if (isValidValue(rawAst[position + 3])) {
            result.declaration["value"] = rawAst[position + 3]
        } else {
            throw `invalid value ${rawAst[position + 3].value}`
        }
    } else {
        throw `expected = instead got this ${rawAst[position + 2].value}`
    }

    return {
        result,
        position: position + 4
    }
}

class toyInterpreter {

    programAst = {
        type: "Program",
        body: []
    }

    interpret = script => {
        const tokens = script.split(separator)
        const rawAst = this.buildRawAst(tokens)
        const ast = this.buildProgramAst(rawAst)

        console.log(ast)
    }

    buildProgramAst = rawAst => {
        let position = 0
        let ast = []
        while (position < rawAst.length) {
            if (isKeyword(rawAst[position].value)) {
                const result = buildVariableDeclaration(rawAst, position)
                position = result.position
                ast.push(result.result)
            }
        }

        return ast
    }

    buildRawAst = tokens => {
        const ast = []
        let cursorPosition = 0

        while (cursorPosition < tokens.length) {
            if (isChar(tokens[cursorPosition])) {
                const combinedResult = combineChar(tokens, cursorPosition)
                const combination = combinedResult.combination
                if (isKeyword(combination)) {
                    ast.push({
                        type: 'keyword',
                        value: combination,
                        node: {
                            start: cursorPosition,
                            end: combinedResult.cursorPosition
                        }
                    })
                }
                if (!isKeyword(combination)) {
                    ast.push({
                        type: 'variable',
                        value: combination,
                        node: {
                            start: cursorPosition,
                            end: combinedResult.cursorPosition
                        }
                    })
                }
                cursorPosition = combinedResult.cursorPosition
            }

            if (isEmpty(tokens[cursorPosition])) {
                cursorPosition++
            }

            if (isOperator(tokens[cursorPosition])) {
                ast.push({
                    type: 'operator',
                    value: tokens[cursorPosition],
                    node: {
                        start: cursorPosition,
                        end: cursorPosition + 1
                    }
                })
                cursorPosition++
            }

            if (isStringExpression(tokens[cursorPosition])) {
                const combinedResult = combineString(tokens, cursorPosition)
                const combination = combinedResult.combination
                ast.push({
                    type: 'string',
                    // remove starting and trailing quotes
                    value: combination.slice(1, combination.length - 1),
                    rawValue: combination,
                    node: {
                        start: cursorPosition,
                        end: combinedResult.cursorPosition
                    }
                })
                cursorPosition = combinedResult.cursorPosition
            }
        }

        return ast
    }
}

module.exports = toyInterpreter
