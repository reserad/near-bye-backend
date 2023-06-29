export type JwtToken = {
  accessToken: string;
  refreshToken: string;
  tokenId: string;
  user: {
    id: string;
    phoneNumber: string;
  };
};
