//////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright 2015 Agnisys Inc. ALL RIGHTS RESERVED
// Version       : 1.1 - VK
//////////////////////////////////////////////////////////////////////////////////////////////////////
`include "../../agni_knobs.sv"    // This file contains the ARV knobs for runnng the arv sequnces.

class uvm_reg_swRW_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_reg_swRW_seq)
  uvm_reg_data_t mask;
  uvm_reg rg; 
  //agni_reg org;
  bit constraintExist;
  
  function new(string name = "uvm_reg_swRW_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t wrdata;
	uvm_reg_block blk;

    int bitwidth = rg.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s * 2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    // if(!$cast(org, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to ////////agni_reg");
      // end
     
    rg.get_maps(maps);
    blk = rg.get_parent();
    // org.set_cov_mask(all1s);
     foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

   `uvm_info("RegModel",{"\n\nTesting Register - '",rg.get_full_name(),"'"},UVM_LOW)
  //The directed testig is turned on only when there is no constraints on a Read Writeable Register
   
  if(!constraintExist)
   begin
    `uvm_info("RegModel", {"Writing directed values and then mirroring with check, through map '", def_map.get_full_name(), "'"}, UVM_LOW)
    foreach(val_arr[i])
      begin
        rg.write(status, val_arr[i] & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      end

    `uvm_info("RegModel", {"Writing 1 hot and 0 hot values, and then mirroring with check, through map '", def_map.get_full_name(), "'"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
      begin
        rg.write(status, (2**i) & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));

        rg.write(status, (all1s-(2**i)) & mask , .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      end
    end

    `uvm_info("RegModel", {"Writing random values and then mirroring, through map '", def_map.get_full_name(), "'"}, UVM_LOW)

    repeat(`reg_swRW_seq)
      begin
	   if(constraintExist)
        begin
        if(blk.randomize()==1)
          begin
            rg.write (status,rg.get() & mask,.path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
            rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
          end
		 end
    else
	     if(rg.randomize()==1)
	       begin
		   wrdata=rg.get();
		    rg.write (status,rg.get() & mask,.path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
            rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
             wrdata = ~wrdata & all1s;
             rg.write (status,wrdata & mask,.path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
             rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
	       end
      end
  
  endtask
endclass

class uvm_reg_swRO_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_reg_swRO_seq)
  uvm_reg_data_t mask;
  uvm_reg rg;
  //agni_reg org;
  bit constraintExist;
  
  function new(string name = "uvm_reg_swRO_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;

    int bitwidth = rg.get_n_bits();
    uvm_reg_data_t data;
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s*2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    // if(!$cast(org, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to ////////agni_reg");
      // end

    rg.get_maps(maps);

   // org.set_cov_mask(all1s);
    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Register - '",rg.get_full_name(),"'"},UVM_LOW)
  // turned off since constraining is not applicable on a RO Register
   if(!constraintExist)
    begin
  
    `uvm_info("RegModel", {"Poking directed values and reading twice to check for value and side effects respectively"}, UVM_LOW)
    foreach(val_arr[i])
      begin
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.poke(status, val_arr[i] & mask, .parent(this));
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this)); // reading again to check for side effects
      end

    `uvm_info("RegModel", {"Poking 1 hot and 0 hot values, and reading twice"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
      begin
        rg.poke(status, (2**i) & mask, .parent(this));
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));

        rg.poke(status, (all1s-(2**i)) & mask, .parent(this));
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      end
	  
    end

    `uvm_info("RegModel", {"Poking Random values and reading twice until 100% coverage is achieved"}, UVM_LOW)
    repeat(`reg_swRO_seq)
      begin
        if(rg.randomize()==1) begin
          data = rg.get();
          rg.poke(status, rg.get() & mask, .parent(this));
          rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
          rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));

          data = ~data & all1s;
          rg.poke(status, data & mask, .parent(this));
          rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
          rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        end
      end
  endtask
endclass

class uvm_reg_swRO_NEG_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_reg_swRO_NEG_seq)
  uvm_reg_data_t mask;
  uvm_reg rg;
  //agni_reg org;
  
  function new(string name = "uvm_reg_swRO_NEG_seq");
    super.new(name);
  endfunction

  task body();

    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;

    int bitwidth = rg.get_n_bits();
    uvm_reg_data_t data;
    uvm_reg_data_t previous;
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s*2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    // if(!$cast(org, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to ////////agni_reg");
      // end

    rg.get_maps(maps);

   // org.set_cov_mask(all1s);

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
         // "hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Register - '",rg.get_full_name(),"'"},UVM_LOW)

    `uvm_info("RegModel", {"Writing directed values and reading to check the value is written or not"}, UVM_LOW)
    foreach(val_arr[i])
      begin
        rg.read(status, previous , .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.write (status, val_arr[i] & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.read(status, data, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if((data & mask) == (previous & mask)) 
          begin
            `uvm_error("RegModel",{"Register '", rg.get_full_name(),"' is Read-Only"});
          end

        rg.read(status, previous , .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        rg.write (status, val_arr[i] & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
        rg.read(status, data, .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        if((data & mask)  == (previous & mask))
          begin
            `uvm_error("RegModel",{"Register '", rg.get_full_name(),"' is Read-Only"});
          end
      end

    `uvm_info("RegModel", {"Writing 1 hot and 0 hot values, and reading to check the value is written or not"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
      begin
        rg.read(status, previous , .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.write (status, (2**i) & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.read(status, data , .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if((data & mask) == (previous & mask))
          begin
            `uvm_error("RegModel",{"Register '", rg.get_full_name(),"' is Read-Only"});
          end

        rg.read(status, previous , .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        rg.write (status, (all1s-(2**i)) & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.read(status, data , .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        if((data & mask) == (previous & mask)) 
          begin
            `uvm_error("RegModel",{"Register '", rg.get_full_name(),"' is Read-Only"});
          end
      end

  endtask
endclass

class uvm_reg_swWO_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_reg_swWO_seq)
  uvm_reg_data_t mask;
  uvm_reg rg;
  //agni_reg org;
  bit constraintExist;
  
  function new(string name="uvm_reg_swWO_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t current,wrdata;

    int bitwidth = rg.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s*2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    // if(!$cast(org, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to ////////agni_reg");
      // end

    rg.get_maps(maps);

    //org.set_cov_mask(all1s);
    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Register - '",rg.get_full_name(),"'"},UVM_LOW)
	
  //The directed testig is turned on only when there are no constraints on a Writeable Register
   if(!constraintExist)
   begin
    `uvm_info("RegModel", {"Writing directed values to the register through map ", def_map.get_full_name() ," and peeking to see if correctly written "}, UVM_LOW)
   
    foreach(val_arr[i])
      begin
        rg.write (status, val_arr[i] & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.peek(status, current , .parent(this));
        if ((current & mask) != rg.get_mirrored_value())
          begin
            `uvm_error("RegModel", {"Couldn't write value ", $sformatf("%h",val_arr[i])," to register '", rg.get_full_name(),"' through map '", def_map.get_full_name()});
          end
      end

    `uvm_info("RegModel", {"writing 1 hot and 0 hot values through map '", def_map.get_full_name(), " and peeking to see if correctly writtten "}, UVM_LOW)

    for(int i=0; i<bitwidth; i++)
      begin
        rg.write (status, (2**i) & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.peek(status, current, .parent(this));
        if ((current & mask) != rg.get_mirrored_value())
          begin
            `uvm_error("RegModel", {"Couldn't write value ", $sformatf("%h",2**i)," to register '", rg.get_full_name(),"' through map '", def_map.get_full_name()});
          end

        rg.write (status, (all1s-(2**i)) & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.peek(status, current, .parent(this));
        if ((current & mask) != rg.get_mirrored_value())
          begin
            `uvm_error("RegModel", {"Couldn't write value ", $sformatf("%h",all1s-(2**i))," to register '", rg.get_full_name(),"' through map '", def_map.get_full_name()});
          end
      end
  end
    `uvm_info("RegModel", {"Writing random values and peeking"}, UVM_LOW)

    repeat(`reg_swWO_seq)
      begin
        if(rg.randomize()==1) 
		 begin
          wrdata = rg.get();
          rg.write (status, wrdata & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
          rg.peek(status, current, .parent(this));
          if ((current & mask) != rg.get_mirrored_value())
            begin
              `uvm_error("RegModel", {"Couldn't write value ", $sformatf("%h",wrdata)," to register '", rg.get_full_name(),"' through map '", def_map.get_full_name()});
            end
          // Turned off ~wrdata(which is again a directed case) for constrained register		  
		  if(!constraintExist)
              begin
                wrdata = ~wrdata & all1s;
                rg.write (status, wrdata & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
                rg.peek(status, current, .parent(this));
                if ((current & mask) != rg.get_mirrored_value())
                   begin
                     `uvm_error("RegModel", {"Couldn't write value ", $sformatf("%h",wrdata)," to register '", rg.get_full_name(),"' through map '", def_map.get_full_name()})
                  end
               end
		  end
      end

  endtask

endclass

class uvm_reg_swWO_NEG_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_reg_swWO_NEG_seq)
  uvm_reg_data_t mask;
  uvm_reg rg;
  //agni_reg org;

  function new(string name = "uvm_reg_swWO_NEG_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t previous, current;

    int bitwidth = rg.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s*2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

   /*  if(!$cast(org, rg))
      begin
        `uvm_error("RegModel","cannot cast an object of type uvm_reg to ////////agni_reg");
      end
 */
    rg.get_maps(maps);

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
         // "hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Register - '",rg.get_full_name(),"'"},UVM_LOW)

    `uvm_info("RegModel", {"Writing directed values to the register through map ", def_map.get_full_name() ," and Reading to check that the value is read from write-only register"}, UVM_LOW)

    foreach(val_arr[i])
      begin
        rg.write (status, val_arr[i] & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.peek(status, current, .parent(this));
        rg.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if ((previous  & mask) != (current & mask)) begin
          `uvm_error("RegModel", {"Not possible to read from Write-Only register ", rg.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
        end

        rg.write (status, val_arr[i] & mask, .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        rg.peek(status, current, .parent(this));
        rg.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if ((previous & mask) != (current & mask)) begin
          `uvm_error("RegModel", {"Not possible to read from Write-Only register ", rg.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
        end
      end

    `uvm_info("RegModel", {"writing 1 hot and 0 hot values through map '", def_map.get_full_name(), " and Reading to check that the value is read from write-only register "}, UVM_LOW)

    for(int i=0; i<bitwidth; i++)
      begin
        rg.write (status, (2**i) & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.peek(status, current, .parent(this));
        rg.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if ((previous & mask) != (current & mask)) begin
          `uvm_error("RegModel", {"Not possible to read from Write-Only register ", rg.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
        end

        rg.write (status, (all1s-(2**i)) & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.peek(status, current, .parent(this));
        rg.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if ((previous & mask) != (current & mask)) begin
          `uvm_error("RegModel", {"Not possible to read from Write-Only register ", rg.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
        end
      end

  endtask

endclass


//Sequences for field verification

class uvm_field_swRW_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swRW_seq)
 
  uvm_reg_field fld;
  uvm_reg rg;
  //agni_reg prg; 
  //uvm_reg_field pfld;

  function new(string name = "uvm_field_swRW_seq");
    super.new(name);
  endfunction

  task body;
    uvm_reg_map maps[$];
    uvm_status_e status;
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_reg_data_t wrdata;
    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s * 2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};
    rg = fld.get_parent();
    rg.get_maps(maps);
       // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end

    // pfld.set_is_acc_bit(1);

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Field - '",fld.get_full_name(),"'"},UVM_LOW)
  //The directed testig is turned on only when there are no constraints on a Read Writeable Field

    `uvm_info("RegModel", {"Writing directed values and mirroring with check thorugh map '", def_map.get_full_name(), "'"}, UVM_LOW)
    foreach(val_arr[i])
      begin
        fld.write(status, val_arr[i], .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      end
    `uvm_info("RegModel", {"Writing 1 hot and 0 hot values, and mirroring with check through map '", def_map.get_full_name(), "'"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
      begin
        fld.write(status, 2**i, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));

        fld.write(status, all1s-(2**i) , .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      end
    `uvm_info("RegModel", {"Writing random values and then mirroring, through map '", def_map.get_full_name(), "'"}, UVM_LOW)
   
    repeat(`field_swRW_seq)
      begin
	     if(fld.randomize()==1) 
	       begin
		     wrdata=fld.value;
             fld.write (status,wrdata,.path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
			`uvm_info("RegModel", {"Wrote field via ",def_map.get_full_name(), ": ", fld.get_full_name(),"  ", $sformatf("%h",fld.get())}, UVM_LOW);
             fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
             wrdata = ~wrdata & all1s;
             fld.write (status,wrdata,.path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
			 `uvm_info("RegModel", {"Wrote field via ",def_map.get_full_name(), ": ", fld.get_full_name(),"  ", $sformatf("%h",fld.get())}, UVM_LOW);
              fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
	       end
      end 
  
  endtask
endclass

class uvm_field_swRO_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swRO_seq)

  uvm_reg_field fld;
  uvm_reg rg;
  //agni_reg prg;
  //uvm_reg_field pfld;

  function new(string name = "uvm_field_swRO_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    bit rmode;

    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s*2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    rg = fld.get_parent();
    rg.get_maps(maps);

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end

    // pfld.set_is_acc_bit(1);

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
         // "hw_map"      : hw_map  = maps[j];
        endcase
      end
 
     rmode = fld.value.rand_mode();
     fld.value.rand_mode(1);

    `uvm_info("RegModel",{"\n\nTesting Field - '",fld.get_full_name(),"'"},UVM_LOW)
  
    `uvm_info("RegModel", {"Poking directed values and reading twice to check for value and side effects respectively"}, UVM_LOW)
  // turned off since constraining is not applicable on a RO Field
  //if(!pfld.constraintExist)
   // begin
    foreach(val_arr[i])
      begin
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.poke(status, val_arr[i], .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this)); // reading again to check for side effects
      end

    `uvm_info("RegModel", {"Poking 1 hot and 0 hot values, and reading twice to check for value and side effects respectively"}, UVM_LOW)

    for(int i=0; i<bitwidth; i++)
      begin
        fld.poke(status, 2**i, .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));

        fld.poke(status, all1s-(2**i), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      end
  //end
    `uvm_info("RegModel", {"Poking random values, and reading twice to check for value and side effects respectively"}, UVM_LOW)
    repeat(`field_swRO_seq)
      begin
        if(fld.randomize == 1)
          begin
            fld.poke(status, fld.get(), .parent(this));
            fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
          end
      end
    fld.value.rand_mode(rmode);
  endtask
endclass

class uvm_field_swRO_NEG_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swRO_NEG_seq)

  uvm_reg_field fld;
  uvm_reg rg;
  //agni_reg prg;
  //uvm_reg_field pfld;

  function new(string name = "uvm_field_swRO_NEG_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;

    int bitwidth = fld.get_n_bits();
    uvm_reg_data_t data;
    uvm_reg_data_t previous;
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s*2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    rg = fld.get_parent();
    rg.get_maps(maps);

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end

    // pfld.set_is_acc_bit(1); 

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Field - '",fld.get_full_name(),"'"},UVM_LOW)
 
    `uvm_info("RegModel", {"Writing directed values and reading to check the value is written or not"}, UVM_LOW)
    foreach(val_arr[i])
      begin
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.write (status, val_arr[i], .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.read(status, data, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if(data == previous) 
          begin
            `uvm_error("RegModel",{"Field '", fld.get_full_name(),"' is Read-Only"});
          end

        fld.read(status, previous, .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        fld.write (status, val_arr[i], .path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
        fld.read(status, data, .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        if(data == previous)
          begin
            `uvm_error("RegModel",{"Field '", fld.get_full_name(),"' is Read-Only"});
          end
      end

    `uvm_info("RegModel", {"Writing 1 hot and 0 hot values, and reading to check the value is written or not"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
      begin
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.write (status, 2**i, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.read(status, data, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if(data == previous)
          begin
            `uvm_error("RegModel",{"Field '", fld.get_full_name(),"' is Read-Only"});
          end

        fld.read(status, previous, .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        fld.write (status, all1s-(2**i), .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.read(status, data, .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        if(data == previous) 
          begin
            `uvm_error("RegModel",{"Field '", fld.get_full_name(),"' is Read-Only"});
          end
      end

  endtask
endclass

class uvm_field_swROhwRONA_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swROhwRONA_seq)

  uvm_reg_field fld;
  uvm_reg rg;
  //agni_reg prg;
  //uvm_reg_field pfld;

  function new(string name = "uvm_field_swROhwRONA_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
	

    rg = fld.get_parent();
    rg.get_maps(maps);
	

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end
 
    // pfld.set_is_acc_bit(1);

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
         // "hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Field - '",fld.get_full_name(),"'"},UVM_LOW)
	
	fld.poke(status,all1s, .parent(this));

    fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
    fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this)); // reading again to check for side effects
  endtask
endclass

class uvm_field_swROhwRONA_NEG_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swROhwRONA_NEG_seq)

  uvm_reg_field fld; 
  uvm_reg rg; 
  //agni_reg prg;
  //uvm_reg_field pfld;

  function new(string name = "uvm_field_swROhwRONA_NEG_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t previous, data;
    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;

    rg = fld.get_parent();
    rg.get_maps(maps);

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end 

    // pfld.set_is_acc_bit(1);

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Field - '",fld.get_full_name(),"'"},UVM_LOW)

    `uvm_info("RegModel", {"Writing 1 hot and 0 hot values, and reading to check the value is written or not"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
      begin
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.write (status, 2**i, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.read(status, data, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if(data == previous)
          begin
            `uvm_error("RegModel",{"Field '", fld.get_full_name(),"' is Read-Only"});
          end

        fld.read(status, previous, .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        fld.write (status, all1s-(2**i), .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.read(status, data, .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        if(data == previous) 
          begin
            `uvm_error("RegModel",{"Field '", fld.get_full_name(),"' is Read-Only"});
          end
      end
  endtask
endclass

class uvm_field_swWwtSE_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swWwtSE_seq)

  uvm_reg_field fld;
  uvm_reg rg;
  //agni_reg prg;
  //uvm_reg_field pfld;

  function new(string name="uvm_field_swWwtSE_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t rdata;
    bit rmode;

    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s * 2 ;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    rg = fld.get_parent();
    rg.get_maps(maps);

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end

    // pfld.set_is_acc_bit(1);

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    rmode = fld.value.rand_mode();
    fld.value.rand_mode(1);

    `uvm_info("RegModel",{"\n\nTesting Field - '",fld.get_full_name(),"'"},UVM_LOW)
 
    `uvm_info("RegModel", {"Poking directed values and mirroring with check on twice to verify the clearing function"}, UVM_LOW)
    foreach(val_arr[i])
      begin
        fld.write(status, val_arr[i], .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
	    `uvm_info("RegModel", {"Wrote field via ",def_map.get_full_name(), ": ", fld.get_full_name(),"  ", $sformatf("%h",val_arr[i])}, UVM_LOW);
		`uvm_info("RegModel", {"Read twice field via ",def_map.get_full_name(), ": ", fld.get_full_name(),"  ", $sformatf("%h",rdata)}, UVM_LOW);
         fld.read(status, rdata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
		 fld.read(status, rdata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
	     //fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
		 //fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));

      end

    `uvm_info("RegModel", {"\nWriting 1 hot and 0 hot values, and mirroring with check on twice"}, UVM_LOW)
     for(int i=0; i<bitwidth; i++)
      begin
        fld.write(status, 2**i, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
	    `uvm_info("RegModel", {"Wrote field via ",def_map.get_full_name(), ": ", fld.get_full_name(),"  ", $sformatf("%h",2**i)}, UVM_LOW);
    
        fld.read(status, rdata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        `uvm_info("RegModel", {"Read twice field via ",def_map.get_full_name(), ": ", fld.get_full_name(),"  ", $sformatf("%h",rdata)}, UVM_LOW);
		fld.read(status, rdata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
   
        fld.write(status, all1s-(2**i) , .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
	    `uvm_info("RegModel", {"Wrote field via ",def_map.get_full_name(), ": ", fld.get_full_name(),"  ", $sformatf("%h",all1s-(2**i))}, UVM_LOW);
	    //fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
   
         fld.read(status, rdata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
		`uvm_info("RegModel", {"Read twice field via ",def_map.get_full_name(), ": ", fld.get_full_name(),"  ", $sformatf("%h",rdata)}, UVM_LOW);
		 fld.read(status, rdata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      end 
 
    `uvm_info("RegModel", {"\nWriting random values, and mirroring with check on twice"}, UVM_LOW)
    repeat(`field_swWwtSE_seq)
      begin
        if(fld.randomize == 1)
          begin
            fld.write(status, fld.get() , .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
		    `uvm_info("RegModel", {"Wrote field via ",def_map.get_full_name(), ": ", fld.get_full_name(),"  ", $sformatf("%h",fld.get())}, UVM_LOW);
           
            fld.read(status, rdata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
		  	`uvm_info("RegModel", {"Read twice field via ",def_map.get_full_name(), ": ", fld.get_full_name(),"  ", $sformatf("%h",rdata)}, UVM_LOW); 
            fld.read(status, rdata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
			end
      end 
    fld.value.rand_mode(rmode);
  endtask
endclass

class uvm_field_swWwtSE_NEG_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swWwtSE_NEG_seq)

  uvm_reg_field fld;
  uvm_reg rg;
  //agni_reg prg;
  //uvm_reg_field pfld;

  function new(string name="uvm_field_swWwtSE_NEG_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t current, previous;
    bit rmode;

    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s * 2 ;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    rg = fld.get_parent();
    rg.get_maps(maps);

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end

    // pfld.set_is_acc_bit(1);

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j])
      begin 
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Field - '",fld.get_full_name(),"'"},UVM_LOW)

    `uvm_info("RegModel", {"Writing directed values to the field through map ", def_map.get_full_name() ," and Reading to check that the value is read from write-only field"}, UVM_LOW)

    foreach(val_arr[i])
      begin
        fld.write (status, val_arr[i], .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if (previous != current) begin
          `uvm_error("RegModel", {"Not possible to read from Write-Only field ", fld.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
        end

        fld.write (status, val_arr[i], .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if (previous != current) begin
          `uvm_error("RegModel", {"Not possible to read from Write-Only field ", fld.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
        end
      end

    `uvm_info("RegModel", {"writing 1 hot and 0 hot values through map '", def_map.get_full_name(), " and Reading to check that the value is read from write-only field "}, UVM_LOW)

    for(int i=0; i<bitwidth; i++)
      begin
        fld.write (status, 2**i, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if (previous != current) begin
          `uvm_error("RegModel", {"Not possible to read from Write-Only field ", fld.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
        end

        fld.write (status, all1s-(2**i), .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if (previous != current) begin
          `uvm_error("RegModel", {"Not possible to read from Write-Only field ", fld.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
        end
      end
  endtask
endclass

class uvm_field_swRWwtSE_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swRWwtSE_seq)

  uvm_reg_field fld;
  uvm_reg rg;
  //agni_reg prg;
  //uvm_reg_field pfld;

  function new(string name="uvm_field_swRWwtSE_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t current;
    bit rmode;

    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s * 2 ;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};
    int wdata;

    rg = fld.get_parent();
    rg.get_maps(maps);

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end
 
    // pfld.set_is_acc_bit(1);

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    rmode = fld.value.rand_mode();
    fld.value.rand_mode(1);

    `uvm_info("RegModel",{"\n\nTesting Field - '",fld.get_full_name(),"'"},UVM_LOW)

    `uvm_info("RegModel", {"Poking directed values and mirroring with check on twice to verify the clearing function"}, UVM_LOW)
    foreach(val_arr[i])
      begin
        if(fld.randomize == 1)
          begin
            fld.poke(status, fld.get(), .parent(this));
            fld.write(status, val_arr[i], .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
			
            fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this)); // the written value must be read
            fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this)); // the written value must be read
          end
      end
 
    `uvm_info("RegModel", {"Poking 1 hot and 0 hot values, and mirroring with check on twice"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
      begin
        if(fld.randomize == 1)
          begin
            fld.poke(status, fld.get(), .parent(this));
            fld.write(status, 2**i, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));

            fld.poke(status, ~fld.get() & all1s, .parent(this));
            fld.write(status, all1s-(2**i) , .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
          end
      end
	   
    fld.value.rand_mode(rmode); 
  endtask
endclass

class uvm_field_swWO_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swWO_seq)

  uvm_reg_field fld;
  uvm_reg rg;
  //agni_reg prg;
  //uvm_reg_field pfld;

  function new(string name="uvm_field_swWO_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t current, wrdata;
    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s*2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    rg = fld.get_parent();
    rg.get_maps(maps);

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end

    // pfld.set_is_acc_bit(1);

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j]) 
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Field - '",fld.get_full_name(),"'"},UVM_LOW)
 //if(!pfld.constraintExist)
 //  begin
    `uvm_info("RegModel", {"Writing directed values to the Field through map ", def_map.get_full_name() ," and peeking to see if correctly written "}, UVM_LOW)

    foreach(val_arr[i])
      begin
        fld.write (status, val_arr[i], .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
	    `uvm_info("RegModel", {"Wrote field via ",def_map.get_full_name(), ": ", fld.get_full_name(),"  ", $sformatf("%h",fld.get())}, UVM_LOW);

        fld.peek(status, current, .parent(this));
        if (current != fld.get_mirrored_value())
          begin
            `uvm_error("RegModel", {"Couldn't write value ", $sformatf("%h",val_arr[i])," to Field '", fld.get_full_name(),"' through map '", def_map.get_full_name()});
          end
      end

    `uvm_info("RegModel", {"writing 1 hot and 0 hot values through map '", def_map.get_full_name(), " and peeking to see if correctly writtten "}, UVM_LOW)

    for(int i=0; i<bitwidth; i++)
      begin
        fld.write (status, 2**i, .path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
        fld.peek(status, current, .parent(this));
        if (current != fld.get_mirrored_value())
          begin
            `uvm_error("RegModel", {"Couldn't write value ", $sformatf("%h",2**i)," to Field '", fld.get_full_name(),"' through map '", def_map.get_full_name()});
          end

        fld.write (status, all1s-(2**i), .path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
        fld.peek(status, current, .parent(this));
        if (current != fld.get_mirrored_value())
          begin
            `uvm_error("RegModel", {"Couldn't write value ", $sformatf("%h",all1s-(2**i))," to Field '", fld.get_full_name(),"' through map '", def_map.get_full_name()});
          end
      end
   // end
    `uvm_info("RegModel", {"Writing random values and then mirroring, through map '", def_map.get_full_name(), "'"}, UVM_LOW)

    repeat(`field_swWO_seq)
      begin
        if(fld.randomize()==1)
          begin
            wrdata=fld.get();
            fld.write (status,fld.get(),.path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
            fld.peek(status, current, .parent(this));
            if (current != fld.get_mirrored_value())
              begin
                `uvm_error("RegModel", {"Couldn't write value ", $sformatf("%h",wrdata)," to Field '", fld.get_full_name(),"' through map '", def_map.get_full_name()});
              end
            // if(!pfld.constraintExist)
             // begin
                // wrdata = ~wrdata & all1s;
                // fld.write (status,wrdata,.path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
                // fld.peek(status, current, .parent(this));
                // if (current != fld.get_mirrored_value())
                    // begin
                      // `uvm_error("RegModel", {"Couldn't write value ", $sformatf("%h",wrdata)," to Field '", fld.get_full_name(),"' through map '", def_map.get_full_name()});
                   // end
			  // end 	 
           end
      end
  endtask
endclass 

class uvm_field_swWO_NEG_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swWO_NEG_seq)

  uvm_reg_field fld;
  uvm_reg rg;
  //agni_reg prg;
  //uvm_reg_field pfld;

  function new(string name = "uvm_field_swWO_NEG_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t previous, current;

    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s*2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    rg = fld.get_parent();
    rg.get_maps(maps);

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end

    // pfld.set_is_acc_bit(1);

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j])
      begin
        case(maps[j].get_name()) 
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting field - '",fld.get_full_name(),"'"},UVM_LOW)

    `uvm_info("RegModel", {"Writing directed values to the field through map ", def_map.get_full_name() ," and Reading to check that the value is read from write-only field"}, UVM_LOW)

    foreach(val_arr[i])
      begin
        fld.write (status, val_arr[i], .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if (previous != current) begin
          `uvm_error("RegModel", {"Not possible to read from Write-Only field ", fld.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
        end

        fld.write (status, val_arr[i], .path(UVM_BACKDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if (previous != current) begin
          `uvm_error("RegModel", {"Not possible to read from Write-Only field ", fld.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
        end
      end

    `uvm_info("RegModel", {"writing 1 hot and 0 hot values through map '", def_map.get_full_name(), " and Reading to check that the value is read from write-only field "}, UVM_LOW)

    for(int i=0; i<bitwidth; i++)
      begin
        fld.write (status, 2**i, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if (previous != current) begin
          `uvm_error("RegModel", {"Not possible to read from Write-Only field ", fld.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
        end

        fld.write (status, all1s-(2**i), .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if (previous != current) begin
          `uvm_error("RegModel", {"Not possible to read from Write-Only field ", fld.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
        end
      end

  endtask
endclass


class uvm_field_swRCRS_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swRCRS_seq)

  uvm_reg_field fld;
  uvm_reg rg;
  //agni_reg prg;
  //uvm_reg_field pfld;
  bit rmode;

  function new(string name = "uvm_field_swRCRS_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;

    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s*2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    rg = fld.get_parent();
    rg.get_maps(maps);

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end

    // pfld.set_is_acc_bit(1); 

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j])
      begin 
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    rmode = fld.value.rand_mode();
    fld.value.rand_mode(1);

    `uvm_info("RegModel",{"\n\nTesting Field - '",fld.get_full_name(),"'"},UVM_LOW)

    `uvm_info("RegModel", {"Poking directed values and mirroring with check on twice to verify the clearing function"}, UVM_LOW)
    foreach(val_arr[i])
      begin
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.poke (status, val_arr[i], .parent(this)) ;
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this)); // the poked value must be read
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this)); // the cleared value must be read
      end

    `uvm_info("RegModel", {"Poking 1 hot and 0 hot values, and mirroring with check on twice"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
      begin            
        fld.poke(status, 2**i, .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));

        fld.poke(status, all1s-(2**i), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      end

    `uvm_info("RegModel", {"Poking randoms values, and mirroring with check on twice"}, UVM_LOW)
    repeat(`field_swRCRS_seq) begin
      if(fld.randomize == 1)
        begin
          fld.poke(status, fld.get(), .parent(this));
          fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
          fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        end
    end
    fld.value.rand_mode(rmode);
  endtask
endclass

class uvm_field_swRCRS_NEG_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swRCRS_NEG_seq)

  uvm_reg_field fld;
  uvm_reg rg;
  //agni_reg prg;
  //uvm_reg_field pfld;

  function new(string name = "uvm_field_swRCRS_NEG_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t previous, data;

    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s*2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    rg = fld.get_parent();
    rg.get_maps(maps);

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end

    // pfld.set_is_acc_bit(1);

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j])
      begin
        case(maps[j].get_name()) 
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Field - '",fld.get_full_name(),"'"},UVM_LOW)

    `uvm_info("RegModel", {"writing directed values and ensure to check the value is written or not"}, UVM_LOW)
    foreach(val_arr[i])
      begin
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.write (status, val_arr[i], .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.read(status, data, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.read(status, data, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if(data == previous) 
          begin
            `uvm_error("RegModel",{"Field '", fld.get_full_name(),"' is Read-Only"});
          end
      end

    `uvm_info("RegModel", {"Writing 1 hot and 0 hot values, and ensure to check the value is written or not"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
      begin
        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.write (status, 2**i, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.read(status, data, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.read(status, data, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if(data == previous) 
          begin
            `uvm_error("RegModel",{"Field '", fld.get_full_name(),"' is Read-Only"});
          end

        fld.read(status, previous, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.write (status, all1s-(2**i), .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.read(status, data, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.read(status, data, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if(data == previous) 
          begin
            `uvm_error("RegModel",{"Field '", fld.get_full_name(),"' is Read-Only"});
          end
      end
  endtask
endclass

class uvm_field_swWCWS_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swWCWS_seq)

  uvm_reg_field fld;
  uvm_field_swWwtSE_seq wse_seq;

  function new(string name = "uvm_field_swWCWS_seq");
    super.new(name);
  endfunction

  task body();
    wse_seq = uvm_field_swWwtSE_seq::type_id::create("wse_seq");
    wse_seq.fld = fld;
    wse_seq.start(this.get_sequencer());
  endtask
endclass

class uvm_field_swWCWS_NEG_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swWCWS_NEG_seq)

  uvm_reg_field fld;
  uvm_field_swWwtSE_NEG_seq wse_NEG_seq;

  function new(string name = "uvm_field_swWCWS_NEG_seq");
    super.new(name);
  endfunction

  task body();
    wse_NEG_seq = uvm_field_swWwtSE_NEG_seq::type_id::create("wse_NEG_seq");
    wse_NEG_seq.fld = fld;
    wse_NEG_seq.start(this.get_sequencer());
  endtask
endclass

class uvm_field_swW1SW1C_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swW1SW1C_seq)

  uvm_reg_field fld;
  uvm_field_swWwtSE_seq wse_seq;

  function new(string name = "uvm_field_swWCWS_seq");
    super.new(name);
  endfunction

  task body();
    wse_seq = uvm_field_swWwtSE_seq::type_id::create("wse_seq");
    wse_seq.fld = fld;
    wse_seq.start(this.get_sequencer());
  endtask
endclass

class uvm_field_swW1SW1C_NEG_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swW1SW1C_NEG_seq)

  uvm_reg_field fld;
  uvm_field_swWwtSE_NEG_seq wse_NEG_seq;

  function new(string name = "uvm_field_swW1SW1C_NEG_seq");
    super.new(name);
  endfunction

  task body();
    wse_NEG_seq = uvm_field_swWwtSE_NEG_seq::type_id::create("wse_NEG_seq");
    wse_NEG_seq.fld = fld;
    wse_NEG_seq.start(this.get_sequencer());
  endtask
endclass


class uvm_field_swW1TW0T_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swW1TW0T_seq)

  uvm_reg_field fld;
  uvm_field_swWwtSE_seq wse_seq;

  function new(string name="uvm_field_swW1TW0T_seq");
    super.new(name);
  endfunction

  task body();
    wse_seq = uvm_field_swWwtSE_seq::type_id::create("wse_seq");
    wse_seq.fld = fld;
    wse_seq.start(this.get_sequencer());
  endtask
endclass

class uvm_field_swW1TW0T_NEG_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swW1TW0T_NEG_seq)

  uvm_reg_field fld;
  uvm_field_swWwtSE_NEG_seq wse_NEG_seq;

  function new(string name="uvm_field_swW1TW0T_NEG_seq");
    super.new(name);
  endfunction

  task body();
    wse_NEG_seq = uvm_field_swWwtSE_NEG_seq::type_id::create("wse_NEG_seq");
    wse_NEG_seq.fld = fld;
    wse_NEG_seq.start(this.get_sequencer());
  endtask
endclass

class uvm_field_swW0SW0C_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swW0SW0C_seq)

  uvm_reg_field fld;
  uvm_field_swWwtSE_seq wse_seq;

  function new(string name = "uvm_field_swW0SW0C_seq");
    super.new(name);
  endfunction

  task body();
    wse_seq = uvm_field_swWwtSE_seq::type_id::create("wse_seq");
    wse_seq.fld = fld;
    wse_seq.start(this.get_sequencer());
  endtask
endclass

class uvm_field_swW0SW0C_NEG_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swW0SW0C_NEG_seq)

  uvm_reg_field fld;
  uvm_field_swWwtSE_NEG_seq wse_NEG_seq;

  function new(string name = "uvm_field_swW0SW0C_NEG_seq");
    super.new(name);
  endfunction

  task body();
    wse_NEG_seq = uvm_field_swWwtSE_NEG_seq::type_id::create("wse_NEG_seq");
    wse_NEG_seq.fld = fld;
    wse_NEG_seq.start(this.get_sequencer());
  endtask
endclass

class uvm_field_swWRCWRS_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swWRCWRS_seq)

  uvm_reg_field fld;
  uvm_reg rg;
  //agni_reg prg;
  //uvm_reg_field pfld;

  function new(string name = "uvm_field_swWRCWRS_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    bit rmode;

    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s * 2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    rg = fld.get_parent();
    rg.get_maps(maps);

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end

    // pfld.set_is_acc_bit(1);

    // prg.set_cov_mask(all1s << fld.get_lsb_pos()); 

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    rmode = fld.value.rand_mode();
    fld.value.rand_mode(1);

    `uvm_info("RegModel",{"\n\nTesting Field - '",fld.get_full_name(),"'"},UVM_LOW)

    `uvm_info("RegModel", {"Writing directed values and mirroring with check on twice to verify the clearing function"}, UVM_LOW)
    foreach(val_arr[i])
      begin
        fld.write(status, val_arr[i], .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this)); // the written value must be read
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this)); // the cleared value must be read
      end

    `uvm_info("RegModel", {"Writing 1 hot and 0 hot values, and mirroring with check on twice"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
      begin
        fld.write(status, 2**i, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));

        fld.write(status, all1s-(2**i) , .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      end

    `uvm_info("RegModel", {"Writing random values, and mirroring with check on twice"}, UVM_LOW)
    repeat(`field_swWRCWRS_seq)
      begin
        if(fld.randomize() == 1)
          begin
            fld.write(status, fld.get(), .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
          end
      end
    fld.value.rand_mode(rmode);
  endtask
endclass

class uvm_field_swWSRCWCRS_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swWSRCWCRS_seq)

  uvm_reg_field fld;
  uvm_reg rg; 
  //agni_reg prg;
  //uvm_reg_field pfld;

  function new(string name="uvm_field_swWSRCWCRS_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t current, data;
    bit rmode;

    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s*2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    rg = fld.get_parent();
    rg.get_maps(maps);

    // if(!$cast(prg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(pfld, fld))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to uvm_reg_field");
      // end

    // pfld.set_is_acc_bit(1);

    // prg.set_cov_mask(all1s << fld.get_lsb_pos());

    foreach(maps[j]) 
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    rmode = fld.value.rand_mode();
    fld.value.rand_mode(1);

    `uvm_info("RegModel",{"\n\nTesting Register - '",fld.get_full_name(),"'"},UVM_LOW)

    `uvm_info("RegModel", {"Writing directed values to the register through map ", def_map.get_full_name() ," and peeking to see if correctly written "}, UVM_LOW)

    foreach(val_arr[i])
      begin
        fld.write (status, val_arr[i], .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      end

    `uvm_info("RegModel", {"writing 1 hot and 0 hot values through map '", def_map.get_full_name(), " and peeking to see if correctly writtten "}, UVM_LOW)

    for(int i=0; i<bitwidth; i++)
      begin
        fld.write (status, 2**i, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));

        fld.write (status, all1s-(2**i), .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        fld.peek(status, current, .parent(this));
        fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      end

    repeat(`field_swWSRCWCRS_seq)
      begin
        if(fld.randomize == 1)
          begin
            fld.write (status, fld.get(), .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            fld.peek(status, current, .parent(this));
            fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            fld.peek(status, current, .parent(this));
            fld.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
          end 
      end
    fld.value.rand_mode(rmode);
  endtask
endclass

class uvm_field_swW1SRCW1CRS_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swW1SRCW1CRS_seq)

  uvm_reg_field fld;
  uvm_field_swWSRCWCRS_seq wse_seq;

  function new(string name="uvm_field_swW1SRCW1CRS_seq");
    super.new(name);
  endfunction

  task body();
    wse_seq = uvm_field_swWSRCWCRS_seq::type_id::create("wse_seq");
    wse_seq.fld = fld;
    wse_seq.start(this.get_sequencer());
  endtask
endclass

class uvm_field_swW0SRCW0CRS_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_field_swW0SRCW0CRS_seq)

  uvm_reg_field fld;
  uvm_field_swWSRCWCRS_seq wse_seq;

  function new(string name="uvm_field_swW0SRCW0CRS_seq");
    super.new(name);
  endfunction

  task body();
    wse_seq = uvm_field_swWSRCWCRS_seq::type_id::create("wse_seq");
    wse_seq.fld = fld;
    wse_seq.start(this.get_sequencer());
  endtask
endclass

//sequences for verifying Locked Registers

class uvm_pos_lock_pos_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_pos_lock_pos_seq)

  uvm_reg rg;
 // agni_reg prot_reg;
  uvm_reg_field lock;
  uvm_reg_swRW_seq rwseq;
  uvm_reg_swRO_seq roseq;

  function new(string name="uvm_pos_lock_pos_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e stat;
    uvm_reg_data_t data;
    int bitwidth;
    int prot_reg_bitwidth; 
    int unsigned all1s = 2**prot_reg_bitwidth - 1;

    rg.get_maps(maps);

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

   // if(!$cast(prot_reg,rg))
    //  begin
      //  `uvm_error("RegModel","Cannot cast object 'rg' of type uvm_reg to agni_reg");
     // end
   // prot_reg_bitwidth = prot_reg.get_n_bits();
   prot_reg_bitwidth = rg.get_n_bits();  
    //prot_reg.set_cov_mask(all1s);

    bitwidth = lock.get_n_bits();
    rg.read(stat,data, .path(UVM_FRONTDOOR),.map(def_map),.parent(this));

    `uvm_info("pos_lock_pos_test", {"writing/reading register '", rg.get_full_name(),"' while unlocked through map '", def_map.get_full_name(), "' ..."}, UVM_LOW)

    lock.poke(stat,'b0);
    rwseq = uvm_reg_swRW_seq::type_id::create("rwseq");
    //rwseq.rg = prot_reg;
	rwseq.rg = rg; 
    rwseq.start(this.get_sequencer());
  
    `uvm_info("pos_lock_pos_test", {"reading register '", rg.get_full_name(),"' while locked through map '", def_map.get_full_name(), "' ..."}, UVM_LOW)

    lock.poke(stat,2**bitwidth -1);
    roseq = uvm_reg_swRO_seq::type_id::create("roseq");
    //roseq.rg = prot_reg;
	roseq.rg = rg;  
    roseq.start(this.get_sequencer());
  endtask
endclass

class uvm_pos_lock_neg_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_pos_lock_neg_seq)
  uvm_reg rg;
 // agni_reg prot_reg;
  uvm_reg_field lock;
  uvm_reg_swWO_seq woseq;

  function new(string name="uvm_pos_lock_neg_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e stat;
    uvm_reg_data_t peek_data, read_data;
    int bitwidth;
    //int prot_reg_bitwidth = prot_reg.get_n_bits();
	int prot_reg_bitwidth = rg.get_n_bits();  
    int unsigned all1s = 2**prot_reg_bitwidth - 1;

    //prot_reg.get_maps(maps);
     rg.get_maps(maps); 
    //prot_reg.set_cov_mask(all1s);

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("pos_lock_neg_test", {"writing/peeking register'", rg.get_full_name(),"' while locked through map '", def_map.get_full_name(), "' ..."}, UVM_LOW)
 
    bitwidth = lock.get_n_bits();
    rg.read(stat,read_data, .path(UVM_FRONTDOOR),.map(def_map),.parent(this));

    lock.poke(stat,'b1);
    woseq = uvm_reg_swWO_seq::type_id::create("woseq");
    //woseq.rg = prot_reg;
	woseq.rg = rg;  
    woseq.start(this.get_sequencer());
  endtask
endclass

class uvm_neg_lock_pos_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_neg_lock_pos_seq)

  uvm_reg rg;
  //agni_reg prot_reg;
  uvm_reg_field lock;
  uvm_reg_swRW_seq rwseq;
  uvm_reg_swRO_seq roseq;

  function new(string name="uvm_neg_lock_pos_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e stat;
    uvm_reg_data_t data;
    int bitwidth;
    int prot_reg_bitwidth;
    int unsigned all1s = 2**prot_reg_bitwidth - 1;

    rg.get_maps(maps);

   // prot_reg.set_cov_mask(all1s);

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

   // if(!$cast(prot_reg,rg))
    //  begin
    //    `uvm_error("RegModel","Cannot cast object 'rg' of type uvm_reg to agni_reg");
    //  end
    prot_reg_bitwidth = rg.get_n_bits();
    bitwidth = lock.get_n_bits();
    rg.read(stat,data, .path(UVM_FRONTDOOR),.map(def_map),.parent(this));

    `uvm_info("neg_lock_pos_test", {"writing/reading register '", rg.get_full_name(),"' while unlocked through map '", def_map.get_full_name(), "' ..."}, UVM_LOW)

    lock.poke(stat,2**bitwidth -1);
    rwseq = uvm_reg_swRW_seq::type_id::create("rwseq");
    rwseq.rg = rg;
    rwseq.start(this.get_sequencer());

    `uvm_info("neg_lock_pos_test", {"reading register '", rg.get_full_name(),"' while locked through map '", def_map.get_full_name(), "' ..."}, UVM_LOW)

    lock.poke(stat,'b0);  
    roseq = uvm_reg_swRO_seq::type_id::create("roseq");
    roseq.rg = rg;
    roseq.start(this.get_sequencer()); 
  endtask
endclass

class uvm_neg_lock_neg_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_neg_lock_neg_seq)
  uvm_reg rg;
 // agni_reg prot_reg;
  uvm_reg_field lock;
  uvm_reg_swWO_seq woseq;

  function new(string name="uvm_neg_lock_neg_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e stat;
    uvm_reg_data_t read_data;
    int bitwidth;
    int prot_reg_bitwidth = rg.get_n_bits();
    int unsigned all1s = 2**prot_reg_bitwidth - 1;

    rg.get_maps(maps);

    //prot_reg.set_cov_mask(all1s);

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("neg_lock_neg_test", {"writing/peeking register '", rg.get_full_name(),"' while locked through map '", def_map.get_full_name(), "' ..."}, UVM_LOW)

    bitwidth = lock.get_n_bits();
    rg.read(stat,read_data, .path(UVM_FRONTDOOR),.map(def_map),.parent(this));

    lock.poke(stat,'b0);
    woseq = uvm_reg_swWO_seq::type_id::create("woseq");
    woseq.rg = rg;  
    woseq.start(this.get_sequencer());
  endtask
endclass

//sequences for varifying shadow registers

class shadow_reg_seq extends uvm_reg_sequence;
  `uvm_object_utils(shadow_reg_seq)
  uvm_reg_data_t mask;
  uvm_reg rg;
  //agni_reg Oreg;
  uvm_reg Sregs[$];
  //agni_reg Sregs_agni[$];

  function new(string name="shadow_reg_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;  
    uvm_status_e status;
    uvm_reg_data_t wrdata;
    uvm_reg_data_t current,data,data1;

    int bitwidth = rg.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = ~alt10s;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

  //  if(!$cast(Oreg, rg))
  //    begin
   //     `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
  //    end

    //foreach(Sregs[x]) 
  //    begin
      //  if(!$cast(Sregs_agni[x], Sregs[x]))
        //  begin
     //       `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
      //    end
     // end

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    //Oreg.set_cov_mask(all1s);

    `uvm_info("RegModel",{"\n\nTesting Register - '",rg.get_full_name(),"'"},UVM_LOW) 

    `uvm_info("RegModel", {"Writing directed values and then read through default map '", "'"}, UVM_LOW)
    foreach(val_arr[i])
      begin 
        rg.write(status, val_arr[i] & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        foreach(Sregs[x])
          begin
            int shadow_bitwidth = Sregs[x].get_n_bits();
            int unsigned shadow_all1s = 2**shadow_bitwidth - 1;
           // Sregs_agni[x].set_cov_mask(shadow_all1s);
           // Sregs_agni[x].mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
			Sregs[x].mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
          end 
      end

    `uvm_info("RegModel", {"Writing 1 hot and 0 hot values, and then reading through default map", "'"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
      begin 
        rg.write(status, (2**i & mask), .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        foreach(Sregs[x])
          begin
            int shadow_bitwidth = Sregs[x].get_n_bits(); 
            int unsigned shadow_all1s = 2**shadow_bitwidth - 1;
          //  Sregs_agni[x].set_cov_mask(shadow_all1s);
            Sregs[x].mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
          end 

       // Oreg.write(status, all1s-(2**i) , .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
       // Oreg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
	    rg.write(status, (all1s-(2**i)) & mask , .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        foreach(Sregs[x])
          begin
            int shadow_bitwidth = Sregs[x].get_n_bits();
            int unsigned shadow_all1s = 2**shadow_bitwidth - 1;
            //Sregs_agni[x].set_cov_mask(shadow_all1s);
            Sregs[x].mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
          end
      end


    `uvm_info("RegModel", {"Writing random values and then reading until 100% coverage is achieved, through default map '", "'"}, UVM_LOW)

    repeat(`shadow_reg_seq)
      begin
        if(rg.randomize()==1) 
          begin
            wrdata=rg.get();
            rg.write (status, (wrdata & mask),.path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
            rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            foreach(Sregs[x])
              begin
                int shadow_bitwidth = Sregs[x].get_n_bits();
                int unsigned shadow_all1s = 2**shadow_bitwidth - 1;
                //Sregs_agni[x].set_cov_mask(shadow_all1s);
                Sregs[x].mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
              end

            wrdata = ~wrdata & all1s;
            rg.write (status, (wrdata & mask),.path(UVM_FRONTDOOR), .map(def_map), .parent(this)) ;
            rg.mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            foreach(Sregs[x])
              begin
                int shadow_bitwidth = Sregs[x].get_n_bits();
                int unsigned shadow_all1s = 2**shadow_bitwidth - 1;
                //Sregs_agni[x].set_cov_mask(shadow_all1s);
                Sregs[x].mirror(status, UVM_CHECK, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
              end  
          end
      end
  endtask
endclass

class shadow_reg_NEG_seq extends uvm_reg_sequence;
    `uvm_object_utils(shadow_reg_NEG_seq)
    uvm_reg_data_t mask;
    uvm_reg rg;
    //agni_reg Oreg;
    uvm_reg Sregs[$];
   // agni_reg Sregs_agni[$];


    function new(string name="shadow_reg_NEG_seq");
        super.new(name);
    endfunction

    task body();
        uvm_reg_map maps[$];
        uvm_reg_map def_map;
        uvm_reg_map hw_map;
        uvm_status_e status;
        uvm_reg_data_t wrdata;
        uvm_reg_data_t current,current_shadow;
         uvm_reg_swWO_NEG_seq NEG_SwWo;
        int bitwidth = rg.get_n_bits();
        int unsigned all1s = 2**bitwidth - 1;
        int unsigned alt10s = all1s/3;
        int unsigned alt01s = ~alt10s;
        int unsigned alt_db10s = (all1s/15) * 6;
        int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

        //if(!$cast(Oreg, rg))
           // begin
         //       `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
         //   end

        //foreach(Sregs[x])
          //  begin
           //     if(!$cast(Sregs_agni[x], Sregs[x]))
            //        begin
             //           `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
              //      end
          //  end

        foreach(maps[j])
            begin
                case(maps[j].get_name())
                    default : def_map = maps[j];
                    //"hw_map"      : hw_map  = maps[j];
                endcase
            end

        //rg.set_cov_mask(all1s);

        `uvm_info("RegModel",{"\n\nTesting Register - '",rg.get_full_name(),"'"},UVM_LOW)
         NEG_SwWo = uvm_reg_swWO_NEG_seq::type_id::create("NEG_SwWo");
         NEG_SwWo.rg = rg;
         NEG_SwWo.start(this.get_sequencer());
        `uvm_info("RegModel", {"Writing directed values in Registers and reading from it's shadow"}, UVM_LOW)
		foreach(val_arr[i])
         begin   
         rg.write (status, val_arr[i] & mask,.path(UVM_FRONTDOOR), .map(def_map), .parent(this));
		 rg.read (status, current,.path(UVM_FRONTDOOR), .map(def_map), .parent(this));
         foreach(Sregs[x])
          begin
            int shadow_bitwidth = Sregs[x].get_n_bits();
            int unsigned shadow_all1s = 2**shadow_bitwidth - 1;
           // Sregs_agni[x].set_cov_mask(shadow_all1s);
			Sregs[x].read(status, current_shadow, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
			if((current & mask) == (current_shadow & mask))  
				`uvm_error("RegModel", {"Value of Register:: ",rg.get_full_name()," and it's shadow:: ", Sregs[x].get_full_name(), " should be equal" });
          end
		 end
	 
	`uvm_info("RegModel", {"Writing 1 hot and 0 hot values to the register and reading from it's shadow"}, UVM_LOW);
    for(int i=0; i<bitwidth; i++)
      begin
	  rg.write (status, (2**i) & mask,.path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      rg.read (status, current,.path(UVM_FRONTDOOR), .map(def_map), .parent(this));
	  foreach(Sregs[x])
          begin
            int shadow_bitwidth = Sregs[x].get_n_bits(); 
            int unsigned shadow_all1s = 2**shadow_bitwidth - 1;
           // Sregs_agni[x].set_cov_mask(shadow_all1s);
			Sregs[x].read(status, current_shadow, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
			if((current & mask) == (current_shadow & mask)) 
				`uvm_error("RegModel", {"Value of Register:: ",rg.get_full_name()," and it's shadow:: ", Sregs[x].get_full_name() ," should be equal" });
          end    
	  rg.write (status, (all1s-(2**i)) & mask,.path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      rg.read (status, current,.path(UVM_FRONTDOOR), .map(def_map), .parent(this));
	  foreach(Sregs[x])
          begin
            int shadow_bitwidth = Sregs[x].get_n_bits();
            int unsigned shadow_all1s = 2**shadow_bitwidth - 1;
            //Sregs_agni[x].set_cov_mask(shadow_all1s);  
			Sregs[x].read(status, current_shadow, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));  
			if((current & mask) == (current_shadow & mask)) 
				`uvm_error("RegModel", {"Value of Register:: ",rg.get_full_name()," and it's shadow:: ", Sregs[x].get_full_name() ," should be equal" });
          end
	  end
   endtask
endclass

//sequences for varifying alias registers

class Alias_reg_seq extends uvm_reg_sequence;
  `uvm_object_utils(Alias_reg_seq)
  uvm_reg_data_t mask;
  uvm_reg rg;
  //agni_reg Oreg;
  uvm_reg Sregs[$];
  string Sregs_access[$];
  //agni_reg Sregs_agni[$];
   
  function new(string name="Alias_reg_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t wrdata;  
    uvm_reg_data_t current,data,data1;

    int bitwidth = rg.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = ~alt10s;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};
  
    // foreach(Sregs[x])
      // begin
        // if(!$cast(Sregs_agni[x], Sregs[x]))
          // begin
            // `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
          // end
      // end 
	 
	
    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end


     `uvm_info("RegModel",{"\n\nTesting Register level Aliases of the register - '",rg.get_full_name(),"'"},UVM_LOW)

     `uvm_info("RegModel", {"Writing directed values and then read through default map '", "'"}, UVM_LOW)
   
    foreach(val_arr[i])
      begin
        foreach(Sregs[x])
          begin
            int alias_bitwidth = Sregs[x].get_n_bits();
            int unsigned alias_all1s = 2**alias_bitwidth - 1;
            //Sregs_agni[x].set_cov_mask(alias_all1s);
			alias_write(Sregs[x], Sregs_access[x], val_arr[i], def_map);
			foreach(Sregs[y])
			 begin
			  int alias_bitwidth = Sregs[y].get_n_bits();
              int unsigned alias_all1s = 2**alias_bitwidth - 1;
              //Sregs_agni[y].set_cov_mask(alias_all1s);
			  alias_read(Sregs[y],  Sregs_access[y], val_arr[i], def_map);
			end
          end
      end
  
    `uvm_info("RegModel", {"Writing 1 hot and 0 hot values, and then reading through default map", "'"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
      begin
       
		 foreach(Sregs[x])
           begin
             int alias_bitwidth = Sregs[x].get_n_bits();
             int unsigned alias_all1s = 2**alias_bitwidth - 1;
            // Sregs_agni[x].set_cov_mask(alias_all1s);
			 alias_write(Sregs[x], Sregs_access[x], 2**i, def_map);
			 
			 foreach(Sregs[y])
			   begin
			    int alias_bitwidth = Sregs[y].get_n_bits();
                int unsigned alias_all1s = 2**alias_bitwidth - 1;
                //Sregs_agni[y].set_cov_mask(alias_all1s);
			    alias_read(Sregs[y],  Sregs_access[y], 2**i, def_map);
			   end
			   
			 alias_write(Sregs[x], Sregs_access[x], all1s-(2**i), def_map);

			 foreach(Sregs[y])
			   begin
			    int alias_bitwidth = Sregs[y].get_n_bits();
                int unsigned alias_all1s = 2**alias_bitwidth - 1;
                //Sregs_agni[y].set_cov_mask(alias_all1s);
                alias_read(Sregs[y],  Sregs_access[y], all1s-(2**i), def_map);
			   end
           end
      end
     

    `uvm_info("RegModel", {"Writing random values and then reading until 100% coverage is achieved, through default map '", "'"}, UVM_LOW)

    repeat(`alias_reg_seq)
      begin
       
            foreach(Sregs[x])
              begin
			   if (Sregs[x].randomize()==1)
			     begin
                   int alias_bitwidth = Sregs[x].get_n_bits();
                   int unsigned alias_all1s = 2**alias_bitwidth - 1;
				   wrdata=Sregs[x].get();
                  // Sregs_agni[x].set_cov_mask(alias_all1s);
				   alias_write(Sregs[x], Sregs_access[x], wrdata, def_map);
					
			       foreach(Sregs[y])
			         begin
			           int alias_bitwidth = Sregs[y].get_n_bits();
                       int unsigned alias_all1s = 2**alias_bitwidth - 1;
                    //   Sregs_agni[y].set_cov_mask(alias_all1s);
                       alias_read(Sregs[y],  Sregs_access[y], wrdata, def_map);
     		         end

					  wrdata = ~wrdata & all1s;
					  alias_write(Sregs[x], Sregs_access[x], wrdata, def_map);
		 
			       foreach(Sregs[y])
			         begin
					   uvm_reg_data_t current;
			           int alias_bitwidth = Sregs[y].get_n_bits();
                       int unsigned alias_all1s = 2**alias_bitwidth - 1;
                     //  Sregs_agni[y].set_cov_mask(alias_all1s);
                       alias_read(Sregs[y],  Sregs_access[y], wrdata, def_map);
			         end
			    end
              end
		 end
	  
  endtask:body  
  task alias_write(uvm_reg arg, string reg_access, uvm_reg_data_t wrdata, uvm_reg_map map);
  uvm_status_e status;
   
   case(reg_access)
			           "RO": begin
			                  arg.poke(status, wrdata & mask, .parent(this));
			                 end
			           default: begin
			                     arg.write(status, wrdata & mask, UVM_FRONTDOOR, map, this);
			                   end
			          endcase
  
  endtask:alias_write
  
   task alias_read(uvm_reg arg, string reg_access, uvm_reg_data_t wrdata, uvm_reg_map map);
    uvm_status_e status;
    uvm_reg_data_t current;
   case(reg_access)
			              "WO": begin
			                       arg.peek(status, current, ,  this);
                                   if ((current & mask) != arg.get_mirrored_value())
                                     begin
                                       `uvm_error("RegModel", {"Couldn't write value ", $sformatf("%h",wrdata)," to register '", arg.get_full_name(),"' through map '", map.get_full_name()});
                                     end
			                   end
			               default: begin
                                      arg.mirror(status, UVM_CHECK, UVM_FRONTDOOR, map, this);
			                       end
			            endcase
   endtask:alias_read
endclass

class alias_reg_field_seq extends uvm_reg_sequence;
  `uvm_object_utils(alias_reg_field_seq)

  uvm_reg rg;
  
  uvm_reg_field fld;
 
  uvm_reg_field Sfields[$];
  //agni_uvm_reg_field Sfields_agni[$];
  
  function new(string name="alias_reg_field_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t wrdata;
    uvm_reg_data_t current,data,data1;

    int bitwidth = fld.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s*2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};
	rg = fld.get_parent();
    rg.get_maps(maps);
    
   	  // foreach(Sfields[x])
      // begin
        // if(!$cast(Sfields_agni[x], Sfields[x]))
          // begin
            // `uvm_error("RegModel","cannot cast an object of type uvm_reg_field to agni_uvm_reg_field");
          // end
      // end
	
    foreach(maps[j]) 
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Field level Aliases of the register - '",rg.get_full_name(),"'"},UVM_LOW)

    `uvm_info("RegModel", {"Writing directed values and then read through default map '", "'"}, UVM_LOW)
    
    foreach(val_arr[i])
      begin
        foreach(Sfields[x])
          begin
             uvm_reg rg;
		   //  agni_reg prg;
             int alias_bitwidth = Sfields[x].get_n_bits();
             int unsigned alias_all1s = 2**alias_bitwidth - 1;
			 rg = Sfields[x].get_parent();
			 // if(!$cast(prg, rg)) 
               // begin
                    // `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
               // end
			  // Sfields_agni[x].set_is_acc_bit(1);
              // prg.set_cov_mask(alias_all1s);
 
			  alias_field_write(Sfields[x], Sfields[x].get_access(def_map), val_arr[i], def_map);

			  foreach(Sfields[y])
			     begin
			       uvm_reg rg;
			      // agni_reg prg;
			       int alias_bitwidth = Sfields[y].get_n_bits();
                   int unsigned alias_all1s = 2**alias_bitwidth - 1;
			
			       rg = Sfields[y].get_parent(); 
			       // if(!$cast(prg, rg))
                      // begin 
                           // `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
                      // end
					// Sfields_agni[y].set_is_acc_bit(1);
                    // prg.set_cov_mask(alias_all1s);
				    alias_field_read(Sfields[y], Sfields[y].get_access(def_map), val_arr[i], def_map);
			     end
           end 
       end
   
    `uvm_info("RegModel", {"Writing 1 hot and 0 hot values, and then reading through default map", "'"}, UVM_LOW)
    for(int i=0; i<bitwidth; i++)
     begin
        foreach(Sfields[x])
          begin
             uvm_reg rg;
		    // agni_reg prg;
             int alias_bitwidth = Sfields[x].get_n_bits();
             int unsigned alias_all1s = 2**alias_bitwidth - 1;
			 rg = Sfields[x].get_parent(); 
			 // if(!$cast(prg, rg))
               // begin 
                    // `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
               // end 
			 // Sfields_agni[x].set_is_acc_bit(1);
            //  prg.set_cov_mask(alias_all1s);
			  alias_field_write(Sfields[x], Sfields[x].get_access(def_map), 2**i, def_map);

			  foreach(Sfields[y])
			     begin
			       uvm_reg rg;
			       //agni_reg prg;
			       int alias_bitwidth = Sfields[y].get_n_bits();
                   int unsigned alias_all1s = 2**alias_bitwidth - 1;
			
			       rg = Sfields[y].get_parent();
			       // if(!$cast(prg, rg)) 
                      // begin
                           // `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
                      // end
					// Sfields_agni[y].set_is_acc_bit(1);
                    // prg.set_cov_mask(alias_all1s);
			        alias_field_read(Sfields[y], Sfields[y].get_access(def_map), 2**i, def_map);
			     end
				 
               alias_field_write(Sfields[x], Sfields[x].get_access(def_map), all1s-(2**i), def_map);

			   foreach(Sfields[y])
			     begin
			       uvm_reg rg;
			     //  agni_reg prg;
			       int alias_bitwidth = Sfields[y].get_n_bits();
                   int unsigned alias_all1s = 2**alias_bitwidth - 1;
			
			       rg = Sfields[y].get_parent();
			      /*  if(!$cast(prg, rg))
                      begin
                           `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
                      end 
					Sfields_agni[y].set_is_acc_bit(1);
                    prg.set_cov_mask(alias_all1s); */
                    alias_field_read(Sfields[y], Sfields[y].get_access(def_map), all1s-(2**i), def_map);
			     end
           end
       end
	   

   `uvm_info("RegModel", {"Writing random values and then reading until 100% coverage is achieved, through default map '", "'"}, UVM_LOW)

    repeat(`alias_reg_seq)
      begin
        foreach(Sfields[x])
          begin
		  if (Sfields[x].randomize()==1)
             begin
             uvm_reg rg;
		     //agni_reg prg;
             int alias_bitwidth = Sfields[x].get_n_bits();
             int unsigned alias_all1s = 2**alias_bitwidth - 1;
			 rg = Sfields[x].get_parent();
			 // if(!$cast(prg, rg))  
               // begin
                    // `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
               // end
			  wrdata=Sfields[x].get();
			//  Sfields_agni[x].set_is_acc_bit(1);
            //  prg.set_cov_mask(alias_all1s);
		  	  alias_field_write(Sfields[x], Sfields[x].get_access(def_map), wrdata, def_map);
			  foreach(Sfields[y])   
			     begin
			       uvm_reg rg;
			       //agni_reg prg;
			       int alias_bitwidth = Sfields[y].get_n_bits();
                   int unsigned alias_all1s = 2**alias_bitwidth - 1;
			
			       rg = Sfields[y].get_parent();
			       // if(!$cast(prg, rg))
                      // begin 
                           // `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
                      // end
					// Sfields_agni[y].set_is_acc_bit(1);
                    // prg.set_cov_mask(alias_all1s);
                    alias_field_read(Sfields[y], Sfields[y].get_access(def_map), wrdata, def_map);
			     end
				 wrdata = ~wrdata & all1s;
				 alias_field_write(Sfields[x], Sfields[x].get_access(def_map), wrdata, def_map);
				 
                 foreach(Sfields[y]) 
			     begin 
			       uvm_reg rg;
			      // agni_reg prg;
			       int alias_bitwidth = Sfields[y].get_n_bits();
                   int unsigned alias_all1s = 2**alias_bitwidth - 1;
			  
			       rg = Sfields[y].get_parent();
			       // if(!$cast(prg, rg))
                      // begin
                           // `uvm_error("RegModel","cannot cast an object of type uvm_reg to agni_reg");
                      // end
				//	Sfields_agni[y].set_is_acc_bit(1);
                  //  prg.set_cov_mask(alias_all1s);
                    alias_field_read(Sfields[y], Sfields[y].get_access(def_map), wrdata, def_map);
			     end
		    end 
         end
		
      end
	  
  endtask:body
  
  task alias_field_write(uvm_reg_field fld, string field_access, uvm_reg_data_t wrdata, uvm_reg_map map);
  uvm_status_e status;
  
   case(field_access)
			           "RO": begin
			                  fld.poke(status, wrdata, , this);
			                 end
			           default: begin
			                     fld.write(status, wrdata, UVM_FRONTDOOR, map, this);
								 `uvm_info("RegModel", {"Wrote field via ",map.get_full_name(), ": ", fld.get_full_name(),"  ", $sformatf("%h",wrdata)}, UVM_LOW);

			                  end
			          endcase
  
  endtask:alias_field_write
  
   task alias_field_read(uvm_reg_field fld, string field_access, uvm_reg_data_t wrdata, uvm_reg_map map);
    uvm_status_e status;
    uvm_reg_data_t current;
    case(field_access)
			           "RO",
                       "RC",
                       "RS": begin
			                    fld.mirror(status, UVM_CHECK, UVM_FRONTDOOR, map, this);
								fld.mirror(status, UVM_CHECK, UVM_FRONTDOOR, map, this);
			                 end
					    "WO": begin
						         fld.peek(status, current, ,  this);
                                 if (current != fld.get_mirrored_value())
                                     begin
                                       `uvm_error("RegModel", {"Couldn't write value ", $sformatf("%h",wrdata)," to register '", fld.get_full_name(),"' through map '", map.get_full_name()});
                                     end
						      end
			           default: begin
			                    fld.mirror(status, UVM_CHECK, UVM_FRONTDOOR, map, this);
			                   end
	endcase
   endtask:alias_field_read
endclass 

//sequences for varifying indirect registers

class indirect_reg_seq extends uvm_reg_sequence;
  `uvm_object_utils(indirect_reg_seq)
  uvm_reg_data_t mask;
  uvm_reg_indirect_data rg;
  //agni_reg_indirect_data Oreg;
  uvm_reg index;
  //agni_reg Iregs_agni;
  uvm_reg iregs;
  int Indirectmaps_size;

  function new(string name = "indirect_reg_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg inregs;
    uvm_reg_data_t wrdata, rddata, current, indirectreg;


    int bitwidth = index.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s * 2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    // if(!$cast(Oreg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(Iregs_agni, index))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    rg.get_maps(maps);

    //org.set_cov_mask(all1s);

    foreach(maps[j]) 
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Register - '",rg.get_full_name(),"'"},UVM_LOW)

    `uvm_info("RegModel", {"Writing directed values and then mirroring with check, through map '", def_map.get_full_name(), "'"}, UVM_LOW)

    for(int i=0; i<Indirectmaps_size; i++)
      begin
        index.write(status, i & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        index.read(status, rddata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));

        rg.write(status, $urandom() & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.read(status, rddata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));

		`uvm_info("RegModel", {"Reading back from the indirectly accessed registers"}, UVM_LOW)	  
        iregs = rg.get_indirect_reg();
        iregs.peek(status, indirectreg, .parent(this));
          
      end
  endtask
endclass

class indirect_reg_seq_with_trig extends uvm_reg_sequence;
  `uvm_object_utils(indirect_reg_seq_with_trig)
  uvm_reg_data_t mask;
  uvm_reg_indirect_data rg;
  //agni_reg_indirect_data Oreg;
  uvm_reg index;
  uvm_reg read_trig;
  uvm_reg write_trig;
  uvm_reg iregs;
  //agni_reg Iregs_agni;
  string writeTrigOp;
  string readTrigOp;
  int Indirectmaps_size;
  uvm_reg datagroups[$];

  function new(string name = "indirect_reg_seq_with_trig");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg inregs;
    uvm_reg_data_t wrdata, rddata, current, indirectreg;


    int bitwidth = index.get_n_bits();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s * 2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[5] = {all1s, 0, alt10s, alt01s, alt_db10s};

    // if(!$cast(Oreg, rg))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end

    // if(!$cast(Iregs_agni, index))
      // begin
        // `uvm_error("RegModel","cannot cast an object of type uvm_reg to //agni_reg");
      // end
 
    rg.get_maps(maps);

    //org.set_cov_mask(all1s);

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel", {"\nTesting Indirect Registers\n"}, UVM_LOW)

    for(int i=0; i<Indirectmaps_size; i++)
      begin
        `uvm_info("RegModel",{"\nWriting and reading index register '",index.get_full_name(),"'"},UVM_LOW)
        index.write(status, i & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        index.read(status, rddata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        if(datagroups.size() != 0) begin
          `uvm_info("RegModel",{"\nWriting to the datagroup registers"},UVM_LOW)
          foreach(datagroups[data])
            datagroups[data].write(status, $urandom() & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        end 
        `uvm_info("RegModel",{"\nWriting and reading indirect data register '",rg.get_full_name(),"'"},UVM_LOW)
        rg.write(status, $urandom() & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        rg.read(status, rddata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
        // write trigger 
        if(write_trig != null)
          begin
            case(writeTrigOp)
              "wr" : write_trig.write(status, $urandom() & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
              "rd"  : write_trig.read(status, rddata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            endcase
          end

        if(datagroups.size() != 0) begin
          `uvm_info("RegModel",{"\nReading from datagroup registers"},UVM_LOW)
          foreach(datagroups[data])
            datagroups[data].read(status, rddata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));  
        end
        // read trigger
        if(read_trig != null)
          begin
            case(readTrigOp)
              "wr" : read_trig.write(status, $urandom() & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
              "rd"  : read_trig.read(status, rddata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
            endcase
          end	

        `uvm_info("RegModel", {"Reading back from the indirectly accessed registers"}, UVM_LOW)	  
         iregs = rg.get_indirect_reg();
         iregs.peek(status, indirectreg, .parent(this));
      end
 
  endtask
endclass
//sequence for uvm_reg_fifo
class uvm_reg_FIFO_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_reg_FIFO_seq)

  uvm_reg_data_t mask;
  uvm_reg_fifo f;

  function new(string name = "uvm_reg_fifo_seq");
    super.new(name);
  endfunction

  task body();
   uvm_path_e 	path;
   uvm_reg_map maps[$];
   uvm_reg_map def_map;
   uvm_reg_map hw_map;

   uvm_status_e status;
   uvm_reg_data_t rdata;
   uvm_reg_data_t wdata;
   uvm_reg_data_t expected[];
   int max;
  
   f.get_maps(maps);

   foreach(maps[j])
     begin
      case(maps[j].get_name())
         default : def_map = maps[j];
         //"hw_map"      : hw_map  = maps[j];
      endcase
     end

    
    max = f.capacity();

    f.set_compare(UVM_CHECK);

    `uvm_info("FIFO", 
       $sformatf("Initializing FIFO reg of max size %0d with set()...",max), UVM_LOW)

    expected = new[max];

    // SET - preload regmodel; remodel now has full FIFO; DUT still empty
    foreach (expected[i]) begin
      wdata = $urandom & mask;
      expected[i] = wdata;
      f.set(wdata);
    end
    f.update(status);
    // READ - read contents of DUT back to regmodel; DUT is empty now, regmodel FULL
    foreach (expected[i]) begin
      f.read(status, rdata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
      if((rdata & mask) != (expected[i] & mask))
     `uvm_error("RegModel", $sformatf("Value read from DUT (%0h) not equal to expected value in the uvm_reg_fifi (%0h) for fifo location (%0d)",expected[i], rdata, i));
    end

  endtask
endclass
//neg sequence for uvm_reg_fifo
class uvm_reg_FIFO_NEG_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_reg_FIFO_NEG_seq)

  uvm_reg_data_t mask;
  uvm_reg_fifo f;

  function new(string name = "uvm_reg_fifo_NEG_seq");     //CHECH name!
    super.new(name);
  endfunction

  task body();
   uvm_path_e 	path;
   uvm_reg_map maps[$];
   uvm_reg_map def_map;
   uvm_reg_map hw_map;

   uvm_status_e status;
   uvm_reg_data_t rdata;
   uvm_reg_data_t wdata;
   uvm_reg_data_t expected[];
   int max;
  
   f.get_maps(maps);

   foreach(maps[j])
     begin
      case(maps[j].get_name())
         default : def_map = maps[j];
         //"hw_map"      : hw_map  = maps[j];
      endcase
     end

    
    max = f.capacity();

    f.set_compare(UVM_CHECK);

    `uvm_info("FIFO NEGATIVE SEQUENCES", $sformatf("Initializing FIFO reg of max size %0d with set()...",max), UVM_LOW)
    `uvm_info("FIFO", $sformatf("Initializing FIFO reg of max size %0d with set()...",max), UVM_LOW)

    f.read(status, rdata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
	if(status == UVM_NOT_OK)
    `uvm_error("FIFO EMPTY", "Reading from fifo before performing any write operation is not allowed")

     expected = new[max];

    // SET - preload regmodel; remodel now has full FIFO; DUT still empty
    // Writes for size+1 times
    `uvm_info("WRITING TO FIFO","\nPerforming write operation on fifo",UVM_LOW)
    foreach (expected[i]) begin
      wdata = $urandom & mask;
      expected[i] = wdata;
      f.set(wdata);
    end
	f.update(status);
	
	 wdata = $urandom & mask;
	 f.write(status, wdata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
	    // READ - read contents of DUT back to regmodel; DUT is empty now, regmodel FULL
   `uvm_info("READING FROM FIFO","\nPerforming read operation on fifo",UVM_LOW)

    for(int i=0; i<=max; i++)
    begin
     if(i==max) begin
     `uvm_info("FIFO EMPTY ","Performing read operation on fifo out of its lower-bound: No. of reads > writes",UVM_LOW)
     end
     f.read(status, rdata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
     if((rdata & mask) != (expected[i] & mask))
     `uvm_error("RegModel", $sformatf("Value read from DUT (%0h) not equal to expected value in the uvm_reg_fifo (%0h) for fifo location (%0d)", rdata, expected[i], i));
     end

  endtask
endclass

//neg sequence for read only Memory
class uvm_mem_swRo_neg_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_mem_swRo_neg_seq)
  uvm_reg_data_t mask;
  uvm_mem mem;
  //agni_reg org;
  bit constraintExist;

  function new(string name = "uvm_mem_swRo_neg_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t wrdata;
    uvm_reg_data_t rddata;
    uvm_reg_block blk;

    int bitwidth = mem.get_n_bits();
    int location = mem.get_size();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s * 2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[4] = {all1s, alt10s, alt01s, alt_db10s};


    mem.get_maps(maps);
    blk = mem.get_parent();

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j];
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Memory - '",mem.get_full_name(),"'"},UVM_LOW)

    if(!constraintExist)
      begin
        `uvm_info("RegModel", {"Writing directed values and reading to check the value is written or not, through map '", def_map.get_full_name(), "'"}, UVM_LOW)
        for(int j=0; j<location; j++)
          begin
            foreach(val_arr[i])
              begin
                mem.read(status, j,rddata, .path(UVM_FRONTDOOR), .map(def_map));
                mem.write(status, j, val_arr[i] & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
                mem.read(status, j,rddata, .path(UVM_FRONTDOOR), .map(def_map));
                if ((rddata & mask) == (val_arr[i] & mask))
                  begin
                    `uvm_error("RegModel",{"Memory '", mem.get_full_name(),"' is Read-Only"});
                  end
                mem.read(status, j,rddata, .path(UVM_BACKDOOR), .map(def_map));
                mem.write(status, j, val_arr[i] & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
                mem.read(status, j,rddata, .path(UVM_BACKDOOR), .map(def_map));
              end
          end

        `uvm_info("RegModel", {"Writing 1 hot and 0 hot values, and then mirroring with check, through map '", def_map.get_full_name(), "'"}, UVM_LOW)

        for(int j=0; j<location; j++)
          begin
            for(int i=0; i<bitwidth; i++)
              begin
                mem.read(status, j,rddata, .path(UVM_FRONTDOOR), .map(def_map));
                mem.write(status,j, (2**i) & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
                mem.read(status, j,rddata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
                if (rddata==2**i)
                  begin
                    `uvm_error("RegModel",{"Memory '", mem.get_full_name(),"' is Read-Only"});
                  end
                mem.read(status, j,rddata, .path(UVM_BACKDOOR), .map(def_map), .parent(this));
                mem.write(status,j, (all1s-(2**i)) & mask , .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
                mem.read(status, j,rddata, .path(UVM_BACKDOOR), .map(def_map), .parent(this));
                if ((rddata & mask) ==((all1s - 2**i) & mask))
                  begin
                    `uvm_error("RegModel",{"Memory '", mem.get_full_name(),"' is Read-Only"});
                  end
              end
          end
      end

  endtask
endclass


//neg sequence for write only Memory
class uvm_mem_swWo_neg_seq extends uvm_reg_sequence;
  `uvm_object_utils(uvm_mem_swRo_neg_seq)
  uvm_reg_data_t mask;
  uvm_mem mem;
  //agni_reg org;
  bit constraintExist;

  function new(string name = "uvm_mem_swRo_neg_seq");
    super.new(name);
  endfunction

  task body();
    uvm_reg_map maps[$];
    uvm_reg_map def_map;
    uvm_reg_map hw_map;
    uvm_status_e status;
    uvm_reg_data_t wrdata;
    uvm_reg_data_t rddata,val;
    uvm_reg_block blk;

    int bitwidth = mem.get_n_bits();
    int location = mem.get_size();
    int unsigned all1s = 2**bitwidth - 1;
    int unsigned alt10s = all1s/3;
    int unsigned alt01s = alt10s * 2;
    int unsigned alt_db10s = (all1s/15) * 6;
    int unsigned val_arr[4] = {all1s, alt10s, alt01s, alt_db10s};


    mem.get_maps(maps);
    blk = mem.get_parent();

    foreach(maps[j])
      begin
        case(maps[j].get_name())
          default : def_map = maps[j]; 
          //"hw_map"      : hw_map  = maps[j];
        endcase
      end

    `uvm_info("RegModel",{"\n\nTesting Memory - '",mem.get_full_name(),"'"},UVM_LOW)

    if(!constraintExist)
      begin
        `uvm_info("RegModel", {"Writing directed values and reading through map '", def_map.get_full_name(), " Reading to check that the value is read from write-only memory"}, UVM_LOW)
        for(int j=0; j<location; j++)
          begin
            foreach(val_arr[i])
              begin
                mem.write(status, j, val_arr[i] & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
                mem.peek(status, j, val);
                mem.read(status, j,rddata, .path(UVM_FRONTDOOR), .map(def_map));
                if ((rddata & mask) == (val & mask))
                  begin
                    `uvm_error("RegModel", {"Not possible to read from Write-Only Memory ", mem.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
                  end
                mem.write(status, j, val_arr[i] & mask, .path(UVM_BACKDOOR), .map(def_map), .parent(this));
                mem.peek(status, j, val);
                mem.read(status, j,rddata, .path(UVM_FRONTDOOR), .map(def_map));
                if ((rddata & mask)==(val & mask))
                  begin
                    `uvm_error("RegModel", {"Not possible to read from Write-Only Memory ", mem.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
                  end
              end
          end

        `uvm_info("RegModel", {"Writing 1 hot and 0 hot values through map '", def_map.get_full_name(), "Reading to check that the value is read from write-only memory"}, UVM_LOW)

        for(int j=0; j<location; j++)
          begin
            for(int i=0; i<bitwidth; i++)
              begin
                mem.write(status,j, (2**i) & mask, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
                mem.peek(status, j, val);
                mem.read(status, j,rddata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
                if ((rddata & mask)==(val & mask))
                  begin
                    `uvm_error("RegModel", {"Not possible to read from Write-Only Memory ", mem.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
                  end
                mem.write(status,j, (all1s-(2**i)) & mask , .path(UVM_BACKDOOR), .map(def_map), .parent(this));
                mem.peek(status, j, val);
                mem.read(status, j,rddata, .path(UVM_FRONTDOOR), .map(def_map), .parent(this));
                if ((rddata & mask)==(val & mask))
                  begin
                    `uvm_error("RegModel", {"Not possible to read from Write-Only Memory ", mem.get_full_name(),"' through map '", def_map.get_full_name(),"' ..."});
                  end
              end
          end
      end

  endtask
endclass
