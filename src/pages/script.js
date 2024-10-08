document.addEventListener('DOMContentLoaded', function() {
    console.log("Jala");

    // Cambiar entre el formulario de inicio de sesión y el de registro
    document.querySelector('.signup-link').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.login-form').style.display = 'none';
        document.querySelector('.signup-form').style.display = 'block';
    });

    document.querySelector('.login-link').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.signup-form').style.display = 'none';
        document.querySelector('.login-form').style.display = 'block';
    });

    // Redirigir según el valor del combobox
    document.getElementById("loginbtn").addEventListener("click", function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        var userType = document.getElementById('tipousu').value;

        // Define las páginas a las que redirigir según el tipo de usuario
        var redirectTo = '';
        switch(userType) {
            case 'estudiante':
                redirectTo = 'principal.html'; // Cambia a la página para estudiantes
                break;
            case 'instructor':
                redirectTo = 'principalinstructor.html'; // Cambia a la página para instructores
                break;
            case 'admin':
                redirectTo = 'principaladmin.html'; // Cambia a la página para administradores
                break;
            default:
                redirectTo = 'index.html'; // Página por defecto si no se selecciona un valor válido
        }

        window.location.href = redirectTo;
    });

    // Redirigir en el registro (puedes ajustar esto si necesitas redirigir a páginas diferentes para el registro)
    document.getElementById("signupbtn").addEventListener("click", function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Aquí puedes definir la redirección para el registro
        window.location.href = 'principal.html'; // Cambia esto según lo que necesites
    });
});





//CARRUSEL DE PAGINA PRINCIPAL NO JALA AYUDA
/*document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const courseList = document.querySelector('.course-list');
    const courseItems = document.querySelectorAll('.course-item');

    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100; // Ajusta este valor según el ancho de los elementos
        courseList.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < courseItems.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
});*/


//DROPDOWN PAGINA PRINCIPAL CATEGORIAS NO SIRVE
/*document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropdown.addEventListener('click', function() {
        const isVisible = dropdownContent.style.display === 'block';
        dropdownContent.style.display = isVisible ? 'none' : 'block';
    });

    // Cerrar el menú si se hace clic fuera de él
    window.addEventListener('click', function(event) {
        console.log("Clicked:",event.target)
        if (!dropdown.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });
});*/
