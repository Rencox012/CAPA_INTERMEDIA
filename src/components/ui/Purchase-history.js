//component for purchase history
import api from "../../api/api.js";

async function obtainPurchaseHistory(){
    const response = await api.purchase.getPurchaseHistory(id)
        return response.json();
}