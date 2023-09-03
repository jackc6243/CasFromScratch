import evaluateVariable from "./evaluate.js"

const numericalIntegration = (node, var_name, lowerBound, upperBound, stepSize=0.01) => {
    /**
     * Here we are using trapezoidal rule
     */
    
    let totalArea = 0
    for (let i = lowerBound+stepSize; i < upperBound; i += stepSize) {
        totalArea += evaluateVariable(node, var_name, i)
    }

    totalArea += evaluateVariable(node, var_name, lowerBound)/2
    totalArea += evaluateVariable(node, var_name, upperBound)/2

    return totalArea * stepSize
    
}

export default numericalIntegration