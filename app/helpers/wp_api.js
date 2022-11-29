/*este archivo guarda todas las variables que nos van a permitir cosultar hacia un dominio de wordpress*/
const NAME = "css-tricks",
  DOMAIN = `https://${NAME}.com`,
  SITE = `${DOMAIN}/wp-json`,
  API_WP = `${SITE}/wp/v2`,
  PER_PAGE = 6,
  POSTS = `${API_WP}/posts?_embed&per_page=${PER_PAGE}`,
  POST = `${API_WP}/posts`,
  SEARCH = `${API_WP}/search?_embed&per_page=${PER_PAGE}&search=`;

//LA NUMERO DE PAGINA POR LA QUE VAMOS A EMPEZAR
let page = 1;
export default {
  NAME,
  DOMAIN,
  SITE,
  API_WP,
  POST,
  POSTS,
  SEARCH,
  PER_PAGE,
  page,
};
