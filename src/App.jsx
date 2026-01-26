import React, { useMemo } from 'react';
import { 
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, ReferenceLine, Line, ComposedChart, Bar, Legend 
} from 'recharts';
import { TrendingUp, ArrowUpRight, Activity, Star } from 'lucide-react';
import { SiTesla } from 'react-icons/si';

const rawData = [
    { date: '2020-01', stockReturn: 0.5325, indexReturn: -0.0059, stockPrice: 43.37 },
    { date: '2020-02', stockReturn: -0.0084, indexReturn: -0.0869, stockPrice: 44.53 },
    { date: '2020-03', stockReturn: -0.2155, indexReturn: -0.1251, stockPrice: 34.93 },
    { date: '2020-04', stockReturn: 0.4921, indexReturn: 0.1268, stockPrice: 52.12 },
    { date: '2020-05', stockReturn: 0.0679, indexReturn: 0.0453, stockPrice: 55.66 },
    { date: '2020-06', stockReturn: 0.2931, indexReturn: 0.0184, stockPrice: 71.97 },
    { date: '2020-07', stockReturn: 0.3250, indexReturn: 0.0551, stockPrice: 95.38 },
    { date: '2020-08', stockReturn: 0.7414, indexReturn: 0.0701, stockPrice: 166.10 },
    { date: '2020-09', stockReturn: -0.1390, indexReturn: -0.0392, stockPrice: 143.00 },
    { date: '2020-10', stockReturn: -0.0954, indexReturn: -0.0276, stockPrice: 129.35 },
    { date: '2020-11', stockReturn: 0.4627, indexReturn: 0.1075, stockPrice: 189.21 },
    { date: '2020-12', stockReturn: 0.2432, indexReturn: 0.0371, stockPrice: 235.22 },
    { date: '2021-01', stockReturn: 0.1245, indexReturn: -0.0111, stockPrice: 264.51 },
    { date: '2024-08', stockReturn: -0.0772, indexReturn: 0.0223, stockPrice: 214.11 },
    { date: '2024-09', stockReturn: 0.2154, indexReturn: 0.0246, stockPrice: 261.63 },
    { date: '2024-10', stockReturn: -0.0488, indexReturn: -0.0091, stockPrice: 249.85 },
    { date: '2024-11', stockReturn: 0.3694, indexReturn: 0.0572, stockPrice: 345.16 },
];

const App = () => {
    const stats = useMemo(() => {
        const n = rawData.length;
        const sumX = rawData.reduce((acc, val) => acc + val.indexReturn, 0);
        const sumY = rawData.reduce((acc, val) => acc + val.stockReturn, 0);
        const sumXY = rawData.reduce((acc, val) => acc + (val.indexReturn * val.stockReturn), 0);
        const sumXX = rawData.reduce((acc, val) => acc + (val.indexReturn * val.indexReturn), 0);

        const beta = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const alpha = (sumY - beta * sumX) / n;
        const avgStockReturn = sumY / n;
        const stockVar = rawData.reduce((acc, val) => acc + Math.pow(val.stockReturn - avgStockReturn, 2), 0) / n;
        const stockVol = Math.sqrt(stockVar);

        return {
            beta: beta.toFixed(2),
            alpha: (alpha * 100).toFixed(2),
            avgReturn: (avgStockReturn * 100).toFixed(2),
            volatility: (stockVol * 100).toFixed(2)
        };
    }, []);

    const scatterData = rawData.map(d => ({
        x: d.indexReturn * 100,
        y: d.stockReturn * 100,
        date: d.date
    }));

    const minX = -15;
    const maxX = 15;
    const trendLineData = [
        { x: minX, y: (parseFloat(stats.alpha) / 100 + parseFloat(stats.beta) * (minX / 100)) * 100 },
        { x: maxX, y: (parseFloat(stats.alpha) / 100 + parseFloat(stats.beta) * (maxX / 100)) * 100 }
    ];

    return (
        <div className="relative min-h-screen p-4 md:p-10 overflow-hidden bg-[#020617]">
            <div className="relative z-10 max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row items-center justify-between glass p-8 rounded-[2.5rem] mb-10 shadow-2xl">
                    <div className="flex items-center gap-6">
                        <div className="bg-red-500/20 p-4 rounded-2xl border border-red-500/30">
                            <SiTesla className="text-red-500 w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">
                                Tesla <span className="text-red-500">Cyber</span> Analytics
                            </h1>
                            <p className="text-slate-400 font-medium text-sm tracking-widest opacity-70">TSLA PERFORMANCE DASHBOARD</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Beta (Sensitivity)', value: stats.beta, color: 'text-red-500', icon: <TrendingUp /> },
                        { label: 'Avg Monthly Return', value: stats.avgReturn + '%', color: 'text-slate-300', icon: <ArrowUpRight /> },
                        { label: 'Asset Volatility', value: stats.volatility + '%', color: 'text-red-500', icon: <Activity /> },
                        { label: 'Alpha (Edge)', value: stats.alpha + '%', color: 'text-slate-300', icon: <Star /> }
                    ].map((kpi, i) => (
                        <div key={i} className="glass p-8 rounded-[2rem] hover:border-red-500/50 transition-all cursor-default group">
                            <div className={`p-3 w-fit rounded-xl bg-slate-900/80 mb-4 ${kpi.color}`}>
                                {kpi.icon}
                            </div>
                            <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{kpi.label}</h3>
                            <p className="text-4xl font-black text-white tracking-tighter">{kpi.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <div className="glass p-8 rounded-[2.5rem]">
                        <h3 className="text-lg font-black text-white uppercase tracking-widest mb-10 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-red-600 rounded-full"></span> Regression Analysis
                        </h3>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                                    <XAxis type="number" dataKey="x" name="Market" unit="%" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={{stroke: '#475569'}} />
                                    <YAxis type="number" dataKey="y" name="TSLA" unit="%" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={{stroke: '#475569'}} />
                                    {/* التعديل هنا لظهور النصوص باللون الأبيض */}
                                    <Tooltip 
                                        contentStyle={{backgroundColor: '#0f172a', border: '1px solid #dc2626', borderRadius: '12px'}}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ color: '#94a3b8' }}
                                        cursor={{strokeDasharray: '3 3'}} 
                                    />
                                    <Scatter name="Returns" data={scatterData} fill="#ef4444" fillOpacity={0.7} shape="circle" />
                                    <ReferenceLine x={0} stroke="#475569" strokeDasharray="3 3" />
                                    <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" />
                                    <Line type="monotone" data={trendLineData} dataKey="y" stroke="#ffffff" strokeWidth={2} dot={false} opacity={0.3} />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-[2.5rem]">
                        <h3 className="text-lg font-black text-white uppercase tracking-widest mb-10 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-slate-500 rounded-full"></span> Performance Trajectory
                        </h3>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={rawData.slice(-10)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                                    <XAxis dataKey="date" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={{stroke: '#475569'}} />
                                    <YAxis unit="%" tickFormatter={(v) => (v * 100).toFixed(0)} tick={{fill: '#94a3b8', fontSize: 10}} axisLine={{stroke: '#475569'}} />
                                    {/* التعديل هنا أيضاً */}
                                    <Tooltip 
                                        contentStyle={{backgroundColor: '#0f172a', border: '1px solid #dc2626', borderRadius: '12px'}}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ color: '#fff' }}
                                    />
                                    <Legend verticalAlign="top" align="right" wrapperStyle={{paddingBottom: '20px', fontSize: '10px', color: '#94a3b8'}} />
                                    <Bar name="TSLA Return" dataKey="stockReturn" fill="#dc2626" fillOpacity={0.8} radius={[4, 4, 0, 0]} />
                                    <Line name="S&P 500" type="monotone" dataKey="indexReturn" stroke="#94a3b8" strokeWidth={3} dot={{r: 4, fill: '#475569', stroke: '#94a3b8'}} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="glass rounded-[2.5rem] overflow-hidden shadow-2xl mb-10">
                    <div className="px-10 py-6 bg-red-900/10 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="text-lg font-black text-white uppercase tracking-widest">Historical Data Ledger</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-400 text-[10px] uppercase tracking-[0.3em] border-b border-slate-800/50">
                                    <th className="px-10 py-6">Date</th>
                                    <th className="px-10 py-6">TSLA Price ($)</th>
                                    <th className="px-10 py-6 text-right">TSLA Return</th>
                                    <th className="px-10 py-6 text-right">Market Return</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {rawData.slice(0, 10).map((row, idx) => (
                                    <tr key={idx} className="hover:bg-red-500/10 transition-colors">
                                        <td className="px-10 py-5 text-sm font-bold text-slate-200">{row.date}</td>
                                        <td className="px-10 py-5 text-sm text-slate-400 font-mono">${row.stockPrice.toFixed(2)}</td>
                                        <td className={`px-10 py-5 text-sm font-black text-right ${
                                            row.stockReturn >= 0 ? 'text-emerald-400' : 'text-red-500'
                                        }`}>
                                            {(row.stockReturn * 100).toFixed(2)}%
                                        </td>
                                        <td className="px-10 py-5 text-sm font-bold text-right text-slate-500">
                                            {(row.indexReturn * 100).toFixed(2)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;