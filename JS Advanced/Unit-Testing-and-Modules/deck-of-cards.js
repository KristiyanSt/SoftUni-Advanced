const createCard = require(`./playing-cards`);
function printDeckOfCards(cardsInput) {
    let cards = [];
    for (const card of cardsInput) {
        let face = '';
        let suit = '';
        if(card.length<3){
            face = card[0];
            suit = card[1];
        }else{
            face = card[0] + card[1];
            suit = card[2];
        }
        try {
            let validCard = createCard(face,suit).toString();
            cards.push(validCard);
        } catch (error) {
            console.log(`Invalid card: ${card}`);
            return;
        }
    }
    console.log(cards.join(' '));
}
printDeckOfCards(['AS', '10D', 'KH', '2C']);
  