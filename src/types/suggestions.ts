export interface SuggestionComment {
  id: string;
  content: string;
  createdAt: Date;
  authorName: string;
  authorRole?: 'admin' | 'member';
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'closed';
  createdAt: Date;
  authorName: string;
  authorRole?: 'admin' | 'member';
  comments: SuggestionComment[];
}