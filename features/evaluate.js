
import Operators from "../functions/Operators.js"
import graphHelper from "../utils/graph_algorithms.js"
import Functions from "../functions/Functions.js"


const setVariableValue = (node, var_name, val) => {

    if (!node) {
        return
    } else if (node.type === "variable" && node.name === var_name) {
        node.value = val
        return
    }

    setVariableValue(node.left, var_name, val)
    setVariableValue(node.right, var_name, val)
    setVariableValue(node.child, var_name, val)
}


const evaluateVariable = (node, var_name, val) => {
    setVariableValue(node, var_name, val)
    
    return node.evaluate()
}

export default evaluateVariable