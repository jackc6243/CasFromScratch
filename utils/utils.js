function isObject(obj) {
    if (obj && typeof obj === 'object') {
        return true
    }
    return false
}

export default isObject