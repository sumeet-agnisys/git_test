/* Agnisys, Inc. ***** Copyright 2018 All Rights Reserved. *****

*** This file is auto generated by IDesignSpec (http://www.agnisys.com) . Please do not edit this file. ***
created by          :
generated by        : Agnisys71
IDesignSpec ver     :  7.18.22.0

**** This code is generated with the following settings ***
Reg Width                  : 32
Address Unit               : 8
C++ Types int              : hwint
Bus Type                   : CUSTOM
BigEndian                  : false
LittleEndian               : true
Dist. Decode and Readback  : false
------------------------------------------------------------ */

/*----------------------------------------------------------------------
Class       : sample_top_ERROR11
DESCRIPTION:- Error indicationsbdfrsgtrstg
-----------------------------------------------------------------------*/
`ifndef CLASS_sample_top_ERROR11
`define CLASS_sample_top_ERROR11
class sample_top_ERROR11 extends uvm_reg;
    `uvm_object_utils(sample_top_ERROR11)

    rand uvm_reg_field ERROR12;/**/
    rand uvm_reg_field RESERVED;/*Reserved fieldngdn*/
    rand uvm_reg_field ERROR222;/**/
    rand uvm_reg_field ERROR3eeee;/**/
    rand uvm_reg_field ERROR4fergfsedg;/**/
    rand uvm_reg_field ERROR522;/**/
    rand uvm_reg_field ERROR1;/*Error new*/

    // Function : new
    function new(string name = "sample_top_ERROR11");
        super.new(name, 32, build_coverage(UVM_NO_COVERAGE));
        add_coverage(build_coverage(UVM_NO_COVERAGE));
    endfunction

    // Function : build
    virtual function void build();
        this.ERROR12 = uvm_reg_field::type_id::create("ERROR12");
        this.ERROR12.configure(.parent(this), .size(1), .lsb_pos(31), .access("RO"), .volatile(0), .reset(1'd0), .has_reset(1), .is_rand(1), .individually_accessible(0));
        this.RESERVED = uvm_reg_field::type_id::create("RESERVED");
        this.RESERVED.configure(.parent(this), .size(23), .lsb_pos(8), .access("RO"), .volatile(0), .reset(23'd0), .has_reset(1), .is_rand(1), .individually_accessible(0));
        this.ERROR222 = uvm_reg_field::type_id::create("ERROR222");
        this.ERROR222.configure(.parent(this), .size(1), .lsb_pos(7), .access("RO"), .volatile(0), .reset(1'd0), .has_reset(1), .is_rand(1), .individually_accessible(0));
        this.ERROR3eeee = uvm_reg_field::type_id::create("ERROR3eeee");
        this.ERROR3eeee.configure(.parent(this), .size(1), .lsb_pos(6), .access("RO"), .volatile(0), .reset(1'd0), .has_reset(1), .is_rand(1), .individually_accessible(0));
        this.ERROR4fergfsedg = uvm_reg_field::type_id::create("ERROR4fergfsedg");
        this.ERROR4fergfsedg.configure(.parent(this), .size(1), .lsb_pos(5), .access("RO"), .volatile(0), .reset(1'd0), .has_reset(1), .is_rand(1), .individually_accessible(0));
        this.ERROR522 = uvm_reg_field::type_id::create("ERROR522");
        this.ERROR522.configure(.parent(this), .size(1), .lsb_pos(2), .access("RO"), .volatile(0), .reset(1'd0), .has_reset(1), .is_rand(1), .individually_accessible(0));
        this.ERROR1 = uvm_reg_field::type_id::create("ERROR1");
        this.ERROR1.configure(.parent(this), .size(1), .lsb_pos(1), .access("RO"), .volatile(0), .reset(1'd0), .has_reset(1), .is_rand(1), .individually_accessible(0));
    endfunction
endclass
`endif

/*----------------------------------------------------------------------
Class       : sample_top_reg_name22
DESCRIPTION:-
-----------------------------------------------------------------------*/
`ifndef CLASS_sample_top_reg_name22
`define CLASS_sample_top_reg_name22
class sample_top_reg_name22 extends uvm_reg;
    `uvm_object_utils(sample_top_reg_name22)

    rand uvm_reg_field reg1233;/**/

    // Function : new
    function new(string name = "sample_top_reg_name22");
        super.new(name, 32, build_coverage(UVM_NO_COVERAGE));
        add_coverage(build_coverage(UVM_NO_COVERAGE));
    endfunction

    // Function : build
    virtual function void build();
        this.reg1233 = uvm_reg_field::type_id::create("reg1233");
        this.reg1233.configure(.parent(this), .size(32), .lsb_pos(0), .access("RW"), .volatile(0), .reset(32'd0), .has_reset(1), .is_rand(1), .individually_accessible(0));
    endfunction
endclass
`endif

/*----------------------------------------------------------------------
Class       : sample_top_block
DESCRIPTION:- fnelkrngoflenogie oinfoiendolrf
-----------------------------------------------------------------------*/
`ifndef CLASS_sample_top_block
`define CLASS_sample_top_block
class sample_top_block extends uvm_reg_block;
    `uvm_object_utils(sample_top_block)

    rand sample_top_ERROR11 ERROR11;
    rand sample_top_reg_name22 reg_name22;

    // Function : new
    function new(string name = "sample_top_block");
        super.new(name, UVM_NO_COVERAGE);
    endfunction

    // Function : build
    virtual function void build();
        //define default map and add reg/regfiles
        default_map= create_map("default_map", 'h0, 4, UVM_BIG_ENDIAN, 1);

        //ERROR11
        ERROR11 = sample_top_ERROR11::type_id::create("ERROR11");
        ERROR11.configure(this, null, "ERROR11");
        ERROR11.build();
        default_map.add_reg( ERROR11, 'h0, "RW");

        //REG_NAME22
        reg_name22 = sample_top_reg_name22::type_id::create("reg_name22");
        reg_name22.configure(this, null, "reg_name22");
        reg_name22.build();
        default_map.add_reg( reg_name22, 'h4, "RW");

        lock_model();
    endfunction

endclass
`endif
