--Agnisys, Inc. ***** Copyright 2018 All Rights Reserved. *****
--
--*** This file is auto generated by IDesignSpec (http://www.agnisys.com) . Please do not edit this file. ***
-- created by        :
-- generated by      : Admin
-- generated from    : C:\Users\Admin\Documents\GitHub\git_test\Allegro_test\case1\case1.idsng
-- IDesignSpec rev   : idsbatch v4.16.26.2

--*** This code is generated with following settings ***
-- Reg Width                  : 32
-- Address Unit               : 8
-- C++ Types int              : hwint
-- Bus Type                   : AXI
-- BigEndian                  : false
-- LittleEndian               : false
-- Dist. Decode and Readback  : false
-----------------------------------------------------------------------------------------------------------------
--


LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.all;
use IEEE.numeric_std.all;
use IEEE.std_logic_textio.all;
use work.block2_pkg.all;

-------------------------------------------------------------
-- BLOCK BLOCK2 ENTITY : block2_e
-------------------------------------------------------------

entity block2_e is
    generic (
        
        
        block2_reggroup1_count                    : positive :=  1;  -- REGGROUP1
        block2_ref_name_count                     : positive :=  1;  -- REF_NAME
        
        G_AXI_ADDR_WIDTH : positive :=  C_AXI_ADDR_WIDTH;
        G_AXI_BUS_WIDTH  : positive :=  C_AXI_BUS_WIDTH;
        G_block2_offset : natural := C_block2_offset
    );
    
    port (
        
        --  BUS  : AXI
        aclk        :    in       std_logic;                -- Bus clock
        aresetn     :    in       std_logic;                -- Reset
        awaddr      :    in       std_logic_vector(G_AXI_ADDR_WIDTH-1  downto 0 );                -- Write address
        awvalid     :    in       std_logic;                -- Write address valid : This signal indicates that write address is valid
        awready     :    out      std_logic;                -- Write address ready : This signal indicates that the slave is ready to accept an address
        awprot      :    in       std_logic_vector(2 downto 0 );                -- Write Protection Type
        wdata       :    in       std_logic_vector(G_AXI_BUS_WIDTH-1   downto 0 );                -- Write data
        wvalid      :    in       std_logic;                -- Write valid         : This signal indicates that valid write data and strobes are available
        wready      :    out      std_logic;                -- Write ready         : This signal indicates that the slave can accept the write data
        wstrb       :    in       std_logic_vector(G_AXI_BUS_WIDTH/8-1 downto 0 );                -- Write Strobes
        bresp       :    out      std_logic_vector(1 downto 0 );                -- Write Response
        bready      :    in       std_logic;                -- Response Ready
        bvalid      :    out      std_logic;                -- Response valid
        araddr      :    in       std_logic_vector(G_AXI_ADDR_WIDTH-1  downto 0 );                -- Read  address
        arvalid     :    in       std_logic;                -- Read address valid  : This signal indicates that the read address is valid and will remain stable until ARREADY is high
        arready     :    out      std_logic;                -- Read address ready  : This signal indicates that the slave is ready to accept an address
        arprot      :    in       std_logic_vector(2 downto 0 );                -- Read Protection Type
        rdata       :    out      std_logic_vector(G_AXI_BUS_WIDTH-1   downto 0 );                -- Read data
        rvalid      :    out      std_logic;                -- Read valid          : This signal indicates that the required read data is available and the read transfer can complete
        rready      :    in       std_logic;                -- Read ready          : This signal indicates that the master can accept the read data
        rresp       :    out      std_logic_vector(1 downto 0 );                -- Read Response
        
        
        
        
        
        
        
        
        reg_in_enb       : in   block2_enb_inrec;    -- input enables for registers
        reg_out_enb      : out  block2_enb_outrec;  -- output enables for registers
        reg_in           : in   block2_inrec;      -- input register fields (all writeable register fields)
        reg_out          : out  block2_outrec;     -- output registers (all readable registers)
        
        
        
        
        ext_in           : in   block2_ext_inrec;          -- incoming signals for Externally implemented registers and sections
        ext_out          : out  block2_ext_outrec         -- outgoing signals for Externally implemented registers and sections
        
        
        
    );
end block2_e;

