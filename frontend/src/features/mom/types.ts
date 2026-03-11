export interface Template {
    id: string;
    name: string;
    content: string;
    structure: string;
    category: string;
    type: "system" | "user";
    createdAt?: string;
    updatedAt?: string;
}
