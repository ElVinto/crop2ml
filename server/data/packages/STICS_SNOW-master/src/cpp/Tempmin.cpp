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
#include "Tempmin.h"
using namespace std;

Tempmin::Tempmin() { }
float Tempmin::getP_prof() {return this-> P_prof; }
float Tempmin::getP_tminseuil() {return this-> P_tminseuil; }
float Tempmin::getP_tmaxseuil() {return this-> P_tmaxseuil; }
void Tempmin::setP_prof(float _P_prof) { this->P_prof = _P_prof; }
void Tempmin::setP_tminseuil(float _P_tminseuil) { this->P_tminseuil = _P_tminseuil; }
void Tempmin::setP_tmaxseuil(float _P_tmaxseuil) { this->P_tmaxseuil = _P_tmaxseuil; }
void Tempmin::Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a)
{
    //- Name: TempMin -Version: 1.0, -Time step: 1
    //- Description:
    //            * Title: Minimum temperature  calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
    //- inputs:
    //            * name: Sdepth_cm
    //                          ** description : snow depth
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : cm
    //                          ** uri : 
    //            * name: P_prof
    //                          ** description : snow cover threshold for snow insulation 
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 1000
    //                          ** unit : cm
    //                          ** uri : 
    //            * name: tmin
    //                          ** description : current minimum air temperature
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_tminseuil
    //                          ** description : minimum temperature when snow cover is higher than prof
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_tmaxseuil
    //                          ** description : maximum temperature when snow cover is higher than prof
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : °C
    //                          ** uri : 
    //- outputs:
    //            * name: tminrec
    //                          ** description : recalculated minimum temperature
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : °C
    //                          ** uri : 
    float Sdepth_cm = s.getSdepth_cm();
    float tmin = a.gettmin();
    float tminrec;
    tminrec = tmin;
    if (Sdepth_cm > P_prof)
    {
        if (tmin < P_tminseuil)
        {
            tminrec = P_tminseuil;
        }
        else
        {
            if (tmin > P_tmaxseuil)
            {
                tminrec = P_tmaxseuil;
            }
        }
    }
    else
    {
        if (Sdepth_cm > 0.0f)
        {
            tminrec = P_tminseuil - ((1 - (Sdepth_cm / P_prof)) * (abs(tmin) + P_tminseuil));
        }
    }
    s.settminrec(tminrec);
}