import numpy 
from math import *
def model_snowdensity(float ps_t1=0.0,
                      float Sdepth_t1=0.0,
                      float Sdry_t1=0.0,
                      float Swet_t1=0.0):
    """

    Density of snow cover calculation
    Author: STICS
    Reference: -
    Institution: INRA
    Abstract: -

    """
    cdef float ps
    # ps calculation
    ps=0.0
    if ( abs(Sdepth_t1)  > 0.0 ):
        if ( abs( Sdry_t1 +  Swet_t1 )  > 0.0 ):
            ps = ( Sdry_t1 +  Swet_t1 )  / Sdepth_t1
        else:
            ps=ps_t1
    return  ps
