const getStoredCart = () => { 
    const storedCart = localStorage.getItem('cart');
    
    if(storedCart){
        return JSON.parse(storedCart);
    } 
        return [];
    
    }

    const saveCartToLS = cart => {
        const cartStringified = JSON.stringify(cart);
        localStorage.setItem('cart', cartStringified);
    }

    const addToLS = (id) => {
        const cart = getStoredCart();
        cart.push(id);
        // save to local storage
        saveCartToLS(cart);
    }

    const removeFromLS = id => {
        const cart = getStoredCart();
        const newCart = cart.filter(itemId => itemId !== id);
        saveCartToLS(newCart);
    }

    export {addToLS, getStoredCart, removeFromLS};