import { RegistrationFlow } from "@/components/registration-flow"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <RegistrationFlow />
    </div>
  )
}
