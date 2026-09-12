import React, { createContext, useContext, useState, useEffect } from 'react';
import sbrCoreClient from '../api/sbrCoreClient';

/**
 * ============================================================================
 * 🔐 AUTH CONTEXT - Global Authentication State
 * ============================================================================
 * Used in: sbrhikmah, sbrbeautyhub, sbrbioforge
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          sbrCoreClient.setToken(token);
          const profile = await sbrCoreClient.getProfile();
          setUser(profile);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (email, password, name) => {
    try {
      setLoading(true);
      setError(null);
      const response = await sbrCoreClient.register(email, password, name);
      setUser(response);
      return response;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await sbrCoreClient.login(email, password);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sbrCoreClient.logout();
    setUser(null);
  };

  const updateProfile = async (data) => {
    try {
      setLoading(true);
      await sbrCoreClient.updateProfile(data);
      const updatedUser = await sbrCoreClient.getProfile();
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
