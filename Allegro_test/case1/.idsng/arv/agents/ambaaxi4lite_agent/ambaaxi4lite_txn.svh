//////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright 2015 Agnisys Inc. ALL RIGHTS RESERVED
// 
// Design Name   : AMBAAXI4LITE
// Class Name    : ambaaxi4lite_txn
// Project Name  : IDesignSpec
// Description   : Transactions class of AMBAAXI4LITE bus 
// Version       : 1.1 - VK 
//////////////////////////////////////////////////////////////////////////////////////////////////////

`ifndef AMBAAXI4LITE_TXN
`define AMBAAXI4LITE_TXN

//----------------------------------------------
// AMBAAXI4LITE transaction types enumeration
// typedef enum {READ,WRITE,RESET,IDLE} ambaaxi4lite_txn_kind;
// UVM status enumeration
// typedef enum {UVM_IS_OK, UVM_NOT_OK, UVM_HAS_X} uvm_status_e;
//----------------------------------------------

class ambaaxi4lite_txn extends uvm_sequence_item;
    `uvm_object_utils(ambaaxi4lite_txn)

    ambaaxi4lite_txn_kind  ambaaxi4lite_txn;
    rand uvm_reg_addr_t    addr;
    rand uvm_reg_data_t    data;
    uvm_reg_data_t  rd_data;  //added for invalid address checking
    uvm_reg_byte_en_t      byte_sel;
    uvm_status_e           ambaaxi4lite_status;

    function new(string name="ambaaxi4lite_txn");
        super.new(name);
        ambaaxi4lite_status = UVM_IS_OK;
    endfunction : new

    function void init_txn(ambaaxi4lite_txn_kind f_ambaaxi4lite_txn  = IDLE, 
                           uvm_reg_addr_t        f_addr              = 'x, 
                           uvm_reg_data_t        f_data              = '0, 
                           uvm_reg_byte_en_t     f_byte_sel          = '1
						   );
        ambaaxi4lite_txn  = f_ambaaxi4lite_txn;
        addr              = f_addr;
        data              = f_data;
        byte_sel          = f_byte_sel;
    endfunction : init_txn

endclass : ambaaxi4lite_txn
`endif