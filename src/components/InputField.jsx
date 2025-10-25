import { Input } from "./ui/input";

function InputField({
  label,
  name,
  value,
  onChange,
  errors,
  type,
  placeholder,
}) {
  return (
    <div className="relative space-y-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-muted-foreground"
      >
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground `}
      />
      <div className="min-h-[20px]">
        {errors && <p className="text-red-500 text-sm">{errors}</p>}
      </div>
    </div>
  );
}
export default InputField;
