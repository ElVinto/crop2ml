#'Test generation'

from melting import *
from math import *
import numpy 



def test_test_snow1():
    params= melting(
    P_Tmf = 0.5,
    P_DKmax = 1.5,
    P_Kmin = 2.0,
    tavg = -0.5,
    jul = 1,
     )
    M_estimated = round(params, 2)
    M_computed = 45.6
    assert (M_estimated == M_computed)