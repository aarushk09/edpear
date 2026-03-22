export type CertificateData = {
  studentName: string;
  courseName: string;
  completedAt: string | Date;
  instructorName: string;
  subtitle?: string;
};

export type CertificateRendererProps = {
  data: CertificateData;
  organizationName?: string;
  className?: string;
};
