function listProcessor(commands){
    let repository = [];
    let commandFactory = {
        'add':(text)=>{
            repository.push(text);
        },
        'remove':(text)=>{
            while(repository.includes(text)){
                let index = repository.indexOf(text); 
                repository.splice(index,1);
            }
        },
        'print':()=>{
            console.log(repository.join(','));
        }
    }
    for (const commandString of commands) {
        let [command,text] = commandString.split(' ');
        if(commandFactory[command]){
            commandFactory[command](text);
        }
    }
}

listProcessor(['add pesho', 'add george', 'add peter', 'remove peter','print']);