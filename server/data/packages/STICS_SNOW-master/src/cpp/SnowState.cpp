#include "SnowState.h"
SnowState::SnowState() { }

float SnowState::gettmaxrec() {return this-> tmaxrec; }
float SnowState::getps() {return this-> ps; }
float SnowState::getMrf() {return this-> Mrf; }
float SnowState::getSwet() {return this-> Swet; }
float SnowState::getSnowmelt() {return this-> Snowmelt; }
float SnowState::getSnowaccu() {return this-> Snowaccu; }
float SnowState::getSdry() {return this-> Sdry; }
float SnowState::getSdepth() {return this-> Sdepth; }
float SnowState::gettminrec() {return this-> tminrec; }
float SnowState::getM() {return this-> M; }
float SnowState::getpreciprec() {return this-> preciprec; }
float SnowState::getSdepth_cm() {return this-> Sdepth_cm; }

void SnowState::settmaxrec(float _tmaxrec) { this->tmaxrec = _tmaxrec; }
void SnowState::setps(float _ps) { this->ps = _ps; }
void SnowState::setMrf(float _Mrf) { this->Mrf = _Mrf; }
void SnowState::setSwet(float _Swet) { this->Swet = _Swet; }
void SnowState::setSnowmelt(float _Snowmelt) { this->Snowmelt = _Snowmelt; }
void SnowState::setSnowaccu(float _Snowaccu) { this->Snowaccu = _Snowaccu; }
void SnowState::setSdry(float _Sdry) { this->Sdry = _Sdry; }
void SnowState::setSdepth(float _Sdepth) { this->Sdepth = _Sdepth; }
void SnowState::settminrec(float _tminrec) { this->tminrec = _tminrec; }
void SnowState::setM(float _M) { this->M = _M; }
void SnowState::setpreciprec(float _preciprec) { this->preciprec = _preciprec; }
void SnowState::setSdepth_cm(float _Sdepth_cm) { this->Sdepth_cm = _Sdepth_cm; }