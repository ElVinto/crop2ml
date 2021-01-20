#ifndef _SnowAuxiliary_
#define _SnowAuxiliary_
#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>
# include<vector>
# include<string>
using namespace std;
class SnowAuxiliary
{
    private:
        int jul;
        float tmin;
        float tmax;
        float precip;
        float tavg;
    public:
        SnowAuxiliary();
        int getjul();
        void setjul(int _jul);
        float gettmin();
        void settmin(float _tmin);
        float gettmax();
        void settmax(float _tmax);
        float getprecip();
        void setprecip(float _precip);
        float gettavg();
        void settavg(float _tavg);

};
#endif