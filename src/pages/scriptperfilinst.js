//MENSAJE BORRAR
document.getElementById("deleteButton").addEventListener("click", function() {
    // Muestra un mensaje de confirmación
    var confirmacion = confirm("¿Está seguro que quiere eliminar este tema? Los datos de este tema se eliminaran por siempre (Eso es mucho, mucho tiempo)");
    
    // Si el usuario hace clic en "Aceptar"
    if (confirmacion) {
      // Aquí va la acción si se confirma
      alert("El tema se ha eliminado exitosamente.");
    } else {
      // Aquí va la acción si se cancela
      alert("Acción cancelada.");
    }
  });

  //MENSAJE BORRAR SUBTEMA
document.getElementById("deletesubButton").addEventListener("click", function() {
    // Muestra un mensaje de confirmación
    var confirmacion = confirm("¿Está seguro que quiere eliminar este subtema? Los datos de este subtema se eliminaran por siempre (Eso es mucho, mucho tiempo)");
    
    // Si el usuario hace clic en "Aceptar"
    if (confirmacion) {
      // Aquí va la acción si se confirma
      alert("El subtema se ha elliminado exitosamente.");
    } else {
      // Aquí va la acción si se cancela
      alert("Acción cancelada.");
    }
  });

  
  // Función para abrir una ventana y cerrar las demás
function openWindow(windowId) {
    var windows = document.querySelectorAll('.window');
    
    // Ocultar todas las ventanas
    windows.forEach(function (window) {
      window.classList.remove('active');
    });
  
    // Mostrar la ventana seleccionada
    var selectedWindow = document.getElementById(windowId);
    selectedWindow.classList.add('active');
  }
  
  //DROPDOWN DE LOS CURSOS
  document.querySelectorAll('.image-dropdown-toggle').forEach(item => {
    item.addEventListener('click', function() {
      // Ocultar otros dropdowns que estén abiertos
      document.querySelectorAll('.gallery').forEach(gallery => {
        gallery.classList.remove('show-dropdown');
      });
  
      // Mostrar el dropdown de la imagen seleccionada
      const parentGallery = this.parentElement;
      parentGallery.classList.toggle('show-dropdown');
    });
  });

  //VENTANAS NO VISTAS EN EL SIDEBAR
  function openWindow(windowId) {
    // Cerrar todas las ventanas primero
    const allWindows = document.querySelectorAll('.window');
    allWindows.forEach(window => {
      window.classList.remove('active');
    });
  
    // Mostrar la ventana que fue seleccionada
    const selectedWindow = document.getElementById(windowId);
    if (selectedWindow) {
      selectedWindow.classList.add('active');
    }
  }
  
  //COMBOBOX
 // Función para cambiar el contenido del combobox
 document.addEventListener('DOMContentLoaded', function() {
    const customSelect = document.querySelector('.custom-select');
    const options = document.querySelectorAll('.option');
    const selectedValueInput = document.getElementById('selectedValue');
    const selectedOption = document.querySelector('.selected-option');
  
    customSelect.addEventListener('click', function() {
      customSelect.classList.toggle('active');
    });
  
    options.forEach(option => {
      option.addEventListener('click', function() {
        selectedOption.textContent = this.textContent;
        selectedValueInput.value = this.getAttribute('data-value');
        customSelect.classList.remove('active');
      });
    });
  
    document.addEventListener('click', function(e) {
      if (!customSelect.contains(e.target)) {
        customSelect.classList.remove('active');
      }
    });
  });
  
//COMBOBOX
  // Función para cambiar el contenido del combobox
  document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los elementos .custom-select y sus inputs asociados
    const customSelects = document.querySelectorAll('.custom-select');
  
    customSelects.forEach(customSelect => {
      const selectedOption = customSelect.querySelector('.selected-option');
      const options = customSelect.querySelectorAll('.option');
      const selectedValueInput = customSelect.parentElement.querySelector('input[type="hidden"]');
  
      // Alterna la visibilidad del menú de opciones
      customSelect.addEventListener('click', function() {
        customSelect.classList.toggle('active');
      });
  
      // Actualiza el valor seleccionado y cierra el menú
      options.forEach(option => {
        option.addEventListener('click', function() {
          selectedOption.textContent = this.textContent;
          selectedValueInput.value = this.getAttribute('data-value');
          customSelect.classList.remove('active');
        });
      });
    });
  
    // Cierra el menú si haces clic fuera de él
    document.addEventListener('click', function(e) {
      customSelects.forEach(customSelect => {
        if (!customSelect.contains(e.target)) {
          customSelect.classList.remove('active');
        }
      });
    });
  });
  
  //INFO PERFIL
  document.addEventListener('DOMContentLoaded', function() {
    // Función para abrir ventanas
    function openWindow(windowId) {
        const windows = document.querySelectorAll('.window');
        windows.forEach(win => {
            win.classList.remove('active');
            // Oculta el formulario en window2 si estamos cambiando de ventana
            if (windowId !== 'window2') {
                const formContainer = win.querySelector('.form-container');
                if (formContainer) {
                    formContainer.style.display = 'none';
                }
            }
        });
        
        const selectedWindow = document.getElementById(windowId);
        if (selectedWindow) {
            selectedWindow.classList.add('active');
            // Muestra el formulario si estamos en window2
            if (windowId === 'window2') {
                const formContainer = selectedWindow.querySelector('.form-container');
                if (formContainer) {
                    formContainer.style.display = 'block';
                }
            }
        }
    }

    // Maneja los clics en los enlaces de la barra lateral
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const windowId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            openWindow(windowId);
        });
    });

    // Maneja la visibilidad del menú de opciones en el combobox
    const customSelects = document.querySelectorAll('.custom-select');
    customSelects.forEach(customSelect => {
        const selectedOption = customSelect.querySelector('.selected-option');
        const options = customSelect.querySelectorAll('.option');
        const selectedValueInput = customSelect.parentElement.querySelector('input[type="hidden"]');

        customSelect.addEventListener('click', function() {
            customSelect.classList.toggle('active');
        });

        options.forEach(option => {
            option.addEventListener('click', function() {
                selectedOption.textContent = this.textContent;
                selectedValueInput.value = this.getAttribute('data-value');
                customSelect.classList.remove('active');
            });
        });
    });

    // Cierra el menú si haces clic fuera de él
    document.addEventListener('click', function(e) {
        customSelects.forEach(customSelect => {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
  // Referencias a los elementos
  const openFileDialogButton = document.getElementById('openFileDialog');
  const fileInput = document.getElementById('fileInput');
  const profilePicture = document.getElementById('profilePicture');

  // Maneja el clic en el botón para abrir el diálogo de archivos
  openFileDialogButton.addEventListener('click', function(e) {
      e.preventDefault(); // Previene el comportamiento predeterminado del botón
      fileInput.click(); // Dispara el input file
  });

  // Maneja el cambio de archivo en el input file
  fileInput.addEventListener('change', function() {
      const file = fileInput.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              profilePicture.src = e.target.result; // Cambia la imagen del perfil
          };
          reader.readAsDataURL(file);
      }
  });
});

//CARRUSEL
let currentIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-item');
  if (index >= slides.length) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = slides.length - 1;
  } else {
    currentIndex = index;
  }
  const offset = -currentIndex * 100;
  document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

showSlide(currentIndex);

//REPORTAR
// Función para alternar el dropdown
function toggleDropdown() {
  var dropdown = document.getElementById("dropdownreportar");
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}

// Cerrar el dropdown si se hace clic fuera de él
window.onclick = function(event) {
  if (!event.target.matches('.tres-puntos')) {
    var dropdowns = document.getElementsByClassName("dropdown-content-reportar");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    }
  }
}
