import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;
public class Tempmax
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
    
    public Tempmax() { }
    public void  Calculate_tempmax(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        //- Name: TempMax -Version: 1.0, -Time step: 1
        //- Description:
    //            * Title: Maximum temperature  recalculation
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
    //            * name: tmaxrec
    //                          ** description : recalculated maximum temperature
    //                          ** variablecategory : state
    //                          ** datatype : DOUBLE
    //                          ** min : 0.0
    //                          ** max : 500.0
    //                          ** unit : °C
    //                          ** uri : 
        double Sdepth_cm = s.getSdepth_cm();
        double tmax = a.gettmax();
        double tmaxrec;
        tmaxrec = tmax;
        if (Sdepth_cm > P_prof)
        {
            if (tmax < P_tminseuil)
            {
                tmaxrec = P_tminseuil;
            }
            else
            {
                if (tmax > P_tmaxseuil)
                {
                    tmaxrec = P_tmaxseuil;
                }
            }
        }
        else
        {
            if (Sdepth_cm > 0.0d)
            {
                if (tmax <= 0.0d)
                {
                    tmaxrec = P_tmaxseuil - ((1 - (Sdepth_cm / P_prof)) * -tmax);
                }
                else
                {
                    tmaxrec = 0.0d;
                }
            }
        }
        s.settmaxrec(tmaxrec);
    }
}