const { isValidValue } = require('./check')

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

module.exports = {
    buildVariableDeclaration
}
