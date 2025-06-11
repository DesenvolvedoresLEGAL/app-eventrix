
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function Register() {
  return (
    <ProtectedRoute requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Eventrix</h1>
            <p className="text-gray-600">Plataforma de gestão de eventos</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
