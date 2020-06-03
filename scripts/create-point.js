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

  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`)
  .then(res => res.json())
  .then(cities => {
    cities.forEach(city => {
      citiesSelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
    });
    citiesSelect.disabled = false;
  });
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

  populateUFs()