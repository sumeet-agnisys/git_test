$(document).ready(function(){
    $(".editable").each(function(index){
        $(this).on("focusout",function(){
            var row=$(this).closest('tr');
            var lsb=row.find("td.lsb").text();
            var decimal=row.find("td.decimal").text();
            var weight_cell=row.find("td.weight");
            calculateWeight(lsb,decimal,weight_cell)
        });
         $(this).attr('contenteditable','true');
    }); 
});

function calculateWeight(lsb,decimal,weight_cell){
    var int_lsb;
    var int_decimal;    
    try{
        int_lsb=parseInt(lsb);
        int_decimal=parseInt(decimal);
    }catch(e){
        alert("Error : Please insert valid number");
        return;
    }

    $(weight_cell).text(int_decimal*Math.pow(2,int_lsb));
}