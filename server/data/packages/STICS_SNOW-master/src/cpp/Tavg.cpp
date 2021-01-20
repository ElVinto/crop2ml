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
#include "Tavg.h"
using namespace std;

Tavg::Tavg() { }
void Tavg::Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a)
{
    //- Name: Tavg -Version: 1.0, -Time step: 1
    //- Description:
    //            * Title: Mean temperature  calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
    //- inputs:
    //            * name: tmin
    //                          ** description : current minimum air temperature
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: tmax
    //                          ** description : current maximum air temperature
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : °C
    //                          ** uri : 
    //- outputs:
    //            * name: tavg
    //                          ** description : mean temperature
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : °C
    //                          ** uri : 
    float tmin = a.gettmin();
    float tmax = a.gettmax();
    float tavg;
    tavg = (tmin + tmax) / 2;
    a.settavg(tavg);
}