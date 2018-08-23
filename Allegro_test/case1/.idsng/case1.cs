namespace chip_name
{
    public static class chip_name
    {
        public static  long offset = 0;
        public static class block1
        {
            public static  long offset = 0;
            
            public static class reggroup1
            {
                public static  long offset = 4;
                
                public static class reggroup1_reg1
                {
                    public static  long offset = 0;
                    public static  uint fld;
                }
                public static class reggroup1_reg2
                {
                    public static  long offset = 4;
                    public static  uint fld1;
                }
            }
            public static class reg1
            {
                public static  long offset = 0;
                public static  uint fld;
            }
        }
        public static class block2
        {
            public static  long offset = 12;
            
            public static class reggroup1
            {
                public static  long offset = 0;
                
                public static class reggroup1_reg1
                {
                    public static  long offset = 0;
                    public static  uint fld;
                }
                public static class reggroup1_reg2
                {
                    public static  long offset = 4;
                    public static  uint fld1;
                }
            }
            public class ref_name
            {
                public static  long offset = 8;
                
                public static class ref_name_reg1
                {
                    public static  long offset = 0;
                    public static  uint fld;
                }
                public static class ref_name_ref_name_ref_name_reggroup1
                {
                    public static  long offset = 4;
                    
                    public static class ref_name_ref_name_reggroup1_reg1
                    {
                        public static  long offset = 0;
                        public static  uint fld;
                    }
                    public static class ref_name_ref_name_reggroup1_reg2
                    {
                        public static  long offset = 4;
                        public static  uint fld1;
                    }
                }
            }
            public static ref_name  ref_name_r;
        }
    }
}
