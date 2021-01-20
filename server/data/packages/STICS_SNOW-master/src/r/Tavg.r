model_tavg <- function (tmin = 0.0,
         tmax = 0.0){
    #'- Name: Tavg -Version: 1.0, -Time step: 1
    #'- Description:
    #'            * Title: Mean temperature  calculation
    #'            * Author: STICS
    #'            * Reference: -
    #'            * Institution: INRA
    #'            * Abstract: -
    #'- inputs:
    #'            * name: tmin
    #'                          ** description : current minimum air temperature
    #'                          ** inputtype : variable
    #'                          ** variablecategory : auxiliary
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : °C
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
    #'- outputs:
    #'            * name: tavg
    #'                          ** description : mean temperature
    #'                          ** variablecategory : auxiliary
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : °C
    #'                          ** uri : 
    tavg <- (tmin + tmax) / 2
    return (list('tavg' = tavg))
}