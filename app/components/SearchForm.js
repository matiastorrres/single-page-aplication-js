export function SearchForm() {
  const $form = document.createElement("form");
  const $input = document.createElement("input");
  $form.classList.add("search-form");
  $input.name = "search";
  $input.type = "search";
  $input.placeholder = "Buscar...";
  $form.appendChild($input);

  //desactivo las opciones del autocompletado
  $input.autocomplete = "off";

  //para que no limpie el input
  if (location.hash.includes("#/search")) {
    $input.value = localStorage.getItem("wpSearch");
  }
  //para limpiar el localStorage cuando limpiemos el input
  document.addEventListener("search", (e) => {
    if (!e.target.matches("input[type='search']")) return false;
    if (!e.target.value) localStorage.removeItem("wpSearch");
  });

  //delegacion del evento submit
  document.addEventListener("submit", (e) => {
    if (!e.target.matches(".search-form")) return false;
    e.preventDefault();
    localStorage.setItem("wpSearch", e.target.search.value);
    location.hash = `#/search?search=${e.target.search.value}`;
  });

  return $form;
}
