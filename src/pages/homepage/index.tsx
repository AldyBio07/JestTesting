import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";


interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface HomepageProps {
  foods: Food[];
}


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = getCookie("token", { req, res });

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const response = await axios.get(
    "https://api-bootcamp.do.dibimbing.id/api/v1/foods",
    {
      headers: {
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    props: {
      foods: response.data.data,
    },
  };
};

const Homepage: React.FC<HomepageProps> = ({ foods }) => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/auth/login");
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
  };

  return (
    <div className="relative min-h-screen font-sans text-gray-200 bg-gray-900">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute px-4 py-2 text-sm font-semibold text-white transition duration-300 bg-red-600 rounded-md top-5 right-5 hover:bg-red-700"
      >
        Logout
      </button>

      <h1 className="mb-10 text-6xl font-extrabold text-center text-[#FF6500]">
        Dashboard
      </h1>

      {/* Carousel */}
      <div className="w-full max-w-6xl mx-auto mb-10">
        <Slider {...sliderSettings}>
          {foods.map((food) => (
            <div key={food.id} className="p-4">
              <div className="relative overflow-hidden transition-transform duration-300 transform bg-gray-800 rounded-lg shadow-lg hover:scale-105">
                <img
                  className="object-cover w-full h-64 transition-transform duration-300 rounded-lg"
                  src={food.imageUrl}
                  alt={food.name}
                />
                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black bg-opacity-50 rounded-lg">
                  <h2 className="text-4xl font-semibold text-[#FF6500] text-center">
                    {food.name}
                  </h2>
                  <p className="mt-2 text-lg text-center text-gray-200">
                    {food.description}
                  </p>
                  <span className="block mt-4 text-xl font-semibold text-green-400">
                    ${food.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Featured */}
      <div className="max-w-6xl p-6 mx-auto mb-10 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-4 text-4xl font-extrabold text-center text-[#FF6500]">
          Featured Dishes
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {foods.slice(0, 3).map((food) => (
            <div key={food.id} className="p-4 bg-gray-700 rounded-lg">
              <img
                className="object-cover w-full h-40 rounded-md"
                src={food.imageUrl}
                alt={food.name}
              />
              <h3 className="mt-2 text-xl font-semibold text-[#FF6500]">
                {food.name}
              </h3>
              <p className="mt-1 text-gray-300">{food.description}</p>
              <span className="block mt-2 text-lg font-semibold text-green-400">
                ${food.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl p-6 mx-auto mb-10 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-6 text-4xl font-extrabold text-center text-[#FF6500]">
          What Our Customers Say
        </h2>
        <div className="flex flex-col space-y-6">
          <div className="p-6 transition-transform duration-300 transform bg-gray-700 rounded-lg shadow-md hover:scale-105">
            <p className="text-lg italic text-gray-300">
              "The food was absolutely amazing! I will definitely be coming
              back."
            </p>
            <span className="block mt-4 text-sm font-semibold text-green-400">
              - Alex J.
            </span>
          </div>
          <div className="p-6 transition-transform duration-300 transform bg-gray-700 rounded-lg shadow-md hover:scale-105">
            <p className="text-lg italic text-gray-300">
              "A delightful experience! The ambiance and service were
              top-notch."
            </p>
            <span className="block mt-4 text-sm font-semibold text-green-400">
              - Sarah K.
            </span>
          </div>
          <div className="p-6 transition-transform duration-300 transform bg-gray-700 rounded-lg shadow-md hover:scale-105">
            <p className="text-lg italic text-gray-300">
              "Best pizza I've ever had! Highly recommend to everyone."
            </p>
            <span className="block mt-4 text-sm font-semibold text-green-400">
              - John D.
            </span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-6xl p-6 mx-auto mb-10 text-center bg-green-600 rounded-lg shadow-lg">
        <h2 className="mb-4 text-4xl font-extrabold text-[#FF6500]">
          Ready to Order?
        </h2>
        <p className="mb-4 text-lg text-gray-200">
          Browse our menu and place your order today!
        </p>
        <button
          onClick={() => router.push("/todos")}
          className="px-6 py-3 text-lg font-bold text-white transition duration-300 bg-red-600 rounded-md hover:bg-red-700"
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Homepage;
