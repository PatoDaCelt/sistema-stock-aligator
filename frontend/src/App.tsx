import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductosList from "./components/ProductosList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductosList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;