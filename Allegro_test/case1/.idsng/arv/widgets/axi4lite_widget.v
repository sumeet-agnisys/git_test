//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//***** Copyright 2015 All Rights Reserved. ***** 
// Company       : Agnisys, Inc.
// 
// Design Name   : axi_widget
// Module Name   : axi_widget
// Project Name  : IDesignSpec
// Target Devices: 
// Tool versions : 
// Description   : This AXI is AMBA-AXI4LITE standard compatible.
//				   This module is an interface between AMBA-AXI bus and Agnisys internal bus.
//                 This module takes the signal from the AXI bus and transform them into the internal signals. 
//				   By default clk sampling edge is negative.
//                 By default the module has Asynchronous resets. Synchronous resets can be used if SYNC is set on the command line.
//                 By default address/bus width is 32.
//				   The following AXI transactions are supported ...
//                 Write transaction: 
//						Single or Multiple(in case of external in IDS slave) latency are supported. 
//						Pipeline transactions are not supported, the widget prevents the master from  sending the next transaction by 
//                      making awready low.
//						The transaction completion acknowledge by bvalid. 
//						All rest of signals are supported as AXI standard compliant.     
//                 Read transaction: 
//						Single or Multiple(in case of external in IDS slave) latency are supported. 
//						Pipeline transactions are not supported, the widget prevents the master from  sending the next transaction by 
//                      making arready low.
//						The transaction completion acknowledge by rvalid.
//						All rest of signals are supported as standard compliant.    
//  
//                                  
//				   For more details on AXI, visit : http://infocenter.arm.com/help/topic/com.arm.doc.set.amba/index.html#specs
//                 For more details on Agnisys internal/proprietary bus, visit : http://www.agnisys.com/release/docs_2014/ids/PROPRIETARY.html
//			
//               NOTE : AWPROT[2] and ARPROT[2]is unused 
//
// When          : Version   : Change
//               : 1.1 - rsb
//               : 1.2 - rsb
//               : 1.3 - rsb : I.   added sync and async reset.
//                             II.  now rvalid and rdata have delays.
//                             III. rd_wait signal has been added to insert wait stated while reading
// 11/Sep/2014   : 1.4 - RS  : Now ravlid is held until assertion of rready from master
// 02/Feb/2015   : 1.5 - RS  : Support of write/read latency slave
// 26/Feb/2015   : 1.6 - RS  : Support back to back write( Now slave restrict the master transaction using awready instead of bvalid)
//       
//   /Apr/2015   : 1.7 - RS  : Support protection(AWPORT and ARPROT) and response(BRESP and RRESP) signal
// 12/May/2015   : 1.8 - RS  : Fix issue with back to back write, it skipped one transaction before now fixed.
// 21/May/2015   : 1.9 - RS  : Fix lint error
// 12/June/2015  : 2.0 - RS  : Support simultaneously write and read
// 16/June/2015  : 2.1 - GV  : Bug fix for wready acknowledge and data channel before address channel scenario.
// 13/Oct/2015   : 2.2 - RS  : Fix, in case when rvalid is waiting for rready. In this raddress was generating the 0x0 
//                             address which may be the empty in slave.
//
// 10/March/2016 : 3.0 - RS  : Fix extra latency in response of write and read. 
//                             Write :-  V2.0(before) : 3 cycle || V3.0 : 2 cycle 
//							   Read  :-  V2.0(before) : 3 cycle || V3.0 : 2 cycle 
//
// 20/Apr/2016   : 3.1 - RS  : Fix reset value of "wr_data" output and reg. 
// 21/Apr/2016   : 3.2 - RS  : Fix issue of ADDRESS channel with unalligned write data channel
// 04/May/2016   : 3.3 - RS  : Fix address and data unaligned channels
//
//  Internal registers:
//---------------------------------------------------------------------------------------------------------------------------------
// S.No. |   Name                  |  Deafault | Description
//---------------------------------------------------------------------------------------------------------------------------------
// 1.    |   awaddr_ff             |  0        | Address register.
// 2.    |   wdata_ff              |  0        | Write data register.
// 4.    |   wstrb_ff              |  0        | Write strobe register.
// 5.    |   rdata_f               |  0        | Read data register. 
// 6.    |   awvalid_ff            |  0        | Address valid register.
// 7.    |   wvalid_ff             |  0        | Write valid register.
// 8.    |   awprot_ff             |  0        | Address write protection register.
// 9.    |   awprot_f1             |  0        | Address write protection register, in case of address channel before write channel.
// 10.   |   arprot_ff             |  0        | Address read protection registter.
// 11.   |   rd_stb_ff             |  0        | Read strobe register.
// 12.   |   wstb                  |  0        | Writes strobe.
// 13.   |   wstb_ff               |  0        | Write strobe bits in bytes.
// 19.   |   bresp_ff              |  0        | Write response register.
// 20.   |   rresp_ff              |  0        | Read response register.
// 21.   |   bvalid_i              |  0        | Write valid response register.
// 22.   |   rvalid_i              |  0        | Read valid response register.
//---------------------------------------------------------------------------------------------------------------------------------
//
//////////////////////////////////////////////////////////////////////////////////////////////////////


// Reset type synchronous or asynchronous
// Default is asynchronous

`define ASYNC

module axi_widget #(
  parameter addr_width= 'd32, 
  parameter bus_width = 'd32
) 
  (
    //Global Signals
    input aclk,                       // Rising Edge Clock      : M
    input aresetn,                    // Active LOW Reset       : M

    //Write Address Channel Signals
    input  [addr_width-1 :0] awaddr,  // Write Address          : M
    input  awvalid,                   // Write Address Valid    : M
    output awready,                   // Write Address Ready    : S
    input  [2:0] awprot,              // Write Protection Type  : M

    //Write Data Channel Signals
    input  [bus_width-1:0] wdata,     // Write Data             : M
    input  wvalid,                    // Write Valid            : M
    output wready,                    // Write Ready            : S
    input  [bus_width/8-1 :0] wstrb,  // Write Strobes          : M

    //Write Response Channel Signals
    output [1:0] bresp,               // Write Response         : S
    input  bready,                    // Response Ready         : M
    output bvalid,                    // Response Valid         : S

    //Read Address Channel Signals
    input[addr_width-1 :0] araddr,    // Read Address           : M
    input  arvalid,                   // Read Address Valid     : M
    output arready,                   // Read Address Ready     : S
    input  [2:0] arprot,              // Read Protection Type   : M

    //Read Data Channel Signals
    output [bus_width-1:0] rdata,     // Read Data              : S
    output rvalid,                    // Read Valid             : S
    input  rready,                    // Read Ready             : M
    output [1:0] rresp,               // Read Response          : S


    //Proprietary bus signals
    output clk,                             // :S
    output reset_l,                         // :S
    output reg [addr_width-1:0] address,    // :S
    output [addr_width-1:0] slvwaddr,       // :S
    output [addr_width-1:0] slvraddr,       // :S
    output reg [addr_width-1:0] raddress,   // :S
    output reg [bus_width-1:0]  wr_data,    // :S
    input      [bus_width-1:0]  rd_data,    // :S
    output [2:0] arprot_i,                  // :S
    output [2:0] awprot_i,                  // :S
    output wr_stb,                          // :S
    output reg rd_stb,                      // :S
    input  request,                         // :S
    input  rd_data_vld,                     // :S
    output reg[bus_width/8-1:0] byte_enb,   // :S 
    input  wr_error,                        // :S
    input  rd_error,                        // :S
    input  wr_decode_error,                 // :S
    input  rd_decode_error,                 // :S
    input  wr_slave_select,                 // :S
    input  rd_slave_select,                 // :S
    input  rd_wait                          // :S
  );


  // Register declaration 

  reg [addr_width-1:0]   awaddr_ff;
  reg [bus_width-1:0]    wdata_ff;
  reg [bus_width/8-1 :0] wstrb_ff;
  reg [bus_width-1:0]    rdata_f ; //Read Data   
  reg awvalid_ff;
  reg wvalid_ff ;
  reg [2:0] awprot_ff;
  reg [2:0] awprot_f1;
  reg [2:0] arprot_ff;
  reg rd_stb_ff;
  reg wstb;
  reg wstb_ff;

  reg [1:0] bresp_ff;
  reg [1:0] rresp_ff;  


  // Error signals :
  // [addr_width-1:0]   slv_awaddr;

  // Write decode error signals
  wire wrDecodeSlvError;
  wire rdDecodeSlvError;

  // Read decode error signals
  wire rdSlvProtError;
  wire wrSlvProtError;


  // Read protection error signals
  reg bvalid_i;
  reg rvalid_i;


  wire slvWriteFreeOrBusy ;


  //=======================================================================================================================
  // WRITE Transfer :- Write operation in AXI protocol and same as supported by this widget.
  //==================
  //
  //               ___     ___     ___     ___     ___     ___     ___     ___
  // aclk    :  __|1  |___|2  |___|3  |___|4  |___|5  |___|6  |___|7  |___|8  |_
  //                 _____//___                 __//_____                           __
  // awaddr  :  ____|     1    |_______________|  2      |______________________      |
  //                 _____//___                 __//_____                             |------------------------
  // awvalid :  ____|     1    |_______________|  2      |______________________      | Write address channel
  //                 _____//______________________//____________________________      |------------------------
  // awready :  ____|     1                       2                                 __|
  //                             _//____                __//___                     __
  // wdata   :  ________________| 1     |______________|  2    |________________      |
  // 						     _//____                __//___                       |------------------------
  // wvalid  :  ________________| 1     |______________|  2    |________________      | Write data channel
  //				 _____________//______________________//____________________      |------------------------
  // wreayd  :  ____|             1                       2                         __|
  // 									 _//___                   _//___            __
  // bresp   :  ________________________| 1    |_________________| 2    |_______      |
  //            						 _//___                   _//___              |------------------------
  // bvalid  :  ________________________| 1    |_________________| 2    |_______      | Write response channel
  //                 _____________________//_______________________//___________      |------------------------
  // bready  :  ____|                     1                        2                __|
  // 
  //               |                           ||                         |          
  //               \___________________________/\_________________________/ 
  //                             \/                         \/
  //                   { 1st write transfer }      { 2nd write transfer }
  //
  //
  //=======================================================================================================================




  //================================================================================================================
  // Global signal Assignment : Clock, Reset
  // 
  assign clk     = aclk; 

  assign reset_l = aresetn;

  assign slvwaddr = awaddr ;

  assign slvraddr = araddr;

  //================================================================================================================



  //================================================================================================================
  // Address channel before write data channel : The sampling signal will be awaddr, awvalid, awprot.
  //										     The slave signal "awready" must be HIGH.
  //================================================================================================================
  //
  // Used signals :
  //----------------------------------------------------------------------------------------------------------------
  //  S.NO.  | SIGNAL NAME | DESCRIPTION
  //----------------------------------------------------------------------------------------------------------------
  //    1    | awaddr	   | Address signal, the address which will be sampled.
  //    2    | awvalid     | Address valid, the sampled address will be valid.
  //    3    | awprot      | Protection signal, the protection value aligend with the address.
  //    4    | awready     | Address write ready, the slave must ready/free to accept the new address.
  //    5    | wvalid      | Write valid, here always block of code storing the address channel so wvalid of write 
  //                         data channel must be low otherwise do not need to store the channel.
  //    6    | wvalid_ff   | This signals ensure there is no write data channel comes before, if write data channel
  //                         are waiting for address chaneel(Write data channel before address channel) then it will 
  //                         handle by anothe block of code.
  //
  //----------------------------------------------------------------------------------------------------------------
  //

  `ifdef ASYNC
  always@(posedge aclk or negedge aresetn)
    `elsif SYNC
    always@(posedge aclk)
      `endif
      begin
        if(!aresetn)
          begin
            awaddr_ff  <= {addr_width{1'b0}} ;
            awvalid_ff <= 1'b0 ;  // Address write valid buffer
            awprot_f1  <= 3'b0 ;  // Write protection buffer  
          end
        else
          begin
            if(awvalid && ~wvalid && awready && ~wvalid_ff && wr_slave_select)
              begin
                awvalid_ff <= awvalid;
                awaddr_ff  <= awaddr ;
                awprot_f1  <= awprot ;
              end
            else
              begin
                if (wvalid && wready && awvalid_ff)  // 3.2 :- (wstb || (wvalid && wready && awvalid_ff)) 
                  begin
                    awaddr_ff  <= {addr_width{1'b0}} ;
                    awvalid_ff <= 1'b0 ;  
                    awprot_f1  <= 3'b0 ;   
                  end
              end
          end
      end

  //
  // END address channel before the write data channel
  //================================================================================================================






  //=====================================================================================================================
  // Write data channel before write address channel : The sampling signal will be wdata, wvalid, wstrb.
  //											       The slave signal "wready" must be HIGH.
  //=====================================================================================================================
  //
  // Used signals :
  //---------------------------------------------------------------------------------------------------------------------
  //  S.NO.  | SIGNAL NAME | DESCRIPTION
  //---------------------------------------------------------------------------------------------------------------------
  //    1    | wdata	   | Write data signal, the data which will be sampled.
  //    2    | wvalid      | Write data valid, the sampled data will be valid.
  //    3    | wready      | Write ready, the slave must ready/free to accept the new data.
  //    4    | awvalid     | Address write valid, here always block of code storing the data channel so awvalid of write 
  //                         address channel must be low otherwise do not need to store the channel.
  //    5    | awvalid_ff  | This signals ensure there is no write address channel comes before, if write address channel
  //                         are waiting for data chaneel (Write address channel before data channel) then it will 
  //                         handle by anothe block of code.
  //
  //----------------------------------------------------------------------------------------------------------------------
  //

  `ifdef ASYNC
  always@(posedge aclk or negedge aresetn)
    `elsif SYNC
    always@(posedge aclk)
      `endif
      begin
        if(!aresetn)
          begin
            wdata_ff   <= {bus_width{1'b0}}  ;
            wstrb_ff   <= {bus_width/8{1'b0}};
            wvalid_ff  <= 1'b0 ;
          end
        else
          begin
            if(wvalid && wready && ~awvalid && ~awvalid_ff)
              begin                
                wdata_ff  <= wdata ; 
                wstrb_ff  <= wstrb ;
                wvalid_ff <= wvalid;
              end
            else
              begin 
                if(wvalid_ff && awready && awvalid) //3.2 :- || wstb || (wvalid_ff && awready && awvalid))
                  begin
                    wdata_ff   <= {bus_width{1'b0}}  ;
                    wstrb_ff   <= {bus_width/8{1'b0}};
                    wvalid_ff  <= 1'b0 ;
                  end
              end
          end
      end

  //
  // END Write data channel before write address channel
  //=====================================================================================================================




  //=======================================================================================================================
  // Write address and write data Transfer :-  Address will be valid when "awvalid" is high.
  //=========================================  Slave will accept the write address when "awready" is high. 
  //										   There are three scenario of write address and data chaneel transfer.
  //											1. Write address and Write data channel comes at same time.
  //											2. Write address comes before the Write data channel.
  //											3. Write data comes before the write address channel. 
  //
  //---------------------------------------------------------------
  // 1. Write address and Write data channel comes at same time  :-
  //---------------------------------------------------------------
  //
  //               ___     ___     ___     ___     ___     ___     ___     ___
  // aclk    :  __|1  |___|2  |___|3  |___|4  |___|5  |___|6  |___|7  |___|8  |_
  //                 _____//___                 __//_____                           __
  // awaddr  :  ____|     1    |_______________|  2      |______________________      |
  //                 _____//___                 __//_____                             |------------------------
  // awvalid :  ____|     1    |_______________|  2      |______________________      | Write address channel
  //                 _____//______________________//____________________________      |------------------------
  // awready :  ____|     1                       2                                 __|
  //                 _____//___                 __//_____                           __
  // wdata   :  ____|     1    |_______________|  2      |______________________      | 
  // 				 _____//___                 __//_____                             |------------------------
  // wvalid  :  ____|     1    |_______________|  2      |______________________      | Write data channel
  //				 _____//______________________//____________________________      |------------------------
  // wreayd  :  ____|     1                       2                                 __|
  //               |                           ||                         |          
  //               \___________________________/\_________________________/ 
  //                             \/                         \/
  //                   { 1st write transfer }      { 2nd write transfer }
  //
  //   
  //---------------------------------------------------------------
  // 2. Write address comes before the Write data channel        :-
  //---------------------------------------------------------------
  //
  //               ___     ___     ___     ___     ___     ___     ___     ___
  // aclk    :  __|1  |___|2  |___|3  |___|4  |___|5  |___|6  |___|7  |___|8  |_
  //                 _____//___                 __//_____                           __
  // awaddr  :  ____|     1    |_______________|  2      |______________________      |
  //                 _____//___                 __//_____                             |------------------------
  // awvalid :  ____|     1    |_______________|  2      |______________________      | Write address channel
  //                 _____//______________________//____________________________      |------------------------
  // awready :  ____|     1                       2                                 __|
  //                             _//____                __//___                     __
  // wdata   :  ________________| 1     |______________|  2    |________________      |
  // 						     _//____                __//___                       |------------------------
  // wvalid  :  ________________| 1     |______________|  2    |________________      | Write data channel
  //				 _____________//______________________//____________________      |------------------------
  // wreayd  :  ____|             1                       2                         __|
  //               |                           ||                         |          
  //               \___________________________/\_________________________/ 
  //                             \/                         \/
  //                   { 1st write transfer }      { 2nd write transfer }
  //
  //
  //
  //---------------------------------------------------------------
  // 3. Write data comes before the write address channel        :-
  //---------------------------------------------------------------
  //
  //               ___     ___     ___     ___     ___     ___     ___     ___
  // aclk    :  __|1  |___|2  |___|3  |___|4  |___|5  |___|6  |___|7  |___|8  |_
  //                              _//____               __//___                     __
  // awaddr  :  _________________| 1     |_____________|  2    |_________________     |
  //                              _//____               __//___                       |------------------------
  // awvalid :  _________________| 1     |_____________|  2    |_________________     | Write address channel
  //                          _____//_____________________//_____________________     |------------------------
  // awready :  _____________|     1                      2                         __|
  //                 _____//___                 __//_____                           __
  // wdata   :  ____|     1    |_______________|  2      |______________________      | 
  // 				 _____//___                 __//_____                             |------------------------
  // wvalid  :  ____|     1    |_______________|  2      |______________________      | Write data channel
  //				 _____//______________________//____________________________      |------------------------
  // wreayd  :  ____|     1                       2                                 __|
  //               |                       |  |                         |          
  //               \______________________/    \_______________________/ 
  //                         \/                           \/
  //                { 1st write transfer }      { 2nd write transfer }
  //
  //
  //
  //-----------------------------------------------------------------------------------------------------------------------
  // NOTE : address, wr_data, awprot_ff will not be reset in else at last of always codde of block.
  //        These signal will go directly into slave as it is, but will not affect any register or anything else.
  //        All other contriling signal will be inactive if the transfer is not valid. 
  //
  //=======================================================================================================================
  //

  `ifdef ASYNC
  always@(posedge aclk or negedge aresetn)
    `elsif SYNC
    always@(posedge aclk)
      `endif
      begin
        if(!aresetn)
          begin
            address    <= {addr_width{1'b0}} ; 
            wr_data    <= {bus_width{1'b0}} ; 
            byte_enb   <= {bus_width/8{1'b0}};
            awprot_ff  <= 3'b0 ;  // Write protection buffer          
            wstb       <= 1'b0 ;  // write strobe buffer
          end
        else 
          begin
            if(awvalid && wvalid && awready && wready && wr_slave_select) // 1. Write address and Write data comes at same time. 
              begin
                address    <= awaddr;
                wr_data    <= wdata ;
                byte_enb   <= wstrb ;
                awprot_ff  <= awprot;
                wstb       <= 1'b1  ;
              end
            else if(wvalid && awvalid_ff && wready)  // 2. Write address comes before the Write data.
              begin
                address   <= awaddr_ff ;
                wr_data   <= wdata     ;
                byte_enb  <= wstrb     ;               
                awprot_ff <= awprot_f1 ;
                wstb      <= 1'b1      ;
              end
            else if(awvalid && wvalid_ff && awready && wr_slave_select) // 3. Write data comes before the write address. 
              begin
                address   <= awaddr  ;
                wr_data   <= wdata_ff;
                byte_enb  <= wstrb_ff;                
                awprot_ff <= awprot  ;
                wstb      <= 1'b1    ;

              end
            else
              begin
                byte_enb <= {bus_width/8{1'b0}} ;
                wstb     <= 1'b0 ;
              end
          end
      end  

  //
  // End Write address and write data Transfer 
  //=======================================================================================================================





  //===================================================================================================================
  // Read address channel : The sampling signal will be raddress, arvalid, arready, arprot_ff.
  //					    The slave signal "arready" must be HIGH.
  //===================================================================================================================
  //
  // Used signals :
  //----------------------------------------------------------------------------------------------------------------
  //  S.NO.  | SIGNAL NAME | DESCRIPTION
  //----------------------------------------------------------------------------------------------------------------
  //    1    | araddr	   | Address signal, the address which will be sampled.
  //    2    | arvalid     | Address read valid, the sampled address will be valid.
  //    3    | arprot_ff   | Protection signal, the protection value aligend with the address.
  //    4    | arready     | Address read ready, the slave must ready/free to accept the new read address.
  //----------------------------------------------------------------------------------------------------------------
  //
  //               ___     ___     ___     ___     ___     ___     ___     ___
  // aclk    :  __|1  |___|2  |___|3  |___|4  |___|5  |___|6  |___|7  |___|8  |_
  //                 _____//___                 __//_____                           __
  // araddr  :  ____|     1    |_______________|  2      |______________________      |
  //                 _____//___                 __//_____                             |
  // arvalid :  ____|     1    |_______________|  2      |______________________      |------------------------ 
  // 	`            _____//___                 __//_____                             |Read address channel
  // arprot  :  ____|     1    |_______________|  2      |______________________      |------------------------
  //                 _____//______________________//____________________________      |
  // arready :  ____|     1                       2                                 __|
  //               |               |          |               |          
  //               \_______________/          \_______________/ 
  //                     \/                         \/
  //             { 1st read transfer }       { 2nd read transfer }
  // 
  //----------------------------------------------------------------------------------------------------------------

  `ifdef ASYNC
  always@(posedge aclk or negedge aresetn)
    `elsif SYNC
    always@(posedge aclk)
      `endif
      begin
        if(!aresetn)
          begin
            raddress   <= {addr_width{1'b0}};
            arprot_ff  <= 3'b0;
            rd_stb     <= 1'b0;
          end
        else
          begin 
            if(arvalid && arready && rd_slave_select)
              begin
                raddress  <= araddr;
                arprot_ff <= arprot;
                rd_stb    <= 1'b1 ;     // rvalid ? rready : 1'b1; // it was in 3.2
              end
            else
              begin
                arprot_ff <= 3'b0;
                rd_stb    <= 1'b0;                
              end
          end
      end

  //
  // End Read address channel 
  //===================================================================================================================




  //===================================================================================================================
  // Write/Read strobe buffer : Write and read strobe need to store in case of latency.					          
  //===================================================================================================================
  //
  //  Read strobe buffer Used signals :
  //----------------------------------------------------------------------------------------------------------------
  //  S.NO.  | SIGNAL NAME | DESCRIPTION
  //----------------------------------------------------------------------------------------------------------------
  //    1    | rd_stb	   | Read strobe which needs to buffer.
  //    2    | rd_wait     | Read wait signal, slave is free or busy.
  //    3    | rvalid      | Read valid signal, that read data is valid.
  //    4    | rdSlvError  | Read slave error(protection or decode), error of read transfer. 
  //    5    | rready      | Read ready signal, that response of read tranfer acknowledged by master.
  //----------------------------------------------------------------------------------------------------------------
  // 
  // NOTE : 1. Read strobe will be store when there is latency in read, slave pull down rd_wait to add latency in read.
  //		2. If rvalid is HIGH, and not acknowleged by master yet then read strobe buffer used to read strobe untill
  //           it will be acknowledge by master by rready.
  //
  //--------------------------------------------------------------------------------------------------------------------

  `ifdef ASYNC
  always@(posedge aclk or negedge aresetn)
    `elsif SYNC
    always@(posedge aclk)
      `endif
      begin
        if(!aresetn)
          begin
            rd_stb_ff <= 1'b0;
          end
        else
          begin 
            if(rd_stb && (!rd_wait || (rvalid && !rready)))
              begin
                rd_stb_ff  <= 1'b1; 
              end
            else
              begin
                if(rready && rvalid) // DEBUG :: (rdSlvError && rd_wait)  :::((rready && rvalid) || (rdSlvError && rd_wait))
                  begin
                    rd_stb_ff  <= 1'b0;
                  end
              end

          end
      end

  //----------------------------------------------------------------------------------------------------------------
  //  Write strobe buffer Used signals :
  //----------------------------------------------------------------------------------------------------------------
  //  S.NO.  | SIGNAL NAME | DESCRIPTION
  //----------------------------------------------------------------------------------------------------------------
  //    1    | wstb   	   | Write strobe which needs to buffer.
  //    3    | request     | Write wait signal, slave is free or busy.
  //    4    | bvalid      | Write valid signal, that Write data is valid.
  //    6    | bready      | Write ready signal, that response of Write tranfer acknowledged by master.
  //----------------------------------------------------------------------------------------------------------------
  // 
  // NOTE : 1. Write strobe will be store when there is latency in Write, slave pull down rd_wait to add latency in Write.
  //		2. If rvalid is HIGH, and not acknowleged by master yet then Write strobe buffer used to Write strobe untill
  //           it will be acknowledge by master by rready.
  //----------------------------------------------------------------------------------------------------------------
  //

  `ifdef ASYNC
  always@(posedge aclk or negedge aresetn)
    `elsif SYNC
    always@(posedge aclk)
      `endif
      begin
        if(!aresetn)
          begin
            wstb_ff    <= 1'b0;
          end
        else
          begin
            if((wstb && !request))
              begin
                wstb_ff    <= 1'b1 ; 
              end
            else
              begin
                if(bvalid && bready) 
                  begin
                    wstb_ff    <= 1'b0;
                  end
              end
          end
      end


  //
  // End Write/Read address channel
  //===================================================================================================================




  //===================================================================================================================
  // Write/Read valid response : Write and read valid response of the transfer.					          
  //===================================================================================================================
  //
  // Read valid response buffer : Used to store the state of the rvalid signal.
  //----------------------------------------------------------------------------------------------------------------
  //  S.NO.  | SIGNAL NAME | DESCRIPTION
  //----------------------------------------------------------------------------------------------------------------
  //    1    | rvalid	   | Read valid signal, the done read transfer is valid.
  //    2    | rready      | Read ready signal, the valid response acknowledged by master.
  //----------------------------------------------------------------------------------------------------------------
  //
  // 
  //               ___     ___     ___     ___     ___     ___     ___     ___
  // aclk    :  __|1  |___|2  |___|3  |___|4  |___|5  |___|6  |___|7  |___|8  |_
  //                       _______//______                         _______//____    
  // rready :  ___________|       1       |_______________________|       2                         
  //               _______//______                 _______//______//______                             
  // rvalid :  ___|       T1ME1   |_______________|       T2ME1   T2ME2   |______     
  //               
  //            
  //   
  // 
  // NOTE  : When rvalid is asserted, then it must remain asserted until rready is HIGH. The buffer rvalid_i
  //         will handle this assertion.
  //
  // T1ME1 : Transfer 1 missing edge 1, rready is missing.
  // T2ME1 : Transfer 2 missing edge 1
  // T2ME2 : Transfer 2 missing edge 2
  //--------------------------------------------------------------------------------------------------------------------
  //

  `ifdef ASYNC
  always@(posedge aclk or negedge aresetn)
    `elsif SYNC
    always@(posedge aclk)
      `endif
      begin
        if(!aresetn)
          begin
            rvalid_i  <= 1'b0;
          end
        else
          begin
            if (rvalid)
              begin
                rvalid_i  <= ~rready;
              end
            else
              begin
                rvalid_i  <= rvalid;
              end

          end
      end

  assign rvalid = rvalid_i ? 1'b1 : rd_wait & (rd_stb | rd_stb_ff); 


  //--------------------------------------------------------------------------------------------------------------------
  // Write valid response buffer : Used to store the state of the bvalid signal.
  //----------------------------------------------------------------------------------------------------------------
  //
  //  S.NO.  | SIGNAL NAME | DESCRIPTION
  //----------------------------------------------------------------------------------------------------------------
  //    1    | bvalid	   | Write valid signal, the done write transfer is valid.
  //    2    | bready      | Write ready signal, the valid response acknowledged by master.
  //----------------------------------------------------------------------------------------------------------------
  // 
  //               ___     ___     ___     ___     ___     ___     ___     ___
  // aclk    :  __|1  |___|2  |___|3  |___|4  |___|5  |___|6  |___|7  |___|8  |_
  //                       _______//______                         _______//____    
  // bready :  ___________|       1       |_______________________|       2                         
  //               _______//______                 _______//______//______                             
  // bvalid :  ___|       T1ME1   |_______________|       T2ME1   T2ME2   |______     
  //               
  // 
  // NOTE  : When bvalid is asserted, then it must remain asserted until bready is HIGH. The buffer bvalid_i
  //         will handle this assertion.
  //
  // T1ME1 : Transfer 1 missing edge 1, bready is missing.
  // T2ME1 : Transfer 2 missing edge 1
  // T2ME2 : Transfer 2 missing edge 2
  //--------------------------------------------------------------------------------------------------------------------
  //

  `ifdef ASYNC
  always@(posedge aclk or negedge aresetn)
    `elsif SYNC
    always@(posedge aclk)
      `endif
      begin
        if(!aresetn)
          begin
            bvalid_i    <= 1'b0;
          end
        else
          begin
            if(bvalid) 
              begin
                bvalid_i    <= ~bready ; 
              end
            else 
              begin
                bvalid_i    <= bvalid ;
              end
          end
      end

  assign bvalid = bvalid_i ? 1'b1 : request & (wstb | wstb_ff); 

  //
  // End Write/Read valid response					          
  //===================================================================================================================




  //===================================================================================================================
  // Write/Read response buffer : Write and read response of the transfer.					          
  //===================================================================================================================
  //
  // Write response buffer : Used to store the state of the bresp signal.
  //----------------------------------------------------------------------------------------------------------------
  //  S.NO.  | SIGNAL NAME | DESCRIPTION
  //----------------------------------------------------------------------------------------------------------------
  //    1    | bvalid	   | Write valid signal, the done Write transfer is valid.
  //    2    | bready      | Write ready signal, the response acknowledged by master.
  //    3    | bresp       | Write response signal, the value will be 
  //                         00 - OKAY, 01 - EXOKAY, 10 - SLVERR, 11 - DECERR.
  //----------------------------------------------------------------------------------------------------------------
  //
  //               ___     ___     ___     ___     ___     ___     ___     ___
  // aclk    :  __|1  |___|2  |___|3  |___|4  |___|5  |___|6  |___|7  |___|8  |_
  //                       _______//______                         _______//____    
  // bready :  ___________|       1       |_______________________|       2                         
  //               _______//______                 _______//______//______                             
  // bvalid :  ___|       T1ME1   |_______________|       T2ME1   T2ME2   |______  
  //               _______//______                 _______//______//______       
  // bresp  :  ___|-----SLVERR----|_______________|-------DECERR----------|______ 
  //   
  //  
  // NOTE : 1. When bvalid is asserted, then bresp must remain asserted until bready is HIGH. The buffer bresp_ff
  //           will handle this assertion.
  //--------------------------------------------------------------------------------------------------------------------
  //

  `ifdef ASYNC
  always@(posedge aclk or negedge aresetn)
    `elsif SYNC
    always@(posedge aclk)
      `endif
      begin
        if(!aresetn)
          begin
            bresp_ff <= 2'b00;
          end
        else
          begin
            if(bvalid)
              begin
                bresp_ff <= bresp & {2{~bready}};  
              end
            else 
              begin
                bresp_ff <= bresp;
              end
          end
      end

  //----------------------------------------------------------------------------------------------------------------
  // Read response buffer : Used to store the state of the rresp signal.
  //----------------------------------------------------------------------------------------------------------------
  //
  //  S.NO.  | SIGNAL NAME | DESCRIPTION
  //----------------------------------------------------------------------------------------------------------------
  //    1    | rvalid	   | Read valid signal, the done read transfer is valid.
  //    2    | rready      | Read ready signal, the response acknowledged by master.
  //    3    | rresp       | Read response signal, the value will be
  //                         00 - OKAY, 01 - EXOKAY, 10 - SLVERR, 11 - DECERR.
  //----------------------------------------------------------------------------------------------------------------
  //
  //               ___     ___     ___     ___     ___     ___     ___     ___
  // aclk    :  __|1  |___|2  |___|3  |___|4  |___|5  |___|6  |___|7  |___|8  |_
  //                       _______//______                         _______//____    
  // bready :  ___________|       1       |_______________________|       2                         
  //               _______//______                 _______//______//______                             
  // bvalid :  ___|       T1ME1   |_______________|       T2ME1   T2ME2   |______  
  //               _______//______                 _______//______//______       
  // bresp  :  ___|-----SLVERR----|_______________|-------DECERR----------|______ 
  //   
  //   
  //
  // NOTE : 1. When rvalid is asserted, then rresp must remain asserted until rready is HIGH. The buffer rresp_ff
  //           will handle this assertion.
  //----------------------------------------------------------------------------------------------------------------
  //  

  `ifdef ASYNC
  always@(posedge aclk or negedge aresetn)
    `elsif SYNC
    always@(posedge aclk)
      `endif
      begin
        if(!aresetn)
          begin
            rresp_ff <= 2'b00;
          end
        else
          begin
            if(rvalid)
              begin
                rresp_ff <= rresp & {2{~(rready)}};  
              end
            else 
              begin
                rresp_ff <= rresp;
              end
          end
      end


  //
  // End  Write/Read response buffer 					          
  //===================================================================================================================



  //-------------------------------------------------------------------------------------------------------------------
  // Write cases of slave busy: When slave output "awready" will be low
  //                            All cases will be active only when signal "wr_stb" read strobe will be HIGH.
  //_________________________________________________________________________________________________________
  // S.NO. | Latency Causes         | Solutions
  //---------------------------------------------------------------------------------------------------------
  //   1.  |  request low by RTL    | The wire name "wstb_ff" will be high and waiting for request to assert high.
  //   2.  |  bvalid asserted       | When previous read transfer valid response "bvalid" is asserted and waiting for bready.
  //								  And at the same cycle request must be high.
  //


  assign slvWriteFreeOrBusy =  bvalid ? bready & request : request ; 

  assign awready  = awvalid_ff ? 1'b0 : slvWriteFreeOrBusy ; // 3.2 :- awvalid_ff ? wstb : slvWriteFreeOrBusy ;

  // To rmv the G1
  //assign slvWriteFreeOrBusy =  awvalid && w ? bready & request : request ;
  //assign awready  = awvalid_ff ? wstb : slvWriteFreeOrBusy ; 

  // Waived :: wvalid_ff and wstb: - This will be waived in case, if there is no transfer of write data channel before write address channel. 
  //                                 If the write data comes before and waiting for address channel, this scenario will handle this case. 

  assign wready   = wvalid_ff ? 1'b0 : slvWriteFreeOrBusy ; // 3.2 :- wvalid_ff ? wstb : slvWriteFreeOrBusy ; 

  //-------------------------------------------------------------------------------------------------------------------





  //-------------------------------------------------------------------------------------------------------------------
  // Read cases of slave busy: When slave output "arready" will be low
  //                           All cases will be active only when signal name "rd_stb" read strobe high.
  //_________________________________________________________________________________________________________
  // S.NO. | Latency Causes         | Solutions
  //---------------------------------------------------------------------------------------------------------
  //   1.  |  rd_wait low by RTL    | The wire name "rd_stb_ff" will be high and waiting for rd_wait to assert high.
  //   2.  |  rvalid asserted       | When previous read transfer valid response "rvalid" is asserted and waiting for rready.
  //								  And at the same cycle rd_wait must be high.
  //


  assign arready  = rvalid ? rready && rd_wait : rd_wait  ; 


  //-------------------------------------------------------------------------------------------------------------------




  //-------------------------------------------------------------------------------------------------------------------
  // Write response : 
  //

  assign bresp    =  (wrDecodeSlvError | &bresp_ff)  ? 2'b11 : ((wrSlvProtError | bresp_ff == 2'b10) ? 2'b10 : bresp_ff)  ; 


  // Read response : 
  //

  assign rresp    =  (rdDecodeSlvError |  &rresp_ff) ? 2'b11 : ((rdSlvProtError | rresp_ff) ? 2'b10 : rresp_ff)  ; 

  //-------------------------------------------------------------------------------------------------------------------



  //===================================================================================================================
  // Read data transfer : Read data transfer.					          
  //===================================================================================================================
  //
  // Read data buffer "rdata_f" : Used to store the read data value.
  //----------------------------------------------------------------------------------------------------------------
  //  S.NO.  | SIGNAL NAME | DESCRIPTION
  //----------------------------------------------------------------------------------------------------------------
  //    1    | rvalid	   | Read valid signal, the done Read transfer is valid.
  //    2    | rready      | Read ready signal, the response or valid read data acknowledged by master.
  //    3    | rd_data_vld | Read data valid, this is the slave signal that indicate a valid read data is available
  //                         on read data bus "rd_data". 
  //    4    | rd_data     | Read data bus, output of the slave.
  //----------------------------------------------------------------------------------------------------------------
  //
  //               ___     ___     ___     ___     ___     ___     ___     ___
  // aclk    :  __|1  |___|2  |___|3  |___|4  |___|5  |___|6  |___|7  |___|8  |_
  //                       _______//______                         _______//____    
  // rready :  ___________|       1       |_______________________|       2                         
  //               _______//______                 _______//______//______                             
  // rvalid :  ___|       T1ME1   |_______________|       T2ME1   T2ME2   |______  
  //               _______//______                 _______//______//______       
  // rdata  :  ___|--0xffffffff-_-|_______________|-------0xfaceb00c------|______ 
  //   
  //  
  // NOTE : 1. When bvalid is asserted, then bresp must remain asserted until bready is HIGH. The buffer bresp_ff
  //           will handle this assertion.
  //--------------------------------------------------------------------------------------------------------------------
  //

  //read data
  `ifdef ASYNC
  always@(posedge aclk or negedge aresetn)
    `elsif SYNC
    always@(posedge aclk)
      `endif
      begin
        if(!aresetn) 
          begin
            rdata_f <= {bus_width{1'b0}} ;
          end
        else 
          begin
            if (rd_data_vld && (rvalid && !rready))
              begin
                rdata_f <= rd_data ;
              end
            else if (rvalid && rready)
              begin
                rdata_f <= {bus_width{1'b0}} ;
              end
          end
      end


  assign rdata = rd_data_vld ? rd_data : rdata_f ; 


  //
  // End Read data transfer 					          
  //===================================================================================================================



  //=======================================================================================================================
  // ERROR RESPONSE CODE :- 
  //================================================


  //-------------------------------------------------------------------------------------------------------------------
  // wrDecodeSlvError : Write decode slave error(write Address not exist in address map) 
  //                    If slave send any write decode error then it must be detected only when slave write ("request : HIGH") is free. 
  //					Otherwise this will wait on slave to come in write ready state. 

  //	Wstb_ff:- This will be waived in case, if there is no delay for writing operation in RTL design. 

  assign wrDecodeSlvError = (request & (wstb | wstb_ff)) ? wr_decode_error : 1'b0 ;

  //-------------------------------------------------------------------------------------------------------------------




  //-------------------------------------------------------------------------------------------------------------------
  // rdDecodeSlvError : Read decode slave error(read Address not exist in address map)
  //                    If slave send any read decode error then it must be detected only when slave read wait ("rd_wait : HIGH") is free. 
  //					Otherwise this will wait on slave to come in read ready state. 

  assign rdDecodeSlvError = (rd_wait  & (rd_stb | rd_stb_ff)) ? rd_decode_error : 1'b0 ;


  // V2.0 assignment was:
  // (wstb | wstb_ff | (&bresp)) ? ((wr_decode_error | (&bresp)) ? (~(&bresp & bready & bvalid)) : 1'b0) : 1'b0 ; // write error by slave
  //-------------------------------------------------------------------------------------------------------------------




  //-------------------------------------------------------------------------------------------------------------------
  // wrSlvProtError : Write slave protection error (write Address have different protection) 
  //                  If slave send any write protection error then it must be detected only when slave write ("request : HIGH") is free. 
  //				  Otherwise this will wait on slave to come in write ready state. 

  // waived :: This will be waived if the RTL design does not have protection on register in the RTL design. 

  assign wrSlvProtError = (request & (wstb | wstb_ff)) ? wr_error : 1'b0 ;

  //-------------------------------------------------------------------------------------------------------------------




  //-------------------------------------------------------------------------------------------------------------------
  // rdSlvProtError : Read slave protection error (read Address have different protection) 
  //                  If slave send any read protection error then it must be detected only when slave read ("rd_wait : HIGH") is free. 
  //				  Otherwise this will wait on slave to come in read ready state. 

  // waived :: This will be waived if the RTL design does not have protection on register in the RTL design. 

  assign rdSlvProtError =  (rd_wait  & (rd_stb | rd_stb_ff)) ? rd_error : 1'b0 ;

  //-------------------------------------------------------------------------------------------------------------------


  //===========================
  // END ERROR RESPONSE CODE :- 
  //=======================================================================================================================



  // output assignment

  assign wr_stb   = wstb;
  assign awprot_i = awprot_ff;
  assign arprot_i = arprot_ff;





endmodule
