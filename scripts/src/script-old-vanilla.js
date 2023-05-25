// Nikia Shaw - February 2023

// JSON Credit to:
// https://github.com/RandyBoBandy92/ReactIChing/tree/master/ichingreact/src/DekorneText/hexagramJSONS


// quesiton HTML variable elements
const question = document.getElementById('question');
const questionHeader = document.getElementById('question-header');
const questionInput = document.getElementById('question');
const questionOutput = document.getElementById('question-output');

// initial hexagram HTML variables
const initialSixth = document.getElementById('line6-initial');
const initialFifth = document.getElementById('line5-initial');
const initialFourth = document.getElementById('line4-initial');
const initialThird = document.getElementById('line3-initial');
const initialSecond = document.getElementById('line2-initial');
const initialFirst = document.getElementById('line1-initial');


// title/overview text elements
const initialHexagramTitleText = document.getElementById('hexagram-initial-title')
const initialHexagramNumEle = document.getElementById('initial-hexagram-num');
const initialHexagramTitle = document.getElementById('initial-hexagram-title');
const initialJudgment = document.getElementById('initial-judgment');
const initialImage = document.getElementById('image-text');
const preCast = document.getElementById('pre-cast');



// changing Line text elements
// <p> parent tags and line info in spans
const sixthLineChanging = document.getElementById('sixth-line');
const fifthLineChanging = document.getElementById('fifth-line');
const fourthLineChanging = document.getElementById('fourth-line');
const thirdLineChanging = document.getElementById('third-line');
const secondLineChanging = document.getElementById('second-line');
const firstLineChanging = document.getElementById('first-line');
const changingLines = document.getElementById('changing-lines');

// span tags, json data inserted into
const sixthParentTag = document.getElementById('sixth-line-parent');
const fifthParentTag = document.getElementById('fifth-line-parent');
const fourthParentTag = document.getElementById('fourth-line-parent');
const thirdParentTag = document.getElementById('third-line-parent');
const secondParentTag = document.getElementById('second-line-parent');
const firstParentTag = document.getElementById('first-line-parent');




// final Hexagram HTML text Variables
const finalHexagramNum = document.getElementById('final-hexagram-num');
const finalHexagramTitle = document.getElementById('final-hexagram-title');
const finalJudgment = document.getElementById('final-judgment');
const finalImage = document.getElementById('final-image');
const finalHexagram = document.getElementById('final-hexagram');

// final Hexagram image elements
const finalSixth = document.getElementById('final-sixth');
const finalFifth = document.getElementById('final-fifth');
const finalFourth = document.getElementById('final-fourth');
const finalThird = document.getElementById('final-third');
const finalSecond = document.getElementById('final-second');
const finalFirst = document.getElementById('final-first');



// button elements
const startBtn = document.getElementById('start');
const castBtn = document.getElementById('cast');
const againBtn = document.getElementById('again');


// storage variables
// if old line = true, line is changing. default is false. changed in castLine()
// changingNumList is for changing line text fetch function and display functions in the cast <a> button action

let oldLine1 = false;
let oldLine2 = false;
let oldLine3 = false;
let oldLine4 = false;
let oldLine5 = false;
let oldLine6 = false;
let changingNumList = [];


// base hexagram array data:

// array order is based on hexagram number, Arr[0] = hexagram 1, Arr[1] = hexagram 2, etc
// line 6 = Arr[x][0], line 1 [x][6]
// true = yang, false = yin

// used for list constructions and comparisons for changing lines

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







//
// functions
//



// cast single line function, returns true if yang, false if yin
// switch/case statements are present for changing lines, using global variables oldLine# to track
// line number is pushed to changingNumList[] for json object path construction in getChangingLine()

function castLine(lineNum) {
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

function displayLineImage(bool) {
    if (bool) {
        return 'images/yang.png'
    }
    else {
        return 'images/yin.png'
    }
}


// image string path constructor for changing lines, used in findHexagramResult()

function displayChangingLines(bool) {
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

    newHexagram = [line6, line5, line4, line3, line2, line1];
    return newHexagram;
}


// find hexagram number function
// takes array as argument and returns hexagram number by comparing initialhexagramList[j] to data in hexagramArrayData[i][j], if counter reaches max value, returns index and adds 1 for positional consideration

function findHexagramNum(hexagramList) {
    let hexagramNum = Number;
    let lineCounter = 0;

    for (let i in hexagramArrayData) {
        lineCounter = 0;
        for (let j in hexagramArrayData[i]){
            if (hexagramList[j] == hexagramArrayData[i][j]) {
                lineCounter ++;
                if (lineCounter == 6) {
                    hexagramNum = (parseInt(i)) + 1;
                    return hexagramNum;
                }
            }
        }
    }
}



// resulting hexagram function, display initial hexagram changing images, display changing line text tags (<p> & <span>), and generates newHexagram[] for return. takes in initialHexagramList[](filled with initial hexagram values) and changingLineList[](filled with changing line values). places base value of initial hexagram if the same position in the changing list is false, flips the value into the new list if the changing list value is true 

function findHexagramResult(initialHexagramList, changingLineList) {
    
    let newHexagram = [];
    

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

function displayNewHexagram(list) {
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

function getTitle(data, bool) {
    const title = data.title

    if (!bool){
        initialHexagramTitle.innerHTML = title;
    }
    else {
        finalHexagramTitle.innerHTML = title;
    }
}



// get Judgment data and place it in elements

function getJudgment(data, bool) {
    let returnString = '';
    let judgmentObject = data.Judgment;

    for (let property in judgmentObject){
        returnString = returnString + `<p>${property}:<br>  ${judgmentObject[property]} </p>`
    }
    
    if (!bool) {
        initialJudgment.innerHTML = returnString;
    }
    else {
        finalJudgment.innerHTML = returnString;
    }

}

// get image function, takes in a data object, as well as a boolean value to discren if image text is for the intial or final hexagram, then displays text.

function getImage(data, bool) {
    let returnString = '';
    let imageObject = data.Image;

    for (let property in imageObject) {
        returnString = returnString + `<p>${property}:<br>  ${imageObject[property]} </p>`
    }

    if (!bool) {
        initialImage.innerHTML = returnString;
    }
    else {
        finalImage.innerHTML = returnString;
    }

}




// .then response check function for data object url, if not ok, throw error

function responseCheck(response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error('An error occured, please try again');
}


// .catch error function for above response function
function errorCatcher(error) {
    questionOutput.innerHTML = `${error}`
}




// output changing line function. takes in data object as well as the changing line number, displays text in element from obj

function outputChangingLine(data, line) {
    let returnString = '';
    let lineObject = data[`line_${line}`]

    for (let property in lineObject) {
        returnString = returnString + `<p>${property}:<br>  ${lineObject[property]} </p>`
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




    //promissory functions
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

    async function getChangingLineData() {
        const response = await fetch (initialEndPoint);
    
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message)
        }
    
        const data = await response.json();
    
        for (const i in changingNumList) {
            outputChangingLine(data, changingNumList[i])
        }
        
    
    }
    
    // call function defined above with catch
    getChangingLineData().catch((error) => errorCatcher(error))






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