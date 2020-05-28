const { isChar, isEmpty, isOperator, isStringExpression, isNumberExpression, isKeyword, isValidValue } = require("./utils/check");
const { combineString, combineNumber, combineChar } = require("./utils/combine");
const { buildVariableDeclaration } = require("./utils/buildTree")
const { separator } = require('./utils/constants')

class toyInterpreter {

    programAst = {
        type: "Program",
        scope: {},
        body: []
    }

    interpret = script => {
        const tokens = script.split(separator)
        const rawAst = this.buildRawAst(tokens)
        const ast = this.buildProgramAst(rawAst)
        this.programAst.body = ast
        this.execute()
    }

    execute = () => {
        let position = 0

        while (position < this.programAst.body.length) {
            let currentObj = this.programAst.body[position]
            if (isKeyword(currentObj.value)) {
                this.programAst.scope[currentObj.declaration.identifier.value] = currentObj.declaration.value.value
                position++
            }
        }
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
            if (isEmpty(tokens[cursorPosition])) {
                cursorPosition++
            }

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

            if (isNumberExpression(tokens[cursorPosition])) {
                const combinedResult = combineNumber(tokens, cursorPosition)
                const combination = combinedResult.combination
                ast.push({
                    type: 'number',
                    // remove starting and trailing quotes
                    value: combination,
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
