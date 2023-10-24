import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState([]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event){
    setSearch(event.target.value);
  }

  function onItemFormSubmit(itemObj){
    setNewItem([...newItem, itemObj]);
  }

  const combinedItems = [...items, ...newItem]

  const itemsToDisplay = combinedItems.filter((item) => { 
    if (search && !item.name.includes(search)) {
      return false;
    }
    if (selectedCategory !== "All" && item.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const filteredItems = items.filter((item) => {
    if (item.name === search) return item.name;
    return "";
  })

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}/>
      <Filter search={search} onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
