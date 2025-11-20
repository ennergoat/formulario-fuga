// Manejo de campos condicionales
document.addEventListener('DOMContentLoaded', function() {
    // Magnitud predio - mostrar campo detalle si es comercial
    document.querySelectorAll('input[name="magnitud_predio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const detalleField = document.getElementById('comercial-detalle');
            if (this.value === 'Comercial') {
                detalleField.classList.add('active');
            } else {
                detalleField.classList.remove('active');
            }
        });
    });
    
    // Caudal ingreso - mostrar campo detalle si es Sí
    document.querySelectorAll('input[name="caudal_ingreso"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const detalleField = document.getElementById('caudal-detalle');
            if (this.value === 'Sí') {
                detalleField.classList.add('active');
            } else {
                detalleField.classList.remove('active');
            }
        });
    });
    
    // Existen fugas - mostrar mensajes informativos
    document.querySelectorAll('input[name="existen_fugas"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const recomendacionField = document.getElementById('recomendacion-fugas');
            const analisisField = document.getElementById('analisis-consumo');
            
            if (this.value === 'Sí') {
                recomendacionField.classList.add('active');
                analisisField.classList.remove('active');
            } else {
                recomendacionField.classList.remove('active');
                analisisField.classList.add('active');
            }
        });
    });
});

// Generar el resumen con el formato específico
function generarResumen() {
    // Validar formulario
    if (!document.getElementById('analisisForm').checkValidity()) {
        alert('Por favor, complete todos los campos requeridos');
        return;
    }
    
    // Obtener datos del formulario
    const formData = new FormData(document.getElementById('analisisForm'));
    
    // Construir el resumen con el formato específico
    let resumen = `ANÁLISIS DE DETECCIÓN DE FUGAS\n\n`;
    resumen += `Magnitud del predio: ${formData.get('magnitud_predio')}`;
    
    // Agregar detalle si es comercial
    if (formData.get('magnitud_predio') === 'Comercial' && formData.get('comercial_detalle')) {
        resumen += ` (${formData.get('comercial_detalle')})`;
    }
    
    resumen += `\nAbastecimiento: ${formData.get('abastecimiento')}`;
    resumen += `\nFugas visibles: ${formData.get('fugas_visibles')}`;
    resumen += `\nRegistro de caudal de ingreso: ${formData.get('caudal_ingreso')}`;
    
    // Agregar detalle del caudal si aplica
    if (formData.get('caudal_ingreso') === 'Sí' && formData.get('caudal_detalle')) {
        resumen += ` (${formData.get('caudal_detalle')})`;
    }
    
    resumen += `\nFugas en predio de bajos recursos: ${formData.get('fugas_bajos_recursos')}`;
    resumen += `\nExisten fugas: ${formData.get('existen_fugas')}`;
    
    // Agregar recomendación según respuesta
    if (formData.get('existen_fugas') === 'Sí') {
        resumen += `\n\nRECOMENDACIÓN: Se recomienda al usuario el servicio de detección y reparación de fugas`;
    } else {
        resumen += `\n\nANÁLISIS: Se procede con el análisis de perfil de consumo`;
    }
    
    // Mostrar el resumen
    document.getElementById('resumen-contenido').textContent = resumen;
    document.getElementById('resumen').classList.add('active');
    
    // Desplazarse al resumen
    document.getElementById('resumen').scrollIntoView({ behavior: 'smooth' });
}

// Volver al formulario
function volverAlFormulario() {
    document.getElementById('resumen').classList.remove('active');
    document.getElementById('analisisForm').reset();
    
    // Ocultar todos los campos condicionales
    document.querySelectorAll('.conditional-field').forEach(field => {
        field.classList.remove('active');
    });
    
    // Ocultar todos los mensajes informativos
    document.querySelectorAll('.info-message').forEach(field => {
        field.classList.remove('active');
    });
    
    // Desplazarse al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// FUNCIÓN: COPIAR RESUMEN AL PORTAPAPELES
function copiarResumen() {
    // Obtener el texto del resumen
    const textoResumen = document.getElementById('resumen-contenido').textContent;
    
    // Verificar que hay texto para copiar
    if (!textoResumen.trim()) {
        alert('No hay resumen para copiar. Genera el análisis primero.');
        return;
    }
    
    // Usar la API del portapapeles del navegador
    navigator.clipboard.writeText(textoResumen)
        .then(() => {
            // Éxito: mostrar feedback visual
            const botonCopiar = document.getElementById('copiar-resumen');
            const textoOriginal = botonCopiar.textContent;
            
            // Cambiar apariencia del botón temporalmente
            botonCopiar.textContent = '✅ ¡Copiado!';
            botonCopiar.classList.add('copiado');
            
            // Restaurar después de 2 segundos
            setTimeout(() => {
                botonCopiar.textContent = textoOriginal;
                botonCopiar.classList.remove('copiado');
            }, 2000);
        })
        .catch(err => {
            // Fallback para navegadores antiguos
            console.error('Error al copiar: ', err);
            
            // Método alternativo
            const areaTemporal = document.createElement('textarea');
            areaTemporal.value = textoResumen;
            document.body.appendChild(areaTemporal);
            areaTemporal.select();
            document.execCommand('copy');
            document.body.removeChild(areaTemporal);
            
            alert('Resumen copiado al portapapeles');
        });
}

// Agregar el event listener cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const botonCopiar = document.getElementById('copiar-resumen');
    if (botonCopiar) {
        botonCopiar.addEventListener('click', copiarResumen);
    }
});