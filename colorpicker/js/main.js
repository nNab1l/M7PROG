class ColorCard{
    id;
    color;
    addToList;
    htmlElement;
    circle;
    text;

    // adding new properties in constructor
    constructor(newId, newColor, addToList){
        /*setting properties*/
        this.id = newId;
        this.color = newColor;
        this.addToList = addToList;

        /*Make htmlElement to render */
        this.htmlElement = document.createElement("li");
        // give the to be rendered htmlElement a class
        this.htmlElement.classList = "colors__color";

        // make htmlElement to render
        this.circle = document.createElement("figure");
        // give the to be rendered htmlElement a class
        this.circle.classList = "colors__circle";
        // add the color property to the circle
        this.circle.style.background = this.color;

        
        // make htmlElement to render
        this.text = document.createElement("p");

        this.text.innerText = "Copied";
        // give the to be rendered htmlElement a class
        this.text.classList = "colors__text";

        //add onclick function
        this.htmlElement.onclick = this.onHTMLElementClicked;
        /* finally render */
        this.render();
    }

    //onclick function
    onHTMLElementClicked = () =>{
        //add selected state to the circle
        this.circle.classList.add("colors__circle--selected")
        document.title = this.color;
        //receive color code in clipboard
        window.navigator.clipboard.writeText(this.color);
    }

    //render function
    render(){

        this.addToList.appendChild(this.htmlElement);
        this.htmlElement.appendChild(this.circle);
        this.htmlElement.appendChild(this.text);
    }
}


class ColorList{

    //ColorList properties
    id;
    htmlElement;

    constructor(newId){
    //setting properties
       this.id = newId; 
       // create htmlElement
       this.htmlElement = document.createElement("ul");
       this.htmlElement.id = this.id;
       // add class to the created ul element
       this.htmlElement.classList.add("colors")
       //render function
       this.render();
    }
    
    //render function
    render(){
        //make the created ul the child of the body element
        document.querySelector("body").appendChild(this.htmlElement)
    }
}

// HSl generator
class HSLGenerator{

    //setting properties
    randomHue;
    randomSaturation;
    randomLightness;
    hsl;

    constructor(){
       this.generateHSL();
    }

    //hue generation function
    generateHue = function(){
        //defining the maximum and minimum hue range
        this.randomHue = Math.floor(Math.random() * (360 - 1) + 1);
    }

    //Saturation generation function
    generateSaturation = function(){
         //defining the maximum and minimum saturation range
        this.randomSaturation = Math.floor(Math.random() * (79 - 11) + 11) + "%";
    }

    //hue lightness function
    generateLightness = function(){
         //defining the maximum and minimum Lightness range
        this.randomLightness = Math.floor(Math.random() * (100 - 11) + 11) + "%";
    }

    //applying the functions
    generateHSL = function(){
        this.generateHue();
        this.generateLightness();
        this.generateSaturation();
        // defining hsl
        this.hsl = `hsl(${this.randomHue}, ${this.randomSaturation}, ${this.randomLightness})`
    }
}

//class app
class App{
    //app properties
    id;
    colorList;
    HSLGenerator;

    constructor(newId){
        this.id = newId;
        this.colorList = new ColorList(this.id);
        this.hslGenerator = new HSLGenerator();
        this.generateColorCards();
    }

    generateColorCards = function(){
        for(let i = 1; i <= 100; i++){
            this.hslGenerator.generateHSL();
            new ColorCard(i,  this.hslGenerator.hsl, document.getElementById(this.colorList.id));
        }
    }
}

// applying the id to the ul
const app = new App("js--app")


