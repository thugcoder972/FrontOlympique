import ModelProducts from  "./Model_products.js";
var dataGallery=[];

const URLImage="https://backend-strapi.online";

async function fetchGallery(categorie) {
  dataGallery=[];
 const arrayLoading = URLImage;
  arrayLoading.map((item) => {
     dataGallery.push({
      id: 1,
      lien: URLImage + item.attributes.url,
      categorie: categorie
    });

  });
  return dataGallery;
  
}




export default {
    fetchGallery, 

}
