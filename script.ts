//Nikia Shaw - May 2023

// JSON Credit to:
// https://github.com/RandyBoBandy92/ReactIChing/tree/master/ichingreact/src/DekorneText/hexagramJSONS

// quesiton HTML variable elements
const questionNotEscaped = document.getElementById('question') as HTMLHeadingElement;
const question = questionNotEscaped.innerText;

const questionHeader = document.getElementById('question-header') as HTMLHeadingElement;
const questionInput = document.getElementById('question') as HTMLInputElement;
const questionOutput = document.getElementById('question-output') as HTMLHeadingElement;

// initial hexagram HTML variables
const initialSixth = document.getElementById('line6-initial') as HTMLImageElement;
const initialFifth = document.getElementById('line5-initial') as HTMLImageElement;
const initialFourth = document.getElementById('line4-initial') as HTMLImageElement;
const initialThird = document.getElementById('line3-initial') as HTMLImageElement;
const initialSecond = document.getElementById('line2-initial') as HTMLImageElement;
const initialFirst = document.getElementById('line1-initial') as HTMLImageElement;


// title/overview text elements
const initialHexagramTitleText = document.getElementById('hexagram-initial-heading') as HTMLSpanElement
const initialHexagramNumEle = document.getElementById('initial-hexagram-num') as HTMLSpanElement;
const initialHexagramTitle = document.getElementById('initial-hexagram-title') as HTMLSpanElement;
const initialJudgment = document.getElementById('initial-judgment') as HTMLSpanElement;
const initialImage = document.getElementById('image-text') as HTMLSpanElement;
const preCast = document.getElementById('pre-cast') as HTMLElement;



// changing Line text elements
// <p> parent tags and line info in spans
const sixthLineChanging = document.getElementById('sixth-line') as HTMLSpanElement;
const fifthLineChanging = document.getElementById('fifth-line') as HTMLSpanElement;
const fourthLineChanging = document.getElementById('fourth-line') as HTMLSpanElement;
const thirdLineChanging = document.getElementById('third-line') as HTMLSpanElement;
const secondLineChanging = document.getElementById('second-line') as HTMLSpanElement;
const firstLineChanging = document.getElementById('first-line') as HTMLSpanElement;
const changingLines = document.getElementById('changing-lines') as HTMLSpanElement;

// span tags, json data inserted into
const sixthParentTag = document.getElementById('sixth-line-parent') as HTMLParagraphElement;
const fifthParentTag = document.getElementById('fifth-line-parent') as HTMLParagraphElement;
const fourthParentTag = document.getElementById('fourth-line-parent') as HTMLParagraphElement;
const thirdParentTag = document.getElementById('third-line-parent') as HTMLParagraphElement;
const secondParentTag = document.getElementById('second-line-parent') as HTMLParagraphElement;
const firstParentTag = document.getElementById('first-line-parent') as HTMLParagraphElement;




// final Hexagram HTML text Variables
const finalHexagramNum = document.getElementById('final-hexagram-num') as HTMLSpanElement;
const finalHexagramTitle = document.getElementById('final-hexagram-title') as HTMLSpanElement;
const finalJudgment = document.getElementById('final-judgment') as HTMLSpanElement;
const finalImage = document.getElementById('final-image') as HTMLSpanElement;
const finalHexagram = document.getElementById('final-hexagram') as HTMLElement;

// final Hexagram image elements
const finalSixth = document.getElementById('final-sixth') as HTMLImageElement;
const finalFifth = document.getElementById('final-fifth') as HTMLImageElement;
const finalFourth = document.getElementById('final-fourth') as HTMLImageElement;
const finalThird = document.getElementById('final-third') as HTMLImageElement;
const finalSecond = document.getElementById('final-second') as HTMLImageElement;
const finalFirst = document.getElementById('final-first') as HTMLImageElement;



// button elements and anchors acting as buttons
const startBtn = document.getElementById('start') as HTMLButtonElement;
const castBtn = document.getElementById('cast') as HTMLButtonElement;
const againBtn = document.getElementById('again') as HTMLAnchorElement;


// storage variables
// if old line = true, line is changing. default is false. changed in castLine()
// changingNumList is for changing line text fetch function and display functions in the cast <a> button action

let oldLine1 = false;
let oldLine2 = false;
let oldLine3 = false;
let oldLine4 = false;
let oldLine5 = false;
let oldLine6 = false;
let changingNumList: number[] = [];

const hexagramArrayData = [
    [true,true,true,true,true,true],
    [false,false,false,false,false,false],
    [false,true,false,false,false,true],
    [true,false,false,false,true,false],
    [false,true,false,true,true,true],
    [true,true,true,false,true,false],
    [false,false,false,false,true,false],
    [false,true,false,false,false,false],
    [true,true,false,true,true,true],
    [true,true,true,false,true,true],
    [false,false,false,true,true,true],
    [true,true,true,false,false,false],
    [true,true,true,true,false,true],
    [true,false,true,true,true,true],
    [false,false,false,true,false,false],
    [false,false,true,false,false,false],
    [false,true,true,false,false,true],
    [true,false,false,true,true,false],
    [false,false,false,false,true,true],
    [true,true,false,false,false,false],
    [true,false,true,false,false,true],
    [true,false,false,true,false,true],
    [true,false,false,false,false,false],
    [false,false,false,false,false,true],
    [true,true,true,false,false,true],
    [true,false,false,true,true,true],
    [true,false,false,false,false,true],
    [false,true,true,true,true,false],
    [false,true,false,false,true,false],
    [true,false,true,true,false,true],
    [false,true,true,true,false,false],
    [false,false,true,true,true,false],
    [true,true,true,true,false,false],
    [false,false,true,true,true,true],
    [true,false,true,false,false,false],
    [false,false,false,true,false,true],
    [true,true,false,true,false,true],
    [true,false,true,false,true,true],
    [false,true,false,true,false,false],
    [false,false,true,false,true,false],
    [true,false,false,false,true,true],
    [true,true,false,false,false,true],
    [false,true,true,true,true,true],
    [true,true,true,true,true,false],
    [false,true,true,false,false,false],
    [false,false,false,true,true,false],
    [false,true,true,false,true,false],
    [false,true,false,true,true,false],
    [false,true,true,true,false,true],
    [true,false,true,true,true,false],
    [false,false,true,false,false,true],
    [true,false,false,true,false,false],
    [true,true,false,true,false,false],
    [false,false,true,false,true,true],
    [false,false,true,true,false,true],
    [true,false,true,true,false,false],
    [true,true,false,true,true,false],
    [false,true,true,false,true,true],
    [true,true,false,false,true,false],
    [false,true,false,false,true,true],
    [true,true,false,false,true,true],
    [false,false,true,true,false,false],
    [false,true,false,true,false,true],
    [true,false,true,false,true,false]
];

// hexagram object interface: title, judgment, image, line1 to line6

interface Hexagram {
    title       : string;
    Judgment    : {
        "Legge"             : string;
        "Wilhelm/Baynes"    : string;
        "Blofeld"           : string;
        "Liu"               : string;
        "Ritsema/Karcher"   : string;
        "Shaughnessy"       : string;
        "Cleary (1)"        : string;
        "Cleary (2)"        : string;
        "Wu"                : string; 
    };
    Image       : {
        "Legge"             : string;
        "Wilhelm/Baynes"    : string;
        "Blofeld"           : string;
        "Liu"               : string;
        "Ritsema/Karcher"   : string;
        "Cleary (1)"        : string;
        "Wu"                : string; 
    };
    line_1      : {
        "Legge"             : string;
        "Wilhelm/Baynes"    : string;
        "Blofeld"           : string;
        "Liu"               : string;
        "Ritsema/Karcher"   : string;
        "Shaughnessy"       : string;
        "Cleary (1)"        : string;
        "Cleary (2)"        : string;
        "Wu"                : string; 
        "Commentary"        : string;
        "Notes"             : string;
    };
    line_2      : {
        "Legge"             : string;
        "Wilhelm/Baynes"    : string;
        "Blofeld"           : string;
        "Liu"               : string;
        "Ritsema/Karcher"   : string;
        "Shaughnessy"       : string;
        "Cleary (1)"        : string;
        "Cleary (2)"        : string;
        "Wu"                : string; 
        "Commentary"        : string;
        "Notes"             : string;
    };
    line_3      : {
        "Legge"             : string;
        "Wilhelm/Baynes"    : string;
        "Blofeld"           : string;
        "Liu"               : string;
        "Ritsema/Karcher"   : string;
        "Shaughnessy"       : string;
        "Cleary (1)"        : string;
        "Cleary (2)"        : string;
        "Wu"                : string; 
        "Commentary"        : string;
        "Notes"             : string;
    };
    line_4      : {
        "Legge"             : string;
        "Wilhelm/Baynes"    : string;
        "Blofeld"           : string;
        "Liu"               : string;
        "Ritsema/Karcher"   : string;
        "Shaughnessy"       : string;
        "Cleary (1)"        : string;
        "Cleary (2)"        : string;
        "Wu"                : string; 
        "Commentary"        : string;
        "Notes"             : string;
    };
    line_5      : {
        "Legge"             : string;
        "Wilhelm/Baynes"    : string;
        "Blofeld"           : string;
        "Liu"               : string;
        "Ritsema/Karcher"   : string;
        "Shaughnessy"       : string;
        "Cleary (1)"        : string;
        "Cleary (2)"        : string;
        "Wu"                : string; 
        "Commentary"        : string;
        "Notes"             : string;
    };
    line_6      : {
        "Legge"             : string;
        "Wilhelm/Baynes"    : string;
        "Blofeld"           : string;
        "Liu"               : string;
        "Ritsema/Karcher"   : string;
        "Shaughnessy"       : string;
        "Cleary (1)"        : string;
        "Cleary (2)"        : string;
        "Wu"                : string; 
        "Commentary"        : string;
        "Notes"             : string;
    };
}

// hexagram object type
// used for Judgment, Image, and line
type HexagramObject = { [key: string]: string };

interface Hexagram {
    title       : string;
    [key: string]: HexagramObject | string;
  }

//
// functions
//



// cast single line function, returns true if yang, false if yin
// switch/case statements are present for changing lines, using global variables oldLine# to track
// line number is pushed to changingNumList[] for json object path construction in getChangingLine()

function castLine(lineNum: number) {
    const coin1 = Math.floor(Math.random() * 2);
    const coin2 = Math.floor(Math.random() * 2);
    const coin3 = Math.floor(Math.random() * 2);

    const castedLineCount = coin1 + coin2 + coin3;

    if (castedLineCount == 0) {

        switch(lineNum){

            case 6:
                oldLine6 = true
                changingNumList.push(6)
                break;
            case 5:
                oldLine5 = true
                changingNumList.push(5)
                break;
            case 4:
                oldLine4 = true
                changingNumList.push(4)
                break;
            case 3:
                oldLine3 = true
                changingNumList.push(3)
                break;
            case 2:
                oldLine2 = true
                changingNumList.push(2)
                break;
            case 1:
                oldLine1 = true
                changingNumList.push(1)
                break;
        }

        return false;
    }

    else if (castedLineCount == 1) {
        return false;
    }

    else if (castedLineCount == 2) {
        return true;
    }

    else {

        switch(lineNum){

            case 6:
                oldLine6 = true
                changingNumList.push(6)
                break;
            case 5:
                oldLine5 = true
                changingNumList.push(5)
                break;
            case 4:
                oldLine4 = true
                changingNumList.push(4)
                break;
            case 3:
                oldLine3 = true
                changingNumList.push(3)
                break;
            case 2:
                oldLine2 = true
                changingNumList.push(2)
                break;
            case 1:
                oldLine1 = true
                changingNumList.push(1)
                break;
        }

        return true;
    }

}




// image string path constructor for lines, used in castHexagram()

function displayLineImage(bool: boolean) {
    if (bool) {
        return 'images/yang.png'
    }
    else {
        return 'images/yin.png'
    }
}


// image string path constructor for changing lines, used in findHexagramResult()

function displayChangingLines(bool: boolean) {

    if (bool) {
        return 'images/old-yang.png'
    }
    else {
        return 'images/old-yin.png'
    }
}





// cast all six lines function. displayLineImage() takes boolean value to return img path. 

function castHexagram() {
    let line6 = castLine(6)
    initialSixth.src = displayLineImage(line6);

    let line5 = castLine(5)
    initialFifth.src = displayLineImage(line5);

    let line4 = castLine(4)
    initialFourth.src = displayLineImage(line4);

    let line3 = castLine(3)
    initialThird.src = displayLineImage(line3);

    let line2 = castLine(2)
    initialSecond.src = displayLineImage(line2);

    let line1 = castLine(1)
    initialFirst.src = displayLineImage(line1);

    let newHexagram = [line6, line5, line4, line3, line2, line1];
    return newHexagram;
}


// find hexagram number function
// takes array as argument and returns hexagram number by comparing initialhexagramList[j] to data in hexagramArrayData[i][j], if counter reaches max value, returns index and adds 1 for positional consideration

function findHexagramNum(hexagramList: boolean[]) {

    let lineCounter = 0;

    for (let i in hexagramArrayData) {
        lineCounter = 0;
        for (let j in hexagramArrayData[i]){
            if (hexagramList[j] == hexagramArrayData[i][j]) {
                lineCounter ++;
                if (lineCounter == 6) {
                    let hexagramNum = ( parseInt(i) + 1 );
                    return hexagramNum;
                }
            }
        }
    }
}



// resulting hexagram function, display initial hexagram changing images, display changing line text tags (<p> & <span>), and generates newHexagram[] for return. takes in initialHexagramList[](filled with initial hexagram values) and changingLineList[](filled with changing line values). places base value of initial hexagram if the same position in the changing list is false, flips the value into the new list if the changing list value is true 

function findHexagramResult(initialHexagramList: boolean[], changingLineList: boolean[]) {
    
    let newHexagram: boolean[] = [];
    

    for (let i in changingLineList) {
        if (changingLineList[i]) {
            newHexagram[i] = (!initialHexagramList[i])      

            switch (i) {
                case '0':
                    initialSixth.src = displayChangingLines(initialHexagramList[i]);
                    sixthLineChanging.style.display = 'block'
                    sixthParentTag.style.display = 'block'                
                    break;

                case '1':
                    initialFifth.src = displayChangingLines(initialHexagramList[i]);
                    fifthLineChanging.style.display = 'block'
                    fifthParentTag.style.display = 'block'
                    break;
                
                case '2':
                    initialFourth.src = displayChangingLines(initialHexagramList[i]);
                    fourthLineChanging.style.display = 'block'
                    fourthParentTag.style.display = 'block'
                    break;
                
                case '3':
                    initialThird.src = displayChangingLines(initialHexagramList[i]);
                    thirdLineChanging.style.display = 'block'
                    thirdParentTag.style.display = 'block'
                    break;

                case '4':
                    initialSecond.src = displayChangingLines(initialHexagramList[i])
                    secondLineChanging.style.display = 'block'
                    secondParentTag.style.display = 'block'
                    break;
                
                case '5':
                    initialFirst.src = displayChangingLines(initialHexagramList[i]);
                    firstLineChanging.style.display = 'block';
                    firstParentTag.style.display = 'block';
                    break;
            }

        }
        else {
            newHexagram[i] = initialHexagramList[i];
        }
    }

    return newHexagram;

}




// display new hexagram function. takes in list (constructed after comparison of changing line list and initial list) and displays. List is in order list[0] = line6, [1] = line5

function displayNewHexagram(list: boolean[]) {
    for (let i in list) {
        switch (i) {
            case '0':
                finalSixth.src = displayLineImage(list[i]);
                break;

            case '1':
                finalFifth.src = displayLineImage(list[i]);
                break;
            
            case '2':
                finalFourth.src = displayLineImage(list[i]);
                break;
            
            case '3':
                finalThird.src = displayLineImage(list[i]);
                break;

            case '4':
                finalSecond.src = displayLineImage(list[i]);
                break;
            
            case '5':
                finalFirst.src = displayLineImage(list[i]);
                break;

    }
}
}



// get title from data object for new/initial hexagram (as bool, true = final, false = initial) and place in elements

function getTitle( data: Hexagram, bool: boolean ) {
    const title: string = data.title

    if ( !bool ){
        initialHexagramTitle.innerHTML = title;
    }
    else {
        finalHexagramTitle.innerHTML = title;
    }
}




// get Judgment data and place it in elements

function getJudgment( data: Hexagram, bool: boolean ) {
    let returnString = '';
    let judgmentObject: HexagramObject = data.Judgment;

    Object.keys(judgmentObject).forEach((key) => {
        returnString = returnString + `<p>${ key }:<br>  ${ judgmentObject[key] } </p>`
    })
    
    if ( !bool ) {
        initialJudgment.innerHTML = returnString;
    }
    else {
        finalJudgment.innerHTML = returnString;
    }

}

// get image function, takes in a data object, as well as a boolean value to discren if image text is for the intial or final hexagram, then displays text.

function getImage( data: Hexagram, bool: boolean ) {
    let returnString = '';
    let imageObject: HexagramObject = data.Image;

    Object.keys(imageObject).forEach((key) => {
        returnString = returnString + `<p>${ key }:<br>  ${ imageObject[key] } </p>`
    })

    if ( !bool ) {
        initialImage.innerHTML = returnString;
    }
    else {
        finalImage.innerHTML = returnString;
    }

}




// .then response check function for data object url, if not ok, throw error

function responseCheck(response: Response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error('An error occured, please try again');
}


// .catch error function for above response function
function errorCatcher(error: Error) {
    questionOutput.innerHTML = `${error}`
}




// output changing line function. takes in data object as well as the changing line number, displays text in element from obj

function outputChangingLine(data: Hexagram, line: number) {
    let returnString = '';
    let lineObject = data[`line_${line}`];
  
    if (typeof lineObject === 'object') {
      for (let property in lineObject) {
        returnString = returnString + `<p>${property}:<br>  ${lineObject[property]} </p>`;
      }
    } else {
      returnString = lineObject;
    }
  
    switch (line) {
      case 6:
        sixthLineChanging.innerHTML = returnString;
        break;
      case 5:
        fifthLineChanging.innerHTML = returnString;
        break;
      case 4:
        fourthLineChanging.innerHTML = returnString;
        break;
      case 3:
        thirdLineChanging.innerHTML = returnString;
        break;
      case 2:
        secondLineChanging.innerHTML = returnString;
        break;
      case 1:
        firstLineChanging.innerHTML = returnString;
        break;
    }
  }


// end of functions


//
// main script
//


// cast <btn>, i.e. start of script

castBtn.addEventListener('click', function() {

    //declare initial hexagram values, update changing line list to hold changing line data
    const initialHexagramList = castHexagram();


    //declare changing line values, variables are booleans. true = changing line. default is false
    const changingLineList = [oldLine6, oldLine5, oldLine4, oldLine3, oldLine2, oldLine1];


    // find initial hexagram number
    const initialHexagramNum = findHexagramNum(initialHexagramList);


    // construct new hexagram (final hexagram) list
    const newHexagramList = findHexagramResult(initialHexagramList, changingLineList);


    // find final hexagram number
    const newHexagramNum = findHexagramNum(newHexagramList);


    // data object file paths
    const initialEndPoint = `data/hexagram${initialHexagramNum}.json`
    const finalEndPoint = `data/hexagram${newHexagramNum}.json`
    
    
    // grab final title, judgment, image, and place it in elements

    fetch (finalEndPoint)
        .then ((response) => responseCheck(response))
        .then ((data) => {
            getTitle(data, true);
            getJudgment(data, true);
            getImage(data, true);

        })
        .catch((error) => errorCatcher(error))
    ;


    // grab initial title, judgment, image, and place it in elements

    fetch (initialEndPoint)
        .then ((response) => responseCheck(response))
        .then ((data) => {
            getTitle(data, false);
            getJudgment(data, false);
            getImage(data, false);

        })
        .catch((error) => errorCatcher(error))
    ;

    // grab changing line data, output it to elements with outputChangingLines()

    fetch(initialEndPoint)
    .then((response) => responseCheck(response))
    .then((data) => {
        for (const num of changingNumList) {
            outputChangingLine(data, num);
        }
    })
    .catch((error) => errorCatcher(error));


    //display final hexagram
    displayNewHexagram(newHexagramList);

    //fill title elements
    initialHexagramNumEle.innerHTML = `${initialHexagramNum}`;
    finalHexagramNum.innerHTML = `${newHexagramNum}`;



    // show initial hexagram lines, as well as elements in preCast
    initialSixth.style.display = 'block';
    initialFifth.style.display = 'block';
    initialFourth.style.display = 'block'; 
    initialThird.style.display = 'block'; 
    initialSecond.style.display = 'block'; 
    initialFirst.style.display = 'block';
    preCast.style.display = 'block';



    // check for unchanging hexagram, if unchanging, update <h> tag to say as such
    if (initialHexagramNum != newHexagramNum) {
        changingLines.style.display = 'block';
        finalHexagram.style.display = 'block';
    }

    else {
        initialHexagramTitleText.innerHTML = `Unchanging Hexagram: #${initialHexagramNum}`;
    }


    //hide previously used elements, output question input to <h> tag.
    questionHeader.style.display = 'none';
    questionInput.style.display = 'none';
    questionOutput.innerHTML = questionInput.value;


    //empty string check for question, if no question, hide question tag
    const testQuestion = questionInput.value;
    if (testQuestion) {
        questionOutput.style.display = 'block';
    }

    // display play again button (a tag, reloads page), hide cast button
    againBtn.style.display = 'block';
    castBtn.style.display = 'none';
})

;