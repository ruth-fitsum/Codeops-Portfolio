export const dishes = [
  {id:"doro-wat",name:"Doro Wat",category:"Stews",price:420,icon:"🍗",description:"Slow-cooked chicken stew with berbere and egg."},
  {id:"kitfo",name:"Kitfo",category:"Specials",price:480,icon:"🥩",description:"Minced beef seasoned with mitmita and niter kibbeh."},
  {id:"shiro",name:"Shiro",category:"Vegetarian",price:240,icon:"🥣",description:"Smooth chickpea stew with Ethiopian spices."},
  {id:"tibs",name:"Tibs",category:"Specials",price:390,icon:"🍲",description:"Sautéed beef with onion, rosemary, and spices."},
  {id:"misir-wat",name:"Misir Wat",category:"Vegetarian",price:220,icon:"🫘",description:"Red lentils simmered in a fragrant berbere sauce."},
  {id:"beyaynetu",name:"Beyaynetu",category:"Vegetarian",price:300,icon:"🍽️",description:"Colorful vegetarian dishes served on injera."}
];
export async function getDishes(){ return dishes; }
export async function getDish(id){ return dishes.find((dish)=>dish.id===id); }
