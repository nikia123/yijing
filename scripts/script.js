//Nikia Shaw - May 2023
// JSON Credit to:
// https://github.com/RandyBoBandy92/ReactIChing/tree/master/ichingreact/src/DekorneText/hexagramJSONS
// quesiton HTML variable elements
var questionNotEscaped = document.getElementById('question');
var question = questionNotEscaped.innerText;
var questionHeader = document.getElementById('question-header');
var questionInput = document.getElementById('question');
var questionOutput = document.getElementById('question-output');
// initial hexagram HTML variables
var initialSixth = document.getElementById('line6-initial');
var initialFifth = document.getElementById('line5-initial');
var initialFourth = document.getElementById('line4-initial');
var initialThird = document.getElementById('line3-initial');
var initialSecond = document.getElementById('line2-initial');
var initialFirst = document.getElementById('line1-initial');
// title/overview text elements
var initialHexagramTitleText = document.getElementById('hexagram-initial-heading');
var initialHexagramNumEle = document.getElementById('initial-hexagram-num');
var initialHexagramTitle = document.getElementById('initial-hexagram-title');
var initialJudgment = document.getElementById('initial-judgment');
var initialImage = document.getElementById('image-text');
var preCast = document.getElementById('pre-cast');
// changing Line text elements
// <p> parent tags and line info in spans
var sixthLineChanging = document.getElementById('sixth-line');
var fifthLineChanging = document.getElementById('fifth-line');
var fourthLineChanging = document.getElementById('fourth-line');
var thirdLineChanging = document.getElementById('third-line');
var secondLineChanging = document.getElementById('second-line');
var firstLineChanging = document.getElementById('first-line');
var changingLines = document.getElementById('changing-lines');
// span tags, json data inserted into
var sixthParentTag = document.getElementById('sixth-line-parent');
var fifthParentTag = document.getElementById('fifth-line-parent');
var fourthParentTag = document.getElementById('fourth-line-parent');
var thirdParentTag = document.getElementById('third-line-parent');
var secondParentTag = document.getElementById('second-line-parent');
var firstParentTag = document.getElementById('first-line-parent');
// final Hexagram HTML text Variables
var finalHexagramNum = document.getElementById('final-hexagram-num');
var finalHexagramTitle = document.getElementById('final-hexagram-title');
var finalJudgment = document.getElementById('final-judgment');
var finalImage = document.getElementById('final-image');
var finalHexagram = document.getElementById('final-hexagram');
// final Hexagram image elements
var finalSixth = document.getElementById('final-sixth');
var finalFifth = document.getElementById('final-fifth');
var finalFourth = document.getElementById('final-fourth');
var finalThird = document.getElementById('final-third');
var finalSecond = document.getElementById('final-second');
var finalFirst = document.getElementById('final-first');
// button elements and anchors acting as buttons
var startBtn = document.getElementById('start');
var castBtn = document.getElementById('cast');
var againBtn = document.getElementById('again');
// storage variables
// if old line = true, line is changing. default is false. changed in castLine()
// changingNumList is for changing line text fetch function and display functions in the cast <a> button action
var oldLine1 = false;
var oldLine2 = false;
var oldLine3 = false;
var oldLine4 = false;
var oldLine5 = false;
var oldLine6 = false;
var changingNumList = [];
var hexagramArrayData = [
    [true, true, true, true, true, true],
    [false, false, false, false, false, false],
    [false, true, false, false, false, true],
    [true, false, false, false, true, false],
    [false, true, false, true, true, true],
    [true, true, true, false, true, false],
    [false, false, false, false, true, false],
    [false, true, false, false, false, false],
    [true, true, false, true, true, true],
    [true, true, true, false, true, true],
    [false, false, false, true, true, true],
    [true, true, true, false, false, false],
    [true, true, true, true, false, true],
    [true, false, true, true, true, true],
    [false, false, false, true, false, false],
    [false, false, true, false, false, false],
    [false, true, true, false, false, true],
    [true, false, false, true, true, false],
    [false, false, false, false, true, true],
    [true, true, false, false, false, false],
    [true, false, true, false, false, true],
    [true, false, false, true, false, true],
    [true, false, false, false, false, false],
    [false, false, false, false, false, true],
    [true, true, true, false, false, true],
    [true, false, false, true, true, true],
    [true, false, false, false, false, true],
    [false, true, true, true, true, false],
    [false, true, false, false, true, false],
    [true, false, true, true, false, true],
    [false, true, true, true, false, false],
    [false, false, true, true, true, false],
    [true, true, true, true, false, false],
    [false, false, true, true, true, true],
    [true, false, true, false, false, false],
    [false, false, false, true, false, true],
    [true, true, false, true, false, true],
    [true, false, true, false, true, true],
    [false, true, false, true, false, false],
    [false, false, true, false, true, false],
    [true, false, false, false, true, true],
    [true, true, false, false, false, true],
    [false, true, true, true, true, true],
    [true, true, true, true, true, false],
    [false, true, true, false, false, false],
    [false, false, false, true, true, false],
    [false, true, true, false, true, false],
    [false, true, false, true, true, false],
    [false, true, true, true, false, true],
    [true, false, true, true, true, false],
    [false, false, true, false, false, true],
    [true, false, false, true, false, false],
    [true, true, false, true, false, false],
    [false, false, true, false, true, true],
    [false, false, true, true, false, true],
    [true, false, true, true, false, false],
    [true, true, false, true, true, false],
    [false, true, true, false, true, true],
    [true, true, false, false, true, false],
    [false, true, false, false, true, true],
    [true, true, false, false, true, true],
    [false, false, true, true, false, false],
    [false, true, false, true, false, true],
    [true, false, true, false, true, false]
];
//
// functions
//
// cast single line function, returns true if yang, false if yin
// switch/case statements are present for changing lines, using global variables oldLine# to track
// line number is pushed to changingNumList[] for json object path construction in getChangingLine()
function castLine(lineNum) {
    var coin1 = Math.floor(Math.random() * 2);
    var coin2 = Math.floor(Math.random() * 2);
    var coin3 = Math.floor(Math.random() * 2);
    var castedLineCount = coin1 + coin2 + coin3;
    if (castedLineCount == 0) {
        switch (lineNum) {
            case 6:
                oldLine6 = true;
                changingNumList.push(6);
                break;
            case 5:
                oldLine5 = true;
                changingNumList.push(5);
                break;
            case 4:
                oldLine4 = true;
                changingNumList.push(4);
                break;
            case 3:
                oldLine3 = true;
                changingNumList.push(3);
                break;
            case 2:
                oldLine2 = true;
                changingNumList.push(2);
                break;
            case 1:
                oldLine1 = true;
                changingNumList.push(1);
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
        switch (lineNum) {
            case 6:
                oldLine6 = true;
                changingNumList.push(6);
                break;
            case 5:
                oldLine5 = true;
                changingNumList.push(5);
                break;
            case 4:
                oldLine4 = true;
                changingNumList.push(4);
                break;
            case 3:
                oldLine3 = true;
                changingNumList.push(3);
                break;
            case 2:
                oldLine2 = true;
                changingNumList.push(2);
                break;
            case 1:
                oldLine1 = true;
                changingNumList.push(1);
                break;
        }
        return true;
    }
}
// image string path constructor for lines, used in castHexagram()
function displayLineImage(bool) {
    if (bool) {
        return 'images/yang.png';
    }
    else {
        return 'images/yin.png';
    }
}
// image string path constructor for changing lines, used in findHexagramResult()
function displayChangingLines(bool) {
    if (bool) {
        return 'images/old-yang.png';
    }
    else {
        return 'images/old-yin.png';
    }
}
// cast all six lines function. displayLineImage() takes boolean value to return img path. 
function castHexagram() {
    var line6 = castLine(6);
    initialSixth.src = displayLineImage(line6);
    var line5 = castLine(5);
    initialFifth.src = displayLineImage(line5);
    var line4 = castLine(4);
    initialFourth.src = displayLineImage(line4);
    var line3 = castLine(3);
    initialThird.src = displayLineImage(line3);
    var line2 = castLine(2);
    initialSecond.src = displayLineImage(line2);
    var line1 = castLine(1);
    initialFirst.src = displayLineImage(line1);
    var newHexagram = [line6, line5, line4, line3, line2, line1];
    return newHexagram;
}
// find hexagram number function
// takes array as argument and returns hexagram number by comparing initialhexagramList[j] to data in hexagramArrayData[i][j], if counter reaches max value, returns index and adds 1 for positional consideration
function findHexagramNum(hexagramList) {
    var lineCounter = 0;
    for (var i in hexagramArrayData) {
        lineCounter = 0;
        for (var j in hexagramArrayData[i]) {
            if (hexagramList[j] == hexagramArrayData[i][j]) {
                lineCounter++;
                if (lineCounter == 6) {
                    var hexagramNum = (parseInt(i) + 1);
                    return hexagramNum;
                }
            }
        }
    }
}
// resulting hexagram function, display initial hexagram changing images, display changing line text tags (<p> & <span>), and generates newHexagram[] for return. takes in initialHexagramList[](filled with initial hexagram values) and changingLineList[](filled with changing line values). places base value of initial hexagram if the same position in the changing list is false, flips the value into the new list if the changing list value is true 
function findHexagramResult(initialHexagramList, changingLineList) {
    var newHexagram = [];
    for (var i in changingLineList) {
        if (changingLineList[i]) {
            newHexagram[i] = (!initialHexagramList[i]);
            switch (i) {
                case '0':
                    initialSixth.src = displayChangingLines(initialHexagramList[i]);
                    sixthLineChanging.style.display = 'block';
                    sixthParentTag.style.display = 'block';
                    break;
                case '1':
                    initialFifth.src = displayChangingLines(initialHexagramList[i]);
                    fifthLineChanging.style.display = 'block';
                    fifthParentTag.style.display = 'block';
                    break;
                case '2':
                    initialFourth.src = displayChangingLines(initialHexagramList[i]);
                    fourthLineChanging.style.display = 'block';
                    fourthParentTag.style.display = 'block';
                    break;
                case '3':
                    initialThird.src = displayChangingLines(initialHexagramList[i]);
                    thirdLineChanging.style.display = 'block';
                    thirdParentTag.style.display = 'block';
                    break;
                case '4':
                    initialSecond.src = displayChangingLines(initialHexagramList[i]);
                    secondLineChanging.style.display = 'block';
                    secondParentTag.style.display = 'block';
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
    for (var i in list) {
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
    var title = data.title;
    if (!bool) {
        initialHexagramTitle.innerHTML = title;
    }
    else {
        finalHexagramTitle.innerHTML = title;
    }
}
// get Judgment data and place it in elements
function getJudgment(data, bool) {
    var returnString = '';
    var judgmentObject = data.Judgment;
    Object.keys(judgmentObject).forEach(function (key) {
        returnString = returnString + "<p>".concat(key, ":<br>  ").concat(judgmentObject[key], " </p>");
    });
    if (!bool) {
        initialJudgment.innerHTML = returnString;
    }
    else {
        finalJudgment.innerHTML = returnString;
    }
}
// get image function, takes in a data object, as well as a boolean value to discren if image text is for the intial or final hexagram, then displays text.
function getImage(data, bool) {
    var returnString = '';
    var imageObject = data.Image;
    Object.keys(imageObject).forEach(function (key) {
        returnString = returnString + "<p>".concat(key, ":<br>  ").concat(imageObject[key], " </p>");
    });
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
    questionOutput.innerHTML = "".concat(error);
}
// output changing line function. takes in data object as well as the changing line number, displays text in element from obj
function outputChangingLine(data, line) {
    var returnString = '';
    var lineObject = data["line_".concat(line)];
    if (typeof lineObject === 'object') {
        for (var property in lineObject) {
            returnString = returnString + "<p>".concat(property, ":<br>  ").concat(lineObject[property], " </p>");
        }
    }
    else {
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
castBtn.addEventListener('click', function () {
    //declare initial hexagram values, update changing line list to hold changing line data
    var initialHexagramList = castHexagram();
    //declare changing line values, variables are booleans. true = changing line. default is false
    var changingLineList = [oldLine6, oldLine5, oldLine4, oldLine3, oldLine2, oldLine1];
    // find initial hexagram number
    var initialHexagramNum = findHexagramNum(initialHexagramList);
    // construct new hexagram (final hexagram) list
    var newHexagramList = findHexagramResult(initialHexagramList, changingLineList);
    // find final hexagram number
    var newHexagramNum = findHexagramNum(newHexagramList);
    // data object file paths
    var initialEndPoint = "data/hexagram".concat(initialHexagramNum, ".json");
    var finalEndPoint = "data/hexagram".concat(newHexagramNum, ".json");
    // grab final title, judgment, image, and place it in elements
    fetch(finalEndPoint)
        .then(function (response) { return responseCheck(response); })
        .then(function (data) {
        getTitle(data, true);
        getJudgment(data, true);
        getImage(data, true);
    })
        .catch(function (error) { return errorCatcher(error); });
    // grab initial title, judgment, image, and place it in elements
    fetch(initialEndPoint)
        .then(function (response) { return responseCheck(response); })
        .then(function (data) {
        getTitle(data, false);
        getJudgment(data, false);
        getImage(data, false);
    })
        .catch(function (error) { return errorCatcher(error); });
    // grab changing line data, output it to elements with outputChangingLines()
    fetch(initialEndPoint)
        .then(function (response) { return responseCheck(response); })
        .then(function (data) {
        for (var _i = 0, changingNumList_1 = changingNumList; _i < changingNumList_1.length; _i++) {
            var num = changingNumList_1[_i];
            outputChangingLine(data, num);
        }
    })
        .catch(function (error) { return errorCatcher(error); });
    //display final hexagram
    displayNewHexagram(newHexagramList);
    //fill title elements
    initialHexagramNumEle.innerHTML = "".concat(initialHexagramNum);
    finalHexagramNum.innerHTML = "".concat(newHexagramNum);
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
        initialHexagramTitleText.innerHTML = "Unchanging Hexagram: #".concat(initialHexagramNum);
    }
    //hide previously used elements, output question input to <h> tag.
    questionHeader.style.display = 'none';
    questionInput.style.display = 'none';
    questionOutput.innerHTML = questionInput.value;
    //empty string check for question, if no question, hide question tag
    var testQuestion = questionInput.value;
    if (testQuestion) {
        questionOutput.style.display = 'block';
    }
    // display play again button (a tag, reloads page), hide cast button
    againBtn.style.display = 'block';
    castBtn.style.display = 'none';
});
