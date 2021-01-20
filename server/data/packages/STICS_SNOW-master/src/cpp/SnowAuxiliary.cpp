#include "SnowAuxiliary.h"

SnowAuxiliary::SnowAuxiliary() { }

int SnowAuxiliary::getjul() {return this-> jul; }
float SnowAuxiliary::gettmin() {return this-> tmin; }
float SnowAuxiliary::gettmax() {return this-> tmax; }
float SnowAuxiliary::getprecip() {return this-> precip; }
float SnowAuxiliary::gettavg() {return this-> tavg; }

void SnowAuxiliary::setjul(int _jul) { this->jul = _jul; }
void SnowAuxiliary::settmin(float _tmin) { this->tmin = _tmin; }
void SnowAuxiliary::settmax(float _tmax) { this->tmax = _tmax; }
void SnowAuxiliary::setprecip(float _precip) { this->precip = _precip; }
void SnowAuxiliary::settavg(float _tavg) { this->tavg = _tavg; }