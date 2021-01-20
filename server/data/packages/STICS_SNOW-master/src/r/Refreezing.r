model_refreezing <- function (tavg = 0.0,
         P_Tmf = 0.0,
         P_SWrf = 0.0){
    #'- Name: Refreezing -Version: 1.0, -Time step: 1
    #'- Description:
    #'            * Title: snowfall accumulation  calculation
    #'            * Author: STICS
    #'            * Reference: -
    #'            * Institution: INRA
    #'            * Abstract: -
    #'- inputs:
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
    #'            * name: P_Tmf
    #'                          ** description : threshold temperature for snow melting 
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: P_SWrf
    #'                          ** description : degree-day temperature index for refreezing
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : mm °C-1 d-1
    #'                          ** uri : 
    #'- outputs:
    #'            * name: Mrf
    #'                          ** description : liquid water in the snow cover in the process of refreezing
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : mm
    #'                          ** uri : 
    Mrf <- 0.0
    if (tavg < P_Tmf)
    {
        Mrf <- P_SWrf * (P_Tmf - tavg)
    }
    return (list('Mrf' = Mrf))
}