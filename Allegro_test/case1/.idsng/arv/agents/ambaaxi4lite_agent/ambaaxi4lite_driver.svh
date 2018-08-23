//////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright 2015 Agnisys Inc. ALL RIGHTS RESERVED
// 
// Design Name   : AMBAAXI4LITE
// Class Name    : ambaaxi4lite_driver
// Project Name  : IDesignSpec
// Description   : Driver class of AMBAAXI4LITE bus
// Version       : 1.1 - VK 
//////////////////////////////////////////////////////////////////////////////////////////////////////

`ifndef AMBAAXI4LITE_DRIVER
`define AMBAAXI4LITE_DRIVER

class ambaaxi4lite_driver extends uvm_driver#(ambaaxi4lite_txn);
    `uvm_component_utils(ambaaxi4lite_driver)

    virtual ambaaxi4lite_if v_ambaaxi4lite_if;
    config_object  cfg;

    function new (string name, uvm_component parent = null);
        super.new(name, parent);
    endfunction : new

    function void build_phase(uvm_phase phase);
        super.build_phase(phase);
        if(!uvm_config_db #(config_object)::get(this,"","cfg",cfg))
            begin
                `uvm_fatal("BUILD_PHASE", "cannot find config_object in uvm config db");
            end 
    endfunction : build_phase

    function void connect_phase(uvm_phase phase);
        super.connect_phase(phase);
        v_ambaaxi4lite_if = cfg.ambaaxi4liteif;
    endfunction : connect_phase

    task run_phase(uvm_phase phase);
        super.run_phase(phase);

        forever begin
            ambaaxi4lite_txn req_txn;
            @ (v_ambaaxi4lite_if.mck);
            seq_item_port.get_next_item(req_txn);  
            case (req_txn.ambaaxi4lite_txn)
                RESET : reset();
                WRITE : 
                    fork
                        write_address(req_txn);
                        write_data(req_txn);
                        write_resp();
                    join
                READ : 
                    fork
                        read_address(req_txn);
                        read_data(req_txn);
                    join
            endcase
            seq_item_port.item_done();
        end
    endtask : run_phase

    task reset();
        v_ambaaxi4lite_if.mck.awvalid <= '0;
        v_ambaaxi4lite_if.mck.wvalid  <= '0;
        v_ambaaxi4lite_if.mck.arvalid <= '0;
        v_ambaaxi4lite_if.mck.rready  <= '0;
        v_ambaaxi4lite_if.mck.aresetn <= '0;
        v_ambaaxi4lite_if.mck.bready  <= '0;
		v_ambaaxi4lite_if.mck.awprot  <= '0;
		v_ambaaxi4lite_if.mck.arprot  <= '0;
        @ (v_ambaaxi4lite_if.mck);
        @ (v_ambaaxi4lite_if.mck);
        v_ambaaxi4lite_if.aresetn <= 1;
		@ (v_ambaaxi4lite_if.mck);
        @ (v_ambaaxi4lite_if.mck);
        v_ambaaxi4lite_if.aresetn <= 0; 
		@ (v_ambaaxi4lite_if.mck);
        @ (v_ambaaxi4lite_if.mck);
        v_ambaaxi4lite_if.aresetn <= 1;
    endtask : reset

    task write_address(ambaaxi4lite_txn txn);
        v_ambaaxi4lite_if.mck.awaddr  <= txn.addr;
        v_ambaaxi4lite_if.mck.awvalid <= 1;
        @ (v_ambaaxi4lite_if.mck);
        if(v_ambaaxi4lite_if.mck.awready == 1'b0)
            begin
                write_address(txn);
            end
        else
            begin
                v_ambaaxi4lite_if.mck.awvalid <= 0;
            end
    endtask : write_address

    task write_data(ambaaxi4lite_txn txn);
        v_ambaaxi4lite_if.mck.wvalid <= 1;
        v_ambaaxi4lite_if.mck.wstrb  <= txn.byte_sel;
        v_ambaaxi4lite_if.mck.wdata  <= txn.data;
        @ (v_ambaaxi4lite_if.mck);
        if(v_ambaaxi4lite_if.mck.wready == 1'b0)
            begin
                write_data(txn);
            end
        else
            begin
                v_ambaaxi4lite_if.mck.wvalid <= 0;
            end
    endtask : write_data

    task write_resp();
        v_ambaaxi4lite_if.mck.bready <= 1;
        @ (v_ambaaxi4lite_if.mck);
        if(v_ambaaxi4lite_if.mck.bvalid == 1'b0)
            begin
                write_resp();
            end
        else
            begin
                v_ambaaxi4lite_if.mck.bready <= 0;
            end
    endtask : write_resp

    task read_address(ambaaxi4lite_txn txn);
        v_ambaaxi4lite_if.mck.araddr <= txn.addr;
        v_ambaaxi4lite_if.mck.arvalid <= 1;
        @ (v_ambaaxi4lite_if.mck);
        if(v_ambaaxi4lite_if.mck.arready == 1'b0)
            begin
                read_address(txn);
            end
        else
            begin
                v_ambaaxi4lite_if.mck.arvalid <= 0;
            end
    endtask : read_address

    task read_data(ambaaxi4lite_txn txn);
        v_ambaaxi4lite_if.mck.rready <= 1;
        @ (v_ambaaxi4lite_if.mck);
        if(v_ambaaxi4lite_if.mck.rvalid == 1'b0)
            begin
                read_data(txn);
            end
        else
            begin
                txn.data = v_ambaaxi4lite_if.mck.rdata;
                txn.rd_data = v_ambaaxi4lite_if.mck.rdata;  //added for invalid address checking
                v_ambaaxi4lite_if.mck.rready <= 0;
            end
    endtask : read_data

endclass : ambaaxi4lite_driver
`endif