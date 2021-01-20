#include "SnowComponent.h"

    SnowComponent::SnowComponent()
    {
           
    }
    

float SnowComponent::getP_tmaxseuil() {return this-> P_tmaxseuil; }
float SnowComponent::getP_tminseuil() {return this-> P_tminseuil; }
float SnowComponent::getP_prof() {return this-> P_prof; }
float SnowComponent::getP_E() {return this-> P_E; }
float SnowComponent::getP_Pns() {return this-> P_Pns; }
float SnowComponent::getP_Kmin() {return this-> P_Kmin; }
float SnowComponent::getP_Tmf() {return this-> P_Tmf; }
float SnowComponent::getP_SWrf() {return this-> P_SWrf; }
float SnowComponent::getP_tsmax() {return this-> P_tsmax; }
float SnowComponent::getP_DKmax() {return this-> P_DKmax; }
float SnowComponent::getP_trmax() {return this-> P_trmax; }

void SnowComponent::setP_tmaxseuil(float _P_tmaxseuil)
{
    _Tempmin.setP_tmaxseuil(_P_tmaxseuil);
    _Tempmax.setP_tmaxseuil(_P_tmaxseuil);
}
void SnowComponent::setP_tminseuil(float _P_tminseuil)
{
    _Tempmin.setP_tminseuil(_P_tminseuil);
    _Tempmax.setP_tminseuil(_P_tminseuil);
}
void SnowComponent::setP_prof(float _P_prof)
{
    _Tempmin.setP_prof(_P_prof);
    _Tempmax.setP_prof(_P_prof);
}
void SnowComponent::setP_E(float _P_E)
{
    _Snowdepth.setP_E(_P_E);
}
void SnowComponent::setP_Pns(float _P_Pns)
{
    _Snowdepthtrans.setP_Pns(_P_Pns);
}
void SnowComponent::setP_Kmin(float _P_Kmin)
{
    _Melting.setP_Kmin(_P_Kmin);
}
void SnowComponent::setP_Tmf(float _P_Tmf)
{
    _Refreezing.setP_Tmf(_P_Tmf);
    _Melting.setP_Tmf(_P_Tmf);
}
void SnowComponent::setP_SWrf(float _P_SWrf)
{
    _Refreezing.setP_SWrf(_P_SWrf);
}
void SnowComponent::setP_tsmax(float _P_tsmax)
{
    _Snowaccumulation.setP_tsmax(_P_tsmax);
}
void SnowComponent::setP_DKmax(float _P_DKmax)
{
    _Melting.setP_DKmax(_P_DKmax);
}
void SnowComponent::setP_trmax(float _P_trmax)
{
    _Snowaccumulation.setP_trmax(_P_trmax);
}
void SnowComponent::Calculate_Model(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a)
{
    _Tavg.Calculate_Model(s, s1, r, a);
    _Refreezing.Calculate_Model(s, s1, r, a);
    _Melting.Calculate_Model(s, s1, r, a);
    _Snowdensity.Calculate_Model(s, s1, r, a);
    _Snowmelt.Calculate_Model(s, s1, r, a);
    _Snowaccumulation.Calculate_Model(s, s1, r, a);
    _Snowdry.Calculate_Model(s, s1, r, a);
    _Snowwet.Calculate_Model(s, s1, r, a);
    _Snowdepth.Calculate_Model(s, s1, r, a);
    _Preciprec.Calculate_Model(s, s1, r, a);
    _Snowdepthtrans.Calculate_Model(s, s1, r, a);
    _Tempmax.Calculate_Model(s, s1, r, a);
    _Tempmin.Calculate_Model(s, s1, r, a);
}
SnowComponent::SnowComponent(const SnowComponent& toCopy)
{
    P_tmaxseuil = toCopy.P_tmaxseuil;
    P_tminseuil = toCopy.P_tminseuil;
    P_prof = toCopy.P_prof;
    P_E = toCopy.P_E;
    P_Pns = toCopy.P_Pns;
    P_Kmin = toCopy.P_Kmin;
    P_Tmf = toCopy.P_Tmf;
    P_SWrf = toCopy.P_SWrf;
    P_tsmax = toCopy.P_tsmax;
    P_DKmax = toCopy.P_DKmax;
    P_trmax = toCopy.P_trmax;
}


void SnowComponent::Init(SnowState& s, SnowState& s1, SnowRate& r, SnowAuxiliary& a)
{
    s1.setpreciprec(15.0);
    s1.settminrec(2.0);
    s1.settmaxrec(4.0);
}
