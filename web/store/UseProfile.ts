import create from "zustand"
import {persist} from "zustand/middleware";
import {Database} from "../utils/database.types";

type Profiles = Database['public']['Tables']['profiles']['Row']


let useProfile = create(persist((set: any) => ({
    isLoggedIn: false,
    profiles: null as Profiles | null,
    SetProfiles: (profiles: Profiles) => set({profiles}),
    SetLoggedIn: (isLoggedIn: boolean) => {
        set({isLoggedIn: isLoggedIn})
    },
}), {
    name: "profile",
    getStorage: () => localStorage,
}));

export default useProfile

