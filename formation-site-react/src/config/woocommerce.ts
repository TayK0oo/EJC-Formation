import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

//ck_05974395a1a6b7bc06f26ec07efe5548d7b6e96d
//cs_17843e3eb78ab9d044b73f5f19c676b899a85c50

//local : 
//ck_65fdf17b4ff1ea286b04713dfd700674fac9cbf9
//cs_df0740dd9f04782f55c42be5d12f53ee35f8b4aa

const api = new (WooCommerceRestApi as any)({
  url: "https://formations.ejcf.fr/",
  consumerKey: "ck_05974395a1a6b7bc06f26ec07efe5548d7b6e96d",
  consumerSecret: "cs_17843e3eb78ab9d044b73f5f19c676b899a85c50",
  wpAPI: true,
  version: "wc/v3",
  verifySsl: false,
  queryStringAuth: true
});

export default api;