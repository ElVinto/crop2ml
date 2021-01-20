MODULE Snowwetmod
    IMPLICIT NONE
CONTAINS

    SUBROUTINE model_snowwet(Swet_t1, &
        precip, &
        Snowaccu, &
        Mrf, &
        M, &
        Sdry, &
        Swet)
        IMPLICIT NONE
        REAL, INTENT(IN) :: Swet_t1
        REAL, INTENT(IN) :: precip
        REAL, INTENT(IN) :: Snowaccu
        REAL, INTENT(IN) :: Mrf
        REAL, INTENT(IN) :: M
        REAL, INTENT(IN) :: Sdry
        REAL, INTENT(OUT) :: Swet
        REAL:: frac_sdry
        REAL:: tmp_swet
        !- Description:
    !            * Title: water in liquid state in the snow cover calculation
    !            * Author: STICS
    !            * Reference: -
    !            * Institution: INRA
    !            * Abstract: -
        !- inputs:
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
    !            * name: precip
    !                          ** description : current precipitation
    !                          ** inputtype : variable
    !                          ** variablecategory : auxiliary
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 5000.0
    !                          ** unit : mm
    !                          ** uri : 
    !            * name: Snowaccu
    !                          ** description :  snowfall accumulation
    !                          ** inputtype : variable
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 
    !                          ** max : 
    !                          ** unit : mm
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
        !- outputs:
    !            * name: Swet
    !                          ** description : water in liquid state in the snow cover
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm
    !                          ** uri : 
        Swet = 0.0
        IF(Mrf .LE. Swet_t1) THEN
            tmp_swet = Swet_t1 + precip - Snowaccu + M - Mrf
            frac_sdry = 0.1 * Sdry
            IF(tmp_swet .LT. frac_sdry) THEN
                Swet = tmp_swet
            ELSE
                Swet = frac_sdry
            END IF
        END IF
    END SUBROUTINE model_snowwet

END MODULE
