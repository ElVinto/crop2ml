using System;
using System.Collections.Generic;
using System.Linq;
public class Refreezing
{
    private double _P_Tmf;
    public double P_Tmf
    {
        get { return this._P_Tmf; }
        set { this._P_Tmf= value; } 
    }
    private double _P_SWrf;
    public double P_SWrf
    {
        get { return this._P_SWrf; }
        set { this._P_SWrf= value; } 
    }
    public Refreezing() { }
    
    public void  Calculate_refreezing(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: Refreezing -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: snowfall accumulation  calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
        //- inputs:
    //            * name: tavg
    //                          ** description : average temperature
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : °C
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
        //- outputs:
    //            * name: Mrf
    //                          ** description : liquid water in the snow cover in the process of refreezing
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
        double tavg = a.tavg;
        double Mrf;
        Mrf = 0.0d;
        if (tavg < P_Tmf)
        {
            Mrf = P_SWrf * (P_Tmf - tavg);
        }
        s.Mrf= Mrf;
    }
}