import Operators from "../functions/Operators.js"
import graphHelper from "../utils/graph_algorithms.js"
import Functions from "../functions/Functions.js"
import Parser from "../parser/Parser.js"
import diffAll from "../features/differentiate.js"
import utils from "../utils/graph_algorithms.js"
import isObject from "../utils/utils.js"
import evaluateVariable from "../features/evaluate.js"

const evaluate_functions = [
    "6*x+23",
    "12/x",
    "sin(x)-cos(x)+ln(x)",
    "sin(x)*cos(x)/ln(x)",
    "12*sin(x)*ln(x)",
]

const possible_vals = [0, 12, 4, 1]
const var_name = "x"

for (let test of evaluate_functions) {
    for (let val of possible_vals) {

        let parser = new Parser()
        parser.parse(test)
        let ast = parser.Prepare()
    
        // console.log("String is: ", test)
        // console.log(ast)
        // console.log("value is: ", val)

        const correctAns = test.replaceAll(var_name, String(val))

        console.log("correct value is: ", correctAns)
        console.log("test value is: ", evaluateVariable(ast, var_name, val))
    
        
    }


    // utils.print_tree(diff)

}