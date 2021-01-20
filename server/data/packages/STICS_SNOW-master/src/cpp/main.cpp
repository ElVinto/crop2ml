#include "SnowComponent.h"

using namespace std;
 
 int main(){
     SnowComponent sn;
     SnowAuxiliary a;
     SnowRate r;
     SnowState s;
     SnowState s1;
    sn.Init(s,s1, r, a);
    a.setjul(10);
    a.setprecip(15.0);
    a.settmax(0.2);
    a.settmin(-2.2);
    sn.setP_DKmax(1.5);
    sn.setP_Tmf(0.5);
    sn.setP_DKmax(1.5);
	sn.setP_Kmin(2.0);
	sn.setP_tsmax(-2.0);
	sn.setP_trmax(1.0);
    sn.setP_SWrf(0.01);
	sn.setP_Pns(100.);
	sn.setP_E(0.02);
	sn.setP_prof(10.);
	sn.setP_tminseuil(-0.5);
	sn.setP_tmaxseuil(0.);
    sn.Calculate_Model(s,s1,r,a);
    cout<<a.gettavg()<<endl;
    cout<<s.getMrf()<<endl;
    cout<<s.getM()<<endl;
    cout<<s.getpreciprec()<<endl;
    cout<<s.getps()<<endl;
    cout<<s.getSdepth()<<endl;
    cout<<s.getSdry()<<endl;
    cout<<s.getSnowaccu()<<endl;
    cout<<s.getSnowmelt()<<endl;
    cout<<s.getSwet()<<endl;
    cout<<s.gettmaxrec()<<endl;
    cout<<s.gettminrec()<<endl;


 }