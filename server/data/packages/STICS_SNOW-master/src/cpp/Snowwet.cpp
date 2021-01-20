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
#include "Snowwet.h"
using namespace std;

Snowwet::Snowwet() { }
void Snowwet::Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a)
{
    //- Name: SnowWet -Version: 1.0, -Time step: 1
    //- Description:
    //            * Title: water in liquid state in the snow cover calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
    //- inputs:
    //            * name: Swet_t1
    //                          ** description : water in liquid state in the snow cover in previous day
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: precip
    //                          ** description : current precipitation
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: Snowaccu
    //                          ** description :  snowfall accumulation
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: Mrf
    //                          ** description : liquid water in the snow cover in the process of refreezing
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : mm
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
    //            * name: Sdry
    //                          ** description : water in solid state in the snow cover
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
    //- outputs:
    //            * name: Swet
    //                          ** description : water in liquid state in the snow cover
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
    float Swet_t1 = s1.getSwet();
    float precip = a.getprecip();
    float Snowaccu = s.getSnowaccu();
    float Mrf = s.getMrf();
    float M = s.getM();
    float Sdry = s.getSdry();
    float Swet;
    float frac_sdry;
    float tmp_swet;
    Swet = 0.0f;
    if (Mrf <= Swet_t1)
    {
        tmp_swet = Swet_t1 + precip - Snowaccu + M - Mrf;
        frac_sdry = 0.1f * Sdry;
        if (tmp_swet < frac_sdry)
        {
            Swet = tmp_swet;
        }
        else
        {
            Swet = frac_sdry;
        }
    }
    s.setSwet(Swet);
}