import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js";
import { ContactForm } from "./ContactForm.js";
import { Post } from "./Post.js";
import { PostCard } from "./PostCard.js";
import { SearchCard } from "./SearchCard.js";

export async function Router() {
  const $main = document.getElementById("main");
  let { hash } = document.location;

  $main.innerHTML = null;
  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        //  console.log(posts);
        let html = "";
        posts.forEach((el) => (html += PostCard(el)));
        $main.innerHTML = html;
      },
    });
  } else if (hash.includes("#/search")) {
    let query = localStorage.getItem("wpSearch");
    //la primera vez no existe nada en la variable query
    if (!query) {
      document.querySelector(".loader").style.display = "none";
      return false;
    }
    await ajax({
      url: `${api.SEARCH}/${query}`,
      cbSuccess: (search) => {
        let html = "";
        if (search.length === 0) {
          html = `
          <p class="error">No existen resultados de busquedas para el termino <mark>${query}<mark></p>
          `;
        } else {
          search.forEach((post) => (html += SearchCard(post)));
        }
        $main.innerHTML = html;
      },
    });
  } else if (hash === "#/contacto") {
    $main.appendChild(ContactForm());
  } else {
    await ajax({
      url: `${api.POST}/${localStorage.getItem("wpPostId")}`,

      cbSuccess: (post) => {
        // console.log("entro");
        console.log(post);
        $main.innerHTML = Post(post);
      },
    });
  }

  document.querySelector(".loader").style.display = "none";
}
