import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
// In a real application, these would be environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication functions
export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Generate a dummy wallet address
    const walletAddress = generateDummyWalletAddress();

    // Store user details in the database
    if (data.user) {
      await supabase.from("user_profiles").insert([
        {
          user_id: data.user.id,
          email: email,
          wallet_address: walletAddress,
        },
      ]);
    }

    return { data, walletAddress };
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Get the user's wallet address
    const { data: profileData } = await supabase
      .from("user_profiles")
      .select("wallet_address")
      .eq("user_id", data.user.id)
      .single();

    return {
      user: data.user,
      walletAddress:
        profileData?.wallet_address || generateDummyWalletAddress(),
    };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Helper function to generate a dummy Stellar wallet address
export const generateDummyWalletAddress = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let result = "G";
  for (let i = 0; i < 55; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
