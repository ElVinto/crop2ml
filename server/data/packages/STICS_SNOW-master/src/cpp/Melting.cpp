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
#include "Melting.h"
using namespace std;

Melting::Melting() { }
float Melting::getP_Tmf() {return this-> P_Tmf; }
float Melting::getP_DKmax() {return this-> P_DKmax; }
float Melting::getP_Kmin() {return this-> P_Kmin; }
void Melting::setP_Tmf(float _P_Tmf) { this->P_Tmf = _P_Tmf; }
void Melting::setP_DKmax(float _P_DKmax) { this->P_DKmax = _P_DKmax; }
void Melting::setP_Kmin(float _P_Kmin) { this->P_Kmin = _P_Kmin; }
void Melting::Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a)
{
    //- Name: Melting -Version: 1.0, -Time step: 1
    //- Description:
    //            * Title: snow in the process of melting
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
    //- inputs:
    //            * name: jul
    //                          ** description : current day of year for the calculation
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : INT
    //                          ** default : 0
    //                          ** min : 0
    //                          ** max : 366
    //                          ** unit : d
    //                          ** uri : 
    //            * name: P_Tmf
    //                          ** description : threshold temperature for snow melting 
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.5
    //                          ** min : 0.0
    //                          ** max : 1.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_DKmax
    //                          ** description : difference between the maximum and the minimum melting rates
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : mm °C-1 d-1
    //                          ** uri : 
    //            * name: P_Kmin
    //                          ** description : minimum melting rate on 21 December
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : mm °C-1 d-1
    //                          ** uri : 
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
    //- outputs:
    //            * name: M
    //                          ** description : snow in the process of melting
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm d-1
    //                          ** uri : 
    int jul = a.getjul();
    float tavg = a.gettavg();
    float M;
    float K;
    M = 0.0f;
    K = P_DKmax / 2.0f * -asin((2.0f * M_PI * float(jul) / 366.0f + (9.0f / 16.0f * M_PI))) + P_Kmin + (P_DKmax / 2.0f);
    if (tavg > P_Tmf)
    {
        M = K * (tavg - P_Tmf);
    }
    s.setM(M);
}