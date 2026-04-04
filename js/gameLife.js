const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const canvas = document.getElementById('canvas_life');
const ctx = canvas.getContext('2d');

const k = 40;

const array = Array.from({ length: 15 }, () => Array(15).fill(false));

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
        ctx.fillRect(col * k, row * k, k, k);
    }
    else {
        ctx.fillStyle = 'black';
        ctx.fillRect(col * k, row * k, k, k);
    }
});

const clearbtn = document.getElementById('clear');
const startbtn = document.getElementById('start');
const text = document.getElementById('grid_text');

text.textContent = 0;

const speedbox = document.getElementById('speed_mode');
const borderbox = document.getElementById('bodering_field');


clearbtn.addEventListener('click', (clear) => {
    text.textContent = 0;
    startbtn.disabled = false;
    borderbox.disabled = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            array[i][j] = false;
        }
    }
});

startbtn.addEventListener('click', game);
async function game() {
    startbtn.disabled = true;
    borderbox.disabled = true;
    text.textContent = 0;

    for (let day = 1; true; day++) {
        const newa = Array.from({ length: 15 }, () => Array(15).fill(false));
        const dx = [0, 1, 1, 1, 0, -1, -1, -1];
        const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                let col = 0;

                for (let q = 0; q < 8; q++) {
                    if (i + dy[q] >= 0 && i + dy[q] < 15 &&
                        j + dx[q] >= 0 && j + dx[q] < 15
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
                                nx = 14;
                            }
                            if (nx == 15) {
                                nx = 0;
                            }
                            if (ny == -1) {
                                ny = 14;
                            }
                            if (ny == 15) {
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

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
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
        if (speedbox.checked) {
            await sleep(50);
        }
        else {
            await sleep(200);
        }

        if (!isLife) {
            startbtn.disabled = false;
            borderbox.disabled = false;
            break;
        }
    }
};