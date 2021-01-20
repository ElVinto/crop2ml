model_snowaccumulation <- function (P_tsmax = 0.0,
         tmax = 0.0,
         P_trmax = 0.0,
         precip = 0.0){
    #'- Name: SnowAccumulation -Version: 1.0, -Time step: 1
    #'- Description:
    #'            * Title: snowfall accumulation  calculation
    #'            * Author: STICS
    #'            * Reference: -
    #'            * Institution: INRA
    #'            * Abstract: -
    #'- inputs:
    #'            * name: P_tsmax
    #'                          ** description : maximum daily air temperature (tmax) below which all precipitation is assumed to be snow
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 1000
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: tmax
    #'                          ** description : current maximum air temperature
    #'                          ** inputtype : variable
    #'                          ** variablecategory : auxiliary
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: P_trmax
    #'                          ** description : tmax above which all precipitation is assumed to be rain
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: precip
    #'                          ** description : recalculated precipitation
    #'                          ** inputtype : variable
    #'                          ** variablecategory : auxiliary
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : mm
    #'                          ** uri : 
    #'- outputs:
    #'            * name: Snowaccu
    #'                          ** description : snowfall accumulation
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : mm
    #'                          ** uri : 
    fs <- 0.0
    Snowaccu <- 0.0
    if (tmax < P_tsmax)
    {
        fs <- 1.0
    }
    if (tmax >= P_tsmax && tmax <= P_trmax)
    {
        fs <- (P_trmax - tmax) / (P_trmax - P_tsmax)
    }
    Snowaccu <- fs * precip
    return (list('Snowaccu' = Snowaccu))
}