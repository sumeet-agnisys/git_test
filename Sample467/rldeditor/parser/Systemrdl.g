grammar Systemrdl;
options {
  language=JavaScript;
    output=AST;
    ASTLabelType=CommonTree;
   // tokenVocab = PropertyTokens;
}
tokens {
    ARRAY;
    COMPONENT_DEF;
    PROPERTY;
    NULL;
    RESET;
    ADDR;
    ADDRINC;
    ADDRMOD;
    INSTANCE;
    NAME_ID;
    COMPTYPE;
    DETAILS;
    COUNT;
    INSTANCE_REF_ELEM;
    PROP;
    ENUM;
    ENUM_MNEMONIC;
    INSTANCEREF;
    EXTERNAL;
    ALIAS;
    PARAM;
   PARAM_MNEMONIC;
    PROPERTY_TYPE;
   PROPERTY_COMPONENT;
   DEFAULTPROP;
}












//root 	: (
//           enum_def
//          )*
//        ;

root 	: (
            enum_def
           | c=component_def //{ System.out.println(" component_def = " + $c.text);}
             //-> ^(COMPONENT $c)?
           )* EOF
        ;

component_type :
      'addrmap'
    | 'regfile'
    | 'reg'
    | 'field'
    | 'signal'
    | 'property'


    ;

 user_defined_properties
: property_type property_component
;

property_type
 :'type'
     EQ ID
     SEMI
;
property_com_type
    : component_type ('|' component_type)*
//: ( ( 'addrmap' )? ( '|' )? ( 'regfile' )? ( '|' )? ( 'reg' )? ( '|' )? ( 'field' )? )
;
property_component
  : 'component'
   EQ  property_com_type

  SEMI
;

component_def
  : t=component_type

   (id)?
   LBRACE
      comp+=comps*

    RBRACE
    ( anon=anonymous_component_inst_elems )?                                    //{System.out.println("anonymous_component_inst_elems = " + $anon.text);}

 SEMI

  

  ;

comps 	:	component_def
      | explicit_component_inst                                          //{ System.out.println("explicit_component_inst = " + $ex.text);}
      | property_assign                                                      //{ System.out.println("property_assign = " + $p.text);}
      | enum_def
      | param_def
      | user_defined_properties
      ;

param_def
  :
    param_body
      
  ;

param_body
  :
  (param_entry)+
  ;
param_entry
  : 'parameter' ID
     EQ num
     SEMI
  ;
/*
component_def
  : t=component_type
   (id)?
    LBRACE
      (
        comp+=component_def
      | ex+=explicit_component_inst                                             //{ System.out.println("explicit_component_inst = " + $ex.text);}
      | p+=property_assign                                                      //{ System.out.println("property_assign = " + $p.text);}
      | en+=enum_def                                                            //{ System.out.println("enum_def = " + $en.text);}
      )*
    RBRACE
    ( anon=anonymous_component_inst_elems )?                                    //{System.out.println("anonymous_component_inst_elems = " + $anon.text);}
    SEMI

//    -> ^(COMPONENT_DEF ^(COMPTYPE $t) ^(NAME_ID id)? $comp* $p* $ex* $en* $anon*)
    -> ^(COMPONENT_DEF ^(COMPTYPE $t) ^(NAME_ID id)?  $p* $ex* $en* $comp* $anon*)
  ;
*/

explicit_component_inst
  : (exter= 'external' )?
    (inter= 'internal' )?
    (alias= 'alias' id)?
    id
    component_inst_elem
    (COMMA component_inst_elem)*

    SEMI
   // {System.out.println(" FOUND explicit instance");}
  
  ;

anonymous_component_inst_elems
  : (exter='external')?
    component_inst_elem
    (COMMA component_inst_elem)*
  //  {System.out.println(" FOUND annonymous instance");}
  
  ;

property_assign
  : default_property_assign SEMI!
  | explicit_property_assign SEMI!
  | post_property_assign SEMI!

  ;

default_property_assign
  : def='default'
    explicit_property_assign 
  ;

explicit_property_assign
  : (nons = 'nonsticky')? mod=property_modifier
    property                  
  | property
    ( EQ val=property_assign_rhs )?
  ;

post_property_assign
  : instance_ref
    ( EQ property_assign_rhs )
  ;

property_assign_rhs
  : property_rvalue_constant
  | 'enum' enum_body
  | instance_ref
  | concat
  ;

property_rvalue_constant
  : 'true'
  | 'false'

  | 'rw'
  | 'wr'
  | 'r'
  | 'w'
  | 'na'
  | 'w1t' //add for duolog format(Sandisk)

  | 'compact'
  | 'regalign'
  | 'fullalign'

  | 'hw'
  | 'sw'

  | num
  | str
  ;


concat
  : LBRACE
    concat_elem
    (COMMA concat_elem)*
    RBRACE     // { System.out.println(" FOUND concat");}
  ;

concat_elem
  : instance_ref
  | num
  ;

property
  : 'name'
  | 'desc'
  | 'arbiter'
  | 'rset'
  | 'rclr'
  | 'woclr'
  | 'woset'

  | 'we'
  | 'wel'

  | 'swwe'
  | 'swwel'

  | 'hwset'
  | 'hwclr'

  | 'swmod'
  | 'swacc'

  | 'sticky'
  | 'stickybit'
  | 'intr'

  | 'anded'
  | 'ored'
  | 'xored'

  | 'counter'
  | 'overflow'

  | 'sharedextbus'
  | 'errextbus'

  | 'reset'

  | 'littleendian'
  | 'bigendian'
  | 'rsvdset'
  | 'rsvdsetX'
  | 'bridge'
  | 'shared'
  | 'msb0'
  | 'lsb0'
  | 'sync'
  | 'async'
  | 'cpuif_reset'
  | 'field_reset'
  | 'activehigh'
  | 'activelow'
  | 'singlepulse'
  | 'underflow'

  | 'incr'
  | 'decr'

  | 'incrwidth'
  | 'decrwidth'

  | 'incrvalue'
  | 'decrvalue'

  | 'saturate'
  | 'decrsaturate'

  | 'threshold'
  | 'decrthreshold'

  | 'dontcompare'
  | 'donttest'
  | 'internal'

  | 'alignment'
  | 'regwidth'
  | 'fieldwidth'
  | 'signalwidth'
  | 'accesswidth'


  | 'sw'
  | 'hw'
  | 'addressing'
  | 'precedence'

  | 'encode'
  | 'resetsignal'
  | 'clock'

  | 'mask'
  | 'enable'

  | 'hwenable'
  | 'hwmask'

  | 'haltmask'
  | 'haltenable'


  | 'halt'

  | 'next'

  | id //user defined properties...

  ;
    //| PROPERTY

property_modifier
  : 'posedge'
  | 'negedge'
  | 'bothedge'
  | 'level'
  | 'nonsticky'
  ;

component_inst_elem
  : id
    (array)?
    (EQ  reset=num)?   // reset
    (AT  addr=num)?   // address
    (INC addrinc=num)? //addr inc
    (MOD addrmod=num)?  //addr mod
   
  ;

array
  : LSQ one=array_data
    (COLON two=num)?
    RSQ -> ^(ARRAY $one $two?)

  ;

instance_ref
  : a=instance_ref_elem
    (DOT b=instance_ref_elem)*
    ( DREF property )?    
  ;
array_data:
       ID | num
;
enum_def
  : 'enum' ID
    enum_body
    SEMI
  ;

instance_ref_elem
  : id
    (LSQ num RSQ)?
    //-> (INSTANCE_REF_ELEM ^(NAME id) ^(COUNT num)?)
  ;



//  //
enum_body
  : LBRACE!
  (enum_entry)*
   RBRACE!
  ;


enum_entry
  : ID
     EQ num
    ( LBRACE (enum_property_assign)* RBRACE )?
    SEMI
  ;



enum_property_assign
  : (
      'name'
    | 'desc'
    )
    EQ! str
    SEMI!
  ;

num
  : NUM
  ;

str
  : STRING
  ;

id 	:	 ID;

// lexer rules

protected VNUM
  : '\'' ( 'b' ('0' | '1' | '_')+
         | 'd' ('0'..'9' | '_')+
         | 'o' ('0'..'7' | '_')+
         | 'h' ('0'..'9' | 'a'..'f' | 'A'..'F' | '_')+
         )
  ;

NUM
  : ('0'..'9')* (VNUM | ('0'..'9'))
  | '0x' ('0'..'9' | 'a'..'f' | 'A'..'F')+
  ;



ID  :	('a'..'z'|'A'..'Z'|'_') ('a'..'z'|'A'..'Z'|'0'..'9'|'_')*
    ;

//INT :	'0'..'9'+
//    ;

FLOAT
    :   ('0'..'9')+ '.' ('0'..'9')* EXPONENT?
    |   '.' ('0'..'9')+ EXPONENT?
    |   ('0'..'9')+ EXPONENT
    ;

COMMENT
    :   '//' ~('\n'|'\r')* '\r'? '\n' {$channel=HIDDEN;}
    |   '/*' ( options {greedy=false;} : . )* '*/' {$channel=HIDDEN;}
    ;

WS  :   ( ' '
        | '\t'
        | '\r'
        | '\n'
        ) {$channel=HIDDEN;}
    ;

STRING
    :  '"' ( ESC_SEQ | ~('\\'|'"') )* '"'
    ;

CHAR:  '\'' ( ESC_SEQ | ~('\''|'\\') ) '\''
    ;

fragment
EXPONENT : ('e'|'E') ('+'|'-')? ('0'..'9')+ ;

fragment
HEX_DIGIT : ('0'..'9'|'a'..'f'|'A'..'F') ;

fragment
ESC_SEQ
    :   '\\' ('b'|'t'|'n'|'f'|'r'|'\"'|'\''|'\\')
    |   UNICODE_ESC
    |   OCTAL_ESC
    ;

fragment
OCTAL_ESC
    :   '\\' ('0'..'3') ('0'..'7') ('0'..'7')
    |   '\\' ('0'..'7') ('0'..'7')
    |   '\\' ('0'..'7')
    ;

fragment
UNICODE_ESC
    :   '\\' 'u' HEX_DIGIT HEX_DIGIT HEX_DIGIT 
    ;
LBRACE : '{' ;
RBRACE : '}' ;
LSQ    : '[' ;
RSQ    : ']' ;

LPAREN : '(' ;
RPAREN : ')' ;

AT     : '@' ;
OR     : '|' ;
SEMI   : ';' ;
COLON  : ':' ;
COMMA  : ',' ;
DOT    : '.' ;

DREF   : '->';

EQ     : '=' ;
INC    : '+=';
MOD    : '%=';
