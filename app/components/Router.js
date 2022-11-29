import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js";
import { Post } from "./Post.js";
import { PostCard } from "./PostCard.js";

export async function Router() {
  const $main = document.getElementById("main");
  let { hash } = document.location;

  $main.innerHTML = null;
  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        console.log(posts);
        let html = "";
        posts.forEach((el) => (html += PostCard(el)));
        $main.innerHTML = html;
      },
    });
  } else if (hash.includes("#/search"))
    $main.innerHTML = "<h2>Seccion del search</h2>";
  else if (hash === "#/contacto")
    $main.innerHTML = "<h2>Seccion del contacto</h2>";
  else {
    await ajax({
      url: `${api.POST}/${localStorage.getItem("wpPostId")}`,

      cbSuccess: (post) => {
        console.log("entro");
        console.log(post);
        $main.innerHTML = Post(post);
        // let html = "";
        // posts.forEach((el) => (html += PostCard(el)));
        // $main.innerHTML = html;
      },
    });
  }

  document.querySelector(".loader").style.display = "none";
}
