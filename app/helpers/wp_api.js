/*este archivo guarda todas las variables que nos van a permitir cosultar hacia un dominio de wordpress*/
const NAME = "malvestida",
  DOMAIN = `https://${NAME}.com`,
  SITE = `${DOMAIN}/wp-json`,
  API_WP = `${SITE}/wp/v2`,
  POSTS = `${API_WP}/posts?_embed`,
  POST = `${API_WP}/posts`,
  SEARCH = `${API_WP}/search?_embed&search=`;
export default {
  NAME,
  DOMAIN,
  SITE,
  API_WP,
  POST,
  POSTS,
  SEARCH,
};
