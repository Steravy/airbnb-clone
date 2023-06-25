import { create } from 'zustand';

interface RegisterModalStore {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

const useRgisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useRgisterModal;