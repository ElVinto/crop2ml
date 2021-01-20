MODULE Snowdepthmod
    IMPLICIT NONE
CONTAINS

    SUBROUTINE model_snowdepth(Snowmelt, &
        Sdepth_t1, &
        Snowaccu, &
        P_E, &
        M, &
        Sdepth)
        IMPLICIT NONE
        REAL, INTENT(IN) :: Snowmelt
        REAL, INTENT(IN) :: Sdepth_t1
        REAL, INTENT(IN) :: Snowaccu
        REAL, INTENT(IN) :: P_E
        REAL, INTENT(IN) :: M
        REAL, INTENT(OUT) :: Sdepth
        !- Description:
    !            * Title: snow cover depth Calculation
    !            * Author: STICS
    !            * Reference: -
    !            * Institution: INRA
    !            * Abstract: -
        !- inputs:
    !            * name: Snowmelt
    !                          ** description : snow melt 
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
    !            * name: P_E
    !                          ** description : snow compaction parameter
    !                          ** inputtype : parameter
    !                          ** parametercategory : constant
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 
    !                          ** max : 
    !                          ** unit : mm mm-1 d
    !                          ** uri : 
    !            * name: M
    !                          ** description : snow in the process of melting
    !                          ** inputtype : variable
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 
    !                          ** max : 
    !                          ** unit : mm
    !                          ** uri : 
        !- outputs:
    !            * name: Sdepth
    !                          ** description : water in solid state in the snow cover
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : m
    !                          ** uri : 
        Sdepth = 0.0
        IF(Snowmelt .LE. Sdepth_t1 + (Snowaccu / 100)) THEN
            Sdepth = Snowaccu / 100 + Sdepth_t1 - Snowmelt - (Sdepth_t1 * P_E)
        END IF
    END SUBROUTINE model_snowdepth

END MODULE
