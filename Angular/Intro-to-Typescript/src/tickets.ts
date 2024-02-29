class Ticket {
    public destination: string;
    public price: number;
    public status: string;

    constructor(destination: string, price: number, status: string) {
        this.destination = destination;
        this.price = price;
        this.status = status;
    }
}

const processTickets = function (ticketsArr: string[], sortCriteria: string) {
    const tickets: Ticket[] = ticketsArr.map(t => {
        const [destination, price, status] = t.split("|");
        return new Ticket(destination, Number(price), status);
    })
    return tickets.sort((a: Ticket, b: Ticket): number => {
        if (sortCriteria === 'price') {
            return a.price - b.price;
        } else if (sortCriteria === 'destination') {
            return a.destination.localeCompare(b.destination);
        } else {
            return a.status.localeCompare(b.status);
        }
    });
}

console.log(processTickets([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
],
    'destination'));