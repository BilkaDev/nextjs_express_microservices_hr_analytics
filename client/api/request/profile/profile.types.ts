export type Profile = {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
  iat: number;
};

export type ProfileAuthResponse = {
  currentUser: Profile | null;
};
