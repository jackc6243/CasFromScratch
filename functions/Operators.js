// import {
//     variable,
//     fractionalNumber,
//     mathConstant
// } from "../types.js"

import isObject from "../utils/utils.js"
import graphHelper from "../utils/graph_algorithms.js"

class Add {
    constructor(left, right)
    {
        this.left = left
        this.right = right
        this.type = "Operator"
        this.value = "Add"
    }

    evaluate() {
        const left = isObject(this.left) ? this.left.evaluate() : this.left
        const right = isObject(this.right) ? this.right.evaluate() : this.right
        return left + right
    }

    inverseEvaluate(direction, remove=false) {
        let temp
        if (direction === "left") {
            temp = isObject(this.left) ? this.left.evaluate() : this.left
            this.left = remove ? null : this.left
        } else {
            temp = isObject(this.right) ? this.right.evaluate() : this.right
            this.right = remove ? null : this.right
        }

        return {"Operator": "Add", "value": new Multiply(-1,temp)}
    }

    differentiate() {
        if (isObject(this.left) && isObject(this.right)) {
            return new Add(this.left.differentiate(), this.right.differentiate()) 
        } else if (isObject(this.left)) {
            return this.left.differentiate()
        } else if (isObject(this.right)) {
            return this.right.differentiate()
        }

        return 0
        
    }

    simplify(var_name) {
        this.left = isObject(this.left) ? this.left.simplify(var_name) : this.left
        this.right = isObject(this.right) ? this.right.simplify(var_name) : this.right
        if (isObject(this.left) && isObject(this.right)) {
            return new Add(this.left, this.right) 
        } else if (isObject(this.left)) {
            if (!graphHelper.bfs_findx(this.left, var_name)) {
                return this.left.evaluate() + this.right
            }
            return new Add(this.left, this.right)
            
        } else if (isObject(this.right)) {
            if (!graphHelper.bfs_findx(this.right, var_name)) {
                return this.left + this.right.evaluate()
            }
            return new Add(this.left, this.right)
        }
        return this.left + this.right
    }

    expand() {
        if (isObject(this.left)) {
            this.left.expand()
        }
        if (isObject(this.right)) {
            this.right.expand()
        }
        return this
    }

}

class Multiply {
    constructor(left, right)
    {
        this.left = left
        this.right = right
        this.type = "Operator"
        this.value = "Multiply"
    }

    evaluate() {
        const left = isObject(this.left) ? this.left.evaluate() : this.left
        const right = isObject(this.right) ? this.right.evaluate() : this.right
        return left * right
    }

    inverseEvaluate(direction, remove=false) {
        let temp
        if (direction === "left") {
            temp = isObject(this.left) ? this.left.evaluate() : this.left
            this.left = remove ? null : this.left
        } else {
            temp = isObject(this.right) ? this.right.evaluate() : this.right
            this.right = remove ? null : this.right
        }
        return {"Operator": "Multiply", "value": new Divide(1, temp)}
    }

    differentiate() {
        if (isObject(this.left) && isObject(this.right)) {
            const a = new Multiply(this.left.differentiate(), this.right) 
            const b = new Multiply(this.left, this.right.differentiate()) 
            return new Add(a, b)
        } else if (isObject(this.left)) {
            return new Multiply(this.left.differentiate(), this.right) 
        } else if (isObject(this.right)) {
            return new Multiply(this.left, this.right.differentiate()) 
        }
        return 0
    }

    simplify(var_name) {
        this.left = isObject(this.left) ? this.left.simplify(var_name) : this.left
        this.right = isObject(this.right) ? this.right.simplify(var_name) : this.right

        if (isObject(this.left) && isObject(this.right)) {
            return new Multiply(this.left, this.right) 
        } else if (isObject(this.left)) {
            if (!graphHelper.bfs_findx(this.left, var_name)) {
                return this.left.evaluate() * this.right
            } else if (this.right === 0) {
                return 0
            }
            return new Multiply(this.left, this.right)
            
        } else if (isObject(this.right)) {
            if (!graphHelper.bfs_findx(this.right, var_name)) {
                return this.left * this.right.evaluate()
            } else if (this.left === 0) {
                return 0
            }
            return new Multiply(this.left, this.right)
        }
        return this.left * this.right
    }

    expand() {
        const left = []
        const right = []

        if (this.left.type === "Operator" && this.left.value === "Add") {
            left.push(this.left.left)
            left.push(this.left.right)
        }
        if (this.right.type === "Operator" && this.right.value === "Add") {
            right.push(this.right.left)
            right.push(this.right.right)
        }
        
        // const expanded = new
        let temp
        let prev = new Multiply(left[0], right[0])

        for (let i in left) {
            for (let j in right) {
                if (i === 0 && j === 1) {
                    continue
                }
                temp = new Multiply(left[i], right[j])
                prev = new Add(temp, prev)
            }
        }

        return prev
    }


}


class Exponent {
    constructor(left, right)
    {
        this.left = left
        this.right = right
        this.type = "Operator"
        this.value = "Exponent"

    }

    evaluate() {
        const left = isObject(this.left) ? this.left.evaluate() : this.left
        const right = isObject(this.right) ? this.right.evaluate() : this.right
        return left ** right
    }

    inverseEvaluate(direction, remove=false) {
        if (direction === "left") {
            throw new Error("Doesn't support this yet")
        } else if (direction === "right") {
            const temp = isObject(this.right) ? this.right.evaluate() : this.right
            this.right = remove ? null : this.right
        }
        return {"Operator": "Exponent", "value": new Divide(1,temp)}
    }

    differentiate() {
        if (isObject(this.left) && isObject(this.right)) {
            const f = new Multiply(this.right, new Function.Logarithm(this.left))
            return new Multiply(f.differentiate(), new Exponent(this.left, this.right))
        } else if (isObject(this.left)) {
            return new Multiply(this.left.differentiate(), this.right) 
        } else if (isObject(this.right)) {
            return new Multiply(this.left, this.right.differentiate()) 
        }

        return 0
    }

    simplify(var_name) {
        this.left = isObject(this.left) ? this.left.simplify(var_name) : this.left
        this.right = isObject(this.right) ? this.right.simplify(var_name) : this.right

        if (isObject(this.left) && isObject(this.right)) {
            return new Exponent(this.left, this.right) 
        } else if (isObject(this.left)) {
            if (!graphHelper.bfs_findx(this.left, var_name)) {
                
                return this.left.evaluate() ** this.right
            } else if (this.right === 0) {
                return 1
            }
            return new Exponent(this.left, this.right)
            
        } else if (isObject(this.right)) {
            if (!graphHelper.bfs_findx(this.right, var_name)) {
                return this.left ** this.right.evaluate()
            } else if (this.left === 0) {
                return 0
            }
            return new Exponent(this.left, this.right)
        }
        return this.left ** this.right
    }

    expand() {
        if (this.left?.type !== "Operator") {
            return this
        }

        if (this.right?.type === "wholeNumber" || Number.isInteger(this.right)) {
            if (this.right?.value === 1 || this.right === 1) {
                return this.left
            } else if (this.right?.value > 1 || this.right > 1) {
                switch (this.left.value) {
                    case "Add":
                        const power = isObject(this.right) ? this.right.value-1 : this.right
                        return new Multiply(this.left, new Exponent(this.left, power)).expand()
                }
                
            }
        } else {
            return this
        }
    }


}

class Equal {
    constructor(left, right)
    {
        this.left = left
        this.right = right
        this.type = "Equal_operator"
    }
}

class Divide {
    constructor(left, right)
    {
        this.left = left
        this.right = right
        this.type = "Operator"
        this.value = "Divide"
    }

    evaluate() {
        const left = isObject(this.left) ? this.left.evaluate() : this.left
        const right = isObject(this.right) ? this.right.evaluate() : this.right
        return left / right
    }

    inverseEvaluate(direction, remove=false) {
        if (direction === "left") {
            const temp = isObject(this.left) ? this.left.evaluate() : this.left
            this.left = remove ? null : this.left
            return {"Operator": "Multiply", "value": temp}
        } else {
            const temp = isObject(this.right) ? this.right.evaluate() : this.right
            this.right = remove ? null : this.right
            return {"Operator": "Multiply", "value": temp}
        }
        
    }

    differentiate() {
        if (isObject(this.left) && isObject(this.right)) {
            const df_g = new Multiply(this.left.differentiate(), this.right) 
            const dg_f = new Multiply(this.left, this.right.differentiate())
            const g2 = new Multiply(this.right, this.right)
            const top = new Add(df_g, new Multiply(-1, dg_f))
            return new Divide(top, g2)
        } else if (isObject(this.left)) {
            return new Multiply(this.left.differentiate(), this.right) 
        } else if (isObject(this.right)) {
            const k = new Multiply(-1,this.left)
            const g = new Divide(1, new Exponent(this.right, 2))
            return new Multiply(k, g) 
        }

        return 0
    }


    simplify(var_name) {
        this.left = isObject(this.left) ? this.left.simplify(var_name) : this.left
        this.right = isObject(this.right) ? this.right.simplify(var_name) : this.right
        if (isObject(this.left) && isObject(this.right)) {
            return new Divide(this.left, this.right) 
        } else if (isObject(this.left)) {
            if (!graphHelper.bfs_findx(this.left, var_name)) {
                return this.left.evaluate() / this.right
            } else if (this.right === 1) {
                return this.left
            }
            return new Divide(this.left, this.right)
            
        } else if (isObject(this.right)) {
            if (!graphHelper.bfs_findx(this.right, var_name)) {
                return this.left / this.right.evaluate()
            } else if (this.left === 0) {
                return 0
            }
            return new Divide(this.left, this.right)
        }
        return this.left / this.right
    }

    expand() {
        if (this.left.type === "Operator" && this.left.value === "Add") {
            this.left =  new Add(new Divide(this.left.left, this.right), new Divide(this.left.right, this.right))
        }

        return this
    }
}




class Subtract {
    constructor(left, right)
    {
        this.left = left ? left : 0
        this.right = new Multiply(-1, right)
        this.type = "Operator"
        this.value = "Subtract"
    }

    evaluate() {

        const left = isObject(this.left) ? this.left.evaluate() : this.left
        const right = isObject(this.right) ? this.right.evaluate() : this.right
        return left + right
    }

    inverseEvaluate(direction, remove=false) {
        if (direction === "left") {
            const temp = isObject(this.left) ? this.left.evaluate() : this.left
            this.left = remove ? null : this.left
            return {"Operator": "Add", "value": new Multiply(-1,temp)}
        } else {
            const temp = isObject(this.right) ? this.right.evaluate() : this.right
            this.right = remove ? null : this.right
            return {"Operator": "Add", "value": new Multiply(-1,temp)}
        }
        
    }

    differentiate() {
        if (isObject(this.left) && isObject(this.right)) {
            return new Add(this.left.differentiate(), this.right.differentiate()) 
        } else if (isObject(this.left)) {
            return this.left.differentiate()
        } else if (isObject(this.right)) {
            return this.right.differentiate()
        }

        return 0
        
    }


    simplify(var_name) {
        this.left = isObject(this.left) ? this.left.simplify(var_name) : this.left
        this.right = isObject(this.right) ? this.right.simplify(var_name) : this.right
        if (isObject(this.left) && isObject(this.right)) {
            return new Add(this.left, this.right) 
        } else if (isObject(this.left)) {
            if (!graphHelper.bfs_findx(this.left, var_name)) {
                return this.left.evaluate() + this.right
            }
            return new Add(this.left, this.right)
            
        } else if (isObject(this.right)) {
            if (!graphHelper.bfs_findx(this.right, var_name)) {
                return this.left + this.right.evaluate()
            }
            return new Add(this.left, this.right)
        }
        return this.left + this.right
    }

    expand() {
        if (isObject(this.left)) {
            this.left.expand()
        }
        if (isObject(this.right)) {
            this.right.expand()
        }
        return this
    }

}

export default {
    Add,
    Multiply,
    Equal,
    Exponent,
    Divide,
    Subtract
}