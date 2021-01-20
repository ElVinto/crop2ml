import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;
public class Snowdepthtrans
{
    private double P_Pns;
    public double getP_Pns()
    { return P_Pns; }

    public void setP_Pns(double _P_Pns)
    { this.P_Pns= _P_Pns; } 
    
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
        double Sdepth = s.getSdepth();
        double Sdepth_cm;
        Sdepth_cm = Sdepth * P_Pns;
        s.setSdepth_cm(Sdepth_cm);
    }
}