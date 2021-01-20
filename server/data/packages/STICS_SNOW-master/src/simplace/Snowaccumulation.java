import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    double tP_tsmax = P_tsmax.getValue();
    double ttmax = tmax.getValue();
    double tP_trmax = P_trmax.getValue();
    double tprecip = precip.getValue();
    double tSnowaccu = Snowaccu.getValue();
    double fs = 0.0d;
    tSnowaccu = 0.0d;
    if (ttmax < tP_tsmax)
    {
        fs = 1.0d;
    }
    if (ttmax >= tP_tsmax && ttmax <= tP_trmax)
    {
        fs = (tP_trmax - ttmax) / (tP_trmax - tP_tsmax);
    }
    tSnowaccu = fs * tprecip;
    Snowaccu.setValue(tSnowaccu);
}