import Parser from "../parser/Parser.js"
import utils from "../utils/graph_algorithms.js"

const samples = [
    `12*sin(x)*ln(x)`,
    "12*(14*x-sin(ln(x)))/(13*x)"
    // `sin(x)-cos(x)+ln(x)`,
    // `12+sin(62)*(5/x)`,
    // `((72/4)*ln(5*sin(2*x))-12)/5`,
    // `(2*(x-3)/2-4)/12-4`
]

for (let test of samples) {
    let parser = new Parser()
    parser.parse(test)
    let ast = parser.Prepare()
    console.log(ast)
    utils.print_tree(ast)
}


