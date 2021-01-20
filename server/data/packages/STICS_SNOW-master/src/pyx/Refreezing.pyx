import numpy 
from math import *
def model_refreezing(float tavg=0.0,
                     float P_Tmf=0.0,
                     float P_SWrf=0.0):
    """

    snowfall accumulation  calculation
    Author: STICS
    Reference: -
    Institution: INRA
    Abstract: -

    """
    cdef float Mrf
    # Mrf calculation
    Mrf=0.0
    if ( tavg  < P_Tmf ): 
        Mrf = P_SWrf * ( P_Tmf - tavg )
    return  Mrf
