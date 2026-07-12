import { createContext, useContext, ReactNode } from 'react';
import { authClient } from '../lib/auth-client';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

interface AuthContextType {
  session: any;
  user: User | null;
  loading: boolean;
  error: any;
  signOut: () => Promise<void>;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: sessionData, isPending: loading, error, refetch } = authClient.useSession();

  const user = sessionData?.user ? {
    id: sessionData.user.id,
    name: sessionData.user.name,
    email: sessionData.user.email,
    role: (sessionData.user as any).role || 'user',
    image: sessionData.user.image || undefined
  } : null;

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      refetch();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session: sessionData,
        user,
        loading,
        error,
        signOut: handleSignOut,
        refetch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
