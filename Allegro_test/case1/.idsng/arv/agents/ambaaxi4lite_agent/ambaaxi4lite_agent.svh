//////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright 2015 Agnisys Inc. ALL RIGHTS RESERVED
// 
// Design Name   : AMBAAXI4LITE
// Class Name    : ambaaxi4lite_agent
// Project Name  : IDesignSpec
// Description   : Agent class of AMBAAXI4LITE bus
// Version       : 1.1 - VK 
//////////////////////////////////////////////////////////////////////////////////////////////////////

`ifndef AMBAAXI4LITE_AGENT
`define AMBAAXI4LITE_AGENT

class ambaaxi4lite_agent extends uvm_agent;
    `uvm_component_utils(ambaaxi4lite_agent)

    ambaaxi4lite_driver    ambaaxi4lite_drv;
    ambaaxi4lite_sequencer ambaaxi4lite_seqr;

    function new (string name, uvm_component parent = null);
        super.new(name, parent);
    endfunction : new

    function void build_phase(uvm_phase phase);
        super.build_phase(phase);
        ambaaxi4lite_drv = ambaaxi4lite_driver::type_id::create("ambaaxi4lite_drv",this);
        ambaaxi4lite_seqr= ambaaxi4lite_sequencer::type_id::create("ambaaxi4lite_seqr",this);
    endfunction : build_phase

    function void connect_phase(uvm_phase phase);
        super.connect_phase(phase);
        ambaaxi4lite_drv.seq_item_port.connect(ambaaxi4lite_seqr.seq_item_export);
    endfunction : connect_phase

endclass : ambaaxi4lite_agent
`endif