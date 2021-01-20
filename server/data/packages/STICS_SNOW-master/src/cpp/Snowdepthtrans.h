#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>
# include<vector>
# include<string>
#include "SnowState.h"
#include "SnowRate.h"
#include "SnowAuxiliary.h"
using namespace std;
class Snowdepthtrans
{
    private:
        float P_Pns;
    public:
        Snowdepthtrans();
        void  Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a);
        float getP_Pns();
        void setP_Pns(float _P_Pns);

};