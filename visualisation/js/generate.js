const container = document.getElementById('container');
const w = container.offsetWidth;

import { bubbleSort } from './bubbleSort.js';

const btn = document.getElementById('start');
btn.addEventListener('click', bubbleSort);
const btnr = document.getElementById('restart');
btnr.addEventListener('click', build);

build();
function build() {
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
        newRect.style.height = Math.floor(Math.random() * 151 + 50) + 'px';

        container.appendChild(newRect);
    }
}