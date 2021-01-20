model_tempmin <- function (Sdepth_cm = 0.0,
         P_prof = 0.0,
         tmin = 0.0,
         P_tminseuil = 0.0,
         P_tmaxseuil = 0.0){
    #'- Name: TempMin -Version: 1.0, -Time step: 1
    #'- Description:
    #'            * Title: Minimum temperature  calculation
    #'            * Author: STICS
    #'            * Reference: -
    #'            * Institution: INRA
    #'            * Abstract: -
    #'- inputs:
    #'            * name: Sdepth_cm
    #'                          ** description : snow depth
    #'                          ** inputtype : variable
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : cm
    #'                          ** uri : 
    #'            * name: P_prof
    #'                          ** description : snow cover threshold for snow insulation 
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 1000
    #'                          ** unit : cm
    #'                          ** uri : 
    #'            * name: tmin
    #'                          ** description : current minimum air temperature
    #'                          ** inputtype : variable
    #'                          ** variablecategory : auxiliary
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 100.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: P_tminseuil
    #'                          ** description : minimum temperature when snow cover is higher than prof
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: P_tmaxseuil
    #'                          ** description : maximum temperature when snow cover is higher than prof
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 
    #'                          ** max : 
    #'                          ** unit : °C
    #'                          ** uri : 
    #'- outputs:
    #'            * name: tminrec
    #'                          ** description : recalculated minimum temperature
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : °C
    #'                          ** uri : 
    tminrec <- tmin
    if (Sdepth_cm > P_prof)
    {
        if (tmin < P_tminseuil)
        {
            tminrec <- P_tminseuil
        }
        else
        {
            if (tmin > P_tmaxseuil)
            {
                tminrec <- P_tmaxseuil
            }
        }
    }
    else
    {
        if (Sdepth_cm > 0.0)
        {
            tminrec <- P_tminseuil - ((1 - (Sdepth_cm / P_prof)) * (abs(tmin) + P_tminseuil))
        }
    }
    return (list('tminrec' = tminrec))
}