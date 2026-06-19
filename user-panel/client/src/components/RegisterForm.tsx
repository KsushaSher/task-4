import FormInput from './FormInput';

interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function RegisterForm({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  onSubmit,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <FormInput label="Name" type="text" value={name} onChange={setName} />

      <FormInput label="Email" type="email" value={email} onChange={setEmail} />

      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />

      <button type="submit" className="btn btn-primary w-100">
        Register
      </button>
    </form>
  );
}
