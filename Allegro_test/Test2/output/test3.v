//Agnisys, Inc. ***** Copyright 2018 All Rights Reserved. *****
//
//*** This file is auto generated by IDesignSpec (http://www.agnisys.com) . Please do not edit this file. ***
// created by        :
// generated by      : Admin
// generated from    : C:\Users\Admin\Documents\GitHub\git_test\Allegro_test\Test2\test3.idsng
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

//------------------------------------------------
//  BLOCK : TEST3 MODULE
//

module test3_ids(
    
    // REGISTER : REG_NAME PORT SIGNAL
    reg_name_enb,
    reg_name_rrw_in,
    reg_name_rrw_in_enb,
    reg_name_rrw_r,
    
    
    
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
    parameter bus_width   = 32;
    parameter addr_width = 2;
    
    parameter block_offset  = {(addr_width){1'b0}};
    
    
    parameter test3_address_width = addr_width;
    //-----------------------------------------------------
    // REGISTER : REG_NAME SIGNALS
    
    
    wire    reg_name_decode;         // Write DECODE
    wire    reg_name_rdecode;        // Read  DECODE
    wire    reg_name_wr_valid;       // WRITE VALID
    wire    reg_name_rd_valid;       // READ VALID
    wire    [bus_width-1 : 0] reg_name_rd_data;          // READ DATA
    wire    [64-1 : 0] reg_name_offset;  // OFFSET
    output  reg_name_enb;    // REGISTER ENABLE
    
    // HW WRITE-ABLE SIGNAL FOR EACH FIELD
    input   reg_name_rrw_in_enb ;      // FIELD : RRW
    
    // BUFFER SIGNAL FOR EACH FIELD
    reg reg_name_rrw_q ;      // FIELD : RRW
    
    // READ DATA SIGNAL FOR EACH FIELD
    output  reg_name_rrw_r ;      // FIELD : RRW
    
    // HW WRITE DATA SIGNAL FOR EACH FIELD
    input   reg_name_rrw_in ;      // FIELD : RRW
    
    //-----------------------------------------------------
    
    
    
    //AXI signals
    input aclk;
    input aresetn;
    input [addr_width-1 : 0] awaddr;
    input awvalid;
    output awready;
    input [2 : 0] awprot;
    wire  [2 : 0] awprot_i;
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
    wire  [2 : 0] arprot_i;
    output [bus_width-1 : 0] rdata;
    output rvalid;
    input rready;
    output [1 : 0] rresp;
    
    wire  clk;
    wire  reset_l;
    wire   rd_stb;
    wire   rd_wait;
    wire   wr_stb;
    wire  [addr_width-1:0]  address;
    wire  [bus_width-1:0]  wr_data;
    wire   request;
    wire  rd_data_vld;
    wire  [bus_width-1:0] rd_data;
    wire [addr_width-1 : 0] raddress;
    wire  wr_error;
    wire  rd_error;
    wire  wr_decode_error;
    wire  rd_decode_error;
    wire  wr_slave_select;
    wire  rd_slave_select;
    wire  [addr_width-1:0] slvwaddr;
    wire  [addr_width-1:0] slvraddr;
    wire [bus_width-1 : 0] reg_enb;
    wire [bus_width/8 -1 : 0] byte_enb;
    
    axi_widget #(.addr_width(addr_width), .bus_width(bus_width)) axi(
            .aclk(aclk),
            .aresetn(aresetn),
            .awaddr(awaddr),
            .awvalid(awvalid),
            .awready(awready),
            .awprot(awprot),
            .awprot_i(awprot_i),
            .wdata(wdata),
            .wvalid(wvalid),
            .wready(wready),
            .wstrb(wstrb),
            .bresp(bresp),
            .bready(bready),
            .bvalid(bvalid),
            .araddr(araddr),
            .arvalid(arvalid),
            .arready(arready),
            .arprot(arprot),
            .arprot_i(arprot_i),
            .rdata(rdata),
            .rvalid(rvalid),
            .rready(rready),
            .rresp(rresp),
            .clk(clk),
            .reset_l(reset_l),
            .request(request),
            .wr_stb(wr_stb),
            .wr_decode_error(wr_decode_error),
            .rd_decode_error(rd_decode_error),
            .wr_slave_select(wr_slave_select),
            .rd_slave_select(rd_slave_select),
            .slvwaddr(slvwaddr),
            .slvraddr(slvraddr),
            .rd_stb(rd_stb),
            .rd_wait(rd_wait),
            .wr_error(wr_error),
            .rd_error(rd_error),
            .rd_data(rd_data),
            .wr_data(wr_data),
            .address(address),
            .raddress(raddress),
            .rd_data_vld(rd_data_vld),
            .byte_enb(byte_enb));
    //end widget
    
    assign reg_enb =  {
    {8{byte_enb[3]}} ,
    {8{byte_enb[2]}} ,
    {8{byte_enb[1]}} ,
    {8{byte_enb[0]}}};
    
    
    
    
    //----------------------------------------------------------------------------------------------------
    // REGISTER      :  REG_NAME
    // ADDRESS       :  block_offset+'h0                WIDTH : 32
    // HW ACCESS     :  READ-WRITE
    // SW ACCESS     :  READ-WRITE
    //
    // FIELDS   :
    //        1 : rrw  ( SW : Read-Write HW : Read-Write )
    
    //-----------------------------------------------------------------------------
    // DESCRIPTION  :  NA
    //
    
    
    assign reg_name_wr_valid = reg_name_decode && wr_stb;
    assign reg_name_rd_valid = reg_name_rdecode && rd_stb;
    assign reg_name_enb      = reg_name_wr_valid;
    assign reg_name_offset = block_offset+'h0;
    assign reg_name_decode  = (address[test3_address_width-1 : 0]    == reg_name_offset[test3_address_width-1 : 0] ) ? 1'b1 : 1'b0;
    assign reg_name_rdecode = (raddress[test3_address_width-1 : 0]   == reg_name_offset[test3_address_width-1 : 0] ) ? 1'b1 : 1'b0;
    
    
    //----------------------------------------------------------------------------
    // FIELD  : RRW
    // HW ACCESS  :  READ-WRITE                          WIDTH  :  1
    // SW ACCESS  :  READ-WRITE                          OFFSET :  1
    //-----------------------------------------------------------------
    // DESCRIPTION   :
    //
    
    always @(posedge clk)
        
        begin
        if (!reset_l)
            begin
                
                reg_name_rrw_q  <= 1'd0;
            end
        else
            begin
            if (reg_name_rrw_in_enb)   // RRW : HW Write
                begin
                    reg_name_rrw_q <= reg_name_rrw_in;
                end
            else
                begin
                    
                if (reg_name_wr_valid)   // RRW : SW Write
                    begin
                        reg_name_rrw_q <=  ( wr_data[1] & reg_enb[1] ) | (reg_name_rrw_q & (~reg_enb[1]));
                    end
                    
                end  // sw_write_close
            end
    end // always clk
    
    //----------------------------------------------------------------------------
    
    
    // ===================================================
    // HW OUTPUT READ DATA FOR EACH FIELD
    assign reg_name_rrw_r  =  reg_name_rrw_q ;    // Field : RRW
    
    
    assign reg_name_rd_data = reg_name_rd_valid ? {30'b0 ,reg_name_rrw_q , 1'b0} : 32'b00000000000000000000000000000000;
    
    
    
    
    assign rd_data = reg_name_rd_data ;
    
    
    
    assign wr_error = 0;
    
    assign rd_error = 0;
    
    assign wr_decode_error = 0;
    
    assign rd_decode_error = 0;
    
    assign request      =  1'b1;
    assign rd_data_vld   =  rd_stb;
    assign rd_wait       =  1'b1;
    
    assign wr_slave_select = ((slvwaddr[addr_width - 1 : 0]  >= block_offset) && (slvwaddr[addr_width - 1 : 0]  <= block_offset + 'h3)) ? 1'b1 : 1'b0;
    assign rd_slave_select = ((slvraddr[addr_width - 1 : 0]  >= block_offset) && (slvraddr[addr_width - 1 : 0]  <= block_offset + 'h3)) ? 1'b1 : 1'b0;
    
endmodule