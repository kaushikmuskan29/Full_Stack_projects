async function fetchProducts(keyword = '') {
  const url = keyword ? `/api/products/search/${keyword}` : '/api/products';
  const res = await fetch(url);
  const products = await res.json();

  const list = document.getElementById('productList');
  list.innerHTML = '';

  products.forEach(p => {
    list.innerHTML += `
      <div class="border border-pink-300 p-4 rounded-lg shadow-md transition hover:shadow-lg">
        <h3 class="text-lg font-semibold text-pink-700">${p.name}</h3>
        <p class="text-gray-700">Price: ₹${p.price}</p>
        <p class="text-gray-600 mb-2">${p.description || ''}</p>
        <button onclick="deleteProduct('${p._id}')" 
          class="bg-pink-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm">
          Delete
        </button>
        <button onclick="showEditForm('${p._id}', \`${p.name}\`, \`${p.price}\`, \`${p.description || ''}\`)" 
          class="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm hover:bg-yellow-500">
          Edit
        </button>
      </div>
    `;
  });
}

async function addProduct() {
  const nameInput = document.getElementById('name');
  const priceInput = document.getElementById('price');
  const descInput = document.getElementById('description');

  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const description = descInput.value.trim();

  if (!name || !price) {
    alert("Please enter both name and price.");
    return;
  }

  await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, description }),
  });

  nameInput.value = '';
  priceInput.value = '';
  descInput.value = '';
  fetchProducts();
}

async function deleteProduct(id) {
  await fetch(`/api/products/${id}`, {
    method: 'DELETE'
  });

  const currentEditingId = document.getElementById('editId').value;
  if (currentEditingId === id) {
    document.getElementById('editSection').classList.add('hidden');
  }

  fetchProducts();
}

function showEditForm(id, name, price, description) {
  document.getElementById('editId').value = id;
  document.getElementById('editName').value = name;
  document.getElementById('editPrice').value = price;
  document.getElementById('editDescription').value = description;
  document.getElementById('editSection').classList.remove('hidden');
}

async function editProduct() {
  const id = document.getElementById('editId').value;
  const name = document.getElementById('editName').value.trim();
  const price = document.getElementById('editPrice').value.trim();
  const description = document.getElementById('editDescription').value.trim();

  if (!id || !name || !price) {
    alert("All fields are required.");
    return;
  }

  await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, description }),
  });

  document.getElementById('editId').value = '';
  document.getElementById('editName').value = '';
  document.getElementById('editPrice').value = '';
  document.getElementById('editDescription').value = '';
  document.getElementById('editSection').classList.add('hidden');
  fetchProducts();
}

document.getElementById('searchBox').addEventListener('input', (e) => {
  fetchProducts(e.target.value);
});

fetchProducts();
