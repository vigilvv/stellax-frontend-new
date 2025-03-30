
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, getCurrentUser } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: any | null;
  walletAddress: string | null;
  isLoading: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for current session
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const currentUser = await getCurrentUser();
        
        if (currentUser) {
          setUser(currentUser);
          setUserEmail(currentUser.email);
          
          // Get user profile data including wallet address
          const { data } = await supabase
            .from('user_profiles')
            .select('wallet_address')
            .eq('user_id', currentUser.id)
            .single();
            
          if (data) {
            setWalletAddress(data.wallet_address);
          }
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          setUserEmail(session.user.email);
          
          // Get user profile data
          const { data } = await supabase
            .from('user_profiles')
            .select('wallet_address')
            .eq('user_id', session.user.id)
            .single();
            
          if (data) {
            setWalletAddress(data.wallet_address);
          }
          
          navigate('/app');
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setWalletAddress(null);
          setUserEmail(null);
          navigate('/');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({
        title: "Success!",
        description: "You have successfully logged in",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An error occurred during login",
      });
      console.error("Login error:", error);
      throw error; // Re-throw to allow caller to catch
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Sign up the user
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: window.location.origin + '/login'
        }
      });
      
      if (error) throw error;
      
      // Generate dummy wallet address
      const walletAddress = `G${'x'.repeat(55)}`.replace(/x/g, () => {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"[Math.floor(Math.random() * 32)];
      });
      
      // Store user details
      if (data.user) {
        await supabase
          .from('user_profiles')
          .insert([{ 
            user_id: data.user.id, 
            email, 
            wallet_address: walletAddress 
          }]);
            
        setWalletAddress(walletAddress);
      }
      
      toast({
        title: "Account created!",
        description: "Please check your email to confirm your account",
      });
      
      // Do not automatically navigate or set user - they need to confirm email first
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up",
      });
      console.error("Sign up error:", error);
      throw error; // Re-throw the error so SignupPage can catch it
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message || "An error occurred during logout",
      });
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        walletAddress,
        isLoading,
        userEmail,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
