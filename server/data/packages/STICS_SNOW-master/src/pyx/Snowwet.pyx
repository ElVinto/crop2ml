import numpy 
from math import *
def model_snowwet(float Swet_t1=0.0,
                  float precip=0.0,
                  float Snowaccu=0.0,
                  float Mrf=0.0,
                  float M=0.0,
                  float Sdry=0.0):
    """

    water in liquid state in the snow cover calculation
    Author: STICS
    Reference: -
    Institution: INRA
    Abstract: -

    """
    cdef float Swet
    cdef float frac_sdry, tmp_swet
    Swet=0.0
    if (Mrf  <= Swet_t1) :
        tmp_swet=Swet_t1+(precip-Snowaccu)+M-Mrf
        frac_sdry=0.1*Sdry
        if (tmp_swet  < frac_sdry):
            Swet=tmp_swet
        else:
            Swet=frac_sdry
    return  Swet
