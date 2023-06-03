class ArtGallery{
    constructor(creator){
        this.creator = creator;
        this.possibleArticles = { 
            "picture":200,
            "photo":50,
            "item":250 
        };
        this.listOfArticles = [];
        this.guests = [];
        this._personalityPoints = {
            "Vip":500,
            "Middle":250,
            default:50
        }
    }
    addArticle( articleModel, articleName, quantity ){
        articleModel = articleModel.toLowerCase();
        if(!this.possibleArticles[articleModel]){
            throw new Error("This article model is not included in this gallery!");
        }
        let persistingArticle = this.listOfArticles.find(ar=>ar.articleName == articleName && ar.articleModel == articleModel);
        if(persistingArticle){
            persistingArticle.quantity += quantity;
        }else{
            this.listOfArticles.push({articleModel,articleName,quantity});
        }
        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`;
    }
    inviteGuest( guestName, personality){
        if(this.guests.some(g=>g.guestName == guestName)){
            throw new Error(`${guestName} has already been invited.`);
        }
        let points = this._personalityPoints[personality]
        ? this._personalityPoints[personality]
        : this._personalityPoints.default;
        
        this.guests.push({guestName,points,purchaseArticle: 0});
        return `You have successfully invited ${guestName}!`;
    }
    buyArticle( articleModel, articleName, guestName){
        let article = this.listOfArticles.find(ar=>ar.articleModel == articleModel && ar.articleName==articleName);
        if(!article){
            throw new Error("This article is not found.");
        }
        if(article.quantity==0){
            return `The ${article.articleName} is not available.`;
        }
        let guest = this.guests.find(g=>g.guestName == guestName);
        if(!guest){
            return "This guest is not invited.";
        }
        let requiredPoints = this.possibleArticles[articleModel];
        if(guest.points<requiredPoints){
            return "You need to more points to purchase the article.";
        }else{
            guest.points-=requiredPoints;
            guest.purchaseArticle++;
            article.quantity--;
        }
        return `${guest.guestName} successfully purchased the article worth ${requiredPoints} points.`;
    }
    showGalleryInfo(criteria){
        if(criteria == "article"){
            let articleInformationString = "Articles information:";
            let articlesArr = this.listOfArticles.map(ar=>`${ar.articleModel} - ${ar.articleName} - ${ar.quantity}`);
            return articleInformationString + "\n" + articlesArr.join("\n");
        }else if(criteria == "guest"){
            let guestsInformation = "Guests information:";
            let guestsArr = this.guests.map(g=>`${g.guestName} - ${g.purchaseArticle}`);
            return guestsInformation + "\n" + guestsArr.join("\n");
        }
    }
}
const artGallery = new ArtGallery('Curtis Mayfield');
console.log(artGallery.inviteGuest('John', 'Hey'));
console.log(artGallery.inviteGuest('Peter', 'Middle'));
// console.log(artGallery.inviteGuest('John', 'Middle'));



