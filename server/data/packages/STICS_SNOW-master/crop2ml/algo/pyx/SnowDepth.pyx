# Snow depth calculation
Sdepth=0.0
if(Snowmelt  <= (Sdepth_t1+Snowaccu/100)): 
    Sdepth=(Snowaccu/100+Sdepth_t1-Snowmelt-(Sdepth_t1*P_E))