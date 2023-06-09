function modifiyingObject(workerObj){
    if(workerObj.dizziness){
        let neededAmount = 0.1*workerObj.weight*workerObj.experience;
        workerObj.levelOfHydrated+=neededAmount;
        workerObj.dizziness = false;
    }
    return workerObj;
}
console.log(modifiyingObject({ weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true }
  ));