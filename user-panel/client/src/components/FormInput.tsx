import type { FormInputContent } from '../types/auth';

const FormInput = ({ label, type, value, onChange }: FormInputContent) => {
  return (
    <div className="mb-3">
      <label htmlFor={label} className="form-label">
        {label}
      </label>

      <input
        id={label}
        type={type}
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
};
export default FormInput;
