import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    int tjul = jul.getValue();
    double tP_Tmf = P_Tmf.getValue();
    double tP_DKmax = P_DKmax.getValue();
    double tP_Kmin = P_Kmin.getValue();
    double ttavg = tavg.getValue();
    double tM = M.getValue();
    double K;
    tM = 0.0d;
    K = tP_DKmax / 2.0d * -Math.sin((2.0d * Math.PI * (double)(tjul) / 366.0d + (9.0d / 16.0d * Math.PI))) + tP_Kmin + (tP_DKmax / 2.0d);
    if (ttavg > tP_Tmf)
    {
        tM = K * (ttavg - tP_Tmf);
    }
    M.setValue(tM);
}