//////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright 2015 Agnisys Inc. ALL RIGHTS RESERVED
// 
// Design Name   : AMBAAXI4LITE
// Class Name    : reg2ambaaxi4lite_adapter
// Project Name  : IDesignSpec
// Description   : Adapter class from Register model to AMBAAXI4LITE bus transactions
// Version       : 1.1 - VK 
//////////////////////////////////////////////////////////////////////////////////////////////////////

`ifndef REG2AMBAAXI4LITE_ADAPTER
`define REG2AMBAAXI4LITE_ADAPTER

class reg2ambaaxi4lite_adapter extends uvm_reg_adapter;
    `uvm_object_utils(reg2ambaaxi4lite_adapter)

    function new(string name="reg2ambaaxi4lite_adapter");
        super.new(name);
    endfunction : new

    // conversion from uvm_reg_bus_op to ambaaxi4lite_txn
    virtual function uvm_sequence_item reg2bus(const ref uvm_reg_bus_op rw);
        ambaaxi4lite_txn ambaaxi4lite = ambaaxi4lite_txn::type_id::create("ambaaxi4lite_txn");
        if(rw.kind == UVM_WRITE)
            ambaaxi4lite.init_txn( WRITE, rw.addr, rw.data, rw.byte_en);       
        else begin
            ambaaxi4lite.init_txn( READ, rw.addr, rw.data, rw.byte_en);
        end
        return ambaaxi4lite;
    endfunction : reg2bus

    // conversion from ambaaxi4lite_txn type to uvm_reg_bus_op
    virtual function void bus2reg(uvm_sequence_item  bus_item,
                                  ref uvm_reg_bus_op rw
                                 );
        ambaaxi4lite_txn txn;

        if (!$cast(txn,bus_item))
            begin
                `uvm_fatal("NOT_ambaaxi4lite_TXN_TYPE","Provided bus_item is not of the correct type")
                return;
            end

        if (txn.ambaaxi4lite_txn == WRITE)
            begin
                rw.kind = UVM_WRITE;
            end  
        else if (txn.ambaaxi4lite_txn == READ)
            begin
                rw.kind = UVM_READ;
            end
        else 
            begin
                `uvm_fatal("NOT_READ_WRITE_TXN", "Provided bus_item is not a read or write transaction")
            end
        rw.addr   = txn.addr;
        rw.data   = txn.data;
        rw.status = txn.ambaaxi4lite_status;
    endfunction : bus2reg

endclass : reg2ambaaxi4lite_adapter
`endif