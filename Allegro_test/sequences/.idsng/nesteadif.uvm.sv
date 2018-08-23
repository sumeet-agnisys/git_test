//=====================================================================================================================
//All Rights Reserved.
//*** This file is auto generated by ISequenceSpec (http://www.agnisys.com) . Please do not edit this file. ***
//Created by        :
//Generated by      : Admin
//Generated from    : C:\Users\Admin\Documents\GitHub\git_test\Allegro_test\sequences\chip.idsng
//IDesignSpec rev   : idsbatch v4.16.26.2
//=====================================================================================================================

class uvm_nesteadif_seq extends uvm_reg_sequence#(uvm_sequence#(uvm_reg_item));
    `uvm_object_utils(uvm_nesteadif_seq)

    uvm_status_e status;

    chip_name_block rm ;

    function new(string name = "uvm_nesteadif_seq") ;
        super.new(name);
        this.init();
    endfunction

    int op_freq;
    int rx_div;
    int tx_div;

    function init(int op_freq=5825, int rx_div=5, int tx_div=7);
        this.op_freq = op_freq;
        this.rx_div = rx_div;
        this.tx_div = tx_div;
    endfunction

    const int MUL = 104 ;
    const real DIV = 76.8 ;
    const int VAL1 = 'h1A320006 ;
    const int VAL2 = 'h1AEC0006 ;
    const int VAL3 = 10320006 ;
    const int VAL4 = 'h10EC0006 ;
    const int VAL5 = 'h0000D196 ;
    const int VAL6 = 'h0000D766 ;
    const int VAL7 = 8196 ;
    const int VAL8 = 8766 ;
    int dpll_freq = 2200 ;
    int val_r = 2200 ;
    int val = 2200 ;

    task body;

        if(!$cast(rm, model)) begin
            `uvm_error("RegModel : chip_name_block","cannot cast an object of type uvm_reg_sequence to rm");
        end

        if (rm == null)  begin
            `uvm_error("chip_name_block", "No register model specified to run sequence on, you should specify regmodel by using property 'uvm.regmodel' in the sequence")
            return;
        end

        for ( int i = 0 ; i < 6;i++ )
        begin

            //----------------------------------------------------------------------------------
            /*---- RDIG band select (LB/HB) */
            //---------------------------------------------------------------------------------

            rm.block_name.REG_SYS_LGC_GENERAL_0.write(status, 10, .parent(this));
        end

        rm.block_name.REG_SYS_LGC_LDOS_SYSMOD_0.write(status, 20, .parent(this));

        //----------------------------------------------------------------------------------
        /*---- Add all RFLOG LDOs (per band) to enable LOG_train */
        //---------------------------------------------------------------------------------

        rm.block_name.REG_SYS_LGC_LDOS_SYSMOD_0.write(status, 'h00300180, .parent(this));

        //----------------------------------------------------------------------------------
        /*---- Apply frequency dependent configurations */
        //---------------------------------------------------------------------------------

        rm.block_name.REG_DPLL_ABS.write(status, 'h00007800, .parent(this));

        //----------------------------------------------------------------------------------
        /*---- Apply frequency dependent configurations */
        //---------------------------------------------------------------------------------

        rm.block_name.REG_SYS_LGC_COEX_5.write(status, 'h00007800, .parent(this));

        //----------------------------------------------------------------------------------
        /*---- Apply frequency dependent configurations */
        //---------------------------------------------------------------------------------

        rm.block_name.REG_DPLL_ABS.write(status, 'h00004800, .parent(this));

        rm.block_name.CHA_REG_DAC_ANA_DIV.write(status, 1111, .parent(this));

        //----------------------------------------------------------------------------------
        /*---- Apply frequency dependent configurations */
        //---------------------------------------------------------------------------------

        rm.block_name.REG_SYS_LGC_COEX_7.write(status, 'h0000FC0, .parent(this));

        //----------------------------------------------------------------------------------
        /*---- Apply frequency dependent configurations */
        //---------------------------------------------------------------------------------

        rm.block_name.REG_SYS_LGC_COEX_7.write(status, 'h00000200, .parent(this));

        //----------------------------------------------------------------------------------
        /*---- Apply frequency dependent configurations */
        //---------------------------------------------------------------------------------

        rm.block_name.CHA_REG_DAC_ANA_DIV.write(status, 456, .parent(this));

        rm.block_name.REG_SYS_LGC_COEX_7.write(status, 'h00000008, .parent(this));

        rm.block_name.REG_DPLL_ABS.write(status, 'h00000008, .parent(this));

        rm.block_name.REG_SYS_LGC_CM_0.write(status, 'h00060006, .parent(this));

        rm.block_name.REG_SYS_LGC_CM_0.write(status, 673, .parent(this));

        rm.block_name.REG_SYS_LGC_CM_0.write(status, 'h00000000, .parent(this));

        rm.block_name.REG_SYS_LGC_LDOS_SYSMOD_0.write(status, 'h00F00000, .parent(this));

        rm.block_name.REG_SYS_LGC_COEX_6.write(status, 'h0000007F, .parent(this));

    endtask: body
endclass: uvm_nesteadif_seq
