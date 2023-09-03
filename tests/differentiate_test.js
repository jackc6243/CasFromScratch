import Operators from "../functions/Operators.js"
import graphHelper from "../utils/graph_algorithms.js"
import Functions from "../functions/Functions.js"
import Parser from "../parser/Parser.js"
import diffAll from "../features/differentiate.js"
import utils from "../utils/graph_algorithms.js"
import isObject from "../utils/utils.js"

const diff_funcs = [
    "6*x+23",
    "12/x",
    "sin(x)-cos(x)+ln(x)",
    "sin(x)*cos(x)/ln(x)",
    "12*sin(x)*ln(x)",
    // "12*(14*x-sin(ln(x)))/(13*x)"
]

for (let test of diff_funcs) {
    let parser = new Parser()
    parser.parse(test)
    let ast = parser.Prepare()

    console.log("String is: ", test)
    console.log(ast)

    const diff = diffAll(ast, "x")
    console.log("diff: ")
    console.log(diff)

    if (isObject(diff)) {
        const expanded = diff.expand()
        console.log("printing expanded")
        console.log(expanded)
        utils.printExpression(expanded)
    } else {
        console.log(diff)
    }

    // utils.print_tree(diff)

}