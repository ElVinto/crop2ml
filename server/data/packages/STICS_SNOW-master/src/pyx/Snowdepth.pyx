import numpy 
from math import *
def model_snowdepth(float Snowmelt=0.0,
                    float Sdepth_t1=0.0,
                    float Snowaccu=0.0,
                    float P_E=0.0,
                    float M=0.0):
    """

    snow cover depth Calculation
    Author: STICS
    Reference: -
    Institution: INRA
    Abstract: -

    """
    cdef float Sdepth
    # Snow depth calculation
    Sdepth=0.0
    if(Snowmelt  <= (Sdepth_t1+Snowaccu/100)): 
        Sdepth=(Snowaccu/100+Sdepth_t1-Snowmelt-(Sdepth_t1*P_E))
    return  Sdepth
