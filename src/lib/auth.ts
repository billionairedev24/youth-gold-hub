export type UserRole = 'admin' | 'member' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

// Mock authentication - Replace with real authentication later
let currentUser: User | null = null;

export const auth = {
  signIn: async (phone: string): Promise<User> => {
    // Mock sign in - Replace with real authentication
    currentUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone,
      role: 'member'
    };
    return currentUser;
  },
  
  signUp: async (name: string, email: string, phone: string): Promise<User> => {
    // Mock sign up - Replace with real authentication
    currentUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role: 'member'
    };
    return currentUser;
  },

  signOut: async () => {
    currentUser = null;
  },

  getCurrentUser: () => currentUser,
};