using System;
using System.Collections.Generic;
using System.Linq;
public class Snowdry
{
    
    public Snowdry() { }
    
    public void  Calculate_snowdry(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: SnowDry -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: water in solid state in the snow cover Calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
        //- inputs:
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
    //            * name: Snowaccu
    //                          ** description : snowfall accumulation
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: Mrf
    //                          ** description : liquid water in the snow cover in the process of refreezing
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : mm
    //                          ** uri : 
    //            * name: M
    //                          ** description : snow in the process of melting
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : mm
    //                          ** uri : 
        //- outputs:
    //            * name: Sdry
    //                          ** description : water in solid state in the snow cover
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
        double Sdry_t1 = s1.Sdry;
        double Snowaccu = s.Snowaccu;
        double Mrf = s.Mrf;
        double M = s.M;
        double Sdry;
        double tmp_sdry;
        Sdry = 0.0d;
        if (M <= Sdry_t1)
        {
            tmp_sdry = Snowaccu + Mrf - M + Sdry_t1;
            if (tmp_sdry < 0.0d)
            {
                Sdry = 0.001d;
            }
            else
            {
                Sdry = tmp_sdry;
            }
        }
        s.Sdry= Sdry;
    }
}