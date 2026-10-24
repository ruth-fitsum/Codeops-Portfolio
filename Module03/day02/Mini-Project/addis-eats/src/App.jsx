import Header from "./Header";
import Menu from "./Menu";
import menu from "./data";

function App() {
  const selectedCategory = "Main Course";

  return (
    <div className="app">
      <Header />
      <Menu dishes={menu} category={selectedCategory} />
    </div>
  );
}

export default App;