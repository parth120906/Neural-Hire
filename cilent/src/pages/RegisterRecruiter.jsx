import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterRecruiterPage() {
  return (
    <RegisterForm
      role="recruiter"
      title="Create your recruiter account"
      subtitle="Tell us about your company and start posting jobs right away."
      submitLabel="Create recruiter account"
      onSuccessRedirect="/recuiter/dashboard"
    />
  );
}
