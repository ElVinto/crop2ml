import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    double tps_t1 = ps_t1.getValue();
    double tSdepth_t1 = Sdepth_t1.getValue();
    double tSdry_t1 = Sdry_t1.getValue();
    double tSwet_t1 = Swet_t1.getValue();
    double tps = ps.getValue();
    tps = 0.0d;
    if (Math.abs(tSdepth_t1) > 0.0d)
    {
        if (Math.abs(tSdry_t1 + tSwet_t1) > 0.0d)
        {
            tps = (tSdry_t1 + tSwet_t1) / tSdepth_t1;
        }
        else
        {
            tps = tps_t1;
        }
    }
    ps.setValue(tps);
}