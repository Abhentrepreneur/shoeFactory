const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Shoe = require("../models/Shoe");

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const shoes = [
  {
    name: "Nike Air Max 270 Triple Black",
    price: 12999,
    size: 9,
    stock: 15,
    thumbnail: "https://images.nike.com/is/image/DotCom/CT1287_001"
  },
  {
    name: "Nike Air Force 1 '07 White",
    price: 9999,
    size: 9,
    stock: 25,
    thumbnail: "https://images.nike.com/is/image/DotCom/CW2288_111"
  },
  {
    name: "Nike Dunk Low Panda",
    price: 10999,
    size: 9,
    stock: 18,
    thumbnail: "https://images.nike.com/is/image/DotCom/DD1391_100"
  },
  {
    name: "Nike Air Jordan 1 Mid Bred",
    price: 12999,
    size: 10,
    stock: 12,
    thumbnail: "https://images.nike.com/is/image/DotCom/554724_079"
  },
  {
    name: "Adidas Ultraboost 22 Core Black",
    price: 14999,
    size: 9,
    stock: 20,
    thumbnail: "https://assets.adidas.com/images/w_600,f_auto,q_auto/c3ddf86c6e364f23a332ad1c015b726f_9366/Ultraboost_22_Shoes_Black_GX5461_01_standard.jpg"
  },
  {
    name: "Adidas Forum Low White Blue",
    price: 8999,
    size: 8,
    stock: 16,
    thumbnail: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4f17c1f8d6d4455e8032ad0f0177103a_9366/Forum_Low_Shoes_White_FY7756_01_standard.jpg"
  },
  {
    name: "Adidas NMD_R1 Triple White",
    price: 11999,
    size: 9,
    stock: 14,
    thumbnail: "https://assets.adidas.com/images/w_600,f_auto,q_auto/59b2c3b6133d4d3e8a26ac2c011b8c0e_9366/NMD_R1_Shoes_White_GV8430_01_standard.jpg"
  },
  {
    name: "Adidas Superstar Cloud White",
    price: 7999,
    size: 9,
    stock: 22,
    thumbnail: "https://assets.adidas.com/images/w_600,f_auto,q_auto/33e1b0c8e0df4bb1a73cad1400d875e8_9366/Superstar_Shoes_White_EG4958_01_standard.jpg"
  },
  {
    name: "Puma RS-X Triple",
    price: 9499,
    size: 9,
    stock: 18,
    thumbnail: "https://images.puma.com/image/upload/f_auto,q_auto,w_600/global/391969/02/sv01/fnd/IND/fmt/png"
  },
  {
    name: "Puma Suede Classic Black",
    price: 6999,
    size: 8,
    stock: 24,
    thumbnail: "https://images.puma.com/image/upload/f_auto,q_auto,w_600/global/352634/03/sv01/fnd/IND/fmt/png"
  },
  {
    name: "Puma Future Rider Play On",
    price: 7499,
    size: 10,
    stock: 15,
    thumbnail: "https://images.puma.com/image/upload/f_auto,q_auto,w_600/global/371149/16/sv01/fnd/IND/fmt/png"
  },
  {
    name: "New Balance 550 White Grey",
    price: 11999,
    size: 9,
    stock: 14,
    thumbnail: "https://nb.scene7.com/is/image/NB/bb550pb1_nb_02_i?$pdpflexf2$"
  },
  {
    name: "New Balance 327 Moonbeam",
    price: 9999,
    size: 9,
    stock: 17,
    thumbnail: "https://nb.scene7.com/is/image/NB/ws327und_nb_02_i?$pdpflexf2$"
  },
  {
    name: "New Balance 574 Core Grey",
    price: 8499,
    size: 8,
    stock: 20,
    thumbnail: "https://nb.scene7.com/is/image/NB/ml574evg_nb_02_i?$pdpflexf2$"
  },
  {
    name: "Reebok Club C 85 Vintage",
    price: 7499,
    size: 9,
    stock: 18,
    thumbnail: "https://assets.reebok.com/images/w_600,f_auto,q_auto/2fbb2d0aaf0a4f4dbf2aadf3014c5b45_9366/Club_C_85_Vintage_Shoes_White_GZ7615_01_standard.jpg"
  },
  {
    name: "Reebok Nano X3 Training",
    price: 9999,
    size: 10,
    stock: 12,
    thumbnail: "https://assets.reebok.com/images/w_600,f_auto,q_auto/2c9a5f0a9f2e4e749c5eadf3015f3c52_9366/Nano_X3_Shoes_Black_HQ6323_01_standard.jpg"
  },
  {
    name: "Reebok Classic Leather White Gum",
    price: 6999,
    size: 9,
    stock: 25,
    thumbnail: "https://assets.reebok.com/images/w_600,f_auto,q_auto/8e7a49056b0049f4a6d5ab5600e1c898_9366/Classic_Leather_Shoes_White_49799_01_standard.jpg"
  },
  {
    name: "ASICS Gel-Kayano 30",
    price: 13999,
    size: 10,
    stock: 14,
    thumbnail: "https://images.asics.com/is/image/asics/1011B548_002_sr_RT_GLB?$zoom$"
  },
  {
    name: "ASICS Gel-Nimbus 25",
    price: 14999,
    size: 9,
    stock: 16,
    thumbnail: "https://images.asics.com/is/image/asics/1011B547_001_sr_RT_GLB?$zoom$"
  },
  {
    name: "Converse Chuck 70 High Black",
    price: 5999,
    size: 9,
    stock: 28,
    thumbnail: "https://images.ctfassets.net/gnfv448d6zoq/1I7IuAvV38N0p0Qz7nXEA1/8f05a8c7f8fa4c40bf9a07f657668218/162050C_standard.jpg"
  }
];

async function seedShoes() {
  await Shoe.deleteMany();
  await Shoe.insertMany(shoes);
  console.log("Shoes inserted successfully");
  process.exit();
}

seedShoes();
