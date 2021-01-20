using System;
using System.Collections.Generic;
using System.Linq;
public class SnowComponent
{
    
    public SnowComponent() { }
    

    Melting _Melting = new Melting();
    Refreezing _Refreezing = new Refreezing();
    Snowaccumulation _Snowaccumulation = new Snowaccumulation();
    Snowdensity _Snowdensity = new Snowdensity();
    Snowdepth _Snowdepth = new Snowdepth();
    Snowdepthtrans _Snowdepthtrans = new Snowdepthtrans();
    Snowdry _Snowdry = new Snowdry();
    Snowmelt _Snowmelt = new Snowmelt();
    Snowwet _Snowwet = new Snowwet();
    Tavg _Tavg = new Tavg();
    Tempmax _Tempmax = new Tempmax();
    Tempmin _Tempmin = new Tempmin();
    Preciprec _Preciprec = new Preciprec();

    public double P_tmaxseuil
    {
        get
        { return _Tempmin.P_tmaxseuil; }
        set
        { _Tempmin.P_tmaxseuil = value;
            _Tempmax.P_tmaxseuil = value; } 
    }
    
    public double P_tminseuil
    {
        get
        { return _Tempmin.P_tminseuil; }
        set
        { _Tempmin.P_tminseuil = value;
            _Tempmax.P_tminseuil = value; } 
    }
    
    public double P_prof
    {
        get
        { return _Tempmin.P_prof; }
        set
        { _Tempmin.P_prof = value;
            _Tempmax.P_prof = value; } 
    }
    
    public double P_E
    {
        get
        { return _Snowdepth.P_E; }
        set
        { _Snowdepth.P_E = value; } 
    }
    
    public double P_Pns
    {
        get
        { return _Snowdepthtrans.P_Pns; }
        set
        { _Snowdepthtrans.P_Pns = value; } 
    }
    
    public double P_Kmin
    {
        get
        { return _Melting.P_Kmin; }
        set
        { _Melting.P_Kmin = value; } 
    }
    
    public double P_Tmf
    {
        get
        { return _Refreezing.P_Tmf; }
        set
        { _Refreezing.P_Tmf = value;
            _Melting.P_Tmf = value; } 
    }
    
    public double P_SWrf
    {
        get
        { return _Refreezing.P_SWrf; }
        set
        { _Refreezing.P_SWrf = value; } 
    }
    
    public double P_tsmax
    {
        get
        { return _Snowaccumulation.P_tsmax; }
        set
        { _Snowaccumulation.P_tsmax = value; } 
    }
    
    public double P_DKmax
    {
        get
        { return _Melting.P_DKmax; }
        set
        { _Melting.P_DKmax = value; } 
    }
    
    public double P_trmax
    {
        get
        { return _Snowaccumulation.P_trmax; }
        set
        { _Snowaccumulation.P_trmax = value; } 
    }
    
    public void  Calculate_snow(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        _Tavg.Calculate_tavg(s,s1, r, a);
        _Refreezing.Calculate_refreezing(s,s1, r, a);
        _Melting.Calculate_melting(s,s1, r, a);
        _Snowdensity.Calculate_snowdensity(s,s1, r, a);
        _Snowmelt.Calculate_snowmelt(s,s1, r, a);
        _Snowaccumulation.Calculate_snowaccumulation(s,s1, r, a);
        _Snowdry.Calculate_snowdry(s,s1, r, a);
        _Snowwet.Calculate_snowwet(s,s1, r, a);
        _Snowdepth.Calculate_snowdepth(s,s1, r, a);
        _Preciprec.Calculate_preciprec(s,s1, r, a);
        _Snowdepthtrans.Calculate_snowdepthtrans(s,s1, r, a);
        _Tempmax.Calculate_tempmax(s,s1, r, a);
        _Tempmin.Calculate_tempmin(s,s1, r, a);
    }
    
    public SnowComponent(SnowComponent toCopy): this() // copy constructor 
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
    

    

    public void Init(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        s.preciprec = a.precip;
        s.tminrec = a.tmin;
        s.tmaxrec = a.tmax;
    }
    
}