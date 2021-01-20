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
#include "Snowdepth.h"
using namespace std;

Snowdepth::Snowdepth() { }
float Snowdepth::getP_E() {return this-> P_E; }
void Snowdepth::setP_E(float _P_E) { this->P_E = _P_E; }
void Snowdepth::Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a)
{
    //- Name: SnowDepth -Version: 1.0, -Time step: 1
    //- Description:
    //            * Title: snow cover depth Calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
    //- inputs:
    //            * name: Snowmelt
    //                          ** description : snow melt 
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: Sdepth_t1
    //                          ** description : snow cover depth Calculation in previous day
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : m
    //                          ** uri : 
    //            * name: Snowaccu
    //                          ** description : snowfall accumulation
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: P_E
    //                          ** description : snow compaction parameter
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : mm mm-1 d
    //                          ** uri : 
    //            * name: M
    //                          ** description : snow in the process of melting
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : mm
    //                          ** uri : 
    //- outputs:
    //            * name: Sdepth
    //                          ** description : water in solid state in the snow cover
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : m
    //                          ** uri : 
    float Snowmelt = s.getSnowmelt();
    float Sdepth_t1 = s1.getSdepth();
    float Snowaccu = s.getSnowaccu();
    float M = s.getM();
    float Sdepth;
    Sdepth = 0.0f;
    if (Snowmelt <= Sdepth_t1 + (Snowaccu / 100))
    {
        Sdepth = Snowaccu / 100 + Sdepth_t1 - Snowmelt - (Sdepth_t1 * P_E);
    }
    s.setSdepth(Sdepth);
}