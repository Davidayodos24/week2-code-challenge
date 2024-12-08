document.addEventListener('DOMContentLoaded', () => {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItem');
    const shoppingListContainer = document.getElementById('shoppingList');
    const clearListButton = document.getElementById('clearList');

    // Function to render the shopping list.
    const renderList = () => {
        shoppingListContainer.innerHTML = '';
        shoppingList.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name;
            listItem.classList.toggle('purchased', item.purchased);
            listItem.addEventListener('click', () => {
                item.purchased = !item.purchased;
                saveToLocalStorage();
                renderList();
            });
            listItem.addEventListener('dblclick', () => {
                const newName = prompt('Edit item:', item.name);
                if (newName) {
                    item.name = newName;
                    saveToLocalStorage();
                    renderList();
                }
            });
            shoppingListContainer.appendChild(listItem);
        });
    };

    // Function to save the shopping list to local storage
    const saveToLocalStorage = () => {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    };

    // Add item event
    addItemButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim();
        if (itemName !== '') {
            shoppingList.push({ name: itemName, purchased: false });
            itemInput.value = '';
            saveToLocalStorage();
            renderList();
        }
    });

    // Clear list event.
    clearListButton.addEventListener('click', () => {
        shoppingList.length = 0;
        saveToLocalStorage();
        renderList();
    });

    // Initial render
    renderList();
});
