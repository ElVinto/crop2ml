import numpy 
from math import *
def model_melting(int jul=0,
                  float P_Tmf=0.5,
                  float P_DKmax=0.0,
                  float P_Kmin=0.0,
                  float tavg=0.0):
    """

    snow in the process of melting
    Author: STICS
    Reference: -
    Institution: INRA
    Abstract: -

    """
    cdef float M
    # M calculation
    cdef float K
    M = 0.0
    K=(P_DKmax/2.0)*(-sin((2.0*pi*float(jul)/366.0)+(9.0/16.0)*pi)) +P_Kmin+(P_DKmax/2.0)
    if ( tavg  > P_Tmf ): 
        M = K * ( tavg - P_Tmf )
    return  M
