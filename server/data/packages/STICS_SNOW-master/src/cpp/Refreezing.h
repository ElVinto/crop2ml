#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>
# include<vector>
# include<string>
#include "SnowState.h"
#include "SnowRate.h"
#include "SnowAuxiliary.h"
using namespace std;
class Refreezing
{
    private:
        float P_Tmf;
        float P_SWrf;
    public:
        Refreezing();
        void  Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a);
        float getP_Tmf();
        void setP_Tmf(float _P_Tmf);
        float getP_SWrf();
        void setP_SWrf(float _P_SWrf);

};