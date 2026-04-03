const container = document.getElementById('container');
const w = container.offsetWidth;

const btnr = document.getElementById('restart');
btnr.addEventListener('click', build);

build();
function build() {
    const btn = document.getElementById('start');
    btn.disabled = false;

    const array = document.getElementById('container');
    array.innerHTML = '';
    let min = Math.ceil((w + 20) / 50);
    let max = Math.ceil((w + 20) / 130);
    if (min > 10) {
        min = 10;
    }
    const n = Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < n; i++) {
        const newRect = document.createElement('div');
        newRect.classList.add('rect');
        const h = Math.floor(Math.random() * 15) * 10 + 50;
        newRect.style.height = h + 'px';
        /*newRect.textContent = h;
        newRect.style.color = 'white';*/
        const col = 120 - Math.floor((h - 50) / 135 * 120);
        newRect.style.backgroundColor = `hsl(${col}, 100%, 50%)`;

        container.appendChild(newRect);
    }
}