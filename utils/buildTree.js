const { isValidValue } = require('./check')

const buildExpression = (rawAst, position) => {
    let currentPosition = position
    let result = {}

    if (isValidValue(rawAst[currentPosition]) && rawAst[currentPosition + 1].type === "newLine") {
        result = rawAst[currentPosition]
        currentPosition++
    }

    if (isValidValue(rawAst[currentPosition]) && rawAst[currentPosition + 1].type === "operator") {
        const rightExpression =  buildExpression(rawAst, currentPosition + 2)
        result = {
            type: "expression",
            operator: rawAst[currentPosition + 1],
            left: rawAst[currentPosition],
            right: rightExpression.result
        }
        currentPosition = rightExpression.position
    }

    return {
        result,
        position: currentPosition
    }
}

const buildVariableDeclaration = (rawAst, position) => {
    let result = {
        ...rawAst[position],
        declaration: {}
    }

    position++

    if (rawAst[position].type === "variable") {
        result.declaration["identifier"] = rawAst[position]
    } else {
        throw `invalid use of ${declaration.identifier.value}`
    }

    position++

    if (rawAst[position].type === "operator" && rawAst[position].value === "=") {

        position++

        if (isValidValue(rawAst[position])) {
            const expression = buildExpression(rawAst, position)
            result.declaration["value"] = expression.result
            position = expression.position
        } else {
            throw `invalid value ${rawAst[position].value}`
        }
    } else {
        throw `expected = instead got this ${rawAst[position].value}`
    }

    return {
        result,
        position
    }
}

module.exports = {
    buildVariableDeclaration
}
