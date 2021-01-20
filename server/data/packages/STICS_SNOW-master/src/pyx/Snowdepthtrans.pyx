import numpy 
from math import *
def model_snowdepthtrans(float Sdepth=0.0,
                         float P_Pns=0.0):
    """

    snow cover depth conversion
    Author: STICS
    Reference: -
    Institution: INRA
    Abstract: -

    """
    cdef float Sdepth_cm
    Sdepth_cm=Sdepth*P_Pns
    return  Sdepth_cm
