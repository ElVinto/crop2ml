#'Test generation'

from snowdepthtrans import *
from math import *
import numpy 



def test_test_snow1():
    params= snowdepthtrans(
    P_Pns = 100.0,
    Sdepth = 0.279,
     )
    Sdepth_cm_estimated = round(params, 2)
    Sdepth_cm_computed = 45.6
    assert (Sdepth_cm_estimated == Sdepth_cm_computed)