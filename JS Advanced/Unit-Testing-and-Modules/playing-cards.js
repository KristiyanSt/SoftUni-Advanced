function createCard(face,suit){
    // •	Valid card faces are: 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
    // •	Valid card suits are: S (♠), H (♥), D (♦), C (♣)
    let validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let validSuits = {
        'S':'\u2660',
        'H':'\u2665',
        'D':'\u2666',
        'C':'\u2663'
    }
    if(validFaces.includes(face.toString()) && validSuits[suit]){
        return {
            face:face,
            suit:validSuits[suit],
            toString() {
                return this.face + this.suit;
            }
        }
    }else{
        throw new Error;
    }
}
module.exports = createCard;