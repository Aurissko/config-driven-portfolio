import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { skillsRadarData } from '../../utils/dataLoader';

export default function SkillsRadar({ theme }) {
  const isDark = theme === 'dark';
  
  // Theme-aware colors
  const textColor = isDark ? '#94a3b8' : '#475569'; // slate-400 : slate-600
  const gridColor = isDark ? '#334155' : '#cbd5e1'; // slate-700 : slate-300
  const primaryColor = isDark ? '#3b82f6' : '#2563eb'; // blue-500 : blue-600

  return (
    <div className="w-full h-[300px] md:h-[350px] flex items-center justify-center -ml-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={skillsRadarData}>
          <PolarGrid stroke={gridColor} strokeDasharray="3 3" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 11, fontFamily: 'monospace' }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Proficiency"
            dataKey="score"
            stroke={primaryColor}
            strokeWidth={2}
            fill={primaryColor}
            fillOpacity={0.4}
          />
          <Tooltip
            contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderColor: isDark ? '#1e293b' : '#e2e8f0', borderRadius: '0.5rem', fontFamily: 'monospace', fontSize: '12px' }}
            itemStyle={{ color: primaryColor }}
            labelStyle={{ color: textColor, marginBottom: '4px' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}