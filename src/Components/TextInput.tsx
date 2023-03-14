import { useState } from 'react';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function TextInput({ label, value, onChange }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
}
