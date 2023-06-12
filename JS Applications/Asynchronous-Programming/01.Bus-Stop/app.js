function getInfo() {
    let stopIdInput = document.getElementById('stopId');
    let stopNameDiv = document.getElementById('stopName');
    let busesUl = document.getElementById('buses');
    busesUl.querySelectorAll('li').forEach(li=>li.remove());

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopIdInput.value}`)
        .then(body => body.json())
        .then(stopInfo=> {
            stopNameDiv.textContent = stopInfo.name;

            for (const busId in stopInfo.buses) {
                let li = document.createElement('li');
                li.textContent = `Bus ${busId} arrives in ${stopInfo.buses[busId]}`;

                busesUl.appendChild(li);
            }
        })
        .catch(err => {
            stopNameDiv.textContent = 'Error';
            busesUl.querySelectorAll('li').forEach(li=>li.remove());
        });
}