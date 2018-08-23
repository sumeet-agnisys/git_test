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




use work.block1_pkg.ALL;

use work.block2_pkg.ALL;

------------------------------------------------
-- BEGIN : PACKAGE - CHIP_NAME_PKG
------------------------------------------------
package chip_name_pkg is
    
    -- | Constant value
    constant C_AXI_ADDR_WIDTH : positive := 5;    -- Address width
    constant C_AXI_BUS_WIDTH  : positive := 32;    -- Bus width
    
    
    
    
    constant C_chip_block1_offset: natural := 0;
    constant C_chip_block2_offset: natural := 12;
    -- all fields writeable by HW
    type chip_name_inrec is record
        --:BLOCK1
        block1 : block1_inrec;
        
        --:BLOCK2
        block2 : block2_inrec;
        
    end record;
    -- constants used for initializing the input record port
    constant chip_name_inrec_z : chip_name_inrec := (
        
        --:BLOCK1
        block1 => block1_inrec_z,
        --:BLOCK2
        block2 => block2_inrec_z
    );
    
    constant chip_name_inrec_0 : chip_name_inrec := (
        
        --:BLOCK1
        block1 => block1_inrec_0,
        --:BLOCK2
        block2 => block2_inrec_0
    );
    
    -- all fields readable by HW
    type chip_name_outrec is record
        --:BLOCK1
        block1 : block1_outrec;
        
        --:BLOCK2
        block2 : block2_outrec;
        
    end record;
    -- constants used for initializing the input record port
    constant chip_name_outrec_default : chip_name_outrec := (
        
        --:BLOCK1
        block1 => block1_outrec_default,
        
        --:BLOCK2
        block2 => block2_outrec_default
    );
    
    -- Input enables for each individual fields that are writeable by Hardware.
    -- When high, the corresponding field location in the register is written with data from the reg_in structure.
    
    -- one enable bit for each field writeable by HW
    
    
    type chip_name_enb_inrec is record
        --:BLOCK1
        block1 : block1_enb_inrec;
        
        --:BLOCK2
        block2 : block2_enb_inrec;
        
    end record;
    
    -- constants used for initializing the enable input record port
    constant chip_name_enb_inrec_z : chip_name_enb_inrec := (
        
        --:BLOCK1
        block1 => block1_enb_inrec_z,
        --:BLOCK2
        block2 => block2_enb_inrec_z
    );
    
    constant chip_name_enb_inrec_0 : chip_name_enb_inrec := (
        
        --:BLOCK1
        block1 => block1_enb_inrec_0,
        --:BLOCK2
        block2 => block2_enb_inrec_0
    );
    
    -- Output enables for each Hardware readable register.
    -- Note that this is on a per-register basis, not per-field basis because the entire register is written to by Software at the same time.
    -- Currently this structure is based on any register that has any field that is Hardware readable,
    
    -- one enable bit for each register readable by HW
    type chip_name_enb_outrec is record
        --:BLOCK1
        block1 : block1_enb_outrec;
        
        --:BLOCK2
        block2 : block2_enb_outrec;
        
    end record;
    
    
    type chip_name_ext_inrec is record
        block1:block1_ext_inrec;
        
        block2:block2_ext_inrec;
        
    end record;
    
    
    constant chip_name_ext_inrec_z : chip_name_ext_inrec := (
        
        --:BLOCK1
        block1 => block1_ext_inrec_z,
        --:BLOCK2
        block2 => block2_ext_inrec_z
    );
    
    constant chip_name_ext_inrec_0 : chip_name_ext_inrec := (
        
        --:BLOCK1
        block1 => block1_ext_inrec_0,
        --:BLOCK2
        block2 => block2_ext_inrec_0
    );
    
    
    
    type chip_name_ext_outrec is record
        block1:block1_ext_outrec;
        
        block2:block2_ext_outrec;
        
    end record;
    
    
end chip_name_pkg;
-- END : PACKAGE - CHIP_NAME_PKG
