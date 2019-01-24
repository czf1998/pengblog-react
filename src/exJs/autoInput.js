export const AutoInput = (inputElem,fontSize) => {
    inputElem.addEventListener('keyup', (event) => {
        let virtualSpan = document.createElement('span')
        virtualSpan.style.fontSize = fontSize + 'px'
        virtualSpan.innerText = event.target.value
        document.body.appendChild(virtualSpan)
        let rect = virtualSpan.getBoundingClientRect()
        let width = rect.width < 50 ? 50 : rect.width
        document.body.removeChild(virtualSpan)
        inputElem.style.width = width + 'px'
    })
}