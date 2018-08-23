package config_pkg;
  import uvm_pkg::*;
  import chip_name_regmem_pkg::*;
  `include "uvm_macros.svh"
  string uvm_global_current_seq = "";
  int num_of_error_count = 0;

  class config_object extends uvm_object;
    `uvm_object_utils(config_object)
    virtual ambaaxi4lite_if ambaaxi4liteif;
    virtual chip_name_hw_if chip_name_hif;
    chip_name_block model;

    function new(string name="");
      super.new(name);
    endfunction
  endclass
  string replacements[string] = '{ "<" : "&lt;",
  "&" : "&amp;",
  ">" : "&gt;",
  "'" : "&apos;",
  "\"": "&quot;"
};

function string sanitize(string data);
  for(int i = data.len()-1; i >= 0; i--) begin
  if (replacements.exists(data[i])) begin
    data = {data.substr(0,i-1), replacements[data[i]], data.substr(i+1, data.len()-
    1)};
  end
end
return data;
endfunction : sanitize

function automatic string xla(string tag, string data);
  xla="";
  if (data != "") begin
    xla = {" ", tag, "=\"", sanitize(data), "\" "};
  end
endfunction

function automatic void xle(string tag, string data, string attributes="");
  string xle = "";
  if (data != "") begin
    xle = {"<", tag, attributes, ">", sanitize(data),"</", tag, ">"};
  end
  $display(xle);
endfunction

function automatic void xle_start(string tag, string data, string attributes="");
  string xle_start = "";
  if (data != "") begin
    xle_start = {"<", tag, attributes, ">", sanitize(data)};
  end
  $display(xle_start);
endfunction

function automatic void xle_end(string tag);
  string xle_end = "";
  xle_end = {"</", tag, ">\n"};
  $display(xle_end);
endfunction

endpackage
