//Agnisys, Inc. ***** Copyright 2018 All Rights Reserved. *****
//
//*** This file is auto generated by IDesignSpec (http://www.agnisys.com) . Please do not edit this file. ***
// created by        :
// generated by      : Admin
// generated from    : C:\Users\Admin\Documents\GitHub\git_test\Allegro_test\case1\case1.idsng
// IDesignSpec rev   : idsbatch v4.16.26.2

//*** This code is generated with following settings ***
// Reg Width                  : 32
// Address Unit               : 8
// C++ Types int              : hwint
// Bus Type                   : AXI
// BigEndian                  : false
// LittleEndian               : false
// Dist. Decode and Readback  : false
//---------------------------------------------------------------------------------------------------------------


module block2_ids_wrapper
    #(
    //  PARAMETERS
    parameter bus_width   = 32,
    parameter addr_width  = 5,
    
    parameter block_offset   = 'h0,
    parameter block2_address_width = addr_width
    )
    (
    
    block2_reggroup1_reg1_interface.mp   block2_reggroup1_reg1_if,
    block2_reggroup1_reg2_interface.mp   block2_reggroup1_reg2_if,
    block2_ref_name_reg1_interface.mp   block2_ref_name_reg1_if,
    block2_ref_name_ref_name_reggroup1_reg1_interface.mp   block2_ref_name_ref_name_reggroup1_reg1_if,
    block2_ref_name_ref_name_reggroup1_reg2_interface.mp   block2_ref_name_ref_name_reggroup1_reg2_if,
    axi_if.axi_mp  block2_axi_if
    
    
    );
    // Module Instantiation
    
    block2_ids  block2ids (
    
    //block2_ids
    
    
    .reggroup1_reg1_enb(block2_reggroup1_reg1_if.reggroup1_reg1_enb),
    .reggroup1_reg1_fld_in_enb(block2_reggroup1_reg1_if.reggroup1_reg1_fld_in_enb),
    .reggroup1_reg1_fld_in(block2_reggroup1_reg1_if.reggroup1_reg1_fld_in),
    .reggroup1_reg1_fld_r (block2_reggroup1_reg1_if.reggroup1_reg1_fld_r),
    .reggroup1_reg2_enb(block2_reggroup1_reg2_if.reggroup1_reg2_enb),
    .reggroup1_reg2_fld1_in_enb(block2_reggroup1_reg2_if.reggroup1_reg2_fld1_in_enb),
    .reggroup1_reg2_fld1_in(block2_reggroup1_reg2_if.reggroup1_reg2_fld1_in),
    .reggroup1_reg2_fld1_r (block2_reggroup1_reg2_if.reggroup1_reg2_fld1_r),
    
    .ref_name_reg1_enb(block2_ref_name_reg1_if.ref_name_reg1_enb),
    .ref_name_reg1_fld_in_enb(block2_ref_name_reg1_if.ref_name_reg1_fld_in_enb),
    .ref_name_reg1_fld_in(block2_ref_name_reg1_if.ref_name_reg1_fld_in),
    .ref_name_reg1_fld_r (block2_ref_name_reg1_if.ref_name_reg1_fld_r),
    
    .ref_name_ref_name_reggroup1_reg1_enb(block2_ref_name_ref_name_reggroup1_reg1_if.ref_name_ref_name_reggroup1_reg1_enb),
    .ref_name_ref_name_reggroup1_reg1_fld_in_enb(block2_ref_name_ref_name_reggroup1_reg1_if.ref_name_ref_name_reggroup1_reg1_fld_in_enb),
    .ref_name_ref_name_reggroup1_reg1_fld_in(block2_ref_name_ref_name_reggroup1_reg1_if.ref_name_ref_name_reggroup1_reg1_fld_in),
    .ref_name_ref_name_reggroup1_reg1_fld_r (block2_ref_name_ref_name_reggroup1_reg1_if.ref_name_ref_name_reggroup1_reg1_fld_r),
    .ref_name_ref_name_reggroup1_reg2_enb(block2_ref_name_ref_name_reggroup1_reg2_if.ref_name_ref_name_reggroup1_reg2_enb),
    .ref_name_ref_name_reggroup1_reg2_fld1_in_enb(block2_ref_name_ref_name_reggroup1_reg2_if.ref_name_ref_name_reggroup1_reg2_fld1_in_enb),
    .ref_name_ref_name_reggroup1_reg2_fld1_in(block2_ref_name_ref_name_reggroup1_reg2_if.ref_name_ref_name_reggroup1_reg2_fld1_in),
    .ref_name_ref_name_reggroup1_reg2_fld1_r (block2_ref_name_ref_name_reggroup1_reg2_if.ref_name_ref_name_reggroup1_reg2_fld1_r),
    
    //AXI signals
    
    .aclk(block2_axi_if.aclk),
    .aresetn(block2_axi_if.aresetn),
    .awaddr(block2_axi_if.awaddr),
    .awvalid(block2_axi_if.awvalid),
    .awready(block2_axi_if.awready),
    .awprot(block2_axi_if.awprot),
    .wdata(block2_axi_if.wdata),
    .wvalid(block2_axi_if.wvalid),
    .wready(block2_axi_if.wready),
    .wstrb(block2_axi_if.wstrb),
    .bresp(block2_axi_if.bresp),
    .bready(block2_axi_if.bready),
    .bvalid(block2_axi_if.bvalid),
    .araddr(block2_axi_if.araddr),
    .arvalid(block2_axi_if.arvalid),
    .arready(block2_axi_if.arready),
    .arprot(block2_axi_if.arprot),
    .rdata(block2_axi_if.rdata),
    .rvalid(block2_axi_if.rvalid),
    .rready(block2_axi_if.rready),
    .rresp(block2_axi_if.rresp)
    );
    
    // Instantiation End
    
endmodule

