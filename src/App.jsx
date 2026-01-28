import React, { useMemo, useRef } from 'react';
import { 
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, ReferenceLine, Line, ComposedChart, Bar, Legend 
} from 'recharts';
import { TrendingUp, ArrowUpRight, Activity, Star, Download } from 'lucide-react';
import { SiTesla } from 'react-icons/si';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const rawData = [
    { "date": "2020-01", "stockReturn": 0.532556, "indexReturn": -0.005902, "stockPrice": 43.37 },
    { "date": "2020-02", "stockReturn": -0.008461, "indexReturn": -0.086981, "stockPrice": 44.53 },
    { "date": "2020-03", "stockReturn": -0.263279, "indexReturn": -0.13102, "stockPrice": 34.93 },
    { "date": "2020-04", "stockReturn": 0.551349, "indexReturn": 0.165867, "stockPrice": 52.13 },
    { "date": "2020-05", "stockReturn": 0.10596, "indexReturn": 0.061072, "stockPrice": 55.67 },
    { "date": "2020-06", "stockReturn": 0.25852, "indexReturn": 0.020242, "stockPrice": 71.99 },
    { "date": "2020-07", "stockReturn": 0.321108, "indexReturn": 0.053189, "stockPrice": 95.38 },
    { "date": "2020-08", "stockReturn": 0.719293, "indexReturn": 0.064487, "stockPrice": 166.11 },
    { "date": "2020-09", "stockReturn": -0.145637, "indexReturn": -0.041181, "stockPrice": 143.0 },
    { "date": "2020-10", "stockReturn": -0.119612, "indexReturn": -0.034233, "stockPrice": 129.35 },
    { "date": "2020-11", "stockReturn": 0.440609, "indexReturn": 0.098729, "stockPrice": 189.2 },
    { "date": "2020-12", "stockReturn": 0.18086, "indexReturn": 0.030226, "stockPrice": 235.22 },
    { "date": "2021-01", "stockReturn": 0.102952, "indexReturn": -0.01338, "stockPrice": 264.51 },
    { "date": "2021-02", "stockReturn": -0.170443, "indexReturn": 0.021436, "stockPrice": 225.17 },
    { "date": "2021-03", "stockReturn": -0.03214, "indexReturn": 0.033931, "stockPrice": 222.64 },
    { "date": "2021-04", "stockReturn": 0.030609, "indexReturn": 0.047183, "stockPrice": 236.48 },
    { "date": "2021-05", "stockReturn": -0.111651, "indexReturn": 0.002894, "stockPrice": 208.41 },
    { "date": "2021-06", "stockReturn": 0.08267, "indexReturn": 0.019205, "stockPrice": 226.57 },
    { "date": "2021-07", "stockReturn": 0.004796, "indexReturn": 0.02198, "stockPrice": 229.07 },
    { "date": "2021-08", "stockReturn": 0.051029, "indexReturn": 0.026282, "stockPrice": 245.24 },
    { "date": "2021-09", "stockReturn": 0.056397, "indexReturn": -0.048856, "stockPrice": 258.49 },
    { "date": "2021-10", "stockReturn": 0.431141, "indexReturn": 0.066761, "stockPrice": 371.33 },
    { "date": "2021-11", "stockReturn": -0.00021, "indexReturn": -0.009461, "stockPrice": 381.59 },
    { "date": "2021-12", "stockReturn": -0.089532, "indexReturn": 0.035491, "stockPrice": 352.26 },
    { "date": "2022-01", "stockReturn": -0.183864, "indexReturn": -0.054957, "stockPrice": 312.24 },
    { "date": "2022-02", "stockReturn": -0.069268, "indexReturn": -0.032222, "stockPrice": 290.14 },
    { "date": "2022-03", "stockReturn": 0.239076, "indexReturn": 0.038337, "stockPrice": 359.2 },
    { "date": "2022-04", "stockReturn": -0.194598, "indexReturn": -0.089947, "stockPrice": 290.25 },
    { "date": "2022-05", "stockReturn": -0.119091, "indexReturn": 0.000373, "stockPrice": 252.75 },
    { "date": "2022-06", "stockReturn": -0.108242, "indexReturn": -0.087812, "stockPrice": 224.47 },
    { "date": "2022-07", "stockReturn": 0.309031, "indexReturn": 0.09238, "stockPrice": 297.15 },
    { "date": "2022-08", "stockReturn": -0.085193, "indexReturn": -0.03827, "stockPrice": 275.61 },
    { "date": "2022-09", "stockReturn": -0.026891, "indexReturn": -0.089188, "stockPrice": 265.25 },
    { "date": "2022-10", "stockReturn": -0.105933, "indexReturn": 0.072636, "stockPrice": 227.54 },
    { "date": "2022-11", "stockReturn": -0.168126, "indexReturn": 0.045702, "stockPrice": 194.7 },
    { "date": "2022-12", "stockReturn": -0.374975, "indexReturn": -0.06059, "stockPrice": 123.18 },
    { "date": "2023-01", "stockReturn": 0.462142, "indexReturn": 0.057953, "stockPrice": 173.22 },
    { "date": "2023-02", "stockReturn": 0.182989, "indexReturn": -0.02455, "stockPrice": 205.71 },
    { "date": "2023-03", "stockReturn": 0.006062, "indexReturn": 0.03683, "stockPrice": 207.46 },
    { "date": "2023-04", "stockReturn": -0.17808, "indexReturn": 0.016401, "stockPrice": 164.31 },
    { "date": "2023-05", "stockReturn": 0.249801, "indexReturn": 0.00313, "stockPrice": 203.93 },
    { "date": "2023-06", "stockReturn": 0.292117, "indexReturn": 0.063913, "stockPrice": 261.77 },
    { "date": "2023-07", "stockReturn": -0.032768, "indexReturn": 0.031116, "stockPrice": 267.43 },
    { "date": "2023-08", "stockReturn": -0.030722, "indexReturn": -0.015543, "stockPrice": 258.08 },
    { "date": "2023-09", "stockReturn": -0.027365, "indexReturn": -0.053536, "stockPrice": 250.22 },
    { "date": "2023-10", "stockReturn": -0.179609, "indexReturn": -0.021174, "stockPrice": 200.84 },
    { "date": "2023-11", "stockReturn": 0.176632, "indexReturn": 0.087243, "stockPrice": 240.08 },
    { "date": "2023-12", "stockReturn": 0.065797, "indexReturn": 0.046146, "stockPrice": 248.48 },
    { "date": "2024-01", "stockReturn": -0.25108, "indexReturn": 0.021169, "stockPrice": 187.29 },
    { "date": "2024-02", "stockReturn": 0.070981, "indexReturn": 0.048376, "stockPrice": 201.88 },
    { "date": "2024-03", "stockReturn": -0.123329, "indexReturn": 0.030566, "stockPrice": 175.79 },
    { "date": "2024-04", "stockReturn": 0.040359, "indexReturn": -0.042275, "stockPrice": 183.28 },
    { "date": "2024-05", "stockReturn": -0.021538, "indexReturn": 0.049409, "stockPrice": 178.08 },
    { "date": "2024-06", "stockReturn": 0.110874, "indexReturn": 0.030834, "stockPrice": 197.88 },
    { "date": "2024-07", "stockReturn": 0.154462, "indexReturn": 0.009362, "stockPrice": 232.07 },
    { "date": "2024-08", "stockReturn": -0.059643, "indexReturn": 0.019964, "stockPrice": 214.11 },
    { "date": "2024-09", "stockReturn": 0.215414, "indexReturn": 0.024643, "stockPrice": 261.63 },
    { "date": "2024-10", "stockReturn": -0.048807, "indexReturn": -0.00908, "stockPrice": 249.85 },
    { "date": "2024-11", "stockReturn": 0.369465, "indexReturn": 0.054018, "stockPrice": 345.16 },
    { "date": "2024-12", "stockReturn": 0.146036, "indexReturn": -0.026238, "stockPrice": 403.84 }
];

const App = () => {
    const dashboardRef = useRef();

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

    const exportToPDF = async (e) => {
        const btn = e.currentTarget;
        const element = dashboardRef.current;
        if (!element) return;

        try {
            btn.innerText = "PREPARING...";
            btn.disabled = true;

            // حل "نووي" لمشكلة الألوان oklab وأحجام Recharts
            const canvas = await html2canvas(element, {
                scale: 1.5,
                useCORS: true,
                backgroundColor: '#000000',
                onclone: (clonedDoc) => {
                    // مسح كل ما يتعلق بـ oklab/oklch وتعديل الأحجام يدوياً في النسخة المصورة
                    const allNodes = clonedDoc.getElementsByTagName('*');
                    for (let node of allNodes) {
                        const style = window.getComputedStyle(node);
                        // استبدال ألوان Tailwind الحديثة بألوان كلاسيكية
                        if (style.color.includes('okl')) node.style.setProperty('color', '#ffffff', 'important');
                        if (style.backgroundColor.includes('okl')) node.style.setProperty('background-color', 'transparent', 'important');
                        if (style.borderColor.includes('okl')) node.style.setProperty('border-color', '#475569', 'important');
                        
                        // إزالة تأثير الزجاج المعقد
                        if (node.classList.contains('glass')) {
                            node.style.backdropFilter = 'none';
                            node.style.background = 'rgba(15, 23, 42, 0.98)';
                        }
                        // حل مشكلة عرض الرسوم البيانية
                        if (node.classList.contains('recharts-responsive-container')) {
                            node.style.width = '600px';
                            node.style.height = '350px';
                        }
                    }
                }
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Tesla_Report.pdf`);
        } catch (err) {
            console.error("PDF Crash:", err);
            alert("Export failed again. Trying a different method...");
        } finally {
            btn.innerText = "EXPORT REPORT";
            btn.disabled = false;
            // تنظيف الحاويات العالقة
            document.querySelectorAll('.html2canvas-container').forEach(el => el.remove());
        }
    };

    const scatterData = rawData.map(d => ({
        x: d.indexReturn * 100,
        y: d.stockReturn * 100,
        date: d.date
    }));

    return (
        <div ref={dashboardRef} className="relative min-h-screen p-4 md:p-10 overflow-hidden" 
             style={{ background: 'radial-gradient(circle at top center, #0f172a 0%, #000000 100%)' }}>
            
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
                            <p className="text-slate-400 font-medium text-sm tracking-widest opacity-70 uppercase">Beta Matrix V2.0</p>
                        </div>
                    </div>
                    <button 
                        onClick={exportToPDF}
                        className="mt-6 md:mt-0 flex items-center gap-3 bg-red-600/10 hover:bg-red-600/20 border border-red-500/50 text-red-500 px-8 py-4 rounded-2xl font-black transition-all group"
                    >
                        <Download className="w-5 h-5 group-hover:animate-bounce" />
                        EXPORT REPORT
                    </button>
                </header>

                {/* كروت الإحصائيات */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Beta (Sensitivity)', value: stats.beta, color: 'text-red-500', icon: <TrendingUp /> },
                        { label: 'Avg Monthly Return', value: stats.avgReturn + '%', color: 'text-slate-300', icon: <ArrowUpRight /> },
                        { label: 'Asset Volatility', value: stats.volatility + '%', color: 'text-red-500', icon: <Activity /> },
                        { label: 'Alpha (Edge)', value: stats.alpha + '%', color: 'text-slate-300', icon: <Star /> }
                    ].map((kpi, i) => (
                        <div key={i} className="glass p-8 rounded-[2rem] hover:border-red-500/50 transition-all cursor-default">
                            <div className={`p-3 w-fit rounded-xl bg-slate-900/80 mb-4 ${kpi.color}`}>
                                {kpi.icon}
                            </div>
                            <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{kpi.label}</h3>
                            <p className="text-4xl font-black text-white tracking-tighter">{kpi.value}</p>
                        </div>
                    ))}
                </div>

                {/* الرسوم البيانية */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <div className="glass p-8 rounded-[2.5rem]">
                        <h3 className="text-lg font-black text-white uppercase tracking-widest mb-10 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-red-600 rounded-full"></span> Regression Model
                        </h3>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                                    <XAxis type="number" dataKey="x" name="Market" unit="%" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={{stroke: '#475569'}} />
                                    <YAxis type="number" dataKey="y" name="TSLA" unit="%" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={{stroke: '#475569'}} />
                                    <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #dc2626', borderRadius: '12px', color: '#fff'}} />
                                    <Scatter name="Returns" data={scatterData} fill="#ef4444" fillOpacity={0.6} />
                                    <ReferenceLine x={0} stroke="#475569" strokeDasharray="3 3" />
                                    <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-[2.5rem]">
                        <h3 className="text-lg font-black text-white uppercase tracking-widest mb-10 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-slate-500 rounded-full"></span> Return Volatility
                        </h3>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={rawData.slice(-12)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                                    <XAxis dataKey="date" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={{stroke: '#475569'}} />
                                    <YAxis unit="%" tickFormatter={(v) => (v * 100).toFixed(0)} tick={{fill: '#94a3b8', fontSize: 10}} axisLine={{stroke: '#475569'}} />
                                    <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #dc2626', borderRadius: '12px'}} />
                                    <Bar name="TSLA Return" dataKey="stockReturn" fill="#dc2626" fillOpacity={0.8} radius={[4, 4, 0, 0]} />
                                    <Line name="S&P 500" type="monotone" dataKey="indexReturn" stroke="#94a3b8" strokeWidth={3} dot={{r: 4}} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* الجدول التاريخي */}
                <div className="glass rounded-[2.5rem] overflow-hidden shadow-2xl mb-10">
                    <div className="px-10 py-6 bg-red-900/10 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="text-lg font-black text-white uppercase tracking-widest">TSLA Historical Ledger</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-400 text-[10px] uppercase tracking-[0.3em] border-b border-slate-800/50">
                                    <th className="px-10 py-6">Date</th>
                                    <th className="px-10 py-6">Price ($)</th>
                                    <th className="px-10 py-6 text-right">TSLA Return</th>
                                    <th className="px-10 py-6 text-right">Market Return</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {rawData.slice(-10).reverse().map((row, idx) => (
                                    <tr key={idx} className="hover:bg-red-500/10 transition-colors">
                                        <td className="px-10 py-5 text-sm font-bold text-slate-200">{row.date}</td>
                                        <td className="px-10 py-5 text-sm text-slate-400 font-mono">${row.stockPrice.toFixed(2)}</td>
                                        <td className={`px-10 py-5 text-sm font-black text-right ${row.stockReturn >= 0 ? 'text-emerald-400' : 'text-red-500'}`}>
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