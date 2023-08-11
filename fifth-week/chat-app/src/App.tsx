import Book from "./Book";
import Chat from "./Chat";

function App() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gray-100 border border-gray-300 p-8">
        <Chat />
      </div>
      <div className="flex-1 bg-gray-100 border border-gray-300 p-8">
        <Book />
      </div>
    </div>
  );
}

export default App;
