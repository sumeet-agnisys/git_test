

interface ambaaxi4lite_if;
                

    parameter bus_width   = 32;
    parameter addr_width  = 5;








    logic [addr_width-1:0] block1_idsaddress_out;
    logic [addr_width-1:0]block1_idsraddress_out;
    logic [bus_width-1:0] block1_idswr_data_out;


    logic [addr_width-1:0] block2_idsaddress_out;
    logic [addr_width-1:0]block2_idsraddress_out;
    logic [bus_width-1:0] block2_idswr_data_out;

 
    logic aclk;
    logic aresetn;

    // Master write address channel
    logic [addr_width  -1 : 0] awaddr;
    logic awvalid;
    logic awready;
    logic [2 : 0] awprot;
    // Master write data channel
    logic [bus_width   -1 : 0] wdata;
    logic [bus_width/8 -1 : 0] wstrb;
    logic wvalid;
    logic wready;
    // Master write response channel
    logic [1:0] bresp;
    logic bvalid;
    logic bready;
    // Master read address channel
    logic [addr_width  -1 : 0] araddr;
    logic arvalid;
    logic arready;
    logic [2 : 0] arprot;
    // Master read data channel
    logic [bus_width   -1 : 0] rdata;
    logic [1:0] rresp;
    logic rvalid;
    logic rready;

    clocking mck @(posedge aclk);
        output awaddr, awvalid, wdata, wvalid, aresetn, araddr, arvalid, rready, awprot, wstrb, bready, arprot;
        input  awready, rdata, rvalid, wready, arready, bresp, bvalid, rresp;
    endclocking: mck

    modport master(clocking mck);
endinterface