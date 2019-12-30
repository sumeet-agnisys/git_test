/*************************************************************************param view start*********************************************************************/
const REG_DIV_CONTAINER = "regdivcontainer";
const PARAM_DIV_CONTAINER = "param_main";
const PARAM_CONTAINER = "paramcontainer";
const SEQ_DIV_CONTAINER = "seqdivcontainer";
const SPREAD_DIV_CONTAINER = "idsexcelcontainer";
const REGHISTORY = "reghistory";
const PARAMHISTORY = "paramhistory";
const SEQHISTORY = "seqhistory";
const SPREADHISTORY = "spreadhistory";
const FILE_ID = "data-file-id";
const DIV_HISTORY = "divhistory";
const HISTORY_SIZE = 50;
const REGHIST = "reghist";
const PAMHIST = "pamhist";
const SEQHIST = "seqhist";
const SPREHIST = "sprehist";
const encrypt1 = "$#&&#";
const encrypt2 = "#$&&$";
const REG_META_DATA = "reg_meta_data";



var regHistoryArraay = [];
var regHistoryArr = [];
var regHistoryIndex = 0;
var paramHistoryArr = [];
var paramHistoryIndex = 0;
var seqHistoryArr = [];
var seqHistoryIndex = 0;
var spreadHistoryArr = [];
var spreadHistoryIndex = 0;
var isundofirsttimeclicked = true;

//var bodyArr = {};
//var index = 0;
var testob = [];
var testcounter = 0;
var histJson = {};
histJson.data = new Array();

function addIntoHistory() {
    /*
     try {
     $('#regmenu').css({'display': 'none'});
     $('.param_menu').css({'display': 'none'});
     $('#seqmenu').css({'display': 'none'});
     } catch (e) {
     }
     */
    if (isRegViewOn()) {
        if (regHistoryArraay[regHistoryIndex - 1] !== document.getElementById(REG_DIV_CONTAINER).innerHTML) {
            var dochis = document.cloneNode(true);
            $(dochis).find("#regmenu").css({'display': 'none'});
            
            try{
                $(dochis).find("#table_context_menu").css({'display': 'none'});
            }catch(e){}
            
            regHistoryArraay[regHistoryIndex] = $(dochis).find("#" + REG_DIV_CONTAINER).html();
            regHistoryIndex++;
        }
    } else if (isParamViewOn()) {
        if (paramHistoryArr[paramHistoryIndex - 1] !== document.getElementById(PARAM_DIV_CONTAINER).innerHTML) {
            var dochis = document.cloneNode(true);
            $(dochis).find(".param_menu").css({'display': 'none'});
            paramHistoryArr[paramHistoryIndex] = $(dochis).find("#" + PARAM_DIV_CONTAINER).html();
            paramHistoryIndex++;
        }
    } else if (isSeqViewOn()) {
        if (seqHistoryArr[seqHistoryIndex - 1] !== document.getElementById(SEQ_DIV_CONTAINER).innerHTML) {
            seqHistoryArr[seqHistoryIndex] = document.getElementById(SEQ_DIV_CONTAINER).innerHTML;
            seqHistoryIndex++;
        }
    } else if (isSpreadViewOn()) {
        if (spreadHistoryArr[spreadHistoryIndex - 1] !== document.getElementById(SPREAD_DIV_CONTAINER).innerHTML) {
            var dochis = document.cloneNode(true);
            $(dochis).find("#seqmenu").css({'display': 'none'});
            spreadHistoryArr[spreadHistoryIndex] = $(dochis).find("#" + SPREAD_DIV_CONTAINER).html();
            spreadHistoryIndex++;
        }
    }

}

function getFileID() {
    var file_id;
    try {
        file_id = document.getElementsByTagName("body")[0].getAttribute(FILE_ID);
        if (!file_id || file_id === null) {
            file_id = Math.random();
            document.getElementsByTagName("body")[0].setAttribute(FILE_ID, file_id);
        }
    } catch (e) {
        file_id = Math.random();
    }
    return file_id;
}

function getRegHistoryID() {
    try {
        return REGHISTORY + getFileID();
    } catch (e) {
        return REGHISTORY;
    }
}

function getParamHistoryID() {
    try {
        return PARAMHISTORY + getFileID();
    } catch (e) {
        return PARAMHISTORY;
    }
}

function getSeqHistoryID() {
    try {
        return SEQHISTORY + getFileID();
    } catch (e) {
        return SEQHISTORY;
    }
}

function getSpreadHistoryID() {
    try {
        return SPREADHISTORY + getFileID();
    } catch (e) {
        return SPREADHISTORY;
    }
}

function clearLocalStorage() {
    /*    localStorage.removeItem(getRegHistoryID());
     localStorage.removeItem(getParamHistoryID());
     localStorage.removeItem(getSeqHistoryID());
     localStorage.removeItem(getSpreadHistoryID());
     */
}

//@FXML
function undo() {
    if (isRegViewOn()) {
        if (typeof (regHistoryArraay[regHistoryIndex - 1]) !== 'undefined' && regHistoryArraay[regHistoryIndex - 1] !== null) {
            regHistoryIndex--;
            document.getElementById(REG_DIV_CONTAINER).innerHTML = regHistoryArraay[regHistoryIndex];
        }
    } else if (isParamViewOn()) {
        if (typeof (paramHistoryArr[paramHistoryIndex - 1]) !== 'undefined' && paramHistoryArr[paramHistoryIndex - 1] !== null) {
            paramHistoryIndex--;
            document.getElementById(PARAM_DIV_CONTAINER).innerHTML = paramHistoryArr[paramHistoryIndex];
        }
    } else if (isSeqViewOn()) {
        if (typeof (seqHistoryArr[seqHistoryIndex - 1]) !== 'undefined' && seqHistoryArr[seqHistoryIndex - 1] !== null) {
            seqHistoryIndex--;
            document.getElementById(SEQ_DIV_CONTAINER).innerHTML = seqHistoryArr[seqHistoryIndex];
        }
    } else if (isSpreadViewOn()) {
        if (typeof (spreadHistoryArr[spreadHistoryIndex - 1]) !== 'undefined' && spreadHistoryArr[spreadHistoryIndex - 1] !== null) {
            spreadHistoryIndex--;
            document.getElementById(SPREAD_DIV_CONTAINER).innerHTML = spreadHistoryArr[spreadHistoryIndex];
        }
    }
    updatelostEvents();
    return false;
}

function getHistory() {
    try {

        var reghis = document.getElementsByClassName(REGHIST);//document.querySelector('#' + DIV_HISTORY + ' .reghist'); //document.getElementsByClass("reghist")[0].getElementsByTagName("p");
        if (reghis !== null) {
            for (var i = 0; i < reghis.length; i++) {
                regHistoryArraay[i] = decryptHtml(reghis[i].innerText);
            }
            regHistoryIndex = regHistoryArraay.length;
            isundofirsttimeclicked = false;
        }

        var paramhis = document.getElementsByClassName(PAMHIST);// document.querySelector('#' + DIV_HISTORY + '.paramhist');
        if (paramhis !== null) {
            for (var i = 0; i < paramhis.length; i++) {
                paramHistoryArr[i] = decryptHtml(paramhis[i].innerText);
            }
            paramHistoryIndex = paramHistoryArr.length;
            isundofirsttimeclicked = false;
        }

        var seqhis = document.getElementsByClassName(SEQHIST);// document.querySelector('#' + DIV_HISTORY + '.paramhist');
        if (seqhis !== null) {
            for (var i = 0; i < seqhis.length; i++) {
                seqHistoryArr[i] = decryptHtml(seqhis[i].innerText);
            }
            seqHistoryIndex = seqHistoryArr.length;
            isundofirsttimeclicked = false;
        }

        var seqhis = document.getElementsByClassName(SEQHIST);// document.querySelector('#' + DIV_HISTORY + '.paramhist');
        if (seqhis !== null) {
            for (var i = 0; i < seqhis.length; i++) {
                seqHistoryArr[i] = decryptHtml(seqhis[i].innerText);
            }
            seqHistoryIndex = seqHistoryArr.length;
            isundofirsttimeclicked = false;
        }

        try {
            var ele = document.getElementById(DIV_HISTORY);
            ele.parentNode.removeChild(ele);
            clickController.savefile();
        } catch (e) {
        }

    } catch (e) {
    }
}

function setHistory() {
    try {
        //set history tag
        var divhist = document.getElementById(DIV_HISTORY);
        if (divhist === null) {
            var abstract = document.getElementById("abstract");
            if (abstract) {
            } else {
                alert("--create new abs : " + abstract);
                abstract = document.createElement("div");
                abstract.setAttribute("id", "abstract");
                document.getElementsByClassName("maindiv")[0].appendChild(abstract);
            }
            divhist = $("#abstract").append("<div id=" + DIV_HISTORY + "></div>");
            divhist = document.getElementById(DIV_HISTORY);
        }
        $(divhist).html("");
        var regtag = document.createElement("div");
        regtag.setAttribute("class", "reghistory");

        var paramtag = document.createElement("div");
        paramtag.setAttribute("class", "paramhist");

        var seqtag = document.createElement("div");
        seqtag.setAttribute("class", "seqhistory");

        var spreadtag = document.createElement("div");
        spreadtag.setAttribute("class", "spreadhistory");


        //set reg history
        for (var i = 0; i < regHistoryArraay.length; i++) {
            var ptag = document.createElement("div");
            ptag.setAttribute("class", REGHIST);
            ptag.innerHTML = encryptHtml(regHistoryArraay[i]);
            regtag.appendChild(ptag);
        }
        divhist.appendChild(regtag);
        //alert("--reghist len : " + divhist.innerHTML);
        //set param history
        for (var i = 0; i < paramHistoryArr.length; i++) {
            var ptag = document.createElement("div");
            ptag.setAttribute("class", PAMHIST);
            ptag.innerHTML = encryptHtml(paramHistoryArr[i]);
            paramtag.appendChild(ptag);
        }
        divhist.appendChild(paramtag);

        for (var i = 0; i < seqHistoryArr.length; i++) {
            var ptag = document.createElement("div");
            ptag.setAttribute("class", SEQHIST);
            ptag.innerHTML = encryptHtml(seqHistoryArr[i]);
            seqtag.appendChild(ptag);
        }
        divhist.appendChild(seqtag);

        for (var i = 0; i < spreadHistoryArr.length; i++) {
            var ptag = document.createElement("div");
            ptag.setAttribute("class", SPREHIST);
            ptag.innerHTML = encryptHtml(spreadHistoryArr[i]);
            spreadtag.appendChild(ptag);
        }
        divhist.appendChild(spreadtag);


    } catch (e) {
        alert("err sethistory : " + e.message);
    }
}

function encryptHtml(str) {
    try {
        str = str.replace(/</g, '$#&&#');
        return str;
        //str = str.replace(/>/g, encrypt2);
        //return str.replace(/</g, encrypt1).replace(/>/g, encrypt2);
    } catch (e) {
    }
}
function decryptHtml(str) {
    try {
        str = str.replace(/\$#&&#/g, '<');
        return str;
        //str = str.replace(/encrypt2/g, ">");
        //return str.replace(/encrypt1/g, "<").replace(/encrypt2/g, ">");
    } catch (e) {
    }
}

function redo() {
    if (isRegViewOn()) {
        if (typeof (regHistoryArraay[regHistoryIndex + 1]) !== 'undefined' && regHistoryArraay[regHistoryIndex + 1] !== null) {
            regHistoryIndex++;
            document.getElementById(REG_DIV_CONTAINER).innerHTML = regHistoryArraay[regHistoryIndex];
        }
    } else if (isParamViewOn()) {
        if (typeof (paramHistoryArr[paramHistoryIndex + 1]) !== 'undefined' && paramHistoryArr[paramHistoryIndex + 1] !== null) {
            paramHistoryIndex++;
            document.getElementById(PARAM_DIV_CONTAINER).innerHTML = paramHistoryArr[paramHistoryIndex];
        }
    } else if (isSeqViewOn()) {
        if (typeof (seqHistoryArr[seqHistoryIndex + 1]) !== 'undefined' && seqHistoryArr[seqHistoryIndex + 1] !== null) {
            seqHistoryIndex++;
            document.getElementById(SEQ_DIV_CONTAINER).innerHTML = seqHistoryArr[seqHistoryIndex];
        }
    } else if (isSpreadViewOn()) {
        if (typeof (spreadHistoryArr[spreadHistoryIndex + 1]) !== 'undefined' && spreadHistoryArr[spreadHistoryIndex + 1] !== null) {
            spreadHistoryIndex++;
            document.getElementById(SPREAD_DIV_CONTAINER).innerHTML = spreadHistoryArr[spreadHistoryIndex];
        }
    }

    /*
     if (typeof (bodyArr[index + 1]) !== 'undefined' && bodyArr[index + 1] !== null) {
     index++;
     document.body.innerHTML = bodyArr[index];
     }
     */
    updatelostEvents();
    return false;
}

function saveHistoryToServer() {
    var regjson = regHistoryArr;//JSON.parse(JSON.stringify(regHistoryArr));
    var paramjson = paramHistoryArr;// JSON.parse(JSON.stringify(paramHistoryArr));
    var seqjson = seqHistoryArr;//JSON.parse(JSON.stringify(seqHistoryArr));
    var spreadjson = spreadHistoryArr;//JSON.parse(JSON.stringify(spreadHistoryArr));

    var num = [regHistoryIndex, paramHistoryIndex, seqHistoryIndex, spreadHistoryIndex];
    var maxindex = num.sort()[3];
    alert("maxindex : " + maxindex + " " + num);
    for (var i = 0; i < maxindex; i++) {
        clickController.saveHistoryToServer(regjson, paramjson, seqjson, spreadjson);
    }
}

function restoreHistoryFromServer(_regHistoryArr, _paramHistoryArr, _seqHistoryArr, _spreadHistoryArr) {
    try {
        alert("call resotry history--- : " + _regHistoryArr);
        if (typeof (_regHistoryArr) !== 'undefined' && _regHistoryArr !== null) {
            regHistoryArr[regHistoryIndex] = _regHistoryArr;
            regHistoryIndex++;
        }
        if (typeof (_paramHistoryArr) !== 'undefined' && _paramHistoryArr !== null) {
            paramHistoryArr[paramHistoryIndex] = _paramHistoryArr;
            paramHistoryIndex++;
        }
        if (typeof (_seqHistoryArr) !== 'undefined' && _seqHistoryArr !== null) {
            seqHistoryArr[seqHistoryIndex] = _seqHistoryArr;
            seqHistoryIndex++;
        }
        if (typeof (_spreadHistoryArr) !== 'undefined' && _spreadHistoryArr !== null) {
            spreadHistoryArr[spreadHistoryIndex] = _spreadHistoryArr;
            spreadHistoryIndex++;
        }

        alert("history bind done");
    } catch (e) {
        alert('Err (restoreHistory) : ' + e.message);
    }
}

function isRegViewOn() {
    if (document.getElementById(REG_DIV_CONTAINER).style.display === "block") {
        return true;
    }
    return false;
}

function isParamViewOn() {
    if (document.getElementById(PARAM_DIV_CONTAINER).style.display === "block") {
        return true;
    }
    return false;
}

function isSeqViewOn() {
    if (document.getElementById(SEQ_DIV_CONTAINER).style.display === "block") {
        return true;
    }
    return false;
}

function isSpreadViewOn() {
    if (document.getElementById(SPREAD_DIV_CONTAINER).style.display === "block") {
        return true;
    }
    return false;
}

var regsource;
function initilizeParamEvents() {

    /* Events fired on the drag target */
    /*    document.getElementById("paramcontainer").addEventListener("dragstart", function (event) {*/

    $(document).on("dragstart", "#paramcontainer", function () {
        addIntoHistory();
        /* The dataTransfer.setData() method sets the data type and the value of the dragged data*/
        event.dataTransfer.setData("Text", event.target.id); /* Output some text when starting to drag the p element					document.getElementById("demo").innerHTML = "Started to drag the p element.";*/ /* Change the opacity of the draggable element*/
        event.target.style.opacity = "0.4"; /*event.target.style.backgroundColor="transparent";*/ /*console.log("drag target="+event.target.id);*/
        /*
         try {
         document.getElementById("scroller").style = "display:block";
         } catch (e) {
         }
         */
    }); /* While dragging the p element, change the color of the output text				this event fire when drag starts.				event.target have source element object*/
    /*document.getElementById("paramcontainer").addEventListener("drag", function (event) { */
    $(document).on("drag", "#paramcontainer", function () {
        /*document.getElementById("demo").style.color = "red";*/
        event.target.parentElement.style.backgroundColor = "white";
        regsource = event; /*console.log("source index="+regsource.target.parentElement.cellIndex);*/
    });

    /* Output some text when finished dragging the p element and reset the opacity*/
    /*    document.getElementById("paramcontainer").addEventListener("dragend", function (event) { */
    $(document).on("dragend", "#paramcontainer", function () {
        /*document.getElementById("demo").innerHTML = "Finished dragging the p element.";*/
        event.target.style.opacity = "1";
        addIntoHistory();
    });

    /* Events fired on the drop target */ /* When the draggable p element enters the droptarget, change the DIVS's border style*/
    /*    document.getElementById("paramcontainer").addEventListener("dragenter", function (event) {*/
    $(document).on("dragenter", "#paramcontainer", function () {
        if (event.target.className === "droptarget") {
            event.target.style.border = "2px solid red";
        }
    });

    /* By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element*/
    /*    document.getElementById("param_main").addEventListener("dragover", function (event) {*/
    $(document).on("dragover", "#param_main", function () {
        event.preventDefault();
        if (event.target.id === "scr_down") {
            window.scrollBy(0, 20);
        } else if (event.target.id === "scr_up") {
            window.scrollBy(0, -20);
        }
    });

    /* When the draggable p element leaves the droptarget, reset the DIVS's border style*/
    /*    document.getElementById("paramcontainer").addEventListener("dragleave", function (event) {*/
    $(document).on("dragleave", "#paramcontainer", function () {
        if (event.target.className === "droptarget") {
            event.target.style.border = "";
        }
    });

    /* On drop - Prevent the browser default handling of the data (default is open as link on drop)   Reset the color of the output text and DIV's border color   Get the dragged data with the dataTransfer.getData() method   The dragged data is the id of the dragged element ("drag1")   Append the dragged element into the drop element*/
    /*    document.getElementById("paramcontainer").addEventListener("drop", function (event) {*/
    $(document).on("drop", "#paramcontainer", function () {
        event.preventDefault();
        try {
            document.getElementById("scroller").style = "display:none";
        } catch (e) {
        }
        if (event.target.className === "droptarget") {
            try {
                var vali = validateCell(event);
                if (vali) {
                    console.log("Warning : Space is full");
                    event.target.style.border = "";
                    regsource.target.style.backgroundColor = "#d4e0e2";
                } else { /*document.getElementById("demo").style.color = "";*/
                    var parent_source = regsource.target.closest("tr");
                    event.target.style.border = ""; /*var data = event.dataTransfer.getData("Text");*/
                    var data = event.dataTransfer.getData("Text");
                    event.target.appendChild(document.getElementById(data));
                    event.target.style.backgroundColor = "#d4e0e2";
                    var cellindex = event.target.cellIndex;
                    var data2 = parseInt(regsource.target.getAttribute("data-size"));
                    var range = data2 + cellindex;
                    event.target.closest("tr").cells[cellindex].colSpan = data2;
                    var temp;
                    var reversecell = 0;
                    for (i = cellindex + 1; i < range; i++) {
                        temp = event.target.closest("tr").cells[cellindex + 1];
                        if ((typeof (temp) === "undefined" || temp === null)) {
                            reversecell++;
                            temp = event.target.closest("tr").cells[cellindex - reversecell].innerHTML.trim();
                            if (temp === '') {
                                event.target.closest("tr").cells[cellindex - reversecell].remove();
                            }
                        } else {
                            temp = temp.innerHTML.trim();
                            if (temp === "") {
                                event.target.closest("tr").cells[cellindex + 1].remove();
                            } else {
                                reversecell++;
                                temp = event.target.closest("tr").cells[cellindex - reversecell + 1].getElementsByTagName("p")[0];
                                if ((typeof (temp) !== "undefined" || temp !== null)) {
                                    var iiid = temp.id;
                                    if (iiid === regsource.target.id) {
                                        var j;
                                        var delindex = cellindex - reversecell;
                                        var counter = 0;
                                        for (j = i; j < range; j++) {
                                            event.target.closest("tr").cells[delindex - counter].remove();
                                            counter++;
                                        }
                                        break;
                                    }
                                } /*										temp=event.target.closest("tr").cells[cellindex-reversecell].innerHTML.trim();										console.log("--reverseTtemp="+temp+"--index="+(cellindex-reversecell));										console.log("--reverseTtemp="+temp+"--index="+event.target.closest("tr").cells[cellindex-reversecell+1].innerHTML.trim());										console.log("--reverseTtemp="+temp+"--index="+event.target.closest("tr").cells[cellindex-reversecell-2].innerHTML.trim());*/
                                if (temp === '') {
                                    event.target.closest("tr").cells[cellindex - reversecell].remove();
                                }
                            }
                        } /*								if((typeof(temp) === "undefined" || temp === null)||((typeof(temp) === "undefined" || temp === null)&&																					 temp==='')){									event.target.closest("tr").cells[cellindex+1].remove();cell index remain same after deletion, hence it is fixed index deletion								}								else if(temp!==''){									reversecell++;									temp=event.target.closest("tr").cells[cellindex-reversecell].innerHTML.trim();									if(temp==''){										event.target.closest("tr").cells[cellindex-reversecell].remove();									}								}								*/
                    }

                    updateBits(parent_source);
                }
            } catch (ex) {
                console.log("Error dop event : " + ex.message);
            }
        } else {
            regsource.target.style.backgroundColor = "#d4e0e2";
        }
    });
}
function validateCell(src) {
    var cellindex = src.target.cellIndex;

    var target = regsource.target;
    /*
     if (target.classList.contains("droptarget")) {
     target = target.getElementsByTagName("p")[0];
     }
     */
    var d = target.getAttribute("data-size");
    var data = parseInt(d);
    var range = data + cellindex;
    console.log("--cellindex=" + cellindex);
    console.log("--data=" + data);
    console.log("--range=" + range);
    var i;
    var innerele;
    var isEleFound = false;
    var srcId = regsource.target.id;
    var descId;
    var para = null;
    var currcell = null;
    var iteratedcell = 0;
    var iscellavail = false;
    var iteratebackword = false; /*find if cell is availble or not */
    for (i = cellindex; i < range; i++) {
        if (!iteratebackword) {
            currcell = src.target.closest("tr").cells[i];
            if ((typeof (currcell) === "undefined" || currcell === null)) {
                console.log("cell not exist");
                iscellavail = false;
            } else {
                if (currcell.innerHTML.trim() != "") {
                    descId = currcell.getElementsByTagName("p")[0];
                    if ((typeof (descId) !== "undefined" && descId !== null)) {
                        if (descId.id === srcId) {
                            iscellavail = true;
                            break;
                        } else {
                            iscellavail = false;
                            iteratebackword = true;
                        }
                    } else {
                        iscellavail = false;
                        iteratebackword = true;
                    }
                } else {
                    iscellavail = true;
                }
            }
        }
        if (!iscellavail || iteratebackword) {
            iteratedcell++;
            var previndex = cellindex - iteratedcell; /*now look prev cell for availbility*/
            console.log("--index=" + previndex);
            currcell = src.target.closest("tr").cells[previndex];
            console.log("--i=" + i + "--currcell=" + currcell);
            if ((typeof (currcell) === "undefined" || currcell === null)) {
                console.log("cell not exist");
                iscellavail = false;
                break;
            } else {
                console.log("--class exist=" + currcell.classList.contains("droptarget"));
                if (!currcell.classList.contains("droptarget")) {
                    iscellavail = false;
                    break;
                }
                if (currcell.innerHTML.trim() !== "") {
                    descId = currcell.getElementsByTagName("p")[0];
                    if ((typeof (descId) !== "undefined" || descId !== null)) {
                        if (descId.id === srcId) {
                            iscellavail = true;
                            break;
                        } else {
                            iscellavail = false;
                            break;
                        }
                    } else {
                        iscellavail = false;
                        break;
                    }
                } else {
                    iscellavail = true;
                }
            }
        } /*					if((typeof(currcell) === "undefined" || currcell === null)||((typeof(currcell) !== "undefined" ||																				  currcell !== null)&&(currcell.innerHTML.trim()!=="")||(currcell.getElementsByTagName("p")[0].id!==srcId))){						iteratedcell++;						var previndex=cellindex-iteratedcell;						console.log("--previndex="+previndex);						currcell=src.target.closest("tr").cells[previndex];																							}					if((typeof(currcell) === "undefined" || currcell === null)||((typeof(currcell) !== "undefined" ||																				  currcell !== null)&&(currcell.innerHTML.trim()!=="")||(currcell.getElementsByTagName("p")[0].id!==srcId))){						isEleFound=true;					}*/ /*					(typeof(currcell) === "undefined" || currcell === null){					else{						iteratedcell++;						var previndex=cellindex-iteratedcell;						console.log("--previndex="+previndex);						currcell=src.target.closest("tr").cells[previndex];											}					if(typeof(currcell) !== "undefined" && currcell !== null){						innerele=currcell.innerHTML.trim();					}					console.log("innerele==="+innerele);*/ /*					try{						console.log("currcell="+currcell.getElementsByTagName("p")[0]);						descId=currcell.getElementsByTagName("p")[0].id;						console.log("descId="+descId);					}					catch(ex){}					console.log("-descID="+descId);					if(innerele!==''&&descId!==srcId){						isEleFound=true;					}					*/
    }
    if (iscellavail) {
        isEleFound = false;
    } else {
        isEleFound = true;
    }
    console.log("--isEleFound=" + isEleFound); /*if cell is availble to insert, then organise new and old cell*/
    if (!isEleFound) {
        if (data > 1) { /*in target, merge cell if needed*/
            try { /*re arrange cell after vacant space*/
                var oldcellindex = regsource.target.parentElement.cellIndex;
                console.log("--oldcellindex=" + oldcellindex);
                console.log("--data=" + data);
                for (i = oldcellindex + 1; i < (data + oldcellindex); i++) {
                    var cell = regsource.target.closest("tr").insertCell(i);
                    cell.setAttribute('class', 'droptarget');
                }
                regsource.target.parentElement.colSpan = 0; /*							src.target.closest("tr").cells[cellindex].colSpan=data;							for(i=cellindex+1;i<range;i++){								console.log("--deleted cell="+i);								src.target.closest("tr").cells[cellindex+1].remove();							}*/
            } catch (ex) {
                console.log("Error (validateCell) : " + ex.message);
            }
        }
    }
    return isEleFound;
}

/*************************************************************************param view end***********************************************************************/







var showProp = "Compact View On";
var hideProp = "Compact View Off";
var showDesc = "Show Desc";
var hideDesc = "Hide Desc";
var curr_row;
var curr_row_signal;
var query = "";
var random_Num;
var isTabFocus = false;
var tabToolbar;
var clipboard_tab = null;
var tempTable;
var isrowselected = false;
var curr_row_obj = null;
var isFileSaved = true;
var DESC_CLS_OBJ_LIST = [];
var ids_json;
var clickedEl = null;
var selected_rows = [];
var alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var scrollpos = 0;

var diff_index = -1;

$(document).ready(function () {
    bindJSONObj();
    ids_json = JSON.parse(idsobjects);

    $(document).on('change', '#maindivcontainer', function () {
        console.log("--call changs");
    });

    $('#aReloadseq').on('click', function () {
        refreashpage();
    });

    $('#aReloadReg').on('click', function () {
        refreashpage();
    });

    $('body').not("#autocomplete-list").click(function () {
        hideHints();
        //$('#autocomplete-list').hide();
    });

    $('body').on('focusin', '.desc', function () {
        var isobfound = false;
        for (var ob in DESC_CLS_OBJ_LIST) {
            if (DESC_CLS_OBJ_LIST[ob] === this) {
                isobfound = true;
                break;
            }
        }
        if (!isobfound) {
            DESC_CLS_OBJ_LIST.push(this);
            autocomplete(this, idsprop);
        }
    });

    $('body').on('focusin', '.propclass', function () {
        var isobfound = false;
        for (var ob in DESC_CLS_OBJ_LIST) {
            if (DESC_CLS_OBJ_LIST[ob] === this) {
                isobfound = true;
                break;
            }
        }
        if (!isobfound) {
            DESC_CLS_OBJ_LIST.push(this);
            autocomplete(this, idsprop);
        }
    });

    $('body').on('focusin', '.sw', function () {
        var isobfound = false;
        for (var ob in DESC_CLS_OBJ_LIST) {
            if (DESC_CLS_OBJ_LIST[ob] === this) {
                isobfound = true;
                break;
            }
        }
        if (!isobfound) {
            DESC_CLS_OBJ_LIST.push(this);
            autocomplete(this, ids_sw_access);
        }
    });

    $('body').on('focusout', '.sw', function () {
        hideHints();
    });

    $('body').on('focusin', '.hw', function () {
        var isobfound = false;
        for (var ob in DESC_CLS_OBJ_LIST) {
            if (DESC_CLS_OBJ_LIST[ob] === this) {
                isobfound = true;
                break;
            }
        }
        if (!isobfound) {
            DESC_CLS_OBJ_LIST.push(this);
            autocomplete(this, ids_hw_access);
        }
    });
    $('body').on('focusout', '.hw', function () {
        hideHints();
    });


    $(document).on('focusin', '.cmdname', function () {
        var isobfound = false;
        for (var ob in DESC_CLS_OBJ_LIST) {
            if (DESC_CLS_OBJ_LIST[ob] === this) {
                isobfound = true;
                break;
            }
        }
        if (!isobfound) {
            DESC_CLS_OBJ_LIST.push(this);
            autocomplete(this, ids_command_hints);
        }
    });
    $(document).on('focusout', '.cmdname', function () {
        hideHints();
    });
    /*evt.keyCode==80&&evt.altKey*/

    $('.fieldname').keyup(function () {
        var value = $(this).val();
        if (value !== "") {
            if (!/^[a-zA-Z][a-z0-9._\-]*$/.test(value)) {
                console.log("Error not valid");
                return false;
            }
        }
    });

    $('.descInput').keyup(function () {
        auto_grow(this);
    });

    $('.propInput').keyup(function () {
        auto_grow(this);
    });

    try {
        document.getElementById("idsexcelcontainer").addEventListener("click", function (event) {
            $('#excelmenu').css({'display': 'none'});
        });

        $('#idsexcelcontainer').on('click', 'td', function () {
            initilizeCursorPosForSpread($(this));
        });
    } catch (e) {
    }

    try {
        $(document).on("click", "#regdivcontainer", function () {
            $('#regmenu').css({'display': 'none'});
            $('.idsmenu').css({'display': 'none'});
        });
    } catch (e) {
    }


    $(document).on("click", "#seqdivcontainer", function () {
        $('#seqmenu').css({'display': 'none'});
    });

    document.getElementById("spreadsheetcontainer").addEventListener("mousedown", function (event) {
        //right click
        if (event.button === 2) {
            clickedEl = event.target;
        }
    }, true);


    $("#menucopy").hover(function () {
        var x = event.pageX;
        var spreadwidth = $("#spreadsheetcontainer").width();
        if ((spreadwidth - x) < 100) {
            $("#submenucopy").css("left", "-100%");
        } else {
            $("#submenucopy").css("left", "100%");
        }

        $("#submenucopy").css("display", "block");
    }, function () {
        $("#submenucopy").css("display", "none");
    });

    $("#menudeleteexcel").hover(function (event) {
        var x = event.pageX;
        var spreadwidth = $("#spreadsheetcontainer").width();
        if ((spreadwidth - x) < 100) {
            $("#submenudelete").css("left", "-100%");
        } else {
            $("#submenudelete").css("left", "100%");
        }
        $("#submenudelete").css("display", "block");
    }, function () {
        $("#submenudelete").css("display", "none");
    });

    $(".submenu").hover(function () {
        $(this).css("display", "block");
    }, function () {
        $(this).css("display", "none");
    });

    document.getElementById("backhidder").addEventListener("click", function () {
        hidetemplate();
    });

    try {
        document.getElementById("spreadsheetcontainer").getElementsByClassName("exeltable")[0].addEventListener("keydown", function (e) {            //spreadsheetKeyEventHandler()
            reCalculate(e);
            rePosition();
        });
    } catch (e) {
    }


    initilizeParamEvents();

    /* scroll up and down in param view event
     document.getElementById("scr_up").addEventListener("click", function (e) {
     window.scrollBy(0, -20);
     });
     document.getElementById("scr_down").addEventListener("click", function (e) {
     window.scrollBy(0, 20);
     });
     */

    /*addcontextmenu();*/

    /*reg menu work*/
    var current_reg;
    var temp_current_reg;
    $(document).on("mouseover", ".regcontainer", function () {
        openlockicon(this, document.getElementById("param_menu_lock_reg").getElementsByTagName("i")[0]);
        var pos = $(this).position();
        var y = pos.top - 12;
        var x = pos.left + 15;
        $('#param_reg_menu').css({'display': 'block', 'left': x, 'top': y});
        $(this).css("border", "1px solid red");
        temp_current_reg = this;
    });

    $(document).on("mouseout", ".regcontainer", function () {
        $("#param_reg_menu").css("display", "none");
        $(this).css("border", "1px solid grey");
    });

    $(document).on("mouseover", "#param_reg_menu", function () {
        $('#param_reg_menu').css({'display': 'block'});
    });
    $(document).on("mouseout", "#param_reg_menu", function () {
        $("#param_reg_menu").css("display", "none");
    });

    try {
        $(document).on("click", "#param_menu_lock_reg", function () {
            click_lock_reg(temp_current_reg, document.getElementById("param_menu_lock_reg").getElementsByTagName("i")[0]);
        });
    } catch (e) {
    }


    /*work for empty cell*/
    var current_field;
    var open_current_field;
    $(document).on("mouseover", ".droptarget", function () {
        if ($(this).hasClass("disbtd")) {
            return false;
        }
        var pos = $(this).position();
        var y = pos.top - 18;
        var x = pos.left;
        $('#param_cell_menu').css({'display': 'block', 'left': x, 'top': y});
        $(this).css("border", "1px solid red");
        current_field = this;
    });

    $(document).on("mouseout", ".droptarget", function () {
        $("#param_cell_menu").css("display", "none");
        $(this).css("border", "1px solid grey");
    });

    $(document).on("mouseover", "#param_cell_menu", function () {
        $('#param_cell_menu').css({'display': 'block'});
    });
    $(document).on("mouseout", "#param_cell_menu", function () {
        $("#param_cell_menu").css("display", "none");
    });

    /*work for param cell*/
    var temp_target_cell;
    var target_cell;
    $(document).on("mouseover", ".dragtarget", function (event) {
        openlockicon(this, document.getElementById("param_menu_lock_param").getElementsByTagName("i")[0]);
        var pos = $(this).position();
        var y = pos.top - 12;
        var x = pos.left - 50;
        $('#param_field_toolbar').css({'display': 'block', 'left': x, 'top': y});
        temp_target_cell = this;
        event.preventDefault();
        return false;
    });

    $(document).on("mouseout", ".dragtarget", function (event) {
        $("#param_field_toolbar").css("display", "none");
        event.preventDefault();
        return false;
    });

    $(document).on("mouseover", "#param_field_toolbar", function () {
        $("#param_field_toolbar").css("display", "block");
    });

    $(document).on("mouseout", "#param_field_toolbar", function () {
        $('#param_field_toolbar').css({'display': 'none'});
    });

    try {
        $(document).on("click", "#param_menu_lock_param", function () {
            click_lock_reg(temp_target_cell, document.getElementById("param_menu_lock_param").getElementsByTagName("i")[0]);
            return false;
        });
    } catch (e) {
    }

    /*open popup menu to edit into field (param)*/
    $(document).on("click", "#param_field_toolbar_edit", function () {
        var pos = $(this).position();
        var ya = event.pageX;
        var xa = event.pageY;
        $('#param_field_edit_menu').css({'display': 'block', 'left': ya, 'top': xa + 30});
        $("#param_cell_add").css("display", "none");
        $("#param_create_reg").css("display", "none");
        $("#param_edit_reg").css("display", "none");

        target_cell = temp_target_cell;
        editparam(target_cell);
        return false;
    });

    $(document).on("click", "#param_field_edit_menu_close", function () {
        $('#param_field_edit_menu').css({'display': 'none'});
    });

    $(document).on("click", "#param_field_edit_menu_update", function () {
        var isupdate = updateparam_param(target_cell);
        if (isupdate) {
            $('#param_field_edit_menu').css({'display': 'none'});
        }
    });

    /*delete field(param)*/
    $(document).on("click", "#param_field_toolbar_delete", function () {
        deleteparam(temp_target_cell);
        return false;
    });

    /*copy param*/
    $(document).on("click", "#param_field_toolbar_cp", function () {
        copyparam(temp_target_cell);
        return false;
    });

    /*cut param*/
    $(document).on("click", "#param_field_toolbar_cut", function () {
        cutparam(temp_target_cell);
        return false;
    });

    /*event call to paste field(param)*/
    $(document).on("click", "#editparamcellpaste", function () {
        pasteparam(current_field);
        return false;
    });


    /*open popup box to add new register*/
    $(document).on("click", "#addparamreg", function () {
        var x = event.pageX;
        var y = event.pageY + 25;
        current_reg = temp_current_reg;
        $('#param_create_reg').css({'display': 'block', 'left': x, 'top': y});
        $('#param_field_edit_menu').css({'display': 'none'});
        $("#param_cell_add").css("display", "none");
        $("#param_edit_reg").css("display", "none");
        return false;
    });

    $(document).on("click", "#btnparamregclose", function () {
        $("#param_create_reg").css("display", "none");
    });

    $(document).on("click", "#btnparamregclose", function () {
        $("#param_create_reg").css("display", "none");
    });

    $(document).on("click", "#btnparamregcreate", function () {
        createparamreg(current_reg);
    });

    /*delete register*/
    $(document).on("click", "#deleteparamreg", function () {
        current_reg = temp_current_reg;
        deleteparamreg(current_reg);
        return false;
    });

    /*open popup to edit register*/
    $(document).on("click", "#editparamreg", function () {
        var x = event.pageX;
        var y = event.pageY + 25;
        $("#param_edit_reg").css({'display': 'block', 'left': x, 'top': y});


        $("#param_cell_add").css({'display': 'none'});
        $('#param_field_edit_menu').css({'display': 'none'});
        $("#param_create_reg").css("display", "none");


        current_reg = temp_current_reg;
        addparamreg(current_reg);
        return false;
    });

    $(document).on("click", "#btnparamregeditclose", function () {
        $("#param_edit_reg").css("display", "none");
        $('#param_field_edit_menu').css({'display': 'none'});
        $("#param_cell_add").css("display", "none");
        $("#param_create_reg").css("display", "none");
    });

    /*update register*/
    $(document).on("click", "#btnparamregeditupdate", function () {
        updateparam(current_reg);
    });



    /*open popup to add new field(param)*/
    $(document).on("click", "#addparamcelladd", function () {
        var x = event.pageX;
        var y = event.pageY + 25;

        $("#param_cell_add").css({'display': 'block', 'left': x, 'top': y});
        $('#param_field_edit_menu').css({'display': 'none'});
        $("#param_create_reg").css("display", "none");
        $("#param_edit_reg").css("display", "none");

        open_current_field = current_field;
        openaddfieldmenu(open_current_field);
        return false;
    });

    $(document).on("click", "#param_cell_add_close", function () {
        $("#param_cell_add").css("display", "none");
    });

    /*add new field (param)*/
    $(document).on("click", "#param_cell_add_add", function () {

        var is = addparamfield(open_current_field);
        if (is) {
            $("#param_cell_add").css("display", "none");
        }
    });

    $(document).on("click", "#maindivcontainer", function () {
        /*hideallparampopupmenu();*/
    });

    try {
        //navigation arrow event on field class
        $(document).on("keydown", ".field", function (e) {
            switch (e.keyCode) {
                case 38:
                    scrollFieldCells(e, false);
                    break;
                case 40:
                    scrollFieldCells(e, true);
                    break;
            }
        });
    } catch (e) {
    }

    try {
        //navigation arrow event on field class
        $(document).on("keydown", ".sig_row", function (e) {
            switch (e.keyCode) {
                case 38:
                    scrollFieldCells(e, false);
                    break;
                case 40:
                    scrollFieldCells(e, true);
                    break;
            }
        });
    } catch (e) {
    }

    var diff_counter = 0;
    try {
        $(".diff").each(function () {
            if (this.tagName === 'TR' || this.tagName === 'TBODY') {

            } else {
                var line = $(this).attr("data-line");
                $(this).append("<a data-aline='" + line + "' class='diffnavi' name=\"gotodiff" + diff_counter + "\"></a>");
                diff_counter++;
            }
        });
        $("#btnprev").on("click", function (e) {
            try {
                if (diff_index > -1) {
                    diff_index--;
                    naviDiff(diff_index, e);
                }
            } catch (e) {
            }
            return false;
        });
        $("#btnnext").on("click", function (e) {
            try {
                var len = $(".diffnavi").length;
                if (diff_index < len - 1) {
                    diff_index++;
                    naviDiff(diff_index, e);
                }
            } catch (e) {
            }
            return false;
        });
    } catch (e) {
    }

    try {
        $(".aSearchCase").on("click", function () {
            setSearchOptions(this);
        });
    } catch (e) {
    }

    try {
        //set param_main div container event
        $("#" + PARAM_CONTAINER).on("click", function () {
            try {
                //to highlight search in param view, it has to be editable. so we are making it editable true and when click on paramdiv, make editable false
                if (document.getElementById(PARAM_DIV_CONTAINER).style.display === 'block') {
                    document.getElementById(PARAM_CONTAINER).setAttribute("contenteditable", "false");
                    var ptags = document.getElementById(PARAM_CONTAINER).getElementsByTagName("p");
                    for (var i = 0; i < ptags.length; i++) {
                        ptags[i].setAttribute("draggable", "true");
                    }
                }
            } catch (e) {
            }
        });
    } catch (e) {
    }

    try {
        var btns = document.getElementsByClassName("ace_replacebtn");
        var isdisabled = false;
        if (document.getElementById(PARAM_DIV_CONTAINER).style.display === 'block') {
            isdisabled = true;
        }
        for (var i = 0; i < btns.length; i++) {
            btns[i].disabled = isdisabled;
        }
    } catch (e) {
    }

    dragElement(document.getElementById("param_field_edit_menu"));
    dragElement(document.getElementById("param_edit_reg"));
    dragElement(document.getElementById("param_cell_add"));
    dragElement(document.getElementById("param_create_reg"));

    //loadDefaultHis();
    /*
     try {
     $("#ace_search_find").click(function () {
     document.getElementById("ace_search_find").removeAttribute("readonly");
     });
     $("#ace_search_replace").click(function () {
     document.getElementById("ace_search_replace").removeAttribute("readonly");
     });
     } catch (e) {
     }
     */
    try {
        $(document).on("click", "#param_create_reg", function () {
            console.log("keypress menu");
        });

    } catch (e) {

    }

    try {
        $(document).on("click", ".param_update_input_diff", function () {
            var res = paramUpdate(this.parentNode, this.checked);
            if (res) {
                if (this.checked) {
                    $(this).attr('checked', 'checked');
                } else {
                    $(this).removeAttr('checked');
                }
            }
            return res;
        });

    } catch (e) {

    }

    //$(".param_update_input_diff").prop('checked', true);
//    try {
//        $(".minmax").click(function () {
//
//            $(this).toggleClass('fa-expand');
//            if (this.classList.contains('fa-expand')) {
//                this.setAttribute("title", "Collapse Diff Viewer");
//            } else {
//                this.setAttribute("title", "Expand Diff Viewer");
//            }
//            $("#div_param_diff_container").slideToggle();
//            $(".maindiv").toggleClass('minmainDiv');
//
//        });
//    } catch (ex) {
//
//    }


    try {
        $(document).on("click", ".param_update_select_all", function () {
            param_update_selectAll_click(this);
        });

    } catch (e) {

    }

    try {


        $("body").on('DOMSubtreeModified', "#" + PARAM_CONTAINER, function () {
            try {
                clickController.setUnsaveSymbolJS();
            } catch (e) {
            }
        });


    } catch (e) {
    }

    getHistory();

    addIntoHistory();

    setscollpos();

    //alert("refresh page");
//var sequrl="192.168.100.176:8000";
    var sequrl = "127.0.0.1:8000";
    $(document).on("focusout", ".seqin", function () {
        var data = $(this).html();
        if (data == "")
        {
        } else {
            var seq = $(this);
            var url = "http://" + sequrl + "/generate/";
            $.ajax({
                type: "GET",
                url: url,
                data: {sentence: data},
                success: function (data1) {
                    // console.log(data1.time_taken);
                    //  $("#output").html(data1.Translation);
                    //$(this).closest(".seqout").html(data1.Translation);
                    $(seq).prev("td.seqout").html(data1.translation);

                },
                error: function (data1) {
                    // console.log(data1.responseText);
                },
                //complete:function(data1){
                //console.log(data1);
                //},
            });
        }
        // var textdata = $(this).val();
        // $(this).parent("td").html(textdata);
        //$(this).remove();
    });
    $(".iconRefreshSeq").removeClass("rotate");
    $(document).on("click", ".iconRefreshSeq", function () {
        var refButton = $(this);
        $(this).toggleClass("rotate");
        var data = $(this).html();
        var seq = $(this);
        var url = "http://" + sequrl + "/read_file/";
        //$(refButton).css({'transform': 'rotate(360deg)'});
        try {
            $.ajax({
                type: "GET",
                url: url,
                data: {filepath: clickController.getCurrentFile()},
                success: function (data1) {
                    console.log(data1.message);
                    //  $("#output").html(data1.Translation);
                    //$(this).closest(".seqout").html(data1.Translation);
                    //$(seq).prev("td.seqout").html(data1.Translation);
                    if (data1.message == "SUCCESS") {
                        refButton.removeClass("rotate");
                    } else {
                        refButton.removeClass("rotate");
                    }
                    $(refButton).css({'transform': 'rotate(360deg)'});
                },
                error: function (data1) {
                    //sconsole.log(data1.responseText);
                    refButton.removeClass("rotate");
                    $(refButton).css({'transform': 'rotate(360deg)'});
                },
                //complete:function(data1){
                //console.log(data1);
                //},
            });
        } catch (e) {
            refButton.removeClass("rotate");
            $(refButton).css({'transform': 'rotate(360deg)'});
        }
    }
    );

    try {
        $(document).on("contextmenu", ".custom_table td", function (event) {
            open_table_context_menu(event);
            current_custom_cell = event.target;
            return false;
        });
    } catch (e) {

    }

});

var current_custom_cell;
function insertTable(col, row, height, width) {
    var str = "";
    var rowstr = "";
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            rowstr = rowstr + "<td></td>";
        }
        rowstr = "<tr>" + rowstr + "</tr>";
    }
    str = "<table style='width:" + width + ";height:" + height + ";' class='custom_table'>" + rowstr + "</table>";
    insertElementToCurrentPos(str);
    addIntoHistory();
}

function open_table_context_menu(event) {
    event.preventDefault();
    var x = event.pageX;
    var y = event.pageY;
    createCustomContextMenuIsNotExist();
    var table_context_menu = document.getElementById("table_context_menu");
    $(table_context_menu).css({'display': 'block', 'left': x, 'top': y});
    curr_row_obj = event.target.parentNode;
    event.preventDefault();
    return false;
}

function createCustomContextMenuIsNotExist() {
    var table_context_menu = document.getElementById("table_context_menu");
    if (!table_context_menu) {
        var reg_meta_data = document.getElementById(REG_META_DATA);
        if (!reg_meta_data) {
            reg_meta_data = createElementFromHTML("<div id='" + REG_META_DATA + "'></div>");
            $("#" + REG_DIV_CONTAINER).append(reg_meta_data);
        }
        table_context_menu = "<div id='table_context_menu' class='idsmenu' style='display:none'>\n\
                             <a onclick='customInsertRow(true);'>insert row below</a><a onclick='customInsertRow(false);'>insert row above</a>\n\
<a onclick='customInsertColumn(true);'>insert column right</a><a onclick='customInsertColumn(false);'>insert column left</a><a onclick='customDeleteRow();'>delete Row</a>\n\
<a onclick='customDeleteColumn();'>delete column</a></div>";
        table_context_menu = createElementFromHTML(table_context_menu);
        $(reg_meta_data).append(table_context_menu);
    }
}

function customDeleteRow() {
    var obj = current_custom_cell;
    if (obj.tagName.toUpperCase() === "TD") {
        var row = obj.parentNode;
        $(row).remove();
        addIntoHistory();
    }
}

function customDeleteColumn() {
    var obj = current_custom_cell;
    if (obj.tagName.toUpperCase() === "TD") {
        var cellIndex = obj.cellIndex;
        var tab = obj.parentNode;

        while (tab.tagName.toUpperCase() !== "TABLE") {
            tab = tab.parentNode;
        }

        var rows = tab.getElementsByTagName("tr");
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName("td");
            for (var j = 0; j < cells.length; j++) {
                if (cells[j].cellIndex === cellIndex) {
                    $(cells[j]).remove();
                    break;
                }
            }
        }
        addIntoHistory();
    }
}

function customInsertRow(isbelow) {
    var obj = current_custom_cell;
    if (obj.tagName.toUpperCase() === "TD") {
        var row = obj.parentNode;
        var new_row = row.cloneNode(true);
        var cells = new_row.getElementsByTagName("td");
        for (var i = 0; i < cells.length; i++) {
            $(cells[i]).text("");
        }
        if (isbelow) {
            row.after(new_row);
        } else {
            row.parentNode.insertBefore(new_row, row);
        }
        addIntoHistory();
    }
}

function customInsertColumn(isRight) {
    var obj = current_custom_cell;
    if (obj.tagName.toUpperCase() === "TD") {
        var cellIndex = obj.cellIndex;
        var tab = obj.parentNode;

        while (tab.tagName.toUpperCase() !== "TABLE") {
            tab = tab.parentNode;
        }

        var rows = tab.getElementsByTagName("tr");
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName("td");
            for (var j = 0; j < cells.length; j++) {
                if (cells[j].cellIndex === cellIndex) {
                    var new_tab = createElementFromHTML("<table><tr><td></td></tr></table>");
                    var cell = new_tab.getElementsByTagName("td")[0].cloneNode(true);
                    if (isRight) {
                        cells[j].after(cell);
                    } else {
                        cells[j].parentNode.insertBefore(cell, cells[j]);
                    }
                    break;
                }
            }
        }
        addIntoHistory();
    }
}

function getIPLicBlockCount() {
    var blocks = document.getElementsByClassName("block");
    var gpoi_count = 0;
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].getAttribute("data-meta-agni_lib") !== null) {
            gpoi_count++;
        }
    }
    return gpoi_count;
}

function naviDiff(diff_index, e) {
    var goto = $(".diffnavi")[diff_index].getAttribute("name");
    window.location.href = "#" + goto;

    var isSrc = "other";

    try {
        isSrc = e.target.parentNode.getAttribute("data-type");
    } catch (e) {
    }

    callLineNavi($(".diffnavi")[diff_index].getAttribute("data-aline"), false, isSrc);
    window.scrollTo(window.scrollX, window.scrollY - 40);
    setDiffHighlight($(".diffnavi")[diff_index]);
}

function setDiffHighlight(obj) {
    if (document.getElementById("highlighter") !== null) {
        document.getElementById("highlighter").remove();
    }
    $(obj).append("<div id='highlighter' class='highlight'></div>");
}

//@FXML
function callLineNavi(linenum, isnext, type) {
    try {
        clickController.navigatemerge(linenum, isnext, type);
    } catch (e) {
    }
}


function loadDefaultHis() {
    try {
        var tempob = localStorage.getItem(getRegHistoryID());
        if (tempob !== null && tempob !== "") {
            regHistoryArraay = JSON.parse(tempob);
            regHistoryIndex = regHistoryArraay.length;
            isundofirsttimeclicked = false;
            console.log("---prev his1 : " + regHistoryIndex);
        }
        var tempobparam = localStorage.getItem(getParamHistoryID());
        if (tempobparam !== null && tempobparam !== "") {
            paramHistoryArr = JSON.parse(tempobparam);
            isundofirsttimeclicked = false;
            paramHistoryIndex = paramHistoryArr.length;
        }
        console.log("--sqid on load : " + getSeqHistoryID());
        var tempobseq = localStorage.getItem(getSeqHistoryID());
        if (tempobseq !== null && tempobseq !== "") {
            seqHistoryArr = JSON.parse(tempobseq);
            isundofirsttimeclicked = false;
            seqHistoryIndex = seqHistoryArr.length;
        }
        var tempobspread = localStorage.getItem(getSpreadHistoryID());
        if (tempobspread !== null && tempobspread !== "") {
            spreadHistoryArr = JSON.parse(tempobspread);
            isundofirsttimeclicked = false;
            spreadHistoryIndex = spreadHistoryArr.length;
        }
    } catch (e) {
        console.log("err in load def " + e.message);
    }
}

function hideHints() {
    $('#autocomplete-list').hide();
}

function setscollpos() {
    scrollpos = $("#datacenter1").text();

    if (scrollpos.startsWith("spread")) {
        try {
            var pos = parseInt(scrollpos.split(":")[1]);
            $("#spreadsheetcontainer").scrollTop(pos);
        } catch (e) {
            console.log("error setup scroll pos to spread : " + e.message);
        }
    } else {
        if (scrollpos) {
            window.scrollTo(0, scrollpos);
        }
    }
}

function getscrollpos() {
    var scrolly = null;
    try {
        if (document.getElementById("regdivcontainer").style.display === "block") {
            scrolly = "reg:" + window.scrollY;
        } else if (document.getElementById("param_main").style.display === "block") {
            scrolly = "param:" + window.scrollY;
        } else if (document.getElementById("idsexcelcontainer").style.display === "block") {
            scrolly = "spread:" + $("#spreadsheetcontainer").scrollTop();// window.scrollY;
        } else if (document.getElementById("seqdivcontainer").style.display === "block") {
            scrolly = "seq:" + window.scrollY;
        }
    } catch (e) {
        console.log("error getscrollpos : " + e.message);
    }
    return scrolly;
}

function setscrollpos(val) {
    $("body").scrollTop(val);
    scrollpos = val;
}

function setWindowScrollPos(val) {
    var scr = parseInt(val);
    window.scrollTo(0, scr);
    $("body").scrollTop(scr);

    $("#datacenter1").text(scr);

}

function setregdivscrollpos(val) {
    $("body").scrollTop(val);
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}


function openparamregcontextmenu() {
    console.log("--open context for param reg");

}

function maindivcontextcall(event) {
    console.log("--call maindivcontextcall");
    //event.preventDefault();
    return false;
}

function param_maincontextcall() {
    console.log("--call param_maincontextcall");
    //event.preventDefault();
    return false;
}

function paramcontainercontextcall() {
    console.log("--call paramcontainercontextcall");
    //event.preventDefault();
    return false;
}


function create_proj() {
    try {
        clickController.createProj();
    } catch (e) {

    }
}

function open_proj() {
    try {
        clickController.open_proj();
    } catch (e) {

    }
}

function create_ip() {
    try {
        clickController.createIp();
    } catch (e) {

    }
}

function openBrowser(url) {
    try {
        clickController.openBrowser(url);
    } catch (e) {

    }
}

function scrollToTop() {

}


$(document).bind("click", function (event) {
    /*document.getElementById("rmenu").className = "hide";*/
});

function hintlistner(event) {
    if (event.keyCode === 13) {
        var val = document.getElementById("inputhint").value;
        document.getElementById("divhint").closest("td").append(" " + val);
        document.getElementById("divhint").remove();
    }
}

function mouseX(evt) {
    if (evt.pageX) {
        return evt.pageX;
    } else if (evt.clientX) {
        return evt.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
    } else {
        return null;
    }
}

function mouseY(evt) {
    if (evt.pageY) {
        return evt.pageY;
    } else if (evt.clientY) {
        return evt.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);
    } else {
        return null;
    }
}

function insertNewTabRow(evt, obj) {
    if (evt.keyCode === 9) {
        while (obj.tagName.toUpperCase() !== "DIV") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'field');
        row.setAttribute('oncontextmenu', 'openregmenu(event);');
        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', 'bits');
        input = document.createElement("input");
        input.setAttribute('style', 'width:88%');
        var rowdel = document.createElement("a");
        rowdel.innerText = 'x';
        rowdel.setAttribute('title', 'delete this row');
        rowdel.setAttribute('style', 'color:red');
        rowdel.setAttribute('onclick', 'deleteRow(this);');
        cell.appendChild(rowdel);
        cell.appendChild(input);


        cell = row.insertCell(1);
        cell.setAttribute('class', 'fieldname');
        input = document.createElement("input");
        cell.appendChild(input);


        cell = row.insertCell(2);
        cell.setAttribute('class', 'sw thirdCell');
        input = document.createElement("input");
        cell.appendChild(input);


        cell = row.insertCell(3);
        cell.setAttribute('class', 'hw thirdCell');
        input = document.createElement("input");
        cell.appendChild(input);


        cell = row.insertCell(4);
        cell.setAttribute('onkeydown', "insertNewRow(event,this);");
        cell.setAttribute('class', 'default');
        input = document.createElement("input");
        cell.appendChild(input);

    }
    /*add property row*/
    else if (evt.keyCode === 80 && evt.altKey) {
        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }

        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('colspan', '5');
        cell.setAttribute('onkeydown', "insertNewRow(event,this);");
        cell.setAttribute('class', 'propclass');
        console.log('add prop');
        input = document.createElement("textarea");
        input.setAttribute('class', 'propInput');
        cell.appendChild(input);

    }
}


$('.field').click(function () {
    var row_index = $(this).parent().index();
    var col_index = $(this).index();
});

function selectElementContents(el) {
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
}

function selectElementContents2(el) {
    var elemen = document.getElementById(el);
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(elemen);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(elemen);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(elemen);
        range.select();
    }
}


var isrowselected = false;
var prevTab = null;

function mainbodyclick() {
    //addIntoHistory();
}

function tabClick(ele) {
    /*
     if(prevTab!=null){
     $(prevTab).removeAttr('style');
     }
     if(isrowselected){
     isrowselected=false;
     }
     else{
     clsTab=ele.id;
     $(ele).attr('style','box-shadow:rgb(67, 134, 239) 2px 2px 1px');
     
     curr_row_obj=null;
     
     
     prevTab=ele;
     }
     */

}

function setCurrRowSignal(currnRow) {
    curr_row_signal = currnRow.rowIndex;
}


//@FXML
function deleteHtml() {
    addIntoHistory();
    document.execCommand('delete');
}

function setBold() {
    document.execCommand('bold');
}
function setItalic() {
    document.execCommand('italic');
}
function setUnderline() {
    document.execCommand('underline');
}

function setAlignLeft() {
    document.execCommand('justifyLeft');
}

function setAlignRight() {
    document.execCommand('justifyRight');
}
function setAlignCenter() {
    document.execCommand('justifyCenter');
}
function setAlignFull() {
    document.execCommand('justifyFull');
}


function setOrderedList() {
    document.execCommand('insertOrderedList');
}
function setUnOrderedList() {
    document.execCommand('insertUnorderedList');
}

function setStrikeThrough() {
    document.execCommand('strikeThrough');
}
function setSubscript() {
    document.execCommand('subscript');
}
function setSuperscript() {
    document.execCommand('superscript');
}

function setIncreaseSize() {
    document.execCommand('increaseFontSize');
}
function setDecreaseSize() {
    document.execCommand('decreaseFontSize');
}

function setFontName(fontName) {
    document.execCommand("fontName", false, fontName);
}

function setFormatsName(formatsName) {
    document.execCommand("formatBlock", false, formatsName);
}

function setFontSize(fontSize) {
    document.execCommand("fontSize", false, fontSize);
}


function insertHTML(img) {
    var id = "rand" + Math.random();
    img = "<img src=\"" + img + "\" id=" + id + ">";
    if (document.all) {
        var range = document.selection.createRange();
        range.pasteHTML(img);
        range.collapse(false);
        range.select();
    } else {
        document.execCommand("insertHTML", false, img);
    }
    return document.getElementById(id);
}
;

var TRange = null;
function findString(str) {
    if (parseInt(navigator.appVersion) < 4)
        return;
    var strFound;
    if (window.find) {

        /* CODE FOR BROWSERS THAT SUPPORT window.find*/
        strFound = self.find(str);
        if (!strFound) {
            strFound = self.find(str, 0, 1);
            while (self.find(str, 0, 1))
                continue
        } else {
            return true;
        }
    } else if (navigator.appName.indexOf("Microsoft") !== -1) {
        /* EXPLORER-SPECIFIC CODE*/
        if (TRange !== null) {
            TRange.collapse(false);
            strFound = TRange.findText(str);
            if (strFound) {
                TRange.select();
                return true;
            }
        }
        if (TRange === null || strFound === 0) {
            TRange = self.document.body.createTextRange();
            strFound = TRange.findText(str);
            if (strFound) {
                TRange.select();
                return true;
            }
        }
    } else if (navigator.appName === "Opera") {
        return false;
    }
    return false;
}

function findReplaceString(str, newStr) {

    //get active div id
    var active_div;
    if (document.getElementById(REG_DIV_CONTAINER).style.display === 'block') {
        active_div = REG_DIV_CONTAINER;
    } else if (document.getElementById(SEQ_DIV_CONTAINER).style.display === 'block') {
        active_div = SEQ_DIV_CONTAINER;
    } else if (document.getElementById(SPREAD_DIV_CONTAINER).style.display === 'block') {
        active_div = SPREAD_DIV_CONTAINER;
    }

    if (active_div) {
        addIntoHistory();
        /*
         var parentnode = window.getSelection().baseNode.parentNode;
         var isvalid = false;
         if (document.getElementById(active_div).contains(parentnode)) {
         isvalid = true;
         }*/
        isvalid = true;
        while (findString(str)) {
            if (isvalid) {
                var sel = window.getSelection();
                var range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(newStr));
            }
        }

    }
}

function openSearchWindow() {
    document.getElementsByClassName("ace_search")[0].style.display = "block";
    $("#ace_search_find").focus();
}

function openCloseWindow() {
    document.getElementsByClassName("ace_search")[0].style.display = "none";
}

function setSearchOptions(obj) {
    try {
        var casespane = obj.getElementsByTagName("span")[0]; //document.getElementsByTagName();
        if (casespane.classList.contains("checked")) {
            casespane.classList.remove("checked");
        } else {
            casespane.classList.add("checked");
        }
    } catch (e) {
    }
}


function replacestr() {
    var newStr = document.getElementById("ace_search_replace").value;
    if (newStr !== "") {

        var wordwarpNotselected = false;
        try {
            if (!document.getElementById("ace_search_wrap").getElementsByTagName("span")[0].classList.contains("checked")) {
                //add word wrap becouse it find in complete document
                document.getElementById("ace_search_wrap").getElementsByTagName("span")[0].classList.add("checked");
                wordwarpNotselected = true;
            }
        } catch (e) {
        }

        try {
            var isSel = findstr(false);
            if (isSel) {
                var sel = window.getSelection();
                var range = sel.getRangeAt(0);
                var container = range.startContainer;
                if (container.className !== "ace_search_form") { //ignore where element not need to search in
                    addIntoHistory();
                    range.deleteContents();
                    range.insertNode(document.createTextNode(newStr));
                }
            }
        } catch (e) {
        } finally {
            if (wordwarpNotselected) {
                document.getElementById("ace_search_wrap").getElementsByTagName("span")[0].classList.remove("checked");
            }
        }
    }
}

function replacestrAll() {
    var newStr = document.getElementById("ace_search_replace").value;
    if (newStr !== "") {
        var wordwarpNotselected = false;
        try {
            if (!document.getElementById("ace_search_wrap").getElementsByTagName("span")[0].classList.contains("checked")) {
                //add word wrap becouse it find in complete document
                document.getElementById("ace_search_wrap").getElementsByTagName("span")[0].classList.add("checked");
                wordwarpNotselected = true;
            }
        } catch (e) {
        }


        try {
            while (findstr(false)) {
                try {
                    var sel = window.getSelection();
                    var range = sel.getRangeAt(0);
                    var container = range.startContainer;

                    if (container.className === "ace_search_form") { //ignore where element not need to search in
                        break;
                    } else {
                        addIntoHistory();
                        range.deleteContents();
                        range.insertNode(document.createTextNode(newStr));
                    }
                } catch (e) {
                }
            }
        } catch (e) {
        } finally {
            if (wordwarpNotselected) {
                document.getElementById("ace_search_wrap").getElementsByTagName("span")[0].classList.remove("checked");
            }
        }
    }
}


function findstr(isbackward) {

    try {
        //to highlight search in param view, it has to be editable. so we are making it editable true and when click on paramdiv, make editable false
        if (document.getElementById(PARAM_DIV_CONTAINER).style.display === 'block') {
            document.getElementById(PARAM_CONTAINER).setAttribute("contenteditable", "true");
            var ptags = document.getElementById(PARAM_CONTAINER).getElementsByTagName("p");
            for (var i = 0; i < ptags.length; i++) {
                ptags[i].setAttribute("draggable", "false");
            }

        }
    } catch (e) {
    }

    var aString = document.getElementById("ace_search_find").value;
    var aCaseSensitive = false;
    var aBackwards = false;
    var aWrapAround = false;
    var aWholeWord = false;
    var aSearchInFrames = true;
    var aShowDialog = true;

    try {
        if (document.getElementById("ace_search_wrap").getElementsByTagName("span")[0].classList.contains("checked")) {
            aWrapAround = true;
        }
        if (document.getElementById("ace_search_casesensitive").getElementsByTagName("span")[0].classList.contains("checked")) {
            aCaseSensitive = true;
        }
        /*
         if (document.getElementById("ace_search_whole").getElementsByTagName("span")[0].classList.contains("checked")) {
         aWholeWord = true;
         }
         */
        aBackwards = isbackward;
    } catch (e) {
    }

    var result = window.find(aString, aCaseSensitive, aBackwards, aWrapAround,
            aWholeWord, aSearchInFrames, aShowDialog);
    return result;
}

var clsTab = null;


function deleteRow(obj) {
    curr_row_obj = obj;
}




/*@JAVAFX*/
function setTabID() {
    var idsTables = document.getElementsByClassName("idsTemp");
    for (var i = 0; i < idsTables.length; i++)
    {
        random_Num = Math.random();
        /*idsTables[i].setAttribute('id','tab'+i);*/
        idsTables[i].setAttribute('id', 'tab' + i + random_Num);
    }
    var field = document.getElementsByClassName("field");
    for (var i = 0; i < field.length; i++)
    {
        random_Num = Math.random();
        field[i].setAttribute('id', 'tabf' + i + random_Num);
    }
    var edited = document.getElementsByClassName("edited");
    for (var i = 0; i < edited.length; i++)
    {
        random_Num = Math.random();
        edited[i].setAttribute('id', 'tabed' + i + random_Num);
    }
}

/*JAVAFX*/
function setSpreadsheetID() {
    try {
        var idsTables = document.getElementById("spreadsheetcontainer").getElementsByClassName("exeltable")[0].getElementsByTagName("tr");
        for (var i = 0; i < idsTables.length; i++)
        {
            random_Num = Math.random();
            /*idsTables[i].setAttribute('id','tab'+i);*/
            idsTables[i].setAttribute('id', 'tab' + i + random_Num);
        }
    } catch (e) {
    }
}


function getFirstClass(classArry) {
    return classArry.split(' ')[0];
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

var parser = new DOMParser();

function htmlToElements(html) {
    var doc;
    doc = parser.parseFromString(html, "text/html");
    return doc.getElementsByClassName("idsTemp")[0];
    /*
     var template = document.createElement('template');
     template.innerHTML = html;
     return template.childNodes[0];
     */
}

function addstrToCaret(element) {
    return "<br>" + element.outerHTML + "<br>";
}

function getRandomNum() {
    return Math.random().replace(".", "_");
}

function insertSystem() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.system);
    element.id = 'tab_system' + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertBoard() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.board);
    element.id = 'tab_board' + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertElementToCurrentPos(ele) {
    addIntoHistory();
    var element = createElementFromHTML(ele);
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();

}

function insertChip() {
    addIntoHistory();
    random_Num = Math.random();

    var element = htmlToElements(ids_json.chip);
    /*var element=$.parseHTML(ids_json.chip);*/

    element.id = 'tab_chip' + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertBlock() {
    addIntoHistory();
    random_Num = Math.random();

    var element = htmlToElements(ids_json.block);
    element.id = 'tab_block' + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertRegGroup() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.reggroup);
    var endreggroup = htmlToElements(ids_json.endreggroup);
    element.id = 'tab_reggroup' + random_Num;
    endreggroup.id = 'tab_endreggroup' + random_Num;
    query = "<br>" + element.outerHTML + "<br><br><br><br>" + endreggroup.outerHTML + "<br>";
    pasteHtmlAtCaret(query);
    addIntoHistory();
}

function insertReg() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.reg);
    element.id = 'tab_reg' + random_Num;

    var field = element.getElementsByClassName("fields")[0];
    field.id = "tab_fields" + random_Num;
    var f = element.getElementsByClassName("field")[0];
    f.id = "tab_field" + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
    element.focus();
}

function insertReg8() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.reg8);
    element.id = 'tab_reg8' + random_Num;
    var field = element.getElementsByClassName("fields")[0];
    field.id = "tab_fields" + random_Num;
    var f = element.getElementsByClassName("field")[0];
    f.id = "tab_field" + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
    element.focus();
}
function insertReg16() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.reg16);
    element.id = 'tab_reg16' + random_Num;
    var field = element.getElementsByClassName("fields")[0];
    field.id = "tab_fields" + random_Num;
    var f = element.getElementsByClassName("field")[0];
    f.id = "tab_field" + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}
function insertReg32() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.reg32);
    element.id = 'tab_reg32' + random_Num;
    var field = element.getElementsByClassName("fields")[0];
    field.id = "tab_fields" + random_Num;
    var f = element.getElementsByClassName("field")[0];
    f.id = "tab_field" + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}
function insertReg64() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.reg64);
    element.id = 'tab_reg64' + random_Num;
    var field = element.getElementsByClassName("fields")[0];
    field.id = "tab_fields" + random_Num;
    var f = element.getElementsByClassName("field")[0];
    f.id = "tab_field" + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}
function insertReg128() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.reg128);
    element.id = 'tab_reg128' + random_Num;
    var field = element.getElementsByClassName("fields")[0];
    field.id = "tab_fields" + random_Num;
    var f = element.getElementsByClassName("field")[0];
    f.id = "tab_field" + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertRef() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.ref);
    element.id = 'tab_ref' + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertMemory() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.memory);
    element.id = 'tab_memory' + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertEnum() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.enum1);
    element.id = 'tab_enum' + random_Num;
    var enum_row = element.getElementsByClassName("edited")[0];
    enum_row.id = 'enum' + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertGenSeq() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.genSequence);
    element.id = 'tab_seq' + random_Num;
    var step_row = element.getElementsByClassName("edited")[0];
    step_row.id = 'sequence' + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertDefine() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.define);
    element.id = 'tab_define' + random_Num;
    var define_row = element.getElementsByClassName("edited")[0];
    define_row.id = 'def' + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertVariant() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.variant);
    element.id = 'tab_variant' + random_Num;
    var var_row = element.getElementsByClassName("edited")[0];
    var_row.id = 'var' + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertBusDomain() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.busdomain);
    element.id = 'tab_busdomain' + random_Num;
    var bus_row = element.getElementsByClassName("edited")[0];
    bus_row.id = 'bus' + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertSignals(imgPath) {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.signal);
    element.id = 'tab_signal' + random_Num;
    var singal_row = element.getElementsByClassName("edited")[0];
    singal_row.id = 'sig' + random_Num;
    pasteHtmlAtCaret(addstrToCaret(element));
    addIntoHistory();
}

function insertSeq() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.sequence);
    element.id = 'tab_sequence' + random_Num;

    element.getElementsByClassName("seqip")[0].getElementsByClassName("edited")[0].id = "seq_ip_" + random_Num;
    element.getElementsByClassName("seqip")[0].getElementsByClassName("ip")[0].innerHTML = getCurrentDocumentPath();


    var arg = element.getElementsByClassName("arg")[0];
    arg.id = "arg" + random_Num;
    arg.getElementsByClassName("edited")[0].id = "seq_arg" + random_Num;

    var cons = element.getElementsByClassName("const")[0];
    cons.id = "cons" + random_Num;
    cons.getElementsByClassName("edited")[0].id = "seq_const" + random_Num;

    var vari = element.getElementsByClassName("var")[0];
    vari.id = "var" + random_Num;
    vari.getElementsByClassName("edited")[0].id = "seq_var" + random_Num;

    var cmd = element.getElementsByClassName("command")[0];
    cmd.id = "cmd" + random_Num;
    cmd.getElementsByClassName("edited")[0].id = "seq_cmd" + random_Num;

    $("#seqdivcontainer").append("<br/>");
    document.getElementById("seqdivcontainer").appendChild(element);
    $("#seqdivcontainer").append("<br/>");
    //    pasteHtmlAtCaret(addstrToCaret(element));
    load_ips(element);
    addIntoHistory();
}

function insertChkr() {
    addIntoHistory();
    random_Num = Math.random();
    var element = htmlToElements(ids_json.checker);
    element.id = 'tab_chk' + random_Num;
    element.getElementsByClassName("checker_ip")[0].getElementsByClassName("edited")[0].id = "chk_ip_" + random_Num;
    element.getElementsByClassName("checker_ip")[0].getElementsByClassName("ip")[0].innerHTML = getCurrentDocumentPath();
    var arg = element.getElementsByClassName("checker_arg")[0];
    arg.id = "chk_arg" + random_Num;
    arg.getElementsByClassName("edited")[0].id = "chk_arg" + random_Num;

    var cons = element.getElementsByClassName("checker_const")[0];
    cons.id = "chk_cons" + random_Num;
    cons.getElementsByClassName("edited")[0].id = "chk_const" + random_Num;

    var vari = element.getElementsByClassName("checker_var")[0];
    vari.id = "chk_var" + random_Num;
    vari.getElementsByClassName("edited")[0].id = "chk_var" + random_Num;


    var assign = element.getElementsByClassName("checker_assign")[0];
    assign.id = "chk_assign" + random_Num;
    assign.getElementsByClassName("edited")[0].id = "chk_assign" + random_Num;

    var event = element.getElementsByClassName("checker_event")[0];

    event.id = "chk_evnt" + random_Num;
    event.getElementsByClassName("edited")[0].id = "chk_evnt" + random_Num;

    $("#checkerdivcontainer").append("<br/>");
    document.getElementById("checkerdivcontainer").appendChild(element);
    $("#checkerdivcontainer").append("<br/>");
    //    pasteHtmlAtCaret(addstrToCaret(element));
    load_ips(element);
    addIntoHistory();
}

function refreashpage() {
    $('#excelmenu').css({'display': 'none'});
    $('#regmenu').css({'display': 'none'});
    $('#regmenuparam').css({'display': 'none'});
    var issaved = clickController.savepagewithalert();
    if (issaved) {
        location.reload();
    }
}

function reloadPage() {
    location.reload();
}

function refreshPage() {
    $('#excelmenu').css({'display': 'none'});
    $('#regmenu').css({'display': 'none'});
    $('#regmenuparam').css({'display': 'none'});
    clickController.savepage();
    location.reload();
}

function pasteHtmlAtCaret(html) {
    //addIntoHistory();
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(),
                    node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type !== "Control") {
        document.selection.createRange().pasteHTML(html);
    }
}

function insertBusRow(evt, obj) {
    addIntoHistory();
    /* tab press*/
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }



        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeyup', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited bus_row');
        row.setAttribute('id', 'bus' + Math.random());
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', "name");


        cell = row.insertCell(1);
        cell.setAttribute('class', "unit");



        cell = row.insertCell(2);
        cell.setAttribute('class', "desc");


        cell = row.insertCell(3);
        cell.setAttribute('class', "bus");
        cell.setAttribute('onkeydown', "insertBusRow(event,this);");


    }
}

function insertVariantRow(evt, obj) {
    addIntoHistory();
    /* tab press*/
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }



        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeyup', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited var_row');
        row.setAttribute('id', 'var' + Math.random());
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', "name");


        cell = row.insertCell(1);
        cell.setAttribute('class', "value");


        cell = row.insertCell(2);
        cell.setAttribute('class', "desc");
        cell.setAttribute('onkeydown', "insertVariantRow(event,this);");


    }
}

function insertDefineRow(evt, obj) {
    addIntoHistory();
    /* tab press*/
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }



        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeyup', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited def_row');
        row.setAttribute('id', 'def' + Math.random());
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', "name");

        cell = row.insertCell(1);
        cell.setAttribute('class', "value");

        cell = row.insertCell(2);
        cell.setAttribute('class', "desc");


        cell = row.insertCell(3);
        cell.setAttribute('class', "private");
        cell.setAttribute('onkeydown', "insertDefineRow(event,this);");

    }
}

function insertEnumRow(evt, obj) {
    addIntoHistory();
    /* tab press*/
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }

        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeyup', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited enum_row');
        row.setAttribute('id', 'enum' + Math.random());
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', "m_name");

        cell = row.insertCell(1);
        cell.setAttribute('class', "value");

        cell = row.insertCell(2);
        cell.setAttribute('class', "desc enumdesc");
        cell.setAttribute('onkeydown', "insertEnumRow(event,this);");

    }
}

function insertSeqStepRow(evt, obj) {
    addIntoHistory();
    /* tab press*/
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }

        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeyup', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited step_row');
        row.setAttribute('id', 'sequence' + Math.random());
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', "seq_step seqout");
        cell.setAttribute('colspan', '2');


        cell = row.insertCell(1);
        cell.setAttribute('class', "desc seqdesc seqin");
        cell.setAttribute('colspan', '4');

        cell.setAttribute('onkeydown', "insertSeqStepRow(event,this);");

    }
}

function insertNewRowSignals(evt) {
    addIntoHistory();
    /* tab press*/
    if (evt.keyCode === 9) {
        var cell = evt.target;
        var table = cell;


        while (table.tagName.toUpperCase() !== "TABLE") {
            table = table.parentNode;
        }
        insertsignalrow(table, cell.parentNode);
    }
    /*add property row*/
    else if (evt.keyCode === 80 && evt.altKey) {
        /*
         while (obj.tagName.toUpperCase() !== "TABLE") {
         obj = obj.parentNode;
         }
         
         var table = document.getElementById(obj.id);
         var row = table.insertRow(parseInt(curr_row) + 1);        
         row.setAttribute('onkeydown', 'setCurrRow(this)');
         row.setAttribute('onclick', "setCurrRow(this)");
         var input;
         var cell;
         
         cell = row.insertCell(0);
         
         cell.setAttribute('colspan', '4');
         cell.setAttribute('onkeydown', "insertNewRowSignals(event,this);");
         cell.setAttribute('class', 'propclass');
         */
    }


}

function deletecurrrow(obj) {
    $(obj).closest("tr").remove();
}

function setCurrRow(currnRow) {
    curr_row = currnRow.rowIndex;
    curr_row_obj = currnRow;
    isrowselected = true;
}

function insertSeqCmdRow(evt, obj) {
    addIntoHistory();
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited');
        row.setAttribute('id', 'seq' + Math.random());

        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', 'cmdname');

        cell = row.insertCell(1);
        cell.setAttribute('class', 'step');
        var str = create_reg_arr(document.getElementById("regdivcontainer"));
        autocomplete(cell, str);

        cell = row.insertCell(2);
        cell.setAttribute('class', 'seqvalue');
        autocomplete(cell, str);

        cell = row.insertCell(3);
        cell.setAttribute('class', 'seqdesc');


        cell = row.insertCell(4);
        cell.setAttribute('class', 'refpath');
        cell.setAttribute('onkeydown', "insertSeqCmdRow(event,this);");



    }

}

function insertSeqCmdRow_menu() {
    addIntoHistory();


    var table = curr_row_obj;

    while (table.tagName.toUpperCase() !== "TABLE") {
        table = table.parentNode;
    }


    var row = table.insertRow(parseInt(curr_row_obj.rowIndex) + 1);
    row.setAttribute('onkeydown', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'edited');
    row.setAttribute('id', 'seq' + Math.random());

    var input;
    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', 'cmdname');

    cell = row.insertCell(1);
    cell.setAttribute('class', 'step');
    var str = create_reg_arr(document.getElementById("regdivcontainer"));
    autocomplete(cell, str);

    cell = row.insertCell(2);
    cell.setAttribute('class', 'seqvalue');
    autocomplete(cell, str);

    cell = row.insertCell(3);
    cell.setAttribute('class', 'seqdesc');


    cell = row.insertCell(4);
    cell.setAttribute('class', 'refpath');
    cell.setAttribute('onkeydown', "insertSeqCmdRow(event,this);");

}

function insertSeqConstRow(evt, obj) {
    addIntoHistory();
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited');
        row.setAttribute('id', 'seq' + Math.random());

        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', 'constname');

        cell = row.insertCell(1);
        cell.setAttribute('class', 'value');


        cell = row.insertCell(2);
        cell.setAttribute('class', 'seqdesc');
        cell.setAttribute('onkeydown', "insertSeqConstRow(event,this);");
    }

}

function insertSeqConstRow_menu() {
    addIntoHistory();
    var table = curr_row_obj;

    while (table.tagName.toUpperCase() !== "TABLE") {
        table = table.parentNode;
    }


    var row = table.insertRow(parseInt(curr_row_obj.rowIndex) + 1);

    row.setAttribute('onkeydown', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'edited');
    row.setAttribute('id', 'seq' + Math.random());

    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', 'constname');

    cell = row.insertCell(1);
    cell.setAttribute('class', 'value');


    cell = row.insertCell(2);
    cell.setAttribute('class', 'seqdesc');
    cell.setAttribute('onkeydown', "insertSeqConstRow(event,this);");

}

function insertSeqArgRow(evt, obj) {
    addIntoHistory();
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited');
        row.setAttribute('id', 'seq' + Math.random());

        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', 'argname');

        cell = row.insertCell(1);
        cell.setAttribute('class', 'value');


        cell = row.insertCell(2);
        cell.setAttribute('class', 'seqdesc');
        cell.setAttribute('onkeydown', "insertSeqArgRow(event,this);");
    }

}

function insertSeqArgRow_menu() {
    addIntoHistory();
    var table = curr_row_obj;

    while (table.tagName.toUpperCase() !== "TABLE") {
        table = table.parentNode;
    }


    var row = table.insertRow(parseInt(curr_row_obj.rowIndex) + 1);

    row.setAttribute('onkeydown', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'edited');
    row.setAttribute('id', 'seq' + Math.random());

    var input;
    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', 'argname');

    cell = row.insertCell(1);
    cell.setAttribute('class', 'value');


    cell = row.insertCell(2);
    cell.setAttribute('class', 'seqdesc');
    cell.setAttribute('onkeydown', "insertSeqArgRow(event,this);");

}

function insertSeqVarnameRow(evt, obj) {
    addIntoHistory();
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited');
        row.setAttribute('id', 'seq' + Math.random());

        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', 'varname');

        cell = row.insertCell(1);
        cell.setAttribute('class', 'value');


        cell = row.insertCell(2);
        cell.setAttribute('class', 'seqdesc');
        cell.setAttribute('onkeydown', "insertSeqVarnameRow(event,this);");
    }

}

function insertSeqVarnameRow_menu() {
    addIntoHistory();
    var table = curr_row_obj;

    while (table.tagName.toUpperCase() !== "TABLE") {
        table = table.parentNode;
    }
    var row = table.insertRow(parseInt(curr_row_obj.rowIndex) + 1);

    row.setAttribute('onkeydown', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'edited');
    row.setAttribute('id', 'seq' + Math.random());

    var input;
    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', 'varname');

    cell = row.insertCell(1);
    cell.setAttribute('class', 'value');


    cell = row.insertCell(2);
    cell.setAttribute('class', 'seqdesc');
    cell.setAttribute('onkeydown', "insertSeqVarnameRow(event,this);");

}

function insertSeqRow_deletethis(evt, obj) {
    addIntoHistory();
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited');
        row.setAttribute('id', 'seq' + Math.random());

        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', 'seqname');

        cell = row.insertCell(1);
        cell.setAttribute('class', 'value');


        cell = row.insertCell(2);
        cell.setAttribute('class', 'seqdesc');
        cell.setAttribute('onkeydown', "insertSeqRow(event,this);");
    }

}


function insertseqrow() {
    var obj = curr_row_obj;
    while (obj.tagName.toUpperCase() !== "TABLE") {
        obj = obj.parentNode;
    }


    var clslist = obj.classList;

    if (clslist.contains("command")) {
        insertSeqCmdRow_menu();
    } else if (clslist.contains("var")) {
        insertSeqVarnameRow_menu();
    }
    if (clslist.contains("const")) {
        insertSeqConstRow_menu();
    }
    if (clslist.contains("arg")) {
        insertSeqArgRow_menu();
    }

}

// insert checker rosw

function insertCheckerCmdRow(evt, obj) {
    addIntoHistory();
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited');
        row.setAttribute('id', 'chk' + Math.random());

        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', 'name');

        cell = row.insertCell(1);
        cell.setAttribute('class', 'event');
//        var str = create_reg_arr(document.getElementById("regdivcontainer"));
//        autocomplete(cell, str);

        cell = row.insertCell(2);
        cell.setAttribute('class', 'step');
        var str = create_reg_arr(document.getElementById("regdivcontainer"));
        autocomplete(cell, str);

        cell = row.insertCell(3);
        cell.setAttribute('class', 'checkerdesc');
        cell.setAttribute('onkeydown', "insertCheckerCmdRow(event,this);");
    }

}

function insertCheckerCmdRow_menu() {
    addIntoHistory();


    var table = curr_row_obj;
    while (obj.tagName.toUpperCase() !== "TABLE") {
        obj = obj.parentNode;
    }


    var table = document.getElementById(obj.id);
    var row = table.insertRow(parseInt(curr_row) + 1);
    row.setAttribute('onkeydown', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'edited');
    row.setAttribute('id', 'chk' + Math.random());

    var input;
    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', 'name');

    cell = row.insertCell(1);
    cell.setAttribute('class', 'event');
//        var str = create_reg_arr(document.getElementById("regdivcontainer"));
//        autocomplete(cell, str);

    cell = row.insertCell(2);
    cell.setAttribute('class', 'step');
    var str = create_reg_arr(document.getElementById("regdivcontainer"));
    autocomplete(cell, str);

    cell = row.insertCell(3);
    cell.setAttribute('class', 'checkerdesc');
    cell.setAttribute('onkeydown', "insertCheckerCmdRow(event,this);");

}

function insertchkConstRow(evt, obj) {
    addIntoHistory();
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited');
        row.setAttribute('id', 'chk' + Math.random());

        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', 'constname');

        cell = row.insertCell(1);
        cell.setAttribute('class', 'value');


        cell = row.insertCell(2);
        cell.setAttribute('class', 'checkerdesc');
        cell.setAttribute('onkeydown', "insertchkConstRow(event,this);");
    }

}

function insertchkConstRow_menu() {
    addIntoHistory();
    var table = curr_row_obj;

    while (obj.tagName.toUpperCase() !== "TABLE") {
        obj = obj.parentNode;
    }


    var table = document.getElementById(obj.id);
    var row = table.insertRow(parseInt(curr_row) + 1);
    row.setAttribute('onkeydown', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'edited');
    row.setAttribute('id', 'chk' + Math.random());

    var input;
    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', 'constname');

    cell = row.insertCell(1);
    cell.setAttribute('class', 'value');


    cell = row.insertCell(2);
    cell.setAttribute('class', 'checkerdesc');
    cell.setAttribute('onkeydown', "insertchkConstRow(event,this);");

}

function insertchkArgRow(evt, obj) {
    addIntoHistory();
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited');
        row.setAttribute('id', 'chk' + Math.random());

        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', 'argname');

        cell = row.insertCell(1);
        cell.setAttribute('class', 'value');


        cell = row.insertCell(2);
        cell.setAttribute('class', 'checkerdesc');
        cell.setAttribute('onkeydown', "insertchkArgRow(event,this);");
    }

}

function insertChkArgRow_menu() {
    addIntoHistory();
    var table = curr_row_obj;
    while (obj.tagName.toUpperCase() !== "TABLE") {
        obj = obj.parentNode;
    }

    var table = document.getElementById(obj.id);
    var row = table.insertRow(parseInt(curr_row) + 1);
    row.setAttribute('onkeydown', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'edited');
    row.setAttribute('id', 'chk' + Math.random());

    var input;
    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', 'argname');

    cell = row.insertCell(1);
    cell.setAttribute('class', 'value');


    cell = row.insertCell(2);
    cell.setAttribute('class', 'checkerdesc');
    cell.setAttribute('onkeydown', "insertchkArgRow(event,this);");


}

function insertChkVarnameRow(evt, obj) {
    addIntoHistory();
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited');
        row.setAttribute('id', 'chk' + Math.random());

        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', 'varname');

        cell = row.insertCell(1);
        cell.setAttribute('class', 'value');


        cell = row.insertCell(2);
        cell.setAttribute('class', 'checkerdesc');
        cell.setAttribute('onkeydown', "insertChkVarnameRow(event,this);");
    }

}

function insertChkVarnameRow_menu() {
    addIntoHistory();
    var table = curr_row_obj;

    while (obj.tagName.toUpperCase() !== "TABLE") {
        obj = obj.parentNode;
    }


    var table = document.getElementById(obj.id);
    var row = table.insertRow(parseInt(curr_row) + 1);
    row.setAttribute('onkeydown', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'edited');
    row.setAttribute('id', 'chk' + Math.random());

    var input;
    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', 'varname');

    cell = row.insertCell(1);
    cell.setAttribute('class', 'value');


    cell = row.insertCell(2);
    cell.setAttribute('class', 'checkerdesc');
    cell.setAttribute('onkeydown', "insertChkVarnameRow(event,this);");
}


function insertChkAssignRow(evt, obj) {
    addIntoHistory();
    if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited');
        row.setAttribute('id', 'chk' + Math.random());

        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', 'name');

        cell = row.insertCell(1);
        cell.setAttribute('class', 'value');


        cell = row.insertCell(2);
        cell.setAttribute('class', 'checkerdesc');
        cell.setAttribute('onkeydown', "insertChkAssignRow(event,this);");
    }

}

function insertChkVarnameRow_menu() {
    addIntoHistory();
    var table = curr_row_obj;

    while (obj.tagName.toUpperCase() !== "TABLE") {
        obj = obj.parentNode;
    }


    var table = document.getElementById(obj.id);
    var row = table.insertRow(parseInt(curr_row) + 1);
    row.setAttribute('onkeydown', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'edited');
    row.setAttribute('id', 'chk' + Math.random());

    var input;
    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', 'name');

    cell = row.insertCell(1);
    cell.setAttribute('class', 'value');


    cell = row.insertCell(2);
    cell.setAttribute('class', 'checkerdesc');
    cell.setAttribute('onkeydown', "insertChkAssignRow(event,this);");
}





/*  insert new row for reg field */
function insertcommonreg() {
    addIntoHistory();
    var rowtab = curr_row_obj;
    while (rowtab.tagName.toUpperCase() !== "TABLE") {
        rowtab = rowtab.parentNode;
    }

    if (rowtab.classList.contains("fields")) {
        insertfieldRow(rowtab);
    } else if (rowtab.classList.contains("enum")) {
        insertenumrow(rowtab);
    } else if (rowtab.classList.contains("param")) {
        insertparamrow(rowtab);
    } else if (rowtab.classList.contains("busdomain")) {
        insertbusdomainrow(rowtab);
    } else if (rowtab.classList.contains("signals_inner")) {
        insertsignalrow(rowtab, curr_row_obj);
    }
    return false;
}

function insertsignalrow(rowtab, curr_row_obj) {
    var row = rowtab.insertRow(parseInt(curr_row_obj.rowIndex) + 1);
    row.setAttribute('onkeydown', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', "edited sig_row");
    row.setAttribute('id', 'sig' + Math.random());

    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', "name");
    /*input=document.createElement("input");
     
     cell.appendChild(input);
     */

    cell = row.insertCell(1);
    cell.setAttribute('class', "direction");
    /*input=document.createElement("input");
     cell.appendChild(input);
     */


    cell = row.insertCell(2);
    cell.setAttribute('onkeydown', "insertNewRowSignals(event,this);");
    cell.setAttribute('class', "desc signaldesc");
}

function insertbusdomainrow(rowtab) {
    var row = rowtab.insertRow(parseInt(curr_row_obj.rowIndex) + 1);
    row.setAttribute('onkeyup', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'edited bus_row');
    row.setAttribute('id', 'bus' + Math.random());
    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', "name");


    cell = row.insertCell(1);
    cell.setAttribute('class', "unit");



    cell = row.insertCell(2);
    cell.setAttribute('class', "desc");


    cell = row.insertCell(3);
    cell.setAttribute('class', "bus");
    cell.setAttribute('onkeydown', "insertBusRow(event,this);");
}

function insertparamrow(rowtab) {
    var row = rowtab.insertRow(parseInt(curr_row_obj.rowIndex) + 1);
    row.setAttribute('onkeyup', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'edited def_row');
    row.setAttribute('id', 'def' + Math.random());
    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', "name");

    cell = row.insertCell(1);
    cell.setAttribute('class', "value");

    cell = row.insertCell(2);
    cell.setAttribute('class', "desc");


    cell = row.insertCell(3);
    cell.setAttribute('class', "private");
    cell.setAttribute('onkeydown', "insertDefineRow(event,this);");
}

function insertenumrow(rowtab) {
    var row = rowtab.insertRow(parseInt(curr_row_obj.rowIndex) + 1);
    row.setAttribute('onkeyup', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'edited enum_row');
    row.setAttribute('id', 'enum' + Math.random());
    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', "m_name");

    cell = row.insertCell(1);
    cell.setAttribute('class', "value");

    cell = row.insertCell(2);
    cell.setAttribute('class', "desc enumdesc");
    cell.setAttribute('onkeydown', "insertEnumRow(event,this);");
}

function insertfieldRow(rowtab) {
    var row = rowtab.insertRow(parseInt(curr_row_obj.rowIndex) + 1);
    row.setAttribute('onkeydown', 'setCurrRow(this)');
    row.setAttribute('onclick', "setCurrRow(this)");
    row.setAttribute('class', 'field edited');
    row.setAttribute('id', 'field' + Math.random());

    var cell;

    cell = row.insertCell(0);
    cell.setAttribute('class', 'bits');
    cell.setAttribute('title', 'bits');

    cell = row.insertCell(1);
    cell.setAttribute('class', 'fieldname');
    cell.setAttribute('title', 'field name');


    cell = row.insertCell(2);
    cell.setAttribute('class', 'sw thirdCell');
    cell.setAttribute('title', 'software access');

    cell = row.insertCell(3);
    cell.setAttribute('class', 'hw thirdCell');
    cell.setAttribute('title', 'hardware access');

    cell = row.insertCell(4);
    cell.setAttribute('title', 'default');
    cell.setAttribute('class', 'default');

    cell = row.insertCell(5);
    cell.setAttribute('onkeydown', "insertNewRow(event,this);");
    cell.setAttribute('class', 'desc fielddesc');
    cell.setAttribute('title', 'description');

    hookEvents(cell, idsprop);

}

function deletefieldrow() {
    curr_row_obj.remove();
}

var fieldrow;
var insertfieldrow;
var iscut = false;
function copyfieldrow() {
    fieldrow = curr_row_obj;
    insertfieldrow = fieldrow.cloneNode(true);

    iscut = false;
}
function cutfieldrow() {
    fieldrow = curr_row_obj;
    insertfieldrow = fieldrow.cloneNode(true);
    addIntoHistory();
    fieldrow.parentNode.removeChild(fieldrow);
    iscut = true;
}

function pastefieldrow() {
    addIntoHistory();
    //alert("hell");
    if (fieldrow) {

        try {
            var parent_row = curr_row_obj.parentNode;
            var pasted_row = curr_row_obj.cloneNode(true);
            pasted_row.setAttribute("id", "field" + Math.random());
            pasted_row.innerHTML = insertfieldrow.innerHTML;
            parent_row.insertBefore(pasted_row, curr_row_obj.nextSibling);
            if (iscut) {
                fieldrow.remove();
                fieldrow = null;
            }
        } catch (e) {
            alert("error in paste row : " + e.message);
            if (fieldrow.parentNode.parentNode.classList.toString() === curr_row_obj.parentNode.parentNode.classList.toString()) {
                alert("--copy into : " + fieldrow.parentNode.parentNode.classList + "  ---copy from : " + curr_row_obj.parentNode.parentNode.classList);
            }
        }
    }
}

/*  insert new row for reg field */
function insertNewRow(evt, obj) {
    addIntoHistory();
    if (evt.keyCode === 9 && evt.shiftKey) {
    }
    /*add field row*/
    else if (evt.keyCode === 9) {

        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'field edited');
        row.setAttribute('oncontextmenu', 'openregmenu(event)');
        row.setAttribute('id', 'field' + Math.random());

        var input;
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('class', 'bits');
        cell.setAttribute('title', 'bits');

        /*				input=document.createElement("input");
         input.setAttribute('style','width:88%');*/
        /*
         var rowdel=document.createElement("a");
         rowdel.innerText='x';
         rowdel.setAttribute('title','delete this row');
         rowdel.setAttribute('style','color:red');
         rowdel.setAttribute('onclick','deleteRow(this);');
         cell.appendChild(rowdel);
         */


        cell = row.insertCell(1);
        cell.setAttribute('class', 'fieldname');
        cell.setAttribute('title', 'field name');


        cell = row.insertCell(2);
        cell.setAttribute('class', 'sw thirdCell');
        cell.setAttribute('title', 'software access');
        /*input=document.createElement("input");
         cell.appendChild(input);*/


        cell = row.insertCell(3);
        cell.setAttribute('class', 'hw thirdCell');
        cell.setAttribute('title', 'hardware access');
        /*input=document.createElement("input");
         cell.appendChild(input);*/


        cell = row.insertCell(4);
        cell.setAttribute('title', 'default');
        cell.setAttribute('class', 'default');

        cell = row.insertCell(5);
        cell.setAttribute('onkeydown', "insertNewRow(event,this);");
        cell.setAttribute('class', 'desc fielddesc');
        cell.setAttribute('title', 'description');

        hookEvents(cell, idsprop);
    }
    /*add property row*/
    else if (evt.keyCode === 80 && evt.altKey) {
        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }

        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited');
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('colspan', '6');
        cell.setAttribute('onkeydown', "insertNewRow(event,this);");
        cell.setAttribute('class', 'propclass');
        cell.setAttribute('title', 'property');

        /*
         input=document.createElement("textarea");
         input.setAttribute('class','propInput');
         cell.appendChild(input);*/

    }

    /*add description row*/
    else if (evt.keyCode === 68 && evt.altKey) {
        while (obj.tagName.toUpperCase() !== "TABLE") {
            obj = obj.parentNode;
        }


        var table = document.getElementById(obj.id);
        var row = table.insertRow(parseInt(curr_row) + 1);
        row.setAttribute('onkeydown', 'setCurrRow(this)');
        row.setAttribute('onclick', "setCurrRow(this)");
        row.setAttribute('class', 'edited');
        var cell;

        cell = row.insertCell(0);
        cell.setAttribute('colspan', '6');
        cell.setAttribute('onkeydown', "insertNewRow(event,this);");
        cell.setAttribute('class', 'desc descclass');
        cell.setAttribute('title', 'description');

        /*
         input=document.createElement("textarea");
         input.setAttribute('class','descInput');
         cell.appendChild(input);*/

    }

    /*call ML from here*/
    if (evt.keyCode === 32 && evt.ctrlKey) {
        /*
         var txt = event.target.innerText;
         var mlhint = "";
         try {
         
         mlhint = clickController.showMLHint(txt);
         setTimeout(function () {
         console.log("--txt=" + txt);
         document.getElementById('mlHintContainer').setAttribute('style', 'display:block');
         document.getElementById('mlHintPara').innerText = mlhint;
         
         }, 1000);
         
         
         } catch (e) {
         alert("Err call java : " + e.message);
         }
         */

    }

}

function setHintText(str) {
    document.getElementById("inputhint").value = str;
}

function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos);
}

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        console.log("--click on input");
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}


function click_hideProp() {
    var cols = document.getElementsByClassName('propclass');
    var txtVal = document.getElementById('btnPropHide').innerHTML;
    if (txtVal === hideProp) {
        for (i = 0; i < cols.length; i++) {
            cols[i].style.display = 'none';
        }
        document.getElementById('btnPropHide').innerHTML = showProp;
    } else if (txtVal === showProp) {
        for (i = 0; i < cols.length; i++) {
            cols[i].style.display = 'table-cell';
        }
        document.getElementById('btnPropHide').innerHTML = hideProp;
    }
}

var display = "table-cell";
function hideprop() {
    display = "none";
}
function showprop() {
    display = "table-cell";
}
function resetview() {
    $('.propclass').css("display", "table-cell");
}

function click_btnprop() {
    if ($("#lblcompact").text() === 'show') {
        $('.propclass').css("display", "none");
        $('.descclass').css("display", "none");
        $("#lblcompact").text('hide');
    } else {
        $('.propclass').css("display", "table-cell");
        $('.descclass').css("display", "table-cell");
        $("#lblcompact").text('show');
    }
}

function click_btndesc() {
    if ($("#btndesc").html() === hideDesc) {
        $('.descclass').css("display", "none");
        $("#btndesc").html(showDesc);
    } else {
        $('.descclass').css("display", "table-cell");
        $("#btndesc").html(hideDesc);
    }
}

function IDS_PROPHIDE() {
    $('.propclass').css("display", "none");
    hideprop();
}

function IDS_PROPSHOW() {
    $('.propclass').css("display", "table-cell");
    showprop();
}

function IDS_DESCSHOW() {
    try {
        var cols = document.getElementsByClassName('descclass');
        for (i = 0; i < cols.length; i++) {
            cols[i].style.display = 'table-cell';
        }
    } catch (E) {
        console.log('Err ' + E.message);
    }
}

function IDS_DESCHIDE() {
    try {
        var cols = document.getElementsByClassName('descclass');
        for (i = 0; i < cols.length; i++) {
            cols[i].style.display = 'none';
        }
    } catch (E) {
        console.log("Err hideDesc " + E.message);
    }
}





function click_hideDesc() {
    var cols = document.getElementsByClassName('descclass');
    var txtVal = document.getElementById('btnDescHide').innerHTML;
    if (txtVal === hideDesc) {
        for (i = 0; i < cols.length; i++) {
            cols[i].style.display = 'none';
        }
        document.getElementById('btnDescHide').innerHTML = showDesc;
    } else if (txtVal === showDesc) {
        for (i = 0; i < cols.length; i++) {
            cols[i].style.display = 'table-cell';
        }
        document.getElementById('btnDescHide').innerHTML = hideDesc;
    }
}

function printMsg(msg) {
    /*document.getElementById('para').innerHTML =msg;*/
}

function fontColorChange(color) {
    console.log('change color');
    document.execCommand('foreColor', false, color);
}
function printDoc() {
    window.print();

}

function updatelostEvents() {
    var cells = document.getElementById(SEQ_DIV_CONTAINER).getElementsByClassName("step");
    for (var i = 0; i < cells.length; i++) {
        var str = create_reg_arr(document.getElementById("regdivcontainer"));
        autocomplete(cells[i], str);
    }
}


/*key press event listner to catch and handle key event*/
var bodyArr = {};
var index = 0;
var historycounter = 0;
function KeyPress(e) {

    var evtobj = window.event ? event : e;

    /*undo*/
    if (evtobj.keyCode === 90 && evtobj.ctrlKey) {
        if (isundofirsttimeclicked) {
            addIntoHistory();
        }
        undo();
        isundofirsttimeclicked = false;
        return false;
    }

    /*redo*/
    else if (evtobj.keyCode === 89 && evtobj.ctrlKey) {
        if (isundofirsttimeclicked) {
            addIntoHistory();
        }
        redo();
        isundofirsttimeclicked = false;
        return false;
    }

    /*paste ctrl+v*/
    else if (evtobj.keyCode === 86 && evtobj.ctrlKey) {
        myClick();
        function myClick() {
            setTimeout(
                    function () {
                        updateEvents();
                    }, 500);
        }

    }
    /*space key press*/
    else if (evtobj.keyCode === 32) {
        addIntoHistory();
    }
    /*enter key press*/
    else if (evtobj.keyCode === 13) {
        addIntoHistory();
    } else if (evtobj.keyCode === 17) {
    }
    /* down arrow*/
    else if (evtobj.keyCode === 40) {
        try {
            /*
             e.preventDefault();
             var currscroll = parseInt(getscrollpos().split(":")[1]);
             setscrollpos(currscroll + 20);
             */
        } catch (e) {
        }
    }
    /* up arrow*/
    else if (evtobj.keyCode === 38) {
        try {
            /*
             e.preventDefault();
             var currscroll = parseInt(getscrollpos().split(":")[1]);
             setscrollpos(currscroll - 20);
             */
        } catch (e) {
        }
    } else {
        isundofirsttimeclicked = true;
        /*console.log("--add into history");*/
        /*
         if (historycounter > 6) {
         addIntoHistory();
         historycounter = 0;
         }
         historycounter++;
         */
    }

    /*when copy/cut paste done, html only copies html tag but not event like "onclick.." so we need to update these event whenever copy occures.
     this is only a temporary solution and we need to find a better solution for this*/
    function updateEvents() {
        console.log('update event call');

        var idsclass = document.getElementsByClassName("idsTemp");
        if (typeof (idsclass !== 'undefined' && idsclass !== null)) {
            for (var i = 0; i < idsclass.length; i++)
            {
                idsclass[i].setAttribute("onclick", "tabClick(this)");
                random_Num = Math.random();
                idsclass[i].setAttribute('id', 'tab' + i + random_Num);
                $(idsclass[i]).removeAttr('style');
                $(idsclass[i]).find("[style]").removeAttr('style');	/*reset style attribute becouse whenever copy paste done, browser set default width location
                 and it ruin the style*/
                if (idsclass[i].classList.contains("seq")) {
                    idsclass[i].setAttribute('oncontextmenu', 'openseqmenu(event);');
                }
            }
        }




        idsclass = document.getElementsByClassName("edited");
        if (typeof (idsclass !== 'undefined' && idsclass !== null)) {
            for (var i = 0; i < idsclass.length; i++)
            {
                idsclass[i].setAttribute("onclick", "setCurrRow(this)");
                idsclass[i].setAttribute("onkeyup", "setCurrRow(this)");
            }
        }

        var refpath = document.getElementById("seqdivcontainer").getElementsByClassName("refpath");
        if (typeof (refpath !== 'undefined' && refpath !== null)) {
            for (var i = 0; i < refpath.length; i++) {
                refpath[i].setAttribute('onkeydown', 'insertSeqCmdRow(event,this);');
            }
        }

        idsclass = document.getElementsByClassName("fielddesc");
        if (typeof (idsclass !== 'undefined' && idsclass !== null)) {
            for (var i = 0; i < idsclass.length; i++)
            {
                idsclass[i].setAttribute("onkeydown", "insertNewRow(event,this)");
            }
        }

        var fields = document.getElementsByClassName("fields");
        if (typeof (fields !== 'undefined' && fields !== null)) {
            for (var i = 0; i < fields.length; i++) {
                random_Num = Math.random();
                fields[i].setAttribute('id', 'tab' + i + random_Num);
            }
        }

        var field = document.getElementsByClassName("field");
        if (typeof (field !== 'undefined' && field !== null)) {
            for (var i = 0; i < field.length; i++) {
                random_Num = Math.random();
                field[i].setAttribute('id', 'tab' + i + random_Num);
                field[i].setAttribute('oncontextmenu', 'openregmenu(event);');
            }
        }

        idsclass = document.getElementsByClassName("private");
        if (typeof (idsclass !== 'undefined' && idsclass !== null)) {
            for (var i = 0; i < idsclass.length; i++) {
                idsclass[i].setAttribute("onkeydown", "insertDefineRow(event,this)");
            }
        }

        idsclass = document.getElementsByClassName("enumdesc");
        if (typeof (idsclass !== 'undefined' && idsclass !== null)) {
            for (var i = 0; i < idsclass.length; i++) {
                idsclass[i].setAttribute("onkeydown", "insertEnumRow(event,this)");
            }
        }

        idsclass = document.getElementsByClassName("signaldesc");
        if (typeof (idsclass !== 'undefined' && idsclass !== null)) {
            for (var i = 0; i < idsclass.length; i++) {
                idsclass[i].setAttribute("onkeydown", "insertNewRowSignals(event,this)");
            }
        }
    }

}

function walk(el, fn) {
    for (var i = 0, len = el.childNodes.length; i < len; i++) {
        var node = el.childNodes[i];
        if (node.nodeType === 3)
            fn(node);
        else if (node.nodeType === 1 && node.nodeName !== "SCRIPT")
            walk(node, fn);
    }
}
function textNode(txt) {
    return document.createTextNode(txt);
}

function openfile(obj) {
    try {
        var file = $(obj).text();
        clickController.openFile(file);
    } catch (e) {
        alert('err openfile : ' + e.message);
    }
}

function openFindWindow(event) {
    try {
        location.reload();
        clickController.openFind();
    } catch (e) {
        alert('err : ' + e.message);
    }
}

function unSetUnsaved() {
    try {

        clickController.setUnsaveSymbol();
    } catch (e) {
    }
}

function unSetsaved() {
    try {
        clickController.setSaveSymbol();
    } catch (e) {
    }
}

document.onkeydown = KeyPress;

function closehint() {
    document.getElementById('mlHintContainer').setAttribute("style", "display:none");
}

function removeelement(classname) {
    $("." + classname).remove();
}

function saveConfig(configstr) {
    var config = document.getElementById("config");
    try {
        if (config) {
            alert("configfound");
            config.remove();
        } else {
            alert("not configfound");
        }
        config = document.getElementsByClassName("maindiv")[0].appendChild("div");
        config.id = "config";
        config.style = "display:none";
        config.innerHTML = configstr;
    } catch (e) {
        alert("Err saveConfig : " + e.message);
    }

}

function navigateHierarchy(h) {
    jump(h);
    var anchor = document.getElementsByName(h)[0];
    while (anchor.tagName.toUpperCase() !== "TABLE") {
        anchor = anchor.parentNode;
    }
    $(anchor).effect("highlight", {color: "#fab492"}, 1000);
}

/*@JAVAFX Console jump*/
function jumpFromAnotherHTML(h) {
    try {
        var idschecks = document.getElementsByClassName("idscheck");
        for (var i = 0; i < idschecks.length; i++) {
            if (idschecks[i].getAttribute("name") === h) {
                var top = $(idschecks[i]).offset().top;
                window.scrollTo(0, top);
            } else {
               // alert("--data : " + idschecks[i].outerHTML);
            }
        }
    } catch (e) {

    }

}

/*@JAVAFX*/
function jump(h) {
    location.href = '#' + h;
    try {
        var ele = document.getElementsByName(h + "")[0];
        if (document.getElementById(REG_DIV_CONTAINER).contains(ele) && document.getElementById(REG_DIV_CONTAINER).style.display !== 'block') {
            //check if reg comes from sequ/param then you can simply switch but if it comes from spreadsheep then to prevent data loss allow user to manually go to reg view becouse we do parasing.
            if (document.getElementById(SEQ_DIV_CONTAINER).style.display === 'block' || document.getElementById(PARAM_DIV_CONTAINER).style.display === 'block') {
                document.getElementById(REG_DIV_CONTAINER).style.display = 'block';
                document.getElementById(SEQ_DIV_CONTAINER).style.display = 'none';
                document.getElementById(SPREAD_DIV_CONTAINER).style.display = 'none';
                document.getElementById(PARAM_DIV_CONTAINER).style.display = 'none';
            } else {
                alert(msg_switch_to_reg);
            }
        } else if (document.getElementById(SEQ_DIV_CONTAINER).contains(ele) && document.getElementById(SEQ_DIV_CONTAINER).style.display !== 'block') {
            document.getElementById(REG_DIV_CONTAINER).style.display = 'none';
            document.getElementById(SEQ_DIV_CONTAINER).style.display = 'block';
            document.getElementById(SPREAD_DIV_CONTAINER).style.display = 'none';
            document.getElementById(PARAM_DIV_CONTAINER).style.display = 'none';
        } else if (document.getElementById(SPREAD_DIV_CONTAINER).contains(ele) && document.getElementById(SPREAD_DIV_CONTAINER).style.display !== 'block') {
            if (document.getElementById(SEQ_DIV_CONTAINER).style.display === 'block' || document.getElementById(PARAM_DIV_CONTAINER).style.display === 'block') {
                document.getElementById(REG_DIV_CONTAINER).style.display = 'none';
                document.getElementById(SEQ_DIV_CONTAINER).style.display = 'none';
                document.getElementById(SPREAD_DIV_CONTAINER).style.display = 'block';
                document.getElementById(PARAM_DIV_CONTAINER).style.display = 'none';
            } else {
                alert(msg_switch_to_spreadsheet);
            }
        }
    } catch (e) {
        //alert("err jump : "+e.message);
    }
}

/*GUI check starts here*/
/*@JAVAFX*/
const name_regex = /^\s*[\\$]?[a-zA-Z][a-zA-Z0-9 _]*\s*/;
function runGUICheck() {
    var errorlist = "";
    var errorconter = 0;
    resetAllChecks();

    //checkTop(); TODO temporary disabled not working properly
    checkRegTemplate();
    checkCommon();
    checkMem();
    checkSeqTemplate();

    if ($.trim(errorlist) !== "") {
        var verrorlist = "{error: [" + errorlist + "]}";
        alert(verrorlist);
        return verrorlist;
    }

    function addErrJson(msg, td) {

        var id = "target" + errorconter;
        $(td).append("<a class='idscheck' name='" + id + "'></a>");
        $(td).css('border', '2px solid red');

        if (errorlist === "") {
            errorlist = "{id:" + id + ",msg:" + msg + "}";
        } else {
            errorlist = errorlist + ",{id:" + id + ",msg:" + msg + "}";
        }
        errorconter++;
    }

    function checkRegTemplate() {


        $("table.reg td.fieldname").each(function (i) {
            if (!$(this).text().match(name_regex)) {
                addErrJson(msg_f_name_invalid, this);
            }
        });

        $("table.reg td.bits").each(function (i) {
            /*
             if($(this).text()==""){
             addErrJson("Error-G register bits should not by empty",this);
             }
             */
            if (!$(this).text().match(/\s*(^[\d]+$)|(^[\d]+\:[\d])/)) {
                addErrJson(msg_f_bits_invalid, this);
            }
        });

        $("table.reg td.sw").each(function (i) {
            if ($(this).text() === "") {
                addErrJson(msg_sw_invalid, this);
            }
        });

    }

    function checkCommon() {
        $("table.idsTemp td.offset").each(function (i) {
            /*if(($(this).text()!="")&&(!$(this).text().match(/\s*(^\`h[a-fA-F0-9]+$)|(^[\$][a-zA-Z][a-zA-Z0-9_]*)|(^[\d]+$)|(^0(x|X)([\d]|[a-fA-F])+$)/))){*/
            if (($(this).text() !== "") && (!$(this).text().match(/\s*(^\`h[a-fA-F0-9]+$)|(^[\$][a-zA-Z][a-zA-Z0-9_]*)|(^[\d_]+$)|(^0(x|X)([\d_]|[a-fA-F_])+$)/))) {
                addErrJson(msg_offset_invalid, this);
            }
        });

        /*
         $("table.idsTemp td.default").each(function(i){
         if($(this).text()==""){
         addErrJson("Error-G  default value should not be empty",this);
         }
         });*/

        $("table.idsTemp td.name").each(function (i) {
            if (!$(this).text().match(name_regex)) {
                addErrJson(msg_temp_name_valid, this);
            }
        });

        $("table.ref td.refname").each(function (i) {
            if (!$(this).text().match(/^[\\$]?[a-zA-Z][a-zA-Z0-9 _]*/)) {
                addErrJson(msg_ref_name_valid, this);
            }
        });
    }

    function checkMem() {
        $("table.mem td.depth").each(function (i) {
            if ($(this).text() === "") {
                addErrJson(msg_depth_empty, this);
            }
        });

        $("table.mem td.width").each(function (i) {
            if ($(this).text() === "") {
                addErrJson(msg_width_empty, this);
            }
        });
    }

    function resetAllChecks() {

        $("table.idsTemp td.default").removeAttr("style");
        $("table.reg td.fieldname").removeAttr("style");
        $("table.reg td.bits").removeAttr("style");
        $("table.reg td.sw").removeAttr("style");
        $("table.idsTemp td.offset").removeAttr("style");

        $("table.mem td.depth").removeAttr("style");
        $("table.mem td.width").removeAttr("style");
        $("table.idsTemp td.name").removeAttr("style");
        $("table.idsTemp td.name").removeAttr("style");
        $("table.ref td.refname").removeAttr("style");

        $("table.seq td.seqname").removeAttr("style");
        $("table.seq td.ip").removeAttr("style");

        $(".idscheck").removeAttr();
        $(".idscheck").remove();

        $(".idsTemp td.name").removeAttr("style");
        errorconter = 0;
        errorlist = "";
    }

    function checkSeqTemplate() {


        $("table.seq td.seqname").each(function (i) {
            if ($(this).text() === "") {
                addErrJson(msg_seq_name_empty, this);
            }
        });

        $("table.seq td.ip").each(function (i) {
            if ($(this).text() === "") {
                addErrJson(msg_seq_name_empty, this);
            }
        });

    }
    function checkTop() {
        try {

            $(".idsTemp").each(function (i) {
                var cls = $(this).attr("class").split(" ");
                for (var i = 0; i < cls.length; i++) {
                    if (cls[i] === "block" || cls[i] === "chip" || cls[i] === "system" || cls[i] === "board" || cls[i] === "section" || cls[i] === "reg" || cls[i] === "ref" ||
                            cls[i] === "mem" || cls[i] === "enum" || cls[i] === "param" || cls[i] === "variant" || cls[i] === "busdomain" || cls[i] === "signals") {

                        if (cls[i] === "reg" || cls[i] === "section" || cls[i] === "ref" ||
                                cls[i] === "mem" || cls[i] === "enum" || cls[i] === "param" || cls[i] === "variant" || cls[i] === "busdomain" || cls[i] === "signals") {
                            addErrJson(msg_top_missing, this.getElementsByClassName("name")[0]);
                        }
                        return "";
                    }
                }
            });




        } catch (e) {
            return e.message;
        }
    }

    return "";
}
/*GUI checks ends here*/



/*****************************************Auto property hints work start*******************************************************/

var carpos;

function hookEvents(ele) {
    autocomplete(ele, idsprop);
}

function getCaretPosition(editableDiv) {
    var caretPos = 0,
            sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);

            if (range.commonAncestorContainer.parentNode === editableDiv) {
                caretPos = range.endOffset;
            }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() === editableDiv) {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
}

function placeCaretAtEnd(el) {
    if (typeof window.getSelection !== "undefined"
            && typeof document.createRange !== "undefined") {
        var range = document.createRange();
        var sel = window.getSelection();
        try {
            range.setStart(el, 1);
        } catch (e) {
            range.setStart(el, 0);
        }
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange !== "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

function checkvalidprop(inp) {
    carpos = getCaretPosition(inp);
    var txt = inp.innerText.trim();
    var val = "";
    var td_type = "";
    try {
        td_type = inp.getAttribute("class").split(" ")[0];
    } catch (e) {
    }


    try {
        if (td_type === "propclass" || td_type === "step" || td_type === "sw" || td_type === "hw" || td_type === "seqvalue"
                || td_type === "cmdname") {
            for (var i = carpos - 1; i >= 0; i--) {
                if (txt.charAt(i) === ";" || txt.charAt(i) === "{") {
                    return val.replace("{", "").trim();
                }
                val = txt.charAt(i) + val;
            }
        } else {

            var curly_found = false;
            for (var i = carpos - 1; i >= 0; i--) {

                if (txt.charAt(i) === "{") {
                    curly_found = true;
                    break;
                } else if (txt.charAt(i) === "}") {
                    curly_found = false;
                    break;
                }
            }
            if (curly_found) {
                for (var i = carpos - 1; i >= 0; i--) {
                    if (txt.charAt(i) === ";" || txt.charAt(i) === "{") {
                        return val.replace("{", "").trim();
                    }
                    val = txt.charAt(i) + val;
                }
            }
        }
    } catch (e) {
        console.log("Err (checkvalidprop) : " + e.message);
    }
    return val;
}

function scrollFieldCells(e, isdown) {
    try {
        if (document.getElementById("autocomplete-list") && document.getElementById("autocomplete-list").childNodes.length > 0) {
            /*if hint box is already open then block this function for hinting work*/
            e.preventDefault();
            return false;
        }
        var cell = e.target;
        var cellindex = parseInt(cell.cellIndex);
        var tab = cell;
        var row = cell;

        while (row.tagName.toUpperCase() !== "TR") {
            row = row.parentNode;
        }

        while (tab.tagName.toUpperCase() !== "TABLE") {
            tab = tab.parentNode;
        }

        if (isdown) {
            tab.rows[row.rowIndex + 1].cells[cellindex ].focus();
            e.preventDefault();
        } else {
            tab.rows[row.rowIndex - 1].cells[cellindex].focus();
            e.preventDefault();
        }

    } catch (e) {
    }
}

function autocomplete(inp, arr) {
    var SHOW_ALL = false;

    /*arr=idsprop;*/
    /*the autocomplete function takes two arguments,
     the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        inputcodeinnercall(e);
    });


    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x)
            x = x.getElementsByTagName("div");

        if (e.keyCode === 40) {
            /*If the arrow DOWN key is pressed,
             increase the currentFocus variable:*/
            currentFocus++;

            /*and and make the current item more visible:*/
            addActive(x);
            var autolist = document.getElementById("autocomplete-list");
            if (autolist) {
                e.preventDefault();
                autolist.scrollTop = autolist.scrollTop + 20;
            }
            //			console.log("--scroll pos="+document.getElementById("autocomplete-list").scrollTop);

        } else if (e.keyCode === 38) {
            /*If the arrow UP key is pressed,
             decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
            var autolist = document.getElementById("autocomplete-list");
            if (autolist) {
                e.preventDefault();
                autolist.scrollTop = autolist.scrollTop - 20;
            }
        } else if (e.keyCode === 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            if (currentFocus > -1) {
                e.preventDefault();
                /*and simulate a click on the "active" item:*/

                if (x)
                    x[currentFocus].click();
                //var carpost = getCaretPosition(inp);

                placeCaretAtEnd(inp);
            }
        } else if (e.keyCode === 27) {

            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
        /*on ctrl+space show all hints*/
        if (e.keyCode === 32 && e.ctrlKey) {
            SHOW_ALL = true;
            //alert("show all call");
            inputcodeinnercall(e);
        } else {
            SHOW_ALL = false;
        }
    });

    function inputcodeinnercall(e) {

        var a, b, i, val = inp.innerText.trim();
        /*close any already open lists of autocompleted values*/
        closeAllLists();

        if (!val && !SHOW_ALL) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");

        var rect = e.target.getBoundingClientRect();

        a.setAttribute("id", e.target.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        var nodetype = "";
        try {
            nodetype = e.target.parentNode.parentNode.parentNode.getAttribute("class").split(" ")[0];
        } catch (e) {
        }


        /*set hint location here*/
        if (nodetype === "reg" || nodetype === "block") {
            /*console.log("clientx1=="+window.getSelection().getRangeAt(0).startOffset);
             var offset_cor=(parseInt(window.getSelection().getRangeAt(0).startOffset)*4)+215;
             */
            a.setAttribute("style", "left:38%;");
        } else if (nodetype === "fields") {
            var cur_node = e.target.getAttribute("class").split(" ")[0];
            if (cur_node === "sw") {
                a.setAttribute("style", "left:35%;");
            } else if (cur_node === "hw") {
                a.setAttribute("style", "left:44%");
            } else {
                a.setAttribute("style", "right:60px");
            }
        } else if (nodetype === "command") {
            var cur_node = e.target.getAttribute("class").split(" ")[0];
            if (cur_node === "step") {
                a.setAttribute("style", "left:29%");
            } else if (cur_node === "seqvalue") {
                a.setAttribute("style", "left:48%");
            }
        } else {
            /*a.setAttribute("style", "left: 29%;");*/
        }

        /*append the DIV element as a child of the autocomplete container:*/
        e.target.parentNode.after(a);


        var hintoffsetHeight = $(a).offset().top;
        var offsetHeight = document.getElementById('regdivcontainer').offsetHeight;//$(document).height();
        hintoffsetHeight = offsetHeight - (hintoffsetHeight);
        var attr = a.getAttribute("style") + ";max-height:" + hintoffsetHeight + "px;overflow:auto";
        a.setAttribute("style", attr);
        //console.log("test--");
        /*
         setTimeout(
         function () {
         }, 19000);
         
         setTimeout(function() {
         // Whatever you want to do after the wait
         },500);
         */

        var checkvalid = checkvalidprop(inp);
        /*console.log("--nodetype="+nodetype);*/


        if (checkvalid === "" && !SHOW_ALL) {
            return;
        }

        var is_not_dot = false;

        if (nodetype === "command" && e.target.classList.contains("step")) {

            if (checkvalid.indexOf(".") > -1) {
                arr = rebind_reg_arr(checkvalid, regdivcontainer);
                is_not_dot = true;
                var checkarr = checkvalid.split(".");
                checkvalid = checkarr[checkarr.length - 1];
            } else {
                arr = create_reg_arr(regdivcontainer);
            }
        }


        /*var start=parseInt(val.indexOf(checkvalid));*/
        var curpost = getCaretPosition(inp);
        var start;
        start = curpost - checkvalid.length;
        var end = curpost;
        val = checkvalid;
        //alert("--val "+val);
        if (SHOW_ALL) {
            /*for each item in the array...*/
            for (var key in arr) {
                /*check if the item starts with the same letters as the text field value:*/
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML += key
                b.setAttribute("title", arr[key]);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + key + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    var str3 = inp.innerText.substring(0, start) + e.target.getElementsByTagName("input")[0].value + inp.innerText.substring(end, inp.innerText.length);

                    inp.innerText = str3;
                    //closeAllLists();

                });
                a.appendChild(b);

            }
            //SHOW_ALL=false;
            //alert("show all displar");
        } else {
            /*for each item in the array...*/
            for (var key in arr) {
                /*check if the item starts with the same letters as the text field value:*/
                if (key.substr(0, val.length).toUpperCase() === val.toUpperCase() || val.endsWith(".")) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + key.substr(0, val.length) + "</strong>";
                    b.innerHTML += key.substr(val.length);
                    b.setAttribute("title", arr[key]);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + key + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/
                        var str3 = inp.innerText.substring(0, start) + e.target.getElementsByTagName("input")[0].value + inp.innerText.substring(end, inp.innerText.length);

                        inp.innerText = str3;
                        closeAllLists();

                    });
                    a.appendChild(b);
                }
            }
        }
        return true;
        //        alert("all done");
    }

    function rebind_reg_arr(key, regcontain) {
        var dot_arr = key.split(".");
        var last_request = dot_arr[dot_arr.length - 2];

        var str = {};
        var ids_temps = regcontain.getElementsByClassName("name");
        var search_ele;

        for (var i = 0; i < ids_temps.length; i++) {
            if (ids_temps[i].innerText === last_request) {
                search_ele = ids_temps[i].parentElement.parentElement.parentElement;
            }
        }

        /*var cls=ids_temps[0].parentElement.parentElement.parentElement.getAttribute("class").split(" ")[0];*/
        var key_find_name = "name";
        var ids_temps;
        var clss = search_ele.getAttribute("class").split(" ")[0];
        if (clss === "reg") {
            key_find_name = "fieldname";
            ids_temps = search_ele.getElementsByClassName(key_find_name);
        } else if (clss === "section") {
            ids_temps = get_section_reglist(search_ele, regcontain);
        } else if (clss === "block") {
            ids_temps = get_block_reglist(search_ele, regcontain);
        } else if (clss === "chip") {
            ids_temps = get_chip_blocklist(search_ele, regcontain);
        }

        var str = {};
        for (var i = 0; i < ids_temps.length; i++) {
            try {
                str[ids_temps[i].innerText] = ids_temps[i].innerText;
            } catch (e) {
            }
        }

        return str;
    }

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x)
            return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length)
            currentFocus = 0;
        if (currentFocus < 0)
            currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
         except the one passed as an argument:*/

        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt !== x[i] && elmnt !== inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

}

/*IDS property list*/

var ids_sw_access = {"a0": "", "a1": "", "ro": "readonly", "wo": "writeonly", "w0t": "write 0 to toggle", "w0c": "write 0 to clear", "ws": "sw write to set", "wc": "sw write to clear",
    "wcrs": "sw write to clear, sw read to set", "wrs": "sw writable, sw read to set", "wrc": "sw writable, sw read to clear",
    "w0crs": "sw write zero to clear, sw read to set", "w0src": "sw write to set, sw read to clear", "w1src": "sw write one to set,  sw read to clear",
    "wsrc": "sw write to set, sw read to clear", "w1crs": "sw write one to clear, sw read to set", "r/wc": "write to clear",
    "w0s": "write zero to set", "w1s": "write one to set", "w1t": "write one to toggle", "w1c": "write one to clear", "rw": "read writable",
    "r/w0s": "sw readable, sw write zero to set", "r/w1s": "sw readable, sw write one to set", "r/w1c": "sw readable, sw write one to clear",
    "r/w0c": "sw readable, sw write zero to clear", "r/wc": "sw readable, sw write to clear", "r/ws": "sw readable, sw write to set",
    "r/w1t": "sw readable, sw write one to toggle", "r/w0t": "sw readable, sw write zero to toggle", "rc": "", "rs": ""};

var ids_hw_access = {"ro": "", "wo": "", "rw": ""};

var ids_command_hints = {write: "", call: "", switch : "", wait: "", if : "", for : "", assert: ""};

function bindJSONObj() {

    try {
        var doc = document.getElementsByClassName("ip")[0];
        if (doc) {
            var ip_name = doc.innerText.trim().split(".")[0];
            var document_name = getDocumentName().replace(".~$", "").split(".")[0];
            var regdiv;
            if (document_name === ip_name || getDocumentName() === ip_name) {
                regdiv = document.getElementById("regdivcontainer");
                var refdiv = document.getElementById("refdiv");
                if (refdiv) {
                    refdiv.innerHTML = "";
                }
            } else {
                regdiv = document.getElementById("refdiv");
            }

            regdivcontainer = regdiv;

            if (regdiv) {
                var str = {};
                str = create_reg_arr(regdiv);
                var steps = document.getElementsByClassName("step");
                for (var i = 0; i < steps.length; i++) {
                    autocomplete(steps[i], str);
                }

                var cmdvalue = document.getElementsByClassName("seqvalue");
                for (var i = 0; i < cmdvalue.length; i++) {
                    autocomplete(cmdvalue[i], str);
                }
            }
        }
    } catch (e) {
    }
}

function getCurrentDocumentPath() {
    var p = getDocumentName().replace(".~$", "").split(".")[0];
    return p + ".idsng";
}
function create_reg_arr(regdiv) {
    var ids_temps = regdiv.getElementsByClassName("idsTemp");
    var str = {};
    for (var i = 0; i < ids_temps.length; i++) {
        try {
            str[ids_temps[i].getElementsByClassName("name")[0].innerText] = ids_temps[i].getElementsByClassName("name")[0].innerText;
        } catch (e) {
        }
    }

    return str;
}

function get_section_reglist(section, refele) {
    console.log("call section");
    var tab_list = refele.getElementsByClassName("idsTemp");
    var reg_list = [];
    var start_reg = false;
    var clss;
    /*iterate on every idstemplate table*/
    for (var i = 0; i < tab_list.length; i++) {
        /*get the requested table*/
        if (tab_list[i].getAttribute("id") === section.getAttribute("id")) {
            start_reg = true;
            continue;
        }
        if (start_reg) {
            clss = tab_list[i].getAttribute("class").split(" ")[0];
            if (clss === "endreggroup") {
                break;
            } else if (clss === "reg") {
                reg_list.push(tab_list[i].getElementsByClassName("name")[0]);
            }
        }
    }
    return reg_list;
}

function get_block_reglist(block, refele) {
    var tab_list = refele.getElementsByClassName("idsTemp");
    var reg_list = [];
    var start_reg = false;
    var isreg_group_found = false;
    var clss;
    /*iterate on every idstemplate table*/
    for (var i = 0; i < tab_list.length; i++) {
        /*get the requested table*/
        if (tab_list[i].getAttribute("id") === block.getAttribute("id")) {
            start_reg = true;
            continue;
        }
        if (start_reg) {
            clss = tab_list[i].getAttribute("class").split(" ")[0];
            if (clss === "block") {
                break;
            } else if (clss === "section") {
                reg_list.push(tab_list[i].getElementsByClassName("name")[0]);
                isreg_group_found = true;
            } else if (clss === "endreggroup") {
                isreg_group_found = false;
            } else if (clss === "reg") {
                if (!isreg_group_found) {
                    /*console.log("--regname="+tab_list[i].getElementsByClassName("name")[0].innerText);*/
                    reg_list.push(tab_list[i].getElementsByClassName("name")[0]);
                }
            }
        }
    }
    return reg_list;
}

function get_chip_blocklist(block, refele) {
    var tab_list = refele.getElementsByClassName("idsTemp");
    var reg_list = [];
    var start_reg = false;
    /*iterate on every idstemplate table*/
    for (var i = 0; i < tab_list.length; i++) {
        /*get the requested table*/
        if (tab_list[i].getAttribute("id") === block.getAttribute("id")) {
            start_reg = true;
            continue;
        }
        if (start_reg) {
            if (tab_list[i].getAttribute("class").split(" ")[0] === "chip") {
                break;
            }
            if (tab_list[i].getAttribute("class").split(" ")[0] === "block") {
                /*console.log("--regname="+tab_list[i].getElementsByClassName("name")[0].innerText);*/
                reg_list.push(tab_list[i].getElementsByClassName("name")[0]);
            }
        }
    }
    return reg_list;
}

function getDocumentName() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    return page;
}

function load_ips(obj) {
    try {
        var refelement = document.getElementById("refdiv");
        if (refelement) {
            refelement.parentElement.removeChild(refelement);
            console.log("--ref element deleted !");
        }
    } catch (e) {
        console.log("Err load_ips : " + e.message);
    }


    var ip_name = obj.innerText.trim();
    var document_name = getDocumentName().split(".")[0];
    if (document_name === ip_name || getDocumentName() === ip_name) {
        /*regdivcontainer=document.getElementById("regdivcontainer");*/
        bindJSONObj();
    } else {
        try {
            clickController.getRegIPs(ip_name);
            bindJSONObj();
        } catch (e) {
        }
    }

}
/*****************************************Auto property hints work end*******************************************************/
var regdivcontainer;


/*****************************************Excel work starts from here*******************************************************/


function spreadsheetKeyEventHandler() {
}

function getAlphabetsForColumn(index) {
    var alphas = alphabets.split('');

    var num = index;
    var finalAlpa = "";
    while (num > -1) {
        if (num > 24) {
            finalAlpa = finalAlpa + alphas[0];
            num = num - 25;
        } else {
            finalAlpa = finalAlpa + alphas[num];
            num = -1;
        }
    }
    return finalAlpa;
}

function insertcolright() {
    addIntoHistory();
    while (clickedEl.tagName.toUpperCase() !== "TD") {
        clickedEl = clickedEl.parentNode;
    }
    var col_num = clickedEl.cellIndex;
    while (clickedEl.tagName.toUpperCase() !== "TABLE") {
        clickedEl = clickedEl.parentNode;
    }
    var table = clickedEl;

    var rows = table.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var newEl = document.createElement('td');

        if (i === 0) {
            newEl.innerHTML = '<div class="col"></div>';
        } else {
            newEl.setAttribute("tabindex", "0");
        }
        table.rows[i].cells[col_num].after(newEl);
    }
    reArrangeColNum(table);
    addIntoHistory();
}

function insertrowbelow() {
    addIntoHistory();
    while (clickedEl.tagName.toUpperCase() !== "TR") {
        clickedEl = clickedEl.parentNode;
    }
    var tabrow = clickedEl;

    while (clickedEl.tagName.toUpperCase() !== "TABLE") {
        clickedEl = clickedEl.parentNode;
    }
    var table = clickedEl;
    var row_num = tabrow.rowIndex;

    var row = table.insertRow(row_num + 1);
    row.setAttribute('class', 'edited');
    row.setAttribute('id', "tab" + Math.random());
    var col_count = table.getElementsByTagName("tr")[0].getElementsByTagName("td").length;
    var cell;
    for (var i = 0; i < col_count; i++) {
        cell = row.insertCell(i);
        if (i === 0) {
            cell.setAttribute("class", "leftheader");
        } else {
            cell.setAttribute("tabindex", "0");
        }
    }
    reArrangeRowNum(table);
    addIntoHistory();
}

function reArrangeRowNum(table) {
    var row = table.getElementsByClassName("leftheader");
    for (var i = 0; i < row.length; i++) {
        row[i].innerHTML = i + 1;
    }
}

function reArrangeColNum(table) {
    var col = table.rows[0].getElementsByTagName("td");
    for (var i = 1; i < col.length; i++) {
        col[i].innerHTML = getAlphabetsForColumn(i - 1);
    }
}

var excellastselect = document.createElement("div");

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var iscopy = true;
var row_copy_req = true;
var copycolele = null;
function cutrow(obj) {
    iscopy = false;
}

function copyrow_org(obj) {
    row_copy_req = true;
    /*copyrow=true;
     while(clickedEl.tagName.toUpperCase() !== "TR") {
     clickedEl = clickedEl.parentNode;
     }
     excellastselect=clickedEl.outerHTML;
     */
    excellastselect.innerHTML = "";
    while (clickedEl.tagName.toUpperCase() !== "TABLE") {
        clickedEl = clickedEl.parentNode;
    }
    var table = clickedEl;

    var tempTable = document.createElement("table");
    for (var i = 0; i < selected_rows.length; i++) {
        var tempRow = tempTable.insertRow(i);
        tempRow.innerHTML = table.rows[selected_rows[i]].outerHTML;
    }
    excellastselect.appendChild(tempTable);
}

function copyrow_org(obj) {
    row_copy_req = true;
    /*copyrow=true;
     while(clickedEl.tagName.toUpperCase() !== "TR") {
     clickedEl = clickedEl.parentNode;
     }
     excellastselect=clickedEl.outerHTML;
     */
    excellastselect.innerHTML = "";
    while (clickedEl.tagName.toUpperCase() !== "TABLE") {
        clickedEl = clickedEl.parentNode;
    }
    var table = clickedEl;

    var tempTable = document.createElement("table");
    var selection = window.getSelection();
    for (var i = 0; i < selected_rows.length; i++) {
        var tempRow = tempTable.insertRow(i);
        tempRow.innerHTML = table.rows[selected_rows[i]].outerHTML;
    }
    excellastselect.appendChild(tempTable);
}

var copiedrows = null;
var iscopy = false;
function copyrow(obj) {
    row_copy_req = true;
    if (copiedrows) {
        iscopy = true;
    }
    SELECTED_ROW = SELECTED_ROW_TEMP;
    //SELECTED_SINGLE_ROW=SELECTED_SINGLE_ROW_TEMP;
}

function copycolumn(obj) {
    row_copy_req = false;
    while (clickedEl.tagName.toUpperCase() !== "TD") {
        clickedEl = clickedEl.parentNode;
    }
    var cellindex = clickedEl.cellIndex;


    while (clickedEl.tagName.toUpperCase() !== "TABLE") {
        clickedEl = clickedEl.parentNode;
    }
    var table = clickedEl;
    var rows = table.rows;

    var temprow = document.createElement("tr");

    for (var i = 0; i < rows.length; i++) {
        var tempcol = temprow.insertCell(i);
        tempcol.innerHTML = rows[i].cells[cellindex].innerHTML;

        if (i > 0) {
            tempcol.setAttribute("tabindex", "0");
        }
    }
    copycolele = temprow;
    console.log("--tempcol=" + temprow.outerHTML);
}

function copyexcelrow() {
    try
    {
        iscopy = true;
        //var table = document.getElementById(tableID);
        var isrowdelete = false;
        var rowCount = table.rows.length;
        for (var i = 0; i < rowCount; i++)
        {
            var row = table.rows[i];
            var chkbox = row.cells[0].getElementsByTagName("input")[0];
            if (null !== chkbox && true === chkbox.checked)
            {
                var count = excelcount;
                var c = parseInt(count) - parseInt(1);
                if (rowCount <= 1)
                {
                    alert(msg_cannot_del_row);
                    break;
                }
                table.deleteRow(i);
                rowCount--;
                i--;
                excelcount = c;
                isrowdelete = true;
                /*$('#count').val(c);*/
            }
        }
        return isrowdelete;
    } catch (e)
    {
        alert(e);
    }
    return isrowdelete;
}

function pasterow_org(obj) {
    addIntoHistory();
    if (row_copy_req) {
        if (excellastselect) {

            while (clickedEl.tagName.toUpperCase() !== "TR") {
                clickedEl = clickedEl.parentNode;
            }
            var rowindex = clickedEl.rowIndex;
            while (clickedEl.tagName.toUpperCase() !== "TABLE") {
                clickedEl = clickedEl.parentNode;
            }
            var table = clickedEl;

            var rowCount = table.rows.length;
            var deleteCount = 0;
            var index = 0;
            var copiedRows = excellastselect.getElementsByTagName("table")[0].rows;

            for (var i = copiedRows.length - 1; i >= 0; i--) {
                var curRow = table.insertRow(rowindex + 1);
                curRow.innerHTML = copiedRows[i].innerHTML;
                curRow.setAttribute("id", "row" + Math.random());
            }

            reArrangeRowNum(table);
            excellastselect.innerHTML = "";
        }
    } else {
        while (clickedEl.tagName.toUpperCase() !== "TD") {
            clickedEl = clickedEl.parentNode;
        }
        var col_num = clickedEl.cellIndex;
        while (clickedEl.tagName.toUpperCase() !== "TABLE") {
            clickedEl = clickedEl.parentNode;
        }
        var table = clickedEl;

        var rows = table.getElementsByTagName("tr");
        if (copycolele) {
            for (var i = 0; i < rows.length; i++) {
                var newEl = document.createElement('td');

                if (i == 0) {
                    //newEl.innerHTML = '<div class="col"><input tabindex="-1" class="cellrb" name="col" type="radio"></div>';
                } else {
                    newEl.setAttribute("tabindex", "0");
                }
                newEl.innerHTML = copycolele.cells[i].innerHTML;
                table.rows[i].cells[col_num].after(newEl);

            }
        }
    }
    addIntoHistory();
}

function pasterow(obj) {
    addIntoHistory();
    if (row_copy_req) {
        while (clickedEl.tagName.toUpperCase() !== "TR") {
            clickedEl = clickedEl.parentNode;
        }
        var rowindex = clickedEl.rowIndex;

        while (clickedEl.tagName.toUpperCase() !== "TABLE") {
            clickedEl = clickedEl.parentNode;
        }
        var table = clickedEl;

        var spreadrowlist = document.getElementById("idsexcelcontainer").getElementsByClassName("exeltable")[0].getElementsByTagName("tr");

        var newrow;
        if (SELECTED_ROW.length > 0) {
            var curr_row;
            for (var i = 0; i < SELECTED_ROW.length; i++) {
                try {
                    var sel_row = SELECTED_ROW[i];

                    for (var j = 0; j < spreadrowlist.length; j++) {//we have to iterate on every row of spreadsheet table, to get row object by id becouse id search only on document level and we have same id in spreadsheet and doc
                        var spreadlist = spreadrowlist[j].getAttribute("id");

                        if (spreadlist && sel_row) {
                            if (spreadlist === sel_row) {
                                curr_row = spreadrowlist[j];
                                break;
                            }
                        }
                    }
                    if (curr_row) {
                        newrow = curr_row.cloneNode(true);
                        newrow.setAttribute("id", "row" + Math.random());
                        curr_row.parentNode.insertBefore(newrow, table.rows[rowindex].nextSibling);
                        rowindex++;
                    }
                } catch (e) {
                    console.log("Error (copy multiple row) : " + e.message);
                }
            }
        }
        /*else if(SELECTED_SINGLE_ROW){
         console.log("--single row : "+SELECTED_SINGLE_ROW.getAttribute("id"));
         }*/


        reArrangeRowNum(table);
        iscopy = false;
    } else {
        while (clickedEl.tagName.toUpperCase() !== "TD") {
            clickedEl = clickedEl.parentNode;
        }
        var col_num = clickedEl.cellIndex;
        while (clickedEl.tagName.toUpperCase() !== "TABLE") {
            clickedEl = clickedEl.parentNode;
        }
        var table = clickedEl;

        var rows = table.getElementsByTagName("tr");
        if (copycolele) {
            for (var i = 0; i < rows.length; i++) {
                var newEl = document.createElement('td');

                if (i === 0) {
                    //newEl.innerHTML = '<div class="col"><input tabindex="-1" class="cellrb" name="col" type="radio"></div>';
                } else {
                    newEl.setAttribute("tabindex", "0");
                }
                newEl.innerHTML = copycolele.cells[i].innerHTML;
                table.rows[i].cells[col_num].after(newEl);

            }
        }
    }
    addIntoHistory();
    //}
}

function pasteMultipleRows(table, curr_index) {
    try
    {
        addIntoHistory();
        var isrowdelete = false;
        var rowCount = table.rows.length;
        for (var i = rowCount - 1; i >= 0; i--)
        {
            try {
                var row = table.rows[i];

                var chkbox = row.cells[0].getElementsByTagName("input")[0];
                if (null != chkbox && true === chkbox.checked)
                {

                    var row2 = table.insertRow(curr_index + 1);
                    row2.innerHTML = row.innerHTML;
                    isrowdelete = true;
                }
            } catch (ee) {
            }
        }
        return isrowdelete;
    } catch (e)
    {
        console.log(e);
    }
    addIntoHistory();
    return isrowdelete;
}

function deleterow(obj) {
    addIntoHistory();
    var spreadrowlist = document.getElementById("idsexcelcontainer").getElementsByClassName("exeltable")[0].getElementsByTagName("tr");

    for (var i = 0; i < SELECTED_ROW_TEMP.length; i++) {
        try {
            var delid = SELECTED_ROW_TEMP[i];
            document.getElementById(SELECTED_ROW_TEMP[i]).remove();


            for (var j = 0; j < spreadrowlist.length; j++) {//we have to iterate on every row of spreadsheet table, to get row object by id becouse id search only on document level and we have same id in spreadsheet and doc
                var spreadlist = spreadrowlist[j].getAttribute("id");
                var sel_row = SELECTED_ROW_TEMP[i];
                if (spreadlist && sel_row && (spreadlist === sel_row)) {
                    spreadrowlist[j].remove();
                    break;
                }
            }
            if (curr_row) {
                newrow = curr_row.cloneNode(true);
                newrow.setAttribute("id", "row" + Math.random());
                curr_row.parentNode.insertBefore(newrow, table.rows[rowindex].nextSibling);
                rowindex++;
            }

        } catch (e) {
            console.log("Error (copy multiple row) : " + e.message);
        }
    }

    /*while(clickedEl.tagName.toUpperCase() !== "TABLE") {
     clickedEl = clickedEl.parentNode;
     }
     var table=clickedEl;
     
     var rowCount = table.rows.length;
     var deleteCount=0;
     var index=0;
     for(var i=0;i<selected_rows.length;i++){
     index=selected_rows[i]-deleteCount;
     table.deleteRow(index);
     deleteCount++;
     }
     */
    reArrangeRowNum(table);
    addIntoHistory();
}


function deletecolumn(obj) {
    addIntoHistory();
    while (clickedEl.tagName.toUpperCase() !== "TD") {
        clickedEl = clickedEl.parentNode;
    }
    var tabcell = clickedEl;


    while (clickedEl.tagName.toUpperCase() !== "TABLE") {
        clickedEl = clickedEl.parentNode;
    }
    var table = clickedEl;
    var exelrows = table.rows;
    var rows = table.rows;
    var cellindex = tabcell.cellIndex;
    for (var i = 0; i < rows.length; i++) {
        rows[i].deleteCell(cellindex);
    }
    reArrangeColNum(table);
    addIntoHistory();
}

function getHTMLOfSelection() {
    var range;
    if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        return range.htmlText;
    } else if (window.getSelection) {
        var selection = window.getSelection();
        if (selection.rangeCount > 0) {
            range = selection.getRangeAt(0);
            var clonedSelection = range.cloneContents();
            SELECTED_ROW_TEMP = [];
            for (var i = 0; i < clonedSelection.childNodes.length; i++) {
                try {
                    SELECTED_ROW_TEMP.push(clonedSelection.childNodes[i].getAttribute("id"));
                } catch (e) {
                    console.log("error in map : " + e.message);
                }
            }
            var div = document.createElement('div');
            div.appendChild(clonedSelection);
            return div.innerHTML;
        } else {
            return '';
        }
    } else {
        return '';
    }
}

var SELECTED_ROW = [];
var SELECTED_ROW_TEMP = [];
//var SELECTED_SINGLE_ROW;
//
//var SELECTED_SINGLE_ROW_TEMP;

function openexcelmenu(event) {
    event.preventDefault();
    var temp = getHTMLOfSelection();
    var cell = event.target;
    while (cell.tagName.toUpperCase() !== "TR") {
        cell = cell.parentNode;
    }
    if ($.inArray(cell.getAttribute("id"), SELECTED_ROW_TEMP) < 0) {
        SELECTED_ROW_TEMP.push(cell.getAttribute("id"));
    }
    var x = event.pageX;
    var y = event.pageY;
    $('#excelmenu').css({'display': 'block', 'left': x, 'top': y});

}

function openregmenu(event) {
    try {
        var tab = event.target.parentNode;
        while (tab.tagName.toUpperCase() !== "TABLE") {
            tab = tab.parentNode;
        }
        if (tab.classList.contains("custom_table")) {
            return false;
        }
    } catch (e) {

    }
    event.stopPropagation();
    event.preventDefault();
    var x = event.pageX;
    var y = event.pageY;
    $('#regmenu').css({'display': 'block', 'left': x, 'top': y});
    curr_row_obj = event.target.parentNode;
}

function maincontextcall() {
    $('#regmenuparam').css({'display': 'none'});
}

function openparamregmenu(event) {
    event.preventDefault();
    var x = event.pageX;
    var y = event.pageY;
    $('#regmenuparam').css({'display': 'block', 'left': x, 'top': y});
    curr_row_obj = event.target.parentNode;
}

function openseqmenu(event) {
    var seqcls;

    var obj = event.target;
    while (obj.tagName.toUpperCase() !== "TABLE") {
        obj = obj.parentNode;
    }


    var clslist = obj.classList;

    if (clslist.contains("command")) {
        seqcls = "command";
    } else if (clslist.contains("var")) {
        seqcls = "var";
    }
    if (clslist.contains("const")) {
        seqcls = "const";
    }
    if (clslist.contains("arg")) {
        seqcls = "arg";
    }

    if (seqcls) {
        event.preventDefault();
        var x = event.pageX;
        var y = event.pageY;
        $('#seqmenu').css({'display': 'block', 'left': x, 'top': y});
        curr_row_obj = event.target.parentNode;
    }
}

function hidetemplate() {
    document.getElementById("exceltemplate").style.display = "none";
    $("#backhidder").css("z-index", "-1")
}

function showTemplate() {
    document.getElementById("exceltemplate").style.display = "block";
    $("#backhidder").css("z-index", "0");
}

function deletetemprow(row) {
    var rowindex = row.parentNode.parentNode.rowIndex;
    while (row.tagName.toUpperCase() !== "TABLE") {
        row = row.parentNode;
    }
    row.deleteRow(rowindex);
}

function addtemprow(row) {
    var rowindex = row.parentNode.parentNode.rowIndex;
    while (row.tagName.toUpperCase() !== "TABLE") {
        row = row.parentNode;
    }

    var table = row;

    var newrow = table.insertRow(parseInt(rowindex + 1));
    var cell = newrow.insertCell(0);
    cell.innerHTML = "<a href='#' onclick='addtemprow(this);' title='add row' >+</a><span> </span><a title='delete row' href='#' onclick='deletetemprow(this);' >x</a>";

    newrow.insertCell(1);
    newrow.insertCell(2);
}

function resizeexcel() {
    var exceltab = document.getElementById("idsexcelcontainer").getElementsByClassName("exeltable");
    for (var i = 0; i < exceltab.length; i++) {
        var td = exceltab[i].getElementsByTagName("td");
        for (var j = 0; j < td.length; j++) {
            var div = td[j].getElementsByTagName("div")[0];
            if (div) {
                div.style.removeProperty("width");
                div.style.removeProperty("height");
            }
        }
    }
}

var excelcount = 1;
function deleteExcelRow(table) {
    try
    {
        //var table = document.getElementById(tableID);
        var isrowdelete = false;
        var rowCount = table.rows.length;
        for (var i = 0; i < rowCount; i++)
        {
            var row = table.rows[i];
            var chkbox = row.cells[0].getElementsByTagName("input")[0];
            if (null !== chkbox && true === chkbox.checked)
            {
                var count = excelcount;
                var c = parseInt(count) - parseInt(1);
                if (rowCount <= 1)
                {
                    alert(msg_cannot_del_row);
                    break;
                }
                table.deleteRow(i);
                rowCount--;
                i--;
                excelcount = c;
                isrowdelete = true;
                /*$('#count').val(c);*/
            }
        }
        return isrowdelete;
    } catch (e)
    {
        alert(e);
    }
    return isrowdelete;
}

function deleteExcelCol(table) {
    var cellrb = table.getElementsByClassName("cellrb");
    for (var i = 0; i < cellrb.length; i++) {
        if (null !== cellrb[i] && cellrb[i].checked === true) {
            var cellInex = cellrb[i].parentNode.parentNode.cellIndex;
            var rows = table.rows;
            for (var i = 0; i < rows.length; i++) {
                rows[i].deleteCell(cellInex);
            }
            break;
        }
    }
}

//navigation arrow functionality work start
var active = 0;
$('#navigate td').each(function (idx) {
    $(this).html(idx);
});
rePosition();

function initilizeCursorPosForSpread(obj) {
    var cellIndex = $(obj).index();
    var row = $(obj).parent();
    var rowlength = row.find("td").length;
    var rowIndex = row.index();
    var cellNumber = rowIndex * (rowlength) + cellIndex;
    active = cellNumber;
    var active_element = document.getElementsByClassName("active")[0];
    rePosition();
}

var curr_cell_num = -1;
function reCalculate(e) {
    var rows = document.getElementById("idsexcelcontainer").getElementsByClassName("exeltable")[0].rows.length; //$('#navigate tr').length;
    var columns = document.getElementById("idsexcelcontainer").getElementsByClassName("exeltable")[0].rows[0].cells.length;// $('#navigate tr:eq(0) td').length;
    //alert(columns + 'x' + rows);

    if (e.keyCode === 37) { //move left or wrap
        active = (active > 0) ? active - 1 : active;
        e.preventDefault();
    } else if (e.keyCode === 38) { // move up
        active = (active - columns >= 0) ? active - columns : active;
        e.preventDefault();
    } else if (e.keyCode === 39) { // move right or wrap
        active = (active < (columns * rows) - 1) ? active + 1 : active;
        e.preventDefault();
    } else if (e.keyCode === 40) { // move down
        active = (active + columns <= (rows * columns) - 1) ? active + columns : active;
        e.preventDefault();
        return false;
    } else if (e.keyCode === 13) {
        try {
            if (curr_cell_num === active) {

            } else {
                placeCaretAtEnd(document.getElementsByClassName("active")[0]);
                e.preventDefault();
            }
            curr_cell_num = active;
        } catch (e) {
            alert("err " + e.message);
        }
    }
}


function rePosition() {
    $('.active').removeClass('active');
    $('#selectable_del tr td').eq(active).addClass('active');
    scrollInView();
}

function scrollInView() {
    var target = $('#selectable_del tr td:eq(' + active + ')');
    if (target.length)
    {
        var top = target.offset().top;

        $('html,body').stop().animate({scrollTop: top - 100}, 400);
        return false;
    }
}

//navigation arrow functionality end

function toggleParamDiffPanel() {
    var mainDiv = document.getElementById("maindivcontainer");
    var paramDivPanel = document.getElementById("div_right_pane");
    var minMax = document.getElementById("param_minmax");
    if (minMax.classList.contains("fa-expand")) {
        minMax.classList.remove("fa-expand");
        mainDiv.classList.remove("minmainDiv");
        paramDivPanel.style.display = "none";
    } else {
        minMax.classList.add("fa-expand");
        mainDiv.classList.add("minmainDiv");
        paramDivPanel.style.display = "block";
    }
    if (minMax.classList.contains('fa-expand'))
    {
        minMax.setAttribute("title", "Collapse Diff Viewer");
    } else {
        minMax.setAttribute("title", "Expand Diff Viewer");
    }
}




/*****************************************Excel work end here*******************************************************/
