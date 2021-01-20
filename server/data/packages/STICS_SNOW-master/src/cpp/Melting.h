#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>
# include<vector>
# include<string>
#include "SnowState.h"
#include "SnowRate.h"
#include "SnowAuxiliary.h"
using namespace std;
class Melting
{
    private:
        float P_Tmf;
        float P_DKmax;
        float P_Kmin;
    public:
        Melting();
        void  Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a);
        float getP_Tmf();
        void setP_Tmf(float _P_Tmf);
        float getP_DKmax();
        void setP_DKmax(float _P_DKmax);
        float getP_Kmin();
        void setP_Kmin(float _P_Kmin);

};