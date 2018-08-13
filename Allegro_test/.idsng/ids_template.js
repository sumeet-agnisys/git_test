/*************************************************************************param view start*********************************************************************/

function showParamView() {
	document.getElementById("paramcontainer").style.display = "block";
	document.getElementById("regdivcontainer").style.display = "none";
}

function hideregview() {
	document.getElementById("paramcontainer").style.display = "block";
	document.getElementById("regdivcontainer").style.display = "none";
}

function updateParamView(str) {
	document.getElementById("regdivcontainer").innerHTML = str;
}

function regviewupdate(str) {
	document.getElementById("regdivcontainer").innerHTML = str;
	document.getElementById("paramcontainer").style.display = "none";
	document.getElementById("regdivcontainer").style.display = "block";
}
var menuDisplayed = false;
var menuBox = null;

function clearall() {
	document.getElementById("paramcontainer").innerHTML = "";
	document.getElementById("regdivcontainer").innerHTML = "";
}
var bodyArr = {};
var index = 0;

function addIntoHistory() {
	bodyArr[index] = document.body.innerHTML;
	index++;
}

function KeyPress(e) {
	var evtobj = window.event ? event : e; /*undo*/
	if (evtobj.keyCode === 90 && evtobj.ctrlKey) {
		if (typeof(bodyArr[index - 1]) !== 'undefined' && bodyArr[index - 1] !== null) {
			index--;
			document.body.innerHTML = bodyArr[index];
		}
		return false;
	} /*redo*/
	else if (evtobj.keyCode === 89 && evtobj.ctrlKey) {
		if (typeof(bodyArr[index + 1]) !== 'undefined' && bodyArr[index + 1] !== null) {
			index++;
			document.body.innerHTML = bodyArr[index];
		}
		return false;
	}
}
document.onkeydown = KeyPress;

function writeparam(str) {
	document.getElementById("paramcontainer").innerHTML = str;
	document.getElementById("paramcontainer").style.display = "block";
	addIntoHistory();
} 
var regsource;

function initilizeParamEvents(){

	/* Events fired on the drag target */
	document.getElementById("paramcontainer").addEventListener("dragstart", function(event) { /* The dataTransfer.setData() method sets the data type and the value of the dragged data*/		
		event.dataTransfer.setData("Text", event.target.id); /* Output some text when starting to drag the p element					document.getElementById("demo").innerHTML = "Started to drag the p element.";*/ /* Change the opacity of the draggable element*/
		event.target.style.opacity = "0.4"; /*event.target.style.backgroundColor="transparent";*/ /*console.log("drag target="+event.target.id);*/
		try{
			document.getElementById("scroller").style="display:block";		
		}
		catch(e){}
	}); /* While dragging the p element, change the color of the output text				this event fire when drag starts.				event.target have source element object*/
	document.getElementById("paramcontainer").addEventListener("drag", function(event) { /*document.getElementById("demo").style.color = "red";*/
		event.target.parentElement.style.backgroundColor = "white";
		regsource = event; /*console.log("source index="+regsource.target.parentElement.cellIndex);*/
	}); /* Output some text when finished dragging the p element and reset the opacity*/
	document.getElementById("paramcontainer").addEventListener("dragend", function(event) { /*document.getElementById("demo").innerHTML = "Finished dragging the p element.";*/
		event.target.style.opacity = "1";
	}); /* Events fired on the drop target */ /* When the draggable p element enters the droptarget, change the DIVS's border style*/
	document.getElementById("paramcontainer").addEventListener("dragenter", function(event) {
		if (event.target.className == "droptarget") {
			event.target.style.border = "2px solid red";
		}
	}); /* By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element*/
	document.getElementById("param_main").addEventListener("dragover", function(event) {
		event.preventDefault();
		if(event.target.id=="scr_down"){
			window.scrollBy(0,20);
		}
		else if(event.target.id=="scr_up"){
			window.scrollBy(0,-20);
		}
	}); /* When the draggable p element leaves the droptarget, reset the DIVS's border style*/
	document.getElementById("paramcontainer").addEventListener("dragleave", function(event) {
		if (event.target.className == "droptarget") {
			event.target.style.border = "";
		}
	}); /* On drop - Prevent the browser default handling of the data (default is open as link on drop)   Reset the color of the output text and DIV's border color   Get the dragged data with the dataTransfer.getData() method   The dragged data is the id of the dragged element ("drag1")   Append the dragged element into the drop element*/
	document.getElementById("paramcontainer").addEventListener("drop", function(event) {
		event.preventDefault();	
		try{
			document.getElementById("scroller").style="display:none";
		}
		catch(e){}
		if (event.target.className == "droptarget") {
			try {
				var vali = validateCell(event);
				if (vali) {
					console.log("Warning : Space is full");
					event.target.style.border = "";
					regsource.target.style.backgroundColor = "#d4e0e2";
				} else { /*document.getElementById("demo").style.color = "";*/
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
						if ((typeof(temp) === "undefined" || temp === null)) {
							reversecell++;
							temp = event.target.closest("tr").cells[cellindex - reversecell].innerHTML.trim();
							if (temp == '') {
								event.target.closest("tr").cells[cellindex - reversecell].remove();
							}
						} else {
							temp = temp.innerHTML.trim();
							if (temp === "") {
								event.target.closest("tr").cells[cellindex + 1].remove();
							} else {
								reversecell++;
								temp = event.target.closest("tr").cells[cellindex - reversecell + 1].getElementsByTagName("p")[0];
								if ((typeof(temp) !== "undefined" || temp !== null)) {
									var iiid = temp.id;
									if (iiid === regsource.target.id) {
										var j;
										var delindex = cellindex - reversecell ;
										var counter = 0;
										for (j = i; j < range; j++) {
											event.target.closest("tr").cells[delindex - counter].remove();
											counter++;
										}
										break;
									}
								} /*										temp=event.target.closest("tr").cells[cellindex-reversecell].innerHTML.trim();										console.log("--reverseTtemp="+temp+"--index="+(cellindex-reversecell));										console.log("--reverseTtemp="+temp+"--index="+event.target.closest("tr").cells[cellindex-reversecell+1].innerHTML.trim());										console.log("--reverseTtemp="+temp+"--index="+event.target.closest("tr").cells[cellindex-reversecell-2].innerHTML.trim());*/
								if (temp == '') {
									event.target.closest("tr").cells[cellindex - reversecell].remove();
								}
							}
						} /*								if((typeof(temp) === "undefined" || temp === null)||((typeof(temp) === "undefined" || temp === null)&&																					 temp==='')){									event.target.closest("tr").cells[cellindex+1].remove();cell index remain same after deletion, hence it is fixed index deletion								}								else if(temp!==''){									reversecell++;									temp=event.target.closest("tr").cells[cellindex-reversecell].innerHTML.trim();									if(temp==''){										event.target.closest("tr").cells[cellindex-reversecell].remove();									}								}								*/
					}
				}
			} catch (ex) {
				console.log("Error dop event : " + ex.message);
			}
			addIntoHistory();
		} else {
			regsource.target.style.backgroundColor = "#d4e0e2";
		}
	});
}
function validateCell(src) {
	var cellindex = src.target.cellIndex;
	var d = regsource.target.getAttribute("data-size");
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
			console.log("--i=" + i + "--currcell=" + currcell);
			if ((typeof(currcell) === "undefined" || currcell === null)) {
				console.log("cell not exist");
				iscellavail = false;
			} else {
				if (currcell.innerHTML.trim() != "") {
					descId = currcell.getElementsByTagName("p")[0];
					if ((typeof(descId) !== "undefined" && descId !== null)) {
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
			console.log("---------------------start--------------------------");
			console.log("-----------------------------------------------");
			console.log("-----------------------------------------------");
			iteratedcell++;
			var previndex = cellindex - iteratedcell; /*now look prev cell for availbility*/
			console.log("--index=" + previndex);
			currcell = src.target.closest("tr").cells[previndex];
			console.log("--i=" + i + "--currcell=" + currcell);
			if ((typeof(currcell) === "undefined" || currcell === null)) {
				console.log("cell not exist");
				iscellavail = false;
				break;
			} else {
				console.log("--class exist="+ currcell.classList.contains("droptarget"));
				if(!currcell.classList.contains("droptarget")){
					iscellavail = false;
					break;
				}
				if (currcell.innerHTML.trim() != "") {
					descId = currcell.getElementsByTagName("p")[0];
					if ((typeof(descId) !== "undefined" || descId !== null)) {
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
			console.log("---------------------end--------------------------");
			console.log("-----------------------------------------------");
			console.log("-----------------------------------------------");
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







var showProp = "Show Prop";
var hideProp = "Hide Prop";
var showDesc = "Show Desc";
var hideDesc = "Hide Desc";
var curr_row;
var curr_row_signal;
var query="";
var random_Num;
var isTabFocus=false;
var tabToolbar;
var clipboard_tab=null;
var tempTable;
var isrowselected=false;
var curr_row_obj=null;
var isFileSaved=true;
var DESC_CLS_OBJ_LIST=[];
var ids_json;
var clickedEl = null;
var selected_rows=[];
var alphabets='ABCDEFGHIJKLMNOPQRSTUVWXYZ';


$(document).ready(function(){
	bindJSONObj();

	ids_json = JSON.parse(idsobjects);

	$('body').not("#autocomplete-list").click(function() {
		$('#autocomplete-list').hide();
	});

	$('body').on('focusin', '.desc', function() {
		var isobfound=false;
		for(var ob in DESC_CLS_OBJ_LIST){
			if(DESC_CLS_OBJ_LIST[ob]===this){
				isobfound=true;				
				break;
			}
		}
		if(!isobfound){
			DESC_CLS_OBJ_LIST.push(this);
			autocomplete(this,idsprop);
		}		
	});

	$('body').on('focusin', '.propclass', function() {
		var isobfound=false;
		for(var ob in DESC_CLS_OBJ_LIST){
			if(DESC_CLS_OBJ_LIST[ob]===this){
				isobfound=true;				
				break;
			}
		}
		if(!isobfound){
			DESC_CLS_OBJ_LIST.push(this);
			autocomplete(this,idsprop);
		}
	});

	$('body').on('focusin', '.sw', function() {
		var isobfound=false;
		for(var ob in DESC_CLS_OBJ_LIST){
			if(DESC_CLS_OBJ_LIST[ob]===this){
				isobfound=true;				
				break;
			}
		}
		if(!isobfound){
			DESC_CLS_OBJ_LIST.push(this);
			autocomplete(this,ids_sw_access);
		}
	});

	$('body').on('focusin', '.hw', function() {
		var isobfound=false;
		for(var ob in DESC_CLS_OBJ_LIST){
			if(DESC_CLS_OBJ_LIST[ob]===this){
				isobfound=true;				
				break;
			}
		}
		if(!isobfound){
			DESC_CLS_OBJ_LIST.push(this);
			autocomplete(this,ids_hw_access);
		}
	});

	/*evt.keyCode==80&&evt.altKey*/

	$('.fieldname').keyup(function(){	
		var value=$(this).val();		
		if(value!==""){			
			if(!/^[a-zA-Z][a-z0-9._\-]*$/.test(value)){	
				console.log("Error not valid");			
				return false;			
			}		
		}	
	});	

	$('.descInput').keyup(function(){		
		auto_grow(this);	
	});	

	$('.propInput').keyup(function(){		
		auto_grow(this);	
	});

	document.getElementById("idsexcelcontainer").addEventListener("click",function(event){
		$('#excelmenu').css({'display':'none'});
	});


	document.getElementById("spreadsheetcontainer").addEventListener("mousedown", function(event){
		//right click
		if(event.button == 2) { 
			clickedEl = event.target;
		}
	}, true);


	$("#menucopy").hover(function(){
		var x=event.pageX;
		var spreadwidth=$( "#spreadsheetcontainer" ).width();
		if((spreadwidth-x)<100){
			$("#submenucopy").css("left", "-100%");	
		}
		else{
			$("#submenucopy").css("left", "100%");	
		}

		$("#submenucopy").css("display", "block");
	}, function(){
		$("#submenucopy").css("display", "none");
	});

	$("#menudelete").hover(function(event){
		var x=event.pageX;
		var spreadwidth=$( "#spreadsheetcontainer" ).width();
		if((spreadwidth-x)<100){
			$("#submenudelete").css("left", "-100%");	
		}
		else{
			$("#submenudelete").css("left", "100%");
		}
		$("#submenudelete").css("display", "block");
	}, function(){
		$("#submenudelete").css("display", "none");
	});

	$(".submenu").hover(function(){
		$(this).css("display", "block");
	}, function(){
		$(this).css("display", "none");
	});

	document.getElementById("backhidder").addEventListener("click",function(e){ hidetemplate()});
	document.getElementById("spreadsheetcontainer").getElementsByClassName("exeltable")[0].addEventListener("keydown",function(e){ spreadsheetKeyEventHandler()});


	$( "#selectable" ).selectable({
		selected: function() {
			//var result = $( "#result" ).empty();
			selected_rows=[];

			$( ".ui-selected", this ).each(function() {

				var index = $( "#selectable tr" ).index( this );
				if(index>-1){
					selected_rows.push(index);
				}
				//result.append( ( index + 1 ) );
				//result.append( " ," );
			});
		}
	});

	$("#selectable").on('click','td',function(source) { 
		var source = event.target || event.srcElement;
		try{
			placeCaretAtEnd(source);
		}catch(e){alert("Err "+e.message);}
		$('#excelmenu').css({'display':'none'});
	});

	initilizeParamEvents();

	document.getElementById("scr_up").addEventListener("click",function(e){ 
		window.scrollBy(0,-20);
	});

	document.getElementById("scr_down").addEventListener("click",function(e){ 
		window.scrollBy(0,20);
	});

});



function placeCaretAtEnd(el) {
	el.focus();
	if (typeof window.getSelection != "undefined"
		&& typeof document.createRange != "undefined") {
		var range = document.createRange();
		range.selectNodeContents(el);
		range.collapse(false);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	} else if (typeof document.body.createTextRange != "undefined") {
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(el);
		textRange.collapse(false);
		textRange.select();
	}
}

$(document).bind("click", function(event) {
	/*document.getElementById("rmenu").className = "hide";*/
});

function hintlistner(event){
	if(event.keyCode==13){
		var val=document.getElementById("inputhint").value;
		document.getElementById("divhint").closest("td").append(" "+val);
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
	if(evt.keyCode===9){
		console.log('n='+obj.tagName.toUpperCase());
		while(obj.tagName.toUpperCase() !== "DIV") {
			console.log('n='+obj.tagName.toUpperCase());
			obj = obj.parentNode;
		}


		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeydown','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','field');		
		var input;
		var cell;

		cell=row.insertCell(0);		
		cell.setAttribute('class', 'bits');     
		input=document.createElement("input");
		input.setAttribute('style','width:88%');
		var rowdel=document.createElement("a");
		rowdel.innerText='x';
		rowdel.setAttribute('title','delete this row');
		rowdel.setAttribute('style','color:red');
		rowdel.setAttribute('onclick','deleteRow(this);');
		cell.appendChild(rowdel);
		cell.appendChild(input);


		cell=row.insertCell(1);
		cell.setAttribute('class', 'fieldname');  
		input=document.createElement("input");
		cell.appendChild(input);


		cell=row.insertCell(2);
		cell.setAttribute('class','sw thirdCell');
		input=document.createElement("input");
		cell.appendChild(input);


		cell=row.insertCell(3);
		cell.setAttribute('class','hw thirdCell');
		input=document.createElement("input");
		cell.appendChild(input);


		cell=row.insertCell(4);
		cell.setAttribute('onkeydown',"insertNewRow(event,this);");
		cell.setAttribute('class','default');
		input=document.createElement("input");
		cell.appendChild(input);

	}
	/*add property row*/
	else if(evt.keyCode==80&&evt.altKey){
		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}

		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeydown','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		var input;
		var cell;

		cell=row.insertCell(0);		
		cell.setAttribute('colspan', '5');    
		cell.setAttribute('onkeydown',"insertNewRow(event,this);");
		cell.setAttribute('class','propclass');
		console.log('add prop');
		input=document.createElement("textarea");  
		input.setAttribute('class','propInput');
		cell.appendChild(input);

	}
}


$('.field').click(function(){
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
	var elemen=document.getElementById(el);
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


var isrowselected=false;
var prevTab=null;

function mainbodyclick(){}

function tabClick(ele){
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

function setCurrRowSignal(currnRow){
	curr_row_signal=currnRow.rowIndex;
}

var isCut=false;


var copyClipBoardTab;
function copyIDSTab(){	
	isCut=false;
	/*clipboard_tab=document.getElementById(clsTab);*/
	copyClipBoardTab=$(document.getElementById(clsTab)).prop('outerHTML');
}
function pasteIDSTab(){
	try{
		addIntoHistory();
		var tab="<table contenteditable='false' class='reg idsTemp' id='tab1' style='box-shadow: rgb(128, 128, 128) 1px 1px 1px;'><tbody><tr ><td class='header readOnly'>hell</td><td title='egister name' class='name' contenteditable='false'></td><td title='offset' class='offset'></td><td class='address addCell readOnly'><div class='splitVer setBorder' title='Address'><label class='label'>Address |</label><label></label></div><div class='splitVer' title='Default'><label class='label'>Default |</label><label></label></div> </td></tr><tr><td colspan='5' title='add properties' class='propclass prop'></td></tr>";
		document.execCommand("insertHTML", false, copyClipBoardTab);	


		if(isCut==true){
			selectElementContents(document.getElementById(clsTab));
			document.execCommand('delete');
			isCut=false;
		}
		clipboard_tab=null;

		setTabID();
	}
	catch(e){
		alert("Err paste : "+e.message);
	}
}
function cutIDSTab(){
	isCut=true;
	clipboard_tab=clsTab;

	copyClipBoardTab=$(document.getElementById(clsTab)).prop('outerHTML');
}

function copy(){
	var p=document.execCommand('copy'); 
}
function cut(){
	document.execCommand('cut');
}
function CopyStr(){
	var p=document.execCommand('copy'); 
}
function paste(){
	addIntoHistory();
	var p=document.execCommand('paste');
}
function undo(){
	var p=document.execCommand('undo');
}
function redo(){
	document.execCommand('redo');
}
function deleteHtml(){
	addIntoHistory();	
	var p=document.execCommand('delete');
}

function selectAllStr(){
	var p=document.execCommand('selectAll', false, null);
}

function setBold(){
	document.execCommand('bold');
}
function setItalic(){
	document.execCommand('italic');
}
function setUnderline(){
	document.execCommand('underline');
}

function setAlignLeft(){
	document.execCommand('justifyLeft');
}

function setAlignRight(){
	document.execCommand('justifyRight');
}
function setAlignCenter(){
	document.execCommand('justifyCenter');
}
function setAlignFull(){
	document.execCommand('justifyFull');
}


function setOrderedList(){
	document.execCommand('insertOrderedList');
}
function setUnOrderedList(){
	document.execCommand('insertUnorderedList');
}

function setStrikeThrough(){
	document.execCommand('strikeThrough');
}
function setSubscript(){
	document.execCommand('subscript');
}
function setSuperscript(){
	document.execCommand('superscript');
}

function setIncreaseSize(){
	document.execCommand('increaseFontSize');
}
function setDecreaseSize(){
	document.execCommand('decreaseFontSize');
}

function setFontName(fontName){
	document.execCommand("fontName", false, fontName);
}

function setFormatsName(formatsName){
	document.execCommand("formatBlock", false, formatsName);	
}

function setFontSize(fontSize){
	document.execCommand("fontSize", false, fontSize);
}


function insertHTML(img) {
	var id = "rand" + Math.random();
	img = "<img src=\"" + img + "\" id=" + id + ">";
	if(document.all) {
		var range = document.selection.createRange();
		range.pasteHTML(img);
		range.collapse(false);
		range.select();
	} else {
		document.execCommand("insertHTML", false, img);
	}
	return document.getElementById(id);
};

var TRange = null;
function findString(str) {
	if (parseInt(navigator.appVersion) < 4) return;
	var strFound;
	if (window.find) {

		/* CODE FOR BROWSERS THAT SUPPORT window.find*/
		strFound = self.find(str);
		if (!strFound) {
			strFound = self.find(str, 0, 1);
			while (self.find(str, 0, 1)) continue
		} else {
			return true;
		}
	}
	else if (navigator.appName.indexOf("Microsoft") != -1) {

		/* EXPLORER-SPECIFIC CODE*/
		if (TRange != null) {
			TRange.collapse(false);
			strFound = TRange.findText(str);
			if (strFound) {
				TRange.select();
				return true;
			}
		}
		if (TRange == null || strFound == 0) {
			TRange = self.document.body.createTextRange();
			strFound = TRange.findText(str);
			if (strFound) {
				TRange.select();
				return true;
			}
		}
	}
	else if (navigator.appName == "Opera") {
		return false;
	}
	return false;
}

function findReplaceString(str,newStr) {
	document.body.innerText.replace(new RegExp(str, 'g'), newStr);

}


var clsTab=null;


function deleteRow(obj){
	curr_row_obj=obj;	
}




/*@JAVAFX*/
function setTabID(){
	var idsTables = document.getElementsByClassName("idsTemp");
	for(var i = 0; i < idsTables.length; i++)
	{
		random_Num=Math.random();
		/*idsTables[i].setAttribute('id','tab'+i);*/
		idsTables[i].setAttribute('id','tab'+i+random_Num);
	}
	var field = document.getElementsByClassName("field");
	for(var i = 0; i < field.length; i++)
	{
		random_Num=Math.random();
		field[i].setAttribute('id','tabf'+i+random_Num);
	}
	var edited = document.getElementsByClassName("edited");
	for(var i = 0; i < edited.length; i++)
	{
		random_Num=Math.random();
		edited[i].setAttribute('id','tabed'+i+random_Num);
	}
}

/*JAVAFX*/
function setSpreadsheetID(){
	try{
		var  idsTables=document.getElementById("spreadsheetcontainer").getElementsByClassName("exeltable")[0].getElementsByTagName("tr");
		for(var i = 0; i < idsTables.length; i++)
		{
			random_Num=Math.random();
			/*idsTables[i].setAttribute('id','tab'+i);*/
			idsTables[i].setAttribute('id','tab'+i+random_Num);
		}
	}
	catch(e){}
}


function getFirstClass(classArry){
	return classArry.split(' ')[0];
}

function auto_grow(element) {
	element.style.height = "5px";
	element.style.height = (element.scrollHeight)+"px";
}

var parser = new DOMParser();

function htmlToElements(html) {
	var doc = parser.parseFromString(html, "text/html");
	return doc.getElementsByClassName("idsTemp")[0];
	/*
	var template = document.createElement('template');
	template.innerHTML = html;
	return template.childNodes[0];
	*/
}

function addstrToCaret(element){
	return "<br>"+element.outerHTML+"<br>";
}

function getRandomNum(){
	return Math.random().replace(".","_");
}

function insertSystem(imgPath){
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.system);
	element.id='tab_system'+random_Num;
	/*query="<table contenteditable='false' class='system idsTemp' onclick='tabClick(this)' id='tab_system"+random_Num+"'><tbody><tr><td class='header readOnly' style='width:105px;'></td><td title='system name' class='name wideWidthName'>system_name</td><td class='specImage'><img title='System' alt='System' src="+imgPath+"></td><td class='address addCell readOnly'><label class='label'>address|</label><label class='addrvalue' title='address'></label></td></tr><tr><td colspan='5'  title='add properties' class='propclass'></td></tr><tr><td colspan='5' title='add description here' class='desc descclass'></td></tr></tbody> </table><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}

function insertBoard(imgPath){
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.board);
	element.id='tab_board'+random_Num;
	/*query="<table contenteditable='false' class='board idsTemp' onclick='tabClick(this)' id='tab_board"+random_Num+"'> <tbody><tr><td class='header readOnly' style='width:105px;'></td><td title='board name' class='name wideWidthName'>board_name</td>     <td class='specImage'><img title='Board' alt='Board' src="+imgPath+"></td><td class='address addCell readOnly'><label class='label'>address|</label><label class='addrvalue' title='address'></label></td></tr><tr ><td colspan='5' title='add properties'  class='propclass'></td></tr><tr ><td colspan='5' title='add description here' class='desc descclass'></td></tr></tbody></table><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}


function insertChip(imgPath){
	addIntoHistory();
	random_Num=Math.random();

	var element=htmlToElements(ids_json.chip);
	/*var element=$.parseHTML(ids_json.chip);*/

	element.id='tab_chip'+random_Num;
	/*query="<table contenteditable='false' class='chip idsTemp' onclick='tabClick(this)' id='tab_chip"+random_Num+"'><tbody><tr><td class='header readOnly'></td> <td title='chip name' class='name'>chip_name</td><td title='offset' class='offset'></td><td class='specImage'><img title='Chip' alt='Chip' src="+imgPath+"></td><td class='address addCell readOnly'><label class='label'>address|</label><label class='addrvalue' title='address'></label></td></tr><tr><td colspan='5' title='add properties'  class='propclass'></td></tr><tr><td colspan='5' title='add description here' class='desc descclass'></td></tr></tbody></table><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}

function insertBlock(imgPath){
	addIntoHistory();
	random_Num=Math.random();

	var element=htmlToElements(ids_json.block);
	element.id='tab_block'+random_Num;
	/*query="<br><table contenteditable='false' class='block idsTemp' onclick='tabClick(this)' id='tab_block"+random_Num+"'><tbody><tr><td class='header readOnly'></td><td title='block name' class='name'>block_name</td><td title='offset' class='offset'></td><td class='specImage'><img title='Block' alt='Block' src="+imgPath+"></td><td class='address addCell readOnly'><label class='label'>address|</label><label class='addrvalue' title='address'></label></td></tr><tr><td colspan='5' title='add properties' class='propclass'></td></tr><tr><td colspan='5' title='add description here' class='desc descclass'></td></tr></tbody> </table><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}

function insertRegGroup(imgPath){
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.reggroup);
	var endreggroup=htmlToElements(ids_json.endreggroup);
	element.id='tab_reggroup'+random_Num;
	endreggroup.id='tab_endreggroup'+random_Num;
	query="<br>"+element.outerHTML+"<br><br><br><br>"+endreggroup.outerHTML+"<br>";
	/*query="<table contenteditable='false' class='section idsTemp' onclick='tabClick(this)' id='tab_section"+random_Num+"'><tbody><tr><td class='header readOnly'></td><td class='name' title='reg group name'>reggroup_name</td><td title='offset' class='offset'></td><td class='specImage'><img title='RegGroup' alt='RegGrou[]' src="+imgPath+"></td><td class='address addCell readOnly'><label class='label'>address|</label><label class='addrvalue' title='address'></label></td></tr><tr><td colspan='5' title='add properties'  class='propclass'></td></tr><tr><td colspan='5' title='add description here' class='desc descclass'></td></tr></tbody> </table><br><br><br><br><table class='endreggroup idsTemp' id='tab1'><tbody><tr class='label'><td>End RegGroup</td></tbody></table> <br><br>";*/
	pasteHtmlAtCaret(query);
}



function insertReg(imgPath){
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.reg);
	element.id='tab_reg'+random_Num;

	var field=element.getElementsByClassName("fields")[0];
	field.id="tab_fields"+random_Num;
	var f=element.getElementsByClassName("field")[0];
	f.id="tab_field"+random_Num;	
	/*query="<br><table contenteditable='false' onclick='tabClick(this);' class='reg idsTemp' id='tab_reg"+random_Num+"'><tbody><tr><td class='header readOnly'></td><td title='reg name' class='name'>reg_name</td><td title='offset' class='offset' colspan='2'></td><td class='specImage'><img title='Register' alt='Register' src="+imgPath+"></td><td class='address addCell readOnly' ><div class='splitVer setBorder' title='address'><label class='label'>address|</label><label class='addrvalue'></label></div><div class='splitVer' title='Default'><label class='label'>default |</label><label class='defvalue'></label></div> </td> <td class='regwidth hideWidth'>32</td></tr><tr><td colspan='6' title='add properties' class='propclass' contenteditable='true'></td></tr><tr><td colspan='6' title='add description here' class='desc descclass'></td></tr><tr><td colspan='6' class='border'></td></tr><tr><td colspan='6' class='fieldtd'><table class='fields idsTemp' id='tab_reg_field"+random_Num+"'><tr class='label'><td class='ddregbits'>bits</td><td class='lblfieldname'>name</td><td class='lblsw'>s/w</td><td class='lblhw'>h/w</td><td class='lbldefault'>default</td><td class='lbldesc'>description</td></tr><tr onkeyup='setCurrRow(this);' onclick='setCurrRow(this);' id='field"+random_Num+"' class='field edited'><td title='bits' class='bits'></td><td title='field name' class='fieldname' ><br></td><td title='software access' class='sw'><br></td><td title='hardware access' class='hw'></td><td title='default' class='default'><br></td><td title='description' class='desc fielddesc' onkeydown='insertNewRow(event,this);'></td></tr></table></td></tr></tbody></table><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}

function insertReg8(imgPath){	
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.reg8);
	element.id='tab_reg8'+random_Num;
	var field=element.getElementsByClassName("fields")[0];
	field.id="tab_fields"+random_Num;
	var f=element.getElementsByClassName("field")[0];
	f.id="tab_field"+random_Num;	

	/*query="<br><div><table contenteditable='false' onclick='tabClick(this);' class='reg idsTemp' id='tab_reg"+random_Num+"'><tbody><tr><td class='header readOnly'></td><td title='reg name' class='name'>reg_name</td><td title='offset' class='offset' colspan='2'></td><td class='specImage'><img title='8 bits register' alt='Register' src="+imgPath+"></td><td class='address addCell readOnly' ><div class='splitVer setBorder' title='address'><label class='label'>address|</label><label class='addrvalue'></label></div><div class='splitVer' title='Default'><label class='label'>default |</label><label class='defvalue'></label></div> </td><td class='regwidth hideWidth'>8</td></tr><tr><td colspan='6' title='add properties' class='propclass' contenteditable='true'></td></tr><tr><td colspan='6' title='add description here' class='desc descclass'></td></tr><tr><td colspan='6' class='border'></td></tr><tr><td colspan='6' class='fieldtd'><table class='fields idsTemp' id='tab_reg_field"+random_Num+"'><tr class='label'><td class='ddregbits'>bits</td><td class='lblfieldname'>name</td><td class='lblsw'>s/w</td><td class='lblhw'>h/w</td><td class='lbldefault'>default</td><td class='lbldesc'>description</td></tr><tr onkeyup='setCurrRow(this);' onclick='setCurrRow(this);' id='field"+random_Num+"' class='field edited'><td title='bits' class='bits'>7:0</td><td title='field name' class='fieldname' ><br></td><td title='software access' class='sw'><br></td><td title='hardware access' class='hw'></td><td title='default' class='default'><br></td><td title='description' class='desc fielddesc' onkeydown='insertNewRow(event,this);'></td></tr></table></td></tr></tbody></table></div><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}
function insertReg16(imgPath){	
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.reg16);
	element.id='tab_reg16'+random_Num;
	var field=element.getElementsByClassName("fields")[0];
	field.id="tab_fields"+random_Num;
	var f=element.getElementsByClassName("field")[0];
	f.id="tab_field"+random_Num;	

	/*query="<br><div><table contenteditable='false' onclick='tabClick(this);' class='reg idsTemp' id='tab_reg"+random_Num+"'><tbody><tr><td class='header readOnly'></td><td title='reg name' class='name'>reg_name</td><td title='offset' class='offset' colspan='2'></td><td class='specImage'><img title='16 bits register' alt='Register' src="+imgPath+"></td><td class='address addCell readOnly' ><div class='splitVer setBorder' title='address'><label class='label'>address|</label><label class='addrvalue'></label></div><div class='splitVer' title='Default'><label class='label'>default |</label><label class='defvalue'></label></div> </td> <td class='regwidth hideWidth'>16</td></tr><tr><td colspan='6' title='add properties' class='propclass' contenteditable='true'></td></tr><tr><td colspan='6' title='add description here' class='desc descclass'></td></tr><tr><td colspan='6' class='border'></td></tr><tr><td colspan='6' class='fieldtd'><table class='fields idsTemp' id='tab_reg_field"+random_Num+"'><tr class='label'><td class='ddregbits'>bits</td><td class='lblfieldname'>name</td><td class='lblsw'>s/w</td><td class='lblhw'>h/w</td><td class='lbldefault'>default</td><td class='lbldesc'>description</td></tr><tr onkeyup='setCurrRow(this);' onclick='setCurrRow(this);' id='field"+random_Num+"' class='field edited'><td title='bits' class='bits'>15:0</td><td title='field name' class='fieldname' ><br></td><td title='software access' class='sw'><br></td><td title='hardware access' class='hw'></td><td title='default' class='default'><br></td><td title='description' class='desc fielddesc' onkeydown='insertNewRow(event,this);'></td></tr></table></td></tr></tbody></table></div><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}
function insertReg32(imgPath){	
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.reg32);
	element.id='tab_reg32'+random_Num;
	var field=element.getElementsByClassName("fields")[0];
	field.id="tab_fields"+random_Num;
	var f=element.getElementsByClassName("field")[0];
	f.id="tab_field"+random_Num;	

	/*query="<br><div><table contenteditable='false' onclick='tabClick(this);' class='reg idsTemp' id='tab_reg"+random_Num+"'><tbody><tr><td class='header readOnly'></td><td title='reg name' class='name'>reg_name</td><td title='offset' class='offset' colspan='2'></td><td class='specImage'><img title='32 bits register' alt='Register' src="+imgPath+"></td><td class='address addCell readOnly' ><div class='splitVer setBorder' title='address'><label class='label'>address|</label><label class='addrvalue'></label></div><div class='splitVer' title='Default'><label class='label'>default |</label><label class='defvalue'></label></div> </td> <td class='regwidth hideWidth'>32</td></tr><tr><td colspan='6' title='add properties' class='propclass' contenteditable='true'></td></tr><tr><td colspan='6' title='add description here' class='desc descclass'></td></tr><tr><td colspan='6' class='border'></td></tr><tr><td colspan='6' class='fieldtd'><table class='fields idsTemp' id='tab_reg_field"+random_Num+"'><tr class='label'><td class='ddregbits'>bits</td><td class='lblfieldname'>name</td><td class='lblsw'>s/w</td><td class='lblhw'>h/w</td><td class='lbldefault'>default</td><td class='lbldesc'>description</td></tr><tr onkeyup='setCurrRow(this);' onclick='setCurrRow(this);' id='field"+random_Num+"' class='field edited'><td title='bits' class='bits'>31:0</td><td title='field name' class='fieldname' ><br></td><td title='software access' class='sw'><br></td><td title='hardware access' class='hw'></td><td title='default' class='default'><br></td><td title='description' class='desc fielddesc' onkeydown='insertNewRow(event,this);'></td></tr></table></td></tr></tbody></table></div><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}
function insertReg64(imgPath){	
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.reg64);
	element.id='tab_reg64'+random_Num;
	var field=element.getElementsByClassName("fields")[0];
	field.id="tab_fields"+random_Num;
	var f=element.getElementsByClassName("field")[0];
	f.id="tab_field"+random_Num;	
	/*query="<br><div><table contenteditable='false' onclick='tabClick(this);' class='reg idsTemp' id='tab_reg"+random_Num+"'><tbody><tr><td class='header readOnly'></td><td title='reg name' class='name'>reg_name</td><td title='offset' class='offset' colspan='2'></td><td class='specImage'><img title='64 bits register' alt='Register' src="+imgPath+"></td><td class='address addCell readOnly' ><div class='splitVer setBorder' title='address'><label class='label'>address|</label><label class='addrvalue'></label></div><div class='splitVer' title='Default'><label class='label'>default |</label><label class='defvalue'></label></div> </td> <td class='regwidth hideWidth'>64</td></tr><tr><td colspan='6' title='add properties' class='propclass' contenteditable='true'></td></tr><tr><td colspan='6' title='add description here' class='desc descclass'></td></tr><tr><td colspan='6' class='border'></td></tr><tr><td colspan='6' class='fieldtd'><table class='fields idsTemp' id='tab_reg_field"+random_Num+"'><tr class='label'><td class='ddregbits'>bits</td><td class='lblfieldname'>name</td><td class='lblsw'>s/w</td><td class='lblhw'>h/w</td><td class='lbldefault'>default</td><td class='lbldesc'>description</td></tr><tr onkeyup='setCurrRow(this);' onclick='setCurrRow(this);' id='field"+random_Num+"' class='field edited'><td title='bits' class='bits'>63:0</td><td title='field name' class='fieldname' ><br></td><td title='software access' class='sw'><br></td><td title='hardware access' class='hw'></td><td title='default' class='default'><br></td><td title='description' class='desc fielddesc' onkeydown='insertNewRow(event,this);'></td></tr></table></td></tr></tbody></table></div><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}
function insertReg128(imgPath){	
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.reg128);
	element.id='tab_reg128'+random_Num;
	var field=element.getElementsByClassName("fields")[0];
	field.id="tab_fields"+random_Num;
	var f=element.getElementsByClassName("field")[0];
	f.id="tab_field"+random_Num;	

	/*query="<br><div><table contenteditable='false' onclick='tabClick(this);' class='reg idsTemp' id='tab_reg"+random_Num+"'><tbody><tr><td class='header readOnly'></td><td title='reg name' class='name'>reg_name</td><td title='offset' class='offset' colspan='2'></td><td class='specImage'><img title='128 bits register' alt='Register' src="+imgPath+"></td><td class='address addCell readOnly' ><div class='splitVer setBorder' title='address'><label class='label'>address|</label><label class='addrvalue'></label></div><div class='splitVer' title='Default'><label class='label'>default |</label><label class='defvalue'></label></div> </td> <td class='regwidth hideWidth'>128</td></tr><tr><td colspan='6' title='add properties' class='propclass' contenteditable='true'></td></tr><tr><td colspan='6' title='add description here' class='desc descclass'></td></tr><tr><td colspan='6' class='border'></td></tr><tr><td colspan='6' class='fieldtd'><table class='fields idsTemp' id='tab_reg_field"+random_Num+"'><tr class='label'><td class='ddregbits'>bits</td><td class='lblfieldname'>name</td><td class='lblsw'>s/w</td><td class='lblhw'>h/w</td><td class='lbldefault'>default</td><td class='lbldesc'>description</td></tr><tr onkeyup='setCurrRow(this);' onclick='setCurrRow(this);' id='field"+random_Num+"' class='field edited'><td title='bits' class='bits'>127:0</td><td title='field name' class='fieldname' ><br></td><td title='software access' class='sw'><br></td><td title='hardware access' class='hw'></td><td title='default' class='default'><br></td><td title='description' class='desc fielddesc' onkeydown='insertNewRow(event,this);'></td></tr></table></td></tr></tbody></table></div><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}

function insertRef(imgPath){
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.ref);
	element.id='tab_ref'+random_Num;
	/*query="<table class='ref idsTemp' contenteditable='false' onclick='tabClick(this)' id='tab_ref"+random_Num+"'><tbody><tr><td class='header readOnly'></td><td title='ref name' class='name' colspan='2'>ref_name</td><td title='offset' class='offset'></td><td class='specImage'><img title='instance' alt='instance' src="+imgPath+"></td><td class='address addCell readOnly'><label class='label'>address|</label><label class='addrvalue'></label></td></tr><tr><td colspan='6' class='refpathtd'> <table class='refpathtab idsTemp'> <tbody><tr><td class='label lblrefname'>name</td><td class='refname'></td><td class='label path lblrefname' width='50'>path</td><td class='refpath'></td><td class='label lbltype'>type</td><td class='reftype addCell'></td></tr></tbody></table> </td>      </tr> <tr><td colspan='6' title='add properties' class='propclass'></td></tr><tr><td colspan='6' title='add description here' class='descclass'></td></tr></tbody> </table><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}

function insertMemory(imgPath){	
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.memory);
	element.id='tab_memory'+random_Num;
	/*query="<table class='mem idsTemp' contenteditable='false' onclick='tabClick(this)' id='tab_mem"+random_Num+"'><tbody><tr><td class='header readOnly'></td><td title='memory name' class='name' colspan='2'>memory_name</td><td title='offset' class='offset'></td><td class='specImage' style='width:36px'><img title='memory' alt='memory' src="+imgPath+"></td><td class='address addCell readOnly'><label class='label'>address|</label><label class='addrvalue'></label></td></tr><tr><td class='label'>depth</td><td class='depth' contenteditable='true'></td><td class='label'>width</td><td class='width' contenteditable='true'></td><td class='label'>default</td><td class='default address addCell' contenteditable='true'></td></tr><tr><td colspan='6' title='add properties' class='propclass'></td></tr><tr><td colspan='6' title='add description here' class='desc descclass'></td></tr></tbody> </table><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}

function insertEnum(){
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.enum1);
	element.id='tab_enum'+random_Num;
	var enum_row=element.getElementsByClassName("edited")[0];
	enum_row.id='enum'+random_Num;
	/*query="<table class='enum idsTemp' contenteditable='false' onclick='tabClick(this)' id='tab_enum"+random_Num+"'> <tbody><tr><td class='header readOnly'></td><td title='enum name' class='name'>enum_name</td><td class='address addCell readOnly'><label class='label'>address |</label><label></label></td></tr><tr><td class='label'>mnemonic name</td><td class='label'>value</td><td class='label'>description</td></tr><tr onkeyup='setCurrRow(this);' onclick='setCurrRow(this);' class='edited'><td class='m_name'></td><td class='value'></td><td title='add description here' class='desc enumdesc' onkeydown='insertEnumRow(event,this);'></td></td></tr></tbody> </table><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}

function insertDefine(){
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.define);
	element.id='tab_define'+random_Num;
	var define_row=element.getElementsByClassName("edited")[0];
	define_row.id='def'+random_Num;
	/*query="<table class='param idsTemp' contenteditable='false' onclick='tabClick(this)' id='tab_def"+random_Num+"'><tbody><tr><td class='label'>define name</td><td class='label'>value</td><td class='label'>description</td><td class='label'>private</td></tr><tr onkeyup='setCurrRow(this);' onclick='setCurrRow(this);' class='edited'><td class='name'></td><td class='value'></td><td title='add description here' class='desc'></td><td class='private' onkeydown='insertDefineRow(event,this);'></td></td></tr></tbody> </table><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}

function insertVariant(){	
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.variant);
	element.id='tab_variant'+random_Num;
	var var_row=element.getElementsByClassName("edited")[0];
	var_row.id='var'+random_Num;
	/*query="<table class='variant idsTemp' contenteditable='false' onclick='tabClick(this)' id='tab_var"+random_Num+"'> <tbody><tr><td class='label'>variant name</td><td class='label'>value</td><td class='label'>description</td></tr><tr onkeyup='setCurrRow(this);' onclick='setCurrRow(this);' class='edited'><td class='name'></td><td class='value'></td><td title='add description here' class='desc' onkeydown='insertVariantRow(event,this);'></td></td></tr></tbody> </table><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}

function insertBusDomain(){	
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.busdomain);
	element.id='tab_busdomain'+random_Num;
	var bus_row=element.getElementsByClassName("edited")[0];
	bus_row.id='bus'+random_Num;
	/*query="<table class='busdomain idsTemp' contenteditable='false' onclick='tabClick(this)' id='tab_bus"+random_Num+"'><tbody><tr><td class='label'>bus domain name</td><td class='label'>address unit</td><td class='label'>description</td><td class='label'>bus</td></tr><tr onkeyup='setCurrRow(this);' onclick='setCurrRow(this);' class='edited'><td class='name'></td><td class='unit'></td><td title='add description here' class='desc'></td><td class='bus' onkeydown='insertBusRow(event,this);'></td></td></tr></tbody> </table><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}

function insertSignals(imgPath){
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.signal);
	element.id='tab_signal'+random_Num;
	var singal_row=element.getElementsByClassName("edited")[0];
	singal_row.id='sig'+random_Num;
	/*query="<table class='signals idsTemp' contenteditable='false' onclick='tabClick(this)' id='tab_bus"+random_Num+"'><tbody><tr><td class='header readOnly'></td><td title='signal name' class='name'>signal_name</td><td class='specImage'><img title='signals' alt='signals' src="+imgPath+"></td><td class='addCell readOnly'></td></tr><tr><td colspan='4' class='border'></td></tr><tr ><td class='label'>name</td><td class='label'>port type</td><td colspan='2' class='label'>description</td></tr><tr onclick='setCurrRow(this);' onkeydown='setCurrRow(this);' class='edited'><td class='name'></td><td class='direction'></td><td colspan='2' title='add description here' class='desc signaldesc' onkeydown='insertNewRowSignals(event,this);'></td></td></tbody> </table><br>";*/
	pasteHtmlAtCaret(addstrToCaret(element));
}

function insertSeq(){
	addIntoHistory();
	random_Num=Math.random();
	var element=htmlToElements(ids_json.sequence);
	element.id='tab_sequence'+random_Num;

	element.getElementsByClassName("seqip")[0].getElementsByClassName("edited")[0].id="seq_ip_"+random_Num;
	element.getElementsByClassName("seqip")[0].getElementsByClassName("ip")[0].innerHTML=getCurrentDocumentPath();


	var arg=element.getElementsByClassName("arg")[0];
	arg.id="arg"+random_Num;
	arg.getElementsByClassName("edited")[0].id="seq_arg"+random_Num;

	var cons=element.getElementsByClassName("const")[0];
	cons.id="cons"+random_Num;
	cons.getElementsByClassName("edited")[0].id="seq_const"+random_Num;

	var vari=element.getElementsByClassName("var")[0];
	vari.id="var"+random_Num;
	vari.getElementsByClassName("edited")[0].id="seq_var"+random_Num;

	var cmd=element.getElementsByClassName("command")[0];
	cmd.id="cmd"+random_Num;
	cmd.getElementsByClassName("edited")[0].id="seq_cmd"+random_Num;

	pasteHtmlAtCaret(addstrToCaret(element));
	load_ips(element);
}

function reloadPage(){
	var v=location.reload();
}

function refreshPage(){
	$('#excelmenu').css({'display':'none'});
	clickController.savepage();
	reloadPage();
}

function pasteHtmlAtCaret( html ) {
	addIntoHistory();
	var sel, range;
	if ( window.getSelection ) {
		sel = window.getSelection();
		if ( sel.getRangeAt && sel.rangeCount ) {
			range = sel.getRangeAt( 0 );
			range.deleteContents();

			var el = document.createElement( "div" );
			el.innerHTML = html;
			var frag = document.createDocumentFragment(),
				node, lastNode;
			while ( ( node = el.firstChild ) ) {
				lastNode = frag.appendChild( node );
			}
			range.insertNode( frag );

			if ( lastNode ) {
				range = range.cloneRange();
				range.setStartAfter( lastNode );
				range.collapse( true );
				sel.removeAllRanges();
				sel.addRange( range );
			}
		}
	} else if ( document.selection && document.selection.type != "Control" ) {
		document.selection.createRange().pasteHTML( html );
	}
}

function insertBusRow(evt, obj){
	addIntoHistory();
	/* tab press*/
	if(evt.keyCode===9){

		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}



		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeyup','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','edited bus_row');
		row.setAttribute('id','bus'+Math.random());
		var cell;

		cell=row.insertCell(0);
		cell.setAttribute('class', "name");  


		cell=row.insertCell(1);
		cell.setAttribute('class', "unit"); 



		cell=row.insertCell(2);
		cell.setAttribute('class', "desc"); 


		cell=row.insertCell(3);
		cell.setAttribute('class', "bus"); 
		cell.setAttribute('onkeydown',"insertBusRow(event,this);");


	}
}

function insertVariantRow(evt, obj){
	addIntoHistory();
	/* tab press*/
	if(evt.keyCode===9){

		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}



		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeyup','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','edited var_row');
		row.setAttribute('id','var'+Math.random());
		var cell;

		cell=row.insertCell(0);
		cell.setAttribute('class', "name"); 


		cell=row.insertCell(1);
		cell.setAttribute('class', "value"); 


		cell=row.insertCell(2);
		cell.setAttribute('class', "desc"); 
		cell.setAttribute('onkeydown',"insertEnumRow(event,this);");


	}
}

function insertDefineRow(evt, obj){
	addIntoHistory();
	/* tab press*/
	if(evt.keyCode===9){

		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}



		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeyup','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','edited def_row');
		row.setAttribute('id','def'+Math.random());
		var cell;

		cell=row.insertCell(0);
		cell.setAttribute('class', "name");

		cell=row.insertCell(1);
		cell.setAttribute('class', "value"); 

		cell=row.insertCell(2);
		cell.setAttribute('class', "desc"); 


		cell=row.insertCell(3);
		cell.setAttribute('class', "private"); 
		cell.setAttribute('onkeydown',"insertDefineRow(event,this);");

	}
}

function insertEnumRow(evt,obj){
	addIntoHistory();
	/* tab press*/
	if(evt.keyCode===9){

		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}

		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeyup','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','edited enum_row');	
		row.setAttribute('id','enum'+Math.random());
		var cell;

		cell=row.insertCell(0);
		cell.setAttribute('class', "m_name");  

		cell=row.insertCell(1);
		cell.setAttribute('class', "value"); 

		cell=row.insertCell(2);
		cell.setAttribute('class', "desc enumdesc"); 
		cell.setAttribute('onkeydown',"insertEnumRow(event,this);");

	}	
}

function insertNewRowSignals(evt,obj){
	addIntoHistory();
	/* tab press*/
	if(evt.keyCode===9){

		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}



		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeydown','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class',"edited sig_row");
		row.setAttribute('id','sig'+Math.random());

		var input;
		var cell;

		cell=row.insertCell(0);
		cell.setAttribute('class', "name"); 
		/*input=document.createElement("input");      

		cell.appendChild(input);
		*/

		cell=row.insertCell(1);
		cell.setAttribute('class', "direction");
		/*input=document.createElement("input");
		cell.appendChild(input);
		*/


		cell=row.insertCell(2);
		cell.setAttribute('onkeydown',"insertNewRowSignals(event,this);");
		cell.setAttribute('colspan','2');
		cell.setAttribute('class', "desc signaldesc"); 
		/*input=document.createElement("input");		
		cell.appendChild(input);*/
	}
	/*add property row*/
	else if(evt.keyCode==80&&evt.altKey){
		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}

		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		/*var row = table.insertRow(parseInt(curr_row_signal)+1);*/
		row.setAttribute('onkeydown','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		var input;
		var cell;

		cell=row.insertCell(0);

		cell.setAttribute('colspan', '4');    
		cell.setAttribute('onkeydown',"insertNewRowSignals(event,this);");
		cell.setAttribute('class','propclass');		
	}


}

function deleteElement(){
	try{
		addIntoHistory();
		if(curr_row_obj){
			deletecurrrow(curr_row_obj);
			curr_row_obj=null;
		}
		else{
			if(clsTab!=null){
				selectElementContents(document.getElementById(clsTab));
				document.execCommand('delete');
			}
		}

	}
	catch(e){alert('Err (delete) : '+e.message);}
}

function deletecurrrow(obj){
	$(obj).closest("tr").remove();
}

function setCurrRow(currnRow){
	curr_row=currnRow.rowIndex;
	curr_row_obj=currnRow;
	isrowselected=true;
}

function insertSeqCmdRow(evt, obj) {
	addIntoHistory();
	if(evt.keyCode===9){

		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}


		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeydown','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','edited');	
		row.setAttribute('id','seq'+Math.random());

		var input;
		var cell;

		cell=row.insertCell(0);		
		cell.setAttribute('class', 'cmdname');     

		cell=row.insertCell(1);
		cell.setAttribute('class', 'step');  
		var str=create_reg_arr(document.getElementById("regdivcontainer"));
		autocomplete(cell,str);

		cell=row.insertCell(2);
		cell.setAttribute('class', 'seqvalue');  
		autocomplete(cell,str);

		cell=row.insertCell(3);
		cell.setAttribute('class', 'seqdesc');  


		cell=row.insertCell(4);
		cell.setAttribute('class','refpath');
		cell.setAttribute('onkeydown',"insertSeqCmdRow(event,this);");	



	}

}

function insertSeqConstRow(evt, obj) {
	addIntoHistory();
	if(evt.keyCode===9){

		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}


		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeydown','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','edited');	
		row.setAttribute('id','seq'+Math.random());

		var input;
		var cell;

		cell=row.insertCell(0);		
		cell.setAttribute('class', 'constname');     

		cell=row.insertCell(1);
		cell.setAttribute('class', 'value');  


		cell=row.insertCell(2);
		cell.setAttribute('class','seqdesc');
		cell.setAttribute('onkeydown',"insertSeqConstRow(event,this);");				
	}

}

function insertSeqArgRow(evt, obj) {
	addIntoHistory();
	if(evt.keyCode===9){

		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}


		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeydown','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','edited');	
		row.setAttribute('id','seq'+Math.random());

		var input;
		var cell;

		cell=row.insertCell(0);		
		cell.setAttribute('class', 'argname');     

		cell=row.insertCell(1);
		cell.setAttribute('class', 'value');  


		cell=row.insertCell(2);
		cell.setAttribute('class','seqdesc');
		cell.setAttribute('onkeydown',"insertSeqArgRow(event,this);");				
	}

}

function insertSeqVarnameRow(evt, obj) {
	addIntoHistory();
	if(evt.keyCode===9){

		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}


		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeydown','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','edited');	
		row.setAttribute('id','seq'+Math.random());

		var input;
		var cell;

		cell=row.insertCell(0);		
		cell.setAttribute('class', 'varname');     

		cell=row.insertCell(1);
		cell.setAttribute('class', 'value');  


		cell=row.insertCell(2);
		cell.setAttribute('class','seqdesc');
		cell.setAttribute('onkeydown',"insertSeqVarnameRow(event,this);");				
	}

}

function insertSeqRow(evt, obj) {
	addIntoHistory();
	if(evt.keyCode===9){

		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}


		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeydown','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','edited');	
		row.setAttribute('id','seq'+Math.random());

		var input;
		var cell;

		cell=row.insertCell(0);		
		cell.setAttribute('class', 'seqname');     

		cell=row.insertCell(1);
		cell.setAttribute('class', 'value');  


		cell=row.insertCell(2);
		cell.setAttribute('class','seqdesc');
		cell.setAttribute('onkeydown',"insertSeqRow(event,this);");				
	}

}


/*  insert new row for reg field */
function insertNewRow(evt, obj) {
	addIntoHistory();
	if(evt.keyCode===9&&evt.shiftKey){
	}
	/*add field row*/
	else if(evt.keyCode===9){

		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}


		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeydown','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','field edited');	
		row.setAttribute('id','field'+Math.random());

		var input;
		var cell;

		cell=row.insertCell(0);		
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


		cell=row.insertCell(1);
		cell.setAttribute('class', 'fieldname');  
		cell.setAttribute('title', 'field name'); 


		cell=row.insertCell(2);
		cell.setAttribute('class','sw thirdCell');
		cell.setAttribute('title', 'software access'); 
		/*input=document.createElement("input");
				cell.appendChild(input);*/


		cell=row.insertCell(3);
		cell.setAttribute('class','hw thirdCell');
		cell.setAttribute('title', 'hardware access'); 
		/*input=document.createElement("input");
				cell.appendChild(input);*/


		cell=row.insertCell(4);
		cell.setAttribute('title', 'default'); 
		cell.setAttribute('class','default');

		cell=row.insertCell(5);
		cell.setAttribute('onkeydown',"insertNewRow(event,this);");
		cell.setAttribute('class','desc fielddesc');
		cell.setAttribute('title', 'description'); 

		hookEvents(cell,idsprop);
	}
	/*add property row*/
	else if(evt.keyCode==80&&evt.altKey){
		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}

		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeydown','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','edited');
		var cell;

		cell=row.insertCell(0);		
		cell.setAttribute('colspan', '6');    
		cell.setAttribute('onkeydown',"insertNewRow(event,this);");
		cell.setAttribute('class','propclass');
		cell.setAttribute('title', 'property'); 

		/*
				input=document.createElement("textarea");  
				input.setAttribute('class','propInput');
				cell.appendChild(input);*/

	}

	/*add description row*/
	else if(evt.keyCode==68&&evt.altKey){
		while(obj.tagName.toUpperCase() !== "TABLE") {
			obj = obj.parentNode;
		}


		var table = document.getElementById(obj.id);
		var row = table.insertRow(parseInt(curr_row)+1);
		row.setAttribute('onkeydown','setCurrRow(this)');
		row.setAttribute('onclick',"setCurrRow(this)");
		row.setAttribute('class','edited');
		var cell;

		cell=row.insertCell(0);
		cell.setAttribute('colspan', '6');    
		cell.setAttribute('onkeydown',"insertNewRow(event,this);");
		cell.setAttribute('class','desc descclass');
		cell.setAttribute('title', 'description'); 

		/*
				input=document.createElement("textarea");  
				input.setAttribute('class','descInput');
				cell.appendChild(input);*/

	}

	/*call ML from here*/			
	if(evt.keyCode==32&& evt.ctrlKey){		

		var txt=event.target.innerText;
		var mlhint="";
		try{

			mlhint=clickController.showMLHint(txt);
			/*alert("Machine Learning working...");*/
			setTimeout(function(){
				/*pasteHtmlAtCaret("<div id='divhint' class='hintcls'><input id='inputhint' onkeydown='hintlistner(event);' value='"+mlhint+"' type='text'></div>");*/
				console.log("--txt="+txt);
				document.getElementById('mlHintContainer').setAttribute('style','display:block');
				document.getElementById('mlHintPara').innerText=mlhint;

				/*
						document.getElementById("inputhint").focus();
						document.getElementById("inputhint").select();*/
			}, 1000);


		}catch(e){alert("Err call java : "+e.message);}


	}

}

function setHintText(str){
	document.getElementById("inputhint").value=str;
}

function setCaretToPos (input, pos) {
	setSelectionRange(input, pos, pos);
}

function setSelectionRange(input, selectionStart, selectionEnd) {
	if (input.setSelectionRange) {
		input.focus();
		input.setSelectionRange(selectionStart, selectionEnd);
	}
	else if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(true);
		range.moveEnd('character', selectionEnd);
		range.moveStart('character', selectionStart);
		range.select();
	}
}


function click_hideProp(){
	var cols =     document.getElementsByClassName('propclass');
	var txtVal=document.getElementById('btnPropHide').innerHTML;
	if(txtVal==hideProp){
		for(i=0; i<cols.length; i++) {
			cols[i].style.display =    'none';
		}
		document.getElementById('btnPropHide').innerHTML=showProp;
	}
	else if(txtVal==showProp){
		for(i=0; i<cols.length; i++) {
			cols[i].style.display =    'table-cell';
		}
		document.getElementById('btnPropHide').innerHTML=hideProp;
	}
}

var display="table-cell";
function hideprop(){
	display="none";
}
function showprop(){
	display="table-cell";
}
function resetview(){
	$('.propclass').css("display","table-cell");	
}

function click_btnprop(){
	if($("#btnprop").html()==hideProp){
		$('.propclass').css("display","none");
		$("#btnprop").html(showProp);
	}
	else{
		$('.propclass').css("display","table-cell");
		$("#btnprop").html(hideProp);
	}
}

function click_btndesc(){
	if($("#btndesc").html()==hideDesc){
		$('.descclass').css("display","none");
		$("#btndesc").html(showDesc);
	}
	else{
		$('.descclass').css("display","table-cell");
		$("#btndesc").html(hideDesc);
	}
}

function IDS_PROPHIDE(){
	$('.propclass').css("display","none");
	hideprop();
}

function IDS_PROPSHOW(){
	$('.propclass').css("display","table-cell");
	showprop();
}

function IDS_DESCSHOW(){
	try{		
		var cols =     document.getElementsByClassName('descclass');
		for(i=0; i<cols.length; i++) {
			cols[i].style.display =    'table-cell';
		}
	}
	catch(E){
		console.log('Err '+E.message);
	}
}

function IDS_DESCHIDE(){
	try{
		var cols =     document.getElementsByClassName('descclass');	
		for(i=0; i<cols.length; i++) {
			cols[i].style.display =    'none';
		}
	}
	catch(E){
		console.log("Err hideDesc "+E.message);
	}
}





function click_hideDesc(){
	var cols =     document.getElementsByClassName('descclass');
	var txtVal=document.getElementById('btnDescHide').innerHTML;
	if(txtVal==hideDesc){
		for(i=0; i<cols.length; i++) {
			cols[i].style.display =    'none';
		}
		document.getElementById('btnDescHide').innerHTML=showDesc;
	}
	else if(txtVal==showDesc){
		for(i=0; i<cols.length; i++) {
			cols[i].style.display =    'table-cell';
		}
		document.getElementById('btnDescHide').innerHTML=hideDesc;
	}
}

function printMsg(msg){
	/*document.getElementById('para').innerHTML =msg;*/
}

function fontColorChange(color){
	console.log('change color');
	document.execCommand('foreColor', false, color);
}
function printDoc(){
	window.print();

}

/*key press event listner to catch and handle key event*/
var bodyArr={};
var index=0;
function KeyPress(e) {

	var evtobj = window.event? event : e;

	/*undo*/
	if (evtobj.keyCode === 90 && evtobj.ctrlKey) {		
		var disp=document.getElementById("idsexcelcontainer").style.display;

		if(typeof(bodyArr[index-1])!=='undefined'&&bodyArr[index-1]!==null){
			index--;
			document.body.innerHTML=bodyArr[index];
		}

		if(disp=="block"){
			/*alert("Please save file ( ctrl+s ) and refresh (by right click outside from spreadsheet)");*/
		}

		return false;
	}
	/*redo*/
	else  if (evtobj.keyCode === 89 && evtobj.ctrlKey) {
		if(typeof(bodyArr[index+1])!=='undefined'&&bodyArr[index+1]!==null){
			index++;
			document.body.innerHTML=bodyArr[index];
		}
		return false;
	}

	/*paste ctrl+v*/
	else  if (evtobj.keyCode === 86 && evtobj.ctrlKey) {
		myClick();
		function myClick() {
			setTimeout(
				function() {
					updateEvents();
				}, 500);
		}

	}
	else{
		addIntoHistory();
	}

	/*when copy/cut paste done, html only copies html tag but not event like "onclick.." so we need to update these event whenever copy occures. 
	this is only a temporary solution and we need to find a better solution for this*/
	function updateEvents(){
		console.log('update event call');

		var idsclass = document.getElementsByClassName("idsTemp");
		if(typeof(idsclass!=='undefined'&&idsclass!==null)){
			for(var i = 0; i < idsclass.length; i++)
			{
				idsclass[i].setAttribute("onclick","tabClick(this)");
				random_Num=Math.random();
				idsclass[i].setAttribute('id','tab'+i+random_Num);
				$(idsclass[i]).removeAttr('style');
				$(idsclass[i]).find("[style]").removeAttr('style');	/*reset style attribute becouse whenever copy paste done, browser set default width location
				and it ruin the style*/		

			}
		}




		idsclass=document.getElementsByClassName("edited");
		if(typeof(idsclass!=='undefined'&&idsclass!==null)){
			for(var i = 0; i < idsclass.length; i++)
			{
				idsclass[i].setAttribute("onclick","setCurrRow(this)");
				idsclass[i].setAttribute("onkeyup","setCurrRow(this)");
			}
		}

		idsclass=document.getElementsByClassName("fielddesc");
		if(typeof(idsclass!=='undefined'&&idsclass!==null)){
			for(var i = 0; i < idsclass.length; i++)
			{
				idsclass[i].setAttribute("onkeydown","insertNewRow(event,this)");
			}
		}

		var fields= document.getElementsByClassName("fields");
		if(typeof(fields!=='undefined'&&fields!==null)){
			for(var i = 0; i < fields.length; i++){
				random_Num=Math.random();
				fields[i].setAttribute('id','tab'+i+random_Num);
			}
		}

		var field= document.getElementsByClassName("field");
		if(typeof(field!=='undefined'&&field!==null)){
			for(var i = 0; i < field.length; i++){
				random_Num=Math.random();
				field[i].setAttribute('id','tab'+i+random_Num);
			}
		}

		idsclass= document.getElementsByClassName("private");
		if(typeof(idsclass!=='undefined'&&idsclass!==null)){
			for(var i = 0; i < idsclass.length; i++){
				idsclass[i].setAttribute("onkeydown","insertDefineRow(event,this)");
			}
		}

		idsclass= document.getElementsByClassName("enumdesc");
		if(typeof(idsclass!=='undefined'&&idsclass!==null)){
			for(var i = 0; i < idsclass.length; i++){
				idsclass[i].setAttribute("onkeydown","insertEnumRow(event,this)");
			}
		}

		idsclass= document.getElementsByClassName("signaldesc");
		if(typeof(idsclass!=='undefined'&&idsclass!==null)){
			for(var i = 0; i < idsclass.length; i++){
				idsclass[i].setAttribute("onkeydown","insertNewRowSignals(event,this)");
			}	
		}
	}

}

function insertTabSpace(){
	document.execCommand('insertHTML', false, "&emsp;");	
}

function addIntoHistory(){
	bodyArr[index]=document.body.innerHTML;
	index++;
}

function showSearchTab(){
	$('#divSearch').css('display','block');
}
function hideSearchTab(){
	$('#divSearch').css('display','none');
}

function click_findString(){
	var str=$('#inputsearch').val();
	findString(str);
}

function click_replaceString(){
	findReplaceString(document.getElementById('inputsearch'),document.getElementById('inputreplace'));	
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

function openfile(obj){	
	try{
		var file=$(obj).text();
		clickController.openFile(file);
	}
	catch(e){
		alert('err openfile : '+e.message);
	}	
}

function openFindWindow(event){
	try{
		location.reload();
		clickController.openFind();
	}
	catch(e){
		alert('err : '+e.message);
	}
}

function unSetUnsaved(){
	try{

		clickController.setUnsaveSymbol();
	}
	catch(e){
		alert('err unSetUnsaved : '+e.message);
	}
}

function unSetsaved(){
	try{
		clickController.setSaveSymbol();
	}
	catch(e){
		alert('err unSetSaved : '+e.message);
	}
}

function test_replace(){
	var val=document.getElementById('testDiv').innerText.replace("input","HELLO");
	document.getElementById('testDiv').innerText=val;
}

document.onkeydown = KeyPress;

function closehint(){
	document.getElementById('mlHintContainer').setAttribute("style","display:none");
}

function removeelement(classname){
	$("."+classname).remove();
}

function saveConfig(configstr){
	var config=document.getElementById("config");
	try{
		if(config){
			alert("configfound");
			config.remove();
		}
		else{
			alert("not configfound");
		}
		config=document.getElementsByClassName("maindiv")[0].appendChild("div");
		config.id="config";
		config.style="display:none";
		config.innerHTML=configstr;
	}
	catch(e){
		alert("Err saveConfig : "+e.message);
	}

}

/*@JAVAFX*/
function jump(h){
	location.href ='#'+h;                 
}

/*GUI check starts here*/
/*@JAVAFX*/
function runGUICheck(){
	var errorlist="";
	var errorconter=0;
	resetAllChecks();

	checkTop();
	checkRegTemplate();
	checkCommon();
	checkMem();
	checkSeqTemplate();




	if($.trim(errorlist)!=""){
		var verrorlist="{error: ["+errorlist+"]}";
		alert(verrorlist);
		return true;
	}

	function addErrJson(msg,td){

		var id="target"+errorconter;
		$(td).append("<a class='idscheck' name='"+id+"'></a>");	
		$(td).css('border','2px solid red');

		if(errorlist==""){
			errorlist="{id:"+id+",msg:"+msg+"}";
		}
		else{		
			errorlist=errorlist+",{id:"+id+",msg:"+msg+"}";
		}
		errorconter++;
	}

	function checkRegTemplate(){


		$("table.reg td.fieldname").each(function(i){
			if($(this).text()==""){
				addErrJson("Error-G  field name should not be empty",this);
			}
		});

		$("table.reg td.bits").each(function(i){
			/*
			if($(this).text()==""){
				addErrJson("Error-G register bits should not by empty",this);
			}
			*/
			if(!$(this).text().match(/\s*(^[\d]+$)|(^[\d]+\:[\d])/)){
				addErrJson("Error-G invalid register bits value",this);
			}			
		});

		$("table.reg td.sw").each(function(i){
			if($(this).text()==""){
				addErrJson("Error-G register sw access should not by empty",this);
			}
		});

	}	

	function checkCommon(){
		$("table.idsTemp td.offset").each(function(i){
			/*if(($(this).text()!="")&&(!$(this).text().match(/\s*(^\`h[a-fA-F0-9]+$)|(^[\$][a-zA-Z][a-zA-Z0-9_]*)|(^[\d]+$)|(^0(x|X)([\d]|[a-fA-F])+$)/))){*/
			if(($(this).text()!="")&&(!$(this).text().match(/\s*(^\`h[a-fA-F0-9]+$)|(^[\$][a-zA-Z][a-zA-Z0-9_]*)|(^[\d_]+$)|(^0(x|X)([\d_]|[a-fA-F_])+$)/))){
				addErrJson("Error-G Invalid offset value",this);
			}
		});

		/*
		$("table.idsTemp td.default").each(function(i){
			if($(this).text()==""){			
				addErrJson("Error-G  default value should not be empty",this);
			}
		});*/

		$("table.idsTemp td.name").each(function(i){
			if(!$(this).text().match(/^\s*[\\$]?[a-zA-Z][a-zA-Z0-9 _]*\s*/)){
				addErrJson("Error-G template name should be valid",this);
			}
		});

		$("table.ref td.refname").each(function(i){
			if(!$(this).text().match(/^[\\$]?[a-zA-Z][a-zA-Z0-9 _]*/)){
				addErrJson("Error-G ref instance name should be valid",this);
			}
		});
	}

	function checkMem(){
		$("table.mem td.depth").each(function(i){
			if($(this).text()==""){			
				addErrJson("Error-G  depth value should not be empty",this);
			}
		});

		$("table.mem td.width").each(function(i){
			if($(this).text()==""){			
				addErrJson("Error-G  width value should not be empty",this);
			}
		});
	}

	function resetAllChecks(){

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
		errorconter=0;
		errorlist="";
	}

	function checkSeqTemplate(){


		$("table.seq td.seqname").each(function(i){
			if($(this).text()==""){
				addErrJson("Error-G  sequence name must not be empty",this);
			}
		});	

		$("table.seq td.ip").each(function(i){
			if($(this).text()==""){
				addErrJson("Error-G  sequence IP must not be empty",this);
			}
		});	

	}

	function checkTop(){
		try{

			$(".idsTemp").each(function(i){
				var cls=$(this).attr("class").split(" ");
				for(var i=0;i<cls.length;i++){
					if(cls[i]==="block"||cls[i]==="chip"||cls[i]==="system"||cls[i]==="board"||cls[i]==="section"||cls[i]==="reg"||cls[i]==="ref"||
					   cls[i]==="mem"||cls[i]==="enum"||cls[i]==="param"||cls[i]==="variant"||cls[i]==="busdomain"||cls[i]==="signals"){

						if(cls[i]==="reg"||cls[i]==="section"){
							addErrJson("Error-G  Top is missing!",this.getElementsByClassName("name")[0]);
						}
						return false;
					}
				}
			});




		}catch(e){
			alert("Err checkTop : "+e.message);
		}
	}

	return false;
}
/*GUI checks ends here*/



/*****************************************Auto property hints work start*******************************************************/

var carpos;

function hookEvents(ele){
	autocomplete(ele,idsprop);
}

function getCaretPosition(editableDiv) {
	var caretPos = 0,
		sel, range;
	if (window.getSelection) {
		sel = window.getSelection();
		if (sel.rangeCount) {
			range = sel.getRangeAt(0);

			if (range.commonAncestorContainer.parentNode == editableDiv) {
				caretPos = range.endOffset;
			}
		}
	} else if (document.selection && document.selection.createRange) {
		range = document.selection.createRange();
		if (range.parentElement() == editableDiv) {
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
	el.focus();
	if (typeof window.getSelection != "undefined"
		&& typeof document.createRange != "undefined") {
		var range = document.createRange();
		range.selectNodeContents(el);
		range.collapse(false);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	} else if (typeof document.body.createTextRange != "undefined") {
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(el);
		textRange.collapse(false);
		textRange.select();
	}
}



function checkvalidprop(inp){
	carpos=getCaretPosition(inp);
	var txt=inp.innerText;
	var val="";
	var td_type="";
	try{
		td_type=inp.getAttribute("class").split(" ")[0];
	}catch(e){}


	try{
		if(td_type=="propclass"||td_type=="step"||td_type=="sw"||td_type=="hw"||td_type=="seqvalue"){
			for (var i = carpos-1; i >=0; i--) {
				if(txt.charAt(i)===";"||txt.charAt(i)==="{"){
					return val.replace("{","").trim();
				}
				val=txt.charAt(i)+val;
			}
		}
		else{

			var curly_found=false;
			for (var i = carpos-1; i >=0; i--) {

				if(txt.charAt(i)==="{"){
					curly_found=true;break;
				}
				else if(txt.charAt(i)==="}"){
					curly_found=false;break;
				}
			}
			if(curly_found){
				for (var i = carpos-1; i >=0; i--) {
					if(txt.charAt(i)===";"||txt.charAt(i)==="{"){
						return val.replace("{","").trim();
					}
					val=txt.charAt(i)+val;
				}
			}
		}
	}catch(e){
		console.log("Err (checkvalidprop) : "+e.message);
	}				
	return val;
}


function autocomplete(inp, arr) {


	/*arr=idsprop;*/
	/*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function(e) {


		var a, b, i, val = inp.innerText;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");

		var rect=e.target.getBoundingClientRect();

		a.setAttribute("id", e.target.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");

		var nodetype="";
		try{
			nodetype=e.target.parentNode.parentNode.parentNode.getAttribute("class").split(" ")[0];
		}
		catch(e){}

		console.log("--nodetype="+nodetype);

		/*set hint location here*/
		if(nodetype=="reg"||nodetype=="block"){
			/*console.log("clientx1=="+window.getSelection().getRangeAt(0).startOffset);
			var offset_cor=(parseInt(window.getSelection().getRangeAt(0).startOffset)*4)+215;
			*/
			a.setAttribute("style","left:38%;");
		}
		else if(nodetype=="fields"){
			var cur_node=e.target.getAttribute("class").split(" ")[0];
			if(cur_node=="sw"){
				a.setAttribute("style", "left:35%;");
			}
			else if(cur_node=="hw"){
				a.setAttribute("style", "left:44%");	
			}
			else{
				a.setAttribute("style", "right:60px");
			}
		}
		else if(nodetype=="command"){
			var cur_node=e.target.getAttribute("class").split(" ")[0];
			if(cur_node=="step"){
				a.setAttribute("style", "left:29%");
			}
			else if(cur_node=="seqvalue"){
				a.setAttribute("style", "left:48%");
			}	
		}		
		else{
			/*a.setAttribute("style", "left: 29%;");*/
		}

		/*append the DIV element as a child of the autocomplete container:*/
		e.target.parentNode.after(a);


		var hintoffsetHeight=$(a).offset().top;
		var offsetHeight = document.getElementById('regdivcontainer').offsetHeight;//$(document).height();
		hintoffsetHeight=offsetHeight-(hintoffsetHeight);
		var attr=a.getAttribute("style")+";max-height:"+hintoffsetHeight+"px;overflow:auto";
		a.setAttribute("style",attr);

		var checkvalid=checkvalidprop(inp);
		/*console.log("--nodetype="+nodetype);*/

		if(checkvalid==""){
			return;
		}

		var is_not_dot=false;
		if(nodetype=="command"){

			if(checkvalid.indexOf(".")>-1){
				arr=rebind_reg_arr(checkvalid,regdivcontainer);
				is_not_dot=true;
				var checkarr=checkvalid.split(".");
				checkvalid=checkarr[checkarr.length-1];
			}
			else{
				arr=create_reg_arr(regdivcontainer);
			}			/*
			if(checkvalid.endsWith(".")){
				arr=rebind_reg_arr(checkvalid,regdivcontainer);
				is_not_dot=true;
			}
			else{
				arr=create_reg_arr(regdivcontainer);
			}
			*/
		}
		else{

		}

		/*var start=parseInt(val.indexOf(checkvalid));*/
		var curpost=getCaretPosition(inp);
		var start;
		start=curpost-checkvalid.length;
		var end=curpost;
		val=checkvalid;

		/*for each item in the array...*/
		for(var key in arr){
			/*check if the item starts with the same letters as the text field value:*/
			if (key.substr(0, val.length).toUpperCase() == val.toUpperCase()||val.endsWith(".")) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				b.innerHTML = "<strong>" + key.substr(0, val.length) + "</strong>";
				b.innerHTML += key.substr(val.length);
				b.setAttribute("title", arr[key]);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + key + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
					/*insert the value for the autocomplete text field:*/								
					var str3=inp.innerText.substring(0, start)+e.target.getElementsByTagName("input")[0].value+inp.innerText.substring(end, inp.innerText.length);

					inp.innerText =str3;
					closeAllLists();

				});
				a.appendChild(b);
			}
		}
	});

	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");

		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
			currentFocus++;
			e.preventDefault();
			/*and and make the current item more visible:*/
			addActive(x);
			var carpost=getCaretPosition(inp);
			document.getElementById("autocomplete-list").scrollTop=document.getElementById("autocomplete-list").scrollTop+20;
			//			console.log("--scroll pos="+document.getElementById("autocomplete-list").scrollTop);

		} else if (e.keyCode == 38) { 
			/*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
			e.preventDefault();

			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
			document.getElementById("autocomplete-list").scrollTop=document.getElementById("autocomplete-list").scrollTop-20;
		}
		else if (e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			if (currentFocus > -1) {
				e.preventDefault();
				/*and simulate a click on the "active" item:*/

				if (x) x[currentFocus].click();
				var carpost=getCaretPosition(inp);

				placeCaretAtEnd(inp);
			}
		}

		else if (e.keyCode == 27) {

			var x = document.getElementsByClassName("autocomplete-items");
			for (var i = 0; i < x.length; i++) {
				x[i].parentNode.removeChild(x[i]);
			}
		}

		/*on ctrl+space show all hints*/
		if(e.keyCode==32&& e.ctrlKey){	
			alert("Use Dot (.) to get list of all hints");
		}
	});


	function rebind_reg_arr(key,regcontain){
		var dot_arr=key.split(".");
		var last_request=dot_arr[dot_arr.length-2];

		var str={};
		var ids_temps=regcontain.getElementsByClassName("name");
		var search_ele;

		for(var i=0; i<ids_temps.length;i++){
			if(ids_temps[i].innerText==last_request){
				search_ele=ids_temps[i].parentElement.parentElement.parentElement;
			}
		}

		/*var cls=ids_temps[0].parentElement.parentElement.parentElement.getAttribute("class").split(" ")[0];*/
		var key_find_name="name";
		var ids_temps;
		var clss=search_ele.getAttribute("class").split(" ")[0];
		if(clss=="reg"){
			key_find_name="fieldname";
			ids_temps=search_ele.getElementsByClassName(key_find_name);
		}
		else if(clss=="section"){
			ids_temps=get_section_reglist(search_ele,regcontain);
		}
		else if(clss=="block"){
			ids_temps=get_block_reglist(search_ele,regcontain);
		}
		else if(clss=="chip"){
			ids_temps=get_chip_blocklist(search_ele,regcontain);
		}

		var str={};
		for(var i=0; i<ids_temps.length;i++){
			try{
				str[ids_temps[i].innerText]=ids_temps[i].innerText;
			}
			catch(e){}
		}

		return str;
	}

	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}

	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
    except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
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
var idsprop_old = {"clock_edge":"Specifies the clock edge used for implementing registers","repeat":"Repeat a template N number of times",
				   "counter":"This specifies whether the counter will be incrementing or decrementing","size":"Specifies the size of the template",
				   "offset":"The value specifies the offset with respect to the container",
				   "external":"to implement the template outside the generated RTL.",
				   "variant":"Specifies the name of the Variant that the template is in.",
				   "ref":"To reference the signals present in other blocks",
				   "Refvariant":"Specifies the name of the Variant that is referred from the referred file",
				   "override":"used to override the defines/parameters of the included document with the values of the respective parameters/defines in the current document",
				   "reg_hw":"Specify the hw access for register","reg_sw":"Specify the sw access for register","reg_default":"Specify the default value for register",
				   "doc":"Used to add description","addr_sort":"Property to sort the unordered registers",
				   "display_name":"Property to expand array element with name indexing",
				   "is_rsv":"Reserves the space in the memory","output_file_name":"Creates the output file in the name assigned to this property",
				   "vhdl.arch(vhdl.arch)":"Used to change the architecture name of the block/chip",
				   "vhdl.entity":"Changes the name of the entity in the VHDL output","vhdl.package":"Changes the name of the generated VHDL package",
				   "module_name":"Changes the name of the module in the verilog output",
				   "rtl.clock_name(default_clock_name)":"To customize clock name",
				   "registered":"Indicates whether to register the signal coming into the generated module is from the hardware side. Hardware access must be set to writeable.",
				   "rb_valid_stages":"Additional register stages to be added to the valid signal (rd_data_valid) on the read back path from the generated block",
				   "rb_data_stages":"Additional register stages to be added to the data signal (rd_data) on the read back path from the generated block",
				   "rtl.byte_enable":"To exclude/include bytenable signal in case of Proprietary bus",
				   "rtl.name_format":"Required for formating of signal.","addr_decode_stages":"Additional register stages to be added to the decode signal",
				   "wr_stb_stages":"To add the stages in write strobe","rd_stb_stages":"To add the stages in read strobe",
				   "next":"It describes next input value of field.","buffer_trig":"used to specify a field of any register as a trigger",
				   "external_intf_stages":"To remove the flops from the external output signal in vhdl",
				   "cdc.clock":"Add Clock Domain Crossing synchronizers to the field signals",
				   "we":"To change write enable of specific field.","reg_wprot":"To protect the register from the SW ( AXI bus) side",
				   "reg_rprot":"To protect the register to read its value from the SW (AXI bus) side",
				   "reg_prot":"To protect the register  from the SW (APB bus) side",
				   "sharedextbus":"To configure all external registers to share a common bus",
				   "rtl.hw_enb":"Create an input enable signal on the hardware interface when the field is HW writable '<reg>_<field>_in_enb'",
				   "rtl.reg_enb":"Create an output signal '<reg>_enb' on the hardware interface if SW access of the register is writable irrespective of the HW access",
				   "rtl.precedence":"To prioritize HW/SW for write operation","virtual":"To specify an indirect address map",
				   "rtl.axi4_prot":"For '0' assignment to protection signals in IDS generated RTL",
				   "out_enb_stages":"To add the stages in out enb port",
				   "sw_bit_enable":"Refers the ability to enable write operation to a register/field bits via register/field bits given in the value of property",
				   "rtl.bit_enable":"Bit enabled addressing refers to ability to read and write to an individual bit field in a register via software bus interface. A 'bitenable' signal is introduced which is a vector of length equal to regwidth",
				   "byte_addressing":"No description found","avalon_noburst":"To remove bursting from avalon bus.",
				   "wr_rd_valids":"New property that create write and read valids on register inside external reggroup",
				   "addressing":"To alignment of address for registers with different register width.",
				   "counter.incr.val":"This specifies the value by which the counter is incremented",
				   "counter.decr.val":"This specifies the value by which the counter is decremented",
				   "counter.incr.sat":"This specifies the value after which the incrementing counter will not  increment",
				   "counter.decr.sat":"This specifies the value after which the decrementing counter will stop decrementing",
				   "counter.incr.thld":"Threshold counters are inferred to contain an output which designates whether the counter's value exceeds the threshold.",
				   "counter.decr.thld":"Threshold counters are inferred to contain an output which designates whether the counter’s value is lower the threshold.",
				   "counter.sat":"This specifies that the counter is saturated and the saturation by default is 2^(number of bits) if the counter.decr.sat or counter.incr.sat is not specified",
				   "counter.signal":"This is used to control the increment and decrement events of a counter. It is an Active-High event.",
				   "counter.sw.wr":"This specifies that the counter is incrementing/decrementing for write operation from SW interface.",
				   "counter.sw.rd":"This specifies that the counter is incrementing/decrementing for read operation from SW interface.",
				   "counter.precedence":"This property is used to change the sequence of precedence for all three type of counters.",
				   "counter.hw.enb":"To specify enable signal for HW write","counter.sw.wr.enb":"To specify enable signal for SW write",
				   "counter.sw.rd.enb":"To specify enable for SW read",
				   "intr.in":"intr.in is used to specify name of one or multi bit interrupt input signal that needs to be simply ORed ,not registered in flip flops ",
				   "intr.out":"intr.out specifies the name of the output interrupt signal,to translate it into RTL",
				   "intr.status":"Identifies the status register for the interrupt logic","intr.enable":"Identifies the enable register for the interrupt logic",
				   "intr.irq_bit":"The ORed value of all the interrupt channel after enable control logic can be registered and is stored in a field.Output interrupt signal specified in property intr.out is registered in this field",
				   "intr.detect":"intr.detect is used to specify the detection circuitry for input interupt signal registered in any of register/field identified as status or pending",
				   "intr.post":"int.post is used to register software driven interrupts",
				   "intr.mask":"intr.mask is used to specify the mask register for the interrupt logic",
				   "halt.enable":"enables the halt signal to propagate to CPU",
				   "halt.mask":"Halt mask bit corresponding to Status register bit decides that those halt signals will not be allowed to propagate to main halt signal",
				   "intr.nonsticky":"intr.nonsticky property defines a nonsticky interrupt. The associated interrupt field shall not be locked",
				   "intr.irq_per_channel":"To generate per channel Interrupt output"

				  };

var ids_sw_access={"a0":"","a1":"","ro":"readonly","wo":"writeonly","w0t":"write 0 to toggle","w0c":"write 0 to clear","ws":"sw write to set","wc":"sw write to clear",
				   "wcrs":"sw write to clear, sw read to set","wrs":"sw writable, sw read to set","wrc":"sw writable, sw read to clear",
				   "w0crs":"sw write zero to clear, sw read to set","w0src":"sw write to set, sw read to clear","w1src":"sw write one to set,  sw read to clear",
				   "wsrc":"sw write to set, sw read to clear","w1crs":"sw write one to clear, sw read to set","r/wc":"write to clear",
				   "w0s":"write zero to set","w1s":"write one to set","w1t":"write one to toggle","w1c":"write one to clear","rw":"read writable",
				   "r/w0s":"sw readable, sw write zero to set","r/w1s":"sw readable, sw write one to set","r/w1c":"sw readable, sw write one to clear",
				   "r/w0c":"sw readable, sw write zero to clear","r/wc":"sw readable, sw write to clear","r/ws":"sw readable, sw write to set",
				   "r/w1t":"sw readable, sw write one to toggle","r/w0t":"sw readable, sw write zero to toggle","rc":"","rs":""};

var ids_hw_access={"ro":"","wo":"","rw":""};

function bindJSONObj(){

	try{
		var doc=document.getElementsByClassName("ip")[0];
		if(doc){
			var ip_name=doc.innerText.trim().split(".")[0];
			var document_name=getDocumentName().replace(".~$","").split(".")[0];
			var regdiv;
			if(document_name==ip_name||getDocumentName()==ip_name){
				regdiv=document.getElementById("regdivcontainer");
				var refdiv=document.getElementById("refdiv");
				if(refdiv){
					refdiv.innerHTML="";
				}
			}
			else{
				regdiv=document.getElementById("refdiv");
			}

			regdivcontainer=regdiv;

			if(regdiv){
				var str={};
				str=create_reg_arr(regdiv);
				var steps=document.getElementsByClassName("step");
				for(var i=0;i<steps.length;i++){
					autocomplete(steps[i],str);
				}

				var cmdvalue=document.getElementsByClassName("seqvalue");
				for(var i=0;i<cmdvalue.length;i++){
					autocomplete(cmdvalue[i],str);
				}
			}
		}
	}
	catch(e){}
}

function getCurrentDocumentPath(){
	var p=getDocumentName().replace(".~$","").split(".")[0];
	return p+".idsng";
}
function create_reg_arr(regdiv){
	var ids_temps=regdiv.getElementsByClassName("idsTemp");
	var str={};
	for(var i=0; i<ids_temps.length;i++){
		try{
			str[ids_temps[i].getElementsByClassName("name")[0].innerText]=ids_temps[i].getElementsByClassName("name")[0].innerText;
		}
		catch(e){
		}
	}

	return str;
}

function get_section_reglist(section,refele){
	console.log("call section");
	var tab_list=refele.getElementsByClassName("idsTemp");
	var reg_list=[];
	var start_reg=false;
	var clss;
	/*iterate on every idstemplate table*/
	for(var i=0;i<tab_list.length;i++){
		/*get the requested table*/
		if(tab_list[i].getAttribute("id")==section.getAttribute("id")){
			start_reg=true;
			continue;
		}
		if(start_reg){
			clss=tab_list[i].getAttribute("class").split(" ")[0];
			if(clss=="endreggroup"){
				break;
			}
			else if(clss=="reg"){
				reg_list.push(tab_list[i].getElementsByClassName("name")[0]);
			}
		}
	}
	return reg_list;
}

function get_block_reglist(block,refele){
	var tab_list=refele.getElementsByClassName("idsTemp");
	var reg_list=[];
	var start_reg=false;
	var isreg_group_found=false;
	var clss;
	/*iterate on every idstemplate table*/
	for(var i=0;i<tab_list.length;i++){
		/*get the requested table*/
		if(tab_list[i].getAttribute("id")==block.getAttribute("id")){
			start_reg=true;
			continue;
		}
		if(start_reg){
			clss=tab_list[i].getAttribute("class").split(" ")[0];
			if(clss=="block"){
				break;
			}
			else if(clss=="section"){
				reg_list.push(tab_list[i].getElementsByClassName("name")[0]);
				isreg_group_found=true;
			}
			else if(clss=="endreggroup"){
				isreg_group_found=false;
			}
			else if(clss=="reg"){
				if(!isreg_group_found){
					/*console.log("--regname="+tab_list[i].getElementsByClassName("name")[0].innerText);*/
					reg_list.push(tab_list[i].getElementsByClassName("name")[0]);
				}
			}
		}
	}
	return reg_list;
}

function get_chip_blocklist(block,refele){
	var tab_list=refele.getElementsByClassName("idsTemp");
	var reg_list=[];
	var start_reg=false;
	/*iterate on every idstemplate table*/
	for(var i=0;i<tab_list.length;i++){
		/*get the requested table*/
		if(tab_list[i].getAttribute("id")==block.getAttribute("id")){
			start_reg=true;
			continue;
		}
		if(start_reg){
			if(tab_list[i].getAttribute("class").split(" ")[0]=="chip"){
				break;
			}
			if(tab_list[i].getAttribute("class").split(" ")[0]=="block"){
				/*console.log("--regname="+tab_list[i].getElementsByClassName("name")[0].innerText);*/
				reg_list.push(tab_list[i].getElementsByClassName("name")[0]);
			}
		}
	}
	return reg_list;
}

function getDocumentName(){
	var path = window.location.pathname;
	var page = path.split("/").pop();
	return page;
}

function load_ips(obj){
	try{
		var refelement=document.getElementById("refdiv");
		if(refelement){
			refelement.parentElement.removeChild(refelement);
			console.log("--ref element deleted !");
		}
	}
	catch(e){
		console.log("Err load_ips : "+e.message);
	}


	var ip_name=obj.innerText.trim();
	var document_name=getDocumentName().split(".")[0];
	if(document_name==ip_name||getDocumentName()==ip_name){
		/*regdivcontainer=document.getElementById("regdivcontainer");*/
		bindJSONObj();
	}
	else{
		var getReg=clickController.getRegIPs(ip_name);
		bindJSONObj();
	}

}
/*****************************************Auto property hints work end*******************************************************/
var regdivcontainer;


/*****************************************Excel work starts from here*******************************************************/

function dotheneedful(sibling,start) {
	if (sibling != null) {
		start.focus();		
		sibling.focus();
		start = sibling;
	}
}


function spreadsheetKeyEventHandler(e) {
	e = e || window.event;
	var start= event.target || event.srcElement;
	if (e.keyCode == '38') {
		// up arrow
		var idx = start.cellIndex;
		var nextrow = start.parentElement.previousElementSibling;
		if (nextrow != null) {
			var sibling = nextrow.cells[idx];
			dotheneedful(sibling,start);
		}
	} else if (e.keyCode == '40') {
		// down arrow
		var idx = start.cellIndex;
		var nextrow = start.parentElement.nextElementSibling;
		if (nextrow != null) {
			var sibling = nextrow.cells[idx];
			dotheneedful(sibling,start);
		}
	} 
}


$(function() {


});

function getAlphabetsForColumn(index){
	var alphas=alphabets.split('');

	var num=index;
	var finalAlpa="";
	while(num>-1){
		if(num>24){
			finalAlpa=finalAlpa+alphas[0];
			num=num-25;
		}else{
			finalAlpa=finalAlpa+alphas[num];
			num=-1;
		}
	}
	return finalAlpa;
}

function insertcolright(obj){
	addIntoHistory();
	while(clickedEl.tagName.toUpperCase() !== "TD") {
		clickedEl = clickedEl.parentNode;
	}
	var col_num=clickedEl.cellIndex;
	while(clickedEl.tagName.toUpperCase() !== "TABLE") {
		clickedEl = clickedEl.parentNode;
	}
	var table=clickedEl;

	var rows=table.getElementsByTagName("tr");

	for(var i=0;i<rows.length;i++){
		var newEl = document.createElement('td');

		if(i==0){
			newEl.innerHTML = '<div class="col"></div>';
		}
		else{
			newEl.setAttribute("tabindex","0");
		}
		table.rows[i].cells[col_num].after(newEl);
	}
	reArrangeColNum(table);
	addIntoHistory();
}

function insertrowbelow(obj){
	addIntoHistory();
	while(clickedEl.tagName.toUpperCase() !== "TR") {
		clickedEl = clickedEl.parentNode;
	}
	var tabrow=clickedEl;

	while(clickedEl.tagName.toUpperCase() !== "TABLE") {
		clickedEl = clickedEl.parentNode;
	}
	var table=clickedEl;
	var row_num=tabrow.rowIndex;

	var row = table.insertRow(row_num+1);
	row.setAttribute('class','edited');
	row.setAttribute('id',"tab"+Math.random());
	var col_count=table.getElementsByTagName("tr")[0].getElementsByTagName("td").length;
	var cell;
	for(var i=0;i<col_count;i++){
		cell=row.insertCell(i);
		if(i==0){
			cell.setAttribute("class","leftheader");			 
		}
		else{
			cell.setAttribute("tabindex","0");			
		}
	}
	reArrangeRowNum(table);
	addIntoHistory();
}

function reArrangeRowNum(table){
	var row=table.getElementsByClassName("leftheader");
	for(var i=0;i<row.length;i++){
		row[i].innerHTML=i+1;
	}
}

function reArrangeColNum(table){
	console.log("call rearrg col");
	var col=table.rows[0].getElementsByTagName("td");
	for(var i=1;i<col.length;i++){
		col[i].innerHTML=getAlphabetsForColumn(i-1);
	}
}

var excellastselect=document.createElement("div");


function insertAfter(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var iscopy=true;
var row_copy_req=true;
var copycolele=null;
function cutrow(obj){
	iscopy=false;
}

function copyrow(obj){
	row_copy_req=true;
	/*copyrow=true;
	while(clickedEl.tagName.toUpperCase() !== "TR") {
		clickedEl = clickedEl.parentNode;
	}
	excellastselect=clickedEl.outerHTML;
	*/
	excellastselect.innerHTML="";
	while(clickedEl.tagName.toUpperCase() !== "TABLE") {
		clickedEl = clickedEl.parentNode;
	}
	var table=clickedEl;

	var tempTable=document.createElement("table");
	for(var i=0;i<selected_rows.length;i++){
		var tempRow=tempTable.insertRow(i);
		tempRow.innerHTML=table.rows[selected_rows[i]].outerHTML;
	}
	excellastselect.appendChild(tempTable);
}

function copycolumn(obj){
	row_copy_req=false;
	while(clickedEl.tagName.toUpperCase() !== "TD") {
		clickedEl = clickedEl.parentNode;
	}
	var cellindex=clickedEl.cellIndex;


	while(clickedEl.tagName.toUpperCase() !== "TABLE") {
		clickedEl = clickedEl.parentNode;
	}
	var table=clickedEl;
	var rows=table.rows;

	var temprow=document.createElement("tr");

	for(var i=0;i<rows.length;i++){
		var tempcol=temprow.insertCell(i);
		tempcol.innerHTML=rows[i].cells[cellindex].innerHTML;

		if(i>0){
			tempcol.setAttribute("tabindex","0");
		}
	}
	copycolele=temprow;
	console.log("--tempcol="+temprow.outerHTML);
}

function copyexcelrow(){
	try 
	{
		iscopy=true;
		//var table = document.getElementById(tableID);
		var isrowdelete=false;
		var rowCount = table.rows.length;
		for(var i=0; i<rowCount; i++) 
		{
			var row    = table.rows[i];
			var chkbox = row.cells[0].getElementsByTagName("input")[0];
			if(null != chkbox && true == chkbox.checked) 
			{
				var count =excelcount;
				var c = parseInt(count)-parseInt(1); 
				if(rowCount <= 1) 
				{
					alert("Cannot delete all the rows.");
					break;
				}
				table.deleteRow(i);
				rowCount--;
				i--;
				excelcount=c;
				isrowdelete=true;
				/*$('#count').val(c);*/
			}
		}
		return isrowdelete;
	}
	catch(e)
	{
		alert(e);
	}
	return isrowdelete;
}

function pasterow(obj){
	addIntoHistory();
	if(row_copy_req){
		if(excellastselect){
			/*
			while(clickedEl.tagName.toUpperCase() !== "TR") {
				clickedEl = clickedEl.parentNode;
			}
			var tabrow=clickedEl;
			var rowindex=clickedEl.rowIndex;

			while(clickedEl.tagName.toUpperCase() !== "TABLE") {
				clickedEl = clickedEl.parentNode;
			}
			var table=clickedEl;


			var ismutiple=pasteMultipleRows(table,rowindex);
			if(!ismutiple)		{
				var row = table.insertRow(parseInt(rowindex+1));
				row.innerHTML=excellastselect;
			}
			else{
				console.log("not deleted");
			}
			*/
			while(clickedEl.tagName.toUpperCase() !== "TR") {
				clickedEl = clickedEl.parentNode;
			}
			var rowindex=clickedEl.rowIndex;
			while(clickedEl.tagName.toUpperCase() !== "TABLE") {
				clickedEl = clickedEl.parentNode;
			}
			var table=clickedEl;

			var rowCount = table.rows.length;
			var deleteCount=0;
			var index=0;
			var copiedRows=excellastselect.getElementsByTagName("table")[0].rows;

			for(var i=copiedRows.length-1;i>=0;i--){
				var curRow=table.insertRow(rowindex+1);
				curRow.innerHTML=copiedRows[i].innerHTML;
				curRow.setAttribute("id","row"+Math.random());
			}

			reArrangeRowNum(table);
			excellastselect.innerHTML="";
		}
	}
	else {
		while(clickedEl.tagName.toUpperCase() !== "TD") {
			clickedEl = clickedEl.parentNode;
		}
		var col_num=clickedEl.cellIndex;
		while(clickedEl.tagName.toUpperCase() !== "TABLE") {
			clickedEl = clickedEl.parentNode;
		}
		var table=clickedEl;

		var rows=table.getElementsByTagName("tr");
		if(copycolele){
			for(var i=0;i<rows.length;i++){
				var newEl = document.createElement('td');

				if(i==0){
					//newEl.innerHTML = '<div class="col"><input tabindex="-1" class="cellrb" name="col" type="radio"></div>';
				}
				else{
					newEl.setAttribute("tabindex","0");
				}
				newEl.innerHTML=copycolele.cells[i].innerHTML;
				table.rows[i].cells[col_num].after(newEl);

			}
		}
	}
	addIntoHistory();
}

function pasteMultipleRows(table,curr_index){
	try 
	{
		addIntoHistory();
		var isrowdelete=false;
		var rowCount = table.rows.length;
		for(var i=rowCount-1; i>=0; i--) 
		{
			try{
				var row    = table.rows[i];

				var chkbox = row.cells[0].getElementsByTagName("input")[0];
				if(null != chkbox && true == chkbox.checked) 
				{

					var row2=table.insertRow(curr_index+1);
					row2.innerHTML=row.innerHTML;
					isrowdelete=true;
				}
			}catch(ee){}
		}
		return isrowdelete;
	}
	catch(e)
	{
		console.log(e);
	}
	addIntoHistory();
	return isrowdelete;
}

function deleterow(obj){
	/*
	while(clickedEl.tagName.toUpperCase() !== "TR") {
		clickedEl = clickedEl.parentNode;
	}
	var tabrow=clickedEl;

	while(clickedEl.tagName.toUpperCase() !== "TABLE") {
		clickedEl = clickedEl.parentNode;
	}
	var table=clickedEl;

	if(!deleteExcelRow(table)){
		table.deleteRow(tabrow.rowIndex);
	}

	reArrangeRowNum(table);
	*/
	addIntoHistory();
	while(clickedEl.tagName.toUpperCase() !== "TABLE") {
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
	reArrangeRowNum(table);
	addIntoHistory();
}


function deletecolumn(obj){
	addIntoHistory();
	while(clickedEl.tagName.toUpperCase() !== "TD") {
		clickedEl = clickedEl.parentNode;
	}
	var tabcell=clickedEl;


	while(clickedEl.tagName.toUpperCase() !== "TABLE") {
		clickedEl = clickedEl.parentNode;
	}
	var table=clickedEl;
	var exelrows=table.rows;
	var rows=table.rows;
	var cellindex=tabcell.cellIndex;
	for(var i=0;i<rows.length;i++){
		rows[i].deleteCell(cellindex);
	}
	reArrangeColNum(table);
	addIntoHistory();
}


function openexcelmenu(event){
	event.preventDefault();
	var x=event.pageX;
	var y=event.pageY;
	$('#excelmenu').css({'display':'block','left':x,'top':y});

}

function hidetemplate(){
	document.getElementById("exceltemplate").style.display="none";
	$("#backhidder").css("z-index","-1")
}

function showTemplate(){
	document.getElementById("exceltemplate").style.display="block";
	$("#backhidder").css("z-index","0");
}

function deletetemprow(row){
	var rowindex=row.parentNode.parentNode.rowIndex;
	while(row.tagName.toUpperCase() !== "TABLE") {
		row = row.parentNode;
	}
	row.deleteRow(rowindex);
}

function addtemprow(row){
	var rowindex=row.parentNode.parentNode.rowIndex;
	while(row.tagName.toUpperCase() !== "TABLE") {
		row = row.parentNode;
	}

	var table=row;

	var newrow = table.insertRow(parseInt(rowindex+1));
	var cell=newrow.insertCell(0);
	cell.innerHTML="<a href='#' onclick='addtemprow(this);' title='add row' >+</a><span> </span><a title='delete row' href='#' onclick='deletetemprow(this);' >x</a>";

	newrow.insertCell(1);
	newrow.insertCell(2);	
}




function resizeexcel(){
	var exceltab=document.getElementById("idsexcelcontainer").getElementsByClassName("exeltable");
	for(var i=0;i<exceltab.length;i++){
		var td=exceltab[i].getElementsByTagName("td");
		for(var j=0;j<td.length;j++){
			var div=td[j].getElementsByTagName("div")[0];
			if(div){
				div.style.removeProperty("width");
				div.style.removeProperty("height");
			}
		}
	}
}

var excelcount=1;
function deleteExcelRow(table) 
{
	try 
	{
		//var table = document.getElementById(tableID);
		var isrowdelete=false;
		var rowCount = table.rows.length;
		for(var i=0; i<rowCount; i++) 
		{
			var row    = table.rows[i];
			var chkbox = row.cells[0].getElementsByTagName("input")[0];
			if(null != chkbox && true == chkbox.checked) 
			{
				var count =excelcount;
				var c = parseInt(count)-parseInt(1); 
				if(rowCount <= 1) 
				{
					alert("Cannot delete all the rows.");
					break;
				}
				table.deleteRow(i);
				rowCount--;
				i--;
				excelcount=c;
				isrowdelete=true;
				/*$('#count').val(c);*/
			}
		}
		return isrowdelete;
	}
	catch(e)
	{
		alert(e);
	}
	return isrowdelete;
}

function deleteExcelCol(table){
	var cellrb=table.getElementsByClassName("cellrb");
	for(var i=0;i<cellrb.length;i++){
		if(null!=cellrb[i]&&cellrb[i].checked==true){
			var cellInex=cellrb[i].parentNode.parentNode.cellIndex;
			var rows=table.rows;
			for(var i=0;i<rows.length;i++){
				rows[i].deleteCell(cellInex);
			}
			break;
		}
	}
}



/*****************************************Excel work end here*******************************************************/

