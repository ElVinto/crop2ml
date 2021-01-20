import numpy 
from math import *
def model_snowaccumulation(float P_tsmax=0.0,
                           float tmax=0.0,
                           float P_trmax=0.0,
                           float precip=0.0):
    """

    snowfall accumulation  calculation
    Author: STICS
    Reference: -
    Institution: INRA
    Abstract: -

    """
    cdef float Snowaccu
    # Snow accumulation (unit cm)
    cdef float fs=0.0
    Snowaccu=0.0
    if (tmax < P_tsmax): fs=1.0
    if ((tmax >= P_tsmax) and (tmax  <= P_trmax)):
        fs=(P_trmax-tmax)/(P_trmax-P_tsmax)
    Snowaccu=fs*precip 
    return  Snowaccu
