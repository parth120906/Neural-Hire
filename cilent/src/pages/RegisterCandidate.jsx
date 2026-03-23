import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterCandidatePage() {
  return (
    <RegisterForm
      role="candidate"
      title="Create your candidate account"
      subtitle="Join Neural Hire and start discovering your next opportunity."
      submitLabel="Create account"
      onSuccessRedirect="/jobs"
    />
  );
}
