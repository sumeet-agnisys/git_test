//=====================================================================================================================
//All Rights Reserved.
//*** This file is auto generated by ISequenceSpec (http://www.agnisys.com) . Please do not edit this file. ***
//Created by        :
//Generated by      : Saurabh
//Generated from    : C:\Users\Anupam\Documents\GitHub\git_test\Allegro_test\test99\test114.idsng
//IDesignSpec rev   : idsbatch v 6.16.4.7
//=====================================================================================================================

class uvm_seq_name_seq extends uvm_reg_sequence#(uvm_sequence#(uvm_reg_item));
    `uvm_object_utils(uvm_seq_name_seq)

    uvm_status_e status;

    block_name_block rm ;

    function new(string name = "uvm_seq_name_seq") ;
        super.new(name);
    endfunction

    task body;

        if(!$cast(rm, model)) begin
            `uvm_error("RegModel : block_name_block","cannot cast an object of type uvm_reg_sequence to rm");
        end

        if (rm == null)  begin
            `uvm_error("block_name_block", "No register model specified to run sequence on, you should specify regmodel by using property 'uvm.regmodel' in the sequence")
            return;
        end

        rm.eeprom.Reg22.lint_out_inv.write(status, 'h0, .parent(this));

    endtask: body
endclass: uvm_seq_name_seq