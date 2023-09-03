class variable {
    constructor(str) {
        this.type = "variable"
        this.name = str
    }

    evaluate() {
        return this.value
    }

    differentiate() {
        return 1
    }

    simplify() {
        return this
    }

    expand() {
        return this
    }
}

class wholeNumber {
    constructor(x) {
        this.type = "wholeNumber"
        this.value = x
    }

    evaluate() {
        return this.value
    }

    differentiate() {
        return 0
    }

    simplify() {
        return this.value
    }

    expand() {
        return this
    }
}

class decimalNumber {
    constructor(x) {
        this.type = "decimalNumber"
        this.value = x
    }

    evaluate() {
        return this.value
    }

    simplify() {
        return this.value
    }

    expand() {
        return this
    }
}

class fractionalNumber {
    constructor(p, q) {
        this.type = "fractionalNumber"
        this.numerator = p
        this.denominator = q
        this.value = p/q
    }

    evaluate() {
        return this.numerator/this.denominator
    }

    differentiate() {
        return 0
    }

    simplify() {
        return this.value
    }

    expand() {
        return this
    }
}

class mathConstant {
    constructor(x) {
        this.type = "mathConstant"
        switch (x) {
            case "e":
                this.value = Math.E
                break;
            case "pi":
                this.value = Math.PI
        }
    }

    evaluate() {
        return this.value
    }

    differentiate() {
        return 0
    }

    simplify() {
        return this.value
    }

    expand() {
        return this
    }
}

class constant {
    constructor(x) {
        this.type = "constant"
        this.name = x
        this.value = null
    }

    evaluate() {
        return this.value
    }

    differentiate() {
        return 0
    }

    simplify(var_name) {
        return this.value
    }

    expand() {
        return this
    }
}

export default {
    variable,
    fractionalNumber,
    mathConstant,
    constant,
    wholeNumber,
    decimalNumber
}