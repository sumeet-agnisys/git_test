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


module block1_ids_wrapper
    #(
    //  PARAMETERS
    parameter bus_width   = 32,
    parameter addr_width  = 4,
    
    parameter block_offset   = 'h0,
    parameter block1_address_width = addr_width
    )
    (
    
    block1_reggroup1_reg1_interface.mp   block1_reggroup1_reg1_if,
    block1_reggroup1_reg2_interface.mp   block1_reggroup1_reg2_if,
    block1_reg1_interface.mp   block1_reg1_if,
    axi_if.axi_mp  block1_axi_if
    
    
    );
    // Module Instantiation
    
    block1_ids  block1ids (
    
    //block1_ids
    
    .reg1_enb(block1_reg1_if.reg1_enb),
    .reg1_fld_in_enb(block1_reg1_if.reg1_fld_in_enb),
    .reg1_fld_in(block1_reg1_if.reg1_fld_in),
    .reg1_fld_r (block1_reg1_if.reg1_fld_r),
    
    .reggroup1_reg1_enb(block1_reggroup1_reg1_if.reggroup1_reg1_enb),
    .reggroup1_reg1_fld_in_enb(block1_reggroup1_reg1_if.reggroup1_reg1_fld_in_enb),
    .reggroup1_reg1_fld_in(block1_reggroup1_reg1_if.reggroup1_reg1_fld_in),
    .reggroup1_reg1_fld_r (block1_reggroup1_reg1_if.reggroup1_reg1_fld_r),
    .reggroup1_reg2_enb(block1_reggroup1_reg2_if.reggroup1_reg2_enb),
    .reggroup1_reg2_fld1_in_enb(block1_reggroup1_reg2_if.reggroup1_reg2_fld1_in_enb),
    .reggroup1_reg2_fld1_in(block1_reggroup1_reg2_if.reggroup1_reg2_fld1_in),
    .reggroup1_reg2_fld1_r (block1_reggroup1_reg2_if.reggroup1_reg2_fld1_r),
    
    //AXI signals
    
    .aclk(block1_axi_if.aclk),
    .aresetn(block1_axi_if.aresetn),
    .awaddr(block1_axi_if.awaddr),
    .awvalid(block1_axi_if.awvalid),
    .awready(block1_axi_if.awready),
    .awprot(block1_axi_if.awprot),
    .wdata(block1_axi_if.wdata),
    .wvalid(block1_axi_if.wvalid),
    .wready(block1_axi_if.wready),
    .wstrb(block1_axi_if.wstrb),
    .bresp(block1_axi_if.bresp),
    .bready(block1_axi_if.bready),
    .bvalid(block1_axi_if.bvalid),
    .araddr(block1_axi_if.araddr),
    .arvalid(block1_axi_if.arvalid),
    .arready(block1_axi_if.arready),
    .arprot(block1_axi_if.arprot),
    .rdata(block1_axi_if.rdata),
    .rvalid(block1_axi_if.rvalid),
    .rready(block1_axi_if.rready),
    .rresp(block1_axi_if.rresp)
    );
    
    // Instantiation End
    
endmodule

