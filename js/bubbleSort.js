const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function bubbleSort() {
    const btn = document.getElementById('start');
    const array = document.querySelectorAll('.rect');
    const n = array.length;
    btn.disabled = true;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            array[j].style.backgroundColor = 'orange';
            array[j + 1].style.backgroundColor = 'orange';
            await sleep(500);

            let h1 = parseInt(array[j].style.height);
            let h2 = parseInt(array[j + 1].style.height);
            if (h1 <= h2) {
                array[j].style.backgroundColor = 'green';
                array[j + 1].style.backgroundColor = 'green';
                await sleep(500);
            }
            else {
                array[j].style.backgroundColor = 'red';
                array[j + 1].style.backgroundColor = 'red';
                await sleep(500);
                array[j].style.height = h2 + 'px';
                array[j + 1].style.height = h1 + 'px';
                await sleep(500);
            }
            array[j].style.backgroundColor = 'grey';
            array[j + 1].style.backgroundColor = 'grey';
            await sleep(500);
        }
    }

    btn.disabled = false;
}