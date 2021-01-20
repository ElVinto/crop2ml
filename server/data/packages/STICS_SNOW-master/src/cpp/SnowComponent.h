#include "Melting.h"
#include "Refreezing.h"
#include "Snowaccumulation.h"
#include "Snowdensity.h"
#include "Snowdepth.h"
#include "Snowdepthtrans.h"
#include "Snowdry.h"
#include "Snowmelt.h"
#include "Snowwet.h"
#include "Tavg.h"
#include "Tempmax.h"
#include "Tempmin.h"
#include "Preciprec.h"
using namespace std;

class SnowComponent
{
    private:
        float P_tmaxseuil;
        float P_tminseuil;
        float P_prof;
        float P_E;
        float P_Pns;
        float P_Kmin;
        float P_Tmf;
        float P_SWrf;
        float P_tsmax;
        float P_DKmax;
        float P_trmax;
    public:
        SnowComponent();
        SnowComponent(const SnowComponent& copy);
        void  Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a);
        void  Init(SnowState& s,SnowState& s1, SnowRate& r, SnowAuxiliary& a);
        float getP_tmaxseuil();
        void setP_tmaxseuil(float _P_tmaxseuil);
        float getP_tminseuil();
        void setP_tminseuil(float _P_tminseuil);
        float getP_prof();
        void setP_prof(float _P_prof);
        float getP_E();
        void setP_E(float _P_E);
        float getP_Pns();
        void setP_Pns(float _P_Pns);
        float getP_Kmin();
        void setP_Kmin(float _P_Kmin);
        float getP_Tmf();
        void setP_Tmf(float _P_Tmf);
        float getP_SWrf();
        void setP_SWrf(float _P_SWrf);
        float getP_tsmax();
        void setP_tsmax(float _P_tsmax);
        float getP_DKmax();
        void setP_DKmax(float _P_DKmax);
        float getP_trmax();
        void setP_trmax(float _P_trmax);

        Melting _Melting;
        Refreezing _Refreezing;
        Snowaccumulation _Snowaccumulation;
        Snowdensity _Snowdensity;
        Snowdepth _Snowdepth;
        Snowdepthtrans _Snowdepthtrans;
        Snowdry _Snowdry;
        Snowmelt _Snowmelt;
        Snowwet _Snowwet;
        Tavg _Tavg;
        Tempmax _Tempmax;
        Tempmin _Tempmin;
        Preciprec _Preciprec;

};