#'Test generation'

from snowdensity import *
from math import *
import numpy 



def test_test_snow1():
    params= snowdensity(
    Sdry_t1 = 91.2,
    Swet_t1 = 91.2,
    Sdepth_t1 = 91.2,
    ps_t1 = 0.279,
     )
    ps_estimated = round(params, 2)
    ps_computed = 45.6
    assert (ps_estimated == ps_computed)