using System;
using System.Collections.Generic;
using System.Linq;
public class Tempmin
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
    public Tempmin() { }
    
    public void  Calculate_tempmin(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: TempMin -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: Minimum temperature  calculation
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
    //            * name: tminrec
    //                          ** description : recalculated minimum temperature
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : °C
    //                          ** uri : 
        double Sdepth_cm = s.Sdepth_cm;
        double tmin = a.tmin;
        double tminrec;
        tminrec = tmin;
        if (Sdepth_cm > P_prof)
        {
            if (tmin < P_tminseuil)
            {
                tminrec = P_tminseuil;
            }
            else
            {
                if (tmin > P_tmaxseuil)
                {
                    tminrec = P_tmaxseuil;
                }
            }
        }
        else
        {
            if (Sdepth_cm > 0.0d)
            {
                tminrec = P_tminseuil - ((1 - (Sdepth_cm / P_prof)) * (Math.Abs(tmin) + P_tminseuil));
            }
        }
        s.tminrec= tminrec;
    }
}