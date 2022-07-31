export interface jobDto {
  id: Number;
  title: string;
  description: string;
  rate: number;
  approved: boolean;
  status: string;
  userId: number;
  company_scale: string;
  company_tips: string;
  created_at: Date;
  job_info: string;
  Application?: applicationDto[];
}

export interface userDto {
  id: Number;
  name: string;
  password: string;
  role: string;
  title: string;
  description: string;
  rate: number;
  approved: boolean;
}

export interface applicationDto {
  id: Number;
  content: string;
  rate: number;
  answer?: string;
  answered: boolean;
  jobId: number;
  userId: number;
  user?: userDto;
}
