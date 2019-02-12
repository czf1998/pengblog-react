export const AutoInput = (inputElem,fontSize) => {
    inputElem.addEventListener('keyup', (event) => {
        let virtualSpan = document.createElement('span')
        virtualSpan.style.fontSize = fontSize + 'px'
        virtualSpan.innerText = event.target.value
        document.body.appendChild(virtualSpan)
        let rect = virtualSpan.getBoundingClientRect()
        let width = rect.width < 53 ? 53 : rect.width
        document.body.removeChild(virtualSpan)
        inputElem.style.width = width + 2 + 'px'
    })
}