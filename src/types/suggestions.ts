export interface SuggestionComment {
  id: string;
  content: string;
  createdAt: Date;
  authorName: string;
  status?: 'pending' | 'approve' | 'reject' | 'close';
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