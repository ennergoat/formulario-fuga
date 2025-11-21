// Variables globales
let formularioActual = '';

// Función para seleccionar formulario desde el menú
function seleccionarFormulario(tipo) {
    // Ocultar todo
    document.getElementById('menu').classList.remove('active');
    document.getElementById('formulario-residencial').classList.remove('active');
    document.getElementById('formulario-comercial').classList.remove('active');
    document.getElementById('resumen-residencial').classList.remove('active');
    document.getElementById('resumen-comercial').classList.remove('active');
    
    // Mostrar el formulario seleccionado
    if (tipo === 'residencial') {
        document.getElementById('formulario-residencial').classList.add('active');
        formularioActual = 'residencial';
    } else if (tipo === 'comercial') {
        document.getElementById('formulario-comercial').classList.add('active');
        formularioActual = 'comercial';
    }
    
    // Desplazar al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para volver al menú
function volverAlMenu() {
    // Ocultar todo
    document.getElementById('formulario-residencial').classList.remove('active');
    document.getElementById('formulario-comercial').classList.remove('active');
    document.getElementById('resumen-residencial').classList.remove('active');
    document.getElementById('resumen-comercial').classList.remove('active');
    
    // Mostrar menú
    document.getElementById('menu').classList.add('active');
    
    formularioActual = '';
}

// Manejo de campos condicionales para formulario residencial
document.addEventListener('DOMContentLoaded', function() {
    // Formulario Residencial - Caudal de ingreso
    document.querySelectorAll('#formResidencial input[name="caudal_ingreso"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const detalleField = document.getElementById('res-caudal-detalle');
            const recomendacionField = document.getElementById('res-recomendacion-fugas');
            
            if (this.value === 'Sí') {
                detalleField.classList.add('active');
                recomendacionField.classList.add('active');
            } else {
                detalleField.classList.remove('active');
                recomendacionField.classList.remove('active');
            }
        });
    });
    
    // Formulario Comercial - Horarios específicos
    document.querySelectorAll('#formComercial input[name="horarios_especificos"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const detalleField = document.getElementById('com-horario-detalle');
            
            if (this.value === 'Sí') {
                detalleField.classList.add('active');
            } else {
                detalleField.classList.remove('active');
            }
        });
    });
    
    // Formulario Comercial - Caudal de ingreso
    document.querySelectorAll('#formComercial input[name="caudal_ingreso"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const detalleField = document.getElementById('com-caudal-detalle');
            const recomendacionField = document.getElementById('com-recomendacion-fugas');
            
            if (this.value === 'Sí') {
                detalleField.classList.add('active');
                recomendacionField.classList.add('active');
            } else {
                detalleField.classList.remove('active');
                recomendacionField.classList.remove('active');
            }
        });
    });





    // Formulario Residencial - Abastecimiento (Otro)
    document.getElementById('res-abastecimiento').addEventListener('change', function() {
        const otroField = document.getElementById('res-abastecimiento-otro');
        if (this.value === 'Otro') {
            otroField.classList.add('active');
        } else {
            otroField.classList.remove('active');
        }
    });

    // Formulario Comercial - Abastecimiento (Otro)
    document.getElementById('com-abastecimiento').addEventListener('change', function() {
        const otroField = document.getElementById('com-abastecimiento-otro');
        if (this.value === 'Otro') {
            otroField.classList.add('active');
        } else {
            otroField.classList.remove('active');
        }
    });




    // Formulario Residencial - Consumo aumentado
    document.querySelectorAll('#formResidencial input[name="consumo_aumentado"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const mesAumentoGroup = document.getElementById('res-mes-aumento-group');
            const mesAumentoSelect = document.getElementById('res-mes-aumento');
            
            if (this.value === 'Sí') {
                mesAumentoGroup.style.display = 'block';
                mesAumentoSelect.setAttribute('required', 'required');
            } else {
                mesAumentoGroup.style.display = 'none';
                mesAumentoSelect.removeAttribute('required');
            }
        });
    });
    
    // Configurar botones de copiar
    const botonCopiarResidencial = document.getElementById('copiar-resumen-residencial');
    if (botonCopiarResidencial) {
        botonCopiarResidencial.addEventListener('click', function() {
            copiarResumen('residencial');
        });
    }
    
    const botonCopiarComercial = document.getElementById('copiar-resumen-comercial');
    if (botonCopiarComercial) {
        botonCopiarComercial.addEventListener('click', function() {
            copiarResumen('comercial');
        });
    }
});

// Generar resumen para formulario residencial
function generarResumenResidencial() {
    // Validar formulario
    if (!document.getElementById('formResidencial').checkValidity()) {
        alert('Por favor, complete todos los campos requeridos del formulario residencial');
        return;
    }
    
    // Obtener datos del formulario
    const formData = new FormData(document.getElementById('formResidencial'));
    
    // Construir el resumen (residencial)
    let resumen = `ANÁLISIS DE CONSUMO RESIDENCIAL\n\n`;
    resumen += `DATOS BÁSICOS:\n`;
    resumen += `Número de medidor: ${formData.get('numero_medidor')}\n`;
    resumen += `Lectura: ${formData.get('lectura')}\n`;
    resumen += `Contrato: ${formData.get('contrato')}\n`;
    resumen += `Personas que habitan: ${formData.get('personas')}\n\n`;
    
    resumen += `INFORMACIÓN DE CONSUMO:\n`;
    // resumen += `Tipo de abastecimiento: ${formData.get('abastecimiento')}\n`;

    resumen += `Tipo de abastecimiento: ${formData.get('abastecimiento')}\n`;
    // Si es Otro, agregar el texto especificado
    if (formData.get('abastecimiento') === 'Otro' && formData.get('abastecimiento_otro')) {
        resumen += ` (${formData.get('abastecimiento_otro')})`;
    }


    resumen += `Cambios en habitantes (6-12 meses): ${formData.get('cambios_habitantes')}\n`;

    resumen += `Consumo aumentado: ${formData.get('consumo_aumentado')}\n`;
    if (formData.get('consumo_aumentado') === 'Sí') {
        resumen += `Mes de notificación de aumento: ${formData.get('mes_aumento')}\n`;
    }

    resumen += `Mes de notificación de aumento: ${formData.get('mes_aumento')}\n\n`;
    
    resumen += `DETECCIÓN DE FUGAS:\n`;
    resumen += `Fugas detectadas: ${formData.get('fugas_detectadas')}\n`;
    resumen += `Prueba de consumo realizada: ${formData.get('prueba_consumo')}\n`;
    resumen += `Registro de caudal de ingreso: ${formData.get('caudal_ingreso')}\n`;
    
    // Agregar detalle del caudal si aplica
    if (formData.get('caudal_ingreso') === 'Sí' && formData.get('caudal_cantidad')) {
        resumen += `Caudal registrado: ${formData.get('caudal_cantidad')} Litros/min\n`;
        resumen += `\nRECOMENDACIÓN: Se recomienda al usuario el servicio de detección y reparación de fugas`;
    }
    
    // Mostrar el resumen
    document.getElementById('resumen-contenido-residencial').textContent = resumen;
    document.getElementById('resumen-residencial').classList.add('active');
    
    // Desplazarse al resumen
    document.getElementById('resumen-residencial').scrollIntoView({ behavior: 'smooth' });
}

// Generar resumen para formulario comercial
function generarResumenComercial() {
    // Validar formulario
    if (!document.getElementById('formComercial').checkValidity()) {
        alert('Por favor, complete todos los campos requeridos del formulario comercial');
        return;
    }
    
    // Obtener datos del formulario
    const formData = new FormData(document.getElementById('formComercial'));
    
    // Construir el resumen (comercial-industrial)
    let resumen = `ANÁLISIS DE CONSUMO COMERCIAL-INDUSTRIAL\n\n`;
    resumen += `DATOS BÁSICOS:\n`;
    resumen += `Número de medidor: ${formData.get('numero_medidor')}\n`;
    resumen += `Lectura: ${formData.get('lectura')}\n`;
    resumen += `Contrato: ${formData.get('contrato')}\n`;
    resumen += `Actividad: ${formData.get('actividad')}\n\n`;
    
    resumen += `INFORMACIÓN OPERATIVA:\n`;
    // resumen += `Tipo de abastecimiento: ${formData.get('abastecimiento')}\n`;

    resumen += `Tipo de abastecimiento: ${formData.get('abastecimiento')}\n`;
    // Si es Otro, agregar el texto especificado
    if (formData.get('abastecimiento') === 'Otro' && formData.get('abastecimiento_otro')) {
        resumen += ` (${formData.get('abastecimiento_otro')})`;
    }


    resumen += `Empleados/personas que trabajan: ${formData.get('empleados')}\n`;
    resumen += `Horarios específicos de operación: ${formData.get('horarios_especificos')}\n`;
    
    // Agregar detalle de horario si aplica
    if (formData.get('horarios_especificos') === 'Sí' && formData.get('horario')) {
        resumen += `Horario indicado: ${formData.get('horario')}\n`;
    }
    
    resumen += `Tipo de consumo: ${formData.get('tipo_consumo')}\n\n`;
    
    resumen += `DETECCIÓN DE FUGAS:\n`;
    resumen += `Fugas detectadas: ${formData.get('fugas_detectadas')}\n`;
    resumen += `Prueba de consumo realizada: ${formData.get('prueba_consumo')}\n`;
    resumen += `Registro de caudal de ingreso: ${formData.get('caudal_ingreso')}\n`;
    
    // Agregar detalle del caudal si aplica
    if (formData.get('caudal_ingreso') === 'Sí' && formData.get('caudal_cantidad')) {
        resumen += `Caudal registrado: ${formData.get('caudal_cantidad')} Litros/min\n`;
        resumen += `\nRECOMENDACIÓN: Se recomienda al usuario el servicio de detección y reparación de fugas`;
    }
    
    // Mostrar el resumen
    document.getElementById('resumen-contenido-comercial').textContent = resumen;
    document.getElementById('resumen-comercial').classList.add('active');
    
    // Desplazarse al resumen
    document.getElementById('resumen-comercial').scrollIntoView({ behavior: 'smooth' });
}

// Volver al formulario residencial
function volverAlFormularioResidencial() {
    document.getElementById('resumen-residencial').classList.remove('active');
    document.getElementById('formResidencial').reset();

    // Ocultar el campo de abastecimiento otro
    document.getElementById('res-abastecimiento-otro').classList.remove('active');
    
    // Ocultar todos los campos condicionales
    document.querySelectorAll('#formResidencial .conditional-field').forEach(field => {
        field.classList.remove('active');
    });
    
    // Ocultar todos los mensajes informativos
    document.querySelectorAll('#formResidencial .info-message').forEach(field => {
        field.classList.remove('active');
    });
    
    // Desplazarse al inicio del formulario
    document.getElementById('formulario-residencial').scrollIntoView({ behavior: 'smooth' });
}

// Volver al formulario comercial
function volverAlFormularioComercial() {
    document.getElementById('resumen-comercial').classList.remove('active');
    document.getElementById('formComercial').reset();

    // Ocultar el campo de abastecimiento otro
    document.getElementById('com-abastecimiento-otro').classList.remove('active');
    
    // Ocultar todos los campos condicionales
    document.querySelectorAll('#formComercial .conditional-field').forEach(field => {
        field.classList.remove('active');
    });
    
    // Ocultar todos los mensajes informativos
    document.querySelectorAll('#formComercial .info-message').forEach(field => {
        field.classList.remove('active');
    });
    
    // Desplazarse al inicio del formulario
    document.getElementById('formulario-comercial').scrollIntoView({ behavior: 'smooth' });
}

// FUNCIÓN: COPIAR RESUMEN AL PORTAPAPELES
function copiarResumen(tipo) {
    let textoResumen = '';
    let botonCopiar = null;
    
    if (tipo === 'residencial') {
        textoResumen = document.getElementById('resumen-contenido-residencial').textContent;
        botonCopiar = document.getElementById('copiar-resumen-residencial');
    } else if (tipo === 'comercial') {
        textoResumen = document.getElementById('resumen-contenido-comercial').textContent;
        botonCopiar = document.getElementById('copiar-resumen-comercial');
    }
    
    // Verificar que hay texto para copiar
    if (!textoResumen.trim()) {
        alert('No hay resumen para copiar. Genera el análisis primero.');
        return;
    }
    
    // Usar la API del portapapeles del navegador
    navigator.clipboard.writeText(textoResumen)
        .then(() => {
            // Éxito: mostrar feedback visual
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

