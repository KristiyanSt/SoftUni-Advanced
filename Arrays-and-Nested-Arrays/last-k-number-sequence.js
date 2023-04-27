function lastKNumberSequence(n, k) {
    let arr = [1];
    for (let index = 1; index < n; index++) {
        let startIndex = index-k <= 0 ? 0 : index-k;
        let sumOfPreviousElements = arr.slice(startIndex, index).reduce((acc, a) => a + acc);
        arr.push(sumOfPreviousElements);
    }
    return arr;
}
console.log(lastKNumberSequence(8, 2));