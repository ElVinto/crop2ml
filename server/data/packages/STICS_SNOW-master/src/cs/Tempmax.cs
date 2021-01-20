using System;
using System.Collections.Generic;
using System.Linq;
public class Tempmax
{
    private double _P_prof;
    public double P_prof
    {
        get { return this._P_prof; }
        set { this._P_prof= value; } 
    }
    private double _P_tminseuil;
    public double P_tminseuil
    {
        get { return this._P_tminseuil; }
        set { this._P_tminseuil= value; } 
    }
    private double _P_tmaxseuil;
    public double P_tmaxseuil
    {
        get { return this._P_tmaxseuil; }
        set { this._P_tmaxseuil= value; } 
    }
    public Tempmax() { }
    
    public void  Calculate_tempmax(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: TempMax -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: Maximum temperature  recalculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
        //- inputs:
    //            * name: Sdepth_cm
    //                          ** description : snow depth
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : cm
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
        //- outputs:
    //            * name: tmaxrec
    //                          ** description : recalculated maximum temperature
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : °C
    //                          ** uri : 
        double Sdepth_cm = s.Sdepth_cm;
        double tmax = a.tmax;
        double tmaxrec;
        tmaxrec = tmax;
        if (Sdepth_cm > P_prof)
        {
            if (tmax < P_tminseuil)
            {
                tmaxrec = P_tminseuil;
            }
            else
            {
                if (tmax > P_tmaxseuil)
                {
                    tmaxrec = P_tmaxseuil;
                }
            }
        }
        else
        {
            if (Sdepth_cm > 0.0d)
            {
                if (tmax <= 0.0d)
                {
                    tmaxrec = P_tmaxseuil - ((1 - (Sdepth_cm / P_prof)) * -tmax);
                }
                else
                {
                    tmaxrec = 0.0d;
                }
            }
        }
        s.tmaxrec= tmaxrec;
    }
}