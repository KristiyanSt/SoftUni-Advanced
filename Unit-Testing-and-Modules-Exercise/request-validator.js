function validate(inputObj){

    let methods = ['GET', 'POST', 'DELETE','CONNECT'];
    let versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1','HTTP/2.0'];
    let uriRegex = /^\*$|^[a-zA-Z0-9.]+$/;
    let messageRegex = /^[^<>\\&'"]*$/;
    let messageIsValid = messageRegex.test(inputObj.message);

    if(inputObj.method === undefined || !methods.includes(inputObj.method)){
        throw new Error('Invalid request header: Invalid Method');
    }

    if(inputObj.uri === undefined || inputObj.uri === '' || !uriRegex.test(inputObj.uri)){
        throw new Error('Invalid request header: Invalid URI');
    }

    if(inputObj.version === undefined || !versions.includes(inputObj.version)){
        throw new Error('Invalid request header: Invalid Version');
    }

    if(inputObj.message === undefined || !messageIsValid){
        throw new Error('Invalid request header: Invalid Message');
    }

    return inputObj;
}
try {
    console.log(validate({
        method: 'POST',
        uri: '.rec',
        version: 'HTTP/1.1',
        message: '-recursive'
      }
      
      ))
} catch (error) {
    console.log(error);
}
