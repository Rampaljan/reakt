import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import './index.css';
import apiRequest from './apiRequest';
import { useState, useEffect } from 'react';
import { FaTextHeight } from 'react-icons/fa';

function App() {
  const API_URL = "http://localhost:3500/items/"

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetcherror, setFetchError] = useState(null);

  useEffect(() => {
    const fetchitems = async () => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Did not received expected data")
        const listitems = await response.json();
        setItems(listitems);
        setFetchError(null)
      } catch(err){
        setFetchError(err.message)
      }
    }

    fetchitems()
    
  }, [])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);



  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    
    <div className="App">
      <link rel="stylesheet" href="index.css"></link>
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
      {fetcherror && <p style={{color: "red"}}>{`Error: ${fetcherror}`}</p>}
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
