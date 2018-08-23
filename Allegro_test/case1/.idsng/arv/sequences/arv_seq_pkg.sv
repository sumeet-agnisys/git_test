
package arv_seq_pkg;
  import uvm_pkg::*;
  import config_pkg::*;
  import ambaaxi4lite_pkg::*;
  import chip_name_regmem_pkg::*;
  `include "uvm_macros.svh"

  task reset_all(uvm_sequence_base seq, uvm_sequencer_base seqr);
    ambaaxi4lite_txn ambaaxi4litetxn;
    ambaaxi4litetxn = ambaaxi4lite_txn::type_id::create("ambaaxi4litetxn");
    seq.set_sequencer(seqr);
    seq.start_item(ambaaxi4litetxn);
    ambaaxi4litetxn.ambaaxi4lite_txn =  ambaaxi4lite_pkg::RESET;
    seq.finish_item(ambaaxi4litetxn);
  endtask

  `include "arv_seq_lib.sv"

endpackage
