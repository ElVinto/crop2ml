#'Test generation'

from snowwet import *
from math import *
import numpy 



def test_test_snow1():
    params= snowwet(
    M = 91.2,
    Mrf = 91.2,
    Snowaccu = 91.2,
    precip = 91.2,
    Swet_t1 = 0.279,
    Sdry = 0.279,
     )
    Swet_estimated = round(params, 2)
    Swet_computed = 45.6
    assert (Swet_estimated == Swet_computed)