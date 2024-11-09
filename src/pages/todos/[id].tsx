import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";

interface Todo {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
  rating: number;
  totalLikes: number;
}

interface TodoDetailProps {
  todo: Todo;
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
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
    `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${params?.id}`,
    {
      headers: {
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    props: {
      todo: response.data.data,
    },
  };
};

const TodoDetail: React.FC<TodoDetailProps> = ({ todo }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 bg-[url('/path-to-food-background.jpg')] bg-cover bg-center bg-no-repeat bg-opacity-50">
      <div className="min-h-screen p-8 text-gray-200 backdrop-filter backdrop-brightness-50">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 mb-8 text-white transition-all bg-gray-700 rounded-md hover:bg-gray-600"
        >
          Back
        </button>

        <div className="p-8 bg-gray-800 rounded-lg shadow-lg">
          <img
            className="object-cover w-full h-64 mb-4 rounded-md"
            src={todo.imageUrl}
            alt={todo.name}
          />
          <h1 className="mb-4 text-4xl font-bold text-white">{todo.name}</h1>
          <p className="mb-4 text-gray-400">{todo.description}</p>
          <p className="mb-4 text-2xl font-bold text-green-400">
            Rp.{todo.price}
          </p>
          <p className="mb-4 text-gray-400">
            Ingredients:
            <br />
            {todo.ingredients.map((ingredient, index) => (
              <span key={index}>
                {ingredient}
                <br />
              </span>
            ))}
          </p>
          <p className="mb-4 text-yellow-400">⭐ {todo.rating}</p>
          <p className="mb-4 text-gray-300">Likes: {todo.totalLikes}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
