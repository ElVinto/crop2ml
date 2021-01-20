#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>
# include<vector>
# include<string>
#include "SnowState.h"
#include "SnowRate.h"
#include "SnowAuxiliary.h"
using namespace std;
class Snowaccumulation
{
    private:
        float P_tsmax;
        float P_trmax;
    public:
        Snowaccumulation();
        void  Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a);
        float getP_tsmax();
        void setP_tsmax(float _P_tsmax);
        float getP_trmax();
        void setP_trmax(float _P_trmax);

};