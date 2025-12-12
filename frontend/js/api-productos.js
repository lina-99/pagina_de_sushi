// productos.js - Manejo de operaciones READ y CREATE con la API

// Configuración de la API
const API_BASE_URL = 'http://localhost:3000/api';

// Elementos del DOM
const productosContainer = document.getElementById('productos-container');
const loadingContainer = document.getElementById('loading-container');
const errorContainer = document.getElementById('error-container');
const errorMessage = document.getElementById('error-message');

// Modal elements
const btnCreateProduct = document.getElementById('btn-create-product');
const modalCreateProduct = document.getElementById('modal-create-product');
const closeModal = document.getElementById('close-modal');
const btnCancel = document.getElementById('btn-cancel');
const formCreateProduct = document.getElementById('form-create-product');
const formMessage = document.getElementById('form-message');

// ============================================
// FUNCIONES PARA OPERACIÓN READ
// ============================================

/**
 * Función para cargar todos los productos desde la API
 */
async function cargarProductos() {
    try {
        // Mostrar loading
        loadingContainer.classList.remove('d-none');
        productosContainer.innerHTML = '';
        errorContainer.classList.add('d-none');

        // Hacer petición GET a la API
        const response = await fetch(`${API_BASE_URL}/productos`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const resultado = await response.json();
        
        // Ocultar loading
        loadingContainer.classList.add('d-none');

        if (resultado.success && resultado.data && resultado.data.length > 0) {
            renderizarProductos(resultado.data);
        } else {
            mostrarMensajeVacio();
        }

    } catch (error) {
        console.error('Error al cargar productos:', error);
        loadingContainer.classList.add('d-none');
        mostrarError('No se pudieron cargar los productos. Verifica que el servidor esté corriendo en http://localhost:3000');
    }
}

/**
 * Renderiza los productos en el DOM
 * @param {Array} productos - Array de productos a renderizar
 */
function renderizarProductos(productos) {
    productosContainer.innerHTML = '';
    
    productos.forEach(producto => {
        const productoHTML = crearTarjetaProducto(producto);
        productosContainer.innerHTML += productoHTML;
    });
}

/**
 * Crea el HTML de una tarjeta de producto
 * @param {Object} producto - Objeto del producto
 * @returns {String} HTML de la tarjeta
 */
function crearTarjetaProducto(producto) {
    const precio = formatearPrecio(producto.precio);
    const fecha = producto.fecha_creacion ? new Date(producto.fecha_creacion).toLocaleDateString('es-CO') : 'N/A';
    
    // Imagen placeholder basada en la categoría
    const imagenPorCategoria = {
        'Rolls': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
        'Nigiri': 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400',
        'Sashimi': 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400',
        'Bowls': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        'Entradas': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
        'Bebidas': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
        'default': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400'
    };
    
    const imagen = imagenPorCategoria[producto.categoria] || imagenPorCategoria['default'];
    
    return `
        <div class="col">
            <div class="card h-100 shadow-sm hover-card" style="transition: transform 0.3s;">
                <img src="${imagen}" 
                     class="card-img-top" 
                     alt="${producto.nombre}"
                     style="height: 200px; object-fit: cover;"
                     onerror="this.src='https://via.placeholder.com/400x200?text=Sushi'">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title fw-bold mb-0">${producto.nombre}</h5>
                        <span class="badge bg-primary">${producto.categoria}</span>
                    </div>
                    
                    <p class="card-text text-muted flex-grow-1">
                        ${producto.descripcion || 'Sin descripción disponible'}
                    </p>
                    
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="h4 text-success mb-0">${precio}</span>
                            <small class="text-muted">Stock: ${producto.stock || 0}</small>
                        </div>
                        
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-primary btn-sm flex-grow-1">
                                <i class="fas fa-shopping-cart"></i> Agregar
                            </button>
                            <button class="btn btn-outline-secondary btn-sm" title="Ver detalles">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                        
                        <small class="text-muted d-block mt-2">
                            <i class="far fa-calendar"></i> Creado: ${fecha}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Formatea el precio a pesos colombianos
 * @param {Number} precio 
 * @returns {String}
 */
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(precio);
}

/**
 * Muestra mensaje cuando no hay productos
 */
function mostrarMensajeVacio() {
    productosContainer.innerHTML = `
        <div class="col-12 text-center py-5">
            <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
            <h4 class="text-muted">No hay productos disponibles</h4>
            <p class="text-muted">Agrega tu primer producto usando el botón flotante</p>
        </div>
    `;
}

/**
 * Muestra un mensaje de error
 * @param {String} mensaje 
 */
function mostrarError(mensaje) {
    errorMessage.textContent = mensaje;
    errorContainer.classList.remove('d-none');
}

// ============================================
// FUNCIONES PARA OPERACIÓN CREATE
// ============================================

/**
 * Abre el modal para crear producto
 */
function abrirModal() {
    modalCreateProduct.classList.add('active');
    formCreateProduct.reset();
    formMessage.classList.add('d-none');
}

/**
 * Cierra el modal
 */
function cerrarModal() {
    modalCreateProduct.classList.remove('active');
}

/**
 * Maneja el envío del formulario para crear producto
 * @param {Event} e 
 */
async function crearProducto(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(formCreateProduct);
    const nuevoProducto = {
        nombre: formData.get('nombre').trim(),
        descripcion: formData.get('descripcion').trim(),
        precio: parseFloat(formData.get('precio')),
        categoria: formData.get('categoria'),
        stock: parseInt(formData.get('stock')) || 0
    };

    // Validaciones básicas
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.categoria) {
        mostrarMensajeFormulario('Por favor completa todos los campos requeridos', 'danger');
        return;
    }

    if (nuevoProducto.precio <= 0) {
        mostrarMensajeFormulario('El precio debe ser mayor a 0', 'danger');
        return;
    }

    try {
        // Deshabilitar botón mientras se procesa
        const btnSubmit = document.getElementById('btn-submit');
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Creando...';

        // Hacer petición POST a la API
        const response = await fetch(`${API_BASE_URL}/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        });

        const resultado = await response.json();

        if (response.ok && resultado.success) {
            // Éxito
            mostrarMensajeFormulario('¡Producto creado exitosamente!', 'success');
            
            // Recargar productos después de 1 segundo
            setTimeout(() => {
                cerrarModal();
                cargarProductos();
            }, 1000);
        } else {
            // Error de validación del servidor
            mostrarMensajeFormulario(resultado.message || 'Error al crear el producto', 'danger');
        }

    } catch (error) {
        console.error('Error al crear producto:', error);
        mostrarMensajeFormulario('Error de conexión. Verifica que el servidor esté corriendo.', 'danger');
    } finally {
        // Rehabilitar botón
        const btnSubmit = document.getElementById('btn-submit');
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<i class="fas fa-save me-2"></i>Crear Producto';
    }
}

/**
 * Muestra un mensaje en el formulario
 * @param {String} mensaje 
 * @param {String} tipo - 'success' o 'danger'
 */
function mostrarMensajeFormulario(mensaje, tipo) {
    formMessage.textContent = mensaje;
    formMessage.className = `alert alert-${tipo}`;
    formMessage.classList.remove('d-none');
}

// ============================================
// EVENT LISTENERS
// ============================================

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', cargarProductos);

// Abrir modal
btnCreateProduct.addEventListener('click', abrirModal);

// Cerrar modal
closeModal.addEventListener('click', cerrarModal);
btnCancel.addEventListener('click', cerrarModal);

// Cerrar modal al hacer clic fuera
modalCreateProduct.addEventListener('click', (e) => {
    if (e.target === modalCreateProduct) {
        cerrarModal();
    }
});

// Enviar formulario
formCreateProduct.addEventListener('submit', crearProducto);

// Agregar efecto hover a las cards
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.hover-card')) {
        e.target.closest('.hover-card').style.transform = 'translateY(-5px)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.hover-card')) {
        e.target.closest('.hover-card').style.transform = 'translateY(0)';
    }
});