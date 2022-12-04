import create from 'zustand'

interface BearState {
    url: string
    setURL: (by: string) => void
}

const useURL = create<BearState>()(
    (set) => ({
        url: "",
        setURL: (by) => set((state) => ({url: by})),
    })
)

export default useURL;