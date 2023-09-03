import Tokeniser from "./Tokeniser.js"
import Types from "../types.js"
import functions from "../functions/Functions.js"
import operators from "../functions/Operators.js"
import 

class Parser {
  parse(string) {
    this.OperationOrder = [
      ["^"],
      ["*", "/"],
      ["+", "-"],
    ]

    this.operatorMap = new Map([
      ["=", operators.Equal],
      ["^", operators.Exponent],
      ["*", operators.Multiply],
      ["+", operators.Add],
      ["-", operators.Subtract],
      ["/", operators.Divide],
    ])

    this.string = string
    this.Tokeniser = new Tokeniser(string)
    this.Tokeniser.generateTokens()
  }

  Prepare(program) {
    let tokens = this.parseBrackets()
    switch (program) {
      case "solve_x":
        let [left, right] = this.parseEqualSign(tokens)

        left = this.parseFunctions(left)
        left = this.parseOperators(left)

        right = this.parseFunctions(right)
        right = this.parseOperators(right)
        return new operators.Equal(left, right)
      case "evaluate":
        break

      default:
        tokens = this.parseFunctions(tokens)
        tokens = this.parseOperators(tokens)
        return tokens
    }
  }

  parseEqualSign(tokens) {
    for (const i in tokens) {
      if (tokens[i].type === "Operator" && tokens[i].value === "=") {
        return [tokens.slice(0, i), tokens.slice(i).slice(1)]
      }
    }
  }

  parseBrackets() {
    const tokens = this.Tokeniser.allTokens
    const stack = new Array()
    let temp = stack
    let counter = 0

    for (const x of tokens) {
      // console.log(counter)
      // console.log("stack", stack)

      // console.log("temp", temp)
      if (x.value === "(") {
        temp.push(new Array())
        temp = temp[temp.length - 1]
        counter += 1
      } else if (x.value === ")") {
        counter -= 1
        temp = stack
        for (let i = 0; i < counter; i++) {
          temp = temp[temp.length - 1]
        }
      } else {
        temp.push(x)
      }
    }
    return stack
  }

  parseFunctions(tokens) {
    for (let i = tokens.length - 1; i >= 0; i--) {
      if (tokens[i].type === "Function") {
        // console.log(tokens[i])
        try {
          const newFunc = new functions[tokens[i].value](tokens[i + 1])
          tokens[i] = newFunc
          delete tokens[i + 1]
        } catch (error) {
          console.log(error, "there needs to be a term after every function")
        }
      } else if (Array.isArray(tokens[i])) {
        tokens[i] = this.parseFunctions(tokens[i])
      }
    }
    return tokens.filter((x) => x !== undefined)
  }

  parseOperators(tokens) {
    for (let i = 0; i < tokens.length; i++) {
      if (Array.isArray(tokens[i])) {
        tokens[i] = this.parseOperators(tokens[i])
      } else if (tokens[i].type === "Function") {
        tokens[i].child = this.parseOperators(tokens[i].child)
      }
    }
    for (const operators of this.OperationOrder) {
      tokens = this.parseOneLevelOperator(operators, tokens)
    }

    return tokens
  }

  parseOneLevelOperator(operators, tokens) {
    if (!Array.isArray(tokens)) {
      return tokens
    }
    // console.log("tokens: ", tokens)
    // console.log("operators: ", operators)
    const l = tokens.length

    for (let i = 0; i < l; i++) {
      // console.log("number ", i, tokens[i])
      if (tokens[i]?.type === "Operator") {
        // console.log("Checking value", tokens[i]?.value)
        for (const operator of operators) {
          if (operator === tokens[i]?.value) {
            // console.log("found operator", operator)
            const temp = this.operatorMap.get(operator)
            // console.log("left right are", tokens[i-1],tokens[i+1])
            tokens[i] = new temp(tokens[i - 1], tokens[i + 1])
            tokens[i + 1] = null
            tokens[i - 1] = null
            tokens = tokens.filter((x) => x !== null)
            i -= 1
          }
        }
      }
    }
    tokens = tokens.filter((x) => x !== null)
    tokens = tokens.length === 1 ? tokens[0] : tokens
    // console.log("final tokens", tokens)

    return tokens
  }
}

export default Parser
