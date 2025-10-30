import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase"; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Removed unused userName state
  // Removed unused profileType state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("name, profile")
          .eq("id", user.id)
          .single();

        if (!error && profileData) {
          // Removed unused setUserName logic
          // Removed unused setProfileType logic
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <Header/>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">{children}</main>
    </div>
  );
};

export default Layout;
