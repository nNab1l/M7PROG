class Cookie{
    name = "";
    htmlElement = undefined;
    factor = 1;
    //Dit wordt 1x uitgevoerd wanneer "new" wordt gebruikt
    constructor(newName, newHTMLElement, newScore){
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onCookieClicked;
        this.score = newScore;
    }

    onCookieClicked = () =>{
        this.score.onCookieClicked(this.factor);
    }

    onStyleChange(){
        this.htmlElement.classList.add("cookie--chocolate");
    }

    onStyleChangesecond(){
        this.htmlElement.classList.remove("cookie--chocolate");
        this.htmlElement.classList.add("cookie--velvet");
    }
}

class Score{
    score;
    name = "";
    htmlElement = undefined;

    constructor(newScore, newName, newHTMLElement){
        this.score = newScore;
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.innerText = newScore;
    }

    onCookieClicked(factorFromCookie){
        this.score = this.score + factorFromCookie;
        this.htmlElement.innerText = this.score;

       
    }

    subtractScore(){
        this.score = this.score - 100;
        this.htmlElement.innerText = this.score;
    }

    onAutoScoreClicked(){
        setInterval( () => {
            this.score = this.score + 500;
            this.htmlElement.innerText = this.score;
        }, 1000)
    }

    addPoints(){
        this.score = this.score + 10000;
        this.htmlElement.innerText = this.score;
    }

    scoreLoaded(newScore){
        this.score = newScore;
        this.htmlElement.innerText = this.score;
    }
}



class Multiplier{
    factor = 100;
    htmlElement = undefined;
    cookie = undefined;
    bought = false;

    constructor(htmlElement, cookie){
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onMultiplierClicked;
    }

    onMultiplierClicked = () => {
        if(this.bought === false){
            this.bought = true;
            //remove 100 points from score
            this.cookie.score.subtractScore();
            this.cookie.factor = this.factor;
        }
    }
}

class AutoScore{
    htmlElement = undefined;
    score = undefined;
    forward = false;

    constructor(htmlElement){
        this.htmlElement = htmlElement;
        this.score = score;
        this.htmlElement.onclick = this.onAutoScoreClicked;
    }

    onAutoScoreClicked = () => {
        if(this.forward === false){
            this.forward = true;
            this.score.subtractScore();
            score.onAutoScoreClicked();
        }
        
    }
}

class ChocolateCookie{
    htmlElement = undefined;
    bought = false;
    forward = false;
    cookie = undefined;

    constructor(htmlElement,cookie){
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onChocolateCookieClicked;
        window.localStorage.setItem("chocolateCookie", this.bought);
    }

    onChocolateCookieClicked = () => {
        if(this.bought === false){
            this.bought = true;
            window.localStorage.setItem("chocolateCookie", this.bought);
            this.cookie.onStyleChange();
            this.cookie.score.addPoints();
        }
    }
}

class VelvetCookie{
    htmlElement = undefined;
    bought = false;
    forward = false;
    cookie = undefined;

    constructor(htmlElement,cookie){
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onVelvetCookieClicked;
    }

    onVelvetCookieClicked = () => {
        if(this.bought === false){
            this.bought = true;
            this.cookie.onStyleChangesecond();
            this.cookie.score.addPoints();
        }
    }
}

class Save{
    htmlElement;

    constructor(newHTMLElement){
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onSaveButtonClicked;

    }

    onSaveButtonClicked = () => {
        window.localStorage.setItem("score", score.score);
    }
}

class Load{
    score;

    constructor(score){
        this.score = score;

        this.onLoad();
    }

    onLoad = function(){
        const scoreFromLocalStorage = parseInt(window.localStorage.getItem("score"));
        if (typeof scoreFromLocalStorage === 'number'){
            this.score.scoreLoaded(scoreFromLocalStorage);
        } 
    }
}



/*setup for score and cookie*/
const score = new Score(333, "Default Score", document.getElementById("js--score"));
const cookie = new Cookie("Default Cookie", document.getElementById("js--cookie"), score);

/*setup for desktop upgrades*/
const multiply = new Multiplier(document.getElementById("js--multiplier"), cookie);
const auto = new AutoScore(document.getElementById("js--autoScore"), score);
const chocolate = new ChocolateCookie(document.getElementById("js--chocolate"), cookie);
const velvet = new VelvetCookie(document.getElementById("js--velvet"), cookie);
const save = new Save(document.getElementById("js--save"));
const load = new Load(score);

/*setup mobile upgrades*/
const multiplierMobile = new Multiplier(document.getElementById("js--multiply--mobile"), cookie);
const autoMobile = new AutoScore(document.getElementById("js--auto--mobile"), score);
const chocoMobile = new ChocolateCookie(document.getElementById("js--chocolate--mobile"), cookie);
const velvetMobile = new VelvetCookie(document.getElementById("js--velvet--mobile"), cookie);