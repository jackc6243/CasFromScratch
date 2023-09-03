import Type from "../types.js"

class Tokeniser {
    constructor(string) {
        this._string = String(string)
        console.log("string is: ", this._string)
        this.pos = 0
        this.operators = new Map([
            ["=", "Equal"],
            ["+", "Add"],
            ["-", "Subtract"],
            ["*", "Multiply"],
            ["/", "Divide"],
            ["^", "Power"]
          ])
        this.functions = new Map([
            ["ln", "Logarithm"],
            ["sin", "Sine"],
            ["cos", "Cosine"]
          ])
        this.allTokens = []
    }

    hasMoreToken() {
        return this.pos < this._string.length
    }

    getNextToken() {
        if (!this.hasMoreToken()) {
            return null
        }

        const string = this._string.slice(this.pos)
        // console.log("current string and position", string, this.pos)

        if (isNaN(string[0])) {
            if (string[0] === "(" || string[0] === ")") {
                this.pos += 1
                return {
                    type: "Bracket",
                    value: string[0] === "(" ? "(" : ")"
                }
            }

            if (this.operators.has(string[0])) {
                this.pos += 1
                return {
                    type: "Operator",
                    value: string[0]
                }
            }

            for (let key of this.functions.keys()) {
                if (key === string.slice(0, key.length)) {
                    this.pos += key.length
                    return {
                        type: "Function",
                        value: this.functions.get(key)
                    }
                }
            }

            this.pos += 1
            return new Type.variable(string[0])

        } else {
            let x = string[0]
            this.pos += 1
            while (!isNaN(this._string[this.pos]) && this.hasMoreToken()) {
                x += this._string[this.pos]
                this.pos += 1
            }
            return new Type.wholeNumber(Number(x))
        }
    }

    generateTokens() {
        while (this.hasMoreToken()) {
            this.allTokens.push(this.getNextToken())
        }
    }

    
}

export default Tokeniser