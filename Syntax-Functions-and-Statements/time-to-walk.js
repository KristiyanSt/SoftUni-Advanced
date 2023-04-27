function calculatingWalkingTime(steps,stepLength,speed){
    let distance = steps * stepLength;
    let breakTimesInMinutes = Math.floor(distance / 500);
    let totalTime = distance/1000 / speed * 60 + breakTimesInMinutes;
    let date = new Date(null,null,null,null,null,Math.ceil(totalTime*60),null);
    console.log(date.toTimeString().split(" ")[0]);
}

calculatingWalkingTime(4000, 0.60, 5);