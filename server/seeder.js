import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const products = [
    {
        name: 'Linen Blend Jacket',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjefqtLADRfiPGr3ydxbpOj70TqPqsci107sicsr1BD_q8dS_E2LbJ60CuAPCsTUqHrTvc-gCEZbzA8sW6pU3TJzDcb3m2227q-GyReHRMvevNfEE62fYVnA3YScEKZi8rDBrHwT2LJUHbG3o7uKH7irT3wrA6khDtcDJfQtHj0IjNfVSHwTsdPt9V_uowMlJ9ZkebnTRhXm0W9H-67GKtSAznG8b2y8e33nhGmXF5bDcKIQFMaJfAcC4p7R8XDHsYKQsIlGr-KSo',
        description: 'Chaqueta ligera de mezcla de lino perfecta para primavera.',
        category: 'Hombre',
        price: 129.00,
    },
    {
        name: 'Cotton Essential Tee',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFv4ZXSy7Hz-SJntMGx7OZSixXUoka4kmh6mYgUG_YUXkW8KDHypgzFa0oV691XQrK3M5gueG8epO9ueJq2aGtLngBUx_5OS6uRKAFKh9O7sWZk3BfBx64tpNKeNb_p-ZMOBR_Re9wwvzhj16aGGvezAJ3JJyVNfAd6SKYp_e0lbVeI3_AM-h-pPcqLV7gRvxFMXeICTutwxI9UOPKlEpJCI0BkVWQ6ERQz67SfZ5K1-xjvrqMAXT82pFXqKf_TNfcjfeDNbVbcXA',
        description: 'Camiseta de algodón esencial de alta calidad.',
        category: 'Hombre',
        price: 45.00,
    },
    {
        name: 'Straight Fit Denim',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVLGUqc7u5Z_8KduL1406amMAHYe2478M8QC5TwtIeR3Yp4kV0hl4vU1r1DaskQRZQ71-z3eV_R852Az6vywjVHuR45_s_xbhejMe68MwHLF0gtySKRMOnRbTI2Rqn1IfCd_eSnAYLcilEE45no7MZ3nKum3AE91eA_KMvRBfj3qYxtSeS4B-qHQJP5LSQXyTsn5djXuexVHvQ493vrK-5lfBdXuyKJ0jVf7cmC4PP6f9PSaHZ94-dCnle14E4jKm7Ntwn5BpUwf4',
        description: 'Vaqueros de corte recto clásicos y duraderos.',
        category: 'Hombre',
        price: 89.00,
    },
    {
        name: 'Classic Leather Boots',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWH1MWC3fPxkAy_cHC8q-7wrmeIYwbYaSbwj5RgZovbAIGXDsa-RT289pdBhXOvVD3ApMhp18LFsaruZwBticIYBc0hGljiijPAxKE0Mpx7PQTE80tjQioXJizR9V1OIZbYTdVHUVEAMXEU89EWHMWwn9aWIVFP5ofmTfCVGQLCctwyEobyO1kU42eh0dm4cbbju0E6o3dujpRvx5U_yIJXyEltPiePyq7d_wcDVL5vcMoBBZe8-Jif2q2uNd0_g-z9UBXmxhV78s',
        description: 'Botas de cuero clásicas para cualquier ocasión.',
        category: 'Accesorios',
        price: 199.00,
    },
];

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const createdProducts = await Product.insertMany(products);

        // Create an admin user
        await User.create({
            name: 'Admin User',
            email: 'admin@stitch.com',
            password: 'adminpassword', // Will be hashed by pre-save middleware
            isAdmin: true,
        });

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
