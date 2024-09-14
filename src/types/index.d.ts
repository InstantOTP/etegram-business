type bussinessType = {
  name: string;
  username: string;
  type: string;
  useCase: string[];
  industry: string;
  softwareDeveloper: boolean;
  status: 'pending' | 'active';
  kycApprovalStatus: 'pending' | 'approved';
  createdAt: string;
  updatedAt: string;
  id: string;
  description: string;
  contactEmail: string;
  supportEmail: string;
  phone: string;
  address: {
    state: string;
    city: string;
    address: string;
  };
  website: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
};
