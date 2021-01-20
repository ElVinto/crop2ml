MODULE Tempmaxmod
    IMPLICIT NONE
CONTAINS

    SUBROUTINE model_tempmax(Sdepth_cm, &
        P_prof, &
        tmax, &
        P_tminseuil, &
        P_tmaxseuil, &
        tmaxrec)
        IMPLICIT NONE
        REAL, INTENT(IN) :: Sdepth_cm
        REAL, INTENT(IN) :: P_prof
        REAL, INTENT(IN) :: tmax
        REAL, INTENT(IN) :: P_tminseuil
        REAL, INTENT(IN) :: P_tmaxseuil
        REAL, INTENT(OUT) :: tmaxrec
        !- Description:
    !            * Title: Maximum temperature  recalculation
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
    !            * name: tmax
    !                          ** description : current maximum air temperature
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
    !            * name: tmaxrec
    !                          ** description : recalculated maximum temperature
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : °C
    !                          ** uri : 
        tmaxrec = tmax
        IF(Sdepth_cm .GT. P_prof) THEN
            IF(tmax .LT. P_tminseuil) THEN
                tmaxrec = P_tminseuil
            ELSE
                IF(tmax .GT. P_tmaxseuil) THEN
                    tmaxrec = P_tmaxseuil
                END IF
            END IF
        ELSE
            IF(Sdepth_cm .GT. 0.0) THEN
                IF(tmax .LE. 0.0) THEN
                    tmaxrec = P_tmaxseuil - ((1 - (Sdepth_cm / P_prof)) * (-tmax))
                ELSE
                    tmaxrec = 0.0
                END IF
            END IF
        END IF
    END SUBROUTINE model_tempmax

END MODULE
