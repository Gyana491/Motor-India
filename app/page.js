import SearchBar from "./components/Searchbar";

 
 const Home = ()=> {

  return (
    <main className="bg-red-500 flex-col justify-center items-center text-white p-4">
      <h1 className="text-4xl mb-4">Motor India</h1>
      <SearchBar/>

    </main>
  );
}

export default Home;