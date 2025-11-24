import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AuthStudent
          </h1>
          <p className="text-gray-600">
            Authentication system with role-based access control
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 space-y-4">
          <Link
            to="/register"
            className="block w-full px-6 py-3 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 text-center"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="block w-full px-6 py-3 bg-white text-gray-700 rounded font-medium hover:bg-gray-50 border border-gray-300 text-center"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
