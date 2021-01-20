MODULE Tempminmod
    IMPLICIT NONE
CONTAINS

    SUBROUTINE model_tempmin(Sdepth_cm, &
        P_prof, &
        tmin, &
        P_tminseuil, &
        P_tmaxseuil, &
        tminrec)
        IMPLICIT NONE
        REAL, INTENT(IN) :: Sdepth_cm
        REAL, INTENT(IN) :: P_prof
        REAL, INTENT(IN) :: tmin
        REAL, INTENT(IN) :: P_tminseuil
        REAL, INTENT(IN) :: P_tmaxseuil
        REAL, INTENT(OUT) :: tminrec
        !- Description:
    !            * Title: Minimum temperature  calculation
    !            * Author: STICS
    !            * Reference: -
    !            * Institution: INRA
    !            * Abstract: -
        !- inputs:
    !            * name: Sdepth_cm
    !                          ** description : snow depth
    !                          ** inputtype : variable
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : cm
    !                          ** uri : 
    !            * name: P_prof
    !                          ** description : snow cover threshold for snow insulation 
    !                          ** inputtype : parameter
    !                          ** parametercategory : constant
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 1000
    !                          ** unit : cm
    !                          ** uri : 
    !            * name: tmin
    !                          ** description : current minimum air temperature
    !                          ** inputtype : variable
    !                          ** variablecategory : auxiliary
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 100.0
    !                          ** unit : °C
    !                          ** uri : 
    !            * name: P_tminseuil
    !                          ** description : minimum temperature when snow cover is higher than prof
    !                          ** inputtype : parameter
    !                          ** parametercategory : constant
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 5000.0
    !                          ** unit : °C
    !                          ** uri : 
    !            * name: P_tmaxseuil
    !                          ** description : maximum temperature when snow cover is higher than prof
    !                          ** inputtype : parameter
    !                          ** parametercategory : constant
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 
    !                          ** max : 
    !                          ** unit : °C
    !                          ** uri : 
        !- outputs:
    !            * name: tminrec
    !                          ** description : recalculated minimum temperature
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : °C
    !                          ** uri : 
        tminrec = tmin
        IF(Sdepth_cm .GT. P_prof) THEN
            IF(tmin .LT. P_tminseuil) THEN
                tminrec = P_tminseuil
            ELSE
                IF(tmin .GT. P_tmaxseuil) THEN
                    tminrec = P_tmaxseuil
                END IF
            END IF
        ELSE
            IF(Sdepth_cm .GT. 0.0) THEN
                tminrec = P_tminseuil - ((1 - (Sdepth_cm / P_prof)) * (ABS(tmin) +  &
                        P_tminseuil))
            END IF
        END IF
    END SUBROUTINE model_tempmin

END MODULE
