//PARA EL FUTURO, PROMEDIO A PAGAR
document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', updateTotal);
});

function updateTotal() {
    let total = 0;
    document.querySelectorAll('.product-item').forEach(item => {
        let price = parseFloat(item.querySelector('.details p').textContent.replace('MXN', ''));
        let quantity = parseInt(item.querySelector('select').value);
        total += price * quantity;
    });
    document.querySelector('.summary p').textContent = `Total: $MXN${total.toFixed(2)}`;
}

//BOTE DE BASURA
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones de borrar
    const deleteButtons = document.querySelectorAll('.delete-btn');

    // Agrega un evento de clic a cada botón de borrar
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Mostrar cuadro de confirmación
            const confirmDelete = confirm("¿Quitar este curso del carrito?");
            
            // Si el usuario presiona "Aceptar", se elimina el producto
            if (confirmDelete) {
                const productItem = event.target.closest('.product-item');
                productItem.remove();
            }
        });
    });
});
