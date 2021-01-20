# M calculation
cdef float K
M = 0.0
K=(P_DKmax/2.0)*(-sin((2.0*pi*float(jul)/366.0)+(9.0/16.0)*pi)) +P_Kmin+(P_DKmax/2.0)

if ( tavg  > P_Tmf ): 
    M = K * ( tavg - P_Tmf )