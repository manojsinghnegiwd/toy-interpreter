const { isChar, isEmpty, isOperator, isStringExpression, isNumberExpression, isKeyword, isNewLine } = require("./utils/check");
const { combineString, combineNumber, combineChar } = require("./utils/combine");
const { buildVariableDeclaration } = require("./utils/buildTree")
const { removeCarriageReturn, createToken } = require("./utils/helper")
const { evaluateValue } = require("./utils/evaluation")
const { separator } = require('./utils/constants')

class toyInterpreter {

    programAst = {
        value: "",
        type: "Program",
        scope: {},
        body: []
    }

    interpret = script => {
        this.programAst.value = script
        const characters = script.split(separator)
        const tokens = this.buildTokens(characters)
        const ast = this.buildProgramAst(tokens)
        this.programAst.body = ast
        this.execute()
    }

    execute = (position = 0) => {
        let currentObj = this.programAst.body[position]

        if (isKeyword(currentObj.value)) {
            this.programAst.scope[currentObj.declaration.identifier.value] = evaluateValue(this.programAst.scope, currentObj.declaration.value)
            position++
        } else {
            position++
        }

        if (this.programAst.body[position]) {
            return this.execute(position)
        }
    }

    buildProgramAst = (tokens, position = 0, previousAst = []) => {
        let ast = previousAst

        if (isKeyword(tokens[position].value)) {
            const result = buildVariableDeclaration(tokens, position)
            position = result.position
            ast.push(result.result)
        } else {
            position++
        }

        if (tokens[position]) {
            return this.buildProgramAst(tokens, position, ast)
        }

        return ast
    }

    buildTokens = (characters, cursorPosition = 0, previousTokens = []) => {
        const tokens = previousTokens

        if (isEmpty(characters[cursorPosition])) {
            cursorPosition++
        }

        if (isNewLine(characters[cursorPosition])) {
            tokens.push(createToken('newLine', characters[cursorPosition], cursorPosition, cursorPosition + 1))
            cursorPosition++
        }

        if (isChar(characters[cursorPosition])) {
            const combinedResult = combineChar(characters, cursorPosition)
            const combination = combinedResult.combination
            let type = ""

            if (isKeyword(combination)) {
                type = 'newLine'
            }
            if (!isKeyword(combination)) {
                type = 'variable'
            }

            tokens.push(createToken('variable', combination, cursorPosition, combinedResult.cursorPosition))
            cursorPosition = combinedResult.cursorPosition
        }

        if (isOperator(characters[cursorPosition])) {
            tokens.push(createToken('operator', characters[cursorPosition], cursorPosition, cursorPosition + 1))
            cursorPosition++
        }

        if (isStringExpression(characters[cursorPosition])) {
            const combinedResult = combineString(characters, cursorPosition)
            const combination = combinedResult.combination
            tokens.push(createToken('string', combination.slice(1, combination.length - 1), cursorPosition, combinedResult.cursorPosition, { rawValue: combination }))
            cursorPosition = combinedResult.cursorPosition
        }

        if (isNumberExpression(characters[cursorPosition])) {
            const combinedResult = combineNumber(characters, cursorPosition)
            const combination = combinedResult.combination
            tokens.push(createToken('number', combination, cursorPosition, combinedResult.cursorPosition))
            cursorPosition = combinedResult.cursorPosition
        }

        if (characters[cursorPosition]) {
            return this.buildTokens(characters, cursorPosition, tokens)
        }

        return removeCarriageReturn(tokens)
    }
}

module.exports = toyInterpreter
