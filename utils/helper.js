// remove  /r
const removeCarriageReturn = rawAst => rawAst.filter(token => token.value !== "\r") 

const createToken = (type, value, start, end, extraProperties) => {
    return {
        type,
        value,
        node: {
            start,
            end
        },
        ...extraProperties
    }
}

module.exports = {
    removeCarriageReturn,
    createToken
}