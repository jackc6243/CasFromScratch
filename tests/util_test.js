import types from "../types.js"
import operator from "../functions/Operators.js"
import functions from "../functions/Functions.js"

import Parser from "../parser/Parser.js"
import graphHelper from "../utils/graph_algorithms.js"
import isObject from "../utils/utils.js"


const x_solver_tests = [
    `x+12=14`,
    `2*x-4=18`,
    `16*2=x/2-4`,
    `x=4`
]

const bfs_findx_tests = [
    `x+2`,
    `2*x-3`,
    `(3*12+2)/4`,
    `2*x`,
    `x`,
    `3*4/2`
]

// for (let test of x_solver_tests) {
//     let parser = new Parser()
//     parser.parse(test)

//     let ast = parser.Prepare("solve_x")
//     console.log(ast)
//     // utils.print_tree(ast)
//     console.log(graphHelper.bfs_findx(ast, "x"))
//     console.log("after", ast)
// }

for (let test of bfs_findx_tests) {
    let parser = new Parser()
    parser.parse(test)

    let ast = parser.Prepare()
    // console.log(ast)
    console.log("pretty print", graphHelper.printExpression(ast))

    // console.log("before", ast)
    // utils.print_tree(ast)
    // console.log(graphHelper.bfs_findx(ast, "x"))
    // console.log("after", ast)
}

// const obj_testors = [new operator.Add(12, 41), new functions.Cosine(12), "1231", 23]

// for (let obj of obj_testors) {
//     console.log(obj, isObject(obj))
// }