import { User, Thing } from '@my-garage/common';
import { BookingData } from 'src/types/adminTypes';

export const ArrayOfUsers: User[] = [
  {
    id: '1',
    fullName: 'Fred Jones',
    email: 'fredjones@fake.com',
    role: 'User',
    createdAt: new Date('05/31/2021 14:03:28'),
  },
  {
    id: '2',
    fullName: 'Mary Lamb',
    email: 'marylamb@fake.com',
    role: 'Admin',
    createdAt: new Date('08/30/2021 16:58:28'),
  },
  {
    id: '3',
    fullName: 'Billy Bob',
    email: 'billybob@fake.com',
    role: 'Admin',
    createdAt: new Date('04/20/2021 08:07:55'),
  },
  {
    id: '4',
    fullName: 'Joe Bloggs',
    email: 'joebloggs@fake.com',
    role: 'User',
    createdAt: new Date('02/17/2021 12:11:32'),
  },
  {
    id: '5',
    fullName: 'Jane Doe',
    email: 'janedoe@fake.com',
    role: 'User',
    createdAt: new Date('09/08/2021 10:35:04'),
  },
  {
    id: '6',
    fullName: 'Fred Jones2',
    email: 'fredjones2@fake.com',
    role: 'User',
    createdAt: new Date('05/31/2021 14:03:28'),
  },
  {
    id: '7',
    fullName: 'Mary Lamb2',
    email: 'marylamb2@fake.com',
    role: 'User',
    createdAt: new Date('08/30/2021 16:58:28'),
  },
  {
    id: '8',
    fullName: 'Billy Bob2',
    email: 'billybob2@fake.com',
    role: 'User',
    createdAt: new Date('04/20/2021 08:07:55'),
  },
  {
    id: '9',
    fullName: 'Joe Bloggs2',
    email: 'joebloggs2@fake.com',
    role: 'User',
    createdAt: new Date('02/17/2021 12:11:32'),
  },
  {
    id: '10',
    fullName: 'Jane Doe2',
    email: 'janedoe2@fake.com',
    role: 'User',
    createdAt: new Date('09/08/2021 10:35:04'),
  },
  {
    id: '11',
    fullName: 'Fred Jones3',
    email: 'fredjones3@fake.com',
    role: 'User',
    createdAt: new Date('05/31/2021 14:03:28'),
  },
  {
    id: '12',
    fullName: 'Mary Lamb3',
    email: 'marylamb3@fake.com',
    role: 'User',
    createdAt: new Date('08/30/2021 16:58:28'),
  },
  {
    id: '13',
    fullName: 'Billy Bob3',
    email: 'billybob3@fake.com',
    role: 'User',
    createdAt: new Date('04/20/2021 08:07:55'),
  },
  {
    id: '14',
    fullName: 'Joe Bloggs3',
    email: 'joebloggs3@fake.com',
    role: 'User',
    createdAt: new Date('02/17/2021 12:11:32'),
  },
  {
    id: '15',
    fullName: 'Jane Doe3',
    email: 'janedoe2@fake.com',
    role: 'User',
    createdAt: new Date('09/08/2021 10:35:04'),
  },
];

export const ArrayOfThings: Thing[] = [
  {
    id: '1',
    name: 'Media Office',
    description: 'Video editing software and computer area.',
    type: 'Room',
    createdAt: new Date(),
    createdBy: { id: '1', fullName: 'Mike' },
    isAvailable: true,
    image: {
      dataUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  },
  {
    id: '2',
    name: '3D Printer 1',
    description: 'Large 3D printer',
    type: 'Printer',
    createdAt: new Date(),
    createdBy: { id: '1', fullName: 'Mike' },
    isAvailable: false,
    image: {
      dataUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  },
  {
    id: '3',
    name: 'Occulus Rift Headset',
    description: 'Augmented reality headset and controllers',
    type: 'AR',
    createdAt: new Date(),
    createdBy: { id: '1', fullName: 'Mike' },
    isAvailable: true,
    image: {
      dataUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  },
  {
    id: '4',
    name: 'Meeting Space',
    description: '10 seating office meeting room. With whiteboards and TV screen.',
    type: 'Room',
    createdAt: new Date(),
    createdBy: { id: '1', fullName: 'Mike' },
    isAvailable: true,
    image: {
      dataUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  },
  {
    id: '5',
    name: '3D Printer 2',
    description: 'Medium 3D printer',
    type: 'Printer',
    createdAt: new Date(),
    createdBy: { id: '1', fullName: 'Mike' },
    isAvailable: true,
    image: {
      dataUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  },
  {
    id: '6',
    name: '3D Printer 3',
    description: 'Small 3D printer',
    type: 'Printer',
    createdAt: new Date(),
    createdBy: { id: '1', fullName: 'Mike' },
    isAvailable: true,
    image: {
      dataUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  },
  {
    id: '7',
    name: 'Raspberry Pi 1',
    description: 'Model 4 micro computer',
    type: 'Computer',
    createdAt: new Date(),
    createdBy: { id: '1', fullName: 'Mike' },
    isAvailable: false,
    image: {
      dataUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  },
  {
    id: '8',
    name: 'Raspberry Pi 2',
    description: 'Model 4 micro computer',
    type: 'Computer',
    createdAt: new Date(),
    createdBy: { id: '1', fullName: 'Mike' },
    isAvailable: true,
    image: {
      dataUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  },
  {
    id: '9',
    name: 'Raspberry Pi 3',
    description: 'Model 4 micro computer',
    type: 'Computer',
    createdAt: new Date(),
    createdBy: { id: '1', fullName: 'Mike' },
    isAvailable: true,
    image: {
      dataUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  },
  {
    id: '10',
    name: 'Raspberry Pi 4',
    description: 'Model 4 micro computer',
    type: 'Computer',
    createdAt: new Date(),
    createdBy: { id: '1', fullName: 'Mike' },
    isAvailable: true,
    image: {
      dataUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  },
];

export const CurrentBooking: BookingData[] = [
  {
    user: ArrayOfUsers[6],
    thing: ArrayOfThings[1],
    date: new Date(),
  },
  {
    user: ArrayOfUsers[5],
    thing: ArrayOfThings[6],
    date: new Date(),
  },
  {
    user: ArrayOfUsers[9],
    thing: ArrayOfThings[4],
    date: new Date(),
  },
  {
    user: ArrayOfUsers[2],
    thing: ArrayOfThings[2],
    date: new Date(),
  },
  {
    user: ArrayOfUsers[11],
    thing: ArrayOfThings[0],
    date: new Date(),
  },
  {
    user: ArrayOfUsers[9],
    thing: ArrayOfThings[7],
    date: new Date(),
  },
  {
    user: ArrayOfUsers[12],
    thing: ArrayOfThings[6],
    date: new Date(),
  },
  {
    user: ArrayOfUsers[12],
    thing: ArrayOfThings[6],
    date: new Date(),
  },
  {
    user: ArrayOfUsers[10],
    thing: ArrayOfThings[4],
    date: new Date(),
  },
  {
    user: ArrayOfUsers[7],
    thing: ArrayOfThings[9],
    date: new Date(),
  },
  {
    user: ArrayOfUsers[9],
    thing: ArrayOfThings[0],
    date: new Date(),
  },
  {
    user: ArrayOfUsers[14],
    thing: ArrayOfThings[0],
    date: new Date(),
  },
];

export const PreviousBooking: BookingData[] = [
  {
    user: ArrayOfUsers[0],
    thing: ArrayOfThings[9],
    date: new Date('2021-11-08T16:08:54.14Z'),
  },
  {
    user: ArrayOfUsers[6],
    thing: ArrayOfThings[0],
    date: new Date('2021-11-08T16:08:54.14Z'),
  },
  {
    user: ArrayOfUsers[14],
    thing: ArrayOfThings[8],
    date: new Date('2021-11-08T16:08:54.14Z'),
  },
  {
    user: ArrayOfUsers[7],
    thing: ArrayOfThings[4],
    date: new Date('2021-11-08T16:08:54.14Z'),
  },
  {
    user: ArrayOfUsers[5],
    thing: ArrayOfThings[7],
    date: new Date('2021-11-08T16:08:54.14Z'),
  },
  {
    user: ArrayOfUsers[4],
    thing: ArrayOfThings[5],
    date: new Date('2021-11-08T16:08:54.14Z'),
  },
  {
    user: ArrayOfUsers[9],
    thing: ArrayOfThings[0],
    date: new Date('2021-11-08T16:08:54.14Z'),
  },
  {
    user: ArrayOfUsers[13],
    thing: ArrayOfThings[6],
    date: new Date('2021-11-08T16:08:54.14Z'),
  },
  {
    user: ArrayOfUsers[12],
    thing: ArrayOfThings[9],
    date: new Date('2021-11-08T16:08:54.14Z'),
  },
  {
    user: ArrayOfUsers[2],
    thing: ArrayOfThings[5],
    date: new Date('2021-11-08T16:08:54.14Z'),
  },
  {
    user: ArrayOfUsers[13],
    thing: ArrayOfThings[2],
    date: new Date('2021-11-08T16:08:54.14Z'),
  },
  {
    user: ArrayOfUsers[9],
    thing: ArrayOfThings[1],
    date: new Date('2021-11-08T16:08:54.14Z'),
  },
];
