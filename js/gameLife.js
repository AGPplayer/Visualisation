const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const canvas = document.getElementById('canvas_life');
const ctx = canvas.getContext('2d');

let k;
const canvasw = canvas.width;

const array = Array.from({ length: 128 }, () => Array(128).fill(false));

const sizeinp = document.getElementById('size_nume');
sizeinp.addEventListener('change', function() {
    if (sizeinp.value > 128)
        sizeinp.value = 128;
    if (sizeinp.value < 1)
        sizeinp.value = 1;
    k = Math.floor(canvasw / sizeinp.value);
    clear();
});

const rangespeed = document.getElementById('speed_mode');
const textspeed = document.getElementById('speedtext');

let speedconst = 1;
rangespeed.addEventListener('change', function() {
    speedconst = rangespeed.value;
    textspeed.textContent = `x${speedconst}`;
});

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();

    const scale = canvas.width / rect.width;

    const x = (e.clientX - rect.left) * scale;
    const y = (e.clientY - rect.top) * scale;

    const col = Math.floor(x / k);
    const row = Math.floor(y / k);

    array[row][col] = !array[row][col];

    if (array[row][col]) {
        ctx.fillStyle = 'white';
    }
    else {
        ctx.fillStyle = 'black';
    }
    ctx.fillRect(col * k, row * k, k, k);
});

const clearbtn = document.getElementById('clear');
const startbtn = document.getElementById('start');
const text = document.getElementById('grid_text');

text.textContent = 0;

const speedbox = document.getElementById('speed_mode');
const borderbox = document.getElementById('bodering_field');


clearbtn.addEventListener('click', clear);
function clear() {
    text.textContent = 0;
    startbtn.disabled = false;
    borderbox.disabled = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 128; i++) {
        for (let j = 0; j < 128; j++) {
            array[i][j] = false;
        }
    }
}

startbtn.addEventListener('click', game);
async function game() {
    startbtn.disabled = true;
    borderbox.disabled = true;
    text.textContent = 0;

    for (let day = 1; true; day++) {
        const newa = Array.from({ length: 128 }, () => Array(128).fill(false));
        const dx = [0, 1, 1, 1, 0, -1, -1, -1];
        const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

        const m = Math.floor(canvasw / k);
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < m; j++) {
                let col = 0;

                for (let q = 0; q < 8; q++) {
                    if (i + dy[q] >= 0 && i + dy[q] < m &&
                        j + dx[q] >= 0 && j + dx[q] < m
                    ) {
                        if (array[i + dy[q]][j + dx[q]]) {
                            col++;
                        }
                    }
                    else {
                        if (!borderbox.checked) {
                            let ny = i + dy[q];
                            let nx = j + dx[q];

                            if (nx == -1) {
                                nx = m - 1;
                            }
                            if (nx == m) {
                                nx = 0;
                            }
                            if (ny == -1) {
                                ny = m - 1;
                            }
                            if (ny == m) {
                                ny = 0;
                            }

                            if (array[ny][nx]) {
                                col++;
                            }
                        }
                    }
                }

                if (array[i][j] && col == 2) {
                    newa[i][j] = true;
                }
                if (col == 3) {
                    newa[i][j] = true;
                }
            }
        }

        let isLife = false;

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < m; j++) {
                array[i][j] = newa[i][j];

                if (array[i][j]) {
                    ctx.fillStyle = 'white';
                    isLife = true;
                }
                else {
                    ctx.fillStyle = 'black';
                }

                ctx.fillRect(j * k, i * k, k, k);
            }
        }

        text.textContent = day;
        await sleep(300 / speedconst);

        if (!isLife) {
            startbtn.disabled = false;
            borderbox.disabled = false;
            break;
        }
    }
};