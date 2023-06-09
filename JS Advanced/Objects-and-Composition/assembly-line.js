function createAssemblyLine() {
    let decoratorFuncs = {
        hasClima: function (carObj) {
            carObj.temp = 21;
            carObj.tempSettings = 21;
            carObj.adjustTemp = function () {
                if (carObj.temp < carObj.tempSettings) {
                    carObj.temp += 1;
                } else if (carObj.temp > carObj.tempSettings) {
                    carObj.temp -= 1;
                }
            }
        },
        hasAudio: function (carObj) {
            carObj.currentTrack = null;
            carObj.nowPlaying = function () {
                if (carObj.currentTrack) {
                    console.log(`Now playing '${carObj.currentTrack.name}' by ${carObj.currentTrack.artist}`);
                }
            }
        },
        hasParktronic: function (carObj) {
            carObj.checkDistance = function (distance) {
                if (distance < 0.1) {
                    console.log("Beep! Beep! Beep!");
                } else if (distance < 0.25) {
                    console.log("Beep! Beep!");
                } else if (distance < 0.5) {
                    console.log("Beep!");
                } else {
                    console.log("");
                }
            }
        }
    }
    return decoratorFuncs;
}
const assemblyLine = createAssemblyLine();

const myCar = {
    make: 'Toyota',
    model: 'Avensis'
};
assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings = 18;
myCar.adjustTemp();
console.log(myCar.temp);
assemblyLine.hasAudio(myCar);
myCar.currentTrack = {
    name: 'Never Gonna Give You Up',
    artist: 'Rick Astley'
};
myCar.nowPlaying();
assemblyLine.hasParktronic(myCar);
myCar.checkDistance(0.4);
myCar.checkDistance(0.2);
console.log(myCar);

