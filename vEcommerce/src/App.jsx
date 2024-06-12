import { useState, useEffect } from 'react';
import Card from './Card';
import Fuse from 'fuse.js'

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchOutput, setSearchOutput] = useState(products);
  
  const options = {
    includeScore: true,
    keys: ['name'],
    threshold: 0.0
  }
  
  const fuse = new Fuse(products, options);

    useEffect(() => {
      async function fetchData() {
        let response = await fetch("https://raw.githubusercontent.com/lukaszwos/4geeks-ecommerce/master/data.json");
        let productData = await response.json();
        setProducts(productData);
        setSearchOutput(productData);
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
                onChange={(e) => {setSearch(e.target.value)
                  search.length > 1 ? setSearchOutput(products) : setSearchOutput(fuse.search(search).map(element => element.item))
                }
                
                }/>
      </div>
      <div className="container">
        {searchOutput.map((el) => 
          <Card key={el.id} item={el} />)
        }
      </div>
    </>
  );
}

export default App;
