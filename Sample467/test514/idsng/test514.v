//
//
//*** This file is auto generated by IDesignSpec (http://www.agnisys.com) . Please do not edit this file. ***
// created on        : 2019-11-15T15:23:36.41+05:30
// created by        :
// generated by      : Saurabh
// generated from    : F:\testGit\git_test\Sample467\test514\test514.idsng
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

//------------------------------------------------
//  BLOCK : TEST514 MODULE
//

module test514_ids #(
    
    //  PARAMETERS
    parameter bus_width   = 32,
    parameter addr_width = 2,
    
    parameter block_offset  = {(addr_width){1'b0}},
    
    
    parameter test514_address_width = addr_width
    )
    
    (
    
    //-----------------------------------------------------
    // REGISTER : REG_HELLO123 SIGNALS
    
    output   reg_hello123_enb,
    
    // READ DATA SIGNAL FOR EACH FIELD
    output [31 : 0] reg_hello123_f_r,    // FIELD : F
    
    
    
    
    //CUSTOM signals
    input clk,     //Bus clock
    input reset_l,     //Reset
    input rd_stb,     //Read strobe        : This signal should be HIGH during read operation and LOW during write operation
    output rd_wait,     //Read wait
    input wr_stb,     //Write strobe       : This signal should be HIGH during write operation and LOW during read operation
    input [addr_width-1 : 0] address,     //Address for write/read
    input [bus_width-1 : 0] wr_data,     //Write data
    input [bus_width/8-1 : 0] byteenable,     //Specify which bytes are being written or during read which bytes the master is reading
    output request,     //Bus request signal : HIGH indicates bus is free and LOW indicates bus is busy
    output rd_data_vld,     //Read data valid : Asserted by the slave to indicate that the read data signal contains valid data
    output [bus_width-1 : 0] rd_data     //Read data
    
    );
    //-----------------------------------------------------
    // REGISTER : REG_HELLO123 SIGNALS
    
    
    wire    reg_hello123_decode;         // DECODE
    wire    reg_hello123_wr_valid;       // WRITE VALID
    wire    [bus_width-1 : 0] reg_hello123_rd_data;          // READ DATA
    wire    [64-1 : 0] reg_hello123_offset;  // OFFSET
    
    // BUFFER SIGNAL FOR EACH FIELD
    reg [31 : 0] reg_hello123_f_q ;      // FIELD : F
    
    //-----------------------------------------------------
    
    
    
    
    //CUSTOM signals
    
    wire [bus_width-1 : 0] reg_enb;
    wire [bus_width/8 -1 : 0] byte_enb;
    
    assign byte_enb = byteenable;
    assign reg_enb =  {
    {8{byte_enb[3]}} ,
    {8{byte_enb[2]}} ,
    {8{byte_enb[1]}} ,
    {8{byte_enb[0]}}};
    
    
    
    
    //----------------------------------------------------------------------------------------------------
    // REGISTER      :  REG_HELLO123
    // ADDRESS       :  block_offset+'h0                WIDTH : 32
    // HW ACCESS     :  READ-ONLY
    // SW ACCESS     :  READ-WRITE
    //
    // FIELDS   :
    //     31:0 : f  ( SW : Read-Write HW : Read-only )
    
    //-----------------------------------------------------------------------------
    // DESCRIPTION  :  NA
    //
    
    
    assign reg_hello123_wr_valid = reg_hello123_decode && wr_stb;
    assign reg_hello123_enb      = reg_hello123_wr_valid;
    assign reg_hello123_offset = block_offset+'h0;
    assign reg_hello123_decode  = (address[test514_address_width-1 : 0]    == reg_hello123_offset[test514_address_width-1 : 0] ) ? 1'b1 : 1'b0;
    
    
    //----------------------------------------------------------------------------
    // FIELD  : F
    // HW ACCESS  :  READ-ONLY                           WIDTH  :  32
    // SW ACCESS  :  READ-WRITE                          OFFSET :  0
    //-----------------------------------------------------------------
    // DESCRIPTION   :
    //
    
    always @(posedge clk)
        
        begin
        if (!reset_l)
            begin
                
                reg_hello123_f_q  <= 32'd0;
            end
        else
            begin
                
            if (reg_hello123_wr_valid)   // F : SW Write
                begin
                    reg_hello123_f_q <=  ( wr_data[31 : 0] & reg_enb[31 : 0] ) | (reg_hello123_f_q & (~reg_enb[31 : 0]));
                end
                
            end
    end // always clk
    
    //----------------------------------------------------------------------------
    
    
    // ===================================================
    // HW OUTPUT READ DATA FOR EACH FIELD
    assign reg_hello123_f_r  =  reg_hello123_f_q ;    // Field : F
    
    
    assign reg_hello123_rd_data = reg_hello123_decode ? {reg_hello123_f_q} : 32'b00000000000000000000000000000000;
    
    
    
    
    
    
    assign rd_data = reg_hello123_rd_data ;
    
    
    
    assign request      =  1'b1;
    assign rd_data_vld   =  rd_stb;
    assign rd_wait       =  1'b1;
    
    
endmodule