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
#include "Snowmelt.h"
using namespace std;

Snowmelt::Snowmelt() { }
void Snowmelt::Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a)
{
    //- Name: SnowMelt -Version: 1.0, -Time step: 1
    //- Description:
    //            * Title: Snow Melt
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
    //- inputs:
    //            * name: ps
    //                          ** description : density of snow cover
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
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
    //- outputs:
    //            * name: Snowmelt
    //                          ** description : Snow melt
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
    float ps = s.getps();
    float M = s.getM();
    float Snowmelt;
    Snowmelt = 0.0f;
    if (ps > 1e-8f)
    {
        Snowmelt = M / ps;
    }
    s.setSnowmelt(Snowmelt);
}