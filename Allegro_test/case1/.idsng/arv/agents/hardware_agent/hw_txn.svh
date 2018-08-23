//////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright 2015 Agnisys Inc. ALL RIGHTS RESERVED
/////////////////////////////////////////////////////////////////////////////////////////////////

class hw_txn extends uvm_sequence_item;
  `uvm_object_utils(hw_txn)
    
  function new(string name="hw_txn");
    super.new(name);
  endfunction
  
  uvm_reg_addr_t address;
  uvm_reg_data_t data;
  uvm_reg_data_t bitenable;
  txn_kind kind;
  
  function void create_txn(uvm_reg_addr_t addr,uvm_reg_data_t data, txn_kind typ);
    this.address = addr;
    this.data = data;
    this.kind = typ;
  endfunction
endclass