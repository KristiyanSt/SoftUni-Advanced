function extract(content) {
    let text = document.getElementById(content).textContent;
    let regex = /\((?<name>[^(]+)\)/g;
    let matches = text.matchAll(regex);
    let result = [];
    for (const match of matches) {
        result.push(match.groups.name);
    }
    console.log(result.join(', '));
}