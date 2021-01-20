# Snow accumulation (unit cm)
cdef float fs=0.0
Snowaccu=0.0
if (tmax < P_tsmax): fs=1.0
if ((tmax >= P_tsmax) and (tmax  <= P_trmax)):
    fs=(P_trmax-tmax)/(P_trmax-P_tsmax)
Snowaccu=fs*precip 