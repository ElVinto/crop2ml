public class SnowComponent
{
    
    public SnowComponent() { }

    Melting _Melting = new Melting();
    Refreezing _Refreezing = new Refreezing();
    Snowaccumulation _Snowaccumulation = new Snowaccumulation();
    Snowdensity _Snowdensity = new Snowdensity();
    Snowdepth _Snowdepth = new Snowdepth();
    Snowdepthtrans _Snowdepthtrans = new Snowdepthtrans();
    Snowdry _Snowdry = new Snowdry();
    Snowmelt _Snowmelt = new Snowmelt();
    Snowwet _Snowwet = new Snowwet();
    Tavg _Tavg = new Tavg();
    Tempmax _Tempmax = new Tempmax();
    Tempmin _Tempmin = new Tempmin();
    Preciprec _Preciprec = new Preciprec();

    public double getP_tmaxseuil()
    { return _Tempmin.getP_tmaxseuil(); }
    public void setP_tmaxseuil(double P_tmaxseuil)
    { _Tempmin.setP_tmaxseuil(P_tmaxseuil);
        _Tempmax.setP_tmaxseuil(P_tmaxseuil); } 

    public double getP_tminseuil()
    { return _Tempmin.getP_tminseuil(); }
    public void setP_tminseuil(double P_tminseuil)
    { _Tempmin.setP_tminseuil(P_tminseuil);
        _Tempmax.setP_tminseuil(P_tminseuil); } 

    public double getP_prof()
    { return _Tempmin.getP_prof(); }
    public void setP_prof(double P_prof)
    { _Tempmin.setP_prof(P_prof);
        _Tempmax.setP_prof(P_prof); } 

    public double getP_E()
    { return _Snowdepth.getP_E(); }
    public void setP_E(double P_E)
    { _Snowdepth.setP_E(P_E); } 

    public double getP_Pns()
    { return _Snowdepthtrans.getP_Pns(); }
    public void setP_Pns(double P_Pns)
    { _Snowdepthtrans.setP_Pns(P_Pns); } 

    public double getP_Kmin()
    { return _Melting.getP_Kmin(); }
    public void setP_Kmin(double P_Kmin)
    { _Melting.setP_Kmin(P_Kmin); } 

    public double getP_Tmf()
    { return _Refreezing.getP_Tmf(); }
    public void setP_Tmf(double P_Tmf)
    { _Refreezing.setP_Tmf(P_Tmf);
        _Melting.setP_Tmf(P_Tmf); } 

    public double getP_SWrf()
    { return _Refreezing.getP_SWrf(); }
    public void setP_SWrf(double P_SWrf)
    { _Refreezing.setP_SWrf(P_SWrf); } 

    public double getP_tsmax()
    { return _Snowaccumulation.getP_tsmax(); }
    public void setP_tsmax(double P_tsmax)
    { _Snowaccumulation.setP_tsmax(P_tsmax); } 

    public double getP_DKmax()
    { return _Melting.getP_DKmax(); }
    public void setP_DKmax(double P_DKmax)
    { _Melting.setP_DKmax(P_DKmax); } 

    public double getP_trmax()
    { return _Snowaccumulation.getP_trmax(); }
    public void setP_trmax(double P_trmax)
    { _Snowaccumulation.setP_trmax(P_trmax); } 
    public void  Calculate_snow(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        _Tavg.Calculate_tavg(s, s1, r, a);
        _Refreezing.Calculate_refreezing(s, s1, r, a);
        _Melting.Calculate_melting(s, s1, r, a);
        _Snowdensity.Calculate_snowdensity(s, s1, r, a);
        _Snowmelt.Calculate_snowmelt(s, s1, r, a);
        _Snowaccumulation.Calculate_snowaccumulation(s, s1, r, a);
        _Snowdry.Calculate_snowdry(s, s1, r, a);
        _Snowwet.Calculate_snowwet(s, s1, r, a);
        _Snowdepth.Calculate_snowdepth(s, s1, r, a);
        _Preciprec.Calculate_preciprec(s, s1, r, a);
        _Snowdepthtrans.Calculate_snowdepthtrans(s, s1, r, a);
        _Tempmax.Calculate_tempmax(s, s1, r, a);
        _Tempmin.Calculate_tempmin(s, s1, r, a);
    }
    private double P_tmaxseuil;
    private double P_tminseuil;
    private double P_prof;
    private double P_E;
    private double P_Pns;
    private double P_Kmin;
    private double P_Tmf;
    private double P_SWrf;
    private double P_tsmax;
    private double P_DKmax;
    private double P_trmax;
    public SnowComponent(SnowComponent toCopy) // copy constructor 
    {
        this.P_tmaxseuil = toCopy.getP_tmaxseuil();
        this.P_tminseuil = toCopy.getP_tminseuil();
        this.P_prof = toCopy.getP_prof();
        this.P_E = toCopy.getP_E();
        this.P_Pns = toCopy.getP_Pns();
        this.P_Kmin = toCopy.getP_Kmin();
        this.P_Tmf = toCopy.getP_Tmf();
        this.P_SWrf = toCopy.getP_SWrf();
        this.P_tsmax = toCopy.getP_tsmax();
        this.P_DKmax = toCopy.getP_DKmax();
        this.P_trmax = toCopy.getP_trmax();

    }
    

    

    public void Init(SnowState s, SnowState s1, SnowRate r, SnowAuxiliary a)
    {
        preciprec = precip;
        tminrec = tmin;
        tmaxrec = tmax;
    }
    
}