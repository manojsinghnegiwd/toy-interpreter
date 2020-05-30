// remove  /r
const removeCarriageReturn = rawAst => rawAst.filter(token => token.value !== "\r") 

module.exports = {
    removeCarriageReturn
}