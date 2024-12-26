export interface Event {
  id: string;
  what: string;
  objectives: string;
  personnel: string;
  where: string;
  when: string;
  time: string;
  status: 'active' | 'archived';
}