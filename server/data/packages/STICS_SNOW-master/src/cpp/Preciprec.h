#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>
# include<vector>
# include<string>
#include "SnowState.h"
#include "SnowRate.h"
#include "SnowAuxiliary.h"
using namespace std;
class Preciprec
{
    private:
    public:
        Preciprec();
        void  Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a);

};