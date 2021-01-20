import numpy 
from math import *
def model_snowmelt(float ps=0.0,
                   float M=0.0):
    """

    Snow Melt
    Author: STICS
    Reference: -
    Institution: INRA
    Abstract: -

    """
    cdef float Snowmelt
    # Snow melt calculation
    Snowmelt=0.0
    if( ps  > 1e-8 ):
        Snowmelt = M  / ps
    return  Snowmelt
