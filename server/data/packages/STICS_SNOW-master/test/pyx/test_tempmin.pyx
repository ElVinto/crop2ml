#'Test generation'

from tempmin import *
from math import *
import numpy 



def test_test_snow1():
    params= tempmin(
    P_prof = 10.0,
    P_tminseuil = -0.5,
    P_tmaxseuil = 0.0,
    Sdepth_cm = 91.2,
    tmin = 0.279,
     )
    tminrec_estimated = round(params, 2)
    tminrec_computed = 45.6
    assert (tminrec_estimated == tminrec_computed)