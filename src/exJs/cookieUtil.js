export const setCookie = (name, value, keepDay) => {
    let date = new Date();
    let keepTime = keepDay*3600*24*1000
    date.setTime(date.getTime() + keepTime)
    document.cookie = name + '=' + value +'; expires=' + date.toGMTString() + '; path=/;'
}

export const deleteCookie = (name) => {
    setCookie(name,'',-1)
}