#'Test generation'

from tavg import *
from math import *
import numpy 



def test_test_snow1():
    params= tavg(
    tmin = 91.2,
    tmax = 0.279,
     )
    tavg_estimated = round(params, 2)
    tavg_computed = 45.6
    assert (tavg_estimated == tavg_computed)