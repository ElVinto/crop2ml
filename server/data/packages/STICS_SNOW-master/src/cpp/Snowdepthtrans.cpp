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
#include "Snowdepthtrans.h"
using namespace std;

Snowdepthtrans::Snowdepthtrans() { }
float Snowdepthtrans::getP_Pns() {return this-> P_Pns; }
void Snowdepthtrans::setP_Pns(float _P_Pns) { this->P_Pns = _P_Pns; }
void Snowdepthtrans::Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a)
{
    //- Name: SnowDepthTrans -Version: 1.0, -Time step: 1
    //- Description:
    //            * Title: snow cover depth conversion
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
    //- inputs:
    //            * name: Sdepth
    //                          ** description : snow cover depth Calculation
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : m
    //                          ** uri : 
    //            * name: P_Pns
    //                          ** description : density of the new snow
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : kg m-3
    //                          ** uri : 
    //- outputs:
    //            * name: Sdepth_cm
    //                          ** description : snow cover depth in cm
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : cm
    //                          ** uri : 
    float Sdepth = s.getSdepth();
    float Sdepth_cm;
    Sdepth_cm = Sdepth * P_Pns;
    s.setSdepth_cm(Sdepth_cm);
}