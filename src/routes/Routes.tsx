import { Home, NotFound } from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const RoutesProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
