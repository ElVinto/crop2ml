#'Test generation'

from snowaccumulation import *
from math import *
import numpy 



def test_test_snow1():
    params= snowaccumulation(
    P_trmax = 1.0,
    P_tsmax = -2.0,
    tmax = 0.279,
    precip = 0.279,
     )
    Snowaccu_estimated = round(params, 2)
    Snowaccu_computed = 45.6
    assert (Snowaccu_estimated == Snowaccu_computed)