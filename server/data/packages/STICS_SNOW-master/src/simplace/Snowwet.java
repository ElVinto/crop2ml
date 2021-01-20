import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    double tSwet_t1 = Swet_t1.getValue();
    double tprecip = precip.getValue();
    double tSnowaccu = Snowaccu.getValue();
    double tMrf = Mrf.getValue();
    double tM = M.getValue();
    double tSdry = Sdry.getValue();
    double tSwet = Swet.getValue();
    double frac_sdry;
    double tmp_swet;
    tSwet = 0.0d;
    if (tMrf <= tSwet_t1)
    {
        tmp_swet = tSwet_t1 + tprecip - tSnowaccu + tM - tMrf;
        frac_sdry = 0.1d * tSdry;
        if (tmp_swet < frac_sdry)
        {
            tSwet = tmp_swet;
        }
        else
        {
            tSwet = frac_sdry;
        }
    }
    Swet.setValue(tSwet);
}