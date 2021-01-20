using System;
using System.Collections.Generic;
public class SnowState
{
    private double _tmaxrec;
    private double _ps;
    private double _Mrf;
    private double _Swet;
    private double _Snowmelt;
    private double _Snowaccu;
    private double _Sdry;
    private double _Sdepth;
    private double _tminrec;
    private double _M;
    private double _preciprec;
    private double _Sdepth_cm;
    
    public SnowState() { }
    
    
    public SnowState(SnowState toCopy, bool copyAll) // copy constructor 
    {
    if (copyAll)
    {
    
    _tmaxrec = toCopy._tmaxrec;
    _ps = toCopy._ps;
    _Mrf = toCopy._Mrf;
    _Swet = toCopy._Swet;
    _Snowmelt = toCopy._Snowmelt;
    _Snowaccu = toCopy._Snowaccu;
    _Sdry = toCopy._Sdry;
    _Sdepth = toCopy._Sdepth;
    _tminrec = toCopy._tminrec;
    _M = toCopy._M;
    _preciprec = toCopy._preciprec;
    _Sdepth_cm = toCopy._Sdepth_cm;
    }
    }
    public double tmaxrec
    {
        get { return this._tmaxrec; }
        set { this._tmaxrec= value; } 
    }
    public double ps
    {
        get { return this._ps; }
        set { this._ps= value; } 
    }
    public double Mrf
    {
        get { return this._Mrf; }
        set { this._Mrf= value; } 
    }
    public double Swet
    {
        get { return this._Swet; }
        set { this._Swet= value; } 
    }
    public double Snowmelt
    {
        get { return this._Snowmelt; }
        set { this._Snowmelt= value; } 
    }
    public double Snowaccu
    {
        get { return this._Snowaccu; }
        set { this._Snowaccu= value; } 
    }
    public double Sdry
    {
        get { return this._Sdry; }
        set { this._Sdry= value; } 
    }
    public double Sdepth
    {
        get { return this._Sdepth; }
        set { this._Sdepth= value; } 
    }
    public double tminrec
    {
        get { return this._tminrec; }
        set { this._tminrec= value; } 
    }
    public double M
    {
        get { return this._M; }
        set { this._M= value; } 
    }
    public double preciprec
    {
        get { return this._preciprec; }
        set { this._preciprec= value; } 
    }
    public double Sdepth_cm
    {
        get { return this._Sdepth_cm; }
        set { this._Sdepth_cm= value; } 
    }
}