import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;
public class Tavg
{
    
    public Tavg() { }
    public void  Calculate_tavg(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: Tavg -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: Mean temperature  calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
        //- inputs:
    //            * name: tmin
    //                          ** description : current minimum air temperature
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 500.0
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
        //- outputs:
    //            * name: tavg
    //                          ** description : mean temperature
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : °C
    //                          ** uri : 
        double tmin = a.gettmin();
        double tmax = a.gettmax();
        double tavg;
        tavg = (tmin + tmax) / 2;
        a.settavg(tavg);
    }
}