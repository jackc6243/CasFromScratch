import Operators from "../functions/Operators.js"
import graphHelper from "../utils/graph_algorithms.js"

const solve_for_x = (graph, var_name) => {
    let xSide, ansSide


    if (graphHelper.bfs_findx(graph.right, var_name)) {
        xSide = graph.right
        ansSide = graph.left
    } else {
        xSide = graph.left
        ansSide = graph.right

    }
    // console.log("Initial:")
    // console.log(xSide)
    // console.log(ansSide)

    while ((xSide) && (xSide?.type !== "variable")) {

        let xDirection = graphHelper.bfs_findx(xSide.right, var_name)? "right" : "left"
        let ansDirection = (xDirection === "right") ? "left" : "right"

        let {Operator, value} = xSide.inverseEvaluate(ansDirection)

        // console.log("Operators, value", Operator, value)
        ansSide = new Operators[Operator](ansSide, value)
        xSide = xSide[xDirection]
        // console.log("new Xside", xSide)
        // console.log("new ansSide", ansSide)

    }

    // console.log("Answer object", ansSide)

    return ansSide.evaluate()

}

export default solve_for_x