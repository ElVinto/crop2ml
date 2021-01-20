import numpy 
from math import *
def model_snowdry(float Sdry_t1=0.0,
                  float Snowaccu=0.0,
                  float Mrf=0.0,
                  float M=0.0):
    """

    water in solid state in the snow cover Calculation
    Author: STICS
    Reference: -
    Institution: INRA
    Abstract: -

    """
    cdef float Sdry
    cdef float tmp_sdry
    Sdry=0.0
    if (M  <= Sdry_t1) :
        tmp_sdry=Snowaccu+Mrf-M+Sdry_t1
        if (tmp_sdry  < 0.0): 
            Sdry=0.001
        else:
            Sdry=tmp_sdry
    return  Sdry
