
const reducer = (state, action)=>{
    if(action.type === 'LOADING'){
        return {...state, loading: true}
    }
    if(action.type === 'DISPLAY_CART'){
        return {...state, cart: action.payload, loading:false}
    }
    if(action.type === 'CLEAR_CART'){
        return {...state, cart:[]}
    }
    if(action.type === 'REMOVE'){
        return {...state, cart: state.cart.filter((cartItem)=>cartItem.id !== action.payload)}
    }

    if(action.type === 'INCREASE'){
        const tempCart = state.cart.map((cartItem)=>{
            if(cartItem.id === action.payload){
                return {...cartItem, amount: cartItem.amount + 1 }
            }
            return cartItem;
        }) 
        return {...state, cart: tempCart}
    }

    if(action.type === 'DECREASE'){
        const tempCart = state.cart.map((cartItem)=>{
            if(cartItem.id === action.payload){
                return {...cartItem, amount: cartItem.amount - 1 }
            }
            return cartItem;
        }).filter((cartItem)=> cartItem.amount !== 0);

        return {...state, cart: tempCart}
    }
    if(action.type === 'GET_TOTALS'){
let{total, amount} = state.cart.reduce((cartTotal, cartItem) =>{
const{price, amount} = cartItem;
const itemTotal = amount * price
cartTotal.amount += amount;
cartTotal.total += itemTotal
return cartTotal
},{
    amount: 0,
    total: 0,
})
total = parseFloat(total.toFixed(2));

        return {...state, total, amount}
    }

    return state;
}
export default reducer; 