function solve() {
    let spanInfo = document.querySelector('.info');
    let departButton = document.getElementById('depart');
    let arriveButton = document.getElementById('arrive');
    let currentStopName = '';
    let nextId = 'depot';

    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextId}`)
            .then(body => body.json())
            .then(x => {
                currentStopName = x.name;
                nextId = x.next;
                departButton.disabled = true;
                arriveButton.disabled = false;
                spanInfo.textContent = `Next stop ${currentStopName}`;
            })
            .catch(err => {
                departButton.disabled = true;
                arriveButton.disabled = true;
                spanInfo.textContent = 'Error';
            })
    }

    function arrive() {
        spanInfo.textContent = `Arriving at ${currentStopName}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();