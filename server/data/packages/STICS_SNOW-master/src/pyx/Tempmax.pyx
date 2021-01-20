import numpy 
from math import *
def model_tempmax(float Sdepth_cm=0.0,
                  float P_prof=0.0,
                  float tmax=0.0,
                  float P_tminseuil=0.0,
                  float P_tmaxseuil=0.0):
    """

    Maximum temperature  recalculation
    Author: STICS
    Reference: -
    Institution: INRA
    Abstract: -

    """
    cdef float tmaxrec
    tmaxrec=tmax
    if (Sdepth_cm  > P_prof):
        if(tmax  < P_tminseuil):
            tmaxrec=P_tminseuil
        else:
            if (tmax  > P_tmaxseuil):
                tmaxrec=P_tmaxseuil
    else:
        if (Sdepth_cm  > 0.0):
            if (tmax  <= 0.0):
                tmaxrec=P_tmaxseuil-(1-(Sdepth_cm/P_prof))*(-tmax)
            else:
                tmaxrec=0.0
    return  tmaxrec
