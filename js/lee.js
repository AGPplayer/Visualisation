const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const startbtn = document.getElementById('start');
startbtn.addEventListener('click', lee);

async function lee() {
    startbtn.disabled = true;

    const array = document.querySelectorAll('.cell');
    const q = [];
    const visited = new Array(100).fill(true);
    const graph = new Array(100);
    const way = new Array(100);

    for (let i = 0; i < 100; i++) {
        if (array[i].classList.contains('white')) {
            graph[i] = false;
        }
        else {
            graph[i] = true;
        }
    }

    q.push(0);
    while (q.length > 0) {
        const now = q.shift();
        visited[now] = false;
        if (now != 0) {
            array[now].style.backgroundColor = 'yellow';
        }

        if (now == 99) {
            break;
        }

        if (now > 9) {
            if (visited[now - 10] && graph[now - 10]) {
                visited[now - 10] = false;
                way[now - 10] = now;
                q.push(now - 10);
            }
        }
        if (now % 10 != 9) {
            if (visited[now + 1] && graph[now + 1]) {
                visited[now + 1] = false;
                way[now + 1] = now;
                q.push(now + 1);
            }
        }
        if (now < 90) {
            if (visited[now + 10] && graph[now + 10]) {
                visited[now + 10] = false;
                way[now + 10] = now;
                q.push(now + 10);
            }
        }
        if (now % 10 != 0) {
            if (visited[now - 1] && graph[now - 1]) {
                visited[now - 1] = false;
                way[now - 1] = now;
                q.push(now - 1);
            }
        }
        await sleep(200);
    }
    await sleep(600);
    let s = 1;
    if (visited[99] == false) {
        for (let i = 99; i != 0; i = way[i]) {
            array[i].style.backgroundColor = 'red';
            s++;
            await sleep(300);
        }
    }
    array[0].style.backgroundColor = 'red';

    const textans = document.getElementById('grid_text');
    if (visited[99] == false) {
        textans.textContent = s;
    }
    else {
        textans.textContent = 'no way!';
    }

    startbtn.disabled = false;
}