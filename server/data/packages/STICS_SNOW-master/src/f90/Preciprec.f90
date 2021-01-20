MODULE Preciprecmod
    IMPLICIT NONE
CONTAINS

    SUBROUTINE model_preciprec(Sdry_t1, &
        Sdry, &
        Swet, &
        Swet_t1, &
        Sdepth_t1, &
        Sdepth, &
        Mrf, &
        precip, &
        Snowaccu, &
        preciprec)
        IMPLICIT NONE
        REAL, INTENT(IN) :: Sdry_t1
        REAL, INTENT(IN) :: Sdry
        REAL, INTENT(IN) :: Swet
        REAL, INTENT(IN) :: Swet_t1
        REAL, INTENT(IN) :: Sdepth_t1
        REAL, INTENT(IN) :: Sdepth
        REAL, INTENT(IN) :: Mrf
        REAL, INTENT(IN) :: precip
        REAL, INTENT(IN) :: Snowaccu
        REAL, INTENT(OUT) :: preciprec
        !- Description:
    !            * Title: Precipitation ReCalculation
    !            * Author: STICS
    !            * Reference: -
    !            * Institution: INRA
    !            * Abstract: -
        !- inputs:
    !            * name: Sdry_t1
    !                          ** description : water in solid state in the snow cover in previous day
    !                          ** inputtype : variable
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm
    !                          ** uri : 
    !            * name: Sdry
    !                          ** description : water in solid state in the snow cover 
    !                          ** inputtype : variable
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm
    !                          ** uri : 
    !            * name: Swet
    !                          ** description : water in liquid state in the snow cover
    !                          ** inputtype : variable
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 100.0
    !                          ** unit : mm
    !                          ** uri : 
    !            * name: Swet_t1
    !                          ** description : water in liquid state in the snow cover in previous day
    !                          ** inputtype : variable
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 100.0
    !                          ** unit : mm
    !                          ** uri : 
    !            * name: Sdepth_t1
    !                          ** description : snow cover depth Calculation in previous day
    !                          ** inputtype : variable
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 5000.0
    !                          ** unit : m
    !                          ** uri : 
    !            * name: Sdepth
    !                          ** description : snow cover depth Calculation
    !                          ** inputtype : variable
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 5000.0
    !                          ** unit : m
    !                          ** uri : 
    !            * name: Mrf
    !                          ** description : liquid water in the snow cover in the process of refreezing
    !                          ** inputtype : variable
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 
    !                          ** max : 
    !                          ** unit : mm
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
    !            * name: Snowaccu
    !                          ** description : snowfall accumulation
    !                          ** inputtype : variable
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 
    !                          ** max : 
    !                          ** unit : mm
    !                          ** uri : 
        !- outputs:
    !            * name: preciprec
    !                          ** description : precipitation recalculation
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm
    !                          ** uri : 
        preciprec = precip
        IF(Sdry + Swet .LT. Sdry_t1 + Swet_t1) THEN
            preciprec = preciprec + ((Sdepth_t1 - Sdepth) * 100) - Mrf
        END IF
        preciprec = preciprec - Snowaccu
    END SUBROUTINE model_preciprec

END MODULE
