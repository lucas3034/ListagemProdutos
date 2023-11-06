let productsArray = [];
let editIndex = -1;

function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

window.onclick = function(event) {
  if (event.target.className === 'modal') {
    closeModal(event.target.id);
  }
}

document.querySelectorAll('.close-button').forEach(button => {
  button.onclick = function() {
    closeModal(this.closest('.modal').id);
  };
});

document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const productName = document.getElementById('productName').value;
  const productDescription = document.getElementById('productDescription').value;
  const productValue = parseFloat(document.getElementById('productValue').value);
  const available = document.querySelector('input[name="available"]:checked').value === 'Sim';
  productsArray.push({
    name: productName,
    description: productDescription,
    value: productValue,
    available: available
  });
  updateTable();
  closeModal('modalCadastro');
});

document.getElementById('showCadastroButton').addEventListener('click', function() {
  openModal('modalCadastro');
});

document.getElementById('editProductForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const index = document.getElementById('editProductIndex').value;
  productsArray[index] = {
    name: document.getElementById('editProductName').value,
    description: document.getElementById('editProductDescription').value,
    value: parseFloat(document.getElementById('editProductValue').value),
    available: document.querySelector('input[name="editAvailable"]:checked').value === 'Sim'
  };
  updateTable();
  closeModal('modalEditar');
});

function updateTable() {
  const productList = document.getElementById('productList');
  productList.innerHTML = '<tr><th>Nome</th><th>Valor</th><th>Ações</th></tr>';
  productsArray.sort((a, b) => a.value - b.value);
  productsArray.forEach((product, index) => {
    const row = productList.insertRow();
    row.insertCell(0).textContent = product.name;
    const cellValue = row.insertCell(1);
    cellValue.textContent = product.value.toFixed(2);
    cellValue.style.textAlign = 'center';
    const actionsCell = row.insertCell(2);
    actionsCell.style.textAlign = 'right';
    actionsCell.innerHTML = `<button onclick="showDetails(${index})">Detalhes</button>
                             <button class="delete-btn" onclick="deleteProduct(${index})">Deletar</button>`;
  });
}

function showDetails(index) {
  const product = productsArray[index];
  document.getElementById('productNameDetail').textContent = 'Nome: ' + product.name;
  document.getElementById('productValueDetail').textContent = 'Valor: ' + product.value.toFixed(2);
  document.getElementById('productDescriptionDetail').textContent = 'Descrição: ' + product.description;
  document.getElementById('productAvailableDetail').textContent = 'Disponível: ' + (product.available ? 'Sim' : 'Não');
  editIndex = index;
  openModal('modalDetalhes');
}

function showEditModal() {
  const product = productsArray[editIndex];
  document.getElementById('editProductName').value = product.name;
  document.getElementById('editProductDescription').value = product.description;
  document.getElementById('editProductValue').value = product.value;
  document.getElementById('editAvailableYes').checked = product.available;
  document.getElementById('editAvailableNo').checked = !product.available;
  document.getElementById('editProductIndex').value = editIndex;
  closeModal('modalDetalhes');
  openModal('modalEditar');
}

function deleteProduct(index) {
  productsArray.splice(index, 1);
  updateTable();
}
