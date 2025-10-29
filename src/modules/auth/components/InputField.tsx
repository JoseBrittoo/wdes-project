import ErrorMessage from "./ErrorMessage";

type InputFieldProps = {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  errorMessage?: string;
  isError?: boolean;
};

export default function InputField({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  errorMessage,
  isError,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-[#032912] mb-2 text-left"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={id}
          required
          value={value ?? ""}
          onChange={onChange}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 input-focus ${
            isError ? "border-red-500" : ""
          }`}
          placeholder={placeholder}
        />
      </div>
      {isError && <ErrorMessage message={errorMessage ?? ""} />}
    </div>
  );
}
