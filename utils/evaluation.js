const evaluateExpression = (scope, token) => {
    const { operator, left, right } = token

    const leftValue = evaluateValue(scope, left)
    const rightValue = evaluateValue(scope, right)

    switch (operator.value) {
        case "+":
            return leftValue + rightValue
        case "-":
            return leftValue - rightValue
        default:
            return
    }
}

const evaluateValue = (scope, token) => {
    switch (token.type) {
        case 'string':
        case 'number':
            return token.value
        case 'variable':
            return scope[token.value]
        case 'expression':
            return evaluateExpression(scope, token)
    }
}

module.exports = {
    evaluateValue,
    evaluateExpression
}
