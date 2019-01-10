export const throttleByGap = (method, gap) => {
    let now = Date.now()
    if (!window.last) {
        method.call()
        window.last = now
        return
    }
    if (now - window.last > gap) {
        method.call()
        window.last = now
    }
}

window.throttleByGap = throttleByGap