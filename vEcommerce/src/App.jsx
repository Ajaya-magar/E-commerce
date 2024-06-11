import { useState, useEffect } from 'react';
import Card from './Card';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  
    useEffect(() => {
      async function fetchData() {
        let response = await fetch("https://raw.githubusercontent.com/lukaszwos/4geeks-ecommerce/master/data.json");
        let productData = await response.json();
        setProducts(productData);
      }
      fetchData();
    }, []);

  const filteredProducts = search.length === 0 ? products : 
    products.filter(el => el.name.toLowerCase().includes(search.toLowerCase()));


  return (
    <>
      <div className="m-3">
            <label className="form-label">Find:</label>
            <input 
                className="form-control"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div className="container">
        {filteredProducts.map((el) => 
          <Card key={el.id} item={el} />)
        }
      </div>
    </>
  );
}

export default App;
