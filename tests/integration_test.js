import Operators from "../functions/Operators.js"
import graphHelper from "../utils/graph_algorithms.js"
import Functions from "../functions/Functions.js"
import Parser from "../parser/Parser.js"
import diffAll from "../features/differentiate.js"
import utils from "../utils/graph_algorithms.js"
import isObject from "../utils/utils.js"
import evaluateVariable from "../features/evaluate.js"
import numericalIntegration from "../features/integration.js"

const evaluate_functions = [
    "6*x+23",
    "12/x",
    "sin(x)-cos(x)+ln(x)",
    "sin(x)*cos(x)/ln(x)",
    "12*sin(x)*ln(x)",
]

const possible_ranges = [
    [0, 1],
    [1, 2],
    [0.2, 0.56],
    [12000, 14300]
]
const var_name = "x"
const stepSize = 0.01

for (let test of evaluate_functions) {
    for (let [lower, upper] of possible_ranges) {

        let parser = new Parser()
        parser.parse(test)
        let ast = parser.Prepare()
    
        console.log("String is: ", test, "; with step size ", stepSize)
        // console.log(ast)
        console.log(`With step size ${stepSize} and range ${lower} -> ${upper}`)

        // console.log("correct value is: ", correctAns)
        console.log("test value is: ", numericalIntegration(ast, var_name, lower, upper, stepSize))
    
        
    }


    // utils.print_tree(diff)

}