import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    double ttmin = tmin.getValue();
    double ttmax = tmax.getValue();
    double ttavg = tavg.getValue();
    ttavg = (ttmin + ttmax) / 2;
    tavg.setValue(ttavg);
}