export const Input = (props) => {
  const { type, placeholder, name, variant, value, onChange, required, accept, className } = props;
  return (
    <input
      className={`text-sm border-2 border-black rounded w-full text-slate-700 hover:border-green-800 ${variant} ${className}`}
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      autoComplete="off"
      value={value}          // <-- ini wajib
      onChange={onChange}    // <-- ini juga wajib
      required={required}    // <-- biar ikut flag dari atas
      accept={accept}
    />
  );
};


export const TextArea = (props) => {
  const { name, placeholder, value, onChange, required, className } = props;
  return (
    <textarea
      className={`text-sm border-2 border-black rounded w-full text-slate-700 hover:border-green-800 h-[150px] p-2 ${className}`}
      placeholder={placeholder}
      name={name}
      value={value}        // <-- wajib
      onChange={onChange}  // <-- wajib
      required={required}
    />
  );
};

