
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

const StealthScreen: React.FC<{ language?: Language }> = ({ language = 'en' }) => {
  const t = TRANSLATIONS[language].stealth;
  const hint = TRANSLATIONS[language]?.ui?.stealthHint || "Double click to restore game";

  // Generate some fake data rows
  const rows = Array.from({ length: 25 }).map((_, i) => (
    <tr key={i} className="odd:bg-white even:bg-gray-50 text-[10px] leading-none h-5 hover:bg-green-50 font-mono text-gray-600">
      <td className="border-r border-gray-300 px-1 text-center bg-gray-100">{i + 1}</td>
      <td className="border-r border-gray-300 px-2">2024-Q{Math.floor(Math.random() * 4) + 1}</td>
      <td className="border-r border-gray-300 px-2">{t.colProject}_{Math.random().toString(36).substring(7).toUpperCase()}</td>
      <td className="border-r border-gray-300 px-2 text-right">¥ {Math.floor(Math.random() * 100000).toLocaleString()}</td>
      <td className="border-r border-gray-300 px-2 text-right">¥ {Math.floor(Math.random() * 50000).toLocaleString()}</td>
      <td className="border-r border-gray-300 px-2">{Math.random() > 0.5 ? t.status.approved : t.status.pending}</td>
      <td className="border-r border-gray-300 px-2 text-right">{Math.floor(Math.random() * 100)}%</td>
      <td className="border-r border-gray-300 px-2">{t.colAnalysis}_V{i}.xlsx</td>
      <td className="px-2">{t.confidential}</td>
    </tr>
  ));

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden font-sans text-xs cursor-default select-none">
      {/* Toolbar - Excel Green Theme */}
      <div className="bg-[#107C41] text-white p-2 flex justify-between items-center">
        <div className="flex gap-4 items-center">
            <span className="font-bold">Excel</span>
            <span className="text-white/80">{t.filename}</span>
        </div>
        <div className="flex gap-2">
             <div className="w-3 h-3 bg-white/30 rounded-full"></div>
             <div className="w-3 h-3 bg-white/30 rounded-full"></div>
             <div className="w-3 h-3 bg-red-400 rounded-full"></div>
        </div>
      </div>
      
      {/* Ribbon */}
      <div className="bg-[#F3F4F6] border-b border-gray-300 p-2 flex gap-4 text-gray-700 overflow-x-auto">
        {t.menu.map((item, i) => (
            <span key={i} className={i === 1 ? "font-bold border-b-2 border-[#107C41] text-[#107C41]" : ""}>{item}</span>
        ))}
      </div>

      {/* Formula Bar */}
      <div className="bg-white border-b border-gray-300 p-1 flex gap-2 items-center">
         <div className="bg-gray-100 border border-gray-300 px-2 py-0.5 w-16 text-center text-gray-500">A1</div>
         <span className="text-gray-400">fx</span>
         <div className="flex-1 border border-gray-300 px-2 py-0.5 bg-white h-6"></div>
      </div>

      {/* Grid */}
      <div className="w-full h-full overflow-auto bg-gray-200 pb-20">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 font-normal text-[10px]">
              <th className="w-8 border border-gray-300"></th>
              <th className="w-24 border border-gray-300 font-normal">A</th>
              <th className="w-40 border border-gray-300 font-normal">B</th>
              <th className="w-32 border border-gray-300 font-normal">C</th>
              <th className="w-32 border border-gray-300 font-normal">D</th>
              <th className="w-32 border border-gray-300 font-normal">E</th>
              <th className="w-20 border border-gray-300 font-normal">F</th>
              <th className="w-40 border border-gray-300 font-normal">G</th>
              <th className="w-32 border border-gray-300 font-normal">H</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>

      {/* Footer Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#107C41] text-white text-[10px] p-1 flex justify-between px-4">
          <div className="flex gap-4">
              <span>{t.ready}</span>
          </div>
          <div className="flex gap-4">
              <span>100%</span>
          </div>
      </div>

      {/* Restore Hint */}
      <div className="absolute bottom-10 right-10 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow-lg border border-yellow-300 opacity-0 hover:opacity-100 transition-opacity duration-300">
          {hint}
      </div>
    </div>
  );
};

export default StealthScreen;
