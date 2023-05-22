function creatingTickets(ticketsDescription,sortCriteria){
    let sortOptions = {
        'destination': (a,b)=>{
            return a.destination.localeCompare(b.destination);
        },
        'price': (a,b)=>{
            return a.price - b.price;
        },
        'status': (a,b)=>{
            return a.status.localeCompare(b.status);
        }
    }
    class Ticket{
        constructor(destination,price,status){
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }
    let tickets = [];
    for (const ticketString of ticketsDescription) {
        let [destination,price,status] = ticketString.split('|');
        price = Number(price);
        tickets.push(new Ticket(destination,price,status));
    }
    tickets.sort((a,b)=>sortOptions[sortCriteria](a,b));
    return tickets;
}
console.log(creatingTickets(['Philadelphia|94.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|departed'],
'destination'
));