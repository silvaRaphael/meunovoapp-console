export interface User {
  username: string;
  name: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export const user: User = {
  username: "rsilva",
  name: "raphael",
  lastName: "silva",
  email: "rsilva@email.com",
  avatar: "https://ui.shadcn.com/avatars/02.png",
};
