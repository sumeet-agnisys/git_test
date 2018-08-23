
import ambaaxi4lite_pkg::*;
import chip_name_regmem_pkg::*;

class topseqr extends uvm_virtual_sequencer;
    `uvm_component_utils(topseqr)
    uvm_sequencer#(ambaaxi4lite_txn) ambaaxi4lite_seqr;

    function new(string name,uvm_component parent);
        super.new(name,parent);
    endfunction

endclass

class uvm_arv_reset_seq extends uvm_reg_sequence#(uvm_sequence#(uvm_reg_item));
    `uvm_object_utils(uvm_arv_reset_seq)
    uvm_reg regs[$];
    topseqr v_seqr;

    function new(string name ="uvm_arv_reset_seq");
        super.new(name);
    endfunction

    task body();
        if(!$cast(v_seqr, m_sequencer)) begin
            `uvm_error(get_full_name(),"Virtual sequencer pointer cast failed");
        end

        if (model == null)  begin
            `uvm_error("arv_reset_seq", "No register model specified to run sequence on")
            return;
        end

        //DUT Reset
        reset_all(this,v_seqr.ambaaxi4lite_seqr);

        // RegModel Reset
        model.reset();

        `uvm_info("finishRESET","RESET done",UVM_HIGH)

    endtask: body

endclass

class uvm_arv_main_seq extends uvm_reg_sequence#(uvm_sequence#(uvm_reg_item));
    `uvm_object_utils(uvm_arv_main_seq)
    uvm_reg regs[$];
    topseqr v_seqr;

    function new(string name ="uvm_arv_main_seq");
        super.new(name);
    endfunction

    task body();
        if(!$cast(v_seqr, m_sequencer)) begin
            `uvm_error(get_full_name(),"Virtual sequencer pointer cast failed");
        end

        if (model == null)  begin
            `uvm_error("arv_main_seq", "No register model specified to run sequence on")
            return;
        end

        do_block(model);
        `uvm_info("finishARV","ARV done",UVM_HIGH)

    endtask: body

    protected virtual task do_block(uvm_reg_block blk);
        chip_name_block block;
        uvm_reg regs[$];
        uvm_path_e 	path;
        uvm_reg_map maps[$];
        uvm_reg_map def_map;
        blk.get_registers(regs, UVM_NO_HIER);
        void'($cast(block, model));

        if (uvm_resource_db#(bit)::get_by_name({"REG::",blk.get_full_name()}, "NO_REG_TESTS", 0) != null || uvm_resource_db#(bit)::get_by_name({"REG::",blk.get_full_name()}, "NO_REG_ACCESS_TEST", 0) != null )
            return;

            foreach (regs[j])    begin

            uvm_reg_field fields[$];

            regs[j].get_maps(maps);

            // Registers with some attributes are not to be tested
            if (uvm_resource_db#(bit)::get_by_name({"REG::",regs[j].get_full_name()}, "NO_REG_TESTS", 0) != null || uvm_resource_db#(bit)::get_by_name({"REG::",regs[j].get_full_name()}, "NO_REG_ACCESS_TEST", 0) != null )
                continue;

                foreach(maps[j])
                begin
                    case(maps[j].get_name())
                        default : def_map = maps[j];
                    endcase
                end

                `uvm_info("Reg_info", {"Register is ", regs[j].get_name()},UVM_LOW);

                case(regs[j].get_full_name())

                    default:
                    begin
                        regs[j].get_fields(fields);
                        if(regs[j].get_full_name() == "chip_name.block1.reg1") begin
                            uvm_reg_swRW_seq SwRW;
                            string seq_name;
                            bit constraintExist = 0;
                            seq_name = {"rw.",regs[j].get_full_name()};
                            config_pkg::uvm_global_current_seq = seq_name;
                            SwRW = uvm_reg_swRW_seq::type_id::create(seq_name);
                            SwRW.rg = regs[j];
                            SwRW.model = model;
                            SwRW.mask = 32'hFFFFFFFF;
                            SwRW.constraintExist = constraintExist;
                            SwRW.start(v_seqr.ambaaxi4lite_seqr);
                            config_pkg::uvm_global_current_seq = "";
                        end
                        if(regs[j].get_full_name() == "chip_name.block1.reggroup1.reg1") begin
                            uvm_reg_swRW_seq SwRW;
                            string seq_name;
                            bit constraintExist = 0;
                            seq_name = {"rw.",regs[j].get_full_name()};
                            config_pkg::uvm_global_current_seq = seq_name;
                            SwRW = uvm_reg_swRW_seq::type_id::create(seq_name);
                            SwRW.rg = regs[j];
                            SwRW.model = model;
                            SwRW.mask = 32'hFFFFFFFF;
                            SwRW.constraintExist = constraintExist;
                            SwRW.start(v_seqr.ambaaxi4lite_seqr);
                            config_pkg::uvm_global_current_seq = "";
                        end
                        if(regs[j].get_full_name() == "chip_name.block1.reggroup1.reg2") begin
                            uvm_reg_swRW_seq SwRW;
                            string seq_name;
                            bit constraintExist = 0;
                            seq_name = {"rw.",regs[j].get_full_name()};
                            config_pkg::uvm_global_current_seq = seq_name;
                            SwRW = uvm_reg_swRW_seq::type_id::create(seq_name);
                            SwRW.rg = regs[j];
                            SwRW.model = model;
                            SwRW.mask = 32'hFFFFFFFF;
                            SwRW.constraintExist = constraintExist;
                            SwRW.start(v_seqr.ambaaxi4lite_seqr);
                            config_pkg::uvm_global_current_seq = "";
                        end
                        if(regs[j].get_full_name() == "chip_name.block2.reggroup1.reg1") begin
                            uvm_reg_swRW_seq SwRW;
                            string seq_name;
                            bit constraintExist = 0;
                            seq_name = {"rw.",regs[j].get_full_name()};
                            config_pkg::uvm_global_current_seq = seq_name;
                            SwRW = uvm_reg_swRW_seq::type_id::create(seq_name);
                            SwRW.rg = regs[j];
                            SwRW.model = model;
                            SwRW.mask = 32'hFFFFFFFF;
                            SwRW.constraintExist = constraintExist;
                            SwRW.start(v_seqr.ambaaxi4lite_seqr);
                            config_pkg::uvm_global_current_seq = "";
                        end
                        if(regs[j].get_full_name() == "chip_name.block2.reggroup1.reg2") begin
                            uvm_reg_swRW_seq SwRW;
                            string seq_name;
                            bit constraintExist = 0;
                            seq_name = {"rw.",regs[j].get_full_name()};
                            config_pkg::uvm_global_current_seq = seq_name;
                            SwRW = uvm_reg_swRW_seq::type_id::create(seq_name);
                            SwRW.rg = regs[j];
                            SwRW.model = model;
                            SwRW.mask = 32'hFFFFFFFF;
                            SwRW.constraintExist = constraintExist;
                            SwRW.start(v_seqr.ambaaxi4lite_seqr);
                            config_pkg::uvm_global_current_seq = "";
                        end
                        if(regs[j].get_full_name() == "chip_name.block2.ref_name.reg1") begin
                            uvm_reg_swRW_seq SwRW;
                            string seq_name;
                            bit constraintExist = 0;
                            seq_name = {"rw.",regs[j].get_full_name()};
                            config_pkg::uvm_global_current_seq = seq_name;
                            SwRW = uvm_reg_swRW_seq::type_id::create(seq_name);
                            SwRW.rg = regs[j];
                            SwRW.model = model;
                            SwRW.mask = 32'hFFFFFFFF;
                            SwRW.constraintExist = constraintExist;
                            SwRW.start(v_seqr.ambaaxi4lite_seqr);
                            config_pkg::uvm_global_current_seq = "";
                        end
                        if(regs[j].get_full_name() == "chip_name.block2.ref_name.reggroup1.reg1") begin
                            uvm_reg_swRW_seq SwRW;
                            string seq_name;
                            bit constraintExist = 0;
                            seq_name = {"rw.",regs[j].get_full_name()};
                            config_pkg::uvm_global_current_seq = seq_name;
                            SwRW = uvm_reg_swRW_seq::type_id::create(seq_name);
                            SwRW.rg = regs[j];
                            SwRW.model = model;
                            SwRW.mask = 32'hFFFFFFFF;
                            SwRW.constraintExist = constraintExist;
                            SwRW.start(v_seqr.ambaaxi4lite_seqr);
                            config_pkg::uvm_global_current_seq = "";
                        end
                        if(regs[j].get_full_name() == "chip_name.block2.ref_name.reggroup1.reg2") begin
                            uvm_reg_swRW_seq SwRW;
                            string seq_name;
                            bit constraintExist = 0;
                            seq_name = {"rw.",regs[j].get_full_name()};
                            config_pkg::uvm_global_current_seq = seq_name;
                            SwRW = uvm_reg_swRW_seq::type_id::create(seq_name);
                            SwRW.rg = regs[j];
                            SwRW.model = model;
                            SwRW.mask = 32'hFFFFFFFF;
                            SwRW.constraintExist = constraintExist;
                            SwRW.start(v_seqr.ambaaxi4lite_seqr);
                            config_pkg::uvm_global_current_seq = "";
                        end

                        foreach(fields[i]) begin

                        uvm_reg_field pfld;
                        if(!$cast(pfld,fields[i])) begin
                            `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to agni_uvm_reg_field")
                        end
                        if (fields[i].is_indv_accessible(path,def_map))    begin
                            `uvm_info("fields_info", {"Starting sequence for access -------",fields[i].get_access()," ------"},UVM_LOW);

                            //Creating positive sequence for fields

                            case (fields[i].get_access())
                                "RW":
                                begin
                                    uvm_field_swRW_seq SwRW;
                                    string seq_name;
                                    seq_name = {"rw.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwRW = uvm_field_swRW_seq::type_id::create(seq_name);
                                    SwRW.fld = fields[i];
                                    SwRW.model = model;
                                    SwRW.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "RO":
                                begin
                                    uvm_field_swRO_seq SwRo;
                                    string seq_name;
                                    seq_name = {"ro.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwRo = uvm_field_swRO_seq::type_id::create(seq_name);
                                    SwRo.fld = fields[i];
                                    SwRo.model = model;
                                    SwRo.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "WO":
                                begin
                                    uvm_field_swWO_seq SwWo;
                                    string seq_name;
                                    seq_name = {"wo.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwWo = uvm_field_swWO_seq::type_id::create(seq_name);
                                    SwWo.fld = fields[i];
                                    SwWo.model = model;
                                    SwWo.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "RC":
                                begin
                                    uvm_field_swRCRS_seq SwRc;
                                    string seq_name;
                                    seq_name = {"rc.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwRc = uvm_field_swRCRS_seq::type_id::create(seq_name);
                                    SwRc.fld = fields[i];
                                    SwRc.model = model;
                                    SwRc.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "RS":
                                begin
                                    uvm_field_swRCRS_seq SwRs;
                                    string seq_name;
                                    seq_name = {"rs.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwRs = uvm_field_swRCRS_seq::type_id::create(seq_name);
                                    SwRs.fld = fields[i];
                                    SwRs.model = model;
                                    SwRs.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "WS":
                                begin
                                    uvm_field_swWCWS_seq SwWs;
                                    string seq_name;
                                    seq_name = {"ws.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwWs = uvm_field_swWCWS_seq::type_id::create(seq_name);
                                    SwWs.fld = fields[i];
                                    SwWs.model = model;
                                    SwWs.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "WC":
                                begin
                                    uvm_field_swWCWS_seq SwWc;
                                    string seq_name;
                                    seq_name = {"wc.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwWc = uvm_field_swWCWS_seq::type_id::create(seq_name);
                                    SwWc.fld = fields[i];
                                    SwWc.model = model;
                                    SwWc.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W1S":
                                begin
                                    uvm_field_swW1SW1C_seq SwW1s;
                                    string seq_name;
                                    seq_name = {"w1s.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwW1s = uvm_field_swW1SW1C_seq::type_id::create(seq_name);
                                    SwW1s.fld = fields[i];
                                    SwW1s.model = model;
                                    SwW1s.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W1C":
                                begin
                                    uvm_field_swW1SW1C_seq SwW1c;
                                    string seq_name;
                                    seq_name = {"w1c.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwW1c = uvm_field_swW1SW1C_seq::type_id::create(seq_name);
                                    SwW1c.fld = fields[i];
                                    SwW1c.model = model;
                                    SwW1c.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W1T":
                                begin
                                    uvm_field_swW1TW0T_seq SwW1t;
                                    string seq_name;
                                    seq_name = {"w1t.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwW1t = uvm_field_swW1TW0T_seq::type_id::create(seq_name);
                                    SwW1t.fld = fields[i];
                                    SwW1t.model = model;
                                    SwW1t.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W0T":
                                begin
                                    uvm_field_swW1TW0T_seq SwW0t;
                                    string seq_name;
                                    seq_name = {"w0t.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwW0t = uvm_field_swW1TW0T_seq::type_id::create(seq_name);
                                    SwW0t.fld = fields[i];
                                    SwW0t.model = model;
                                    SwW0t.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W0S":
                                begin
                                    uvm_field_swW0SW0C_seq SwW0s;
                                    string seq_name;
                                    seq_name = {"w0s.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwW0s = uvm_field_swW0SW0C_seq::type_id::create(seq_name);
                                    SwW0s.fld = fields[i];
                                    SwW0s.model = model;
                                    SwW0s.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W0C":
                                begin
                                    uvm_field_swW0SW0C_seq SwW0c;
                                    string seq_name;
                                    seq_name = {"w0c.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwW0c = uvm_field_swW0SW0C_seq::type_id::create(seq_name);
                                    SwW0c.fld = fields[i];
                                    SwW0c.model = model;
                                    SwW0c.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "WRC":
                                begin
                                    uvm_field_swWRCWRS_seq SwWRC;
                                    string seq_name;
                                    seq_name = {"wrc.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwWRC = uvm_field_swWRCWRS_seq::type_id::create(seq_name);
                                    SwWRC.fld = fields[i];
                                    SwWRC.model = model;
                                    SwWRC.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "WRS":
                                begin
                                    uvm_field_swWRCWRS_seq SwWRS;
                                    string seq_name;
                                    seq_name = {"wrs.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwWRS = uvm_field_swWRCWRS_seq::type_id::create(seq_name);
                                    SwWRS.fld = fields[i];
                                    SwWRS.model = model;
                                    SwWRS.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "WSRC":
                                begin
                                    uvm_field_swWSRCWCRS_seq SwWSRC;
                                    string seq_name;
                                    seq_name = {"wsrc.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwWSRC = uvm_field_swWSRCWCRS_seq::type_id::create(seq_name);
                                    SwWSRC.fld = fields[i];
                                    SwWSRC.model = model;
                                    SwWSRC.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "WCRS":
                                begin
                                    uvm_field_swWSRCWCRS_seq SwWCRS;
                                    string seq_name;
                                    seq_name = {"wcrs.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwWCRS = uvm_field_swWSRCWCRS_seq::type_id::create(seq_name);
                                    SwWCRS.fld = fields[i];
                                    SwWCRS.model = model;
                                    SwWCRS.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W1SRC":
                                begin
                                    uvm_field_swW1SRCW1CRS_seq SwW1SRC;
                                    string seq_name;
                                    seq_name = {"w1src.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwW1SRC = uvm_field_swW1SRCW1CRS_seq::type_id::create(seq_name);
                                    SwW1SRC.fld = fields[i];
                                    SwW1SRC.model = model;
                                    SwW1SRC.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W0SRC":
                                begin
                                    uvm_field_swW0SRCW0CRS_seq SwW0SRC;
                                    string seq_name;
                                    seq_name = {"w0src.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwW0SRC = uvm_field_swW0SRCW0CRS_seq::type_id::create(seq_name);
                                    SwW0SRC.fld = fields[i];
                                    SwW0SRC.model = model;
                                    SwW0SRC.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W1CRS":
                                begin
                                    uvm_field_swW1SRCW1CRS_seq SwW1CRS;
                                    string seq_name;
                                    seq_name = {"w1crs.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwW1CRS = uvm_field_swW1SRCW1CRS_seq::type_id::create(seq_name);
                                    SwW1CRS.fld = fields[i];
                                    SwW1CRS.model = model;
                                    SwW1CRS.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W0CRS":
                                begin
                                    uvm_field_swW0SRCW0CRS_seq SwW0CRS;
                                    string seq_name;
                                    seq_name = {"w0crs.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    SwW0CRS = uvm_field_swW0SRCW0CRS_seq::type_id::create(seq_name);
                                    SwW0CRS.fld = fields[i];
                                    SwW0CRS.model = model;
                                    SwW0CRS.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                            endcase
                        end

                    end
                end

                //end

            endcase

        end

        begin
            uvm_reg_block blks[$];
            blk.get_blocks(blks);
            foreach (blks[i])
            begin
                do_block(blks[i]);
            end
        end
    endtask
endclass

class NEG_uvm_arv_main_seq extends uvm_reg_sequence#(uvm_sequence#(uvm_reg_item));
    `uvm_object_utils(NEG_uvm_arv_main_seq)
    uvm_reg regs[$];
    topseqr v_seqr;

    function new(string name ="NEG_uvm_arv_main_seq");
        super.new(name);
    endfunction

    task body();
        if(!$cast(v_seqr, m_sequencer)) begin
            `uvm_error(get_full_name(),"Virtual sequencer pointer cast failed");
        end

        if (model == null)  begin
            `uvm_error("arv_main_seq", "No register model specified to run sequence on")
            return;
        end

        do_block(model);
        `uvm_info("finishARV","ARV done",UVM_HIGH)

    endtask: body

    protected virtual task do_block(uvm_reg_block blk);
        chip_name_block block;
        uvm_reg regs[$];
        uvm_path_e 	path;
        uvm_reg_map maps[$];
        uvm_reg_map def_map;
        blk.get_registers(regs, UVM_NO_HIER);
        void'($cast(block, model));

        if (uvm_resource_db#(bit)::get_by_name({"REG::",blk.get_full_name()}, "NO_REG_TESTS", 0) != null || uvm_resource_db#(bit)::get_by_name({"REG::",blk.get_full_name()}, "NO_REG_ACCESS_TEST", 0) != null )
            return;

            foreach (regs[j])    begin

            uvm_reg_field fields[$];

            regs[j].get_maps(maps);

            // Registers with some attributes are not to be tested
            if (uvm_resource_db#(bit)::get_by_name({"REG::",regs[j].get_full_name()}, "NO_REG_TESTS", 0) != null || uvm_resource_db#(bit)::get_by_name({"REG::",regs[j].get_full_name()}, "NO_REG_ACCESS_TEST", 0) != null )
                continue;

                foreach(maps[j])
                begin
                    case(maps[j].get_name())
                        default : def_map = maps[j];
                    endcase
                end

                `uvm_info("Reg_info", {"Register is ", regs[j].get_name()},UVM_LOW);

                case(regs[j].get_full_name())

                    default:
                    begin
                        regs[j].get_fields(fields);

                        foreach(fields[i]) begin

                        uvm_reg_field pfld;
                        if(!$cast(pfld,fields[i])) begin
                            `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to agni_uvm_reg_field")
                        end
                        if (fields[i].is_indv_accessible(path,def_map))    begin
                            `uvm_info("fields_info", {"Starting sequence for access -------",fields[i].get_access()," ------"},UVM_LOW);

                            //Creating negative sequence for fields

                            case (fields[i].get_access())
                                "RO":
                                begin
                                    uvm_field_swRO_NEG_seq NEG_SwRo;
                                    string seq_name;
                                    seq_name = {"Not.ro.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    NEG_SwRo = uvm_field_swRO_NEG_seq::type_id::create(seq_name);
                                    NEG_SwRo.fld = fields[i];
                                    NEG_SwRo.model = model;
                                    NEG_SwRo.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "WO":
                                begin
                                    uvm_field_swWO_NEG_seq NEG_SwWo;
                                    string seq_name;
                                    seq_name = {"Not.wo.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    NEG_SwWo = uvm_field_swWO_NEG_seq::type_id::create(seq_name);
                                    NEG_SwWo.fld = fields[i];
                                    NEG_SwWo.model = model;
                                    NEG_SwWo.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "RC":
                                begin
                                    uvm_field_swRCRS_NEG_seq NEG_SwRc;
                                    string seq_name;
                                    seq_name = {"Not.rc.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    NEG_SwRc = uvm_field_swRCRS_NEG_seq::type_id::create(seq_name);
                                    NEG_SwRc.fld = fields[i];
                                    NEG_SwRc.model = model;
                                    NEG_SwRc.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "RS":
                                begin
                                    uvm_field_swRCRS_NEG_seq NEG_SwRs;
                                    string seq_name;
                                    seq_name = {"Not.rs.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    NEG_SwRs = uvm_field_swRCRS_NEG_seq::type_id::create(seq_name);
                                    NEG_SwRs.fld = fields[i];
                                    NEG_SwRs.model = model;
                                    NEG_SwRs.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "WS":
                                begin
                                    uvm_field_swWCWS_NEG_seq NEG_SwWs;
                                    string seq_name;
                                    seq_name = {"Not.ws.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    NEG_SwWs = uvm_field_swWCWS_NEG_seq::type_id::create(seq_name);
                                    NEG_SwWs.fld = fields[i];
                                    NEG_SwWs.model = model;
                                    NEG_SwWs.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "WC":
                                begin
                                    uvm_field_swWCWS_NEG_seq NEG_SwWc;
                                    string seq_name;
                                    seq_name = {"Not.wc.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    NEG_SwWc = uvm_field_swWCWS_NEG_seq::type_id::create(seq_name);
                                    NEG_SwWc.fld = fields[i];
                                    NEG_SwWc.model = model;
                                    NEG_SwWc.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W1S":
                                begin
                                    uvm_field_swW1SW1C_NEG_seq NEG_SwW1s;
                                    string seq_name;
                                    seq_name = {"Not.w1s.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    NEG_SwW1s = uvm_field_swW1SW1C_NEG_seq::type_id::create(seq_name);
                                    NEG_SwW1s.fld = fields[i];
                                    NEG_SwW1s.model = model;
                                    NEG_SwW1s.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W1C":
                                begin
                                    uvm_field_swW1SW1C_NEG_seq NEG_SwW1c;
                                    string seq_name;
                                    seq_name = {"Not.w1c.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    NEG_SwW1c = uvm_field_swW1SW1C_NEG_seq::type_id::create(seq_name);
                                    NEG_SwW1c.fld = fields[i];
                                    NEG_SwW1c.model = model;
                                    NEG_SwW1c.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W1T":
                                begin
                                    uvm_field_swW1TW0T_NEG_seq NEG_SwW1t;
                                    string seq_name;
                                    seq_name = {"Not.w1t.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    NEG_SwW1t = uvm_field_swW1TW0T_NEG_seq::type_id::create(seq_name);
                                    NEG_SwW1t.fld = fields[i];
                                    NEG_SwW1t.model = model;
                                    NEG_SwW1t.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W0T":
                                begin
                                    uvm_field_swW1TW0T_NEG_seq NEG_SwW0t;
                                    string seq_name;
                                    seq_name = {"Not.w0t.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    NEG_SwW0t = uvm_field_swW1TW0T_NEG_seq::type_id::create(seq_name);
                                    NEG_SwW0t.fld = fields[i];
                                    NEG_SwW0t.model = model;
                                    NEG_SwW0t.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W0S":
                                begin
                                    uvm_field_swW0SW0C_NEG_seq NEG_SwW0s;
                                    string seq_name;
                                    seq_name = {"Not.w0s.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    NEG_SwW0s = uvm_field_swW0SW0C_NEG_seq::type_id::create(seq_name);
                                    NEG_SwW0s.fld = fields[i];
                                    NEG_SwW0s.model = model;
                                    NEG_SwW0s.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                                "W0C":
                                begin
                                    uvm_field_swW0SW0C_NEG_seq NEG_SwW0c;
                                    string seq_name;
                                    seq_name = {"Not.w0c.",regs[j].get_full_name(), ".", fields[i].get_name()};
                                    config_pkg::uvm_global_current_seq = seq_name;
                                    NEG_SwW0c = uvm_field_swW0SW0C_NEG_seq::type_id::create(seq_name);
                                    NEG_SwW0c.fld = fields[i];
                                    NEG_SwW0c.model = model;
                                    NEG_SwW0c.start(v_seqr.ambaaxi4lite_seqr);
                                    config_pkg::uvm_global_current_seq = "";
                                end
                            endcase
                        end

                    end
                end

                //end

            endcase

        end

        begin
            uvm_reg_block blks[$];
            blk.get_blocks(blks);
            foreach (blks[i])
            begin
                do_block(blks[i]);
            end
        end
    endtask
endclass
