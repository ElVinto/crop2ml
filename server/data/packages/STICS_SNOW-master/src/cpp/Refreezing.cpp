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
#include "Refreezing.h"
using namespace std;

Refreezing::Refreezing() { }
float Refreezing::getP_Tmf() {return this-> P_Tmf; }
float Refreezing::getP_SWrf() {return this-> P_SWrf; }
void Refreezing::setP_Tmf(float _P_Tmf) { this->P_Tmf = _P_Tmf; }
void Refreezing::setP_SWrf(float _P_SWrf) { this->P_SWrf = _P_SWrf; }
void Refreezing::Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a)
{
    //- Name: Refreezing -Version: 1.0, -Time step: 1
    //- Description:
    //            * Title: snowfall accumulation  calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
    //- inputs:
    //            * name: tavg
    //                          ** description : average temperature
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_Tmf
    //                          ** description : threshold temperature for snow melting 
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_SWrf
    //                          ** description : degree-day temperature index for refreezing
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : mm °C-1 d-1
    //                          ** uri : 
    //- outputs:
    //            * name: Mrf
    //                          ** description : liquid water in the snow cover in the process of refreezing
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
    float tavg = a.gettavg();
    float Mrf;
    Mrf = 0.0f;
    if (tavg < P_Tmf)
    {
        Mrf = P_SWrf * (P_Tmf - tavg);
    }
    s.setMrf(Mrf);
}