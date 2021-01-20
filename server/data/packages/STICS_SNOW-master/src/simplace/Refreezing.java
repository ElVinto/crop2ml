import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    double ttavg = tavg.getValue();
    double tP_Tmf = P_Tmf.getValue();
    double tP_SWrf = P_SWrf.getValue();
    double tMrf = Mrf.getValue();
    tMrf = 0.0d;
    if (ttavg < tP_Tmf)
    {
        tMrf = tP_SWrf * (tP_Tmf - ttavg);
    }
    Mrf.setValue(tMrf);
}