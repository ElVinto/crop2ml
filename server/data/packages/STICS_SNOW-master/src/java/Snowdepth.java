import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;
public class Snowdepth
{
    private double P_E;
    public double getP_E()
    { return P_E; }

    public void setP_E(double _P_E)
    { this.P_E= _P_E; } 
    
    public Snowdepth() { }
    public void  Calculate_snowdepth(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: SnowDepth -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: snow cover depth Calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
        //- inputs:
    //            * name: Snowmelt
    //                          ** description : snow melt 
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : mm
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
    //            * name: Sdepth
    //                          ** description : water in solid state in the snow cover
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : m
    //                          ** uri : 
        double Snowmelt = s.getSnowmelt();
        double Sdepth_t1 = s1.getSdepth();
        double Snowaccu = s.getSnowaccu();
        double M = s.getM();
        double Sdepth;
        Sdepth = 0.0d;
        if (Snowmelt <= Sdepth_t1 + (Snowaccu / 100))
        {
            Sdepth = Snowaccu / 100 + Sdepth_t1 - Snowmelt - (Sdepth_t1 * P_E);
        }
        s.setSdepth(Sdepth);
    }
}