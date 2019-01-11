export const throttleByGap = (method, gap, meta) => {
    let methodIndex = method.toString() + JSON.stringify(meta)
    let now = Date.now()
    if (!window[methodIndex]) {
        method.call()
        window[methodIndex] = now
        return
    }
    if (now - window[methodIndex] > gap) {
        method.call()
        window[methodIndex] = now
    }
}

window.throttleByGap = throttleByGap