document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar RUT chileno
        const rut = document.getElementById('rut').value;
        if (!validarRut(rut)) {
            alert('Por favor, ingrese un RUT válido');
            return;
        }
        
        // Si todo está válido, redirigir a la página de confirmación
        window.location.href = 'confirmacion.html';
    });

    // Manejo de los botones "Ver más"
    const botonesVerMas = document.querySelectorAll('.btn-ver-mas');
    
    botonesVerMas.forEach(boton => {
        boton.addEventListener('click', function() {
            const card = this.closest('.consejo-card, .enfermedad-card');
            const contenidoCompleto = card.querySelector('.contenido-completo');
            const contenidoResumen = card.querySelector('.contenido-resumen');
            
            // Toggle de la clase visible
            contenidoCompleto.classList.toggle('visible');
            
            // Cambiar el texto del botón
            if (contenidoCompleto.classList.contains('visible')) {
                this.textContent = 'Ver menos';
                this.classList.add('activo');
                contenidoResumen.style.display = 'none';
            } else {
                this.textContent = 'Ver más';
                this.classList.remove('activo');
                contenidoResumen.style.display = 'block';
            }
        });
    });
});

function validarRut(rut) {
    // Eliminar puntos y guión
    rut = rut.replace(/[.-]/g, '');
    
    // Obtener dígito verificador
    const dv = rut.slice(-1);
    const rutNumerico = parseInt(rut.slice(0, -1));
    
    let suma = 0;
    let multiplicador = 2;
    
    // Calcular dígito verificador
    let rutReversa = rutNumerico.toString().split('').reverse();
    for (let i = 0; i < rutReversa.length; i++) {
        suma += parseInt(rutReversa[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    
    return dvCalculado.toLowerCase() === dv.toLowerCase();
} 