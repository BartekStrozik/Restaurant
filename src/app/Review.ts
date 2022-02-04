export class Review {
    nick: string;
    reviewTitle: string;
    reviewContent: string;
    date: string;

    constructor(nick: string, reviewTitle: string, reviewContent: string, date: string){
        this.nick = nick;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.date = date;
    }
}

