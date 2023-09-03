import Operators from "../functions/Operators.js"
import graphHelper from "../utils/graph_algorithms.js"
import Functions from "../functions/Functions.js"

const diffAll = (node, var_name, simple=true) => {
    let diff =  node.differentiate()

    if (simple) {
        diff = diff.simplify(var_name)
    }
    return diff
}

export default diffAll