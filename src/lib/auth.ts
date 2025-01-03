export type UserRole = 'admin' | 'member' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

// Mock users - Replace with real authentication later
let mockUsers = [
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
  },
  {
    id: '3',
    name: 'Test Admin',
    email: 'testadmin@example.com',
    phone: '111',
    role: 'admin' as UserRole
  },
  {
    id: '4',
    name: 'Test User',
    email: 'testuser@example.com',
    phone: '222',
    role: 'member' as UserRole
  }
];

let currentUser: User | null = null;

export const auth = {
  signIn: async (phone: string): Promise<User> => {
    const user = mockUsers.find(u => u.phone === phone);
    if (!user) {
      throw new Error('Invalid phone number. For testing, use: 111 (admin) or 222 (user)');
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

  updateUserProfile: (updates: Partial<User>) => {
    if (!currentUser) return;
    
    // Update mock users array
    mockUsers = mockUsers.map(user => 
      user.id === currentUser?.id 
        ? { ...user, ...updates }
        : user
    );

    // Update current user
    currentUser = { ...currentUser, ...updates };
    
    return currentUser;
  }
};