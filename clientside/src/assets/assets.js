import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import logo_app from "./logo_app.svg"
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import gs_logo from "./gs_logo.jpg"
import happy_store from "./happy_store.webp"
import upload_area from "./upload_area.svg"
import hero_model_img from "./hero_model_img.png"
import hero_product_img1 from "./hero_product_img1.png"
import hero_product_img2 from "./hero_product_img2.png"
import product_img1 from "./product_img1.png"
import product_img2 from "./product_img2.png"
import product_img3 from "./product_img3.png"
import product_img4 from "./product_img4.png"
import product_img5 from "./product_img5.png"
import product_img6 from "./product_img6.png"
import product_img7 from "./product_img7.png"
import product_img8 from "./product_img8.png"
import product_img9 from "./product_img9.png"
import product_img10 from "./product_img10.png"
import product_img11 from "./product_img11.png"
import product_img12 from "./product_img12.png"
import { ClockFadingIcon, HeadsetIcon, SendIcon } from "lucide-react";
import profile_pic1 from "./profile_pic1.jpg"
import profile_pic2 from "./profile_pic2.jpg"
import profile_pic3 from "./profile_pic3.jpg"
import slideshow_1 from "./slideshow_1.jpg"
import slideshow_2 from "./slideshow_2.jpg"
import slideshow_3 from "./slideshow_3.jpg"
import slideshow_4 from "./slideshow_4.jpg"
import logo from "./aaryunya_logo.webp"


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    logo_app,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    upload_area, hero_model_img,
    hero_product_img1, hero_product_img2, gs_logo,
    product_img1, product_img2, product_img3, product_img4, product_img5, product_img6,
    product_img7, product_img8, product_img9, product_img10, product_img11, product_img12,
    slideshow_1,
    slideshow_2,
    slideshow_3,
    slideshow_4
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctorsDummy = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]


export const categories = ["Headphones", "Speakers", "Watch", "Earbuds", "Mouse", "Decoration"];

export const dummyRatingsData = [
    { id: "rat_1", rating: 4.2, review: "I was a bit skeptical at first, but this product turned out to be even better than I imagined. The quality feels premium, it's easy to use, and it delivers exactly what was promised. I've already recommended it to friends and will definitely purchase again in the future.", user: { name: 'Kristin Watson', image: profile_pic1 }, productId: "prod_1", createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', product: { name: 'Bluetooth Speakers', category:'Electronics', id:'prod_1'} },
    { id: "rat_2", rating: 5.0, review: "This product is great. I love it!  You made it so simple. My new site is so much faster and easier to work with than my old site.", user: { name: 'Jenny Wilson', image: profile_pic2 }, productId: "prod_2", createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', product: { name: 'Bluetooth Speakers', category:'Electronics', id:'prod_1'} },
    { id: "rat_3", rating: 4.1, review: "This product is amazing. I love it!  You made it so simple. My new site is so much faster and easier to work with than my old site.", user: { name: 'Bessie Cooper', image: profile_pic3 }, productId: "prod_3", createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', product: { name: 'Bluetooth Speakers', category:'Electronics', id:'prod_1'} },
    { id: "rat_4", rating: 5.0, review: "This product is great. I love it!  You made it so simple. My new site is so much faster and easier to work with than my old site.", user: { name: 'Kristin Watson', image: profile_pic1 }, productId: "prod_4", createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', product: { name: 'Bluetooth Speakers', category:'Electronics', id:'prod_1'} },
    { id: "rat_5", rating: 4.3, review: "Overall, I'm very happy with this purchase. It works as described and feels durable. The only reason I didn't give it five stars is because of a small issue (such as setup taking a bit longer than expected, or packaging being slightly damaged). Still, highly recommend it for anyone looking for a reliable option.", user: { name: 'Jenny Wilson', image: profile_pic2 }, productId: "prod_5", createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', product: { name: 'Bluetooth Speakers', category:'Electronics', id:'prod_1'} },
    { id: "rat_6", rating: 5.0, review: "This product is great. I love it!  You made it so simple. My new site is so much faster and easier to work with than my old site.", user: { name: 'Bessie Cooper', image: profile_pic3 }, productId: "prod_6", createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', product: { name: 'Bluetooth Speakers', category:'Electronics', id:'prod_1'} },
]

export const dummyStoreData = {
    id: "store_1",
    userId: "user_1",
    name: "Happy Shop",
    description: "At Happy Shop, we believe shopping should be simple, smart, and satisfying. Whether you're hunting for the latest fashion trends, top-notch electronics, home essentials, or unique lifestyle products — we've got it all under one digital roof.",
    username: "happyshop",
    address: "3rd Floor, Happy Shop , New Building, 123 street , c sector , NY, US",
    status: "approved",
    isActive: true,
    logo: happy_store,
    email: "happyshop@example.com",
    contact: "+0 1234567890",
    createdAt: "2025-09-04T09:04:16.189Z",
    updatedAt: "2025-09-04T09:04:44.273Z",
    user: {
        id: "user_31dOriXqC4TATvc0brIhlYbwwc5",
        name: "Great Stack",
        email: "user.greatstack@gmail.com",
        image: gs_logo,
    }
}

export const productDummyData = [
    {
        id: "prod_1",
        name: "Modern table lamp",
        description: "Modern table lamp with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty. Enhance your audio experience with this earbuds. Indulge yourself in a world of pure sound with 50 hours of uninterrupted playtime. Equipped with the cutting-edge Zen Mode Tech ENC and BoomX Tech, prepare to be enthralled by a symphony of crystal-clear melodies.",
        mrp: 40,
        price: 29,
        images: [product_img1, product_img2, product_img3, product_img4],
        category: "Decoration",
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        rating: dummyRatingsData,
        createdAt: 'Sat Jul 29 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 29 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_2",
        name: "Smart speaker gray",
        description: "Smart speaker with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 50,
        price: 29,
        images: [product_img2],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Speakers",
        rating: dummyRatingsData,
        createdAt: 'Sat Jul 28 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 28 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_3",
        name: "Smart watch white",
        description: "Smart watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 60,
        price: 29,
        images: [product_img3],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Watch",
        rating: dummyRatingsData,
        createdAt: 'Sat Jul 27 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 27 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_4",
        name: "Wireless headphones",
        description: "Wireless headphones with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 70,
        price: 29,
        images: [product_img4],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Headphones",
        rating: dummyRatingsData,
        createdAt: 'Sat Jul 26 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 26 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_5",
        name: "Smart watch black",
        description: "Smart watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 49,
        price: 29,
        images: [product_img5],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Watch",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_6",
        name: "Security Camera",
        description: "Security Camera with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 59,
        price: 29,
        images: [product_img6],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Camera",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_7",
        name: "Smart Pen for iPad",
        description: "Smart Pen for iPad with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 89,
        price: 29,
        images: [product_img7],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Pen",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 24 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 24 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_8",
        name: "Home Theater",
        description: "Home Theater with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 99,
        price: 29,
        images: [product_img8],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Theater",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 23 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 23 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_9",
        name: "Apple Wireless Earbuds",
        description: "Apple Wireless Earbuds with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 89,
        price: 29,
        images: [product_img9],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Earbuds",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 22 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 22 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_10",
        name: "Apple Smart Watch",
        description: "Apple Smart Watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 179,
        price: 29,
        images: [product_img10],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Watch",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 21 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 21 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_11",
        name: "RGB Gaming Mouse",
        description: "RGB Gaming Mouse with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 39,
        price: 29,
        images: [product_img11],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Mouse",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 20 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 20 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_12",
        name: "Smart Home Cleaner",
        description: "Smart Home Cleaner with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 199,
        price: 29,
        images: [product_img12],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Cleaner",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)',
    }
];

export const ourSpecsData = [
    { title: "Free Shipping", description: "Enjoy fast, free delivery on every order no conditions, just reliable doorstep.", icon: SendIcon, accent: '#05DF72' },
    { title: "7 Days easy Return", description: "Change your mind? No worries. Return any item within 7 days.", icon: ClockFadingIcon, accent: '#FF8904' },
    { title: "24/7 Customer Support", description: "We're here for you. Get expert help with our customer support.", icon: HeadsetIcon, accent: '#A684FF' }
]

export const addressDummyData = {
    id: "addr_1",
    userId: "user_1",
    name: "John Doe",
    email: "johndoe@example.com",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
    phone: "1234567890",
    createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)',
}

export const couponDummyData = [
    { code: "NEW20", description: "20% Off for New Users", discount: 20, forNewUser: true, forMember: false, isPublic: false, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:35:31.183Z" },
    { code: "NEW10", description: "10% Off for New Users", discount: 10, forNewUser: true, forMember: false, isPublic: false, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:35:50.653Z" },
    { code: "OFF20", description: "20% Off for All Users", discount: 20, forNewUser: false, forMember: false, isPublic: false, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:42:00.811Z" },
    { code: "OFF10", description: "10% Off for All Users", discount: 10, forNewUser: false, forMember: false, isPublic: false, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:42:21.279Z" },
    { code: "PLUS10", description: "20% Off for Members", discount: 10, forNewUser: false, forMember: true, isPublic: false, expiresAt: "2027-03-06T00:00:00.000Z", createdAt: "2025-08-22T11:38:20.194Z" }
]

export const dummyUserData = {
    id: "user_31dQbH27HVtovbs13X2cmqefddM",
    name: "GreatStack",
    email: "greatstack@example.com",
    image: gs_logo,
    cart: {}
}

export const orderDummyData = [
    {
        id: "cmemm75h5001jtat89016h1p3",
        total: 214.2,
        status: "DELIVERED",
        userId: "user_31dQbH27HVtovbs13X2cmqefddM",
        storeId: "cmemkqnzm000htat8u7n8cpte",
        addressId: "cmemm6g95001ftat8omv9b883",
        isPaid: false,
        paymentMethod: "COD",
        createdAt: "2025-08-22T09:15:03.929Z",
        updatedAt: "2025-08-22T09:15:50.723Z",
        isCouponUsed: true,
        coupon: dummyRatingsData[2],
        orderItems: [
            { orderId: "cmemm75h5001jtat89016h1p3", productId: "cmemlydnx0017tat8h3rg92hz", quantity: 1, price: 89, product: productDummyData[0], },
            { orderId: "cmemm75h5001jtat89016h1p3", productId: "cmemlxgnk0015tat84qm8si5v", quantity: 1, price: 149, product: productDummyData[1], }
        ],
        address: addressDummyData,
        user: dummyUserData
    },
    {
        id: "cmemm6jv7001htat8vmm3gxaf",
        total: 421.6,
        status: "DELIVERED",
        userId: "user_31dQbH27HVtovbs13X2cmqefddM",
        storeId: "cmemkqnzm000htat8u7n8cpte",
        addressId: "cmemm6g95001ftat8omv9b883",
        isPaid: false,
        paymentMethod: "COD",
        createdAt: "2025-08-22T09:14:35.923Z",
        updatedAt: "2025-08-22T09:15:52.535Z",
        isCouponUsed: true,
        coupon: couponDummyData[0],
        orderItems: [
            { orderId: "cmemm6jv7001htat8vmm3gxaf", productId: "cmemm1f3y001dtat8liccisar", quantity: 1, price: 229, product: productDummyData[2], },
            { orderId: "cmemm6jv7001htat8vmm3gxaf", productId: "cmemm0nh2001btat8glfvhry1", quantity: 1, price: 99, product: productDummyData[3], },
            { orderId: "cmemm6jv7001htat8vmm3gxaf", productId: "cmemlz8640019tat8kz7emqca", quantity: 1, price: 199, product: productDummyData[4], }
        ],
        address: addressDummyData,
        user: dummyUserData
    }
]

export const storesDummyData = [
    {
        id: "cmemkb98v0001tat8r1hiyxhn",
        userId: "user_31dOriXqC4TATvc0brIhlYbwwc5",
        name: "GreatStack",
        description: "GreatStack is the education marketplace where you can buy goodies related to coding and tech",
        username: "greatstack",
        address: "123 Maplewood Drive Springfield, IL 62704 USA",
        status: "approved",
        isActive: true,
        logo: gs_logo,
        email: "greatstack@example.com",
        contact: "+0 1234567890",
        createdAt: "2025-08-22T08:22:16.189Z",
        updatedAt: "2025-08-22T08:22:44.273Z",
        user: dummyUserData,
    },
    {
        id: "cmemkqnzm000htat8u7n8cpte",
        userId: "user_31dQbH27HVtovbs13X2cmqefddM",
        name: "Happy Shop",
        description: "At Happy Shop, we believe shopping should be simple, smart, and satisfying. Whether you're hunting for the latest fashion trends, top-notch electronics, home essentials, or unique lifestyle products — we've got it all under one digital roof.",
        username: "happyshop",
        address: "3rd Floor, Happy Shop , New Building, 123 street , c sector , NY, US",
        status: "approved",
        isActive: true,
        logo: happy_store,
        email: "happyshop@example.com",
        contact: "+0 123456789",
        createdAt: "2025-08-22T08:34:15.155Z",
        updatedAt: "2025-08-22T08:34:47.162Z",
        user: dummyUserData,
    }
]

export const dummyAdminDashboardData = {
    "orders": 6,
    "stores": 2,
    "products": 12,
    "revenue": "959.10",
    "allOrders": [
        { "createdAt": "2025-08-20T08:46:58.239Z", "total": 145.6 },
        { "createdAt": "2025-08-22T08:46:21.818Z", "total": 97.2 },
        { "createdAt": "2025-08-22T08:45:59.587Z", "total": 54.4 },
        { "createdAt": "2025-08-23T09:15:03.929Z", "total": 214.2 },
        { "createdAt": "2025-08-23T09:14:35.923Z", "total": 421.6 },
        { "createdAt": "2025-08-23T11:44:29.713Z", "total": 26.1 },
        { "createdAt": "2025-08-24T09:15:03.929Z", "total": 214.2 },
        { "createdAt": "2025-08-24T09:14:35.923Z", "total": 421.6 },
        { "createdAt": "2025-08-24T11:44:29.713Z", "total": 26.1 },
        { "createdAt": "2025-08-24T11:56:29.713Z", "total": 36.1 },
        { "createdAt": "2025-08-25T11:44:29.713Z", "total": 26.1 },
        { "createdAt": "2025-08-25T09:15:03.929Z", "total": 214.2 },
        { "createdAt": "2025-08-25T09:14:35.923Z", "total": 421.6 },
        { "createdAt": "2025-08-25T11:44:29.713Z", "total": 26.1 },
        { "createdAt": "2025-08-25T11:56:29.713Z", "total": 36.1 },
        { "createdAt": "2025-08-25T11:30:29.713Z", "total": 110.1 }
    ]
}

export const dummyStoreDashboardData = {
    "ratings": dummyRatingsData,
    "totalOrders": 2,
    "totalEarnings": 636,
    "totalProducts": 5
}