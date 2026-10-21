import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({ label, options = [], className = '', ...props }) {
  return (
    <div className="w-full text-left space-y-1.5 font-sans">
      {label && (
        <label className="block text-[11px] font-medium tracking-luxury uppercase text-burgundy/70">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          className={`w-full appearance-none bg-creme-50/70 border border-sand hover:border-dustyPink focus:border-burgundy rounded-xl px-4 py-3 pr-10 text-sm text-burgundy outline-none transition-all duration-300 focus:ring-2 focus:ring-burgundy/15 cursor-pointer backdrop-blur-sm ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value || opt}
              value={opt.value || opt}
              className="bg-creme text-burgundy py-2"
            >
              {opt.label || opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 w-4 h-4 text-burgundy/50 pointer-events-none" />
      </div>
    </div>
  );
}