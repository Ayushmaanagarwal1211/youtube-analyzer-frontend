import React, { useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Context } from "./Context";

const MonthlyDistribution: React.FC = () => {
  const { monthlyData } = useContext(Context);
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Monthly Comment Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyDistribution;