function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
      states.forEach(state => {
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      });
    });
}

function getCities(event) {
  const citiesSelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");
  
  const ufId = event.target.value;
  
  const ufSelectedIndex = event.target.selectedIndex;
  stateInput.value = event.target.options[ufSelectedIndex].text;

  citiesSelect.innerHTML = '<option value>Selecione a Cidade</option>'
  citiesSelect.disabled = true

  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`)
  .then(res => res.json())
  .then(cities => {
    cities.forEach(city => {
      citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
    });
    citiesSelect.disabled = false;
  });
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

  populateUFs()


// Itens de Coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

itemsToCollect.forEach(item => {
  item.addEventListener("click", handleSelectedItem);
});

let selectedItems = [];
const collectedItems = document.querySelector('input[name=items]')

function handleSelectedItem(event) {
  const item = event.target;

  item.classList.toggle("selected")
  
  const itemId = item.dataset.id;

  const alreadySelected = selectedItems.findIndex(item => item == itemId);

  if (alreadySelected < 0) {
    selectedItems.push(itemId);
  } else {
    selectedItems = selectedItems.filter(item => item != itemId);
  }

  collectedItems.value = selectedItems;
}
