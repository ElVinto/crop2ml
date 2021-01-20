import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    double tps = ps.getValue();
    double tM = M.getValue();
    double tSnowmelt = Snowmelt.getValue();
    tSnowmelt = 0.0d;
    if (tps > 1e-8d)
    {
        tSnowmelt = tM / tps;
    }
    Snowmelt.setValue(tSnowmelt);
}