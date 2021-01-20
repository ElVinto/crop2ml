import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;
public class Snow
{
    private double P_tmaxseuil;
    public double getP_tmaxseuil()
    { return P_tmaxseuil; }

    public void setP_tmaxseuil(double _P_tmaxseuil)
    { this.P_tmaxseuil= _P_tmaxseuil; } 
    
    private double P_tminseuil;
    public double getP_tminseuil()
    { return P_tminseuil; }

    public void setP_tminseuil(double _P_tminseuil)
    { this.P_tminseuil= _P_tminseuil; } 
    
    private double P_prof;
    public double getP_prof()
    { return P_prof; }

    public void setP_prof(double _P_prof)
    { this.P_prof= _P_prof; } 
    
    private double P_E;
    public double getP_E()
    { return P_E; }

    public void setP_E(double _P_E)
    { this.P_E= _P_E; } 
    
    private double P_Pns;
    public double getP_Pns()
    { return P_Pns; }

    public void setP_Pns(double _P_Pns)
    { this.P_Pns= _P_Pns; } 
    
    private double P_Kmin;
    public double getP_Kmin()
    { return P_Kmin; }

    public void setP_Kmin(double _P_Kmin)
    { this.P_Kmin= _P_Kmin; } 
    
    private double P_Tmf;
    public double getP_Tmf()
    { return P_Tmf; }

    public void setP_Tmf(double _P_Tmf)
    { this.P_Tmf= _P_Tmf; } 
    
    private double P_SWrf;
    public double getP_SWrf()
    { return P_SWrf; }

    public void setP_SWrf(double _P_SWrf)
    { this.P_SWrf= _P_SWrf; } 
    
    private double P_tsmax;
    public double getP_tsmax()
    { return P_tsmax; }

    public void setP_tsmax(double _P_tsmax)
    { this.P_tsmax= _P_tsmax; } 
    
    private double P_DKmax;
    public double getP_DKmax()
    { return P_DKmax; }

    public void setP_DKmax(double _P_DKmax)
    { this.P_DKmax= _P_DKmax; } 
    
    private double P_trmax;
    public double getP_trmax()
    { return P_trmax; }

    public void setP_trmax(double _P_trmax)
    { this.P_trmax= _P_trmax; } 
    
    public Snow() { }
    public void  Calculate_snow(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: Snow -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: Snow model
    //            * Author: STICS
    //            * Reference: Snow paper
    //            * Institution: STICS
    //            * Abstract: Snow
        //- inputs:
    //            * name: jul
    //                          ** description : current day of year for the calculation
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : INT
    //                          ** default : 0
    //                          ** min : 0
    //                          ** max : 366
    //                          ** unit : d
    //                          ** uri : 
    //            * name: P_tmaxseuil
    //                          ** description : maximum temperature when snow cover is higher than prof
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_tminseuil
    //                          ** description : minimum temperature when snow cover is higher than prof
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_prof
    //                          ** description : snow cover threshold for snow insulation 
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 1000
    //                          ** unit : cm
    //                          ** uri : 
    //            * name: tmin
    //                          ** description : current minimum air temperature
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: tmax
    //                          ** description : current maximum air temperature
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: precip
    //                          ** description : current precipitation
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: Sdry_t1
    //                          ** description : water in solid state in the snow cover in previous day
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: P_E
    //                          ** description : snow compaction parameter
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : mm mm-1 d
    //                          ** uri : 
    //            * name: Sdepth_t1
    //                          ** description : snow cover depth Calculation in previous day
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : m
    //                          ** uri : 
    //            * name: P_Pns
    //                          ** description : density of the new snow
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : kg m-3
    //                          ** uri : 
    //            * name: Swet_t1
    //                          ** description : water in liquid state in the snow cover in previous day
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: P_Kmin
    //                          ** description : minimum melting rate on 21 December
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : mm °C-1 d-1
    //                          ** uri : 
    //            * name: P_Tmf
    //                          ** description : threshold temperature for snow melting 
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_SWrf
    //                          ** description : degree-day temperature index for refreezing
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : mm °C-1 d-1
    //                          ** uri : 
    //            * name: P_tsmax
    //                          ** description : maximum daily air temperature (tmax) below which all precipitation is assumed to be snow
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 1000
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_DKmax
    //                          ** description : difference between the maximum and the minimum melting rates
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : mm °C-1 d-1
    //                          ** uri : 
    //            * name: P_trmax
    //                          ** description : tmax above which all precipitation is assumed to be rain
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: ps_t1
    //                          ** description : density of snow cover in previous day
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : kg m-3
    //                          ** uri : 
        //- outputs:
    //            * name: tmaxrec
    //                          ** description : recalculated maximum temperature
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: ps
    //                          ** description : density of snow cover
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : kg m-3
    //                          ** uri : 
    //            * name: Mrf
    //                          ** description : liquid water in the snow cover in the process of refreezing
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: tavg
    //                          ** description : mean temperature
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: Swet
    //                          ** description : water in liquid state in the snow cover
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: Snowmelt
    //                          ** description : Snow melt
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: Snowaccu
    //                          ** description : snowfall accumulation
    //                          ** variablecategory : rate
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: Sdry
    //                          ** description : water in solid state in the snow cover
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: Sdepth
    //                          ** description : water in solid state in the snow cover
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : m
    //                          ** uri : 
    //            * name: tminrec
    //                          ** description : recalculated minimum temperature
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: M
    //                          ** description : snow in the process of melting
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm d-1
    //                          ** uri : 
    //            * name: preciprec
    //                          ** description : precipitation recalculation
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: Sdepth_cm
    //                          ** description : snow cover depth in cm
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : cm
    //                          ** uri : 
        int jul = a.getjul();
        double tmin = a.gettmin();
        double tmax = a.gettmax();
        double precip = a.getprecip();
        double Sdry_t1;
        double Sdepth_t1;
        double Swet_t1;
        double ps_t1;
        double tavg;
        double M;
        double Mrf;
        double Snowaccu;
        double ps;
        double Snowmelt;
        double Sdepth;
        double Sdepth_cm;
        double Sdry;
        double Swet;
        double tmaxrec;
        double tminrec;
        double preciprec;
        _Tavg.Calculate_tavg(s, s1, r, a);
        _Refreezing.Calculate_refreezing(s, s1, r, a);
        _Melting.Calculate_melting(s, s1, r, a);
        _Snowdensity.Calculate_snowdensity(s, s1, r, a);
        _Snowmelt.Calculate_snowmelt(s, s1, r, a);
        _Snowaccumulation.Calculate_snowaccumulation(s, s1, r, a);
        _Snowdry.Calculate_snowdry(s, s1, r, a);
        _Snowwet.Calculate_snowwet(s, s1, r, a);
        _Snowdepth.Calculate_snowdepth(s, s1, r, a);
        _Preciprec.Calculate_preciprec(s, s1, r, a);
        _Snowdepthtrans.Calculate_snowdepthtrans(s, s1, r, a);
        _Tempmax.Calculate_tempmax(s, s1, r, a);
        _Tempmin.Calculate_tempmin(s, s1, r, a);
        a.settavg(tavg);
        s.setM(M);
        s.setMrf(Mrf);
        r.setSnowaccu(Snowaccu);
        s.setps(ps);
        s.setSnowmelt(Snowmelt);
        s.setSdepth(Sdepth);
        s.setSdepth_cm(Sdepth_cm);
        s.setSdry(Sdry);
        s.setSwet(Swet);
        a.settmaxrec(tmaxrec);
        a.settminrec(tminrec);
        a.setpreciprec(preciprec);
    }
    public void Init(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        int jul;
        double tmin;
        double tmax;
        double precip;
        double tmaxrec = 0.0d;
        double ps = 0.0d;
        double Mrf = 0.0d;
        double tavg = 0.0d;
        double Swet = 0.0d;
        double Snowmelt = 0.0d;
        double Snowaccu = 0.0d;
        double Sdry = 0.0d;
        double Sdepth = 0.0d;
        double tminrec = 0.0d;
        double M = 0.0d;
        double preciprec = 0.0d;
        double Sdepth_cm = 0.0d;
        preciprec = precip;
        tminrec = tmin;
        tmaxrec = tmax;
        s.setps(ps);
        s.setMrf(Mrf);
        s.setSwet(Swet);
        s.setSnowmelt(Snowmelt);
        s.setSdry(Sdry);
        s.setSdepth(Sdepth);
        s.setM(M);
        s.setSdepth_cm(Sdepth_cm);
    }
}