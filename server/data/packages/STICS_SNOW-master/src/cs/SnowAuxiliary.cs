using System;
using System.Collections.Generic;

public class SnowAuxiliary
{
    private int _jul;
    private double _tmin;
    private double _tmax;
    private double _precip;
    private double _tavg;
    
    public SnowAuxiliary() { }
    
    
    public SnowAuxiliary(SnowAuxiliary toCopy, bool copyAll) // copy constructor 
    {
    if (copyAll)
    {
    
    _jul = toCopy._jul;
    _tmin = toCopy._tmin;
    _tmax = toCopy._tmax;
    _precip = toCopy._precip;
    _tavg = toCopy._tavg;
    }
    }
    public int jul
    {
        get { return this._jul; }
        set { this._jul= value; } 
    }
    public double tmin
    {
        get { return this._tmin; }
        set { this._tmin= value; } 
    }
    public double tmax
    {
        get { return this._tmax; }
        set { this._tmax= value; } 
    }
    public double precip
    {
        get { return this._precip; }
        set { this._precip= value; } 
    }
    public double tavg
    {
        get { return this._tavg; }
        set { this._tavg= value; } 
    }
}