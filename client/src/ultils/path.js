const path = {
  // Public Route
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PITCHES: "pitches",
  FAQ: "faqs",
  CONTACT: "contact",
  DETAIL_ORDER: "my-order",
  CHECKOUT: "checkout",
  NEWS: "news",
  PITCHES__CATEGORY: ":category",
  FINAL_REGISTER: "finalregister/:status",
  RESET_PASSWORD: "reset-password/:token",
  DETAIL_PITCH__CATEGORY__BRAND__PITCHID__TITLE: ":category/:brand/:pid/:title",
  DETAIL_NEWS: "news/:nid",
  CATEGORY__BRAND: ":category/:brand",

  // Admin Route
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_PITCH: "manage-pitch",
  MANAGE_ORDER: "manage-order",
  CREATE_PITCH: "create-pitch",
  MANAGE_CATEGORY: "manage-category",
  CREATE_CATEGORY: "create-category",
  MANAGE_BRANDS: "manage-brands",
  CREATE_BRANDS: "create-brands",
  MANAGE_NEWS: "manage-news",
  CREATE_NEWS: "create-news",
  // Member Route
  MEMBER: "member",
  PERSONAL: "personal",
  HISTORY: "buy-history",
  WISHLIST: "wishlist",

  // PitchOwner Route
  PITCHOWNER: "pitchonwer",
  PERSONALOWN: "personal",
  DASHBOARD_PITCHOWN: "dashboard-owner",
  MANAGE_PITCHOWN: "manage-pitch",
  CREATE_PITCHOWN: "create-pitch",
  MANAGE_BRAND_PITCHOWNER: "manage-pitchowner-brands",
  CREATE_BRAND_PITCHOWNER: "create-pitchowner-brands",
  MANAGE_ORDER_PITCHOWNER: "manage-pitchowner-order",
};
export default path;
