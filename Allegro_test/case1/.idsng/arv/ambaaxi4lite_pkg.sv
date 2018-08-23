package ambaaxi4lite_pkg;
  import uvm_pkg::*;
  import chip_name_regmem_pkg::*;
  import config_pkg::*;

  typedef enum {READ,WRITE,RESET,IDLE} ambaaxi4lite_txn_kind;

    `include "uvm_macros.svh"
    `include "agents/ambaaxi4lite_agent/ambaaxi4lite_txn.svh"
    `include "agents/ambaaxi4lite_agent/ambaaxi4lite_driver.svh"
    `include "agents/ambaaxi4lite_agent/ambaaxi4lite_sequencer.svh"
    `include "agents/ambaaxi4lite_agent/reg2ambaaxi4lite_adapter.svh"
    `include "agents/ambaaxi4lite_agent/ambaaxi4lite_agent.svh"
  endpackage
