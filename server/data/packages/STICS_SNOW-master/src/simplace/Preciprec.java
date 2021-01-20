import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    double tSdry_t1 = Sdry_t1.getValue();
    double tSdry = Sdry.getValue();
    double tSwet = Swet.getValue();
    double tSwet_t1 = Swet_t1.getValue();
    double tSdepth_t1 = Sdepth_t1.getValue();
    double tSdepth = Sdepth.getValue();
    double tMrf = Mrf.getValue();
    double tprecip = precip.getValue();
    double tSnowaccu = Snowaccu.getValue();
    double tpreciprec = preciprec.getValue();
    tpreciprec = tprecip;
    if (tSdry + tSwet < tSdry_t1 + tSwet_t1)
    {
        tpreciprec = tpreciprec + ((tSdepth_t1 - tSdepth) * 100) - tMrf;
    }
    tpreciprec = tpreciprec - tSnowaccu;
    preciprec.setValue(tpreciprec);
}