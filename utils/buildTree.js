const { isValidValue } = require('./check')

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
            result.declaration["value"] = rawAst[position]
        } else {
            throw `invalid value ${rawAst[position].value}`
        }
    } else {
        throw `expected = instead got this ${rawAst[position].value}`
    }

    position++

    return {
        result,
        position
    }
}

module.exports = {
    buildVariableDeclaration
}
