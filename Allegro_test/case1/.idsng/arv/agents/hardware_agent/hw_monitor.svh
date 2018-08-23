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
class chip_name_hw_monitor extends uvm_monitor;
    `uvm_component_utils(chip_name_hw_monitor)

    uvm_analysis_port #(hw_txn) mon_port;
    virtual chip_name_hw_if m_hwif;
    config_object cfg;

    function new(string name,uvm_component parent);
        super.new(name,parent);
    endfunction : new

    function void build_phase(uvm_phase phase);
        super.build_phase(phase);
        if(!uvm_config_db #(config_object)::get(this,"","cfg",cfg))
            `uvm_fatal("CONFIG", "config error")
            mon_port = new("mon_port",this);
        endfunction : build_phase

        function void connect_phase(uvm_phase phase);
            super.connect_phase(phase);
            m_hwif = cfg.chip_name_hif;
        endfunction : connect_phase

        task run_phase(uvm_phase phase);
            hw_txn rw;
            rw = new("rw");
            forever @(posedge m_hwif.clk)
            begin

                if( m_hwif.block1_idsreg1_fld_in_enb == 'b1)
                    begin
                        rw.address= 'h78;
                        rw.data =  m_hwif.block1_idsreg1_fld_in;
                        rw.kind = WRITE;
                        mon_port.write(rw);
                    end

                    if( m_hwif.block1_idsreggroup1_reg1_fld_in_enb == 'b1)
                        begin
                            rw.address= 'h80;
                            rw.data =  m_hwif.block1_idsreggroup1_reg1_fld_in;
                            rw.kind = WRITE;
                            mon_port.write(rw);
                        end

                        if( m_hwif.block1_idsreggroup1_reg2_fld1_in_enb == 'b1)
                            begin
                                rw.address= 'h81;
                                rw.data =  m_hwif.block1_idsreggroup1_reg2_fld1_in;
                                rw.kind = WRITE;
                                mon_port.write(rw);
                            end

                            if( m_hwif.block2_idsreggroup1_reg1_fld_in_enb == 'b1)
                                begin
                                    rw.address= 'h84;
                                    rw.data =  m_hwif.block2_idsreggroup1_reg1_fld_in;
                                    rw.kind = WRITE;
                                    mon_port.write(rw);
                                end

                                if( m_hwif.block2_idsreggroup1_reg2_fld1_in_enb == 'b1)
                                    begin
                                        rw.address= 'h85;
                                        rw.data =  m_hwif.block2_idsreggroup1_reg2_fld1_in;
                                        rw.kind = WRITE;
                                        mon_port.write(rw);
                                    end

                                    if( m_hwif.block2_idsref_name_reg1_fld_in_enb == 'b1)
                                        begin
                                            rw.address= 'h87;
                                            rw.data =  m_hwif.block2_idsref_name_reg1_fld_in;
                                            rw.kind = WRITE;
                                            mon_port.write(rw);
                                        end

                                        if( m_hwif.block2_idsref_name_ref_name_reggroup1_reg1_fld_in_enb == 'b1)
                                            begin
                                                rw.address= 'h89;
                                                rw.data =  m_hwif.block2_idsref_name_ref_name_reggroup1_reg1_fld_in;
                                                rw.kind = WRITE;
                                                mon_port.write(rw);
                                            end

                                            if( m_hwif.block2_idsref_name_ref_name_reggroup1_reg2_fld1_in_enb == 'b1)
                                                begin
                                                    rw.address= 'h90;
                                                    rw.data =  m_hwif.block2_idsref_name_ref_name_reggroup1_reg2_fld1_in;
                                                    rw.kind = WRITE;
                                                    mon_port.write(rw);
                                                end

                                            end

                                        endtask : run_phase
                                    endclass : chip_name_hw_monitor
