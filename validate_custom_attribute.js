// int leading zero allowed
onkeydown="return validateKeypress(event,'P1_ITEM','int',2,true,null);" onpaste="return false;"

// int leading zero blocked
onkeydown="return validateKeypress(event,'P1_ITEM','int',5,false,null);" onpaste="return false;"

// int or zero
onkeydown="return validateKeypress(event,'P1_ITEM','int_or_zero',5,null,null);" onpaste="return false;"

// dec leading zero allowed
onkeydown="return validateKeypress(event,'P1_ITEM','dec',5,2,true);" onpaste="return false;"

// dec leading zero blocked
onkeydown="return validateKeypress(event,'P1_ITEM','dec',6,2,false);" onpaste="return false;"

// month
onkeydown="return validateKeypress(event,'P1_ITEM','month',null,null,null);" onpaste="return false;"

// day
onkeydown="return validateKeypress(event,'P1_ITEM','day',null,null,null);" onpaste="return false;"

// year
onkeydown="return validateKeypress(event,'P1_ITEM','year',null,null,null);" onpaste="return false;"

// hour
onkeydown="return validateKeypress(event,'P1_ITEM','hour',null,null,null);" onpaste="return false;"

// minute_second
onkeydown="return validateKeypress(event,'P1_ITEM','minute_second',null,null,null);" onpaste="return false;"

// char
onkeydown="return validateKeypress(event,'P1_ITEM','char',null,null,null);" onpaste="return false;" style="text-transform:uppercase"

// time
onkeydown="return validateKeypress(event,'P1_ITEM','time',null,null,null);" onpaste="return false;"

// min sec
onkeydown="return validateKeypress(event,'P1_ITEM','min_sec',null,null,null);" onpaste="return false;"

// pct error
onkeydown="return validateKeypress(event,'P1_ITEM','pct_error',null,null,null);" onpaste="return false;"

// comment
onkeydown="return validateKeypress(event,'P1_ITEM','comment',500,null,null);" onpaste="return false;"