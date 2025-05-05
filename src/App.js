// src/App.js
import React from 'react';
import Header from './components/Header';
import GallerySection from './components/GallerySection';
import OffersSection from './components/OffersSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { indoorItems, outdoorItems, accessoriesItems } from './data';
import './App.css';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <GallerySection 
          id="indoor"
          title="INDOORS" 
          description="Elegant furniture collections for every room in your home"
          items={indoorItems} 
        />
        <GallerySection 
          id="outdoor"
          title="OUTDOORS" 
          description="Beautiful and durable furniture for your outdoor living spaces"
          items={outdoorItems}
        />
        <GallerySection 
          id="accessories"
          title="HOME ACCESSORIES" 
          description="Beautiful accents to complete your home decor"
          items={accessoriesItems}
        />
        <OffersSection/>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;