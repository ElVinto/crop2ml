from datetime import datetime
from math import *
from Melting import model_melting
from Refreezing import model_refreezing
from Snowaccumulation import model_snowaccumulation
from Snowdensity import model_snowdensity
from Snowdepth import model_snowdepth
from Snowdepthtrans import model_snowdepthtrans
from Snowdry import model_snowdry
from Snowmelt import model_snowmelt
from Snowwet import model_snowwet
from Tavg import model_tavg
from Tempmax import model_tempmax
from Tempmin import model_tempmin
from Preciprec import model_preciprec
def model_snow(int jul=0,
      float P_tmaxseuil=0.0,
      float P_tminseuil=0.0,
      float P_prof=0.0,
      float tmin=0.0,
      float tmax=0.0,
      float precip=0.0,
      float Sdry_t1=0.0,
      float P_E=0.0,
      float Sdepth_t1=0.0,
      float P_Pns=0.0,
      float Swet_t1=0.0,
      float P_Kmin=0.0,
      float P_Tmf=0.0,
      float P_SWrf=0.0,
      float P_tsmax=0.0,
      float P_DKmax=0.0,
      float P_trmax=0.0,
      float ps_t1=0.0):
    cdef float tavg
    cdef float M
    cdef float Mrf
    cdef float Snowaccu
    cdef float ps
    cdef float Snowmelt
    cdef float Sdepth
    cdef float Sdepth_cm
    cdef float Sdry
    cdef float Swet
    cdef float tmaxrec
    cdef float tminrec
    cdef float preciprec
    tavg = model_tavg( tmin,tmax)
    Mrf = model_refreezing( tavg,P_Tmf,P_SWrf)
    M = model_melting( jul,P_Tmf,P_DKmax,P_Kmin,tavg)
    ps = model_snowdensity( ps_t1,Sdepth_t1,Sdry_t1,Swet_t1)
    Snowmelt = model_snowmelt( ps,M)
    Snowaccu = model_snowaccumulation( P_tsmax,tmax,P_trmax,precip)
    Sdry = model_snowdry( Sdry_t1,Snowaccu,Mrf,M)
    Swet = model_snowwet( Swet_t1,precip,Snowaccu,Mrf,M,Sdry)
    Sdepth = model_snowdepth( Snowmelt,Sdepth_t1,Snowaccu,P_E,M)
    preciprec = model_preciprec( Sdry_t1,Sdry,Swet,Swet_t1,Sdepth_t1,Sdepth,Mrf,precip,Snowaccu)
    Sdepth_cm = model_snowdepthtrans( Sdepth,P_Pns)
    tmaxrec = model_tempmax( Sdepth_cm,P_prof,tmax,P_tminseuil,P_tmaxseuil)
    tminrec = model_tempmin( Sdepth_cm,P_prof,tmin,P_tminseuil,P_tmaxseuil)
    return tmaxrec, ps, Mrf, tavg, Swet, Snowmelt, Snowaccu, Sdry, Sdepth, tminrec, M, preciprec, Sdepth_cm

def init_snow(int jul=0,
                float P_tmaxseuil=0.0,
                float P_tminseuil=0.0,
                float P_prof=0.0,
                float tmin=0.0,
                float tmax=0.0,
                float precip=0.0,
                float P_E=0.0,
                float P_Pns=0.0,
                float P_Kmin=0.0,
                float P_Tmf=0.0,
                float P_SWrf=0.0,
                float P_tsmax=0.0,
                float P_DKmax=0.0,
                float P_trmax=0.0):

    cdef float tmaxrec = 0.0
    cdef float ps = 0.0
    cdef float Mrf = 0.0
    cdef float tavg = 0.0
    cdef float Swet = 0.0
    cdef float Snowmelt = 0.0
    cdef float Snowaccu = 0.0
    cdef float Sdry = 0.0
    cdef float Sdepth = 0.0
    cdef float tminrec = 0.0
    cdef float M = 0.0
    cdef float preciprec = 0.0
    cdef float Sdepth_cm = 0.0
    preciprec=precip
    tminrec=tmin
    tmaxrec=tmax
    return  tmaxrec, ps, Mrf, tavg, Swet, Snowmelt, Snowaccu, Sdry, Sdepth, tminrec, M, preciprec, Sdepth_cm
