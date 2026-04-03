const container = document.getElementById('grid_container');
const clearbtn = document.getElementById('clear');

clearbtn.addEventListener('click', build);

build();
function build() {
    const startbtn = document.getElementById('start');
    startbtn.disabled = false;
    const arr = document.getElementById('grid_container');
    arr.innerHTML = '';

    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
    }

    const array = document.querySelectorAll('.cell');

    array[0].style.backgroundColor = 'green';
    array[99].style.backgroundColor = 'red';
    array[0].classList.add('cell_sf');
    array[99].classList.add('cell_sf');
}

container.addEventListener('click', function(e) {
    const target = e.target;

    if (target.classList.contains('cell') && !target.classList.contains('cell_sf')) {
        target.classList.toggle('white');
    }
});