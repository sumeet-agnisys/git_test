<'
import vr_ad/e/vr_ad_top;
//chip 'chip_name'
extend vr_ad_map_kind : [CHIP_NAME_MAP];
//block 'block1'
extend vr_ad_reg_file_kind : [BLOCK1];
extend BLOCK1 vr_ad_reg_file {
   keep size == 12;
   keep addressing_width_in_bytes == 1;
};
//reg 'reg1'
reg_def BLOCK1_REG1 BLOCK1 0x00 {
     //field 'fld'
     reg_fld fld : uint(bits:32) : RW : 00000000000000000000000000000000 : cov ; //[31:0]
};
//reggoup 'reggroup1'
//reg 'reg1'
reg_def BLOCK1_REGGROUP1_REG1 BLOCK1 0x04 {
     //field 'fld'
     reg_fld fld : uint(bits:32) : RW : 00000000000000000000000000000000 : cov ; //[31:0]
};
//reg 'reg2'
reg_def BLOCK1_REGGROUP1_REG2 BLOCK1 0x08 {
     //field 'fld1'
     reg_fld fld1 : uint(bits:32) : RW : 00000000000000000000000000000000 : cov ; //[31:0]
};
//block 'block2'
extend vr_ad_reg_file_kind : [BLOCK2];
extend BLOCK2 vr_ad_reg_file {
   keep size == 20;
   keep addressing_width_in_bytes == 1;
};
//reggoup 'reggroup1'
//reg 'reg1'
reg_def BLOCK2_REGGROUP1_REG1 BLOCK2 0x0C {
     //field 'fld'
     reg_fld fld : uint(bits:32) : RW : 00000000000000000000000000000000 : cov ; //[31:0]
};
//reg 'reg2'
reg_def BLOCK2_REGGROUP1_REG2 BLOCK2 0x10 {
     //field 'fld1'
     reg_fld fld1 : uint(bits:32) : RW : 00000000000000000000000000000000 : cov ; //[31:0]
};
//reggoup 'ref_name'
//reg 'reg1'
reg_def BLOCK2_REF_NAME_REG1 BLOCK2 0x14 {
     //field 'fld'
     reg_fld fld : uint(bits:32) : RW : 00000000000000000000000000000000 : cov ; //[31:0]
};
//reggoup 'reggroup1'
//reg 'reg1'
reg_def BLOCK2_REGGROUP1_REG1 BLOCK2 0x18 {
     //field 'fld'
     reg_fld fld : uint(bits:32) : RW : 00000000000000000000000000000000 : cov ; //[31:0]
};
//reg 'reg2'
reg_def BLOCK2_REGGROUP1_REG2 BLOCK2 0x1C {
     //field 'fld1'
     reg_fld fld1 : uint(bits:32) : RW : 00000000000000000000000000000000 : cov ; //[31:0]
};
extend CHIP_NAME_MAP vr_ad_map {
   block1 : BLOCK1 vr_ad_reg_file ;
   block2 : BLOCK2 vr_ad_reg_file ;
   post_generate() is also {
     add_with_offset (0x00, block1);
     add_with_offset (0x0C, block2);
     block1.reset();
     block2.reset();
  };
};
'>
