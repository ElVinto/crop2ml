MODULE Snowmod
    USE Meltingmod
    USE Refreezingmod
    USE Snowaccumulationmod
    USE Snowdensitymod
    USE Snowdepthmod
    USE Snowdepthtransmod
    USE Snowdrymod
    USE Snowmeltmod
    USE Snowwetmod
    USE Tavgmod
    USE Tempmaxmod
    USE Tempminmod
    USE Preciprecmod
    IMPLICIT NONE
CONTAINS

    SUBROUTINE model_snow(jul, &
        P_tmaxseuil, &
        P_tminseuil, &
        P_prof, &
        tmin, &
        tmax, &
        precip, &
        Sdry_t1, &
        P_E, &
        Sdepth_t1, &
        P_Pns, &
        Swet_t1, &
        P_Kmin, &
        P_Tmf, &
        P_SWrf, &
        P_tsmax, &
        P_DKmax, &
        P_trmax, &
        ps_t1, &
        tmaxrec, &
        ps, &
        Mrf, &
        tavg, &
        Swet, &
        Snowmelt, &
        Snowaccu, &
        Sdry, &
        Sdepth, &
        tminrec, &
        M, &
        preciprec, &
        Sdepth_cm)
        IMPLICIT NONE
        INTEGER, INTENT(IN) :: jul
        REAL, INTENT(IN) :: P_tmaxseuil
        REAL, INTENT(IN) :: P_tminseuil
        REAL, INTENT(IN) :: P_prof
        REAL, INTENT(IN) :: tmin
        REAL, INTENT(IN) :: tmax
        REAL, INTENT(IN) :: precip
        REAL, INTENT(IN) :: Sdry_t1
        REAL, INTENT(IN) :: P_E
        REAL, INTENT(IN) :: Sdepth_t1
        REAL, INTENT(IN) :: P_Pns
        REAL, INTENT(IN) :: Swet_t1
        REAL, INTENT(IN) :: P_Kmin
        REAL, INTENT(IN) :: P_Tmf
        REAL, INTENT(IN) :: P_SWrf
        REAL, INTENT(IN) :: P_tsmax
        REAL, INTENT(IN) :: P_DKmax
        REAL, INTENT(IN) :: P_trmax
        REAL, INTENT(IN) :: ps_t1
        REAL, INTENT(OUT) :: tavg
        REAL, INTENT(OUT) :: M
        REAL, INTENT(OUT) :: Mrf
        REAL, INTENT(OUT) :: Snowaccu
        REAL, INTENT(OUT) :: ps
        REAL, INTENT(OUT) :: Snowmelt
        REAL, INTENT(OUT) :: Sdepth
        REAL, INTENT(OUT) :: Sdepth_cm
        REAL, INTENT(OUT) :: Sdry
        REAL, INTENT(OUT) :: Swet
        REAL, INTENT(OUT) :: tmaxrec
        REAL, INTENT(OUT) :: tminrec
        REAL, INTENT(OUT) :: preciprec
        !- Description:
    !            * Title: Snow model
    !            * Author: STICS
    !            * Reference: Snow paper
    !            * Institution: STICS
    !            * Abstract: Snow
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
    !            * name: P_Pns
    !                          ** description : density of the new snow
    !                          ** inputtype : parameter
    !                          ** parametercategory : constant
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 
    !                          ** max : 
    !                          ** unit : kg m-3
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
    !            * name: ps_t1
    !                          ** description : density of snow cover in previous day
    !                          ** inputtype : variable
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** default : 0.0
    !                          ** min : 0.0
    !                          ** max : 100.0
    !                          ** unit : kg m-3
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
    !            * name: ps
    !                          ** description : density of snow cover
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : kg m-3
    !                          ** uri : 
    !            * name: Mrf
    !                          ** description : liquid water in the snow cover in the process of refreezing
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm
    !                          ** uri : 
    !            * name: tavg
    !                          ** description : mean temperature
    !                          ** variablecategory : auxiliary
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : °C
    !                          ** uri : 
    !            * name: Swet
    !                          ** description : water in liquid state in the snow cover
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm
    !                          ** uri : 
    !            * name: Snowmelt
    !                          ** description : Snow melt
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm
    !                          ** uri : 
    !            * name: Snowaccu
    !                          ** description : snowfall accumulation
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm
    !                          ** uri : 
    !            * name: Sdry
    !                          ** description : water in solid state in the snow cover
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm
    !                          ** uri : 
    !            * name: Sdepth
    !                          ** description : water in solid state in the snow cover
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : m
    !                          ** uri : 
    !            * name: tminrec
    !                          ** description : recalculated minimum temperature
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : °C
    !                          ** uri : 
    !            * name: M
    !                          ** description : snow in the process of melting
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm d-1
    !                          ** uri : 
    !            * name: preciprec
    !                          ** description : precipitation recalculation
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : mm
    !                          ** uri : 
    !            * name: Sdepth_cm
    !                          ** description : snow cover depth in cm
    !                          ** variablecategory : state
    !                          ** datatype : DOUBLE
    !                          ** min : 0.0
    !                          ** max : 500.0
    !                          ** unit : cm
    !                          ** uri : 
        call model_tavg(tmin, tmax,tavg)
        call model_refreezing(tavg, P_Tmf, P_SWrf,Mrf)
        call model_melting(jul, P_Tmf, P_DKmax, P_Kmin, tavg,M)
        call model_snowdensity(ps_t1, Sdepth_t1, Sdry_t1, Swet_t1,ps)
        call model_snowmelt(ps, M,Snowmelt)
        call model_snowaccumulation(P_tsmax, tmax, P_trmax, precip,Snowaccu)
        call model_snowdry(Sdry_t1, Snowaccu, Mrf, M,Sdry)
        call model_snowwet(Swet_t1, precip, Snowaccu, Mrf, M, Sdry,Swet)
        call model_snowdepth(Snowmelt, Sdepth_t1, Snowaccu, P_E, M,Sdepth)
        call model_preciprec(Sdry_t1, Sdry, Swet, Swet_t1, Sdepth_t1, Sdepth,  &
                Mrf, precip, Snowaccu,preciprec)
        call model_snowdepthtrans(Sdepth, P_Pns,Sdepth_cm)
        call model_tempmax(Sdepth_cm, P_prof, tmax, P_tminseuil,  &
                P_tmaxseuil,tmaxrec)
        call model_tempmin(Sdepth_cm, P_prof, tmin, P_tminseuil,  &
                P_tmaxseuil,tminrec)
    END SUBROUTINE model_snow

    SUBROUTINE init_snow(jul, &
        P_tmaxseuil, &
        P_tminseuil, &
        P_prof, &
        tmin, &
        tmax, &
        precip, &
        P_E, &
        P_Pns, &
        P_Kmin, &
        P_Tmf, &
        P_SWrf, &
        P_tsmax, &
        P_DKmax, &
        P_trmax, &
        tmaxrec, &
        ps, &
        Mrf, &
        tavg, &
        Swet, &
        Snowmelt, &
        Snowaccu, &
        Sdry, &
        Sdepth, &
        tminrec, &
        M, &
        preciprec, &
        Sdepth_cm)
        IMPLICIT NONE
        INTEGER, INTENT(IN) :: jul
        REAL, INTENT(IN) :: P_tmaxseuil
        REAL, INTENT(IN) :: P_tminseuil
        REAL, INTENT(IN) :: P_prof
        REAL, INTENT(IN) :: tmin
        REAL, INTENT(IN) :: tmax
        REAL, INTENT(IN) :: precip
        REAL, INTENT(IN) :: P_E
        REAL, INTENT(IN) :: P_Pns
        REAL, INTENT(IN) :: P_Kmin
        REAL, INTENT(IN) :: P_Tmf
        REAL, INTENT(IN) :: P_SWrf
        REAL, INTENT(IN) :: P_tsmax
        REAL, INTENT(IN) :: P_DKmax
        REAL, INTENT(IN) :: P_trmax
        REAL, INTENT(OUT) :: tmaxrec
        REAL, INTENT(OUT) :: ps
        REAL, INTENT(OUT) :: Mrf
        REAL, INTENT(OUT) :: tavg
        REAL, INTENT(OUT) :: Swet
        REAL, INTENT(OUT) :: Snowmelt
        REAL, INTENT(OUT) :: Snowaccu
        REAL, INTENT(OUT) :: Sdry
        REAL, INTENT(OUT) :: Sdepth
        REAL, INTENT(OUT) :: tminrec
        REAL, INTENT(OUT) :: M
        REAL, INTENT(OUT) :: preciprec
        REAL, INTENT(OUT) :: Sdepth_cm
        tmaxrec = 0.0
        ps = 0.0
        Mrf = 0.0
        tavg = 0.0
        Swet = 0.0
        Snowmelt = 0.0
        Snowaccu = 0.0
        Sdry = 0.0
        Sdepth = 0.0
        tminrec = 0.0
        M = 0.0
        preciprec = 0.0
        Sdepth_cm = 0.0
        preciprec = precip
        tminrec = tmin
        tmaxrec = tmax
    END SUBROUTINE init_snow

END MODULE
