const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-60 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">PickleConnect</h1>
        <nav>
          <ul className="flex gap-6 text-sm font-medium">
            <li>Home</li>
            <li>About</li>
            <li>Features</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
