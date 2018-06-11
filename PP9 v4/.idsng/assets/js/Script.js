
var firstTable1 = $(".tab1 tbody tr td").attr('class').split(',');
var firstTable2 = $(".tab1 tbody tr:nth-child(2) td:first-child").attr('class').split(',');
var firstTable3 = $(".tab1 tbody tr:nth-child(2) td:nth-child(2)").attr('class').split(',');
var firstTable4 = $(".tab1 tbody tr:nth-child(2) td:nth-child(3)").attr('class').split(',');
//table2
var secondTable1=$(".tab2 tbody tr td:first-child").attr('class').split(',');
var secondTable2=$(".tab2 tbody tr td:nth-child(2)").attr('class').split(',');
var secondTable3=$(".tab2 tbody tr td:nth-child(3)").attr('class').split(',');
var secondTable4=$(".tab2 tbody tr td:nth-child(4)").attr('class').split(',');
//table3
var thirdTable1=$(".tab3 tbody tr td:first-child").attr('class').split(',');
var thirdTable2=$(".tab3 tbody tr td:nth-child(2)").attr('class').split(',');
var thirdTable3=$(".tab3 tbody tr td:nth-child(3)").attr('class').split(',');
var thirdTable4=$(".tab3 tbody tr td:nth-child(4)").attr('class').split(',');
//table4
var fourthTable1=$(".tab4 tbody tr td:first-child").attr('class').split(',');
var fourthTable2=$(".tab4 tbody tr td:nth-child(2)").attr('class').split(',');
var fourthTable3=$(".tab4 tbody tr td:nth-child(3)").attr('class').split(',');
//var imgTab4=$(".tab4 tbody tr th:nth-child(3) img").attr('src').split(',');
var img = document.getElementById('getImg');
var imgTab4=img.getAttribute('src'); // foo.jpg
//table5
var fivthTable1=$(".tab5 tbody tr td:first-child").attr('class').split(',');
var img = document.getElementById('getImg2');
var imgTab5=img.getAttribute('src'); // foo.jpg
//table6
var sixthTable1=$(".tab6 tbody tr td:first-child").attr('class').split(',');
var img = document.getElementById('getImg3');
var imgTab6=img.getAttribute('src'); // foo.jpg
//table7
//table7-2
var seventhTable11=$(".tab7 tbody tr td:first-child").attr('class').split(',');
var seventhTable12=$(".tab7 tbody tr td:nth-child(2)").attr('class').split(',');
var seventhTable13=$(".tab7 tbody tr td:nth-child(3)").attr('class').split(',');
var seventhTable14=$(".tab7 tbody tr td:nth-child(4)").attr('class').split(',');
var seventhTable15=$(".tab7 tbody tr td:nth-child(5)").attr('class').split(',');
var seventhTable16=$(".tab7 tbody tr td:nth-child(6)").attr('class').split(',');
//table8
//var eightTable1=$(".tab8-1 tbody tr td:first-child").attr('class').split(',');
//table8-2
var eightTable11=$(".tab8 tbody tr td:first-child").attr('class').split(',');
var eightTable12=$(".tab8 tbody tr td:nth-child(2)").attr('class').split(',');
var eightTable13=$(".tab8 tbody tr td:nth-child(3)").attr('class').split(',');
var eightTable14=$(".tab8 tbody tr td:nth-child(4)").attr('class').split(',');
var eightTable15=$(".tab8 tbody tr td:nth-child(5)").attr('class').split(',');
var eightTable16=$(".tab8 tbody tr td:nth-child(6)").attr('class').split(',');
//table 9
var nineTable1=$(".tab9 tbody tr td:first-child").attr('class').split(',');
var img = document.getElementById('getImg4');
var imgTab9=img.getAttribute('src'); // foo.jpg
//table10
//var tenTable1=$(".tab10-1 tbody tr td:first-child").attr('class').split(',');
//table10-2
var tenTable101=$(".tab10 tbody tr td:first-child").attr('class').split(',');
var tenTable102=$(".tab10 tbody tr td:nth-child(2)").attr('class').split(',');
var tenTable103=$(".tab10 tbody tr td:nth-child(3)").attr('class').split(',');
var tenTable104=$(".tab10 tbody tr td:nth-child(4)").attr('class').split(',');
var tenTable105=$(".tab10 tbody tr td:nth-child(5)").attr('class').split(',');
var tenTable106=$(".tab10 tbody tr td:nth-child(6)").attr('class').split(',');
//table id's
var tab1=$(".tab1").attr('id').split(',');
var tab2=$(".tab2").attr('id').split(',');
var tab3=$(".tab3").attr('id').split(',');
var tab4=$(".tab4").attr('id').split(',');
var tab5=$(".tab5").attr('id').split(',');
var tab6=$(".tab6").attr('id').split(',');
var tab7=$(".tab7").attr('id').split(',');
var tab7tr=$(".tab7 tbody tr").attr('id').split(',');
var tab8=$(".tab8").attr('id').split(',');
var tab8tr=$(".tab8 tbody tr").attr('id').split(',');
//var tab81=$(".tab8-1").attr('id').split(',');
var tab9=$(".tab9").attr('id').split(',');
var tab10=$(".tab10").attr('id').split(',');
var tab10tr=$(".tab10 tbody tr").attr('id').split(',');
//var tab101=$(".tab10-1").attr('id').split(',');
function tableToArray(table) {
  var result = []
  var rows = table.rows;
  var cells, t;

  // Iterate over rows
  for (var i=0, iLen=rows.length; i<iLen; i++) {
    cells = rows[i].cells;
    t = [];

    // Iterate over cells
    for (var j=0, jLen=cells.length; j<jLen; j++) {
      t.push(cells[j].textContent);
    }
    result.push(t);
  }
  return result; 
}
    //get data from table
    var dataTable1=JSON.stringify(tableToArray(document.getElementsByClassName('tab1')[0]));    
    var dataTable2=JSON.stringify(tableToArray(document.getElementsByClassName('tab2')[0]));    
    var dataTable3=JSON.stringify(tableToArray(document.getElementsByClassName('tab3')[0])); 
    var dataTable4=JSON.stringify(tableToArray(document.getElementsByClassName('tab4')[0])); 
    var dataTable5=JSON.stringify(tableToArray(document.getElementsByClassName('tab5')[0])); 
    var dataTable6=JSON.stringify(tableToArray(document.getElementsByClassName('tab6')[0])); 
    var dataTable7=JSON.stringify(tableToArray(document.getElementsByClassName('tab7')[0])); 
    var dataTable8=JSON.stringify(tableToArray(document.getElementsByClassName('tab8')[0])); 
//    var dataTable81=JSON.stringify(tableToArray(document.getElementsByClassName('tab8-1')[0])); 
    var dataTable9=JSON.stringify(tableToArray(document.getElementsByClassName('tab9')[0])); 
//    var dataTable101=JSON.stringify(tableToArray(document.getElementsByClassName('tab10-1')[0])); 
    var dataTable10=JSON.stringify(tableToArray(document.getElementsByClassName('tab10')[0])); 

//first table
$('#firstTable').jexcel({
    data:dataTable1,
    colHeaders:  ['col 1', 'col 2','col 3' ],
    colWidths: [200,200,200],
    columns: [
        { type:'text', wordWrap:true }
    ]
});
$('#firstTable .jexcel ').addClass('enum idsTemp');
$('#firstTable .jexcel').attr('id', ''+tab1+'');
//add classes
$('#firstTable .jexcel tbody tr:first-child td').addClass(''+firstTable1+'');
$('#firstTable .jexcel tbody tr td:nth-child(2)').addClass(''+firstTable2+'');
$('#firstTable .jexcel tbody tr td:nth-child(3)').addClass(''+firstTable3+'');
$('#firstTable .jexcel tbody tr td:nth-child(4)').addClass(''+firstTable4+'');
//second table
$('#secondTable').jexcel({
    data:dataTable2,
    colHeaders:  [ 'col 1', 'col 2','col 3', 'col 4' ],
    colWidths: [200,200,200,200],
    columns: [
        { type:'text', wordWrap:true }
    ]
});
$('#secondtable .jexcel ').addClass('param idsTemp');
//add id
$('#secondTable .jexcel').attr('id', ''+tab2+'');
//add classes
$('#secondTable .jexcel tbody tr td:nth-child(2)').addClass(''+secondTable1+'');
$('#secondTable .jexcel tbody tr td:nth-child(3)').addClass(''+secondTable2+'');
$('#secondTable .jexcel tbody tr td:nth-child(4)').addClass(''+secondTable3+'');
$('#secondTable .jexcel tbody tr td:nth-child(5)').addClass(''+secondTable4+'');

//third table
$('#thirdTable').jexcel({
    data:dataTable3,
    colHeaders:  [ 'col 1', 'col 2','col 3', 'col 4' ],
    colWidths: [200,200,200,200],
    columns: [
        { type:'text', wordWrap:true }
    ]
});
$('#thirdTable .jexcel ').addClass('busdomain idsTemp');
//add id
$('#thirdTable .jexcel').attr('id', ''+tab3+'');
//add classes
$('#thirdTable .jexcel tbody tr td:nth-child(2)').addClass(''+thirdTable1+'');
$('#thirdTable .jexcel tbody tr td:nth-child(3)').addClass(''+thirdTable2+'');
$('#thirdTable .jexcel tbody tr td:nth-child(4)').addClass(''+thirdTable3+'');
$('#thirdTable .jexcel tbody tr td:nth-child(5)').addClass(''+thirdTable4+'');
//fourth table
$('#fourthTable').jexcel({
    data:dataTable4,
    colHeaders:  [ 'col 1', 'col 2','col 3', 'col 4'  ],
    colWidths: [200,200,200],
    columns: [
        { type:'text', wordWrap:true }
    ]
});
$('#fourthTable .jexcel ').addClass('signals idsTemp');
$('#fourthTable .jexcel tbody tr:nth-child(1) td:nth-child(4) ').html("<img class='img1' alt='signals' title='signals'>");
$('#fourthTable .jexcel .img1 ').attr('src', ''+imgTab4+'');

//add id
$('#fourthTable .jexcel').attr('id', ''+tab4+'');
//add classes
$('#fourthTable .jexcel tbody tr td:nth-child(2)').addClass(''+fourthTable1+'');
$('#fourthTable .jexcel tbody tr td:nth-child(3)').addClass(''+fourthTable2+'');
$('#fourthTable .jexcel tbody tr td:nth-child(4)').addClass(''+fourthTable3+'');
//fivthTable
$('#fivthTable').jexcel({
    data:dataTable5,
    colHeaders:  [ 'col 1 ','col 2 ','col 3 ', 'col 4'],
    colWidths: [200,200,100,200],
    columns: [
        { type:'text', wordWrap:true }
    ]
});
$('#fivthTable .jexcel tbody tr:first-child td:nth-child(4) ').html("<img class='img2' alt='chip' title='chip'>");
$('#fivthTable .jexcel .img2 ').attr('src', ''+imgTab5+'');
$('#fivthTable .jexcel ').addClass('chip idsTemp');
//add id
$('#fivthTable .jexcel').attr('id', ''+tab5+'');
//add classes
$('#fivthTable .jexcel tbody tr td:nth-child(2)').addClass(''+fivthTable1+'');
//sixth table
//sixth table
$('#sixthTable').jexcel({
    data:dataTable6,
     colHeaders:  [ 'col 1 ','col 2 ','col3 ','col 4'],
    colWidths: [200,200,100,200],
    columns: [
        { type:'text', wordWrap:true }
    ]
});
$('#sixthTable .jexcel tbody tr:first-child td:nth-child(4) ').html("<img title='Block' alt='Block'  class='img3'>");
$('#sixthTable .jexcel .img3 ').attr('src', ''+imgTab6+'');
$('#sixthTable .jexcel ').addClass('blocks idsTemp');

//add id
$('#sixthTable .jexcel').attr('id', ''+tab6+'');
//add classes
$('#sixthTable .jexcel tbody tr td:nth-child(2)').addClass(''+sixthTable1+'');
//seventh Table
//$('#seventhTable1').jexcel({
//    data:dataTable71,
//    colHeaders:  [ '' ],
//    colWidths: [850],
//    columns: [
//        { type:'text', wordWrap:true }
//    ]
//});
//
//$('#seventhTable1 .jexcel tbody tr:last-child td:last-child').attr('id', 'table1');
//$('#table1').append(x);
//$('#seventhTable1 .jexcel ').addClass('reg idsTemp');
//
////add id
//$('#seventhTable1 .jexcel').attr('id', ''+tab71+'');
////add classes
//$('#seventhTable1 .jexcel tbody tr td:nth-child(2)').addClass(''+seventhTable1+'');
//seventh Table2
$('#seventhTable1 thead tr td').dblclick(function(){
    $(this).prop('readonly',true)
})
$('#seventhTable1 thead tr td').prop('columnResize',true)
$('#seventhTable ').jexcel({
    data:dataTable7,
    colHeaders:  [ 'Bits ','Name','S/W', 'H/W','Default','Description ' ],
    colWidths: [100,100,100,100,,205],
    columns: [
        { type:'text', wordWrap:true }
    ]
});
$('#seventhTable .jexcel ').addClass('reg idsTemp');
//add id
$('#seventhTable .jexcel').attr('id', ''+tab7+'');
$('#seventhTable .jexcel tr').attr('id', ''+tab7tr+'');
//add classes
$('#seventhTable .jexcel tbody tr td:nth-child(2)').addClass(''+seventhTable11+'');
$('#seventhTable .jexcel tbody tr td:nth-child(3)').addClass(''+seventhTable12+'');
$('#seventhTable .jexcel tbody tr td:nth-child(4)').addClass(''+seventhTable13+'');
$('#seventhTable .jexcel tbody tr td:nth-child(5)').addClass(''+seventhTable14+'');
$('#seventhTable .jexcel tbody tr td:nth-child(6)').addClass(''+seventhTable15+'');
$('#seventhTable .jexcel tbody tr td:nth-child(7)').addClass(''+seventhTable16+'');
//eight table
//$('#eightTable1 ').jexcel({
//    colHeaders:  [ '' ],
//    colWidths: [850],
//    columns: [
//        { type:'text', wordWrap:true }
//    ]
//});
//$('#eightTable1 .jexcel ').addClass('reg idsTemp');
//
////add id
//$('#eightTable1 .jexcel').attr('id', ''+tab81+'');
////add classes
//$('#eightTable1 .jexcel tbody tr td:nth-child(2)').addClass(''+eightTable1+'');
$('#eightTable').jexcel({
    data:dataTable8,
    colHeaders:  [ 'Bits ','Name','S/W', 'H/W','Default','Description ' ],
    colWidths: [100,100,100,100,,205],
    columns: [
        { type:'text', wordWrap:true }
    ]
});
$('#eightTable .jexcel ').addClass('reg idsTemp');

//add id
$('#eightTable .jexcel').attr('id', ''+tab8+'');
$('#eightTable .jexcel tr').attr('id', ''+tab8tr+'');
//add classes
$('#eightTable .jexcel tbody tr td:nth-child(2)').addClass(''+eightTable11+'');
$('#eightTable .jexcel tbody tr td:nth-child(3)').addClass(''+eightTable12+'');
$('#eightTable .jexcel tbody tr td:nth-child(4)').addClass(''+eightTable13+'');
$('#eightTable .jexcel tbody tr td:nth-child(5)').addClass(''+eightTable14+'');
$('#eightTable .jexcel tbody tr td:nth-child(6)').addClass(''+eightTable15+'');
$('#eightTable .jexcel tbody tr td:nth-child(7)').addClass(''+eightTable16+'');
//nine table
$('#nineTable').jexcel({
    data:dataTable9,
   colHeaders:  [ 'col 1 ','col 2 ','col3 ','col 4'],
    colWidths: [200,200,100,200],
    columns: [
        { type:'text', wordWrap:true }
    ]
});

$('#nineTable .jexcel tbody tr:first-child td:nth-child(4) ').html("<img title='Block' alt='Block'  class='img4'>");
$('#nineTable .jexcel .img4 ').attr('src', ''+imgTab9+'');
$('#nineTable .jexcel ').addClass('blocks idsTemp');

//add id
$('#nineTable .jexcel').attr('id', ''+tab9+'');
//add classes
$('#nineTable .jexcel tbody tr td:nth-child(2)').addClass(''+nineTable1+'');
//ten table
//$('#tenTable1 ').jexcel({
//    data:dataTable101,
//    colHeaders:  [ '' ],
//    colWidths: [850],
//    columns: [
//        { type:'text', wordWrap:true }
//    ]
//});
//$('#tenTable1 .jexcel ').addClass('reg idsTemp');
////add id
//$('#tenTable1 .jexcel').attr('id', ''+tab101+'');
////add classes
//$('#tenTable1 .jexcel tbody tr td:nth-child(2)').addClass(''+tenTable1+'');
$('#tenTable').jexcel({
    data:dataTable10,
   colHeaders:  [ 'Bits ','Name','S/W', 'H/W','Default','Description ' ],
    colWidths: [100,100,100,100,,205],
    columns: [
        { type:'text', wordWrap:true }
    ]
});
$('#tenTable .jexcel ').addClass('reg idsTemp');

//add id
$('#tenTable .jexcel').attr('id', ''+tab10+'');
$('#tenTable .jexcel tr').attr('id', ''+tab10tr+'');
//add classes
$('#tenTable .jexcel tbody tr td:nth-child(2)').addClass(''+tenTable101+'');
$('#tenTable .jexcel tbody tr td:nth-child(3)').addClass(''+tenTable102+'');
$('#tenTable .jexcel tbody tr td:nth-child(4)').addClass(''+tenTable103+'');
$('#tenTable .jexcel tbody tr td:nth-child(5)').addClass(''+tenTable104+'');
$('#tenTable .jexcel tbody tr td:nth-child(6)').addClass(''+tenTable105+'');
$('#tenTable .jexcel tbody tr td:nth-child(7)').addClass(''+tenTable106+'');
//setTimeout(function () {
//    html = '<thead class="jexcel_label test">'+
//        '<tr>'+
//        '<td class="jexcel_label"  width="30"></td>'+
//        '<td  width="200" align="center">Name</td>'+
//        '<td width="400" class="controlImg" align="center"><img title="Chip" alt="Chip" src="../.idsng/assets/codepen.jpg"></td>'+
//        '</tr>'+
//        '</thead>';
//
//    $('#fourthTable').find('thead').before(html);
////});
//setTimeout(function () {
//    html = '<thead class="jexcel_label test">'+
//        '<tr>'+
//         '<td class="jexcel_label"  width="30"></td>'+
//         '<td width="200" align="center" title="chip name">chip_name</td>'+ 
//         '<td  width="100" align="center" title="offset"></td>'+ 
//         '<td   width="100" align="center" class="controlImg"><img title="Chip" alt="Chip" src="../.idsng/assets/chip.png"></td>'+ 
//         '<td  width="200" align="center"><label class="label">address|</label><label class="addrvalue" title="address"></label></td>'+ 
//        '</tr>'+
//        '</thead>';
//    $('#fivthTable').find('thead').before(html);
//});
//setTimeout(function () {
//    html = '<thead class="jexcel_label ">'+
//        '<tr>'+
//         '<td class="jexcel_label"  width="30"></td>'+
//         '<td width="200" align="center" title="chip name">chip_name</td>'+ 
//         '<td  width="100" align="center" title="offset" ></td>'+ 
//         '<td   width="100" align="center" class="controlImg"><img title="Chip" alt="Chip" src="../.idsng/assets/network.png" ></td>'+ 
//         '<td  width="200" align="center"><label class="label">address|</label><label class="addrvalue" title="address"></label></td>'+ 
//        '</tr>'+
//        '</thead>';
//    $('#sixthTable').find('thead').before(html);
//});
//setTimeout(function () {
//    html = '<thead class="jexcel_label test">'+
//        '<tr>'+
//         '<td class="jexcel_label"  width="30"></td>'+
//         '<td width="200" align="center" title="chip name">Reg_name</td>'+ 
//         '<td  width="200" align="center" title="offset" ></td>'+ 
//         '<td   width="200" align="center" class="controlImg"><img title="Chip" alt="Chip" src="../.idsng/assets/chip1.png" ></td>'+ 
//         '<td  width="250" align=""><label class="label">address|</label><hr><label class="addrvalue" title="address">Default</label></td>'+ 
//        '</tr>'+
//        '</thead>';
//        
//    $('#seventhTable1').find('thead').before(html);
//});
//setTimeout(function () {
//    html = '<thead class="jexcel_label test">'+
//        '<tr>'+
//         '<td class="jexcel_label"  width="30"></td>'+
//         '<td width="200" align="center" title="chip name">Reg_name2</td>'+ 
//         '<td  width="200" align="center" title="offset" ></td>'+ 
//         '<td   width="200" align="center" class="controlImg"><img title="Chip" alt="Chip" src="../.idsng/assets/chip2.png" ></td>'+ 
//         '<td  width="250" align=""><label class="label">address|</label><hr><label class="addrvalue" title="address">Default</label></td>'+ 
//        '</tr>'+
//        '</thead>'
//        
//        '</thead>';
//    $('#eightTable1').find('thead').before(html);
//});
//setTimeout(function () {
//    html = '<thead class="jexcel_label test">'+
//        '<tr>'+
//         '<td class="jexcel_label"  width="30"></td>'+
//         '<td width="200" align="center" title="chip name">Reg_name</td>'+ 
//         '<td  width="100" align="center" title="offset" ></td>'+ 
//         '<td   width="100" align="center" class="controlImg"><img title="Chip" alt="Chip" src="../.idsng/assets/chip3.png"></td>'+ 
//         '<td  width="200" align="center"><label class="label">address|</label><label class="addrvalue" title="address"></label></td>'+ 
//        '</tr>'+
//        '</thead>';
//    $('#nineTable').find('thead').before(html);
//});
//setTimeout(function () {
//    html = '<thead class="jexcel_label test">'+
//        '<tr>'+
//         '<td class="jexcel_label"  width="30"></td>'+
//         '<td width="200" align="center" title="chip name">Reg_name2</td>'+ 
//         '<td  width="200" align="center" title="offset" ></td>'+ 
//         '<td   width="200" align="center" class="controlImg"><div><img title="Chip" alt="Chip" src="../.idsng/assets/chip4.png" ;"><div></td>'+ 
//         '<td  width="250" align=""><label class="label">address|</label><hr><label class="addrvalue" title="address">Default</label></td>'+ 
//        '</tr>'+
//        '</thead>';        
//    $('#tenTable1').find('thead').before(html);
//});
$(function(){
    //resize Img
//$('.jexcel > tbody > tr > td:first-child').prop('contenteditable',false);
//    $('.controlImg').click(function(){
//    x=prompt('insert image Hight');
//    y=prompt('insert image Wdith');
//       $(this).find('img').height(x);
//     $(this).find('img').width(y);  
//})
    //pagination
    $("#firstTable .jexcel").simplePagination({
				previousButtonClass: "btn btn-danger btn-previous",
				nextButtonClass: "btn btn-danger btn-next"
			});
    $('.btn-previous').prop('contenteditable',false);
    $('.btn-next').prop('contenteditable',false);
    
    $("#secondTable .jexcel").simplePagination({
				previousButtonClass: "btn btn-danger btn-previous",
				nextButtonClass: "btn btn-danger btn-next"
			});
    $('.btn-previous').prop('contenteditable',false);
    $('.btn-next').prop('contenteditable',false);
    $("#thirdTable .jexcel").simplePagination({
				previousButtonClass: "btn btn-danger btn-previous",
				nextButtonClass: "btn btn-danger btn-next"
			});
    $('.btn-previous').prop('contenteditable',false);
    $('.btn-next').prop('contenteditable',false);
    

    $("#fourthTable .jexcel").simplePagination({
				previousButtonClass: "btn btn-danger btn-previous",
				nextButtonClass: "btn btn-danger btn-next"
			});
    $('.btn-previous').prop('contenteditable',false);
    $('.btn-next').prop('contenteditable',false);
    
    $("#fivthTable .jexcel").simplePagination({
				previousButtonClass: "btn btn-danger btn-previous",
				nextButtonClass: "btn btn-danger btn-next"
			});
    $('.btn-previous').prop('contenteditable',false);
    $('.btn-next').prop('contenteditable',false);
    
    $("#sixthTable .jexcel").simplePagination({
				previousButtonClass: "btn btn-danger btn-previous",
				nextButtonClass: "btn btn-danger btn-next"
			});
    $('.btn-previous').prop('contenteditable',false);
    $('.btn-next').prop('contenteditable',false);
    
    $("#seventhTable .jexcel").simplePagination({
				previousButtonClass: "btn btn-danger btn-previous",
				nextButtonClass: "btn btn-danger btn-next"
			});
    $('.btn-previous').prop('contenteditable',false);
    $('.btn-next').prop('contenteditable',false);
    
    $("#eightTable .jexcel").simplePagination({
				previousButtonClass: "btn btn-danger btn-previous",
				nextButtonClass: "btn btn-danger btn-next"
			});
    $('.btn-previous').prop('contenteditable',false);
    $('.btn-next').prop('contenteditable',false);
    
    $("#nineTable .jexcel").simplePagination({
				previousButtonClass: "btn btn-danger btn-previous",
				nextButtonClass: "btn btn-danger btn-next"
			});
    $('.btn-previous').prop('contenteditable',false);
    $('.btn-next').prop('contenteditable',false);
    
    $("#tenTable .jexcel").simplePagination({
				previousButtonClass: "btn btn-danger btn-previous",
				nextButtonClass: "btn btn-danger btn-next"
			});
    $('.btn-previous').prop('contenteditable',false);
    $('.btn-next').prop('contenteditable',false);
    //zoom
    var resetW = $('.list').width();
      var currentZoomW = resetW;
    //var currentZoomH = resetH;
    var originalSize = $('.jexcel').css('font-size');

    $('#btn_ZoomReset').on('click', function(){
            $(this).prop('contenteditable',false)
            $('.list').width(resetW);
            //$('.list').height(resetH);
            $('.jexcel ').css('font-size', originalSize);

        });
    //alert(currentZoom);
     $('#btn_ZoomOut').on('click', function(){
                   $(this).prop('contenteditable',false)
            currentZoomW = currentZoomW - 5;
            //currentZoomH = currentZoomH - 5;

            $('.list').width(currentZoomW);
            //$('#list').height(currentZoomH);
            var currentFontSize = $('.jexcel ,img').css('font-size');
            var currentSize = $('.jexcel ').css('font-size'); 
            var currentSize = parseFloat(currentSize)*0.8;
            $('.jexcel ').css('font-size', currentSize);

        });
      
      
      $('#btn_ZoomIn').on('click', function(){
          $(this).prop('contenteditable',false)
            currentZoomW = currentZoomW + 5;
           // currentZoomH = currentZoomH + 5;
            var currentSize = $('.jexcel ,img').css('font-size'); 
            var currentSize = parseFloat(currentSize)*1.2;
            $('.jexcel , img').css('font-size', currentSize);

            $('.list').width(currentZoomW);
            //$('#list').height(currentZoomH);

        });
    
 $("ul.simple_with_drop").sortable({
  group: 'no-drop',
  handle: 'i.icon-move',
  onDragStart: function ($item, container, _super) {
    // Duplicate items of the no drop area
    if(!container.options.drop)
      $item.clone().insertAfter($item);
    _super($item, container);
  }
});
});
$(function(){
     $('thead td').click(function(){
        $(this).prop('contenteditable',true)
});
})
$('.jexcel tr').addClass('edited')
//new page
function openWin() {
    window.open("file2.html");
}
