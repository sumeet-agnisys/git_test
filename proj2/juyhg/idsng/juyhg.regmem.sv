//Agnisys, Inc. ***** Copyright 2018 All Rights Reserved. *****
//
//*** This file is auto generated by IDesignSpec (http://www.agnisys.com) . Please do not edit this file. ***
// created on        : 2019-12-24T12:58:51.037+05:30
// created by        :
// generated by      : Administrator
// generated from    : C:\Users\Administrator\Documents\github\git_test\proj2\juyhg\juyhg.idsng
// IDesignSpec rev   : idsbatch v 6.16.4.7

//*** This code is generated with following settings ***
// Reg Width                  : 32
// Address Unit               : 8
// C++ Types int              : hwint
// Bus Type                   : PROPRIETARY
// BigEndian                  : false
// LittleEndian               : false
// Dist. Decode and Readback  : false
//---------------------------------------------------------------------------------------------------------------
/*----------------------------------------------------------------------
Class       : juyhg_reg_n

Description : lkjhgotyug.r,fl/;
-----------------------------------------------------------------------*/

`ifndef CLASS_juyhg_reg_n
`define CLASS_juyhg_reg_n
class juyhg_reg_n extends uvm_reg;
    `uvm_object_utils(juyhg_reg_n)

    /*kdfjhudlkm*/
    rand uvm_reg_field gur;

    /*rlkjhgfvk*/
    rand uvm_reg_field hha;

    /*ghudfjk*/
    rand uvm_reg_field i3u;

    // Function : new
    function new(string name = "juyhg_reg_n");
        super.new(name, 32, build_coverage(UVM_NO_COVERAGE));
        add_coverage(build_coverage(UVM_NO_COVERAGE));            //Added because build coverage in the line above doesn’t work due to a bug in UVM 1.1 library

    endfunction

    // Function : build
    virtual function void build();
        this.gur = uvm_reg_field::type_id::create("gur");

        this.hha = uvm_reg_field::type_id::create("hha");

        this.i3u = uvm_reg_field::type_id::create("i3u");

        this.gur.configure(this, 7,  25, "RO", 0, 7'd0, 1, 1, 0);
        this.hha.configure(this, 9,  16, "RW", 0, 9'd0, 1, 1, 0);
        this.i3u.configure(this, 16,  0, "RW", 0, 16'd0, 1, 1, 0);

    endfunction
endclass
`endif

/*----------------------------------------------------------------------
Class      : juyhg_block
-----------------------------------------------------------------------*/
`ifndef CLASS_juyhg_block
`define CLASS_juyhg_block
class juyhg_block extends uvm_reg_block;
    `uvm_object_utils(juyhg_block)

    rand juyhg_reg_n reg_n;

    // Function : new
    function new(string name = "juyhg_block");
        super.new(name, UVM_NO_COVERAGE);
    endfunction

    // Function : build
    virtual function void build();
        //REG_N
        reg_n   =   juyhg_reg_n::type_id::create("reg_n");
        reg_n.configure(this, null, "reg_n");
        reg_n.build();

        //define default map and add reg/regfiles
        default_map= create_map("default_map", 'h0, 4, UVM_LITTLE_ENDIAN, 1);
        default_map.add_reg(reg_n, 'h0, "RW");

        lock_model();
    endfunction

endclass : juyhg_block
`endif
