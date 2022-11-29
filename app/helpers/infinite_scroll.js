import { SearchCard } from "../components/SearchCard.js";
import api from "./wp_api.js";
import { ajax } from "./ajax.js";
import { PostCard } from "../components/PostCard.js";
export async function infiniteScroll() {
  let query = localStorage.getItem("wpSearch"),
    apiUrl,
    // como va guardar un componente por eso lo declaramos con mayuscula
    Component;
  window.addEventListener("scroll", async (e) => {
    //destructuramos las propiedades de la etiqueta html
    //vamos a obtener la posicion respecto al sroll top, anchura y altura tanto del navegador como del cuerpo del contenido de la pagina.
    //para poder detectar cuando lleguemos al final de la pagina
    let { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    let { hash } = window.location;
    // console.log(scrollTop, clientHeight, scrollHeight, hash);
    if (scrollTop + clientHeight >= scrollHeight) {
      api.page++;
      if (!hash || hash === "#/") {
        apiUrl = `${api.POSTS}&page=${api.page}`;
        Component = PostCard;
      } else if (hash.includes("#/search")) {
        apiUrl = `${api.SEARCH}${query}&page=${api.page}`;
        Component = SearchCard;
      } else {
        return false;
      }
      document.querySelector(".loader").style.display = "block";
      await ajax({
        url: apiUrl,
        cbSuccess: (posts) => {
          // console.log(posts);
          let html = "";
          posts.forEach((post) => (html += Component(post)));
          document.getElementById("main").insertAdjacentHTML("beforeend", html);
          document.querySelector(".loader").style.display = "none";
        },
      });
    }
  });
}
