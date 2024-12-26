export interface Member {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  role: string;
}