import isObject from "../utils/utils.js"

const FunctionInverseMap = new Map([
    ["Logarithm", "ln"],
    ["Sine", "sin"],
    ["Cosine", "cos"],
])

const OperatorInverseMap = new Map([
    ["Add", "+"],
    ["Subtract", "-"],
    ["Multiply", "*"],
    ["Divide", "/"],
    ["Exponent", "^"],
    ["Equal", "="]
])

const bfs_findx = (node, var_name) => {
    if (!node || (!isObject(node))) {
        return false
    } else if (node.type === "variable" && node["name"] === var_name) {
        node.contains_x = true
        return true
    }
    node.contains_x = bfs_findx(node.left, var_name) || bfs_findx(node.right, var_name) || bfs_findx(node.child, var_name)
    return node.contains_x

}

const print_tree = (node, l=0) => {
    if (node) {
        console.log(node.type, node.value, Object.keys(node))
        if (node.type === "Operator") {
            process.stdout.write("|    ".repeat(l+1))
            process.stdout.write("left: ")
            print_tree(node.left, l+1)
            process.stdout.write("|    ".repeat(l+1))
            process.stdout.write("right: ")
            print_tree(node.right, l+1)
        } else if (node.type === "Function") {
            process.stdout.write("|    ".repeat(l+1))
            process.stdout.write("child: ")
            print_tree(node.child, l+1)
        }
        
    }
}

const printExpression = (node) => {
    if (!node) {
        return ""
    }
    let chr = ""
    if (node.type === "Function") {
        chr = FunctionInverseMap.get(node.value)
        return `${chr}(${printExpression(node.child)})`
    } else if (node.type === "Operator") {
        chr = OperatorInverseMap.get(node.value)
        let left = printExpression(node.left)
        let right = printExpression(node.right)
        return `${left}${chr}${right}`
    } else if (node.type === "variable") {
        return node.name
    }
    return String(node?.value ? node.value : "")
}

export default {
    bfs_findx,
    print_tree,
    printExpression
}