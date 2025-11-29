// script.js - Versión corregida y funcional

// Variables globales
let formularioActual = '';

// Función para seleccionar formulario desde el menú
function seleccionarFormulario(tipo) {
    console.log('Seleccionando formulario:', tipo); // Para debug
    
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

// Manejo de campos condicionales
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Configurando event listeners'); // Para debug
    
    // ========== FORMULARIO RESIDENCIAL ==========
    
    // Estado del medidor
    const resEstadoMedidorRadios = document.querySelectorAll('#formResidencial input[name="estado_medidor"]');
    if (resEstadoMedidorRadios.length > 0) {
        resEstadoMedidorRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const malEstadoField = document.getElementById('res-estado-medidor-mal');
                if (this.value === 'Mal estado') {
                    malEstadoField.classList.add('active');
                } else {
                    malEstadoField.classList.remove('active');
                }
            });
        });
    }
    
    // Fugas detectadas
    const resFugasRadios = document.querySelectorAll('#formResidencial input[name="fugas_detectadas"]');
    if (resFugasRadios.length > 0) {
        resFugasRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const fugaVisibleField = document.getElementById('res-fuga-visible');
                const recomendacionField = document.getElementById('res-recomendacion-fugas');
                
                // Ocultar ambos inicialmente
                fugaVisibleField.classList.remove('active');
                recomendacionField.classList.remove('active');
                
                // Mostrar según corresponda
                if (this.value === 'Fuga visible') {
                    fugaVisibleField.classList.add('active');
                } else if (this.value === 'Fuga no visible') {
                    recomendacionField.classList.add('active');
                }
            });
        });
    }
    
    // Abastecimiento (Otro)
    const resAbastecimientoSelect = document.getElementById('res-abastecimiento');
    if (resAbastecimientoSelect) {
        resAbastecimientoSelect.addEventListener('change', function() {
            const otroField = document.getElementById('res-abastecimiento-otro');
            if (this.value === 'Otro') {
                otroField.classList.add('active');
            } else {
                otroField.classList.remove('active');
            }
        });
    }
    
    // Caudal de ingreso
    const resCaudalRadios = document.querySelectorAll('#formResidencial input[name="caudal_ingreso"]');
    if (resCaudalRadios.length > 0) {
        resCaudalRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const detalleField = document.getElementById('res-caudal-detalle');
                if (this.value === 'Sí') {
                    detalleField.classList.add('active');
                } else {
                    detalleField.classList.remove('active');
                }
            });
        });
    }
    
    // ========== FORMULARIO COMERCIAL ==========
    
    // Estado del medidor
    const comEstadoMedidorRadios = document.querySelectorAll('#formComercial input[name="estado_medidor"]');
    if (comEstadoMedidorRadios.length > 0) {
        comEstadoMedidorRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const malEstadoField = document.getElementById('com-estado-medidor-mal');
                if (this.value === 'Mal estado') {
                    malEstadoField.classList.add('active');
                } else {
                    malEstadoField.classList.remove('active');
                }
            });
        });
    }
    
    // Fugas detectadas
    const comFugasRadios = document.querySelectorAll('#formComercial input[name="fugas_detectadas"]');
    if (comFugasRadios.length > 0) {
        comFugasRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const fugaVisibleField = document.getElementById('com-fuga-visible');
                const recomendacionField = document.getElementById('com-recomendacion-fugas');
                
                // Ocultar ambos inicialmente
                fugaVisibleField.classList.remove('active');
                recomendacionField.classList.remove('active');
                
                // Mostrar según corresponda
                if (this.value === 'Fuga visible') {
                    fugaVisibleField.classList.add('active');
                } else if (this.value === 'Fuga no visible') {
                    recomendacionField.classList.add('active');
                }
            });
        });
    }
    
    // Horarios específicos
    const comHorariosRadios = document.querySelectorAll('#formComercial input[name="horarios_especificos"]');
    if (comHorariosRadios.length > 0) {
        comHorariosRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const detalleField = document.getElementById('com-horario-detalle');
                if (this.value === 'Sí') {
                    detalleField.classList.add('active');
                } else {
                    detalleField.classList.remove('active');
                }
            });
        });
    }
    
    // Abastecimiento (Otro)
    const comAbastecimientoSelect = document.getElementById('com-abastecimiento');
    if (comAbastecimientoSelect) {
        comAbastecimientoSelect.addEventListener('change', function() {
            const otroField = document.getElementById('com-abastecimiento-otro');
            if (this.value === 'Otro') {
                otroField.classList.add('active');
            } else {
                otroField.classList.remove('active');
            }
        });
    }
    
    // Caudal de ingreso
    const comCaudalRadios = document.querySelectorAll('#formComercial input[name="caudal_ingreso"]');
    if (comCaudalRadios.length > 0) {
        comCaudalRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const detalleField = document.getElementById('com-caudal-detalle');
                if (this.value === 'Sí') {
                    detalleField.classList.add('active');
                } else {
                    detalleField.classList.remove('active');
                }
            });
        });
    }
    
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
    
    console.log('Event listeners configurados correctamente'); // Para debug
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
    resumen += `Contrato: ${formData.get('contrato')}\n`;
    resumen += `Servicio: ${formData.get('servicio')}\n`;
    resumen += `Estado del medidor: ${formData.get('estado_medidor')}\n`;
    if (formData.get('estado_medidor') === 'Mal estado' && formData.get('estado_medidor_desc')) {
        resumen += `Descripción del estado: ${formData.get('estado_medidor_desc')}\n`;
    }
    resumen += `Lectura (m³): ${formData.get('lectura_m3')}\n`;
    if (formData.get('lectura_litros')) {
        resumen += `Lectura (litros): ${formData.get('lectura_litros')}\n`;
    }
    resumen += `Descripción de la vivienda: ${formData.get('descripcion')}\n`;
    resumen += `Personas que habitan: ${formData.get('personas')}\n\n`;
    
    resumen += `INFORMACIÓN DE CONSUMO:\n`;
    resumen += `Tipo de abastecimiento: ${formData.get('abastecimiento')}`;
    if (formData.get('abastecimiento') === 'Otro' && formData.get('abastecimiento_otro')) {
        resumen += ` (${formData.get('abastecimiento_otro')})`;
    }
    resumen += `\nCambios en habitantes (6-12 meses): ${formData.get('cambios_habitantes')}\n\n`;
    
    resumen += `DETECCIÓN DE FUGAS:\n`;
    resumen += `Fugas detectadas: ${formData.get('fugas_detectadas')}\n`;
    if (formData.get('fugas_detectadas') === 'Fuga visible' && formData.get('ubicacion_fuga')) {
        resumen += `Ubicación de la fuga: ${formData.get('ubicacion_fuga')}\n`;
    }
    resumen += `Prueba de consumo realizada: ${formData.get('prueba_consumo')}\n`;
    resumen += `Registro de caudal de ingreso: ${formData.get('caudal_ingreso')}\n`;
    
    // Agregar detalle del caudal si aplica
    if (formData.get('caudal_ingreso') === 'Sí' && formData.get('caudal_cantidad')) {
        resumen += `Caudal registrado: ${formData.get('caudal_cantidad')} Litros/min\n`;
    }
    
    // Si hay fuga no visible, agregar recomendación
    if (formData.get('fugas_detectadas') === 'Fuga no visible') {
        resumen += `\nRECOMENDACIÓN: Se recomienda al usuario el servicio de detección y reparación de fugas`;
    }

    if (formData.get('observacion')) {
        resumen += `\nOBSERVACIÓN FINAL:\n${formData.get('observacion')}\n`;
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
    resumen += `Contrato: ${formData.get('contrato')}\n`;
    resumen += `Servicio: ${formData.get('servicio')}\n`;
    resumen += `Estado del medidor: ${formData.get('estado_medidor')}\n`;
    if (formData.get('estado_medidor') === 'Mal estado' && formData.get('estado_medidor_desc')) {
        resumen += `Descripción del estado: ${formData.get('estado_medidor_desc')}\n`;
    }
    resumen += `Lectura (m³): ${formData.get('lectura_m3')}\n`;
    if (formData.get('lectura_litros')) {
        resumen += `Lectura (litros): ${formData.get('lectura_litros')}\n`;
    }
    resumen += `Descripción del local/industria: ${formData.get('descripcion')}\n`;
    resumen += `Actividad: ${formData.get('actividad')}\n`;
    resumen += `Empleados/personas que trabajan: ${formData.get('empleados')}\n\n`;
    
    resumen += `INFORMACIÓN OPERATIVA:\n`;
    resumen += `Tipo de abastecimiento: ${formData.get('abastecimiento')}`;
    if (formData.get('abastecimiento') === 'Otro' && formData.get('abastecimiento_otro')) {
        resumen += ` (${formData.get('abastecimiento_otro')})`;
    }
    resumen += `\nHorarios específicos de operación: ${formData.get('horarios_especificos')}\n`;
    if (formData.get('horarios_especificos') === 'Sí' && formData.get('horario')) {
        resumen += `Horario indicado: ${formData.get('horario')}\n`;
    }
    resumen += `Tipo de consumo: ${formData.get('tipo_consumo')}\n\n`;
    
    resumen += `DETECCIÓN DE FUGAS:\n`;
    resumen += `Fugas detectadas: ${formData.get('fugas_detectadas')}\n`;
    if (formData.get('fugas_detectadas') === 'Fuga visible' && formData.get('ubicacion_fuga')) {
        resumen += `Ubicación de la fuga: ${formData.get('ubicacion_fuga')}\n`;
    }
    resumen += `Prueba de consumo realizada: ${formData.get('prueba_consumo')}\n`;
    resumen += `Registro de caudal de ingreso: ${formData.get('caudal_ingreso')}\n`;
    
    // Agregar detalle del caudal si aplica
    if (formData.get('caudal_ingreso') === 'Sí' && formData.get('caudal_cantidad')) {
        resumen += `Caudal registrado: ${formData.get('caudal_cantidad')} Litros/min\n`;
    }
    
    // Si hay fuga no visible, agregar recomendación
    if (formData.get('fugas_detectadas') === 'Fuga no visible') {
        resumen += `\nRECOMENDACIÓN: Se recomienda al usuario el servicio de detección y reparación de fugas`;
    }

    if (formData.get('observacion')) {
        resumen += `\nOBSERVACIÓN FINAL:\n${formData.get('observacion')}\n`;
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