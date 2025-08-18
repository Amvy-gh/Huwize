import Label from "./Label";
import { TextArea, Input } from "./Input";

export const InputLabel = ({
  label,
  name,
  type,
  placeholder,
  variant,
  value,
  onChange,
  className,
  required = true, // default true kecuali diset false
}) => {
  return (
    <div className="mb-6">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        variant={variant}
        value={value}
        onChange={onChange}
        required={type === "file" ? false : required} // File input tidak required
        accept={type === "file" ? "image/*" : undefined}
        className={className}
      />
    </div>
  );
};

export const TextAreaLabel = ({
  label,
  name,
  placeholder,
  variant,
  value,
  onChange,
  required = true,
  className,
}) => {
  return (
    <div className="mb-6">
      <Label htmlFor={name}>{label}</Label>
      <TextArea
        name={name}
        placeholder={placeholder}
        variant={variant}
        value={value}
        onChange={onChange}
        required={required}
        className={className}
      />
    </div>
  );
};

