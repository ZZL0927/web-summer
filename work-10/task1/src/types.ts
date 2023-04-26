export interface ICapsule {
  id: string;
  name: string;
  email: string;
  time: string;
  content: string;
  tip: string;
}

export interface ICapsuleRes {
  id?: string;
  msg?: string;
  data?: ICapsule;
  stat: string;
}
