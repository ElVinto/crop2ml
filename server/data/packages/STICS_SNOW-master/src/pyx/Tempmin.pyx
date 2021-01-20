import numpy 
from math import *
def model_tempmin(float Sdepth_cm=0.0,
                  float P_prof=0.0,
                  float tmin=0.0,
                  float P_tminseuil=0.0,
                  float P_tmaxseuil=0.0):
    """

    Minimum temperature  calculation
    Author: STICS
    Reference: -
    Institution: INRA
    Abstract: -

    """
    cdef float tminrec
    tminrec=tmin
    if (Sdepth_cm  > P_prof):
        if(tmin  < P_tminseuil):
            tminrec=P_tminseuil
        else:
            if (tmin  > P_tmaxseuil):
                tminrec=P_tmaxseuil
    else:
        if (Sdepth_cm  > 0.0) :
            tminrec=P_tminseuil-(1-(Sdepth_cm/P_prof))*(abs(tmin)+P_tminseuil)
    return  tminrec
