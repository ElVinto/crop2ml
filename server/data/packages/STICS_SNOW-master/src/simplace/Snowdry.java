import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    double tSdry_t1 = Sdry_t1.getValue();
    double tSnowaccu = Snowaccu.getValue();
    double tMrf = Mrf.getValue();
    double tM = M.getValue();
    double tSdry = Sdry.getValue();
    double tmp_sdry;
    tSdry = 0.0d;
    if (tM <= tSdry_t1)
    {
        tmp_sdry = tSnowaccu + tMrf - tM + tSdry_t1;
        if (tmp_sdry < 0.0d)
        {
            tSdry = 0.001d;
        }
        else
        {
            tSdry = tmp_sdry;
        }
    }
    Sdry.setValue(tSdry);
}