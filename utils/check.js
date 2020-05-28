const isChar = token => {
    return !!/([a-z])/ig.exec(token)
}

const isEmpty = token => {
    return !!/ /g.exec(token) || token == '\n'
}

const isOperator = (token) => {
    return !!/(\+|-|\*|\/|=|>|<|>=|<=|&|\||%|!|\^|\(|\))/ig.exec(token)
}

const isStringExpression = token => {
    return !!/("|')/g.exec(token)
}

const isNumberExpression = (token = '') => {
    if (!token.trim()) return false
    return !!/[0-9]*/g.exec(token)
}

const isKeyword = input => ["let"].includes(input)

const isValidValue = token => ["string", "number"].includes(token.type)

module.exports = {
    isChar,
    isEmpty,
    isOperator,
    isStringExpression,
    isNumberExpression,
    isKeyword,
    isValidValue
}
