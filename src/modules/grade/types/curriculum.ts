export interface Course {
  id: number;
  name: string;
  subjects?: Subject[];
  coordinator: string; 
}

export interface Subject {
  id: number;
  name: string;
  credits: number;
  period: number;
  prerequisites: string[];
}

export type SubjectStatus = "not-taken" | "taking" | "completed" | "failed";
