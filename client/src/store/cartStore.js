import { create } from 'zustand';

const useCartStore = create((set, get) => ({
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],

    addItem: (product, qty, size) => {
        const item = {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            size,
            qty,
        };

        const existItem = get().cartItems.find(
            (x) => x.product === item.product && x.size === item.size
        );

        if (existItem) {
            const updatedItems = get().cartItems.map((x) =>
                x.product === item.product && x.size === item.size ? item : x
            );
            set({ cartItems: updatedItems });
        } else {
            set({ cartItems: [...get().cartItems, item] });
        }
        localStorage.setItem('cartItems', JSON.stringify(get().cartItems));
    },

    removeItem: (id, size) => {
        const updatedItems = get().cartItems.filter(
            (x) => !(x.product === id && x.size === size)
        );
        set({ cartItems: updatedItems });
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    },

    clearCart: () => {
        localStorage.removeItem('cartItems');
        set({ cartItems: [] });
    },

    getTotalPrice: () => {
        return get().cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    },
}));

export default useCartStore;
