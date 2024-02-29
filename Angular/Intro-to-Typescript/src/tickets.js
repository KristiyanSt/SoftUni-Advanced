var Ticket = /** @class */ (function () {
    function Ticket(destination, price, status) {
        this.destination = destination;
        this.price = price;
        this.status = status;
    }
    return Ticket;
}());
var processTickets = function (ticketsArr, sortCriteria) {
    var tickets = ticketsArr.map(function (t) {
        var _a = t.split("|"), destination = _a[0], price = _a[1], status = _a[2];
        return new Ticket(destination, Number(price), status);
    });
    return tickets.sort(function (a, b) {
        if (sortCriteria === 'price') {
            return a.price - b.price;
        }
        else if (sortCriteria === 'destination') {
            return a.destination.localeCompare(b.destination);
        }
        else {
            return a.status.localeCompare(b.status);
        }
    });
};
console.log(processTickets([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
], 'destination'));
