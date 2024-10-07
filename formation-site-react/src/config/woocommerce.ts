import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new (WooCommerceRestApi as any)({
  url: "https://localhost/EJC-Formation/formation-site-wordpress",
  consumerKey: "ck_65fdf17b4ff1ea286b04713dfd700674fac9cbf9",
  consumerSecret: "cs_df0740dd9f04782f55c42be5d12f53ee35f8b4aa",
  wpAPI: true,
  version: "wc/v3",
  verifySsl: false,
  queryStringAuth: true
});

export default api;