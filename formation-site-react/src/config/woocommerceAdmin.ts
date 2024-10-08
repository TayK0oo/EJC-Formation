import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const adminApi = new (WooCommerceRestApi as any)({
  url: "https://formations.ejcf.fr/",
  consumerKey: "ck_c7abf92ee212b00106ab17b96f63107ed01fad26",
  consumerSecret: "cs_9e273b9de8fbbd6790bd27e468e4c2007cb64539",
  wpAPI: true,
  version: "wc/v3",
  verifySsl: false,
  queryStringAuth: true
});

export default adminApi;