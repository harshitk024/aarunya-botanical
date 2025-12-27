import { createSlice } from '@reduxjs/toolkit'
// import { productDummyData } from '@/assets/assets'

const productDummyData = [
    {
        "id" : 1,
        "name": "Shampoo",
        "rating": [5,3,1,5,4,3],
        "price": 45,
        "images": ["data:image/jpeg;base64,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"]
        

    },
    {
        "id" : 2,
        "name": "Hair Lotion",
        "rating": [5,3,1,5,4,3],
        "price": 135,
        "images": ["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS5O4XA2qM_aLNEGGNmFa5nHAJjnC4C3B7FxxraMN5DUsYnRIrRNoPgXcG5HuqOY9qWx42cfUY_mBSCR3Jp-ekv_8HoR3v8DihdqjP0F1DOQ523kkPQKv6X"]
        

    },
    {
        "id" : 3,
        "name": "Hair Lotion",
        "rating": [5,3,1,5,4,3],
        "price": 105,
        "images": ["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS5O4XA2qM_aLNEGGNmFa5nHAJjnC4C3B7FxxraMN5DUsYnRIrRNoPgXcG5HuqOY9qWx42cfUY_mBSCR3Jp-ekv_8HoR3v8DihdqjP0F1DOQ523kkPQKv6X"]
        

    },
       {
        "id" : 4,
        "name": "Hair Lotion",
        "rating": [5,3,1,5,4,3],
        "price": 135,
        "images": ["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS5O4XA2qM_aLNEGGNmFa5nHAJjnC4C3B7FxxraMN5DUsYnRIrRNoPgXcG5HuqOY9qWx42cfUY_mBSCR3Jp-ekv_8HoR3v8DihdqjP0F1DOQ523kkPQKv6X"]
        

    },
       {
        "id" : 5,
        "name": "Hair Lotion",
        "rating": [5,3,1,5,4,3],
        "price": 135,
        "images": ["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS5O4XA2qM_aLNEGGNmFa5nHAJjnC4C3B7FxxraMN5DUsYnRIrRNoPgXcG5HuqOY9qWx42cfUY_mBSCR3Jp-ekv_8HoR3v8DihdqjP0F1DOQ523kkPQKv6X"]
        

    }

]

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: productDummyData,
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
        },
        clearProduct: (state) => {
            state.list = []
        }
    }
})

export const { setProduct, clearProduct } = productSlice.actions

export default productSlice.reducer