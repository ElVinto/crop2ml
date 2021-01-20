import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;
public class Snowdensity
{
    
    public Snowdensity() { }
    public void  Calculate_snowdensity(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: SnowDensity -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: Density of snow cover calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
        //- inputs:
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
    //            * name: Swet_t1
    //                          ** description : water in liquid state in the snow cover
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : mm
    //                          ** uri : 
        //- outputs:
    //            * name: ps
    //                          ** description : density of snow cover
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : kg m-3
    //                          ** uri : 
        double ps_t1 = s1.getps();
        double Sdepth_t1 = s1.getSdepth();
        double Sdry_t1 = s1.getSdry();
        double Swet_t1 = s1.getSwet();
        double ps;
        ps = 0.0d;
        if (Math.abs(Sdepth_t1) > 0.0d)
        {
            if (Math.abs(Sdry_t1 + Swet_t1) > 0.0d)
            {
                ps = (Sdry_t1 + Swet_t1) / Sdepth_t1;
            }
            else
            {
                ps = ps_t1;
            }
        }
        s.setps(ps);
    }
}