function attachEvents() {
    let inputLocation = document.getElementById('location');
    let inputSubmit = document.getElementById('submit');
    let conditionSymbols = {
        'Sunny':	'☀',
        'Partly sunny':	'⛅',
        'Overcast':	'☁',
        'Rain':		'☂',
    }

    inputSubmit.addEventListener('click',fetchInformation);

    function fetchInformation(){
        let name = inputLocation.value;
        let divCurrent = document.getElementById('current');
        let divUpcoming = document.getElementById('upcoming');

        let removeForecastsDiv = divCurrent.querySelector('.forecasts');
        let removeInfoDiv = divUpcoming.querySelector('.forecast-info');
        if(removeForecastsDiv && removeInfoDiv){
            removeForecastsDiv.remove();
            removeInfoDiv.remove();
        }

        let h2Error = document.querySelector('#forecast h2');
        if(h2Error){
            h2Error.remove();
        }

        fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
            .then(body => body.json())
            .then(info => {
                let searchedLocation = info.find(el=>el.name == name);

                return fetch(`http://localhost:3030/jsonstore/forecaster/today/${searchedLocation.code}`)
                        .then(body => body.json())
                        .then(reportInfo => {
                            return {reportInfo,code:searchedLocation.code}
                        });
            })
            .then( ({reportInfo,code}) => {
                let currentLocation = reportInfo;

                let divForecast = document.getElementById('forecast');
                divForecast.style.display = 'block';

                let divContent = document.createElement('div');
                divContent.classList.add('forecasts');
                createLocationContent(divContent,currentLocation);

                divCurrent.appendChild(divContent);
                return fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
                            .then(body=>body.json())
            })
            .then(info => {
                let divForecastInfo = document.createElement('div');
                divForecastInfo.classList.add('forecast-info');
                createUpcomingForecastContent(divForecastInfo,info.forecast)
                divUpcoming.appendChild(divForecastInfo);
            })
            .catch( err => {
                let h2Error = document.createElement('h2');
                h2Error.textContent = "Error";
                h2Error.style.textAlign = 'center';
                let divForecast = document.getElementById('forecast');
                divForecast.style.display = 'block';
                divForecast.appendChild(h2Error);
            })

        function createLocationContent(divContent,currentLocation){
            let locationForecast = currentLocation.forecast;

            let spanErrorConditionSymbol = document.createElement('spanError');
            spanErrorConditionSymbol.classList.add('condition');
            spanErrorConditionSymbol.classList.add('symbol');
            spanErrorConditionSymbol.textContent = conditionSymbols[locationForecast.condition];
            
            let spanErrorCondition = document.createElement('spanError');
            spanErrorCondition.classList.add('condition');

            let spanErrorName = document.createElement('spanError');
            spanErrorName.classList.add('forecast-data');
            spanErrorName.textContent = currentLocation.name;
            
            let spanErrorTemperature = document.createElement('spanError');
            spanErrorTemperature.classList.add('forecast-data');
            spanErrorTemperature.textContent = `${locationForecast.low}°/${locationForecast.high}°`;

            let spanErrorConditonInfo = document.createElement('spanError');
            spanErrorConditonInfo.classList.add('forecast-data');
            spanErrorConditonInfo.textContent = locationForecast.condition;

            spanErrorCondition.appendChild(spanErrorName);
            spanErrorCondition.appendChild(spanErrorTemperature);
            spanErrorCondition.appendChild(spanErrorConditonInfo);

            divContent.appendChild(spanErrorConditionSymbol);
            divContent.appendChild(spanErrorCondition);
        }
        function createUpcomingForecastContent(divForecastInfo,forecasts){
            forecasts.forEach(f => {
                let spanErrorUpcoming = document.createElement('spanError');
                spanErrorUpcoming.classList.add('upcoming');

                let spanErrorSymbol = document.createElement('spanError');
                spanErrorSymbol.classList.add('symbol');
                spanErrorSymbol.textContent = conditionSymbols[f.condition];

                let spanErrorTemperature = document.createElement('spanError');
                spanErrorTemperature.classList.add('forecast-data');
                spanErrorTemperature.textContent = `${f.low}°/${f.high}°`;

                let spanErrorCondition = document.createElement('spanError');
                spanErrorCondition.classList.add('forecast-data');
                spanErrorCondition.textContent = `${f.condition}`;

                spanErrorUpcoming.appendChild(spanErrorSymbol);
                spanErrorUpcoming.appendChild(spanErrorTemperature);
                spanErrorUpcoming.appendChild(spanErrorCondition);
                divForecastInfo.appendChild(spanErrorUpcoming);
            });
        }
    }
}

attachEvents();