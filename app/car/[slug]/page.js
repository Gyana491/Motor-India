import React from 'react';
import Car360View from './Car360View';
import Slider from './Slider';
import Searchbar from '@/app/components/Searchbar';

export async function generateStaticParams() {
  const res = await fetch('https://motorindia.in/wp-json/api/cars');
  const data = await res.json();
  const slugs = data.posts.map(post => ({ slug: post.slug }));

  return slugs;
}

const CarPage = async ({ params }) => {
  const { slug } = params;
  const res = await fetch(`https://motorindia.in/wp-json/api/cars?slug=${slug}`);
  const data = await res.json();
  const car = data.posts[0] || null;

  const exteriorImages = Object.values(car.images.exterior).slice(0, 6);
  const interiorImages = Object.values(car.images.interior).slice(0, 6);

  const images = [
    car.image_url,
    ...exteriorImages.map(img => img.url),
    ...interiorImages.map(img => img.url),
  ];

  return (
    <>
      <Searchbar />
      <div className="container mx-auto p-4">
        <Slider images={images} />
        <h1 className="text-3xl font-bold mb-4">{car.title}</h1>
        <div className="mb-4">
          <p><strong>Brand:</strong> {car.brand_name}</p>
          <p><strong>Model:</strong> {car.model_name}</p>
          <p><strong>Price:</strong> {car.price.min_price_formatted} - {car.price.max_price_formatted}</p>
          <p><strong>Mileage:</strong> {car.keySpecs.mileage}</p>
        </div>
        {car.title && <h2 className="text-2xl font-semibold mb-2">{car.model_name} Exterior Images</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {Object.values(car.images.interior).map((img, index) => (
            <div key={index} className="text-center">
              <img className="w-full h-auto" src={img.url} alt={img.alt} />
              <p>{img.alt}</p>
            </div>
          ))}
        </div>
        {car.title && <h2 className="text-2xl font-semibold mb-2">{car.model_name} Interior Images</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {Object.values(car.images.exterior).map((img, index) => (
            <div key={index} className="text-center">
              <img className="w-full h-auto" src={img.url} alt={img.alt} />
              <p>{img.alt}</p>
            </div>
          ))}
        </div>
        {car.title && <h2 className="text-2xl font-semibold mb-2">{car.model_name} Colors</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {Object.values(car.images.colors).map((color, index) => (
            <div key={index} className="text-center">
              <img className="w-full h-auto" src={color.url} alt={color.alt} />
              <p>{color.alt}</p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-semibold mb-2">360 View</h2>
        <Car360View car={car} />
      </div>
    </>
  );
};

export default CarPage;