/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  type: 'bar' | 'line';
  data: any[];
  className?: string;
  height?: number;
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  subtitle, 
  type, 
  data, 
  className,
  height = 300
}) => {
  return (
    <div className={cn('hubx-card p-5', className)}>
      <div className="mb-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                fontSize={12}
                tickMargin={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                fontSize={12}
                tickMargin={10}
              />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                fontSize={12}
                tickMargin={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                fontSize={12}
                tickMargin={10}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard;
