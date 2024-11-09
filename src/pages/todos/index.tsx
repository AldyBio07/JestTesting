import Link from "next/link";
import { GetServerSideProps } from "next";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";

export interface Todo {
  id: number;
  title: string; 
  completed: boolean;
  name?: string; 
  description?: string;
  price?: number;
  imageUrl?: string;
}

interface TodosProps {
    todos: Todo[];
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
      todos: response.data.data,
    },
  };
};

const Todos: React.FC<TodosProps> = ({ todos }) => {
  const router = useRouter();

  const logout = () => {
    deleteCookie("token");
    router.push("/auth/login");
  };

  return (
    <div
      className="min-h-screen bg-gray-900 bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/food-background-black-herbs-spices-utensil-top-view-with-space-text_1040174-349.jpg?semt=ais_hybrid')",
      }}
    >
      <div className="flex justify-between p-4">
        {/* Dashboard */}
        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 text-white transition-all bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Dashboard
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="px-4 py-2 text-white transition-all bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="min-h-screen p-8 bg-black bg-opacity-70">
        <h1 className="mb-12 text-5xl font-bold tracking-wide text-center text-white">
          Our Delicious Menu
        </h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <Link key={todo.id} href={`/todos/${todo.id}`}>
              <div className="p-6 transition-all bg-gray-800 rounded-lg shadow-lg cursor-pointer bg-opacity-90 hover:bg-opacity-100 hover:shadow-xl hover:scale-105">
                <img
                  className="object-cover w-full h-48 mb-4 rounded-md"
                  src={todo.imageUrl}
                  alt={todo.name}
                />
                <h2 className="mb-2 text-2xl font-semibold text-white">
                  {todo.name}
                </h2>
                <p className="mb-4 text-sm text-gray-400">{todo.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-green-400">
                    ${todo.price}
                  </span>
                 
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todos;
