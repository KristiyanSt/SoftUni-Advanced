function attachEventsListeners() {
    let daysInputButton = document.getElementById('daysBtn');
    let daysInputElement  = document.getElementById('days');
    let hoursInputButton = document.getElementById('hoursBtn');
    let hoursInputElement = document.getElementById('hours');
    let minutesInputButton = document.getElementById('minutesBtn');
    let minutesInputElement = document.getElementById('minutes');
    let secondsInputButton = document.getElementById('secondsBtn');
    let secondsInputElement = document.getElementById('seconds');
    daysInputButton.addEventListener('click',()=>{
        let days = daysInputElement.value;
        hoursInputElement.value = days * 24;
        minutesInputElement.value = days * 1440;
        secondsInputElement.value = days * 86400;
    });
    hoursInputButton.addEventListener('click',()=>{
        let hours = hoursInputElement.value;
        daysInputElement.value = hours / 24;
        minutesInputElement.value = hours * 60 ;
        secondsInputElement.value = minutesInputElement.value * 60;
    });
    minutesInputButton.addEventListener('click',()=>{
        let minutes = minutesInputElement.value;
        daysInputElement.value = minutes / 1440;
        hoursInputElement.value = minutes / 60;
        secondsInputElement.value = minutes * 60 ;
    });
    secondsInputButton.addEventListener('click',()=>{
        let seconds = secondsInputElement.value;
        daysInputElement.value = seconds / 86400;
        minutesInputElement.value = seconds / 60;
        hoursInputElement.value = minutesInputElement.value / 60;
    });
}