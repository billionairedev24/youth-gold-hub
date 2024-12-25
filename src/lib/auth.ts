export type UserRole = 'admin' | 'member' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

// Mock users - Replace with real authentication later
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '1234567890',
    role: 'admin' as UserRole
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    phone: '0987654321',
    role: 'member' as UserRole
  }
];

let currentUser: User | null = null;

export const auth = {
  signIn: async (phone: string): Promise<User> => {
    const user = mockUsers.find(u => u.phone === phone);
    if (!user) {
      throw new Error('User not found');
    }
    currentUser = user;
    return user;
  },
  
  signUp: async (name: string, email: string, phone: string): Promise<User> => {
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role: 'member' as UserRole
    };
    mockUsers.push(newUser);
    currentUser = newUser;
    return newUser;
  },

  signOut: async () => {
    currentUser = null;
  },

  getCurrentUser: () => currentUser,
};