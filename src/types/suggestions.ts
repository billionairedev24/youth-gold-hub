export interface SuggestionComment {
  id: string;
  content: string;
  createdAt: Date;
  authorName: string;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  authorName: string;
  comments: SuggestionComment[];
}