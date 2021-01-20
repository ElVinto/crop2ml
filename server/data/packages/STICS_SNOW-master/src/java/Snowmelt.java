import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;
public class Snowmelt
{
    
    public Snowmelt() { }
    public void  Calculate_snowmelt(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: SnowMelt -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: Snow Melt
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
        //- inputs:
    //            * name: ps
    //                          ** description : density of snow cover
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
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
    //            * name: Snowmelt
    //                          ** description : Snow melt
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm
    //                          ** uri : 
        double ps = s.getps();
        double M = s.getM();
        double Snowmelt;
        Snowmelt = 0.0d;
        if (ps > 1e-8d)
        {
            Snowmelt = M / ps;
        }
        s.setSnowmelt(Snowmelt);
    }
}