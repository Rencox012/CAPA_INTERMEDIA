//component that will contain a product
import Producto from "./Producto.js";
import api from "../../api/api.js";

async function obtainProduct(id){
    // Call the login function
    const response = await api.products.getProducto(id)
        return response.json();
}

async function obtainProductPictures(id){
    // Call the login function
    const response = await api.products.getProductPictures(id)
        return response.json();
}

export default function DisplayProducto() {
    return{
        render: async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');

            //obtain the product from the server
            const response = await obtainProduct(id);

            const ProductInfo = response[0];

            //obtain the pictures from the server
            const responsePictures = await obtainProductPictures(id);
            //Search for the image where the category is Video
            const video = responsePictures.find(image => image.Categoria === "Video");
            const images = responsePictures.filter(image => image.Categoria === "Foto");

            //map the images array to send only the Archivo
            const ImagesFinal = images.map((image) => {
                return image.Archivo;
            }
            );
            return Producto().render(ProductInfo.Nombre_Producto, video.Archivo, ImagesFinal, ProductInfo.Precio, ProductInfo.Promedio_Calificacion, ProductInfo.Descripcion, ProductInfo.Total_Reviews, ProductInfo.Nombre_Vendedor, ProductInfo.ID_Vendedor, ProductInfo.Tipo);
        }
    }

   

}
