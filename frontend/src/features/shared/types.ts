export interface Template {
  id: string;
  name: string;
  category: string;
  structure: string;
  content: string;
  type: "system" | "user";
  createdAt: string;
  updatedAt: string;
}
