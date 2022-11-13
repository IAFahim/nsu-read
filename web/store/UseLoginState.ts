import create from "zustand"
import {persist} from "zustand/middleware";
import {Database} from "../utils/database.types";
import {NextRouter, Router} from "next/router";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

type Profiles = Database['public']['Tables']['profiles']['Row']


let useLoginState = create(persist((set: any) => ({
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

export default useLoginState

