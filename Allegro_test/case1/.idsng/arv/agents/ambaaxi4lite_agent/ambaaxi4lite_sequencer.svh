//////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright 2015 Agnisys Inc. ALL RIGHTS RESERVED
// 
// Design Name   : AMBAAXI4LITE
// Class Name    : ambaaxi4lite_sequencer
// Project Name  : IDesignSpec
// Description   : Sequencer class of AMBAAXI4LITE bus
// Version       : 1.1 - VK 
//////////////////////////////////////////////////////////////////////////////////////////////////////

`ifndef AMBAAXI4LITE_SEQUENCER
`define AMBAAXI4LITE_SEQUENCER

class ambaaxi4lite_sequencer extends uvm_sequencer #(ambaaxi4lite_txn);
    `uvm_component_utils(ambaaxi4lite_sequencer)

    function new (string name, uvm_component parent = null);
        super.new(name, parent);
    endfunction : new

endclass : ambaaxi4lite_sequencer
`endif