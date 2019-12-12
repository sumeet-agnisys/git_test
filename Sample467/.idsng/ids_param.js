var msg_switch_to_reg = "Please switch to Register View to see error";
var msg_switch_to_spreadsheet = "Please switch to Spreadsheet View to see error";
var msg_top_missing = "Error-G Design's Top is missing! Top must be a chip or block";
var msg_dot_use = "Use Dot (.) to get list of all hints";
var msg_cannot_del_row = "Cannot delete all the rows.";
var msg_seq_name_empty = "Error-G Sequence's IP must not be empty";
var msg_width_empty = "Error-G memory's width should not be empty";
var msg_depth_empty = "Error-G Memory's depth should not be empty";
var msg_ref_name_valid = "Error-G Ref instance name should be valid";
var msg_temp_name_valid = "Error-G Template's name is not valid";
var msg_f_name_invalid = "Error-G Field's name is not valid";
var msg_f_bits_invalid = "Error-G Field's bits should have valid value";
var msg_sw_invalid = "Error-G Register's sw access should not be empty";
var msg_offset_invalid = "Error-G Invalid offset value";

var msg_reg_size = "Error : Register's size exceeds from header size. To do this please switch to register view and add register";
var msg_reg_size_exceed = "Error : Register's size exceeds from header size. Please switch to register view";
var msg_reg_blank = "Error : Register's size should not be blank";
var msg_reg_exceed_limit = "Error : Register's size should not exceed from 128 bits";
var msg_reg_not_valid = "Error : Register's size should be valid number in power of 2 format";
var msg_space_not_avail = "Error : Space is not availble. Please remove field from location";
var msg_space_occupied = "Error : Not able to add here. space is pre-occupied";
var msg_param_not_add = "Error : Unable to add parameter on this location.";
var msg_field_bit_blank = "Error : Field's bits should not be blank";
var msg_valid_field_size = "Error : please insert valid field size";
const msg_field_space_not_avail = "Error : Space is not availble.";
var msg_not_add_param = "Error : Cannot add parameter on this location. Either there is no space on selected cell and its right side or parameter is already located.";
var msg_param_not_copied = "Error : No parameter copied";
const PARAM_NOT_FOUND = "Error : specific Param not found ";
const LOCK_REG = "param_locked_register";
const PARAM_ALREADY_EXIST = "Error : Same Param is already exist";
const PARAM_SIZE_NOT_AVAIL = "Error : Space is not availble in regsiter ";
const PARAM_UPDATE_REG_SIZE_EXCEED = "Error : reg size is exceeded by given default size";
const DEFAUL_REG_NAME = "reg_name";
const PARAM_UPDATE_LOCKED = "Warning : Specific param is locked. Please unlock then apply diff change";


//*************PARAM Update Work Starts***************//

function paramUpdate(param_updated, isdiffapply) {
    var def_type = param_updated.getAttribute("data-def_type");
    var param_container = document.getElementById(PARAM_CONTAINER);
    try {
        paramUpdate_core(param_updated, isdiffapply, param_container);
    } catch (e) {
        alert(e);
        if (e.startsWith(PARAM_NOT_FOUND) && def_type === "added" && !isdiffapply) {
            return true;
        }
        return false;
    }
}

function paramUpdate_core(param_updated, isdiffapply, param_container) {
    var name = param_updated.getAttribute("data-name");
    var size = param_updated.getAttribute("data-size");
    var cat = param_updated.getAttribute("data-cat");
    var def = param_updated.getAttribute("data-def");
    var bus = param_updated.getAttribute("data-bus");
    var desc = param_updated.getAttribute("data-desc");
    var def_type = param_updated.getAttribute("data-def_type");
    var sw = param_updated.getAttribute("data-sw");
    var hw = param_updated.getAttribute("data-hw");

    var isUpdate = false;
    if (def_type === "updated") {
        isUpdate = true;
    } else if (def_type === "added" && !isdiffapply) {
        isUpdate = true;
    } else if (def_type === "deleted" && isdiffapply) {
        isUpdate = true;
    }

    var param = searchParamDiff(param_container, cat, bus, name, isUpdate);
    if (!param) {
        if (def_type === "added" && isdiffapply) {
            //insert new reg group here
            param = [];
            param.push(insertNewRegGroup(cat, param_container));
        } else {
            return false;
        }
    }
    /*
     console.log("--reggroup : ");
     console.log("param found : " + param[0].outerHTML);
     console.log("------reg : ");
     console.log("param found : " + param[1].outerHTML);
     console.log("------field : ");
     console.log("param found : " + param[2].outerHTML);
     */

    if (def_type === "updated") {
        return editParam_update(name, size, sw, hw, desc, desc, def, param, isdiffapply, param_updated, cat);
    } else if (def_type === "added") {
        return addNewParam(name, size, sw, hw, desc, def, param, isdiffapply, param_container, cat);
    } else if (def_type === "deleted") {
        deleteNewParam(name, size, sw, hw, desc, def, param, isdiffapply, param_container, cat);
    }

    return true;
}

function param_update_selectAll_click(obj) {
    var isdiffapply = obj.checked;
    var param_container = document.getElementById(PARAM_CONTAINER);
    var chk_diff_list = document.getElementsByClassName("param_update_input_diff");

    var errorlist = "";
    for (var i = 0; i < chk_diff_list.length; i++) {
        var chk_checked = chk_diff_list[i].checked;
        if (chk_checked === isdiffapply) {
            continue;
        }
        var param_updated = chk_diff_list[i].parentNode;
        var def_type = param_updated.getAttribute("data-def_type");

        try {
            paramUpdate_core(param_updated, isdiffapply, param_container);
            chk_diff_list[i].checked = isdiffapply;
        } catch (e) {
            errorlist = e + "\n" + errorlist;
            console.log(e);
            if (e.startsWith(PARAM_NOT_FOUND) && def_type === "added" && !isdiffapply) {
                chk_diff_list[i].checked = true;
            }
            chk_diff_list[i].checked = !isdiffapply;
        }
    }

    if (errorlist !== "") {
        obj.checked = false;
        alert(errorlist);
    }
}

function deleteNewParam(name, size, sw, hw, desc, def, param, isdiffapply, param_container, cat) {
    setScrollToElement(param[1]);
    setOpacityEffect(param[2]);
    if (!isdiffapply) {
        if (param[2]) {
            throw PARAM_ALREADY_EXIST + " : " + cat + " ->" + name;
        }


        /*
         var _bits = getAvailbleLocToAddParam(param[1], size, document.getElementById(PARAM_CONTAINER));
         return addparamfield_core(name, _bits, sw, hw, def, desc, desc, param[1].getElementsByClassName("regtab")[0]);
         */
        addNewParam(name, size, sw, hw, desc, def, param, true, param_container, cat);
    } else {
        return deleteparam(param[2]);
    }
}

/**
 * 
 * @returns {Number} 
 */
function getHeaderSize() {
    return document.getElementById(PARAM_CONTAINER).getElementsByClassName("regcontainer")[0].getElementsByTagName("td").length - 2;
}

/**
 * 
 * @param {type} name
 * @param {type} size
 * @param {type} sw
 * @param {type} hw
 * @param {type} desc
 * @param {type} def
 * @param {type} param
 * @param {type} isdiffapply
 * @param {type} param_container
 * @param {type} cat
 * @returns {Boolean}
 */
function addNewParam(name, size, sw, hw, desc, def, param, isdiffapply, param_container, cat) {
    if (isdiffapply) {
        /*
         var reg_group_id = "";
         if (param.length < 1) {
         var reg_group = insertNewRegGroup(reg_group_name, param_container);
         reg_group_id = reg_group.id;
         param[0] = reg_group;
         }
         if (param.length < 2) {
         var reg_size = param_container.getElementsByClassName("regcontainer")[0].getElementsByTagName("td").length - 2;
         var def_reg_size = reg_size;
         var reg_desc = "";
         var reg_prop = "";
         var reg = insertNewReg(reg_name, param_container, reg_size, def_reg_size, reg_group_id, reg_desc, reg_prop);
         param[1] = reg;
         }
         */
        if (param[2]) {
            throw PARAM_ALREADY_EXIST + " : " + cat + " -> " + name;
        }
        var _bits;
        var _regtab;
        try {
            var availble_reg_data = getAvailbleLocToAddParam(param[0], size, param_container, cat);
            _regtab = availble_reg_data[0];
            _bits = availble_reg_data[1];
        } catch (e) {
            if (e === msg_field_space_not_avail) {
                //insert new register here    
                var reg_group_id = param[0].id;
                var reg_desc = "";
                var reg_prop = "";
                var reg_size = getHeaderSize();
                _bits = "0:" + (size - 1);
                _regtab = insertNewReg(DEFAUL_REG_NAME, param_container, reg_size, reg_size, reg_group_id, reg_desc, reg_prop);
            } else {
                throw e;
            }
        }
        setScrollToElement(_regtab);
        return addparamfield_core(name, _bits, sw, hw, def, desc, desc, _regtab.getElementsByClassName("regtab")[0]);
    } else {
        setScrollToElement(param[2]);
        return deleteparam(param[2]);
    }
}

function setScrollToElement(ele) {
    try {
        var scrollpos = $(ele).offset().top - 20;
        window.scrollTo(0, scrollpos);
    } catch (e) {
    }
}

function insertNewRegGroup(reggroup_name, param_container) {
    var reg_group_id = "reggroup" + Math.random();
    var reg_group = "<table id='" + reg_group_id + "' data-name='" + reggroup_name + "' class='reggroup'><tbody> <tr><td class='paramname'\n\
     style='border: 1px solid grey;'></td><td class='paramname'>" + reggroup_name + "</td><td></td></tr></tbody></table>";
    reg_group = createElementFromHTML(reg_group);

    var end_reg_group = "<table id='endreggrp" + Math.random() + "' class='endreggroupparam'><tbody><tr><td class='paramname'></td><td class='paramname'>\n\
end section</td><td></td></tr></tbody></table>";
    end_reg_group = createElementFromHTML(end_reg_group);
    param_container.append(reg_group);
    param_container.append(end_reg_group);
    return reg_group;
}

function insertNewReg(reg_name, param_container, reg_size, def_reg_size, reg_group_id, reg_desc, reg_prop) {
    var validate = validate_reg_size(reg_size);
    if (validate !== "") {
        throw validate;
    }
    if (def_reg_size < reg_size) {
        throw PARAM_UPDATE_REG_SIZE_EXCEED;
    }

    var cells = "";

    for (var i = 0; i < def_reg_size; i++) {
        if (i >= reg_size) {
            cells = "<td title='" + i + " bit' class='droptarget disbtd'></td>" + cells;
        } else {
            cells = "<td title='" + i + " bit' class='droptarget'></td>" + cells;
        }
    }

    cells = "<tr>" + cells + "</tr>";
    var internal_tab = "<table data-reg-type='" + reg_group_id + "' class='regtab'><tbody>" + cells + "</tbody></table>";
    var top_row = "<tr><td class='paramname' rowspan='2'></td><td class='regname paramname' rowspan='2'>" + reg_name + "</td></tr>";
    top_row = top_row + "<tr><td>" + internal_tab + "</td></tr>";
    var reg_title = reg_name + ":" + reg_size + "\nprop:" + reg_prop + "\ndesc:" + reg_desc;
    var reg_tag = "<table data-size='" + reg_size + "' id='reg" + Math.random() + "' data-name='" + reg_name + "' class='regcontainer' data-desc='" + reg_desc + "' data-prop='" + reg_prop + "' title='" + reg_title + "'><tbody>" + top_row + "</tbody></table>";


    var reg_grop;// = param_container.getElementById(reg_group_id);

    var reg_grop_list = param_container.getElementsByClassName("reggroup");
    for (var i = 0; i < reg_grop_list.length; i++) {
        if (reg_grop_list[i].id === reg_group_id) {
            reg_grop = reg_grop_list[i];
            break;
        }
    }

    var reg = createElementFromHTML(reg_tag);
    if (reg_grop) {
        insertAfter(reg, getLastRegOfRegGroup(reg_grop, param_container));
    } else {
        param_container.append(reg);
    }
    return reg;
}

function getLastRegOfRegGroup(reg_group, param_container) {
    var reg_group_id = reg_group.id;
    var regList = param_container.getElementsByClassName("regtab");
    var reg;
    for (var i = 0; i < regList.length; i++) {
        if (regList[i].getAttribute("data-reg-type") === reg_group_id) {
            reg = regList[i].parentNode;
            while (reg.tagName.toUpperCase() !== "TABLE") {
                reg = reg.parentNode;
            }
        }
    }

    if (!reg) {
        return reg_group;
    }
    return reg;
}

/**
 * 
 * @param {type} reggroup
 * @param {type} size
 * @param {type} param_container
 * @param {type} cat
 * @returns {Array|getAvailbleLocToAddParam.availbits}
 */
function getAvailbleLocToAddParam(reggroup, size, param_container, cat) {
    var availbits;

    var regTabList = param_container.getElementsByClassName("regtab");
    for (var j = 0; j < regTabList.length; j++) {
        if (regTabList[j].getAttribute("data-reg-type") === reggroup.id) {
            var reg = regTabList[j];
            var bits;
            try {
                bits = getAvailbleLocToAddParam_specific_reg(reg, size, cat);
            } catch (e) {
            }
            if (bits) {
                reg = reg.parentNode;
                while (reg.tagName.toUpperCase() !== "TABLE") {
                    reg = reg.parentNode;
                }
                availbits = [];
                availbits.push(reg);
                availbits.push(bits);
                break;
            }
        }
    }
    if (!availbits) {
        throw msg_field_space_not_avail;
    }
    return availbits;
}


/**
 * 
 * @param {type} reg
 * @param {type} size
 * @param {type} cat
 * @returns {String}
 */
function getAvailbleLocToAddParam_specific_reg(reg, size, cat) {
    var bits = reg.getElementsByClassName("droptarget");
    var name = reg.getAttribute("data-name");
    var availbits;
    var bitcounter = 0;
    for (var i = bits.length - 1; i >= 0; i--) {
        var colspan = bits[i].getAttribute("colspan");
        if (colspan !== null&& colspan !== "0") {
            bitcounter = parseInt(bitcounter, 10) + parseInt(colspan - 1);
        }


        var ptag = bits[i].getElementsByTagName("p");
        if (ptag.length === 0) {
            //cell is empty
            var iscellOccupied = false;
            for (var j = 0; j < size; j++) {
                if ((i - j) < 0) {
                    throw PARAM_SIZE_NOT_AVAIL + " : " + cat + " -> " + name + ".";
                    //break;
                }
                var ptag2 = bits[i - j].getElementsByTagName("p");
                if (ptag2.length > 0 || bits[i - j].classList.contains("disbtd")) {
                    iscellOccupied = true;
                    break;
                }
            }
            if (!iscellOccupied) {
                availbits = bitcounter + ":" + (bitcounter + parseInt(size) - 1);
                break;
            }
        }

        bitcounter++;
    }
    return availbits;
}


/**
 * 
 * @param {type} name
 * @param {type} size
 * @param {type} sw
 * @param {type} hw
 * @param {type} desc-1
 * @param {type} desc
 * @param {type} def
 * @param {type} param
 * @param {type} isdiffapply
 * @param {type} param_updated
 * @param {type} cat
 * @returns {Boolean}
 */
function editParam_update(name, size, sw, hw, desc, desc, def, param, isdiffapply, param_updated, cat) {
    var param_curr = param[2];
    var result = false;
    var meta = param_updated.getElementsByClassName("param_update_span_meta");

    if (meta.length === 0) {
        var span = createElementFromHTML("<span class='param_update_span_meta'></span>");
        param_updated.append(span);
        meta = param_updated.getElementsByClassName("param_update_span_meta");
    }
    meta = meta[0];

    if (isdiffapply) {
        //save current status inside meta
        try {
            meta.setAttribute("data-size", param_curr.getAttribute("data-size"));
            meta.setAttribute("data-sw", param_curr.getAttribute("data-sw"));
            meta.setAttribute("data-hw", param_curr.getAttribute("data-hw"));
            meta.setAttribute("data-desc", param_curr.getAttribute("data-desc"));
            meta.setAttribute("data-def", param_curr.getAttribute("data-def"));
        } catch (e) {
            console.log("err saving curr meta : " + e.message);
        }
        try {
            setScrollToElement(param_curr);
            setOpacityEffect(param_curr);
            result = updateparam_param_core(name, size, sw, hw, desc, desc, def, param_curr);
        } catch (e) {
            if (e === msg_field_space_not_avail) {
                //space is not availble in current reg so we need to find out the register which has availble space.
                //is there is such register then we need to insert a new register.
                var param_container = document.getElementById(PARAM_CONTAINER);
                deleteparam(param_curr);
                param.splice(2, 1); //remove param to add into new
                addNewParam(name, size, sw, hw, desc, def, param, isdiffapply, param_container, cat);
                result = true;
                //var param_container=document.getElementById(PARAM_CONTAINER);
                //insertNewReg(name, param_container, size, size, reg_group_id, reg_desc, reg_prop);
            } else {
                throw e;
            }
        }
    } else {
        var up_size = meta.getAttribute("data-size");
        var up_sw = meta.getAttribute("data-sw");
        var up_hw = meta.getAttribute("data-hw");
        var up_desc = meta.getAttribute("data-desc");
        var up_def = meta.getAttribute("data-def");
        setScrollToElement(param_curr);
        setOpacityEffect(param_curr);
        result = updateparam_param_core(name, up_size, up_sw, up_hw, up_desc, up_desc, up_def, param_curr);
    }
    return result;
}

function validateParamDiff() {

}

/**
 * this function search param in given reg_group->All Reg->param
 * @param {type} param_container
 * @param {type} cat
 * @param {type} bus
 * @param {type} name
 * @param {type} isupdate
 * @returns {Array|searchParamDiff.PARAM_DATA}
 */
function searchParamDiff(param_container, cat, bus, name, isupdate) {
    var reggrouplist = param_container.getElementsByClassName("reggroup");
    var param;
    var PARAM_DATA;

    //search on every reg group class
    for (var i = 0; i < reggrouplist.length; i++) {
        if (reggrouplist[i].getAttribute("data-name") === cat) {
            PARAM_DATA = [];
            //now specific reg grouup found so now search for every reg
            PARAM_DATA.push(reggrouplist[i]);
            var reggroupid = reggrouplist[i].getAttribute("id");
            var regTabs = param_container.getElementsByClassName("regtab");
            for (var j = 0; j < regTabs.length; j++) {
                if (regTabs[j].getAttribute("data-reg-type") === reggroupid) {
                    //search in every reg of that specific reg group
                    var regTab = regTabs[j].parentNode;

                    while (regTab.tagName.toUpperCase() !== "TABLE") {
                        regTab = regTab.parentNode;
                    }

//                        console.log("--table : " + regTab.outerHTML);
                    //now specific register has been found
                    //now search for specific field
                    var params = regTab.getElementsByClassName("droptarget");
                    for (var k = 0; k < params.length; k++) {
                        var paramlist = params[k].getElementsByTagName("p");
                        if (paramlist.length > 0) {
                            var temp = paramlist[0];
                            if (temp.getAttribute("data-name") === name) {
                                PARAM_DATA.push(regTab);
                                PARAM_DATA.push(temp);
                                param = temp;
                                break;
                            }
                        }
                    }
                    if (param) {
                        break;
                    }
                }
            }
            if (param) {
                break;
            }

        }
    }

    if (param) {
        if (param.classList.contains(LOCK_REG)) {
            throw PARAM_UPDATE_LOCKED + " : " + cat + " -> " + name;
        }
    }

    if (!param && isupdate) {
        throw PARAM_NOT_FOUND + " : " + cat + " -> " + name;
    }

    return PARAM_DATA;
}

/**
 * this function search param in given reg_group->reg->param
 * @param {type} param_container
 * @param {type} cat
 * @param {type} bus
 * @param {type} name
 * @param {type} isupdate
 * @returns {Array|searchParamDiff.PARAM_DATA}
 */
function searchParamDiff_reg_specific(param_container, cat, bus, name, isupdate) {
    var reggrouplist = param_container.getElementsByClassName("reggroup");
    var param;
    var PARAM_DATA = [];

    //search on every reg group class
    for (var i = 0; i < reggrouplist.length; i++) {
        if (reggrouplist[i].getAttribute("data-name") === cat) {
            //now specific reg grouup found so now search for every reg
            PARAM_DATA.push(reggrouplist[i]);
            var reggroupid = reggrouplist[i].getAttribute("id");
            var regTabs = param_container.getElementsByClassName("regtab");
            for (var j = 0; j < regTabs.length; j++) {
                if (regTabs[j].getAttribute("data-reg-type") === reggroupid) {

                    var regTab = regTabs[j].parentNode;

                    while (regTab.tagName.toUpperCase() !== "TABLE") {
                        regTab = regTab.parentNode;
                    }

                    if (regTab.getAttribute("data-name") === bus) {
//                        console.log("--table : " + regTab.outerHTML);
                        //now specific register has been found
                        //now search for specific field
                        PARAM_DATA.push(regTab);
                        var params = regTab.getElementsByClassName("droptarget");
                        for (var k = 0; k < params.length; k++) {
                            var paramlist = params[k].getElementsByTagName("p");
                            if (paramlist.length > 0) {
                                var temp = paramlist[0];
                                if (temp.getAttribute("data-name") === name) {
                                    PARAM_DATA.push(temp);
                                    param = temp;
                                    break;
                                }
                            }
                        }
                        if (param) {
                            break;
                        }
                    }
                }
            }
            if (param) {
                break;
            }

        }
    }

    if (!param && isupdate) {
        throw PARAM_NOT_FOUND + " : " + cat + " -> " + name;
    }

    return PARAM_DATA;
}





//*************PARAM Update Work End***************//

function click_lock_reg(currreg, locktag) {
    if (currreg.classList.contains(LOCK_REG)) {
        currreg.classList.remove(LOCK_REG);
    } else {
        currreg.classList.add(LOCK_REG);
    }
    openlockicon(currreg, locktag);
}

function openlockicon(obj, locktag) {
    try {
        locktag.classList.remove("fa-unlock");
        locktag.classList.remove("fa-lock");
        if (obj.classList.contains(LOCK_REG)) {
            locktag.classList.add("fa-unlock");
            locktag.setAttribute("title", "unlock from updating");
        } else {
            locktag.classList.add("fa-lock");
            locktag.setAttribute("title", "lock to updating");
        }
    } catch (e) {
        console.log("err " + e.message);
    }
}

function validate_reg_size(reg_size) {
    reg_size = parseInt(reg_size, 10);
    if (reg_size === "") {
        return msg_reg_blank;
    }
    if (reg_size > 128) {
        return msg_reg_exceed_limit;
    }

    if (reg_size === 8 || reg_size === 16 || reg_size === 32 || reg_size === 64 || reg_size === 128) {
    } else {
        return msg_reg_not_valid;
    }
    return "";
}



/*create new register*/
function createparamreg(obj) {
    addIntoHistory();
    var regtable = obj;
    while (regtable.tagName.toUpperCase() !== "TABLE") {
        regtable = regtable.parentNode;
    }

    var reg_name = $("#param_create_reg_name").text();
    var reg_size = $("#param_create_reg_size").text();
    var reg_prop = $("#param_create_reg_prop").html();
    reg_prop = getDescDataAsText(reg_prop);
    var reg_prop_text = $("#param_create_reg_prop").text();

    var reg_desc = $("#param_create_reg_desc").html();
    reg_desc = getDescDataAsText(reg_desc);
    var reg_desc_text = $("#param_create_reg_desc").text();

    var header_size = document.getElementById("paramcontainer").getElementsByClassName("regcontainer")
    [0].getElementsByTagName("td").length - 2;

    var isvalidreg = validate_reg_size(reg_size);
    if (isvalidreg !== "") {
        alert(isvalidreg);
        return;
    }

    if (reg_size > header_size) {
        alert(msg_reg_size);
    } else {
        var row1 = "";
        var row2 = "";
        var title = reg_name + ":" + reg_size + "\nprop:" + reg_prop_text + "\ndesc:" + reg_desc_text;
        row1 = "<tr><td class='paramname' rowspan='2' oncontextmenu='openparamregcontextmenu(event);'></td><td class='regname paramname' rowspan='2' oncontextmenu='openparamregcontextmenu(event);'>" + reg_name + "</td></tr>";

        var counter = -1;
        for (var i = 0; i < header_size; i++) {
            counter++;
            if (i >= reg_size) {
                row2 = "<td title='" + counter + " bit' class='disbtd droptarget'></td>" + row2;
            } else {
                row2 = "<td title='" + counter + " bit' class='droptarget'></td>" + row2;
            }
        }
        row2 = "<tr><td><table data-reg-type='' class='regtab'><tbody><tr>" + row2 + "</tr></tbody></table></td></tr>";
        var tabl = "<table id=tabpreg" + Math.random() + " title='" + title + "' data-header='' data-name=" + reg_name + " data-offset='' data-addr='' data-desc='" + reg_desc + "' data-prop='" + reg_prop + "' data-size=" + reg_size + " class='regcontainer'><tbody>" + row1 + row2 + "</tbody></table>";


        insertAfter(createElementFromHTML(tabl), regtable);
        $("#param_create_reg").css("display", "none");
    }
    addIntoHistory();
}

/*delete register*/
function deleteparamreg(obj) {
    addIntoHistory();
    var regtable = obj;
    while (regtable.tagName.toUpperCase() !== "TABLE") {
        regtable = regtable.parentNode;
    }
    regtable.parentNode.removeChild(regtable);
    addIntoHistory();
}

function getDescDataAsText(desc) {
    try {//&ddq
        desc = desc.replace(/\</g, '$$$$').replace(/\>/g, '$#').replace(/\"/g, '&ddq');
    } catch (e) {
    }
    return desc;
}

function setDescDataAsHtml(desc) {
    try {
        desc = desc.replace(/\$\$/g, "<").replace(/\$\#/g, ">").replace(/&ddq/g, "\"");
    } catch (e) {
        console.log("err in setdescdataashtml : " + e.message);
    }
    return desc;
}

/*open popup for regsiter edit*/
function addparamreg(obj) {
    var regtable = obj;
    while (regtable.tagName.toUpperCase() !== "TABLE") {
        regtable = regtable.parentNode;
    }
    var reg_size = regtable.getAttribute("data-size");
    var reg_name = regtable.getAttribute("data-name");
    var reg_prop = regtable.getAttribute("data-prop");
    reg_prop = setDescDataAsHtml(reg_prop);
    var reg_desc = regtable.getAttribute("data-desc");
    var regtab = regtable.getElementsByClassName("regtab")[0];

    reg_desc = setDescDataAsHtml(reg_desc);

    $("#param_edit_reg_name").text(reg_name);
    $("#param_edit_reg_size").text(reg_size);
    $("#param_edit_reg_prop").html(reg_prop);
    $("#param_edit_reg_desc").html(reg_desc);
}

function getheadersize() {
    return document.getElementById("paramcontainer").getElementsByClassName("regcontainer")
    [0].getElementsByTagName("td").length - 2;
}

/*update register*/
function updateparam(obj) {
    addIntoHistory();
    var regtable = obj;
    while (regtable.tagName.toUpperCase() !== "TABLE") {
        regtable = regtable.parentNode;
    }
    var reg_name = $("#param_edit_reg_name").text();
    var reg_size = $("#param_edit_reg_size").text();

    var reg_prop = $("#param_edit_reg_prop").html();
    reg_prop = getDescDataAsText(reg_prop);
    var reg_prop_text = $("#param_edit_reg_prop").text();

    var reg_desc = $("#param_edit_reg_desc").html();
    reg_desc = getDescDataAsText(reg_desc);
    var reg_desc_text = $("#param_edit_reg_desc").text();

    var title = reg_name + ":" + reg_size + "\nprop:" + reg_prop_text + "\ndesc:" + reg_desc_text;
    var header_size = getheadersize();
    var validate = validate_reg_size(reg_size);
    if (validate !== "") {
        alert(validate);
        return;
    }

    if (reg_size > header_size) {
        alert(msg_reg_size_exceed);
        return false;
    }

    var cells = regtable.getElementsByClassName("regtab")[0].getElementsByTagName("td");
    var reg_org_size = parseInt(regtable.getAttribute("data-size"), 10);
    reg_size = parseInt(reg_size, 10);

    if (reg_org_size > reg_size) {/*request to decrease size*/
        console.log("size decrease");
        var temp_reg_size = 0;
        var reg_size_found = false;
        for (var i = cells.length - 1; i >= 0; i--) {

            if (temp_reg_size === reg_size) {
                reg_size_found = true;
            }

            if (temp_reg_size >= reg_size) {
                if (cells[i].innerHTML !== "") {
                    alert(msg_space_not_avail);
                    return false;
                }
                //cells[i].classList.add("disbtd");
            }
            if (temp_reg_size > reg_size && !reg_size_found) {
                alert(msg_space_not_avail);
                return false;
            }

            var colspan = parseInt(cells[i].getAttribute("colspan"), 10);
            if (colspan) {
                temp_reg_size = temp_reg_size + colspan - 1;
            }
            temp_reg_size++;
        }

        if (!reg_size_found) {
            alert(msg_space_not_avail);
            return false;
        }

        temp_reg_size = 0;
        for (var i = cells.length - 1; i >= 0; i--) {

            if (temp_reg_size >= reg_size) {
                if (cells[i].innerHTML !== "") {
                    alert(msg_space_not_avail);
                    return false;
                }
                cells[i].classList.add("disbtd");
            }
            var colspan = parseInt(cells[i].getAttribute("colspan"), 10);
            if (colspan) {
                temp_reg_size = temp_reg_size + colspan - 1;
            }
            temp_reg_size++;
        }
        regtable.setAttribute("data-size", reg_size);

    } else {/*request to increase size*/
        var temp_reg_size = 0;

        for (var i = cells.length - 1; i >= 0; i--) {
            /*
             if(cells[i].innerHTML!==""){
             alert("Error space is not availble. Please remove field from localtion");
             return ;
             }*/
            if (temp_reg_size === reg_size) {
                break;
            }
            cells[i].classList.remove("disbtd");
            cells[i].classList.add("droptarget");
            var colspan = parseInt(cells[i].getAttribute("colspan"), 10);
            if (colspan) {
                temp_reg_size = temp_reg_size + colspan - 1;
            }
            temp_reg_size++;
        }
        regtable.setAttribute("data-size", reg_size);
    }

    if (reg_name !== "") {
        regtable.setAttribute("data-name", reg_name);
        regtable.getElementsByClassName("regname")[0].innerText = reg_name;
    }
    regtable.setAttribute("data-desc", reg_desc);
    regtable.setAttribute("data-prop", reg_prop);
    regtable.setAttribute("title", title);

    $("#param_edit_reg").css("display", "none");
    addIntoHistory();
}

/*add new field (param)*/
function addparamfield(obj) {
    addIntoHistory();
    var regtable = obj;
    while (regtable.tagName.toUpperCase() !== "TABLE") {
        regtable = regtable.parentNode;
    }

    var name = $("#param_cell_add_name").text();
    var bits = $("#param_cell_add_bits").text();
    var sw = $("#param_cell_add_sw").text();
    var hw = $("#param_cell_add_hw").text();
    var def = $("#param_cell_add_def").text();
    var desc = $("#param_cell_add_desc").html();
    desc = getDescDataAsText(desc);
    var desc_text = $("#param_cell_add_desc").text();
    return addparamfield_core(name, bits, sw, hw, def, desc, desc_text, regtable);
}

function setOpacityEffect(ele) {
    try {
        $(ele).css('opacity', '0.2');
        $(ele).animate({
            opacity: 1
        }, 1000);
    } catch (e) {
    }
}

function addparamfield_core(name, bits, sw, hw, def, desc, desc_text, regtable) {
    var validate = validatefield(name, bits, sw, hw, desc);
    var displayname = name;
    if (displayname === "") {
        displayname = "[]";
    }


    if (validate !== "") {
        alert(validate);
        return false;
    }
    //bits=parseInt(bits,10);
    var startbit;
    var endbit;
    var bitarr = bits.split(":");
    if (bitarr.length > 1) {
        startbit = parseInt(bitarr[0]);
        endbit = parseInt(bitarr[1]);
        var tmp;
        if (startbit > endbit) {
            tmp = endbit;
            endbit = startbit;
            startbit = tmp;
        }
    } else {
        //startbit=obj.cellIndex;
        startbit = parseInt(bits, 10);
        endbit = startbit;
    }

    var size = endbit - startbit + 1;
    var title = name + " " + size + "\nsw access : " + sw + "\nhw access : " + hw + "\ndefault : " + def + "\ndesc:" + desc_text;
    var fieldNodestr = "<p id='dragtar" + Math.random() + "' style='background-color: rgb(212, 224, 226);' data-id='tab_field" + Math.random() + "' data-size='" + size + "' data-name='" + name + "' data-sw='" + sw + "' data-hw='" + hw + "' data-default='" + def + "' data-desc='" + desc + "' draggable='true' class='dragtarget' title='" + title + "'>" + displayname + "</p>";

    var fieldNode = createElementFromHTML(fieldNodestr);

    var removecell;

    var cells = regtable.getElementsByTagName("td");
    var isadded = false;
    //for(var i=0;i<cells.length;i++){
    var bitcounter = 0;

    startbit = parseInt(startbit, 10);
    endbit = parseInt(endbit, 10);
    var curr_cell;

    if (startbit === endbit) {
        for (var i = cells.length - 1; i >= 0; i--) {
            if (bitcounter === startbit) {
                if (cells[i].innerHTML !== "" || cells[i].classList.contains("disbtd")) {
                    alert(msg_space_occupied + " : " + startbit + ":" + endbit);
                    return false;
                } else {
                    //$(cells[i]).append(fieldNodestr);
                    $(cells[i]).append(fieldNode);
                    setOpacityEffect(fieldNode);
                    addIntoHistory();
                    return true;
                }
            }

            var colspan = cells[i].getAttribute("colspan");
            if (colspan !== null && colspan !== "0") {
                bitcounter = parseInt(bitcounter, 10) + parseInt(colspan - 1);
            }
            bitcounter++;
        }
    } else {
        for (var i = cells.length - 1; i >= 0; i--) {
            if (bitcounter > endbit) {
                break;
            }
            if (bitcounter >= startbit && bitcounter <= endbit) {
                if (cells[i].innerHTML !== "" || cells[i].classList.contains("disbtd")) {
                    alert(msg_space_occupied + " : " + startbit + ":" + endbit);
                    return false;
                }
                if (bitcounter === startbit) {
                    curr_cell = cells[i];
                    isadded = true;
                }
            }
            var colspan = cells[i].getAttribute("colspan");
            if (colspan !== null && colspan !== "0") {
                bitcounter = parseInt(bitcounter, 10) + parseInt(colspan - 1);
            }
            bitcounter++;
        }
    }

    if (curr_cell) {
        setOpacityEffect(fieldNode);
        $(curr_cell).append(fieldNode);

        //$(curr_cell).append(fieldNodestr);
        isadded = true;
        if (startbit !== endbit) {
            curr_cell.setAttribute("colspan", size);
        }
    }
    bitcounter = 0;
    if (isadded) {
        for (var i = cells.length - 1; i >= 0; i--) {
            if (bitcounter === startbit) {
                for (var j = 0; j < endbit - startbit; j++) {
                    cells[i - (j + 1)].parentNode.deleteCell(i - (j + 1));
                }
                break;
            }
            var colspan = cells[i].getAttribute("colspan");
            if (colspan !== null&& colspan !== "0") {
                bitcounter = parseInt(bitcounter, 10) + parseInt(colspan - 1);
            }
            bitcounter++;
        }
    } else {
        alert(msg_param_not_add + " : " + startbit + ":" + endbit);
    }
    addIntoHistory();
    return isadded;
}

function validatefield(name, bits, sw, hw, desc) {
    if (bits === "") {
        return msg_field_bit_blank;
    }

    return "";
}

/*open popup to add new field(param)*/
function openaddfieldmenu(obj) {
    var regtable = obj;
    while (regtable.tagName.toUpperCase() !== "TABLE") {
        regtable = regtable.parentNode;
    }
    var cells = regtable.getElementsByTagName("td");
    var bitcounter = 0;
    for (var i = cells.length - 1; i >= 0; i--) {
        if (i === obj.cellIndex) {
            break;
        }
        var colspan = cells[i].getAttribute("colspan");
        if (colspan !== null&& colspan !== "0") {
            bitcounter = parseInt(bitcounter, 10) + parseInt(colspan - 1);
        }
        bitcounter++;
    }
    $("#param_cell_add_name").text("");
    $("#param_cell_add_bits").text(bitcounter);
    $("#param_cell_add_sw").text("");
    $("#param_cell_add_hw").text("");
    $("#param_cell_add_def").text("");
    $("#param_cell_add_desc").html("");
}

/*open popup menu to edit into field (param)*/
function editparam(obj) {
    var name = obj.getAttribute("data-name");
    var bits = obj.getAttribute("data-size");
    var sw = obj.getAttribute("data-sw");
    var hw = obj.getAttribute("data-hw");
    var def = obj.getAttribute("data-default");
    var desc = obj.getAttribute("data-desc");
    desc = setDescDataAsHtml(desc);

    $("#param_field_edit_menu_name").text(name);
    $("#param_field_edit_menu_bits").text(bits);
    $("#param_field_edit_menu_sw").text(sw);
    $("#param_field_edit_menu_hw").text(hw);
    $("#param_field_edit_menu_def").text(def);
    $("#param_field_edit_menu_desc").html(desc);
}

function validateFieldSize(size) {
    if (size === "0") {
        return msg_valid_field_size;
    }

    var number = /^[0-9]+$/;
    if (!size.match(number)) {
        return msg_valid_field_size;
    }
    return "";

}

function updateparam_param(obj) {
    addIntoHistory();
    var name = $("#param_field_edit_menu_name").text();
    var size = $("#param_field_edit_menu_bits").text();
    var sw = $("#param_field_edit_menu_sw").text();
    var hw = $("#param_field_edit_menu_hw").text();
    var desc = $("#param_field_edit_menu_desc").html();
    desc = getDescDataAsText(desc);
    var desc_text = $("#param_field_edit_menu_desc").text();
    var def = $("#param_field_edit_menu_def").text();
    try {
        return updateparam_param_core(name, size, sw, hw, desc, desc_text, def, obj);
    } catch (e) {
        alert(e);
    }
}

function updateparam_param_core(name, size, sw, hw, desc, desc_text, def, obj) {
    var actualsize;
    var isadded = false;
    var curr_size = obj.getAttribute("data-size");

    var isvalidsize = validateFieldSize(size);
    if (isvalidsize !== "") {
        alert(isvalidsize);
        return false;
    }

    curr_size = parseInt(curr_size);

    actualsize = parseInt(actualsize);

    var regtable = obj;
    while (regtable.tagName.toUpperCase() !== "TABLE") {
        regtable = regtable.parentNode;
    }

    if (curr_size > size) {/*size is decreasing*/
        actualsize = curr_size - size;
        var cell = obj.parentNode;
        cell.setAttribute("colspan", size);
        for (var i = 0; i < actualsize; i++) {
            $("<td class='droptarget'></td>").insertBefore($(cell));
        }
        isadded = true;
    } else {/*size in increasing*/
        actualsize = size - curr_size;

        var cells = regtable.getElementsByTagName("td");
        var bitcounter = 0;
        var cell = obj.parentNode;

        for (var i = cells.length - 1; i >= 0; i--) {
            if (cell.cellIndex === i) {
                isadded = true;
                //try to insert in left space
                for (var j = i - 1; j >= i - actualsize; j--) {
                    try {
                        if (cells[j].classList.contains("disbtd") || cells[j].innerHTML !== "") {
                            isadded = false;
                            break;
                        }
                    } catch (e) {
                        isadded = false;
                    }
                }
                if (!isadded) {
                    //break;
                } else {
                    cell.setAttribute("colspan", size);
                    var curr_cellindex = cell.cellIndex;
                    for (var j = 0; j < actualsize; j++) {
                        var del_index = curr_cellindex - (j + 1);
                        cells[del_index].parentNode.deleteCell(del_index);
                    }
                    break;
                }

                isadded = true;
                //try to insert in right space
                for (var j = i + 1; j <= i + actualsize; j++) {
                    try {
                        if (cells[j].classList.contains("disbtd") || cells[j].innerHTML !== "") {
                            isadded = false;
                            break;
                        }
                    } catch (e) {
                        isadded = false;
                    }
                }
                if (!isadded) {
                    break;
                } else {
                    cell.setAttribute("colspan", size);
                    var curr_cellindex = cell.cellIndex;
                    for (var j = 0; j < actualsize; j++) {
                        var del_index = curr_cellindex + 1;
                        cells[del_index].parentNode.deleteCell(del_index);
                    }
                    break;
                }
            }
            var colspan = cells[i].getAttribute("colspan");
            if (colspan !== null&& colspan !== "0") {
                bitcounter = parseInt(bitcounter, 10) + parseInt(colspan - 1);
            }
            bitcounter++;
        }

    }

    if (isadded) {
        obj.setAttribute("data-size", size);
        obj.setAttribute("data-name", name);
        var n = "[]";
        if (name !== "") {
            n = name;
        }
        $(obj).text(n);
        obj.setAttribute("data-sw", sw);
        obj.setAttribute("data-hw", hw);
        obj.setAttribute("data-desc", desc);
        obj.setAttribute("data-default", def);
        var title = name + ":" + size + "\nsw:" + sw + "\nhw:" + hw + "\ndef:" + def + "\ndesc:" + desc_text;
        obj.setAttribute("title", title);
        updateBits(regtable.getElementsByTagName("tr")[0]);
        addIntoHistory();
    } else {
        //alert(msg_field_space_not_avail);
        throw msg_field_space_not_avail;
    }
    return isadded;
}

/*delete field(param)*/
function deleteparam(obj) {
    addIntoHistory();

    var regtable = obj;
    while (regtable.tagName.toUpperCase() !== "TABLE") {
        regtable = regtable.parentNode;
    }

    var cell = obj.parentNode;
    var colspan = cell.getAttribute("colspan");
    if (colspan === null) {
        colspan = 1;
    }

    for (var i = 0; i < colspan; i++) {
        $("<td class='droptarget'></td>").insertBefore($(cell));
    }

    //$("<td class='droptarget'></td>").insertBefore($(obj));
    obj.parentNode.parentNode.removeChild(obj.parentNode);

    var row = regtable.getElementsByTagName("tr")[0];
    updateBits(row);
    addIntoHistory();
    return true;
}

var copiedparam;
/*copy param*/
function copyparam(obj) {
    copiedparam = obj;
    iscut = false;
    addIntoHistory();
}

var iscut = false;
function cutparam(obj) {
    copiedparam = obj;//.cloneNode(true);
    addIntoHistory();
    try {
        deleteparam(obj)
    } catch (e) {
    }
    iscut = true;
}

/*event call to paste field(param)*/
function pasteparam(obj) {
    if (copiedparam) {
        //addIntoHistory();
        var colspan = copiedparam.parentNode.getAttribute("colspan");
        var cell = obj.parentNode;
        var parentcolspan = colspan;
        if (colspan != null && colspan > 1) {
            colspan = parseInt(colspan);

            var regtable = obj;
            while (regtable.tagName.toUpperCase() != "TABLE") {
                regtable = regtable.parentNode;
            }
            var cells = regtable.getElementsByTagName("td");
            var bitcounter = 0;
            var isadded = false;

            for (var i = cells.length - 1; i >= 0; i--) {
                if (obj.cellIndex === i) {
                    isadded = true;
                    //                for(var j=i+1;j<i+actualsize;j++)
                    for (var j = i - 1; j >= i - parentcolspan + 1; j--) {

                        try {
                            if (cells[j].classList.contains("disbtd") || cells[j].innerHTML !== "") {
                                isadded = false;
                                break;
                            }
                        } catch (e) {
                            isadded = false;
                        }
                    }
                    if (!isadded) {
                        break;
                    } else {
                        var curr_cellindex = obj.cellIndex;
                        for (var j = 0; j < parentcolspan - 1; j++) {
                            var del_index = curr_cellindex - (j + 1);
                            cells[del_index].parentNode.deleteCell(del_index);
                        }
                        obj.setAttribute("colspan", parentcolspan);
                        break;
                    }
                }
                var colspan = cells[i].getAttribute("colspan");
                if (colspan != null) {
                    bitcounter = parseInt(bitcounter, 10) + parseInt(colspan - 1);
                }
                bitcounter++;
            }
        } else {
            if (obj.innerHTML === "") {
                $(obj).append(newNode);
                isadded = true;
            }
        }

        if (!isadded) {
            alert(msg_not_add_param);
        } else {
            var newNode = copiedparam.cloneNode(true);
            newNode.setAttribute("id", "dragtar" + Math.random());
            newNode.setAttribute("data-id", "field" + Math.random());
            $(obj).css("background-color", "#d4e0e2");
            $(obj).append(newNode);
            /*
             if (iscut) {
             deleteparam(copiedparam);
             iscut = false;
             }*/
        }



        addIntoHistory();
    } else {
        alert(msg_param_not_copied);
    }
}


function dragElement(elmnt) {
    try {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    } catch (e) {
    }
}

function hideallparampopupmenu() {
    $("#param_reg_menu").css("display", "none");
    $("#param_create_reg").css("display", "none");
    $("#param_edit_reg").css("display", "none");
    $("#param_cell_menu").css("display", "none");
    $("#param_cell_add").css("display", "none");
    $('#param_field_edit_menu').css({'display': 'none'});
    $("#param_field_toolbar").css("display", "none");
    $('#param_field_edit_menu').css({'display': 'none'});
}

function updateBits(paramRow) {
    try {
        var cells = paramRow.getElementsByTagName("td");
        var cell_counter = -1;
        for (var i = cells.length - 1; i >= 0; i--) {
            if (cells[i].hasAttribute("colspan") && cells[i].getAttribute("colspan") > 0) {
                cell_counter = cell_counter + parseInt(cells[i].getAttribute("colspan"));
            } else {
                cell_counter++;
            }
            cells[i].setAttribute("title", cell_counter + " bit");
        }
    } catch (e) {
        console.log("err in updateBit : " + e.message);
    }
}
