type FacultyDetails = {
  duration: number;
  credits: number;
  admissionTest: boolean;
  maxStudents?: number;
  mainSubjects: string[];
  careerOpportunities: string[];
  employmentRate: number;
  laboratoryHours?: number;
  longDescription: string;
};

export type Faculty = {
  readonly id: number;
  readonly title: string;
  readonly category: string;
  details: FacultyDetails;
};
