model_melting <- function (jul = 0,
         P_Tmf = 0.5,
         P_DKmax = 0.0,
         P_Kmin = 0.0,
         tavg = 0.0){
    #'- Name: Melting -Version: 1.0, -Time step: 1
    #'- Description:
    #'            * Title: snow in the process of melting
    #'            * Author: STICS
    #'            * Reference: -
    #'            * Institution: INRA
    #'            * Abstract: -
    #'- inputs:
    #'            * name: jul
    #'                          ** description : current day of year for the calculation
    #'                          ** inputtype : variable
    #'                          ** variablecategory : auxiliary
    #'                          ** datatype : INT
    #'                          ** default : 0
    #'                          ** min : 0
    #'                          ** max : 366
    #'                          ** unit : d
    #'                          ** uri : 
    #'            * name: P_Tmf
    #'                          ** description : threshold temperature for snow melting 
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.5
    #'                          ** min : 0.0
    #'                          ** max : 1.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: P_DKmax
    #'                          ** description : difference between the maximum and the minimum melting rates
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : mm °C-1 d-1
    #'                          ** uri : 
    #'            * name: P_Kmin
    #'                          ** description : minimum melting rate on 21 December
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : mm °C-1 d-1
    #'                          ** uri : 
    #'            * name: tavg
    #'                          ** description : average temperature
    #'                          ** inputtype : variable
    #'                          ** variablecategory : auxiliary
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 100.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'- outputs:
    #'            * name: M
    #'                          ** description : snow in the process of melting
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : mm d-1
    #'                          ** uri : 
    M <- 0.0
    K <- P_DKmax / 2.0 * -sin((2.0 * pi * as.double(jul) / 366.0 + (9.0 / 16.0 * pi))) + P_Kmin + (P_DKmax / 2.0)
    if (tavg > P_Tmf)
    {
        M <- K * (tavg - P_Tmf)
    }
    return (list('M' = M))
}