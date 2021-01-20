#'Test generation'

from snowdepth import *
from math import *
import numpy 



def test_test_snow1():
    params= snowdepth(
    P_E = 0.02,
    M = 91.2,
    Snowaccu = 91.2,
    Sdepth_t1 = 91.2,
    Snowmelt = 0.279,
     )
    Sdepth_estimated = round(params, 2)
    Sdepth_computed = 45.6
    assert (Sdepth_estimated == Sdepth_computed)