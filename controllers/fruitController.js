const buahManfaat = [
    {
        id: 1,
        nama: "Apel",
        asal: "Asia Tengah",
        jenis: "Malus domestica",
        manfaat: [
            "Meningkatkan kesehatan jantung",
            "Mendukung kesehatan pencernaan",
            "Mengontrol berat badan"
        ],
        kandungan_gizi: [
            "Kalori: 52",
            "Karbohidrat: 14g",
            "Serat: 2.4g",
            "Vitamin C: 14% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/10-health-benefits-of-apples",
        penjelasan: "Apel adalah buah yang berasal dari Asia Tengah. Buah ini dikenal dengan nama Latin Malus domestica."
    },
    {
        id: 2,
        nama: "Alpukat",
        asal: "Amerika Tengah dan Meksiko",
        jenis: "Persea americana",
        manfaat: [
            "Menurunkan kolesterol",
            "Meningkatkan kesehatan jantung",
            "Mengontrol berat badan"
        ],
        kandungan_gizi: [
            "Kalori: 160",
            "Lemak: 15g",
            "Serat: 7g",
            "Vitamin K: 26% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/12-proven-benefits-of-avocado",
        penjelasan: "Alpukat adalah buah yang berasal dari Amerika Tengah dan Meksiko. Nama Latin buah ini adalah Persea americana."
    },
    {
        id: 3,
        nama: "Pisang",
        asal: "Asia Tenggara",
        jenis: "Musa acuminata",
        manfaat: [
            "Memberikan energi cepat",
            "Menjaga tekanan darah",
            "Meningkatkan kesehatan pencernaan"
        ],
        kandungan_gizi: [
            "Kalori: 89",
            "Karbohidrat: 23g",
            "Serat: 2.6g",
            "Vitamin B6: 20% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/11-proven-benefits-of-bananas",
        penjelasan: "Pisang adalah buah yang berasal dari Asia Tenggara. Nama Latinnya adalah Musa acuminata."
    },
    {
        id: 4,
        nama: "Blueberry",
        asal: "Amerika Utara",
        jenis: "Vaccinium corymbosum",
        manfaat: [
            "Meningkatkan fungsi otak",
            "Meningkatkan sistem kekebalan tubuh",
            "Mendukung kesehatan jantung"
        ],
        kandungan_gizi: [
            "Kalori: 57",
            "Karbohidrat: 14g",
            "Serat: 2.4g",
            "Vitamin C: 16% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/10-proven-benefits-of-blueberries",
        penjelasan: "Blueberry adalah buah yang berasal dari Amerika Utara. Nama Latinnya adalah Vaccinium corymbosum."
    },
    {
        id: 5,
        nama: "Ceri",
        asal: "Eropa dan Asia Barat",
        jenis: "Prunus avium",
        manfaat: [
            "Mengurangi peradangan",
            "Meningkatkan kualitas tidur",
            "Mendukung kesehatan jantung"
        ],
        kandungan_gizi: [
            "Kalori: 50",
            "Karbohidrat: 12g",
            "Serat: 1.6g",
            "Vitamin C: 12% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/cherries-benefits",
        penjelasan: "Ceri adalah buah yang berasal dari Eropa dan Asia Barat. Nama Latinnya adalah Prunus avium."
    },
    {
        id: 6,
        nama: "Mentimun",
        asal: "India",
        jenis: "Cucumis sativus",
        manfaat: [
            "Menghidrasi tubuh",
            "Menurunkan berat badan",
            "Meningkatkan kesehatan kulit"
        ],
        kandungan_gizi: [
            "Kalori: 15",
            "Karbohidrat: 3.6g",
            "Serat: 0.5g",
            "Vitamin K: 16% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/7-health-benefits-of-cucumber",
        penjelasan: "Mentimun adalah buah yang berasal dari India. Nama Latinnya adalah Cucumis sativus."
    },
    {
        id: 7,
        nama: "Kurma",
        asal: "Timur Tengah dan Afrika Utara",
        jenis: "Phoenix dactylifera",
        manfaat: [
            "Memberikan energi cepat",
            "Meningkatkan kesehatan pencernaan",
            "Mengandung antioksidan tinggi"
        ],
        kandungan_gizi: [
            "Kalori: 282",
            "Karbohidrat: 75g",
            "Serat: 8g",
            "Kalium: 20% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/benefits-of-dates",
        penjelasan: "Kurma adalah buah yang berasal dari Timur Tengah dan Afrika Utara. Nama Latinnya adalah Phoenix dactylifera."
    },
    {
        id: 8,
        nama: "Anggur",
        asal: "Timur Tengah",
        jenis: "Vitis vinifera",
        manfaat: [
            "Mengandung antioksidan tinggi",
            "Meningkatkan kesehatan jantung",
            "Meningkatkan fungsi otak"
        ],
        kandungan_gizi: [
            "Kalori: 69",
            "Karbohidrat: 18g",
            "Serat: 0.9g",
            "Vitamin C: 18% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/benefits-of-grapes",
        penjelasan: "Anggur adalah buah yang berasal dari Timur Tengah. Nama Latinnya adalah Vitis vinifera."
    },
    {
        id: 9,
        nama: "Kiwi",
        asal: "Cina",
        jenis: "Actinidia deliciosa",
        manfaat: [
            "Meningkatkan sistem kekebalan tubuh",
            "Meningkatkan pencernaan",
            "Mengandung antioksidan tinggi"
        ],
        kandungan_gizi: [
            "Kalori: 61",
            "Karbohidrat: 15g",
            "Serat: 3g",
            "Vitamin C: 154% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/kiwi-benefits",
        penjelasan: "Kiwi adalah buah yang berasal dari Cina. Nama Latinnya adalah Actinidia deliciosa."
    },
    {
        id: 10,
        nama: "Lengkeng",
        asal: "Asia Tenggara",
        jenis: "Dimocarpus longan",
        manfaat: [
            "Mengandung antioksidan tinggi",
            "Meningkatkan kualitas tidur",
            "Mendukung kesehatan kulit"
        ],
        kandungan_gizi: [
            "Kalori: 60",
            "Karbohidrat: 15g",
            "Serat: 1.1g",
            "Vitamin C: 140% dari RDI"
        ],
        sumber: "https://www.organicfacts.net/health-benefits/fruit/longan.html",
        penjelasan: "Lengkeng adalah buah yang berasal dari Asia Tenggara. Nama Latinnya adalah Dimocarpus longan."
    },
    {
        id: 11,
        nama: "Leci",
        asal: "Cina Selatan",
        jenis: "Litchi chinensis",
        manfaat: [
            "Meningkatkan kesehatan jantung",
            "Mengandung antioksidan tinggi",
            "Mendukung sistem kekebalan tubuh"
        ],
        kandungan_gizi: [
            "Kalori: 66",
            "Karbohidrat: 17g",
            "Serat: 1.3g",
            "Vitamin C: 119% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/lychee-benefits",
        penjelasan: "Leci adalah buah yang berasal dari Cina Selatan. Nama Latinnya adalah Litchi chinensis."
    },
    {
        id: 12,
        nama: "Mangga",
        asal: "Asia Selatan",
        jenis: "Mangifera indica",
        manfaat: [
            "Meningkatkan kesehatan pencernaan",
            "Mengandung antioksidan tinggi",
            "Meningkatkan sistem kekebalan tubuh"
        ],
        kandungan_gizi: [
            "Kalori: 60",
            "Karbohidrat: 15g",
            "Serat: 1.6g",
            "Vitamin C: 67% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/mango",
        penjelasan: "Mangga adalah buah yang berasal dari Asia Selatan. Nama Latinnya adalah Mangifera indica."
    },
    {
        id: 13,
        nama: "Manggis",
        asal: "Asia Tenggara",
        jenis: "Garcinia mangostana",
        manfaat: [
            "Meningkatkan kesehatan jantung",
            "Mengandung antioksidan tinggi",
            "Meningkatkan sistem kekebalan tubuh"
        ],
        kandungan_gizi: [
            "Kalori: 73",
            "Karbohidrat: 18g",
            "Serat: 1.8g",
            "Vitamin C: 12% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/mangosteen",
        penjelasan: "Manggis adalah buah yang berasal dari Asia Tenggara. Nama Latinnya adalah Garcinia mangostana."
    },
    {
        id: 14,
        nama: "Jeruk",
        asal: "Asia Tenggara",
        jenis: "Citrus sinensis",
        manfaat: [
            "Mengandung vitamin C tinggi",
            "Meningkatkan sistem kekebalan tubuh",
            "Meningkatkan kesehatan jantung"
        ],
        kandungan_gizi: [
            "Kalori: 47",
            "Karbohidrat: 12g",
            "Serat: 2.4g",
            "Vitamin C: 88% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/foods/oranges",
        penjelasan: "Jeruk adalah buah yang berasal dari Asia Tenggara. Nama Latinnya adalah Citrus sinensis."
    },
    {
        id: 15,
        nama: "Pepaya",
        asal: "Amerika Tengah dan Selatan",
        jenis: "Carica papaya",
        manfaat: [
            "Meningkatkan kesehatan pencernaan",
            "Mengandung antioksidan tinggi",
            "Meningkatkan sistem kekebalan tubuh"
        ],
        kandungan_gizi: [
            "Kalori: 43",
            "Karbohidrat: 11g",
            "Serat: 1.7g",
            "Vitamin C: 75% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/8-proven-papaya-benefits",
        penjelasan: "Pepaya adalah buah yang berasal dari Amerika Tengah dan Selatan. Nama Latinnya adalah Carica papaya."
    },
    {
        id: 16,
        nama: "Nanas",
        asal: "Amerika Selatan",
        jenis: "Ananas comosus",
        manfaat: [
            "Mengandung antioksidan tinggi",
            "Meningkatkan kesehatan pencernaan",
            "Mengurangi peradangan"
        ],
        kandungan_gizi: [
            "Kalori: 50",
            "Karbohidrat: 13g",
            "Serat: 1.4g",
            "Vitamin C: 79% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/pineapple-benefits",
        penjelasan: "Nanas adalah buah yang berasal dari Amerika Selatan. Nama Latinnya adalah Ananas comosus."
    },
    {
        id: 17,
        nama: "Rambutan",
        asal: "Asia Tenggara",
        jenis: "Nephelium lappaceum",
        manfaat: [
            "Mengandung antioksidan tinggi",
            "Meningkatkan kesehatan kulit",
            "Meningkatkan sistem kekebalan tubuh"
        ],
        kandungan_gizi: [
            "Kalori: 68",
            "Karbohidrat: 16g",
            "Serat: 0.9g",
            "Vitamin C: 40% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/rambutan-fruit",
        penjelasan: "Rambutan adalah buah yang berasal dari Asia Tenggara. Nama Latinnya adalah Nephelium lappaceum."
    },
    {
        id: 18,
        nama: "Salak",
        asal: "Indonesia",
        jenis: "Salacca zalacca",
        manfaat: [
            "Meningkatkan kesehatan pencernaan",
            "Mengandung antioksidan tinggi",
            "Meningkatkan sistem kekebalan tubuh"
        ],
        kandungan_gizi: [
            "Kalori: 82",
            "Karbohidrat: 22g",
            "Serat: 2.6g",
            "Vitamin C: 15% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/snake-fruit",
        penjelasan: "Salak adalah buah yang berasal dari Indonesia. Nama Latinnya adalah Salacca zalacca."
    },
    {
        id: 19,
        nama: "Semangka",
        asal: "Afrika Barat",
        jenis: "Citrullus lanatus",
        manfaat: [
            "Menghidrasi tubuh",
            "Meningkatkan kesehatan jantung",
            "Meningkatkan kesehatan kulit"
        ],
        kandungan_gizi: [
            "Kalori: 30",
            "Karbohidrat: 8g",
            "Serat: 0.4g",
            "Vitamin C: 10% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/watermelon-benefits",
        penjelasan: "Semangka adalah buah yang berasal dari Afrika Barat. Nama Latinnya adalah Citrullus lanatus."
    },
    {
        id: 20,
        nama: "Kelapa",
        asal: "Indo-Pasifik",
        jenis: "Cocos nucifera",
        manfaat: [
            "Menghidrasi tubuh",
            "Meningkatkan kesehatan kulit",
            "Menjaga kesehatan pencernaan"
        ],
        kandungan_gizi: [
            "Kalori: 354",
            "Lemak: 33g",
            "Serat: 9g",
            "Zat Besi: 13% dari RDI"
        ],
        sumber: "https://www.healthline.com/nutrition/coconut-nutrition",
        penjelasan: "Kelapa adalah buah yang berasal dari wilayah Indo-Pasifik. Nama Latinnya adalah Cocos nucifera."
    },
    {
        id: 21,
        nama: "Tidak Diketahui",
        asal: "Tidak Diketahui",
        jenis: "Tidak Diketahui",
        manfaat: [
            "Tidak Diketahui"
        ],
        kandungan_gizi: [
            "Tidak Diketahui"
        ],
        sumber: "Tidak Diketahui",
        penjelasan: "Tidak Diketahui"
    }
];

const getFruitInfo = (fruitName) => {
    return buahManfaat.find(buah => buah.nama.toLowerCase() === fruitName.toLowerCase());
};

module.exports = {
    getFruitInfo
};
