const isChar = (token = '') => {
    if (!token.trim()) return false
    return !!/([a-z])/ig.exec(token)
}

const isEmpty = token => {
    return !!/ /g.exec(token) || !token
}

const isNewLine = token => {
    return token == '\n' || token == '\r'
}

const isOperator = (token) => {
    return !!/(\+|-|\*|\/|=|>|<|>=|<=|&|\||%|!|\^|\(|\))/ig.exec(token)
}

const isStringExpression = token => {
    return !!/("|')/g.exec(token)
}

const isNumberExpression = (token = '') => {
    return !!/[0-9]+/g.exec(token)
}

const isKeyword = input => ["let"].includes(input)

const isValidValue = token => ["string", "number", "variable"].includes(token.type)

module.exports = {
    isChar,
    isEmpty,
    isOperator,
    isStringExpression,
    isNumberExpression,
    isKeyword,
    isValidValue,
    isNewLine
}
