MODULE Refreezingmod
    IMPLICIT NONE
CONTAINS

    SUBROUTINE model_refreezing(tavg, &
        P_Tmf, &
        P_SWrf, &
        Mrf)
        IMPLICIT NONE
        REAL, INTENT(IN) :: tavg
        REAL, INTENT(IN) :: P_Tmf
        REAL, INTENT(IN) :: P_SWrf
        REAL, INTENT(OUT) :: Mrf
        !- Description:
    !            * Title: snowfall accumulation  calculation
    !            * Author: STICS
    !            * Reference: -
    !            * Institution: INRA
    !            * Abstract: -
        !- inputs:
    !            * name: tavg
    !                          ** description : average temperature
    !                          ** inputtype : variable
    !                          ** variablecategory : auxiliary
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 100.0
    !                          ** unit : °C
    !                          ** uri : 
    !            * name: P_Tmf
    !                          ** description : threshold temperature for snow melting 
    !                          ** inputtype : parameter
    !                          ** parametercategory : constant
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 5000.0
    !                          ** unit : °C
    !                          ** uri : 
    !            * name: P_SWrf
    !                          ** description : degree-day temperature index for refreezing
    !                          ** inputtype : parameter
    !                          ** parametercategory : constant
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 5000.0
    !                          ** unit : mm °C-1 d-1
    !                          ** uri : 
        !- outputs:
    !            * name: Mrf
    !                          ** description : liquid water in the snow cover in the process of refreezing
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm
    !                          ** uri : 
        Mrf = 0.0
        IF(tavg .LT. P_Tmf) THEN
            Mrf = P_SWrf * (P_Tmf - tavg)
        END IF
    END SUBROUTINE model_refreezing

END MODULE
