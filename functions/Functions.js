import isObject from "../utils/utils.js"
import Operators from "./Operators.js"
import graphHelper from "../utils/graph_algorithms.js"

class Logarithm {
    constructor(node) {
        this.type = "Function"
        this.value = "Logarithm"
        this.child = node
    }

    evaluate() {
        return Math.log(this.child.evaluate())
    }

    differentiate() {
        if (!isObject(this.child)) {
            return 0
        }
        return new Operators.Divide(this.child.differentiate(), this.child)
        
    }

    simplify(var_name) {
        if (graphHelper.bfs_findx(this.child, var_name)) {
            return new Logarithm(this.child)
        } else {
            return this.evaluate()
        }
    }

}

class Sine {
    constructor(node) {
        this.type = "Function"
        this.value = "Sine"
        this.child = node
    }

    evaluate() {
        return Math.sin(this.child.evaluate())
    }

    differentiate() {
        if (!isObject(this.child)) {
            return 0
        }
        return new Operators.Multiply(this.child.differentiate(), new Cosine(this.child))
    }

    simplify(var_name) {
        if (graphHelper.bfs_findx(this.child, var_name)) {
            return new Sine(this.child)
        } else {
            return this.evaluate()
        }
    }
}

class Cosine {
    constructor(node) {
        this.type = "Function"
        this.value = "Cosine"
        this.child = node
    }

    evaluate() {
        return Math.cos(this.child.evaluate())
    }

    differentiate() {
        if (!isObject(this.child)) {
            return 0
        }
        const a = new Operators.Multiply(-1, this.child)
        return new Operators.Multiply(this.child.differentiate(), new Sine(a))
    }

    simplify(var_name) {
        if (graphHelper.bfs_findx(this.child, var_name)) {
            return new Cosine(this.child)
        } else {
            return this.evaluate()
        }
    }
}

export default {
    Logarithm,
    Sine,
    Cosine
}