import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";

import NotFound from "./pages/NotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import Product from "./pages/Product";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CityContextProvider } from "./context/CityContextProvider";
import { PlaceHolderAuthContext } from "./context/PlaceHolderAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function AppContext() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/products" element={<Product />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Navigate is kind of redirect where index reached below component
            and navigate redirects directly to cities path at index,
            replace is needed top go back as it replaces the current component in
            history stack
            */}
            <Route index element={<Navigate to="cities" replace />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <CityContextProvider>
      <PlaceHolderAuthContext>
        <AppContext />
      </PlaceHolderAuthContext>
    </CityContextProvider>
  );
}
export default App;
