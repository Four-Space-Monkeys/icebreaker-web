export interface RoomInfo {
  token: string;
  channel: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  interests: { id: number, name: string }[]
}
