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

module.exports = {
    isChar,
    isEmpty,
    isOperator,
    isStringExpression,
    isNumberExpression
}
