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

module chip_name_qformal(
    block1_idsreg1_enb,
    block1_idsreg1_fld_in,
    block1_idsreg1_fld_in_enb,
    block1_idsreg1_fld_r,
    block1_idsreggroup1_reg1_enb,
    block1_idsreggroup1_reg1_fld_in,
    block1_idsreggroup1_reg1_fld_in_enb,
    block1_idsreggroup1_reg1_fld_r,
    block1_idsreggroup1_reg2_enb,
    block1_idsreggroup1_reg2_fld1_in,
    block1_idsreggroup1_reg2_fld1_in_enb,
    block1_idsreggroup1_reg2_fld1_r,
    
    block2_idsreggroup1_reg1_enb,
    block2_idsreggroup1_reg1_fld_in,
    block2_idsreggroup1_reg1_fld_in_enb,
    block2_idsreggroup1_reg1_fld_r,
    block2_idsreggroup1_reg2_enb,
    block2_idsreggroup1_reg2_fld1_in,
    block2_idsreggroup1_reg2_fld1_in_enb,
    block2_idsreggroup1_reg2_fld1_r,
    block2_idsref_name_reg1_enb,
    block2_idsref_name_reg1_fld_in,
    block2_idsref_name_reg1_fld_in_enb,
    block2_idsref_name_reg1_fld_r,
    block2_idsref_name_ref_name_reggroup1_reg1_enb,
    block2_idsref_name_ref_name_reggroup1_reg1_fld_in,
    block2_idsref_name_ref_name_reggroup1_reg1_fld_in_enb,
    block2_idsref_name_ref_name_reggroup1_reg1_fld_r,
    block2_idsref_name_ref_name_reggroup1_reg2_enb,
    block2_idsref_name_ref_name_reggroup1_reg2_fld1_in,
    block2_idsref_name_ref_name_reggroup1_reg2_fld1_in_enb,
    block2_idsref_name_ref_name_reggroup1_reg2_fld1_r,
    
    
    //AXI signals
    aclk,   // Bus clock
    aresetn,   // Reset
    awaddr,   // Write address
    awvalid,   // Write address valid : This signal indicates that write address is valid
    awready,   // Write address ready : This signal indicates that the slave is ready to accept an address
    awprot,   // Write Protection Type
    wdata,   // Write data
    wvalid,   // Write valid         : This signal indicates that valid write data and strobes are available
    wready,   // Write ready         : This signal indicates that the slave can accept the write data
    wstrb,   // Write Strobes
    bresp,   // Write Response
    bready,   // Response Ready
    bvalid,   // Response valid
    araddr,   // Read  address
    arvalid,   // Read address valid  : This signal indicates that the read address is valid and will remain stable until ARREADY is high
    arready,   // Read address ready  : This signal indicates that the slave is ready to accept an address
    arprot,   // Read Protection Type
    rdata,   // Read data
    rvalid,   // Read valid          : This signal indicates that the required read data is available and the read transfer can complete
    rready,   // Read ready          : This signal indicates that the master can accept the read data
    rresp   // Read Response
    );
    
    
    //  PARAMETERS
    parameter bus_width  = 32;
    parameter addr_width = 5;
    
    
    
    // REGISTER :reg1
    
    //-----------------------------------------------------
    // REGISTER : REG1 SIGNALS
    output  block1_idsreg1_enb;    // REGISTER ENABLE
    
    // HW WRITE-ABLE SIGNAL FOR EACH FIELD
    input  block1_idsreg1_fld_in_enb ;      // FIELD : FLD
    
    // READ DATA SIGNAL FOR EACH FIELD
    output  [31 : 0] block1_idsreg1_fld_r ;      // FIELD : FLD
    
    // HW WRITE DATA SIGNAL FOR EACH FIELD
    input   [31 : 0] block1_idsreg1_fld_in ;      // FIELD : FLD
    
    
    // REGISTER :reg1
    
    //-----------------------------------------------------
    // REGISTER : REG1 SIGNALS
    output  block1_idsreggroup1_reg1_enb;    // REGISTER ENABLE
    
    // HW WRITE-ABLE SIGNAL FOR EACH FIELD
    input  block1_idsreggroup1_reg1_fld_in_enb ;      // FIELD : FLD
    
    // READ DATA SIGNAL FOR EACH FIELD
    output  [31 : 0] block1_idsreggroup1_reg1_fld_r ;      // FIELD : FLD
    
    // HW WRITE DATA SIGNAL FOR EACH FIELD
    input   [31 : 0] block1_idsreggroup1_reg1_fld_in ;      // FIELD : FLD
    
    
    // REGISTER :reg2
    
    //-----------------------------------------------------
    // REGISTER : REG2 SIGNALS
    output  block1_idsreggroup1_reg2_enb;    // REGISTER ENABLE
    
    // HW WRITE-ABLE SIGNAL FOR EACH FIELD
    input  block1_idsreggroup1_reg2_fld1_in_enb ;      // FIELD : FLD1
    
    // READ DATA SIGNAL FOR EACH FIELD
    output  [31 : 0] block1_idsreggroup1_reg2_fld1_r ;      // FIELD : FLD1
    
    // HW WRITE DATA SIGNAL FOR EACH FIELD
    input   [31 : 0] block1_idsreggroup1_reg2_fld1_in ;      // FIELD : FLD1
    
    
    // REGISTER :reg1
    
    //-----------------------------------------------------
    // REGISTER : REG1 SIGNALS
    output  block2_idsreggroup1_reg1_enb;    // REGISTER ENABLE
    
    // HW WRITE-ABLE SIGNAL FOR EACH FIELD
    input  block2_idsreggroup1_reg1_fld_in_enb ;      // FIELD : FLD
    
    // READ DATA SIGNAL FOR EACH FIELD
    output  [31 : 0] block2_idsreggroup1_reg1_fld_r ;      // FIELD : FLD
    
    // HW WRITE DATA SIGNAL FOR EACH FIELD
    input   [31 : 0] block2_idsreggroup1_reg1_fld_in ;      // FIELD : FLD
    
    
    // REGISTER :reg2
    
    //-----------------------------------------------------
    // REGISTER : REG2 SIGNALS
    output  block2_idsreggroup1_reg2_enb;    // REGISTER ENABLE
    
    // HW WRITE-ABLE SIGNAL FOR EACH FIELD
    input  block2_idsreggroup1_reg2_fld1_in_enb ;      // FIELD : FLD1
    
    // READ DATA SIGNAL FOR EACH FIELD
    output  [31 : 0] block2_idsreggroup1_reg2_fld1_r ;      // FIELD : FLD1
    
    // HW WRITE DATA SIGNAL FOR EACH FIELD
    input   [31 : 0] block2_idsreggroup1_reg2_fld1_in ;      // FIELD : FLD1
    
    
    // REGISTER :reg1
    
    //-----------------------------------------------------
    // REGISTER : REG1 SIGNALS
    output  block2_idsref_name_reg1_enb;    // REGISTER ENABLE
    
    // HW WRITE-ABLE SIGNAL FOR EACH FIELD
    input  block2_idsref_name_reg1_fld_in_enb ;      // FIELD : FLD
    
    // READ DATA SIGNAL FOR EACH FIELD
    output  [31 : 0] block2_idsref_name_reg1_fld_r ;      // FIELD : FLD
    
    // HW WRITE DATA SIGNAL FOR EACH FIELD
    input   [31 : 0] block2_idsref_name_reg1_fld_in ;      // FIELD : FLD
    
    
    // REGISTER :reg1
    
    //-----------------------------------------------------
    // REGISTER : REG1 SIGNALS
    output  block2_idsref_name_ref_name_reggroup1_reg1_enb;    // REGISTER ENABLE
    
    // HW WRITE-ABLE SIGNAL FOR EACH FIELD
    input  block2_idsref_name_ref_name_reggroup1_reg1_fld_in_enb ;      // FIELD : FLD
    
    // READ DATA SIGNAL FOR EACH FIELD
    output  [31 : 0] block2_idsref_name_ref_name_reggroup1_reg1_fld_r ;      // FIELD : FLD
    
    // HW WRITE DATA SIGNAL FOR EACH FIELD
    input   [31 : 0] block2_idsref_name_ref_name_reggroup1_reg1_fld_in ;      // FIELD : FLD
    
    
    // REGISTER :reg2
    
    //-----------------------------------------------------
    // REGISTER : REG2 SIGNALS
    output  block2_idsref_name_ref_name_reggroup1_reg2_enb;    // REGISTER ENABLE
    
    // HW WRITE-ABLE SIGNAL FOR EACH FIELD
    input  block2_idsref_name_ref_name_reggroup1_reg2_fld1_in_enb ;      // FIELD : FLD1
    
    // READ DATA SIGNAL FOR EACH FIELD
    output  [31 : 0] block2_idsref_name_ref_name_reggroup1_reg2_fld1_r ;      // FIELD : FLD1
    
    // HW WRITE DATA SIGNAL FOR EACH FIELD
    input   [31 : 0] block2_idsref_name_ref_name_reggroup1_reg2_fld1_in ;      // FIELD : FLD1
    
    input aclk;
    input aresetn;
    input [addr_width-1 : 0] awaddr;
    input awvalid;
    output awready;
    input [2 : 0] awprot;
    input [bus_width-1 : 0] wdata;
    input wvalid;
    output wready;
    input [bus_width/8-1 : 0] wstrb;
    output [1 : 0] bresp;
    input bready;
    output bvalid;
    input [addr_width-1 : 0] araddr;
    input arvalid;
    output arready;
    input [2 : 0] arprot;
    output [bus_width-1 : 0] rdata;
    output rvalid;
    input rready;
    output [1 : 0] rresp;
    
    chip_name_ids chip_name_dut (.*);
    
    bind chip_name_dut chip_name_ids_assert chip_name_am (.block1_idsreg1_fld_q(block1_idsinst._fld_q),
    .block1_idsreg1_wr_valid(block1_idsinst.reg1_wr_valid),
    .block1_idsreg1_rd_valid(block1_idsinst.reg1_rd_valid),
    .block1_idsreggroup1_reg1_fld_q(block1_idsinst._fld_q),
    .block1_idsreggroup1_reg1_wr_valid(block1_idsinst.reggroup1_reg1_wr_valid),
    .block1_idsreggroup1_reg1_rd_valid(block1_idsinst.reggroup1_reg1_rd_valid),
    .block1_idsreggroup1_reg2_fld1_q(block1_idsinst._fld1_q),
    .block1_idsreggroup1_reg2_wr_valid(block1_idsinst.reggroup1_reg2_wr_valid),
    .block1_idsreggroup1_reg2_rd_valid(block1_idsinst.reggroup1_reg2_rd_valid),
    .block2_idsreggroup1_reg1_fld_q(block2_idsinst._fld_q),
    .block2_idsreggroup1_reg1_wr_valid(block2_idsinst.reggroup1_reg1_wr_valid),
    .block2_idsreggroup1_reg1_rd_valid(block2_idsinst.reggroup1_reg1_rd_valid),
    .block2_idsreggroup1_reg2_fld1_q(block2_idsinst._fld1_q),
    .block2_idsreggroup1_reg2_wr_valid(block2_idsinst.reggroup1_reg2_wr_valid),
    .block2_idsreggroup1_reg2_rd_valid(block2_idsinst.reggroup1_reg2_rd_valid),
    .block2_idsref_name_reg1_fld_q(block2_idsinst._fld_q),
    .block2_idsref_name_reg1_wr_valid(block2_idsinst.ref_name_reg1_wr_valid),
    .block2_idsref_name_reg1_rd_valid(block2_idsinst.ref_name_reg1_rd_valid),
    .block2_idsref_name_ref_name_reggroup1_reg1_fld_q(block2_idsinst._fld_q),
    .block2_idsref_name_ref_name_reggroup1_reg1_wr_valid(block2_idsinst.ref_name_ref_name_reggroup1_reg1_wr_valid),
    .block2_idsref_name_ref_name_reggroup1_reg1_rd_valid(block2_idsinst.ref_name_ref_name_reggroup1_reg1_rd_valid),
    .block2_idsref_name_ref_name_reggroup1_reg2_fld1_q(block2_idsinst._fld1_q),
    .block2_idsref_name_ref_name_reggroup1_reg2_wr_valid(block2_idsinst.ref_name_ref_name_reggroup1_reg2_wr_valid),
    .block2_idsref_name_ref_name_reggroup1_reg2_rd_valid(block2_idsinst.ref_name_ref_name_reggroup1_reg2_rd_valid),
    .*);
    
endmodule
