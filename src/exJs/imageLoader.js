export const imageLoader = (src,postHandler) => {

    let image = new Image()

    image.src = src

    image.onload = postHandler

}
