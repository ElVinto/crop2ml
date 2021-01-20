#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>
# include<vector>
# include<string>
#include "SnowState.h"
#include "SnowRate.h"
#include "SnowAuxiliary.h"
using namespace std;
class Tempmax
{
    private:
        float P_prof;
        float P_tminseuil;
        float P_tmaxseuil;
    public:
        Tempmax();
        void  Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a);
        float getP_prof();
        void setP_prof(float _P_prof);
        float getP_tminseuil();
        void setP_tminseuil(float _P_tminseuil);
        float getP_tmaxseuil();
        void setP_tmaxseuil(float _P_tmaxseuil);

};