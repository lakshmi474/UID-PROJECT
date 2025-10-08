import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function GrowthChart({ items }) {
  const data = useMemo(() => {
    // Flatten latest measurements as a simple snapshot chart by DOB order
    const sorted = [...items].sort((a, b) => new Date(a.dob) - new Date(b.dob));
    return sorted.map((it) => ({
      name: it.name,
      Height: it.latestHeightCm ?? null,
      Weight: it.latestWeightKg ?? null,
      Head: it.latestHeadCircumferenceCm ?? null
    }));
  }, [items]);

  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Height" stroke="#0d6efd" />
          <Line type="monotone" dataKey="Weight" stroke="#198754" />
          <Line type="monotone" dataKey="Head" stroke="#dc3545" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
