export default function (CSSContent, key) {
    // let style = document.createElement('style');
    let style = document.getElementById(`${key}-css`)
    if (!style) {
        style = document.createElement('style');
        style.id = `${key}-css`
        style.textContent = CSSContent;
        document.head.appendChild(style);
    } else {
        style.textContent = CSSContent;
    }
}