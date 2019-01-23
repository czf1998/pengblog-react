export const CountLength = (string) => {
    let len = 0;
    for (let i=0; i < string.length; i++) {
        if (string.charCodeAt(i)>127 || string.charCodeAt(i) === 94) {
            len += 2;
        } else {
            len ++;
        }
    }
    return len;
}
