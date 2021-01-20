#'Test generation'

from tempmax import *
from math import *
import numpy 



def test_test_snow1():
    params= tempmax(
    P_prof = 10.0,
    P_tminseuil = -0.5,
    P_tmaxseuil = 0.0,
    Sdepth_cm = 91.2,
    tmax = 0.279,
     )
    tmaxrec_estimated = round(params, 2)
    tmaxrec_computed = 45.6
    assert (tmaxrec_estimated == tmaxrec_computed)