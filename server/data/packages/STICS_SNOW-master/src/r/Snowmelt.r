model_snowmelt <- function (ps = 0.0,
         M = 0.0){
    #'- Name: SnowMelt -Version: 1.0, -Time step: 1
    #'- Description:
    #'            * Title: Snow Melt
    #'            * Author: STICS
    #'            * Reference: -
    #'            * Institution: INRA
    #'            * Abstract: -
    #'- inputs:
    #'            * name: ps
    #'                          ** description : density of snow cover
    #'                          ** inputtype : variable
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : mm
    #'                          ** uri : 
    #'            * name: M
    #'                          ** description : snow in the process of melting
    #'                          ** inputtype : variable
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 
    #'                          ** max : 
    #'                          ** unit : mm
    #'                          ** uri : 
    #'- outputs:
    #'            * name: Snowmelt
    #'                          ** description : Snow melt
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : mm
    #'                          ** uri : 
    Snowmelt <- 0.0
    if (ps > 1e-8)
    {
        Snowmelt <- M / ps
    }
    return (list('Snowmelt' = Snowmelt))
}