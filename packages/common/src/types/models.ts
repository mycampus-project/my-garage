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
  id: string;
  name: string;
  description: string;
  type: string;
  createdAt: Date;
  createdBy: { id: string; fullName: string };
  isAvailable: boolean;
  removedAt?: Date;
  removedBy?: { id: string; fullName: string };
  imageUrl: string;
  maxBookingDuration: number;
};

export type Type = {
  id: string;
  name: string;
  createdAt: Date;
  maxBookingDuration: number;
  createdBy: { id: string; fullName: string };
  removedAt?: Date;
  removedBy?: { id: string; fullName: string };
};
export type Role = {
  name: string;
  createdAt: Date;
  removedAt?: Date;
  removedBy?: string;
};

export type BaseBooking = {
  id: string;
  thing: { id: string; name: string; description: string; type: string; imageUrl: string };
  startAt: Date;
  endAt: Date;
  createdAt: Date;
};

export type Booking = BaseBooking & {
  userId: string;
};

export type BookingWithUser = BaseBooking & {
  user: { id: string; fullName: string; email: string };
};
