//////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright 2015 Agnisys Inc. ALL RIGHTS RESERVED
/////////////////////////////////////////////////////////////////////////////////////////////////

class hw_adapter extends uvm_reg_adapter;
  `uvm_object_utils(hw_adapter)
  
  function new(string name = "hw_adapter");
    super.new(name);
  endfunction
  
  virtual function uvm_sequence_item reg2bus(const ref uvm_reg_bus_op rw);
    hw_txn txn = hw_txn::type_id::create("hw_txn");
    
    if (rw.kind == UVM_WRITE)
      begin
        txn.create_txn(rw.addr, rw.data, WRITE);
      end
    else
      begin
        txn.create_txn(rw.addr, rw.data, READ);
      end
    
    return txn;
  endfunction
  
  virtual function void bus2reg(uvm_sequence_item bus_item,ref uvm_reg_bus_op rw);
    hw_txn txn;
    //$info ("bus to reg called");
    if (!$cast(txn,bus_item))
      begin
        `uvm_fatal("not_hw_txn","Provided bus_item is not of the correct type")
        return;
      end
    if (txn.kind == READ)
      rw.kind = UVM_READ;
    else if (txn.kind == WRITE)
      rw.kind = UVM_WRITE;
    else `uvm_fatal("NOT_READ_WRITE_TXN", "Provided bus_item is not a read or write transaction")
    
    rw.addr = txn.address;
    rw.data = txn.data;
    rw.status = UVM_IS_OK;
    
    //$display("-------******------");
    //$info("rw formed is %p",rw);
    //$display("-------******------");
    
  endfunction : bus2reg

endclass
