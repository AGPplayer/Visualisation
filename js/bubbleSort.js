const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const btn = document.getElementById('start');
btn.addEventListener('click', bubbleSort);

async function bubbleSort() {
    const array = document.querySelectorAll('.rect');
    const n = array.length;
    btn.disabled = true;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            array[j].style.boxShadow = '0px 0px 5px 5px rgba(255, 255, 255, 0.8)';
            array[j + 1].style.boxShadow = '0px 0px 5px 5px rgba(255, 255, 255, 0.8)';
            await sleep(500);

            let h1 = parseInt(array[j].style.height);
            let h2 = parseInt(array[j + 1].style.height);
            if (h1 <= h2) {
                await sleep(250);
            }
            else {
                const h = h2;
                const col = 120 - Math.floor((h - 50) / 135 * 120);
                array[j].style.backgroundColor = `hsl(${col}, 100%, 50%)`;
                array[j].style.height = h2 + 'px';

                const hi = h1;
                const col1 = 120 - Math.floor((hi - 50) / 135 * 120);
                array[j + 1].style.backgroundColor = `hsl(${col1}, 100%, 50%)`;
                array[j + 1].style.height = h1 + 'px';
                await sleep(500);
            }
            
            array[j].style.boxShadow = 'none';
            array[j + 1].style.boxShadow = 'none';

            await sleep(500);
        }
        array[n - 1 - i].style.boxShadow = '0px 0px 5px 5px rgba(255, 255, 255, 0.8)';
    }

    await sleep(500);
    for (let i = n - 1; i > -1; i--) {
        array[i].style.boxShadow = 'none';
        await sleep(500);
    }

    btn.disabled = false;
}