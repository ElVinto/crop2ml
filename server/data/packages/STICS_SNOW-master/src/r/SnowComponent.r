library (gsubfn) 
setwd('C:/Users/midingoy/Documents/THESE/pycropml_pheno/test/Tutorial/snow_pkg/src/r')
source('Melting.r')
source('Refreezing.r')
source('Snowaccumulation.r')
source('Snowdensity.r')
source('Snowdepth.r')
source('Snowdepthtrans.r')
source('Snowdry.r')
source('Snowmelt.r')
source('Snowwet.r')
source('Tavg.r')
source('Tempmax.r')
source('Tempmin.r')
source('Preciprec.r')

model_snow <- function (jul = 0,
         P_tmaxseuil = 0.0,
         P_tminseuil = 0.0,
         P_prof = 0.0,
         tmin = 0.0,
         tmax = 0.0,
         precip = 0.0,
         Sdry_t1 = 0.0,
         P_E = 0.0,
         Sdepth_t1 = 0.0,
         P_Pns = 0.0,
         Swet_t1 = 0.0,
         P_Kmin = 0.0,
         P_Tmf = 0.0,
         P_SWrf = 0.0,
         P_tsmax = 0.0,
         P_DKmax = 0.0,
         P_trmax = 0.0,
         ps_t1 = 0.0){
    #'- Name: Snow -Version: 1.0, -Time step: 1
    #'- Description:
    #'            * Title: Snow model
    #'            * Author: STICS
    #'            * Reference: Snow paper
    #'            * Institution: STICS
    #'            * Abstract: Snow
    #'- inputs:
    #'            * name: jul
    #'                          ** description : current day of year for the calculation
    #'                          ** inputtype : variable
    #'                          ** variablecategory : auxiliary
    #'                          ** datatype : INT
    #'                          ** default : 0
    #'                          ** min : 0
    #'                          ** max : 366
    #'                          ** unit : d
    #'                          ** uri : 
    #'            * name: P_tmaxseuil
    #'                          ** description : maximum temperature when snow cover is higher than prof
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 
    #'                          ** max : 
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: P_tminseuil
    #'                          ** description : minimum temperature when snow cover is higher than prof
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: P_prof
    #'                          ** description : snow cover threshold for snow insulation 
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 1000
    #'                          ** unit : cm
    #'                          ** uri : 
    #'            * name: tmin
    #'                          ** description : current minimum air temperature
    #'                          ** inputtype : variable
    #'                          ** variablecategory : auxiliary
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 100.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: tmax
    #'                          ** description : current maximum air temperature
    #'                          ** inputtype : variable
    #'                          ** variablecategory : auxiliary
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 100.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: precip
    #'                          ** description : current precipitation
    #'                          ** inputtype : variable
    #'                          ** variablecategory : auxiliary
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : mm
    #'                          ** uri : 
    #'            * name: Sdry_t1
    #'                          ** description : water in solid state in the snow cover in previous day
    #'                          ** inputtype : variable
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : mm
    #'                          ** uri : 
    #'            * name: P_E
    #'                          ** description : snow compaction parameter
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 
    #'                          ** max : 
    #'                          ** unit : mm mm-1 d
    #'                          ** uri : 
    #'            * name: Sdepth_t1
    #'                          ** description : snow cover depth Calculation in previous day
    #'                          ** inputtype : variable
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : m
    #'                          ** uri : 
    #'            * name: P_Pns
    #'                          ** description : density of the new snow
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 
    #'                          ** max : 
    #'                          ** unit : kg m-3
    #'                          ** uri : 
    #'            * name: Swet_t1
    #'                          ** description : water in liquid state in the snow cover in previous day
    #'                          ** inputtype : variable
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 100.0
    #'                          ** unit : mm
    #'                          ** uri : 
    #'            * name: P_Kmin
    #'                          ** description : minimum melting rate on 21 December
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : mm °C-1 d-1
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
    #'            * name: P_tsmax
    #'                          ** description : maximum daily air temperature (tmax) below which all precipitation is assumed to be snow
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 1000
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: P_DKmax
    #'                          ** description : difference between the maximum and the minimum melting rates
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : mm °C-1 d-1
    #'                          ** uri : 
    #'            * name: P_trmax
    #'                          ** description : tmax above which all precipitation is assumed to be rain
    #'                          ** inputtype : parameter
    #'                          ** parametercategory : constant
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 5000.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: ps_t1
    #'                          ** description : density of snow cover in previous day
    #'                          ** inputtype : variable
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** default : 0.0
    #'                          ** min : 0.0
    #'                          ** max : 100.0
    #'                          ** unit : kg m-3
    #'                          ** uri : 
    #'- outputs:
    #'            * name: tmaxrec
    #'                          ** description : recalculated maximum temperature
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: ps
    #'                          ** description : density of snow cover
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : kg m-3
    #'                          ** uri : 
    #'            * name: Mrf
    #'                          ** description : liquid water in the snow cover in the process of refreezing
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : mm
    #'                          ** uri : 
    #'            * name: tavg
    #'                          ** description : mean temperature
    #'                          ** variablecategory : auxiliary
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: Swet
    #'                          ** description : water in liquid state in the snow cover
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : mm
    #'                          ** uri : 
    #'            * name: Snowmelt
    #'                          ** description : Snow melt
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : mm
    #'                          ** uri : 
    #'            * name: Snowaccu
    #'                          ** description : snowfall accumulation
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : mm
    #'                          ** uri : 
    #'            * name: Sdry
    #'                          ** description : water in solid state in the snow cover
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : mm
    #'                          ** uri : 
    #'            * name: Sdepth
    #'                          ** description : water in solid state in the snow cover
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : m
    #'                          ** uri : 
    #'            * name: tminrec
    #'                          ** description : recalculated minimum temperature
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : °C
    #'                          ** uri : 
    #'            * name: M
    #'                          ** description : snow in the process of melting
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : mm d-1
    #'                          ** uri : 
    #'            * name: preciprec
    #'                          ** description : precipitation recalculation
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : mm
    #'                          ** uri : 
    #'            * name: Sdepth_cm
    #'                          ** description : snow cover depth in cm
    #'                          ** variablecategory : state
    #'                          ** datatype : DOUBLE
    #'                          ** min : 0.0
    #'                          ** max : 500.0
    #'                          ** unit : cm
    #'                          ** uri : 
    tavg <- model_tavg(tmin, tmax)
    Mrf <- model_refreezing(tavg, P_Tmf, P_SWrf)
    M <- model_melting(jul, P_Tmf, P_DKmax, P_Kmin, tavg)
    ps <- model_snowdensity(ps_t1, Sdepth_t1, Sdry_t1, Swet_t1)
    Snowmelt <- model_snowmelt(ps, M)
    Snowaccu <- model_snowaccumulation(P_tsmax, tmax, P_trmax, precip)
    Sdry <- model_snowdry(Sdry_t1, Snowaccu, Mrf, M)
    Swet <- model_snowwet(Swet_t1, precip, Snowaccu, Mrf, M, Sdry)
    Sdepth <- model_snowdepth(Snowmelt, Sdepth_t1, Snowaccu, P_E, M)
    preciprec <- model_preciprec(Sdry_t1, Sdry, Swet, Swet_t1, Sdepth_t1, Sdepth, Mrf, precip, Snowaccu)
    Sdepth_cm <- model_snowdepthtrans(Sdepth, P_Pns)
    tmaxrec <- model_tempmax(Sdepth_cm, P_prof, tmax, P_tminseuil, P_tmaxseuil)
    tminrec <- model_tempmin(Sdepth_cm, P_prof, tmin, P_tminseuil, P_tmaxseuil)
    return (list ("tmaxrec" = tmaxrec,"ps" = ps,"Mrf" = Mrf,"tavg" = tavg,"Swet" = Swet,"Snowmelt" = Snowmelt,"Snowaccu" = Snowaccu,"Sdry" = Sdry,"Sdepth" = Sdepth,"tminrec" = tminrec,"M" = M,"preciprec" = preciprec,"Sdepth_cm" = Sdepth_cm))
}

init_snow <- function (jul = 0,
         P_tmaxseuil = 0.0,
         P_tminseuil = 0.0,
         P_prof = 0.0,
         tmin = 0.0,
         tmax = 0.0,
         precip = 0.0,
         P_E = 0.0,
         P_Pns = 0.0,
         P_Kmin = 0.0,
         P_Tmf = 0.0,
         P_SWrf = 0.0,
         P_tsmax = 0.0,
         P_DKmax = 0.0,
         P_trmax = 0.0){
    tmaxrec <- 0.0
    ps <- 0.0
    Mrf <- 0.0
    tavg <- 0.0
    Swet <- 0.0
    Snowmelt <- 0.0
    Snowaccu <- 0.0
    Sdry <- 0.0
    Sdepth <- 0.0
    tminrec <- 0.0
    M <- 0.0
    preciprec <- 0.0
    Sdepth_cm <- 0.0
    preciprec <- precip
    tminrec <- tmin
    tmaxrec <- tmax
    return (list ("tmaxrec" = tmaxrec,"ps" = ps,"Mrf" = Mrf,"tavg" = tavg,"Swet" = Swet,"Snowmelt" = Snowmelt,"Snowaccu" = Snowaccu,"Sdry" = Sdry,"Sdepth" = Sdepth,"tminrec" = tminrec,"M" = M,"preciprec" = preciprec,"Sdepth_cm" = Sdepth_cm))
}