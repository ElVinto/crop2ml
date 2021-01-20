import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    double tSnowmelt = Snowmelt.getValue();
    double tSdepth_t1 = Sdepth_t1.getValue();
    double tSnowaccu = Snowaccu.getValue();
    double tP_E = P_E.getValue();
    double tM = M.getValue();
    double tSdepth = Sdepth.getValue();
    tSdepth = 0.0d;
    if (tSnowmelt <= tSdepth_t1 + (tSnowaccu / 100))
    {
        tSdepth = tSnowaccu / 100 + tSdepth_t1 - tSnowmelt - (tSdepth_t1 * tP_E);
    }
    Sdepth.setValue(tSdepth);
}