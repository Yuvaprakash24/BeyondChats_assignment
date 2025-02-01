export interface Page {
  url: string;
  status: 'scraped' | 'pending' | 'failed';
  chunks: string[];
  title: string;
}

export interface User {
  name: string;
  email: string;
}

export interface Organization {
  name: string;
  website: string;
  description: string;
}