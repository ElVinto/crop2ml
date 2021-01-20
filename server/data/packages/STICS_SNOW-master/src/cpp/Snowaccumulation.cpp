#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>
# include<vector>
# include<string>
# include<numeric>
# include<algorithm>
# include<array>
#include <map>
# include <tuple>
#include "Snowaccumulation.h"
using namespace std;

Snowaccumulation::Snowaccumulation() { }
float Snowaccumulation::getP_tsmax() {return this-> P_tsmax; }
float Snowaccumulation::getP_trmax() {return this-> P_trmax; }
void Snowaccumulation::setP_tsmax(float _P_tsmax) { this->P_tsmax = _P_tsmax; }
void Snowaccumulation::setP_trmax(float _P_trmax) { this->P_trmax = _P_trmax; }
void Snowaccumulation::Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a)
{
    //- Name: SnowAccumulation -Version: 1.0, -Time step: 1
    //- Description:
    //            * Title: snowfall accumulation  calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
    //- inputs:
    //            * name: P_tsmax
    //                          ** description : maximum daily air temperature (tmax) below which all precipitation is assumed to be snow
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 1000
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: tmax
    //                          ** description : current maximum air temperature
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_trmax
    //                          ** description : tmax above which all precipitation is assumed to be rain
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: precip
    //                          ** description : recalculated precipitation
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : mm
    //                          ** uri : 
    //- outputs:
    //            * name: Snowaccu
    //                          ** description : snowfall accumulation
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
    float tmax = a.gettmax();
    float precip = a.getprecip();
    float Snowaccu;
    float fs = 0.0f;
    Snowaccu = 0.0f;
    if (tmax < P_tsmax)
    {
        fs = 1.0f;
    }
    if (tmax >= P_tsmax && tmax <= P_trmax)
    {
        fs = (P_trmax - tmax) / (P_trmax - P_tsmax);
    }
    Snowaccu = fs * precip;
    s.setSnowaccu(Snowaccu);
}