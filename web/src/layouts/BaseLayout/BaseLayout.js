const BaseLayout = ({ children }) => {
  return (
    <div className="h-full flex flex-col">
      <header className="bg-indigo-500 py-4">
        <div className="max-w-5xl container sm:px-8">
          <div className="text-white py-4">GoogleAuth Demo</div>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-5xl container py-12 sm:px-8">{children}</div>
      </main>
      <footer className="bg-indigo-500">
        <div className="max-w-5xl container sm:px-8">
          <div className="text-white py-4">Footer</div>
        </div>
      </footer>
    </div>
  );
};

export default BaseLayout;
