const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const btn = document.getElementById('start');
btn.addEventListener('click', choiceSorting);

async function choiceSorting() {
    btn.disabled = true;

    const array = document.querySelectorAll('.rect');
    const n = array.length;

    for (let i = 0; i < n; i++) {
        let pma = -1, sma;
        for (let j = 0; j < n - i; j++) {
            let h = parseInt(array[j].style.height);
            array[j].style.boxShadow = '0px 0px 5px 5px rgba(255, 255, 255, 0.8)';
            await sleep(500);
            if (pma == -1 || sma <= h) {
                if (pma != -1) {
                    array[pma].style.boxShadow = 'none';
                }
                pma = j;
                sma = h;
            }
            else {
                array[j].style.boxShadow = 'none';
            }
            await sleep(500);
        }
        await sleep(500);
        const h1 = parseInt(array[pma].style.height);
        const h2 = parseInt(array[n - i - 1].style.height);
        if (pma != n - i - 1) {
            array[n - i - 1].style.boxShadow = '0px 0px 5px 5px rgba(255, 255, 255, 0.8)';
            await sleep(500);

            const h = h2;
            const col = 120 - Math.floor((h - 50) / 135 * 120);
            array[pma].style.backgroundColor = `hsl(${col}, 100%, 50%)`;
            array[pma].style.height = h2 + 'px';

            const hi = h1;
            const col1 = 120 - Math.floor((hi - 50) / 135 * 120);
            array[n - i - 1].style.backgroundColor = `hsl(${col1}, 100%, 50%)`;
            array[n - i - 1].style.height = h1 + 'px';
            await sleep(200);
            array[pma].style.boxShadow = 'none';
        }
        await sleep(300);
    }

    await sleep(300);
    for (let i = n - 1; i > -1; i--) {
        array[i].style.boxShadow = 'none';
        await sleep(500);
    }

    btn.disabled = false;
}