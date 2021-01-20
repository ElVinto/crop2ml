#'Test generation'

from preciprec import *
from math import *
import numpy 



def test_test_snow1():
    params= preciprec(
    Sdepth = 0.279,
    Sdepth_t1 = 0.279,
    Mrf = 91.2,
    Snowaccu = 91.2,
    precip = 91.2,
    Sdry_t1 = 0.279,
    Sdry = 0.279,
    Swet = 0.279,
    Swet_t1 = 0.279,
     )
    preciprec_estimated = round(params, 2)
    preciprec_computed = 45.6
    assert (preciprec_estimated == preciprec_computed)