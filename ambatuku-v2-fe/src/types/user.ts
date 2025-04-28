export interface User {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  image: string;
  date: string;
  gender: "L" | "P";
  addresses: {
    fullAddress: string;
    note?: string;
    label: string;
    receiverName: string;
    phoneNumber: string;
    selected: boolean;
  }[];
  role: string;
}
