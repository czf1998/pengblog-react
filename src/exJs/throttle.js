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

export const throttleByDelay = (method, delay, meta) => {
    let methodDelayTimer = method.toString() + JSON.stringify(meta)
    clearTimeout(window[methodDelayTimer])
    window[methodDelayTimer] = setTimeout(() => {
        method.call()
    },delay)
}


window.throttleByGap = throttleByGap
window.throttleByDelay = throttleByDelay