export type EmployeeType = {
  id: number;
  name: string;
  jobTitle: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Resigned';
  joiningDate: string;
};

export enum EmployeeTypeKeys {
  'EMP_NAME' = 'name',
  'EMP_JOB_TITLE' = 'jobTitle',
}
