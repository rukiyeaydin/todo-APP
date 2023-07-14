import './App.css';
import React, {useState} from 'react';

function App() {
  const [newItem,setNewItem] = useState('');
  const [Items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedValue, setEditedValue] = useState('');

  function addItem(e){
    e.preventDefault();
    
    if(!newItem)
    {
      alert("Lütfen görev girin.");
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value : newItem
    }
    setItems((oldList) => [...oldList, item]); // [...oldList, item] ifadesi, 
    // spread operatörü (...) kullanılarak oldList dizisinin tüm öğelerini kopyalar ve
    // ardından 'item' değişkenini listenin sonuna ekleyip yeni bir liste oluşturur.
    // Yani inputa girdiğimiz 'item' ögesi yapılacaklar listesine eklenir.
    setNewItem('');
  }

  function editItem(itemId) {
    setEditingItemId(itemId);
    const editedItem = Items.find(item => item.id === itemId);
    if (editedItem) {
      setEditedValue(editedItem.value);
    }
  }
  function removeItem(itemId) {
    setItems((oldList) => oldList.filter(item => item.id !== itemId));
  }
  function saveItem() {
    setItems(oldList =>
      oldList.map(item =>
        item.id === editingItemId ? { ...item, value: editedValue } : item
      )
    );
    setEditingItemId(null);
  }

  function cancelEdit() {
    setEditingItemId(null);
  }

  return (
    <div className="App">
      <h1>My Todo App</h1>
      {/* aşağıda form yerine div kullanılırsa enter onclick özelliği görmez */}
      <form className='add'>
        <input type="text" placeholder='Görev girin...' value={newItem} onChange={ e => setNewItem(e.target.value)} />
        <button onClick={addItem}>Ekle</button>
      </form>
      <h3>YAPILACAKLAR</h3>
      <hr className='cizgi'/>
        <div className="tablo">{Items.map(item => (
          <>
          <div key = {item.id} className='row'>
            <form>{editingItemId === item.id ? (<input type="text" className='editInput' value={editedValue} onChange={e => setEditedValue(e.target.value)} />) : (item.value)}</form>
            <div className="butonlar">
              <div>{editingItemId === item.id ? (<button className='editKaydet' onClick={saveItem}>Kaydet</button>) : (<button className='edit' onClick={() => editItem(item.id)}><i className="fa-solid fa-pen-to-square"></i></button>)}</div>
              <div>{editingItemId === item.id ? (<button className='editIptal' onClick={cancelEdit}>İptal</button>) : (<button className='delete' onClick={() => removeItem(item.id)}><i className="fa-solid fa-trash"></i></button>)}</div>
            </div>
          </div>
          <hr className='cizgi2'/>
          </>
        ))}</div>
      
    </div>
  );
}

export default App;

