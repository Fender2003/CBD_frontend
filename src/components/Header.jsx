import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-60 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">PickleConnect</h1>
        <nav className="flex items-center gap-6">
          <ul className="flex gap-6 text-sm font-medium">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Features</li>
          </ul>
          <Link
            to="/login"
            className="ml-4 px-4 py-1.5 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
