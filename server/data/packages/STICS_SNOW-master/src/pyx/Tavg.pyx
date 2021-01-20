import numpy 
from math import *
def model_tavg(float tmin=0.0,
               float tmax=0.0):
    """

    Mean temperature  calculation
    Author: STICS
    Reference: -
    Institution: INRA
    Abstract: -

    """
    cdef float tavg
    tavg = (tmin + tmax)/2
    return  tavg
