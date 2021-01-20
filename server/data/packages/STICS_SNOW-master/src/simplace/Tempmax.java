import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    double tSdepth_cm = Sdepth_cm.getValue();
    double tP_prof = P_prof.getValue();
    double ttmax = tmax.getValue();
    double tP_tminseuil = P_tminseuil.getValue();
    double tP_tmaxseuil = P_tmaxseuil.getValue();
    double ttmaxrec = tmaxrec.getValue();
    ttmaxrec = ttmax;
    if (tSdepth_cm > tP_prof)
    {
        if (ttmax < tP_tminseuil)
        {
            ttmaxrec = tP_tminseuil;
        }
        else
        {
            if (ttmax > tP_tmaxseuil)
            {
                ttmaxrec = tP_tmaxseuil;
            }
        }
    }
    else
    {
        if (tSdepth_cm > 0.0d)
        {
            if (ttmax <= 0.0d)
            {
                ttmaxrec = tP_tmaxseuil - ((1 - (tSdepth_cm / tP_prof)) * -ttmax);
            }
            else
            {
                ttmaxrec = 0.0d;
            }
        }
    }
    tmaxrec.setValue(ttmaxrec);
}