using System;
using System.Collections.Generic;
using System.Linq;
class SnowWrapper
{
    private SnowState s;
    private SnowRate r;
    private SnowAuxiliary a;
    private SnowComponent snowComponent;

    public SnowWrapper()
    {
        s = new SnowState();
        r = new SnowRate();
        a = new SnowAuxiliary();
        snowComponent = new SnowComponent();
        loadParameters();
    }

        double P_tmaxseuil = 0.0d;
    double P_tminseuil = 0.0d;
    double P_prof = 0.0d;
    double P_E = 0.0d;
    double P_Pns = 0.0d;
    double P_Kmin = 0.0d;
    double P_Tmf = 0.0d;
    double P_SWrf = 0.0d;
    double P_tsmax = 0.0d;
    double P_DKmax = 0.0d;
    double P_trmax = 0.0d;

    public double tmaxrec{ get { return s.tmaxrec;}} 
     
    public double ps{ get { return s.ps;}} 
     
    public double Mrf{ get { return s.Mrf;}} 
     
    public double Swet{ get { return s.Swet;}} 
     
    public double Snowmelt{ get { return s.Snowmelt;}} 
     
    public double Snowaccu{ get { return s.Snowaccu;}} 
     
    public double Sdry{ get { return s.Sdry;}} 
     
    public double Sdepth{ get { return s.Sdepth;}} 
     
    public double tminrec{ get { return s.tminrec;}} 
     
    public double M{ get { return s.M;}} 
     
    public double preciprec{ get { return s.preciprec;}} 
     
    public double Sdepth_cm{ get { return s.Sdepth_cm;}} 
     
    public double tavg{ get { return a.tavg;}} 
     

    public SnowWrapper(SnowWrapper toCopy, bool copyAll) : this()
    {
        s = (toCopy.s != null) ? new SnowState(toCopy.s, copyAll) : null;
        r = (toCopy.r != null) ? new SnowRate(toCopy.r, copyAll) : null;
        a = (toCopy.a != null) ? new SnowAuxiliary(toCopy.a, copyAll) : null;
        if (copyAll)
        {
            snowComponent = (toCopy.snowComponent != null) ? new SnowComponent(toCopy.snowComponent) : null;
        }
    }

    public void Init(){
        snowComponent.Init(s, r, a);
        loadParameters();
    }

    private void loadParameters()
    {
        snowComponent.P_tmaxseuil = P_tmaxseuil;
        snowComponent.P_tminseuil = P_tminseuil;
        snowComponent.P_prof = P_prof;
        snowComponent.P_E = P_E;
        snowComponent.P_Pns = P_Pns;
        snowComponent.P_Kmin = P_Kmin;
        snowComponent.P_Tmf = P_Tmf;
        snowComponent.P_SWrf = P_SWrf;
        snowComponent.P_tsmax = P_tsmax;
        snowComponent.P_DKmax = P_DKmax;
        snowComponent.P_trmax = P_trmax;
    }

    public void EstimateSnow(int jul, double tmin, double tmax, double precip)
    {
        a.jul = jul;
        a.tmin = tmin;
        a.tmax = tmax;
        a.precip = precip;
        snowComponent.Calculate_snow(s,s1, r, a);
    }

}