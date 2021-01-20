MODULE Snowaccumulationmod
    IMPLICIT NONE
CONTAINS

    SUBROUTINE model_snowaccumulation(P_tsmax, &
        tmax, &
        P_trmax, &
        precip, &
        Snowaccu)
        IMPLICIT NONE
        REAL, INTENT(IN) :: P_tsmax
        REAL, INTENT(IN) :: tmax
        REAL, INTENT(IN) :: P_trmax
        REAL, INTENT(IN) :: precip
        REAL, INTENT(OUT) :: Snowaccu
        REAL:: fs
        fs = 0.0
        !- Description:
    !            * Title: snowfall accumulation  calculation
    !            * Author: STICS
    !            * Reference: -
    !            * Institution: INRA
    !            * Abstract: -
        !- inputs:
    !            * name: P_tsmax
    !                          ** description : maximum daily air temperature (tmax) below which all precipitation is assumed to be snow
    !                          ** inputtype : parameter
    !                          ** parametercategory : constant
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 1000
    !                          ** unit : °C
    !                          ** uri : 
    !            * name: tmax
    !                          ** description : current maximum air temperature
    !                          ** inputtype : variable
    !                          ** variablecategory : auxiliary
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 5000.0
    !                          ** unit : °C
    !                          ** uri : 
    !            * name: P_trmax
    !                          ** description : tmax above which all precipitation is assumed to be rain
    !                          ** inputtype : parameter
    !                          ** parametercategory : constant
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 5000.0
    !                          ** unit : °C
    !                          ** uri : 
    !            * name: precip
    !                          ** description : recalculated precipitation
    !                          ** inputtype : variable
    !                          ** variablecategory : auxiliary
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 5000.0
    !                          ** unit : mm
    !                          ** uri : 
        !- outputs:
    !            * name: Snowaccu
    !                          ** description : snowfall accumulation
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm
    !                          ** uri : 
        Snowaccu = 0.0
        IF(tmax .LT. P_tsmax) THEN
            fs = 1.0
        END IF
        IF(tmax .GE. P_tsmax .AND. tmax .LE. P_trmax) THEN
            fs = (P_trmax - tmax) / (P_trmax - P_tsmax)
        END IF
        Snowaccu = fs * precip
    END SUBROUTINE model_snowaccumulation

END MODULE
