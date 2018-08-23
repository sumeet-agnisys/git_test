class chip_name_test extends uvm_test;
  `uvm_component_utils(chip_name_test)

  chip_name_env env;
  chip_name_block modelinst;
  config_object cfg;
  uvm_reg_sequence seq;
  uvm_arv_reset_seq resetseq;
  my_catcher catch = new("catch");

  function new(string name,uvm_component parent);
    super.new(name,parent);
  endfunction

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);

    cfg = config_object::type_id::create("cfg");
    if (!uvm_config_db #(virtual ambaaxi4lite_if)::get(this,"","AMBAAXI4LITE_IF",cfg.ambaaxi4liteif)) begin

      `uvm_fatal("BUILD_PHASE", "cannot get ambaaxi4lite_if from config_db")
    end
    if(!uvm_config_db #(virtual chip_name_hw_if)::get(this,"","chip_name_hif",cfg.chip_name_hif)) begin
      `uvm_fatal("BUILD_PHASE", "cannot get chip_name_hif from config_db")
    end

    uvm_reg::include_coverage("*",UVM_CVR_ALL);
    modelinst = chip_name_block::type_id::create("chip_name");
    modelinst.build();

    cfg.model = modelinst;
    uvm_config_db #(config_object)::set(null,"uvm_test_top*","cfg",cfg);

    env = chip_name_env::type_id::create("env",this);

    resetseq = uvm_arv_reset_seq::type_id::create("resetseq",this);
    resetseq.model = modelinst;
    begin
      string seq_name;
      if ($value$plusargs("UVM_SEQUENCE=%s",seq_name)) begin
        seq = uvm_utils #(uvm_reg_sequence)::create_type_by_name(seq_name,"");
        if (seq == null) begin
          `uvm_fatal("NO_SEQUENCE","This env requires you to specify the sequence to run using UVM_SEQUENCE=seq_name");
        end
      end
    end
    seq.model = modelinst;
  endfunction
  function void end_of_elaboration_phase(uvm_phase phase);
    uvm_report_cb::add(null,catch);
    uvm_top.print_topology();
  endfunction

  task main_phase(uvm_phase phase);
    phase.raise_objection(this);
    resetseq.start(env.v_seqr);
    seq.start(env.v_seqr);
    phase.drop_objection(this);
  endtask

endclass
