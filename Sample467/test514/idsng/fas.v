//
//
//*** This file is auto generated by IDesignSpec (http://www.agnisys.com) . Please do not edit this file. ***
// created on        : 2019-12-09T19:51:36.253+05:30
// created by        :
// generated by      : Saurabh
// generated from    : F:\testGit\git_test\Sample467\test514\fas.idsng
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
//  BLOCK : FAS MODULE
//

module fas_ids #(
    
    //  PARAMETERS
    parameter bus_width   = 32,
    parameter addr_width = 3,
    
    parameter block_offset  = {(addr_width){1'b0}},
    
    
    parameter fas_address_width = addr_width
    )
    
    (
    
    //-----------------------------------------------------
    // REGISTER : DSFSFSDF SIGNALS
    
    output   dsfsfsdf_enb,
    
    // READ DATA SIGNAL FOR EACH FIELD
    output [31 : 0] dsfsfsdf_rw_r,    // FIELD : RW
    
    
    
    //-----------------------------------------------------
    // REGISTER : ABCASDASD SIGNALS
    
    output   abcasdasd_enb,
    
    // HW WRITE DATA SIGNAL FOR EACH FIELD
    input   abcasdasd_jhvb_in,    // FIELD : JHVB
    
    
    // HW WRITE-ABLE SIGNAL FOR EACH FIELD
    input   abcasdasd_jhvb_in_enb,    // FIELD : JHVB
    
    
    // READ DATA SIGNAL FOR EACH FIELD
    output  abcasdasd_jhvb_r,    // FIELD : JHVB
    
    
    
    
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
    // REGISTER : DSFSFSDF SIGNALS
    
    
    wire    dsfsfsdf_decode;         // DECODE
    wire    dsfsfsdf_wr_valid;       // WRITE VALID
    wire    [bus_width-1 : 0] dsfsfsdf_rd_data;          // READ DATA
    wire    [64-1 : 0] dsfsfsdf_offset;  // OFFSET
    
    // BUFFER SIGNAL FOR EACH FIELD
    reg [31 : 0] dsfsfsdf_rw_q ;      // FIELD : RW
    
    //-----------------------------------------------------
    
    
    //-----------------------------------------------------
    // REGISTER : ABCASDASD SIGNALS
    
    
    wire    abcasdasd_decode;         // DECODE
    wire    abcasdasd_wr_valid;       // WRITE VALID
    wire    [bus_width-1 : 0] abcasdasd_rd_data;          // READ DATA
    wire    [64-1 : 0] abcasdasd_offset;  // OFFSET
    
    // BUFFER SIGNAL FOR EACH FIELD
    reg abcasdasd_jhvb_q ;      // FIELD : JHVB
    
    
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
    // REGISTER      :  DSFSFSDF
    // ADDRESS       :  block_offset+'h0                WIDTH : 32
    // HW ACCESS     :  READ-ONLY
    // SW ACCESS     :  READ-WRITE
    //
    // FIELDS   :
    //     31:0 : rw  ( SW : Read-Write HW : Read-only )
    
    //-----------------------------------------------------------------------------
    // DESCRIPTION  :  NA
    //
    
    
    assign dsfsfsdf_wr_valid = dsfsfsdf_decode && wr_stb;
    assign dsfsfsdf_enb      = dsfsfsdf_wr_valid;
    assign dsfsfsdf_offset = block_offset+'h0;
    assign dsfsfsdf_decode  = (address[fas_address_width-1 : 0]    == dsfsfsdf_offset[fas_address_width-1 : 0] ) ? 1'b1 : 1'b0;
    
    
    //----------------------------------------------------------------------------
    // FIELD  : RW
    // HW ACCESS  :  READ-ONLY                           WIDTH  :  32
    // SW ACCESS  :  READ-WRITE                          OFFSET :  0
    //-----------------------------------------------------------------
    // DESCRIPTION   :
    //
    
    always @(posedge clk)
        
        begin
        if (!reset_l)
            begin
                
                dsfsfsdf_rw_q  <= 32'd0;
            end
        else
            begin
                
            if (dsfsfsdf_wr_valid)   // RW : SW Write
                begin
                    dsfsfsdf_rw_q <=  ( wr_data[31 : 0] & reg_enb[31 : 0] ) | (dsfsfsdf_rw_q & (~reg_enb[31 : 0]));
                end
                
            end
    end // always clk
    
    //----------------------------------------------------------------------------
    
    
    // ===================================================
    // HW OUTPUT READ DATA FOR EACH FIELD
    assign dsfsfsdf_rw_r  =  dsfsfsdf_rw_q ;    // Field : RW
    
    
    assign dsfsfsdf_rd_data = dsfsfsdf_decode ? {dsfsfsdf_rw_q} : 32'b00000000000000000000000000000000;
    
    
    //----------------------------------------------------------------------------------------------------
    // REGISTER      :  ABCASDASD
    // ADDRESS       :  block_offset+'h4                WIDTH : 16
    // HW ACCESS     :  READ-WRITE
    // SW ACCESS     :  READ-WRITE
    //
    // FIELDS   :
    //       15 : jhvb  ( SW : Read-Write HW : Read-Write )
    
    //-----------------------------------------------------------------------------
    // DESCRIPTION  :  fdsf
    //
    
    
    assign abcasdasd_wr_valid = abcasdasd_decode && wr_stb;
    assign abcasdasd_enb      = abcasdasd_wr_valid;
    assign abcasdasd_offset = block_offset+'h4;
    assign abcasdasd_decode  = (address[fas_address_width-1 : 0]    == abcasdasd_offset[fas_address_width-1 : 0] ) ? 1'b1 : 1'b0;
    
    
    //----------------------------------------------------------------------------
    // FIELD  : JHVB
    // HW ACCESS  :  READ-WRITE                          WIDTH  :  1
    // SW ACCESS  :  READ-WRITE                          OFFSET :  15
    //-----------------------------------------------------------------
    // DESCRIPTION   :
    //
    
    always @(posedge clk)
        
        begin
        if (!reset_l)
            begin
                
                abcasdasd_jhvb_q  <= 1'd0;
            end
        else
            begin
            if (abcasdasd_jhvb_in_enb)   // JHVB : HW Write
                begin
                    abcasdasd_jhvb_q <= abcasdasd_jhvb_in;
                end
            else
                begin
                    
                if (abcasdasd_wr_valid)   // JHVB : SW Write
                    begin
                        abcasdasd_jhvb_q <=  ( wr_data[15] & reg_enb[15] ) | (abcasdasd_jhvb_q & (~reg_enb[15]));
                    end
                    
                end  // sw_write_close
            end
    end // always clk
    
    //----------------------------------------------------------------------------
    
    
    // ===================================================
    // HW OUTPUT READ DATA FOR EACH FIELD
    assign abcasdasd_jhvb_r  =  abcasdasd_jhvb_q ;    // Field : JHVB
    
    
    assign abcasdasd_rd_data = abcasdasd_decode ? {abcasdasd_jhvb_q , 15'b0} : 16'b0000000000000000;
    
    
    
    
    
    
    
    assign rd_data = dsfsfsdf_rd_data |
    abcasdasd_rd_data ;
    
    
    
    assign request      =  1'b1;
    assign rd_data_vld   =  rd_stb;
    assign rd_wait       =  1'b1;
    
    
endmodule
