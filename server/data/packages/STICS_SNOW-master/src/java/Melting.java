import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;
public class Melting
{
    private double P_Tmf;
    public double getP_Tmf()
    { return P_Tmf; }

    public void setP_Tmf(double _P_Tmf)
    { this.P_Tmf= _P_Tmf; } 
    
    private double P_DKmax;
    public double getP_DKmax()
    { return P_DKmax; }

    public void setP_DKmax(double _P_DKmax)
    { this.P_DKmax= _P_DKmax; } 
    
    private double P_Kmin;
    public double getP_Kmin()
    { return P_Kmin; }

    public void setP_Kmin(double _P_Kmin)
    { this.P_Kmin= _P_Kmin; } 
    
    public Melting() { }
    public void  Calculate_melting(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: Melting -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: snow in the process of melting
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
        //- inputs:
    //            * name: jul
    //                          ** description : current day of year for the calculation
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : INT
    //                          ** default : 0
    //                          ** min : 0
    //                          ** max : 366
    //                          ** unit : d
    //                          ** uri : 
    //            * name: P_Tmf
    //                          ** description : threshold temperature for snow melting 
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.5
    //                          ** min : 0.0
    //                          ** max : 1.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_DKmax
    //                          ** description : difference between the maximum and the minimum melting rates
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : mm °C-1 d-1
    //                          ** uri : 
    //            * name: P_Kmin
    //                          ** description : minimum melting rate on 21 December
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : mm °C-1 d-1
    //                          ** uri : 
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
        //- outputs:
    //            * name: M
    //                          ** description : snow in the process of melting
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : mm d-1
    //                          ** uri : 
        int jul = a.getjul();
        double tavg = a.gettavg();
        double M;
        double K;
        M = 0.0d;
        K = P_DKmax / 2.0d * -Math.sin((2.0d * Math.PI * (double)(jul) / 366.0d + (9.0d / 16.0d * Math.PI))) + P_Kmin + (P_DKmax / 2.0d);
        if (tavg > P_Tmf)
        {
            M = K * (tavg - P_Tmf);
        }
        s.setM(M);
    }
}