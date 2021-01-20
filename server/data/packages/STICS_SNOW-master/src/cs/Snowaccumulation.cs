using System;
using System.Collections.Generic;
using System.Linq;
public class Snowaccumulation
{
    private double _P_tsmax;
    public double P_tsmax
    {
        get { return this._P_tsmax; }
        set { this._P_tsmax= value; } 
    }
    private double _P_trmax;
    public double P_trmax
    {
        get { return this._P_trmax; }
        set { this._P_trmax= value; } 
    }
    public Snowaccumulation() { }
    
    public void  Calculate_snowaccumulation(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: SnowAccumulation -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: snowfall accumulation  calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
        //- inputs:
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
    //            * name: tmax
    //                          ** description : current maximum air temperature
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : °C
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
    //            * name: precip
    //                          ** description : recalculated precipitation
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : mm
    //                          ** uri : 
        //- outputs:
    //            * name: Snowaccu
    //                          ** description : snowfall accumulation
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
        double tmax = a.tmax;
        double precip = a.precip;
        double Snowaccu;
        double fs = 0.0d;
        Snowaccu = 0.0d;
        if (tmax < P_tsmax)
        {
            fs = 1.0d;
        }
        if (tmax >= P_tsmax && tmax <= P_trmax)
        {
            fs = (P_trmax - tmax) / (P_trmax - P_tsmax);
        }
        Snowaccu = fs * precip;
        s.Snowaccu= Snowaccu;
    }
}