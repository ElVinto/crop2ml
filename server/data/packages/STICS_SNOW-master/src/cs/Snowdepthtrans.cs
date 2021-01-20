using System;
using System.Collections.Generic;
using System.Linq;
public class Snowdepthtrans
{
    private double _P_Pns;
    public double P_Pns
    {
        get { return this._P_Pns; }
        set { this._P_Pns= value; } 
    }
    public Snowdepthtrans() { }
    
    public void  Calculate_snowdepthtrans(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: SnowDepthTrans -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: snow cover depth conversion
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
        //- inputs:
    //            * name: Sdepth
    //                          ** description : snow cover depth Calculation
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 500.0
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
        //- outputs:
    //            * name: Sdepth_cm
    //                          ** description : snow cover depth in cm
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : cm
    //                          ** uri : 
        double Sdepth = s.Sdepth;
        double Sdepth_cm;
        Sdepth_cm = Sdepth * P_Pns;
        s.Sdepth_cm= Sdepth_cm;
    }
}