#ifndef _SnowState_
#define _SnowState_
#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>
# include<vector>
# include<string>
using namespace std;
class SnowState
{
    private:
        float tmaxrec;
        float ps;
        float Mrf;
        float Swet;
        float Snowmelt;
        float Snowaccu;
        float Sdry;
        float Sdepth;
        float tminrec;
        float M;
        float preciprec;
        float Sdepth_cm;
    public:
        SnowState();
        float gettmaxrec();
        void settmaxrec(float _tmaxrec);
        float getps();
        void setps(float _ps);
        float getMrf();
        void setMrf(float _Mrf);
        float getSwet();
        void setSwet(float _Swet);
        float getSnowmelt();
        void setSnowmelt(float _Snowmelt);
        float getSnowaccu();
        void setSnowaccu(float _Snowaccu);
        float getSdry();
        void setSdry(float _Sdry);
        float getSdepth();
        void setSdepth(float _Sdepth);
        float gettminrec();
        void settminrec(float _tminrec);
        float getM();
        void setM(float _M);
        float getpreciprec();
        void setpreciprec(float _preciprec);
        float getSdepth_cm();
        void setSdepth_cm(float _Sdepth_cm);

};
#endif