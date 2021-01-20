#'Test generation'

from snowmelt import *
from math import *
import numpy 



def test_test_snow1():
    params= snowmelt(
    M = 91.2,
    ps = 91.2,
     )
    Snowmelt_estimated = round(params, 2)
    Snowmelt_computed = 45.6
    assert (Snowmelt_estimated == Snowmelt_computed)