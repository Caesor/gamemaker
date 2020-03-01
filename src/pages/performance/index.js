import Test from './collision_test';

const test = new Test(40, null, 2);

document.getElementById('start').addEventListener('click', () => {
    test.start()
})

document.getElementById('stop').addEventListener('click', () => {
    test.stop();
})