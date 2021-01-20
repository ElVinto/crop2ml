model_tempmax <- function (Sdepth_cm = 0.0,
         P_prof = 0.0,
         tmax = 0.0,
         P_tminseuil = 0.0,
         P_tmaxseuil = 0.0){
    #'- Name: TempMax -Version: 1.0, -Time step: 1
    #'- Description:
    #'            * Title: Maximum temperature  recalculation
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
    #'            * name: tmax
    #'                          ** description : current maximum air temperature
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
    #'            * name: tmaxrec
    #'                          ** description : recalculated maximum temperature
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : °C
    #'                          ** uri : 
    tmaxrec <- tmax
    if (Sdepth_cm > P_prof)
    {
        if (tmax < P_tminseuil)
        {
            tmaxrec <- P_tminseuil
        }
        else
        {
            if (tmax > P_tmaxseuil)
            {
                tmaxrec <- P_tmaxseuil
            }
        }
    }
    else
    {
        if (Sdepth_cm > 0.0)
        {
            if (tmax <= 0.0)
            {
                tmaxrec <- P_tmaxseuil - ((1 - (Sdepth_cm / P_prof)) * -tmax)
            }
            else
            {
                tmaxrec <- 0.0
            }
        }
    }
    return (list('tmaxrec' = tmaxrec))
}