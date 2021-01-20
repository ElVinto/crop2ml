import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;
public class Tempmin
{
    private double P_prof;
    public double getP_prof()
    { return P_prof; }

    public void setP_prof(double _P_prof)
    { this.P_prof= _P_prof; } 
    
    private double P_tminseuil;
    public double getP_tminseuil()
    { return P_tminseuil; }

    public void setP_tminseuil(double _P_tminseuil)
    { this.P_tminseuil= _P_tminseuil; } 
    
    private double P_tmaxseuil;
    public double getP_tmaxseuil()
    { return P_tmaxseuil; }

    public void setP_tmaxseuil(double _P_tmaxseuil)
    { this.P_tmaxseuil= _P_tmaxseuil; } 
    
    public Tempmin() { }
    public void  Calculate_tempmin(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: TempMin -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: Minimum temperature  calculation
    //            * Author: STICS
    //            * Reference: -
    //            * Institution: INRA
    //            * Abstract: -
        //- inputs:
    //            * name: Sdepth_cm
    //                          ** description : snow depth
    //                          ** inputtype : variable
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : cm
    //                          ** uri : 
    //            * name: P_prof
    //                          ** description : snow cover threshold for snow insulation 
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 1000
    //                          ** unit : cm
    //                          ** uri : 
    //            * name: tmin
    //                          ** description : current minimum air temperature
    //                          ** inputtype : variable
    //                          ** variablecategory : auxiliary
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 100.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_tminseuil
    //                          ** description : minimum temperature when snow cover is higher than prof
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 0.0
    //                          ** max : 5000.0
    //                          ** unit : °C
    //                          ** uri : 
    //            * name: P_tmaxseuil
    //                          ** description : maximum temperature when snow cover is higher than prof
    //                          ** inputtype : parameter
    //                          ** parametercategory : constant
    //                          ** datatype : DOUBLE
    //                          ** default : 0.0
    //                          ** min : 
    //                          ** max : 
    //                          ** unit : °C
    //                          ** uri : 
        //- outputs:
    //            * name: tminrec
    //                          ** description : recalculated minimum temperature
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : °C
    //                          ** uri : 
        double Sdepth_cm = s.getSdepth_cm();
        double tmin = a.gettmin();
        double tminrec;
        tminrec = tmin;
        if (Sdepth_cm > P_prof)
        {
            if (tmin < P_tminseuil)
            {
                tminrec = P_tminseuil;
            }
            else
            {
                if (tmin > P_tmaxseuil)
                {
                    tminrec = P_tmaxseuil;
                }
            }
        }
        else
        {
            if (Sdepth_cm > 0.0d)
            {
                tminrec = P_tminseuil - ((1 - (Sdepth_cm / P_prof)) * (Math.abs(tmin) + P_tminseuil));
            }
        }
        s.settminrec(tminrec);
    }
}