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
`include "block1.v"
`include "block2.v"

module chip_name_ids(
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
    
    aclk,    // Bus clock
    aresetn,    // Reset
    awaddr,    // Write address
    awvalid,    // Write address valid : This signal indicates that write address is valid
    awready,    // Write address ready : This signal indicates that the slave is ready to accept an address
    awprot,    // Write Protection Type
    wdata,    // Write data
    wvalid,    // Write valid         : This signal indicates that valid write data and strobes are available
    wready,    // Write ready         : This signal indicates that the slave can accept the write data
    wstrb,    // Write Strobes
    bresp,    // Write Response
    bready,    // Response Ready
    bvalid,    // Response valid
    araddr,    // Read  address
    arvalid,    // Read address valid  : This signal indicates that the read address is valid and will remain stable until ARREADY is high
    arready,    // Read address ready  : This signal indicates that the slave is ready to accept an address
    arprot,    // Read Protection Type
    rdata,    // Read data
    rvalid,    // Read valid          : This signal indicates that the required read data is available and the read transfer can complete
    rready,    // Read ready          : This signal indicates that the master can accept the read data
    rresp    // Read Response
    
    );
    
    
    
    parameter block1_ids_offset = 'h0;
    
    parameter block2_ids_offset = 'hC;
    parameter addr_width  = 5;
    parameter bus_width   = 32;
    
    //AXI signals
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
    wire [1:0]slave_bresp;
    
    wire [1:0]slave_rresp;
    
    
    wire [bus_width-1:0] block1_ids_rdata;
    wire block1_ids_rvalid;
    wire block1_ids_awready;
    wire block1_ids_wready;
    wire  [1:0] block1_ids_bresp;
    wire block1_ids_bvalid;
    wire block1_ids_arready;
    wire  [1:0] block1_ids_rresp;
    
    wire [bus_width-1:0] block2_ids_rdata;
    wire block2_ids_rvalid;
    wire block2_ids_awready;
    wire block2_ids_wready;
    wire  [1:0] block2_ids_bresp;
    wire block2_ids_bvalid;
    wire block2_ids_arready;
    wire  [1:0] block2_ids_rresp;
    
    wire invalid_address_wr;
    wire invalid_address_rd;
    
    wire wr_error;
    wire rd_error;
    
    reg awvalid_ff;
    reg wvalid_ff;
    
    reg [1:0]rresp_ff;
    reg [1:0]bresp_ff;
    
    
    wire block1_ids_select_wr;
    wire block1_ids_select_rd;
    
    wire block1_ids_wr_data_busy;
    wire block1_ids_wr_addr_busy;
    wire block1_ids_rd_busy;
    
    wire block2_ids_select_wr;
    wire block2_ids_select_rd;
    
    wire block2_ids_wr_data_busy;
    wire block2_ids_wr_addr_busy;
    wire block2_ids_rd_busy;
    
    //block1_ids
    output   block1_idsreg1_enb;
    input  [31 : 0] block1_idsreg1_fld_in;
    input   block1_idsreg1_fld_in_enb;
    output [31 : 0] block1_idsreg1_fld_r;
    
    
    output   block1_idsreggroup1_reg1_enb;
    input  [31 : 0] block1_idsreggroup1_reg1_fld_in;
    input   block1_idsreggroup1_reg1_fld_in_enb;
    output [31 : 0] block1_idsreggroup1_reg1_fld_r;
    
    output   block1_idsreggroup1_reg2_enb;
    input  [31 : 0] block1_idsreggroup1_reg2_fld1_in;
    input   block1_idsreggroup1_reg2_fld1_in_enb;
    output [31 : 0] block1_idsreggroup1_reg2_fld1_r;
    
    
    
    
    assign block1_ids_select_wr =( (awaddr >= block1_ids_offset ) && (awaddr <= block1_ids_offset + 'hB)) ? 1'b1 : 1'b0;
    
    assign block1_ids_select_rd =( (araddr >= block1_ids_offset ) && (araddr <= block1_ids_offset + 'hB)) ? 1'b1 : 1'b0;
    
    
    block1_ids #(.addr_width(addr_width),.block_offset( block1_ids_offset)) block1_idsinst(
    .reg1_enb(block1_idsreg1_enb),
    .reg1_fld_in(block1_idsreg1_fld_in),
    .reg1_fld_in_enb(block1_idsreg1_fld_in_enb),
    .reg1_fld_r(block1_idsreg1_fld_r),
    .reggroup1_reg1_enb(block1_idsreggroup1_reg1_enb),
    .reggroup1_reg1_fld_in(block1_idsreggroup1_reg1_fld_in),
    .reggroup1_reg1_fld_in_enb(block1_idsreggroup1_reg1_fld_in_enb),
    .reggroup1_reg1_fld_r(block1_idsreggroup1_reg1_fld_r),
    .reggroup1_reg2_enb(block1_idsreggroup1_reg2_enb),
    .reggroup1_reg2_fld1_in(block1_idsreggroup1_reg2_fld1_in),
    .reggroup1_reg2_fld1_in_enb(block1_idsreggroup1_reg2_fld1_in_enb),
    .reggroup1_reg2_fld1_r(block1_idsreggroup1_reg2_fld1_r),
    
    .aclk(aclk),
    .aresetn(aresetn),
    .awaddr(awaddr),
    .awvalid(awvalid & ~block1_ids_wr_addr_busy  & ~(&bresp_ff & ~(bready & bvalid))),
    .awready(block1_ids_awready),
    .awprot(awprot),
    .wdata(wdata),
    .wvalid(wvalid & ~block1_ids_wr_data_busy  & ~(&bresp_ff & ~(bready & bvalid))),
    .wready(block1_ids_wready),
    .wstrb(wstrb),
    .bresp(block1_ids_bresp),
    .bready(bready),
    .bvalid(block1_ids_bvalid),
    .araddr(araddr),
    .arvalid(arvalid &  ~rd_error  & ~block2_ids_rd_busy  & ~(&rresp_ff & ~rready)),
    .arready(block1_ids_arready),
    .arprot(arprot),
    .rdata(block1_ids_rdata),
    .rvalid(block1_ids_rvalid),
    .rready(rready),
    .rresp(block1_ids_rresp));
    
    //block2_ids
    
    output   block2_idsreggroup1_reg1_enb;
    input  [31 : 0] block2_idsreggroup1_reg1_fld_in;
    input   block2_idsreggroup1_reg1_fld_in_enb;
    output [31 : 0] block2_idsreggroup1_reg1_fld_r;
    
    output   block2_idsreggroup1_reg2_enb;
    input  [31 : 0] block2_idsreggroup1_reg2_fld1_in;
    input   block2_idsreggroup1_reg2_fld1_in_enb;
    output [31 : 0] block2_idsreggroup1_reg2_fld1_r;
    
    
    output   block2_idsref_name_reg1_enb;
    input  [31 : 0] block2_idsref_name_reg1_fld_in;
    input   block2_idsref_name_reg1_fld_in_enb;
    output [31 : 0] block2_idsref_name_reg1_fld_r;
    
    
    output   block2_idsref_name_ref_name_reggroup1_reg1_enb;
    input  [31 : 0] block2_idsref_name_ref_name_reggroup1_reg1_fld_in;
    input   block2_idsref_name_ref_name_reggroup1_reg1_fld_in_enb;
    output [31 : 0] block2_idsref_name_ref_name_reggroup1_reg1_fld_r;
    
    output   block2_idsref_name_ref_name_reggroup1_reg2_enb;
    input  [31 : 0] block2_idsref_name_ref_name_reggroup1_reg2_fld1_in;
    input   block2_idsref_name_ref_name_reggroup1_reg2_fld1_in_enb;
    output [31 : 0] block2_idsref_name_ref_name_reggroup1_reg2_fld1_r;
    
    
    
    
    assign block2_ids_select_wr =( (awaddr >= block2_ids_offset ) && (awaddr <= block2_ids_offset + 'h13)) ? 1'b1 : 1'b0;
    
    assign block2_ids_select_rd =( (araddr >= block2_ids_offset ) && (araddr <= block2_ids_offset + 'h13)) ? 1'b1 : 1'b0;
    
    
    block2_ids #(.addr_width(addr_width),.block_offset( block2_ids_offset)) block2_idsinst(
    .reggroup1_reg1_enb(block2_idsreggroup1_reg1_enb),
    .reggroup1_reg1_fld_in(block2_idsreggroup1_reg1_fld_in),
    .reggroup1_reg1_fld_in_enb(block2_idsreggroup1_reg1_fld_in_enb),
    .reggroup1_reg1_fld_r(block2_idsreggroup1_reg1_fld_r),
    .reggroup1_reg2_enb(block2_idsreggroup1_reg2_enb),
    .reggroup1_reg2_fld1_in(block2_idsreggroup1_reg2_fld1_in),
    .reggroup1_reg2_fld1_in_enb(block2_idsreggroup1_reg2_fld1_in_enb),
    .reggroup1_reg2_fld1_r(block2_idsreggroup1_reg2_fld1_r),
    .ref_name_reg1_enb(block2_idsref_name_reg1_enb),
    .ref_name_reg1_fld_in(block2_idsref_name_reg1_fld_in),
    .ref_name_reg1_fld_in_enb(block2_idsref_name_reg1_fld_in_enb),
    .ref_name_reg1_fld_r(block2_idsref_name_reg1_fld_r),
    .ref_name_ref_name_reggroup1_reg1_enb(block2_idsref_name_ref_name_reggroup1_reg1_enb),
    .ref_name_ref_name_reggroup1_reg1_fld_in(block2_idsref_name_ref_name_reggroup1_reg1_fld_in),
    .ref_name_ref_name_reggroup1_reg1_fld_in_enb(block2_idsref_name_ref_name_reggroup1_reg1_fld_in_enb),
    .ref_name_ref_name_reggroup1_reg1_fld_r(block2_idsref_name_ref_name_reggroup1_reg1_fld_r),
    .ref_name_ref_name_reggroup1_reg2_enb(block2_idsref_name_ref_name_reggroup1_reg2_enb),
    .ref_name_ref_name_reggroup1_reg2_fld1_in(block2_idsref_name_ref_name_reggroup1_reg2_fld1_in),
    .ref_name_ref_name_reggroup1_reg2_fld1_in_enb(block2_idsref_name_ref_name_reggroup1_reg2_fld1_in_enb),
    .ref_name_ref_name_reggroup1_reg2_fld1_r(block2_idsref_name_ref_name_reggroup1_reg2_fld1_r),
    
    .aclk(aclk),
    .aresetn(aresetn),
    .awaddr(awaddr),
    .awvalid(awvalid & ~block2_ids_wr_addr_busy  & ~(&bresp_ff & ~(bready & bvalid))),
    .awready(block2_ids_awready),
    .awprot(awprot),
    .wdata(wdata),
    .wvalid(wvalid & ~block2_ids_wr_data_busy  & ~(&bresp_ff & ~(bready & bvalid))),
    .wready(block2_ids_wready),
    .wstrb(wstrb),
    .bresp(block2_ids_bresp),
    .bready(bready),
    .bvalid(block2_ids_bvalid),
    .araddr(araddr),
    .arvalid(arvalid &  ~rd_error  & ~block1_ids_rd_busy  & ~(&rresp_ff & ~rready)),
    .arready(block2_ids_arready),
    .arprot(arprot),
    .rdata(block2_ids_rdata),
    .rvalid(block2_ids_rvalid),
    .rready(rready),
    .rresp(block2_ids_rresp));
    
    
    assign invalid_address_wr = ~(block1_ids_select_wr | block2_ids_select_wr) ;
    assign invalid_address_rd = ~(block1_ids_select_rd | block2_ids_select_rd) ;
    
    assign block1_ids_wr_data_busy = (block2_ids_awready == 1'b0 || block1_ids_wready == 1'b0) ? 1'b1 : 1'b0;
    assign block1_ids_wr_addr_busy = (block2_ids_awready == 1'b0) ? 1'b1 : 1'b0;
    assign block1_ids_rd_busy      = (block1_ids_arready == 1'b0) ? 1'b1 : 1'b0;
    
    assign block2_ids_wr_data_busy = (block1_ids_awready == 1'b0 || block2_ids_wready == 1'b0) ? 1'b1 : 1'b0;
    assign block2_ids_wr_addr_busy = (block1_ids_awready == 1'b0) ? 1'b1 : 1'b0;
    assign block2_ids_rd_busy      = (block2_ids_arready == 1'b0) ? 1'b1 : 1'b0;
    
    
    
    assign rdata = block1_ids_rdata | block2_ids_rdata;
    assign rvalid = &rresp_ff | block1_ids_rvalid | block2_ids_rvalid;
    assign awready =   &bresp_ff ?  (wvalid_ff & bready) : (block1_ids_awready & block2_ids_awready);
    assign wready =   (&bresp_ff &  wvalid_ff) ? bready : (block1_ids_wready & block2_ids_wready);
    assign slave_bresp = block1_ids_bresp | block2_ids_bresp;
    assign bresp =  (bresp_ff & {2{wvalid_ff & awvalid_ff}})  | slave_bresp ;
    assign bvalid = (&bresp_ff & (wvalid_ff & awvalid_ff)) | block1_ids_bvalid | block2_ids_bvalid;
    assign arready =   &rresp_ff ? rready : (block1_ids_arready & block2_ids_arready);
    assign slave_rresp = block1_ids_rresp | block2_ids_rresp;
    assign rresp =  rresp_ff  | slave_rresp ;
    
    
    
    assign wr_error = (invalid_address_wr && awvalid == 1'b1 && awready == 1'b1) ;
    assign rd_error = (invalid_address_rd && arvalid == 1'b1 && arready == 1'b1) ;
    
    
    always @(posedge aclk)
        begin
        if (!aresetn)
            begin
                bresp_ff    <= 2'b00 ;
                rresp_ff    <= 2'b00 ;
                awvalid_ff  <= 1'b0  ;
                wvalid_ff   <= 1'b0  ;
            end
        else
            begin
                awvalid_ff  <= (awvalid_ff & ~(awvalid & awready)) ?  ~(bvalid & bready) :  (awvalid & awready) ;
                wvalid_ff   <= (wvalid_ff & ~(wvalid & wready)) ?   ~(bvalid & bready) :  (wvalid & wready) ;
                rresp_ff    <= (rresp_ff == 2'b11 && rd_error  == 1'b0) ? {2{~rready}} : {2{rd_error}};
                
            if(awvalid_ff && &bresp_ff)
                begin
                    bresp_ff  <= (wr_error  == 1'b0  && wvalid_ff == 1'b1) ? {2{~bready}} : bresp_ff;
                end
            else
                begin
                    bresp_ff  <= (bresp_ff == 2'b11 && wr_error  == 1'b0) ? {2{~bready}} : {2{wr_error & ((awvalid & awready) | awvalid_ff)}};
                end
            end
    end // always clk
    
    
endmodule
