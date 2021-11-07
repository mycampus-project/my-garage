export type User = {
  fullName: string;
  email: string;
  role: Role;
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
  removedBy?: User;
};

export type Role = {
  name: string;
  createdAt: Date;
  removedAt?: Date;
  removedBy?: User;
};

export type Booking = {
  thingId: string;
  userId: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  removedAt?: Date;
  removedBy?: User;
};
