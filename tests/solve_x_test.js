import Parser from "../parser/Parser.js"
import utils from "../utils/graph_algorithms.js"
import solve_for_x from "../features/solve_x.js"

const x_solver_tests = [
    `x+12=14`,
    `16*2=(2*(x-3)/2-4)/12-4`,
    `2*x-4=18`,
]

for (let test of x_solver_tests) {
    let parser = new Parser()
    parser.parse(test)
    let ast = parser.Prepare("solve_x")


    const ans = solve_for_x(ast, "x")
    console.log(`Final answer for ${test} is: ${ans}`)
    // utils.print_tree(ast)
}