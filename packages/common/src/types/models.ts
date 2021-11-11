export type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: Date;
  removedAt?: Date;
  removedBy?: User;
};

export type Thing = {
  name: string;
  description: string;
  type: string;
  createdAt: Date;
  createdBy: string;
  isAvailable: boolean;
  removedAt?: Date;
  removedBy?: string;
};

export type Role = {
  name: string;
  createdAt: Date;
  removedAt?: Date;
  removedBy?: string;
};

export type Booking = {
  thingId: string;
  userId: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  removedAt?: Date;
  removedBy?: string;
};
