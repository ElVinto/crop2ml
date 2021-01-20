#'Test generation'

from refreezing import *
from math import *
import numpy 



def test_test_snow1():
    params= refreezing(
    P_Tmf = 0.5,
    P_SWrf = 0.01,
    tavg = 0.279,
     )
    Mrf_estimated = round(params, 2)
    Mrf_computed = 45.6
    assert (Mrf_estimated == Mrf_computed)