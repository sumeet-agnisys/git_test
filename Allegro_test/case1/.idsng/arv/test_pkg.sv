package test_pkg;
  import uvm_pkg::*;
  import config_pkg::*;
  import chip_name_regmem_pkg::*;
  import ambaaxi4lite_pkg::*;
  import hw_pkg::*;
  import seq_pkg::*;
  `include "uvm_macros.svh"

  class my_catcher extends uvm_report_catcher;

    string uvm_last_msg_string = config_pkg::uvm_global_current_seq;
    int no_of_error = 0;
    int no_of_info = 0;

    function new(string name="my_catcher");
      super.new(name);
    endfunction
    //This example demotes "MY_ID" errors to an info message

    function action_e catch();

      //$display("\nlastmsg is %s, uvm_global_current_seq is %s, no_of_error is %d, no_of_info is %d", uvm_last_msg_string, config_pkg::uvm_global_current_seq, no_of_error, no_of_info);

      if(get_id() == "finishARV")
        begin
          if(no_of_error != 0)
            begin
              config_pkg::xle_end("result");
            end
            else if(no_of_info != 0)
              begin
                config_pkg::xle("value","pass","");
                config_pkg::xle_end("result");
              end
            end

            if(get_id() == "RegModel")
              begin
                if(uvm_last_msg_string != config_pkg::uvm_global_current_seq)
                  begin
                    if(no_of_error != 0)
                      begin
                        config_pkg::xle_end("result");
                      end
                      else if(no_of_info != 0)
                        begin
                          config_pkg::xle("value","pass","");
                          config_pkg::xle_end("result");
                        end
                        uvm_last_msg_string = config_pkg::uvm_global_current_seq;
                        config_pkg::xle_start("result"," ",{xla("name",config_pkg::uvm_global_current_seq),xla("type","test")});
                        //if(get_severity() == UVM_ERROR)
                        no_of_info = 1;
                        if(no_of_error >= 1)
                          begin
                            config_pkg::xle("value","fail","");
                            //config_pkg::xle("msg",get_message(),xla("type","error"));
                            no_of_error = 1;
                          end
                          else if(get_severity() == UVM_INFO)
                            begin
                              no_of_info = 1;
                            end
                          end
                          else if( (no_of_error >= 1 || no_of_info >= 1) && get_severity() == UVM_ERROR)
                            begin
                              if(no_of_error == 0)
                                begin
                                  config_pkg::xle("value","fail","");
                                end
                                //config_pkg::xle("msg",get_message(),xla("type","error"));
                                no_of_error++;
                              end
                            end

                            return THROW;
                          endfunction

                        endclass

                        `include "env/env.svh"
                        `include "test/test.svh"

                      endpackage
