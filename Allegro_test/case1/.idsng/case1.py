 # -*- coding: iso-8859-15 -*- 
top_chip = {
       
        
'chip_name' :
{
        'type' : 'chip',
        
        'name' : "chip_name",
        'coverage' : "on",
        'offset' : "0",
        'address' : "0x00",
        'endaddress' : "0x1F",
        'size' : "32",
        'config' :
        {
                'type' : 'config',
                
                'regwidth' : "32",
                'buswidth' : "32",
                'addressunit' : "8",
                'busdomains' :
                {
                        
                        'default_map' :
                        {
                                'type' : 'busdomain',
                                
                                'name' : "default_map",
                                'bus' : "AXI",
                                'addressUnit' : "8",
                                'offset' : "0",
                                'address' : "0x00",
                                'endaddress' : "0x1F",
                                'size' : "32",
                                
                        }
                },
                
                'variants' :
                {
                        
                        'none' :
                        {
                                'type' : 'variant',
                                
                                'name' : "none",
                                'isselected' : "true",
                                
                                'doc' : "'none' variant states including all templates which are not assigned any    variant property."
                        }
                }
                
        },
        'block1' :
        {
                'type' : 'block',
                
                'name' : "block1",
                'hdl_path' : "block1_idsinst",
                'abs_hdl_path' : "chip_name_ids.block1_idsinst",
                'coverage' : "on",
                'max_reg_size' : "32",
                'offset' : "0",
                'address' : "0x00",
                'endaddress' : "0xB",
                'size' : "12",
                'config' :
                {
                        'type' : 'config',
                        
                        'busdomains' :
                        {
                                
                                'default_map' :
                                {
                                        'type' : 'busdomain',
                                        
                                        'name' : "default_map",
                                        'bus' : "AXI",
                                        'addressUnit' : "8",
                                        'offset' : "0",
                                        'address' : "0x00",
                                        'endaddress' : "0xB",
                                        'size' : "12",
                                        
                                }
                        },
                        
                },
                'reg1' :
                {
                        'type' : 'reg',
                        
                        'name' : "reg1",
                        'hdl_path' : "reg1",
                        'abs_hdl_path' : "chip_name_ids.block1_idsinst.reg1",
                        'coverage' : "on",
                        'offset' : "0",
                        'address' : "0x00",
                        'endaddress' : "0x3",
                        'size' : "4",
                        'default' : "0x00000000",
                        'sw' : "rw",
                        'hw' : "rw",
                        'config' :
                        {
                                'type' : 'config',
                                
                                'regwidth' : "32",
                                'busdomains' :
                                {
                                        
                                        'default_map' :
                                        {
                                                'type' : 'busdomain',
                                                
                                                'name' : "default_map",
                                                'bus' : "AXI",
                                                'addressUnit' : "8",
                                                'offset' : "0",
                                                'address' : "0x00",
                                                'endaddress' : "0x3",
                                                'size' : "4",
                                                
                                        }
                                },
                                
                        },
                        'fld' :
                        {
                                'type' : 'field',
                                
                                'offset' : "31:0",
                                'name' : "fld",
                                'hdl_path' : "_fld_q",
                                'abs_hdl_path' : "chip_name_ids.block1_idsinst.reg1_fld_q",
                                'doc' : "                illegal_bins b_x = {1,2};                illegal_bins b_x = {1,2};             ",
                                
                                'sw' : "rw",
                                
                                'hw' : "rw",
                                'default' : "0x0"
                        }
                },
                'reggroup1' :
                {
                        'type' : 'section',
                        
                        'name' : "reggroup1",
                        'keypathdown' : "reggroup1.reg1.reg2,reg1,reg2",
                        'coverage' : "on",
                        'max_reg_size' : "32",
                        'offset' : "4",
                        'address' : "0x04",
                        'endaddress' : "0xB",
                        'size' : "8",
                        'config' :
                        {
                                'type' : 'config',
                                
                                'busdomains' :
                                {
                                        
                                        'default_map' :
                                        {
                                                'type' : 'busdomain',
                                                
                                                'name' : "default_map",
                                                'bus' : "AXI",
                                                'addressUnit' : "8",
                                                'offset' : "4",
                                                'address' : "0x04",
                                                'endaddress' : "0xB",
                                                'size' : "8",
                                                
                                        }
                                },
                                
                        },
                        'reg1' :
                        {
                                'type' : 'reg',
                                
                                'name' : "reg1",
                                'hdl_path' : "reggroup1_reg1",
                                'abs_hdl_path' : "chip_name_ids.block1_idsinst.reggroup1_reg1",
                                'coverage' : "on",
                                'offset' : "0",
                                'address' : "0x04",
                                'endaddress' : "0x7",
                                'size' : "4",
                                'default' : "0x00000000",
                                'sw' : "rw",
                                'hw' : "rw",
                                'config' :
                                {
                                        'type' : 'config',
                                        
                                        'regwidth' : "32",
                                        'busdomains' :
                                        {
                                                
                                                'default_map' :
                                                {
                                                        'type' : 'busdomain',
                                                        
                                                        'name' : "default_map",
                                                        'bus' : "AXI",
                                                        'addressUnit' : "8",
                                                        'offset' : "0",
                                                        'address' : "0x04",
                                                        'endaddress' : "0x7",
                                                        'size' : "4",
                                                        
                                                }
                                        },
                                        
                                },
                                'fld' :
                                {
                                        'type' : 'field',
                                        
                                        'offset' : "31:0",
                                        'name' : "fld",
                                        'hdl_path' : "_fld_q",
                                        'abs_hdl_path' : "chip_name_ids.block1_idsinst.reggroup1_reg1_fld_q",
                                        'doc' : "                   illegal_bins b_x = {1,2};                   illegal_bins b_x = {1,2};                ",
                                        
                                        'sw' : "rw",
                                        
                                        'hw' : "rw",
                                        'default' : "0x0"
                                }
                        },
                        'reg2' :
                        {
                                'type' : 'reg',
                                
                                'name' : "reg2",
                                'hdl_path' : "reggroup1_reg2",
                                'abs_hdl_path' : "chip_name_ids.block1_idsinst.reggroup1_reg2",
                                'coverage' : "on",
                                'offset' : "4",
                                'address' : "0x08",
                                'endaddress' : "0xB",
                                'size' : "4",
                                'default' : "0x00000000",
                                'sw' : "rw",
                                'hw' : "rw",
                                'config' :
                                {
                                        'type' : 'config',
                                        
                                        'regwidth' : "32",
                                        'busdomains' :
                                        {
                                                
                                                'default_map' :
                                                {
                                                        'type' : 'busdomain',
                                                        
                                                        'name' : "default_map",
                                                        'bus' : "AXI",
                                                        'addressUnit' : "8",
                                                        'offset' : "4",
                                                        'address' : "0x08",
                                                        'endaddress' : "0xB",
                                                        'size' : "4",
                                                        
                                                }
                                        },
                                        
                                },
                                'fld1' :
                                {
                                        'type' : 'field',
                                        
                                        'offset' : "31:0",
                                        'name' : "fld1",
                                        'hdl_path' : "_fld1_q",
                                        'abs_hdl_path' : "chip_name_ids.block1_idsinst.reggroup1_reg2_fld1_q",
                                        'doc' : "                   illegal_bins b_x = {1,2};                   illegal_bins b_x = {1,2};                ",
                                        
                                        'sw' : "rw",
                                        
                                        'hw' : "rw",
                                        'default' : "0x0"
                                }
                        }
                }
        },
        'block2' :
        {
                'type' : 'block',
                
                'name' : "block2",
                'hdl_path' : "block2_idsinst",
                'abs_hdl_path' : "chip_name_ids.block2_idsinst",
                'coverage' : "on",
                'offset' : "12",
                'address' : "0x0C",
                'endaddress' : "0x1F",
                'size' : "20",
                'config' :
                {
                        'type' : 'config',
                        
                        'busdomains' :
                        {
                                
                                'default_map' :
                                {
                                        'type' : 'busdomain',
                                        
                                        'name' : "default_map",
                                        'bus' : "AXI",
                                        'addressUnit' : "8",
                                        'offset' : "12",
                                        'address' : "0x0C",
                                        'endaddress' : "0x1F",
                                        'size' : "20",
                                        
                                }
                        },
                        
                },
                'reggroup1' :
                {
                        'type' : 'section',
                        
                        'name' : "reggroup1",
                        'keypathdown' : "reggroup1.reg1.reg2,reg1,reg2",
                        'coverage' : "on",
                        'max_reg_size' : "32",
                        'offset' : "0",
                        'address' : "0x0C",
                        'endaddress' : "0x13",
                        'size' : "8",
                        'config' :
                        {
                                'type' : 'config',
                                
                                'busdomains' :
                                {
                                        
                                        'default_map' :
                                        {
                                                'type' : 'busdomain',
                                                
                                                'name' : "default_map",
                                                'bus' : "AXI",
                                                'addressUnit' : "8",
                                                'offset' : "0",
                                                'address' : "0x0C",
                                                'endaddress' : "0x13",
                                                'size' : "8",
                                                
                                        }
                                },
                                
                        },
                        'reg1' :
                        {
                                'type' : 'reg',
                                
                                'name' : "reg1",
                                'hdl_path' : "reggroup1_reg1",
                                'abs_hdl_path' : "chip_name_ids.block2_idsinst.reggroup1_reg1",
                                'coverage' : "on",
                                'offset' : "0",
                                'address' : "0x0C",
                                'endaddress' : "0xF",
                                'size' : "4",
                                'default' : "0x00000000",
                                'sw' : "rw",
                                'hw' : "rw",
                                'config' :
                                {
                                        'type' : 'config',
                                        
                                        'regwidth' : "32",
                                        'busdomains' :
                                        {
                                                
                                                'default_map' :
                                                {
                                                        'type' : 'busdomain',
                                                        
                                                        'name' : "default_map",
                                                        'bus' : "AXI",
                                                        'addressUnit' : "8",
                                                        'offset' : "0",
                                                        'address' : "0x0C",
                                                        'endaddress' : "0xF",
                                                        'size' : "4",
                                                        
                                                }
                                        },
                                        
                                },
                                'fld' :
                                {
                                        'type' : 'field',
                                        
                                        'offset' : "31:0",
                                        'name' : "fld",
                                        'hdl_path' : "_fld_q",
                                        'abs_hdl_path' : "chip_name_ids.block2_idsinst.reggroup1_reg1_fld_q",
                                        'doc' : "                   illegal_bins b_x = {1,2};                   illegal_bins b_x = {1,2};                ",
                                        
                                        'sw' : "rw",
                                        
                                        'hw' : "rw",
                                        'default' : "0x0"
                                }
                        },
                        'reg2' :
                        {
                                'type' : 'reg',
                                
                                'name' : "reg2",
                                'hdl_path' : "reggroup1_reg2",
                                'abs_hdl_path' : "chip_name_ids.block2_idsinst.reggroup1_reg2",
                                'coverage' : "on",
                                'offset' : "4",
                                'address' : "0x10",
                                'endaddress' : "0x13",
                                'size' : "4",
                                'default' : "0x00000000",
                                'sw' : "rw",
                                'hw' : "rw",
                                'config' :
                                {
                                        'type' : 'config',
                                        
                                        'regwidth' : "32",
                                        'busdomains' :
                                        {
                                                
                                                'default_map' :
                                                {
                                                        'type' : 'busdomain',
                                                        
                                                        'name' : "default_map",
                                                        'bus' : "AXI",
                                                        'addressUnit' : "8",
                                                        'offset' : "4",
                                                        'address' : "0x10",
                                                        'endaddress' : "0x13",
                                                        'size' : "4",
                                                        
                                                }
                                        },
                                        
                                },
                                'fld1' :
                                {
                                        'type' : 'field',
                                        
                                        'offset' : "31:0",
                                        'name' : "fld1",
                                        'hdl_path' : "_fld1_q",
                                        'abs_hdl_path' : "chip_name_ids.block2_idsinst.reggroup1_reg2_fld1_q",
                                        'doc' : "                   illegal_bins b_x = {1,2};                   illegal_bins b_x = {1,2};                ",
                                        
                                        'sw' : "rw",
                                        
                                        'hw' : "rw",
                                        'default' : "0x0"
                                }
                        }
                },
                'ref_name' :
                {
                        'type' : 'section',
                        
                        'name' : "ref_name",
                        'link' : "block1",
                        'node_type' : "subblock",
                        'refnodetype' : "section",
                        'keypathdown' : "ref_name.reg1.reggroup1.reg1.reg2,reg1,reggroup1.reg1.reg2,reg1,reg2",
                        'coverage' : "on",
                        'max_reg_size' : "32",
                        'offset' : "8",
                        'address' : "0x14",
                        'endaddress' : "0x1F",
                        'size' : "12",
                        'config' :
                        {
                                'type' : 'config',
                                
                                'busdomains' :
                                {
                                        
                                        'default_map' :
                                        {
                                                'type' : 'busdomain',
                                                
                                                'name' : "default_map",
                                                'bus' : "AXI",
                                                'addressUnit' : "8",
                                                'offset' : "8",
                                                'address' : "0x14",
                                                'endaddress' : "0x1F",
                                                'size' : "12",
                                                
                                        }
                                },
                                
                        },
                        'reg1' :
                        {
                                'type' : 'reg',
                                
                                'name' : "reg1",
                                'hdl_path' : "ref_name_reg1",
                                'abs_hdl_path' : "chip_name_ids.block2_idsinst.ref_name_reg1",
                                'coverage' : "on",
                                'offset' : "0",
                                'address' : "0x14",
                                'endaddress' : "0x17",
                                'size' : "4",
                                'default' : "0x00000000",
                                'sw' : "rw",
                                'hw' : "rw",
                                'config' :
                                {
                                        'type' : 'config',
                                        
                                        'regwidth' : "32",
                                        'busdomains' :
                                        {
                                                
                                                'default_map' :
                                                {
                                                        'type' : 'busdomain',
                                                        
                                                        'name' : "default_map",
                                                        'bus' : "AXI",
                                                        'addressUnit' : "8",
                                                        'offset' : "0",
                                                        'address' : "0x14",
                                                        'endaddress' : "0x17",
                                                        'size' : "4",
                                                        
                                                }
                                        },
                                        
                                },
                                'fld' :
                                {
                                        'type' : 'field',
                                        
                                        'offset' : "31:0",
                                        'name' : "fld",
                                        'hdl_path' : "_fld_q",
                                        'abs_hdl_path' : "chip_name_ids.block2_idsinst.ref_name_reg1_fld_q",
                                        'doc' : "                   illegal_bins b_x = {1,2};                   illegal_bins b_x = {1,2};                ",
                                        
                                        'sw' : "rw",
                                        
                                        'hw' : "rw",
                                        'default' : "0x0"
                                }
                        },
                        'reggroup1' :
                        {
                                'type' : 'section',
                                
                                'name' : "reggroup1",
                                'keypathdown' : "reggroup1.reg1.reg2,reg1,reg2",
                                'coverage' : "on",
                                'max_reg_size' : "32",
                                'offset' : "4",
                                'address' : "0x18",
                                'endaddress' : "0x1F",
                                'size' : "8",
                                'context' : "ref_name",
                                'config' :
                                {
                                        'type' : 'config',
                                        
                                        'busdomains' :
                                        {
                                                
                                                'default_map' :
                                                {
                                                        'type' : 'busdomain',
                                                        
                                                        'name' : "default_map",
                                                        'bus' : "AXI",
                                                        'addressUnit' : "8",
                                                        'offset' : "4",
                                                        'address' : "0x18",
                                                        'endaddress' : "0x1F",
                                                        'size' : "8",
                                                        
                                                }
                                        },
                                        
                                },
                                'reg1' :
                                {
                                        'type' : 'reg',
                                        
                                        'name' : "reg1",
                                        'hdl_path' : "reggroup1_reg1",
                                        'abs_hdl_path' : "chip_name_ids.block2_idsinst.reggroup1_reg1",
                                        'coverage' : "on",
                                        'offset' : "0",
                                        'address' : "0x18",
                                        'endaddress' : "0x1B",
                                        'size' : "4",
                                        'default' : "0x00000000",
                                        'sw' : "rw",
                                        'hw' : "rw",
                                        'config' :
                                        {
                                                'type' : 'config',
                                                
                                                'regwidth' : "32",
                                                'busdomains' :
                                                {
                                                        
                                                        'default_map' :
                                                        {
                                                                'type' : 'busdomain',
                                                                
                                                                'name' : "default_map",
                                                                'bus' : "AXI",
                                                                'addressUnit' : "8",
                                                                'offset' : "0",
                                                                'address' : "0x18",
                                                                'endaddress' : "0x1B",
                                                                'size' : "4",
                                                                
                                                        }
                                                },
                                                
                                        },
                                        'fld' :
                                        {
                                                'type' : 'field',
                                                
                                                'offset' : "31:0",
                                                'name' : "fld",
                                                'hdl_path' : "_fld_q",
                                                'abs_hdl_path' : "chip_name_ids.block2_idsinst.reggroup1_reg1_fld_q",
                                                'doc' : "                      illegal_bins b_x = {1,2};                      illegal_bins b_x = {1,2};                   ",
                                                
                                                'sw' : "rw",
                                                
                                                'hw' : "rw",
                                                'default' : "0x0"
                                        }
                                },
                                'reg2' :
                                {
                                        'type' : 'reg',
                                        
                                        'name' : "reg2",
                                        'hdl_path' : "reggroup1_reg2",
                                        'abs_hdl_path' : "chip_name_ids.block2_idsinst.reggroup1_reg2",
                                        'coverage' : "on",
                                        'offset' : "4",
                                        'address' : "0x1C",
                                        'endaddress' : "0x1F",
                                        'size' : "4",
                                        'default' : "0x00000000",
                                        'sw' : "rw",
                                        'hw' : "rw",
                                        'config' :
                                        {
                                                'type' : 'config',
                                                
                                                'regwidth' : "32",
                                                'busdomains' :
                                                {
                                                        
                                                        'default_map' :
                                                        {
                                                                'type' : 'busdomain',
                                                                
                                                                'name' : "default_map",
                                                                'bus' : "AXI",
                                                                'addressUnit' : "8",
                                                                'offset' : "4",
                                                                'address' : "0x1C",
                                                                'endaddress' : "0x1F",
                                                                'size' : "4",
                                                                
                                                        }
                                                },
                                                
                                        },
                                        'fld1' :
                                        {
                                                'type' : 'field',
                                                
                                                'offset' : "31:0",
                                                'name' : "fld1",
                                                'hdl_path' : "_fld1_q",
                                                'abs_hdl_path' : "chip_name_ids.block2_idsinst.reggroup1_reg2_fld1_q",
                                                'doc' : "                      illegal_bins b_x = {1,2};                      illegal_bins b_x = {1,2};                   ",
                                                
                                                'sw' : "rw",
                                                
                                                'hw' : "rw",
                                                'default' : "0x0"
                                        }
                                }
                        }
                }
        }
}

};
        

    