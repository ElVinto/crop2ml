MODULE Meltingmod
    IMPLICIT NONE
CONTAINS

    SUBROUTINE model_melting(jul, &
        P_Tmf, &
        P_DKmax, &
        P_Kmin, &
        tavg, &
        M)
        IMPLICIT NONE
        INTEGER, INTENT(IN) :: jul
        REAL, INTENT(IN) :: P_Tmf
        REAL, INTENT(IN) :: P_DKmax
        REAL, INTENT(IN) :: P_Kmin
        REAL, INTENT(IN) :: tavg
        REAL, INTENT(OUT) :: M
        REAL:: K
        !- Description:
    !            * Title: snow in the process of melting
    !            * Author: STICS
    !            * Reference: -
    !            * Institution: INRA
    !            * Abstract: -
        !- inputs:
    !            * name: jul
    !                          ** description : current day of year for the calculation
    !                          ** inputtype : variable
    !                          ** variablecategory : auxiliary
    !                          ** datatype : INT
    !                          ** default : 0
    !                          ** min : 0
    !                          ** max : 366
    !                          ** unit : d
    !                          ** uri : 
    !            * name: P_Tmf
    !                          ** description : threshold temperature for snow melting 
    !                          ** inputtype : parameter
    !                          ** parametercategory : constant
    !                          ** datatype : DOUBLE
    !                          ** default : 0.5
    !                          ** min : 0.0
    !                          ** max : 1.0
    !                          ** unit : °C
    !                          ** uri : 
    !            * name: P_DKmax
    !                          ** description : difference between the maximum and the minimum melting rates
    !                          ** inputtype : parameter
    !                          ** parametercategory : constant
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 5000.0
    !                          ** unit : mm °C-1 d-1
    !                          ** uri : 
    !            * name: P_Kmin
    !                          ** description : minimum melting rate on 21 December
    !                          ** inputtype : parameter
    !                          ** parametercategory : constant
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 5000.0
    !                          ** unit : mm °C-1 d-1
    !                          ** uri : 
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
        !- outputs:
    !            * name: M
    !                          ** description : snow in the process of melting
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm d-1
    !                          ** uri : 
        M = 0.0
        K = P_DKmax / 2.0 * (-SIN((2.0 * 3.14159265 * REAL(jul) / 366.0 +  &
                (9.0 / 16.0 * 3.14159265)))) + P_Kmin + (P_DKmax / 2.0)
        IF(tavg .GT. P_Tmf) THEN
            M = K * (tavg - P_Tmf)
        END IF
    END SUBROUTINE model_melting

END MODULE
