import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, ChevronLeft, ChevronRight } from "lucide-react";

// ---------- Hero Carousel ----------
interface Slide {
  id: number;
  title: string;
  mainText: string;
  subtitle: string;
  buttonText: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "BEST SMARTPHONE",
    mainText: "WIRELESS CHARGING STAND",
    subtitle: "Up To 70% Off",
    buttonText: "BUY NOW",
    image: "/wireless.jpg",
  },
  {
    id: 2,
    title: "NEW COLLECTION",
    mainText: "SMART WATCH SERIES 6",
    subtitle: "Up To 50% Off",
    buttonText: "SHOP NOW",
    image: "/smart.jpg",
  },
];

const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative flex justify-center py-12 overflow-hidden bg-gray-50">
      <div className="w-full max-w-6xl relative min-h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-full flex flex-col items-center px-4 md:px-12 lg:px-20 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Image at top */}
            <div className="w-full flex justify-center mb-8">
              <img
                src={slide.image}
                alt={slide.mainText}
                className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] object-contain"
              />
            </div>

            {/* Text at bottom */}
            <div className="w-full max-w-xl text-center">
              <h4 className="text-red-400 font-semibold mb-2 text-sm md:text-base">
                {slide.title}
              </h4>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {slide.mainText}
              </h1>
              <p className="text-gray-700 mb-6 text-base md:text-lg">{slide.subtitle}</p>
              <button className="bg-red-400 text-white px-6 md:px-8 py-2 md:py-4 font-semibold rounded hover:bg-red-500 transition">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}

        {/* Dots at bottom */}
        <div className="absolute bottom-16 w-full flex justify-center z-20">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full cursor-pointer transition mx-1 ${
                index === current ? "bg-red-400" : "bg-gray-300"
              }`}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>

        {/* Navigation buttons at bottom corners */}
        <button
          onClick={prevSlide}
          className="absolute left-4 bottom-4 bg-white p-2 md:p-3 rounded-full shadow hover:bg-gray-100 transition z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 bottom-4 bg-white p-2 md:p-3 rounded-full shadow hover:bg-gray-100 transition z-20"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

// ---------- Shop Section ----------
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  featured?: boolean;
  image: string;
  category: string;
}

const hotDeal = {
  id: 1,
  name: "Apple Watch Series 5",
  price: 499,
  originalPrice: 599,
  discount: 17,
  sold: 50,
  available: 75,
  image: "/ba1.jpg",
  category: "Electronics",
};

const featuredProducts: Product[] = [
  {
    id: 2,
    name: "Apple iPhone 11 Pro Max",
    price: 199,
    originalPrice: 254,
    discount: 22,
    image: "/ab1.jpg",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Apple Watch Series 5",
    price: 499,
    originalPrice: 599,
    discount: 17,
    image: "/ba1.jpg",
    category: "Electronics",
  },
  {
    id: 4,
    name: "JBL Wireless Bluetooth Speaker",
    price: 96,
    featured: true,
    image: "/ac1.jpg",
    category: "Electronics",
  },
  {
    id: 5,
    name: "JBL On-Ear Headphones",
    price: 124,
    featured: true,
    image: "/ca1.jpg",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Apple AirPods with Wireless Charging",
    price: 85,
    featured: true,
    image: "/da1.jpg",
    category: "Electronics",
  },
];

const Shop = () => {
  return (
    <div className="p-6 bg-white mt-12 md:mt-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Hot Deals */}
        <div className="border rounded-lg p-4 shadow-sm relative group overflow-hidden flex flex-col">
          <h2 className="font-bold text-lg mb-2">HOT DEALS</h2>
          <div className="flex-1 flex items-center justify-center relative">
            {hotDeal.discount && (
              <span className="absolute top-2 left-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
                {hotDeal.discount}% OFF
              </span>
            )}
            <img
              src={hotDeal.image}
              alt={hotDeal.name}
              className="w-[220px] sm:w-[260px] md:w-[300px] h-auto object-contain"
            />
          </div>
          <div className="mt-auto text-center">
            <p className="text-gray-500 text-xs uppercase">{hotDeal.category}</p>
            <h3 className="font-semibold">{hotDeal.name}</h3>
            <p className="text-lg font-bold text-gray-800">
              ${hotDeal.price}.00 - ${hotDeal.originalPrice}.00
            </p>
            <p className="text-sm text-gray-500">
              Already Sold: {hotDeal.sold} | Available: {hotDeal.available}
            </p>
            <div className="w-full bg-gray-200 h-2 rounded mt-2 mb-3">
              <div
                className="bg-red-400 h-2 rounded"
                style={{
                  width: `${(hotDeal.sold / (hotDeal.sold + hotDeal.available)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">FEATURED PRODUCTS</h2>
            <button className="bg-black text-white px-4 py-1 rounded">
              VIEW ALL
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-3 shadow-sm relative group overflow-hidden flex flex-col items-center"
              >
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
                {product.featured && (
                  <span className="absolute top-2 right-2 bg-red-400 text-white text-xs font-bold px-2 py-1 rounded">
                    FEATURED
                  </span>
                )}
                <div className="flex-1 flex flex-col items-center justify-start">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[200px] sm:w-[250px] md:w-[280px] lg:w-[300px] xl:w-[350px] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <p className="text-gray-500 text-xs mt-2 uppercase">{product.category}</p>
                  <h3 className="font-semibold mt-1 text-center">{product.name}</h3>
                  <p className="text-sm font-bold text-gray-800 mt-1">
                    ${product.price}.00{" "}
                    {product.originalPrice && (
                      <span className="line-through text-gray-400 ml-2">
                        ${product.originalPrice}.00
                      </span>
                    )}
                  </p>
                </div>

                <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 group-hover:bottom-3 transition-all duration-300">
                  <button className="bg-red-400 p-2 rounded-full shadow hover:bg-red-600 transition">
                    <ShoppingCart className="w-4 h-4 text-white" />
                  </button>
                  <button className="bg-red-400 p-2 rounded-full shadow hover:bg-red-600 transition">
                    <Search className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Main Home ----------
export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <Shop />
    </div>
  );
}