export interface RoomInfo {
  token: string;
  channel: string;
  interest: string;
  matchFirstName: string;
}

export interface Interest {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  interests: Interest[]
}
