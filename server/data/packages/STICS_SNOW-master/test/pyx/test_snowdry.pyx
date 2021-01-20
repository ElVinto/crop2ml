#'Test generation'

from snowdry import *
from math import *
import numpy 



def test_test_snow1():
    params= snowdry(
    M = 91.2,
    Mrf = 91.2,
    Snowaccu = 91.2,
    Sdry_t1 = 0.279,
     )
    Sdry_estimated = round(params, 2)
    Sdry_computed = 45.6
    assert (Sdry_estimated == Sdry_computed)