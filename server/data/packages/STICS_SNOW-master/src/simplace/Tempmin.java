import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    double tSdepth_cm = Sdepth_cm.getValue();
    double tP_prof = P_prof.getValue();
    double ttmin = tmin.getValue();
    double tP_tminseuil = P_tminseuil.getValue();
    double tP_tmaxseuil = P_tmaxseuil.getValue();
    double ttminrec = tminrec.getValue();
    ttminrec = ttmin;
    if (tSdepth_cm > tP_prof)
    {
        if (ttmin < tP_tminseuil)
        {
            ttminrec = tP_tminseuil;
        }
        else
        {
            if (ttmin > tP_tmaxseuil)
            {
                ttminrec = tP_tmaxseuil;
            }
        }
    }
    else
    {
        if (tSdepth_cm > 0.0d)
        {
            ttminrec = tP_tminseuil - ((1 - (tSdepth_cm / tP_prof)) * (Math.abs(ttmin) + tP_tminseuil));
        }
    }
    tminrec.setValue(ttminrec);
}