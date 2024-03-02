const bcrypt = require('bcryptjs')
const ProductData = {

    users: [
        {
            name: 'Avinash',
            email: 'avinash123@gmail.com',
            password: bcrypt.hashSync('1234567'),
            isAdmin: true
        },
        {
            name: 'Avi',
            email: 'avi123@gmail.com',
            password: bcrypt.hashSync('1234567'),
            isAdmin: false


        }
    ],



    products: [
        // All Women Product List
        // slug code for saree : 2digit of Brand +category + 11Serial Number
        // slug code for other : 2digit of Brand +Dress + 22Serial Number
        {
            //     _id : '1',
            name: "MenHoddies",
            slug: "Hoddies",
            category: 'Hoddies',
            image: '/Assets/h4.jpg',
            price: 900,
            countInStock: 10,
            brand: 'Guci',
            rating: 5.1,
            numReviews: 5,
            description: 'Guci Gray colour Hoddie'
        },
        {
            //         _id : '2',
            name: "Cotton Pant",
            slug: "Pant",
            category: 'Pant',
            image: "/Assets/p2.jpg",
            price: 900,
            countInStock: 10,
            brand: 'Jara',
            rating: 5.1,
            numReviews: 5,
            description: 'Jara formal black colour pants'
        },
        {
            //          _id : '3',
            name: "Blazers",
            slug: "Blazers",
            category: 'Blazers',
            image: '/Assets/party1.jpg',
            price: 1200,
            countInStock: 30,
            brand: 'Louse viton',
            rating: 6.1,
            numReviews: 5,
            description: 'Men solid single Beasted Formal Blazer'
        },
        {
            //          _id : '4',
            name: "Shirts",
            slug: "Shirts",
            category: 'Shirts',
            image: '/Assets/s3.jpg',
            price: 500,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 5.1,
            numReviews: 5,
            description: 'Men Regular Fit Casual white shirts'
        },
        {
            //          _id : '5',
            name: "Check-shirt",
            slug: "Shirts",
            category: 'Shirts',
            image: '/Assets/Shirt1.jpg',
            price: 500,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Men Regular Fit Check   shirts'
        },
        {
            //          _id : '6',
            name: "Shirts",
            slug: "Shirts",
            category: 'Check-shirt',
            image: '/Assets/Shirt2.jpg',
            price: 700,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Men Regular Fit Check Shirts shirts'
        },
        {
            //          _id : '7',
            name: "Shirts",
            slug: "Shirts",
            category: 'Half-Shirts',
            image: '/Assets/Shirt3.jpg',
            price: 600,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Men Regular Fit White Half  shirts'
        },
        {
            //          _id : '8',
            name: "Shirts",
            slug: "Shirts",
            category: 'Half-Shirts',
            image: '/Assets/Shirt4.jpg',
            price: 700,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Men Regular Fit White Half shirts'
        },
        {
            //          _id : '9',
            name: "Shirts",
            slug: "Shirts",
            category: 'Check-shirt',
            image: '/Assets/Shirt5.jpg',
            price: 700,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Men Regular Fit Check shirts'
        },
        {
            //          _id : '9',
            name: "Shirts",
            slug: "Shirts",
            category: 'Check-shirt',
            image: '/Assets/Shirt6.jpg',
            price: 500,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 5.1,
            numReviews: 5,
            description: 'Men Regular Fit Check shirts'
        },
        {
            //          _id : '9',
            name: "Shirts",
            slug: "Shirts",
            category: 'Check-shirt',
            image: '/Assets/Shirt7.jpg',
            price: 1000,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 6.0,
            numReviews: 5,
            description: 'Men Regular Fit Check shirts'
        },
        {
            //          _id : '10',
            name: "Shirts",
            slug: "Shirts",
            category: 'Half-Shirts',
            image: '/Assets/whiteshirt.jpg',
            price: 900,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Men Regular Fit White Half shirts'
        },
        {
            //          _id : '11',
            name: "Pants",
            slug: "Pants",
            category: 'Pants',
            image: '/Assets/Pant1.jpg',
            price: 1000,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 6.0,
            numReviews: 5,
            description: 'Men Casual Green Pants'
        },
        {
            //          _id : '12',
            name: "Pants",
            slug: "Pants",
            category: 'Pants',
            image: '/Assets/Pant2.jpg',
            price: 1000,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Men Casual Brown Pants'
        },
        {
            //          _id : '13',
            name: "Pants",
            slug: "Pants",
            category: 'Pants',
            image: '/Assets/Pant4.jpg',
            price: 1000,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Men Casual White Pants'
        },
        {
            //          _id : '14',
            name: "Pants",
            slug: "Pants",
            category: 'Pants',
            image: '/Assets/Pant2.jpg',
            price: 1000,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Men Casual Brown Pants'
        },
        {
            //          _id : '15',
            name: "Pants",
            slug: "Pants",
            category: 'Pants',
            image: '/Assets/Pant5.jpg',
            price: 800,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Men Casual  White Pants'
        },
        {
            //          _id : '16',
            name: "Hoddie",
            slug: "Kids",
            category: 'Kids-Hoddie',
            image: '/Assets/Kids1.jpg',
            price: 600,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Kids Black Hoddie'
        },
        {
            //          _id : '17',
            name: "Hoddie",
            slug: "Kids",
            category: 'Kids-Hoddie',
            image: '/Assets/Kids.jpg',
            price: 600,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Kids White Hoddie'
        },
        {
            //          _id : '18',
            name: "Jeans",
            slug: "Jeans",
            category: 'Jeans',
            image: '/Assets/Jeans2.jpg',
            price: 1200,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 5.8,
            numReviews: 5,
            description: 'Mens Oversized Jeans'
        },
        {
            //          _id : '19',
            name: "Jeans",
            slug: "Jeans",
            category: 'Jeans',
            image: '/Assets/Jeans3.jpg',
            price: 1200,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 5.8,
            numReviews: 5,
            description: 'Mens Fitting Jeans'
        },
        {
            //          _id : '20',
            name: "Jeans",
            slug: "Jeans",
            category: 'Jeans',
            image: '/Assets/Jeans5.jpg',
            price: 1200,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 6.8,
            numReviews: 5,
            description: 'Mens Fitting Jeans'
        },
        {
            //     _id : '21',
            name: "MenHoddies",
            slug: "Hoddies",
            category: 'Hoddies',
            image: '/Assets/Hoddie1.jpg',
            price: 1000,
            countInStock: 10,
            brand: 'Guci',
            rating: 5.9,
            numReviews: 7,
            description: 'Guci Purple colour Hoddie'
        },
        {
            //     _id : '22',
            name: "MenHoddies",
            slug: "Hoddies",
            category: 'Hoddies',
            image: '/Assets/Hoddie2.jpg',
            price: 1000,
            countInStock: 10,
            brand: 'Guci',
            rating: 6.1,
            numReviews: 5,
            description: 'Guci Green colour Hoddie'
        },
        {
            //     _id : '23',
            name: "MenHoddies",
            slug: "Hoddies",
            category: 'Hoddies',
            image: '/Assets/Hoddie3.jpg',
            price: 1100,
            countInStock: 10,
            brand: 'Guci',
            rating: 4.9,
            numReviews: 5,
            description: 'Guci White colour Hoddie'
        },

        {
            //          _id : '24',
            name: "Shirts",
            slug: "Shirts",
            category: 'shirt',
            image: '/Assets/Blackshirt.jpg',
            price: 1100,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 6.1,
            numReviews: 5,
            description: 'Men Regular Black  shirts'
        },
        {
            //          _id : '25',
            name: "Pants",
            slug: "Pants",
            category: 'Pants',
            image: '/Assets/Cargopants.jpg',
            price: 1100,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 6.1,
            numReviews: 5,
            description: 'Men Regular Pants'
        },
        {
            //          _id : '26',
            name: "Hoddie",
            slug: "Kids",
            category: 'Kids-Hoddie',
            image: '/Assets/Kids1.jpg',
            price: 600,
            countInStock: 10,
            brand: 'Calvin Clain',
            rating: 4.8,
            numReviews: 5,
            description: 'Kids Black Hoddie'
        },

    ]
}

module.exports = ProductData;