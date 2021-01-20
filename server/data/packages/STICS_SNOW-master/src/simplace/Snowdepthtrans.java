import  java.io.*;
import  java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javafx.util.*;

public void Process()
{
    double tSdepth = Sdepth.getValue();
    double tP_Pns = P_Pns.getValue();
    double tSdepth_cm = Sdepth_cm.getValue();
    tSdepth_cm = tSdepth * tP_Pns;
    Sdepth_cm.setValue(tSdepth_cm);
}