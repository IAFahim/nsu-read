import create from "zustand"
import {persist} from "zustand/middleware";
import {Database} from "../utils/database.types";

type Project = Database['public']['Tables']['projects']['Row']

let UseProject = create(persist((set: any) => ({
    id: "" as string,
    name: null as string | null,
    type: "Public" as string,
    description: null as string | null,
    users: null as string[] | null,
    SetName: (name: string) => set({name}),
    SetType: (type: string) => set({type}),
    SetDescription: (description: string) => set({description}),
    SetUsers: (users: string[]) => set({users}),
}), {
    name: "Project",
    getStorage: () => localStorage,
}));

export default UseProject

