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
------------------------------------------------
-- BEGIN : PACKAGE - BLOCK2_PKG
------------------------------------------------
package block2_pkg is
    
    -- | Constant value
    constant C_AXI_ADDR_WIDTH : positive := 5;    -- Address width
    constant C_AXI_BUS_WIDTH  : positive := 32;    -- Bus width
    
    
    
    
    constant C_block2_offset: natural := 0;   -- block offset
    constant default_reggroup1_reg1_fld : std_logic_vector(31 downto 0)  := "00000000000000000000000000000000"  ;
    constant default_reggroup1_reg2_fld1 : std_logic_vector(31 downto 0) := "00000000000000000000000000000000" ;
    constant default_ref_name_reg1_fld : std_logic_vector(31 downto 0)                     := "00000000000000000000000000000000"                     ;
    constant default_ref_name_ref_name_reggroup1_reg1_fld : std_logic_vector(31 downto 0)  := "00000000000000000000000000000000"  ;
    constant default_ref_name_ref_name_reggroup1_reg2_fld1 : std_logic_vector(31 downto 0) := "00000000000000000000000000000000" ;
    
    
    
    -- all fields writeable by HW
    type block2_reggroup1_inrec is record
        -- : REG1
        reg1_fld : std_logic_vector(31 downto 0);
        
        -- : REG2
        reg2_fld1 : std_logic_vector(31 downto 0);
        
    end record;
    -- constants used for initializing the input record port
    constant block2_reggroup1_inrec_z : block2_reggroup1_inrec := (
        
        -- : REG1
        reg1_fld       => (others => 'Z'),
        
        -- : REG2
        reg2_fld1      => (others => 'Z')
    );
    
    constant block2_reggroup1_inrec_0 : block2_reggroup1_inrec := (
        
        -- : REG1
        reg1_fld       => (others => '0'),
        
        -- : REG2
        reg2_fld1      => (others => '0')
    );
    
    -- all fields readable by HW
    type block2_reggroup1_outrec is record
        -- : REG1
        reg1_fld : std_logic_vector(31 downto 0);
        -- : REG2
        reg2_fld1 : std_logic_vector(31 downto 0);
    end record;
    -- constants used for initializing the input record port
    constant block2_reggroup1_outrec_default : block2_reggroup1_outrec := (
        
        -- : REG1
        reg1_fld => default_reggroup1_reg1_fld,
        -- : REG2
        reg2_fld1 => default_reggroup1_reg2_fld1
    );
    
    -- one enable bit for each field writeable by HW
    
    
    type block2_reggroup1_enb_inrec is record
        -- : REG1
        reg1_fld : std_logic ;
        
        -- : REG2
        reg2_fld1 : std_logic ;
        
    end record;
    
    -- constants used for initializing the enable input record port
    constant block2_reggroup1_enb_inrec_z : block2_reggroup1_enb_inrec := (
        
        -- : REG1
        reg1_fld => 'Z' ,
        -- : REG2
        reg2_fld1 => 'Z'
    );
    
    constant block2_reggroup1_enb_inrec_0 : block2_reggroup1_enb_inrec := (
        
        -- : REG1
        reg1_fld => '0' ,
        -- : REG2
        reg2_fld1 => '0'
    );
    
    -- one enable bit for each register readable by HW
    type block2_reggroup1_enb_outrec is record
        -- : REG1
        reg1 : std_logic;
        
        -- : REG2
        reg2 : std_logic;
        
    end record;
    
    constant block2_reggroup1_count : natural := 1;
    
    
    
    type block2_reggroup1_inrec_array is array ((block2_reggroup1_count - 1) downto 0) of block2_reggroup1_inrec;
    
    -- constants used for initializing the input record port
    constant block2_reggroup1_inrec_array_z : block2_reggroup1_inrec_array := (
        0 =>block2_reggroup1_inrec_z
    );
    
    constant block2_reggroup1_inrec_array_0 : block2_reggroup1_inrec_array := (
        0 =>block2_reggroup1_inrec_0
    );
    
    
    type block2_reggroup1_outrec_array is array ((block2_reggroup1_count - 1) downto 0) of block2_reggroup1_outrec;
    
    constant block2_reggroup1_outrec_array_default : block2_reggroup1_outrec_array := (
        0 =>block2_reggroup1_outrec_default
    );
    
    
    
    type block2_reggroup1_enb_inrec_array is array ((block2_reggroup1_count - 1) downto 0) of block2_reggroup1_enb_inrec;
    
    -- constants used for initializing the enable input record port
    constant block2_reggroup1_enb_inrec_array_z : block2_reggroup1_enb_inrec_array := (
        0 =>block2_reggroup1_enb_inrec_z
    );
    
    constant block2_reggroup1_enb_inrec_array_0 : block2_reggroup1_enb_inrec_array := (
        0 =>block2_reggroup1_enb_inrec_0
    );
    
    type block2_reggroup1_enb_outrec_array is array ((block2_reggroup1_count - 1) downto 0) of block2_reggroup1_enb_outrec;
    
    -- all fields writeable by HW
    type block2_ref_name_ref_name_reggroup1_inrec is record
        -- : REG1
        reg1_fld : std_logic_vector(31 downto 0);
        
        -- : REG2
        reg2_fld1 : std_logic_vector(31 downto 0);
        
    end record;
    -- constants used for initializing the input record port
    constant block2_ref_name_ref_name_reggroup1_inrec_z : block2_ref_name_ref_name_reggroup1_inrec := (
        
        -- : REG1
        reg1_fld                         => (others => 'Z'),
        
        -- : REG2
        reg2_fld1                        => (others => 'Z')
    );
    
    constant block2_ref_name_ref_name_reggroup1_inrec_0 : block2_ref_name_ref_name_reggroup1_inrec := (
        
        -- : REG1
        reg1_fld                         => (others => '0'),
        
        -- : REG2
        reg2_fld1                        => (others => '0')
    );
    
    -- all fields readable by HW
    type block2_ref_name_ref_name_reggroup1_outrec is record
        -- : REG1
        reg1_fld : std_logic_vector(31 downto 0);
        -- : REG2
        reg2_fld1 : std_logic_vector(31 downto 0);
    end record;
    -- constants used for initializing the input record port
    constant block2_ref_name_ref_name_reggroup1_outrec_default : block2_ref_name_ref_name_reggroup1_outrec := (
        
        -- : REG1
        reg1_fld => default_ref_name_ref_name_reggroup1_reg1_fld,
        -- : REG2
        reg2_fld1 => default_ref_name_ref_name_reggroup1_reg2_fld1
    );
    
    -- one enable bit for each field writeable by HW
    
    
    type block2_ref_name_ref_name_reggroup1_enb_inrec is record
        -- : REG1
        reg1_fld : std_logic ;
        
        -- : REG2
        reg2_fld1 : std_logic ;
        
    end record;
    
    -- constants used for initializing the enable input record port
    constant block2_ref_name_ref_name_reggroup1_enb_inrec_z : block2_ref_name_ref_name_reggroup1_enb_inrec := (
        
        -- : REG1
        reg1_fld => 'Z' ,
        -- : REG2
        reg2_fld1 => 'Z'
    );
    
    constant block2_ref_name_ref_name_reggroup1_enb_inrec_0 : block2_ref_name_ref_name_reggroup1_enb_inrec := (
        
        -- : REG1
        reg1_fld => '0' ,
        -- : REG2
        reg2_fld1 => '0'
    );
    
    -- one enable bit for each register readable by HW
    type block2_ref_name_ref_name_reggroup1_enb_outrec is record
        -- : REG1
        reg1 : std_logic;
        
        -- : REG2
        reg2 : std_logic;
        
    end record;
    
    constant block2_ref_name_ref_name_reggroup1_count : natural := 1;
    
    
    
    type block2_ref_name_ref_name_reggroup1_inrec_array is array ((block2_ref_name_ref_name_reggroup1_count - 1) downto 0) of block2_ref_name_ref_name_reggroup1_inrec;
    
    -- constants used for initializing the input record port
    constant block2_ref_name_ref_name_reggroup1_inrec_array_z : block2_ref_name_ref_name_reggroup1_inrec_array := (
        0 =>block2_ref_name_ref_name_reggroup1_inrec_z
    );
    
    constant block2_ref_name_ref_name_reggroup1_inrec_array_0 : block2_ref_name_ref_name_reggroup1_inrec_array := (
        0 =>block2_ref_name_ref_name_reggroup1_inrec_0
    );
    
    
    type block2_ref_name_ref_name_reggroup1_outrec_array is array ((block2_ref_name_ref_name_reggroup1_count - 1) downto 0) of block2_ref_name_ref_name_reggroup1_outrec;
    
    constant block2_ref_name_ref_name_reggroup1_outrec_array_default : block2_ref_name_ref_name_reggroup1_outrec_array := (
        0 =>block2_ref_name_ref_name_reggroup1_outrec_default
    );
    
    
    
    type block2_ref_name_ref_name_reggroup1_enb_inrec_array is array ((block2_ref_name_ref_name_reggroup1_count - 1) downto 0) of block2_ref_name_ref_name_reggroup1_enb_inrec;
    
    -- constants used for initializing the enable input record port
    constant block2_ref_name_ref_name_reggroup1_enb_inrec_array_z : block2_ref_name_ref_name_reggroup1_enb_inrec_array := (
        0 =>block2_ref_name_ref_name_reggroup1_enb_inrec_z
    );
    
    constant block2_ref_name_ref_name_reggroup1_enb_inrec_array_0 : block2_ref_name_ref_name_reggroup1_enb_inrec_array := (
        0 =>block2_ref_name_ref_name_reggroup1_enb_inrec_0
    );
    
    type block2_ref_name_ref_name_reggroup1_enb_outrec_array is array ((block2_ref_name_ref_name_reggroup1_count - 1) downto 0) of block2_ref_name_ref_name_reggroup1_enb_outrec;
    
    -- all fields writeable by HW
    type block2_ref_name_inrec is record
        ref_name_ref_name_reggroup1 : block2_ref_name_ref_name_reggroup1_inrec_array;
        -- : REG1
        reg1_fld : std_logic_vector(31 downto 0);
        
    end record;
    -- constants used for initializing the input record port
    constant block2_ref_name_inrec_z : block2_ref_name_inrec := (
        ref_name_ref_name_reggroup1 => block2_ref_name_ref_name_reggroup1_inrec_array_z,
        
        -- : REG1
        reg1_fld      => (others => 'Z')
    );
    
    constant block2_ref_name_inrec_0 : block2_ref_name_inrec := (
        ref_name_ref_name_reggroup1 => block2_ref_name_ref_name_reggroup1_inrec_array_0,
        
        -- : REG1
        reg1_fld      => (others => '0')
    );
    
    -- all fields readable by HW
    type block2_ref_name_outrec is record
        ref_name_ref_name_reggroup1 : block2_ref_name_ref_name_reggroup1_outrec_array;
        -- : REG1
        reg1_fld : std_logic_vector(31 downto 0);
    end record;
    -- constants used for initializing the input record port
    constant block2_ref_name_outrec_default : block2_ref_name_outrec := (
        
        ref_name_ref_name_reggroup1 => block2_ref_name_ref_name_reggroup1_outrec_array_default,
        -- : REG1
        reg1_fld => default_ref_name_reg1_fld
    );
    
    -- one enable bit for each field writeable by HW
    
    
    type block2_ref_name_enb_inrec is record
        ref_name_ref_name_reggroup1 : block2_ref_name_ref_name_reggroup1_enb_inrec_array;
        -- : REG1
        reg1_fld : std_logic ;
        
    end record;
    
    -- constants used for initializing the enable input record port
    constant block2_ref_name_enb_inrec_z : block2_ref_name_enb_inrec := (
        
        -- : REG1
        reg1_fld => 'Z' ,
        ref_name_ref_name_reggroup1 => block2_ref_name_ref_name_reggroup1_enb_inrec_array_z
    );
    
    constant block2_ref_name_enb_inrec_0 : block2_ref_name_enb_inrec := (
        
        -- : REG1
        reg1_fld => '0' ,
        ref_name_ref_name_reggroup1 => block2_ref_name_ref_name_reggroup1_enb_inrec_array_0
    );
    
    -- one enable bit for each register readable by HW
    type block2_ref_name_enb_outrec is record
        -- : REGGROUP1
        ref_name_ref_name_reggroup1 : block2_ref_name_ref_name_reggroup1_enb_outrec_array;
        
        -- : REG1
        reg1 : std_logic;
        
    end record;
    
    constant block2_ref_name_count : natural := 1;
    
    
    
    type block2_ref_name_inrec_array is array ((block2_ref_name_count - 1) downto 0) of block2_ref_name_inrec;
    
    -- constants used for initializing the input record port
    constant block2_ref_name_inrec_array_z : block2_ref_name_inrec_array := (
        0 =>block2_ref_name_inrec_z
    );
    
    constant block2_ref_name_inrec_array_0 : block2_ref_name_inrec_array := (
        0 =>block2_ref_name_inrec_0
    );
    
    
    type block2_ref_name_outrec_array is array ((block2_ref_name_count - 1) downto 0) of block2_ref_name_outrec;
    
    constant block2_ref_name_outrec_array_default : block2_ref_name_outrec_array := (
        0 =>block2_ref_name_outrec_default
    );
    
    
    
    type block2_ref_name_enb_inrec_array is array ((block2_ref_name_count - 1) downto 0) of block2_ref_name_enb_inrec;
    
    -- constants used for initializing the enable input record port
    constant block2_ref_name_enb_inrec_array_z : block2_ref_name_enb_inrec_array := (
        0 =>block2_ref_name_enb_inrec_z
    );
    
    constant block2_ref_name_enb_inrec_array_0 : block2_ref_name_enb_inrec_array := (
        0 =>block2_ref_name_enb_inrec_0
    );
    
    type block2_ref_name_enb_outrec_array is array ((block2_ref_name_count - 1) downto 0) of block2_ref_name_enb_outrec;
    
    -- all fields writeable by HW
    type block2_inrec is record
        reggroup1                   : block2_reggroup1_inrec_array;
        ref_name                    : block2_ref_name_inrec_array;
    end record;
    -- constants used for initializing the input record port
    constant block2_inrec_z : block2_inrec := (
        
        reggroup1                   => block2_reggroup1_inrec_array_z,
        ref_name                    => block2_ref_name_inrec_array_z
    );
    
    constant block2_inrec_0 : block2_inrec := (
        
        reggroup1                   => block2_reggroup1_inrec_array_0,
        ref_name                    => block2_ref_name_inrec_array_0
    );
    
    -- all fields readable by HW
    type block2_outrec is record
        reggroup1                   : block2_reggroup1_outrec_array;
        ref_name                    : block2_ref_name_outrec_array;
    end record;
    -- constants used for initializing the input record port
    constant block2_outrec_default : block2_outrec := (
        
        reggroup1                   => block2_reggroup1_outrec_array_default,
        ref_name                    => block2_ref_name_outrec_array_default
    );
    
    -- Input enables for each individual fields that are writeable by Hardware.
    -- When high, the corresponding field location in the register is written with data from the reg_in structure.
    
    -- one enable bit for each field writeable by HW
    
    
    type block2_enb_inrec is record
        reggroup1                   : block2_reggroup1_enb_inrec_array;
        ref_name                    : block2_ref_name_enb_inrec_array;
    end record;
    
    -- constants used for initializing the enable input record port
    constant block2_enb_inrec_z : block2_enb_inrec := (
        
        reggroup1                   => block2_reggroup1_enb_inrec_array_z,
        ref_name                    => block2_ref_name_enb_inrec_array_z
    );
    
    constant block2_enb_inrec_0 : block2_enb_inrec := (
        
        reggroup1                   => block2_reggroup1_enb_inrec_array_0,
        ref_name                    => block2_ref_name_enb_inrec_array_0
    );
    
    -- Output enables for each Hardware readable register.
    -- Note that this is on a per-register basis, not per-field basis because the entire register is written to by Software at the same time.
    -- Currently this structure is based on any register that has any field that is Hardware readable,
    
    -- one enable bit for each register readable by HW
    type block2_enb_outrec is record
        -- : REGGROUP1
        reggroup1 : block2_reggroup1_enb_outrec_array;
        
        -- : REF_NAME
        ref_name : block2_ref_name_enb_outrec_array;
        
    end record;
    
    
    
    type block2_ext_inrec is record
        dummy : std_logic;  -- need at least one signal in a record.
    end record;
    
    
    constant block2_ext_inrec_z : block2_ext_inrec := (
        dummy => 'Z'  -- need at least one signal in a record.
    );
    
    constant block2_ext_inrec_0 : block2_ext_inrec := (
        dummy => '0'  -- need at least one signal in a record.
    );
    
    
    
    type block2_ext_outrec is record
        dummy : std_logic;  -- need at least one signal in a record.
        
        
    end record;
    
    
    
    
end block2_pkg;
-- END : PACKAGE - BLOCK2_PKG