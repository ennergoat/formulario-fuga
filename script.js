// // script.js - Versión actualizada con nuevos cambios

// // Variables globales
// let formularioActual = '';

// // Función para seleccionar formulario desde el menú
// function seleccionarFormulario(tipo) {
//     console.log('Seleccionando formulario:', tipo);
    
//     // Ocultar todo
//     document.getElementById('menu').classList.remove('active');
//     document.getElementById('formulario-residencial').classList.remove('active');
//     document.getElementById('formulario-comercial').classList.remove('active');
//     document.getElementById('resumen-residencial').classList.remove('active');
//     document.getElementById('resumen-comercial').classList.remove('active');
    
//     // Mostrar el formulario seleccionado
//     if (tipo === 'residencial') {
//         document.getElementById('formulario-residencial').classList.add('active');
//         formularioActual = 'residencial';
//     } else if (tipo === 'comercial') {
//         document.getElementById('formulario-comercial').classList.add('active');
//         formularioActual = 'comercial';
//     }
    
//     // Desplazar al inicio
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// }

// // Función para volver al menú
// function volverAlMenu() {
//     // Ocultar todo
//     document.getElementById('formulario-residencial').classList.remove('active');
//     document.getElementById('formulario-comercial').classList.remove('active');
//     document.getElementById('resumen-residencial').classList.remove('active');
//     document.getElementById('resumen-comercial').classList.remove('active');
    
//     // Mostrar menú
//     document.getElementById('menu').classList.add('active');
    
//     formularioActual = '';
// }

// // Función para manejar la habilitación/deshabilitación de campos
// function actualizarCamposFugas(formulario) {
//     const esResidencial = formulario === 'residencial';
//     const prefix = esResidencial ? 'res' : 'com';
    
//     const pruebaConsumo = document.querySelector(`#form${formulario.charAt(0).toUpperCase() + formulario.slice(1)} input[name="prueba_consumo"]:checked`);
//     const pruebaRazon = document.querySelector(`#form${formulario.charAt(0).toUpperCase() + formulario.slice(1)} input[name="prueba_razon"]:checked`);
//     const fugasGroup = document.getElementById(`${prefix}-fugas-group`);
//     const personaGroup = document.getElementById(`${prefix}-persona-atendio-group`);
//     const personaInput = document.getElementById(`${prefix}-persona-atendio`);
    
//     if (pruebaConsumo && pruebaConsumo.value === 'No' && pruebaRazon) {
//         if (pruebaRazon.value === 'usuario ausente') {
//             // Deshabilitar grupos
//             fugasGroup.style.opacity = '0.5';
//             fugasGroup.style.pointerEvents = 'none';
//             personaGroup.style.opacity = '0.5';
//             personaGroup.style.pointerEvents = 'none';
            
//             // Desmarcar radios de fugas
//             document.querySelectorAll(`#${prefix}-fugas-group input[type="radio"]`).forEach(radio => {
//                 radio.checked = false;
//                 radio.required = false;
//             });
            
//             // Ocultar campos condicionales de fugas
//             document.getElementById(`${prefix}-no-se-detecto`).classList.remove('active');
//             document.getElementById(`${prefix}-fuga-visible-detalle`).classList.remove('active');
//             document.getElementById(`${prefix}-recomendacion-fugas`).classList.remove('active');
            
//             // Limpiar inputs
//             personaInput.value = '';
//             personaInput.required = false;
//         } else {
//             // Habilitar grupos
//             fugasGroup.style.opacity = '1';
//             fugasGroup.style.pointerEvents = 'auto';
//             personaGroup.style.opacity = '1';
//             personaGroup.style.pointerEvents = 'auto';
            
//             // Marcar como requeridos
//             document.querySelectorAll(`#${prefix}-fugas-group input[type="radio"]`).forEach(radio => {
//                 radio.required = true;
//             });
//             personaInput.required = true;
            
//             // Para "usuario no permite el ingreso" o "otra": ocultar campos de puntos de agua
//             if (pruebaRazon.value === 'usuario no permite el ingreso' || pruebaRazon.value === 'otra') {
//                 // Ocultar campos de puntos de agua si ya están visibles
//                 document.getElementById(`${prefix}-no-se-detecto`).classList.remove('active');
//                 document.getElementById(`${prefix}-fuga-visible-detalle`).classList.remove('active');
//             }
//         }
//     } else if (pruebaConsumo && pruebaConsumo.value === 'Sí') {
//         // Habilitar todo completamente
//         fugasGroup.style.opacity = '1';
//         fugasGroup.style.pointerEvents = 'auto';
//         personaGroup.style.opacity = '1';
//         personaGroup.style.pointerEvents = 'auto';
        
//         document.querySelectorAll(`#${prefix}-fugas-group input[type="radio"]`).forEach(radio => {
//             radio.required = true;
//         });
//         personaInput.required = true;
//     }
// }

// // Configurar todos los event listeners cuando el DOM esté cargado
// document.addEventListener('DOMContentLoaded', function() {
//     console.log('DOM cargado - Configurando event listeners');
    
//     // ========== FORMULARIO RESIDENCIAL ==========
//     configurarFormulario('res');
    
//     // ========== FORMULARIO COMERCIAL ==========
//     configurarFormulario('com');
    
//     // Configurar botones de copiar
//     const botonCopiarResidencial = document.getElementById('copiar-resumen-residencial');
//     if (botonCopiarResidencial) {
//         botonCopiarResidencial.addEventListener('click', function() {
//             copiarResumen('residencial');
//         });
//     }
    
//     const botonCopiarComercial = document.getElementById('copiar-resumen-comercial');
//     if (botonCopiarComercial) {
//         botonCopiarComercial.addEventListener('click', function() {
//             copiarResumen('comercial');
//         });
//     }
    
//     console.log('Event listeners configurados correctamente');
// });

// // Función para configurar un formulario (residencial o comercial)
// function configurarFormulario(prefix) {
//     const formId = prefix === 'res' ? 'formResidencial' : 'formComercial';
    

//     // Estado del medidor (nuevas opciones)
//     const estadoMedidorRadios = document.querySelectorAll(`#${formId} input[name="estado_medidor"]`);
//     estadoMedidorRadios.forEach(radio => {
//         radio.addEventListener('change', function() {
//             const otroField = document.getElementById(`${prefix}-estado-medidor-otro-field`);
//             const cadenaCustodioField = document.getElementById(`${prefix}-cadena-custodio`);
            
//             // Ocultar todos primero
//             otroField.classList.remove('active');
//             cadenaCustodioField.classList.remove('active');
            
//             // Mostrar según corresponda
//             if (this.value === 'Otro') {
//                 otroField.classList.add('active');
//                 cadenaCustodioField.classList.add('active');
//             } else if (this.value !== 'Buen estado') {
//                 // Para Mal estado, Visor Derio, Paralizado: mostrar cadena de custodio
//                 cadenaCustodioField.classList.add('active');
//             }
//             // Buen estado: no mostrar nada
//         });
//     });





    
//     // Abastecimiento (Otro)
//     const abastecimientoSelect = document.getElementById(`${prefix}-abastecimiento`);
//     if (abastecimientoSelect) {
//         abastecimientoSelect.addEventListener('change', function() {
//             const otroField = document.getElementById(`${prefix}-abastecimiento-otro`);
//             if (this.value === 'Otro') {
//                 otroField.classList.add('active');
//             } else {
//                 otroField.classList.remove('active');
//             }
//         });
//     }
    
//     // Caudal de ingreso (ahora va primero)
//     const caudalRadios = document.querySelectorAll(`#${formId} input[name="caudal_ingreso"]`);
//     caudalRadios.forEach(radio => {
//         radio.addEventListener('change', function() {
//             const detalleField = document.getElementById(`${prefix}-caudal-detalle`);
//             if (this.value === 'Sí') {
//                 detalleField.classList.add('active');
//             } else {
//                 detalleField.classList.remove('active');
//             }
//         });
//     });
    
//     // Prueba de consumo
//     const pruebaConsumoRadios = document.querySelectorAll(`#${formId} input[name="prueba_consumo"]`);
//     pruebaConsumoRadios.forEach(radio => {
//         radio.addEventListener('change', function() {
//             const detalleField = document.getElementById(`${prefix}-prueba-no-detalle`);
//             const formulario = prefix === 'res' ? 'residencial' : 'comercial';
            
//             if (this.value === 'No') {
//                 detalleField.classList.add('active');
//                 // Actualizar campos de fugas
//                 setTimeout(() => actualizarCamposFugas(formulario), 10);
//             } else {
//                 detalleField.classList.remove('active');
//                 // Ocultar subcampos de razón
//                 document.getElementById(`${prefix}-usuario-no-permite`).classList.remove('active');
//                 document.getElementById(`${prefix}-otra-razon`).classList.remove('active');
//                 // Actualizar campos de fugas
//                 setTimeout(() => actualizarCamposFugas(formulario), 10);
//             }
//         });
//     });
    
//     // Razón de no prueba de consumo
//     const pruebaRazonRadios = document.querySelectorAll(`#${formId} input[name="prueba_razon"]`);
//     pruebaRazonRadios.forEach(radio => {
//         radio.addEventListener('change', function() {
//             const usuarioNoPermite = document.getElementById(`${prefix}-usuario-no-permite`);
//             const otraRazon = document.getElementById(`${prefix}-otra-razon`);
//             const formulario = prefix === 'res' ? 'residencial' : 'comercial';
            
//             // Ocultar todos primero
//             usuarioNoPermite.classList.remove('active');
//             otraRazon.classList.remove('active');
            
//             // Mostrar el correspondiente
//             if (this.value === 'usuario no permite el ingreso') {
//                 usuarioNoPermite.classList.add('active');
//             } else if (this.value === 'otra') {
//                 otraRazon.classList.add('active');
//             }
            
//             // Actualizar campos de fugas
//             actualizarCamposFugas(formulario);
//         });
//     });
    
//     // Fugas detectadas (nuevas opciones)
//     const fugasRadios = document.querySelectorAll(`#${formId} input[name="fugas_detectadas"]`);
//     fugasRadios.forEach(radio => {
//         radio.addEventListener('change', function() {
//             const noSeDetectoField = document.getElementById(`${prefix}-no-se-detecto`);
//             const fugaVisibleField = document.getElementById(`${prefix}-fuga-visible-detalle`);
//             const recomendacionField = document.getElementById(`${prefix}-recomendacion-fugas`);
//             const formulario = prefix === 'res' ? 'residencial' : 'comercial';
            
//             // Ocultar todos primero
//             noSeDetectoField.classList.remove('active');
//             fugaVisibleField.classList.remove('active');
//             recomendacionField.classList.remove('active');
            
//             // Verificar si debemos mostrar campos de puntos de agua
//             const pruebaConsumo = document.querySelector(`#${formId} input[name="prueba_consumo"]:checked`);
//             const pruebaRazon = document.querySelector(`#${formId} input[name="prueba_razon"]:checked`);
            
//             const esUsuarioAusente = pruebaConsumo && pruebaConsumo.value === 'No' && 
//                                     pruebaRazon && pruebaRazon.value === 'usuario ausente';
//             const esUsuarioNoPermite = pruebaConsumo && pruebaConsumo.value === 'No' && 
//                                       pruebaRazon && pruebaRazon.value === 'usuario no permite el ingreso';
//             const esOtraRazon = pruebaConsumo && pruebaConsumo.value === 'No' && 
//                                pruebaRazon && pruebaRazon.value === 'otra';
            
//             // Mostrar según corresponda
//             if (this.value === 'No se detecto') {
//                 if (!esUsuarioAusente && !esUsuarioNoPermite && !esOtraRazon) {
//                     noSeDetectoField.classList.add('active');
//                 }
//             } else if (this.value === 'Se detectó fuga visible') {
//                 if (!esUsuarioAusente && !esUsuarioNoPermite && !esOtraRazon) {
//                     fugaVisibleField.classList.add('active');
//                 }
//             } else if (this.value === 'Se detectó fuga no visible') {
//                 recomendacionField.classList.add('active');
//             }
//         });
//     });
// }

// // Generar resumen para formulario residencial (actualizado)
// function generarResumenResidencial() {
//     // Validar formulario
//     if (!document.getElementById('formResidencial').checkValidity()) {
//         alert('Por favor, complete todos los campos requeridos del formulario residencial');
//         return;
//     }
    
//     // Obtener datos del formulario
//     const formData = new FormData(document.getElementById('formResidencial'));
    
//     // Construir el resumen (residencial)
//     let resumen = `ANÁLISIS DE CONSUMO RESIDENCIAL\n\n`;
//     resumen += `DATOS BÁSICOS:\n`;
//     resumen += `Contrato: ${formData.get('contrato')}\n`;
//     resumen += `Servicio: ${formData.get('servicio')}\n`;
//     // resumen += `Estado del medidor: ${formData.get('estado_medidor')}\n`;
//     // if (formData.get('estado_medidor') === 'Mal estado' && formData.get('estado_medidor_desc')) {
//     //     resumen += `Descripción del estado: ${formData.get('estado_medidor_desc')}\n`;
//     // }

//     resumen += `Estado del medidor: ${formData.get('estado_medidor')}\n`;
//     if (formData.get('estado_medidor') === 'Otro' && formData.get('estado_medidor_otro')) {
//         resumen += `Especificación: ${formData.get('estado_medidor_otro')}\n`;
//     }
//     if (formData.get('estado_medidor') !== 'Buen estado' && formData.get('numero_modificacion')) {
//         resumen += `Se realiza cadena de custodio, número de sello, se modifica número ${formData.get('numero_modificacion')} por revisión de medida, se instala medidor\n`;
//     }


//     resumen += `Lectura (m³): ${formData.get('lectura_m3')}\n`;
//     if (formData.get('lectura_litros')) {
//         resumen += `Lectura (litros): ${formData.get('lectura_litros')}\n`;
//     }
//     resumen += `Descripción de la vivienda: ${formData.get('descripcion')}\n`;
//     resumen += `Personas que habitan: ${formData.get('personas')}\n\n`;
    
//     resumen += `INFORMACIÓN DE CONSUMO:\n`;
//     resumen += `Tipo de abastecimiento: ${formData.get('abastecimiento')}`;
//     if (formData.get('abastecimiento') === 'Otro' && formData.get('abastecimiento_otro')) {
//         resumen += ` (${formData.get('abastecimiento_otro')})`;
//     }
//     resumen += `\nCambios en habitantes (6-12 meses): ${formData.get('cambios_habitantes')}\n\n`;
    
//     resumen += `DETECCIÓN DE FUGAS:\n`;
//     resumen += `Registro de caudal de ingreso: ${formData.get('caudal_ingreso')}\n`;
//     if (formData.get('caudal_ingreso') === 'Sí' && formData.get('caudal_cantidad')) {
//         resumen += `Caudal registrado: ${formData.get('caudal_cantidad')} Litros/min\n`;
//     }
    
//     resumen += `Usuario permite realizar prueba de consumo: ${formData.get('prueba_consumo')}\n`;
//     if (formData.get('prueba_consumo') === 'No') {
//         resumen += `Razón: ${formData.get('prueba_razon')}\n`;
//         if (formData.get('prueba_razon') === 'usuario no permite el ingreso' && formData.get('motivo_no_permite')) {
//             resumen += `Motivo: ${formData.get('motivo_no_permite')}\n`;
//         } else if (formData.get('prueba_razon') === 'otra' && formData.get('otra_razon')) {
//             resumen += `Especificación: ${formData.get('otra_razon')}\n`;
//         }
//     }
    
//     // Solo mostrar información de fugas si no es "usuario ausente"
//     if (!(formData.get('prueba_consumo') === 'No' && formData.get('prueba_razon') === 'usuario ausente')) {
//         resumen += `Problemas de fugas detectados: ${formData.get('fugas_detectadas')}\n`;
        
//         if (formData.get('fugas_detectadas') === 'No se detecto' && 
//             formData.get('puntos_agua_no') && 
//             !(formData.get('prueba_consumo') === 'No' && 
//               (formData.get('prueba_razon') === 'usuario no permite el ingreso' || 
//                formData.get('prueba_razon') === 'otra'))) {
//             resumen += `Se revisaron ${formData.get('puntos_agua_no')} puntos de agua y se identificó que no existe fuga\n`;
//         }
        
//         if (formData.get('fugas_detectadas') === 'Se detectó fuga visible' && 
//             formData.get('puntos_agua_si') && formData.get('ubicacion_fuga_detalle') &&
//             !(formData.get('prueba_consumo') === 'No' && 
//               (formData.get('prueba_razon') === 'usuario no permite el ingreso' || 
//                formData.get('prueba_razon') === 'otra'))) {
//             resumen += `Se revisaron ${formData.get('puntos_agua_si')} puntos de agua y se identificó que existe fuga en: ${formData.get('ubicacion_fuga_detalle')}\n`;
//         }
        
//         if (formData.get('fugas_detectadas') === 'Se detectó fuga no visible') {
//             resumen += `RECOMENDACIÓN: Se recomienda al usuario el servicio de detección y reparación de fugas\n`;
//         }
        
//         resumen += `Nombre de la persona que atendió: ${formData.get('persona_atendio')}\n`;
//     }
    
//     if (formData.get('observacion')) {
//         resumen += `\nOBSERVACIÓN FINAL:\n${formData.get('observacion')}\n`;
//     }
    
//     resumen += `\nSe realiza mantenimiento liviano al medidor\n`;
    
//     // Mostrar el resumen
//     document.getElementById('resumen-contenido-residencial').textContent = resumen;
//     document.getElementById('resumen-residencial').classList.add('active');
    
//     // Desplazarse al resumen
//     document.getElementById('resumen-residencial').scrollIntoView({ behavior: 'smooth' });
// }

// // Generar resumen para formulario comercial (actualizado)
// function generarResumenComercial() {
//     // Validar formulario
//     if (!document.getElementById('formComercial').checkValidity()) {
//         alert('Por favor, complete todos los campos requeridos del formulario comercial');
//         return;
//     }
    
//     // Obtener datos del formulario
//     const formData = new FormData(document.getElementById('formComercial'));
    
//     // Construir el resumen (comercial-industrial)
//     let resumen = `ANÁLISIS DE CONSUMO COMERCIAL-INDUSTRIAL\n\n`;
//     resumen += `DATOS BÁSICOS:\n`;
//     resumen += `Contrato: ${formData.get('contrato')}\n`;
//     resumen += `Servicio: ${formData.get('servicio')}\n`;

//     resumen += `Estado del medidor: ${formData.get('estado_medidor')}\n`;
//     if (formData.get('estado_medidor') === 'Otro' && formData.get('estado_medidor_otro')) {
//         resumen += `Especificación: ${formData.get('estado_medidor_otro')}\n`;
//     }
//     if (formData.get('estado_medidor') !== 'Buen estado' && formData.get('numero_modificacion')) {
//         resumen += `Se realiza cadena de custodio, número de sello, se modifica número ${formData.get('numero_modificacion')} por revisión de medida, se instala medidor\n`;
//     }

//     resumen += `Lectura (m³): ${formData.get('lectura_m3')}\n`;
//     if (formData.get('lectura_litros')) {
//         resumen += `Lectura (litros): ${formData.get('lectura_litros')}\n`;
//     }
//     resumen += `Descripción del local/industria: ${formData.get('descripcion')}\n`;
//     resumen += `Actividad: ${formData.get('actividad')}\n`;
//     resumen += `Empleados/personas que trabajan: ${formData.get('empleados')}\n\n`;
    
//     resumen += `INFORMACIÓN OPERATIVA:\n`;
//     resumen += `Tipo de abastecimiento: ${formData.get('abastecimiento')}`;
//     if (formData.get('abastecimiento') === 'Otro' && formData.get('abastecimiento_otro')) {
//         resumen += ` (${formData.get('abastecimiento_otro')})`;
//     }
//     resumen += `\nHorarios específicos de operación: ${formData.get('horarios_especificos')}\n`;
//     if (formData.get('horarios_especificos') === 'Sí' && formData.get('horario')) {
//         resumen += `Horario indicado: ${formData.get('horario')}\n`;
//     }
//     resumen += `Tipo de consumo: ${formData.get('tipo_consumo')}\n\n`;
    
//     resumen += `DETECCIÓN DE FUGAS:\n`;
//     resumen += `Registro de caudal de ingreso: ${formData.get('caudal_ingreso')}\n`;
//     if (formData.get('caudal_ingreso') === 'Sí' && formData.get('caudal_cantidad')) {
//         resumen += `Caudal registrado: ${formData.get('caudal_cantidad')} Litros/min\n`;
//     }
    
//     resumen += `Usuario permite realizar prueba de consumo: ${formData.get('prueba_consumo')}\n`;
//     if (formData.get('prueba_consumo') === 'No') {
//         resumen += `Razón: ${formData.get('prueba_razon')}\n`;
//         if (formData.get('prueba_razon') === 'usuario no permite el ingreso' && formData.get('motivo_no_permite')) {
//             resumen += `Motivo: ${formData.get('motivo_no_permite')}\n`;
//         } else if (formData.get('prueba_razon') === 'otra' && formData.get('otra_razon')) {
//             resumen += `Especificación: ${formData.get('otra_razon')}\n`;
//         }
//     }
    
//     // Solo mostrar información de fugas si no es "usuario ausente"
//     if (!(formData.get('prueba_consumo') === 'No' && formData.get('prueba_razon') === 'usuario ausente')) {
//         resumen += `Problemas de fugas detectados: ${formData.get('fugas_detectadas')}\n`;
        
//         if (formData.get('fugas_detectadas') === 'No se detecto' && 
//             formData.get('puntos_agua_no') && 
//             !(formData.get('prueba_consumo') === 'No' && 
//               (formData.get('prueba_razon') === 'usuario no permite el ingreso' || 
//                formData.get('prueba_razon') === 'otra'))) {
//             resumen += `Se revisaron ${formData.get('puntos_agua_no')} puntos de agua y se identificó que no existe fuga\n`;
//         }
        
//         if (formData.get('fugas_detectadas') === 'Se detectó fuga visible' && 
//             formData.get('puntos_agua_si') && formData.get('ubicacion_fuga_detalle') &&
//             !(formData.get('prueba_consumo') === 'No' && 
//               (formData.get('prueba_razon') === 'usuario no permite el ingreso' || 
//                formData.get('prueba_razon') === 'otra'))) {
//             resumen += `Se revisaron ${formData.get('puntos_agua_si')} puntos de agua y se identificó que existe fuga en: ${formData.get('ubicacion_fuga_detalle')}\n`;
//         }
        
//         if (formData.get('fugas_detectadas') === 'Se detectó fuga no visible') {
//             resumen += `RECOMENDACIÓN: Se recomienda al usuario el servicio de detección y reparación de fugas\n`;
//         }
        
//         resumen += `Nombre de la persona que atendió: ${formData.get('persona_atendio')}\n`;
//     }
    
//     if (formData.get('observacion')) {
//         resumen += `\nOBSERVACIÓN FINAL:\n${formData.get('observacion')}\n`;
//     }
    
//     resumen += `\nSe realiza mantenimiento liviano al medidor\n`;
    
//     // Mostrar el resumen
//     document.getElementById('resumen-contenido-comercial').textContent = resumen;
//     document.getElementById('resumen-comercial').classList.add('active');
    
//     // Desplazarse al resumen
//     document.getElementById('resumen-comercial').scrollIntoView({ behavior: 'smooth' });
// }

// // Volver al formulario residencial
// function volverAlFormularioResidencial() {
//     document.getElementById('resumen-residencial').classList.remove('active');
//     document.getElementById('formResidencial').reset();
    
//     // Restablecer estilos
//     document.getElementById('res-fugas-group').style.opacity = '1';
//     document.getElementById('res-fugas-group').style.pointerEvents = 'auto';
//     document.getElementById('res-persona-atendio-group').style.opacity = '1';
//     document.getElementById('res-persona-atendio-group').style.pointerEvents = 'auto';
    
//     // Restablecer required
//     document.getElementById('res-persona-atendio').required = true;
//     document.querySelectorAll('#res-fugas-group input[type="radio"]').forEach(radio => {
//         radio.required = true;
//     });
    
//     // Ocultar todos los campos condicionales
//     document.querySelectorAll('#formResidencial .conditional-field, #formResidencial .info-message').forEach(field => {
//         field.classList.remove('active');
//     });
    
//     // Desplazarse al inicio del formulario
//     document.getElementById('formulario-residencial').scrollIntoView({ behavior: 'smooth' });
// }

// // Volver al formulario comercial
// function volverAlFormularioComercial() {
//     document.getElementById('resumen-comercial').classList.remove('active');
//     document.getElementById('formComercial').reset();
    
//     // Restablecer estilos
//     document.getElementById('com-fugas-group').style.opacity = '1';
//     document.getElementById('com-fugas-group').style.pointerEvents = 'auto';
//     document.getElementById('com-persona-atendio-group').style.opacity = '1';
//     document.getElementById('com-persona-atendio-group').style.pointerEvents = 'auto';
    
//     // Restablecer required
//     document.getElementById('com-persona-atendio').required = true;
//     document.querySelectorAll('#com-fugas-group input[type="radio"]').forEach(radio => {
//         radio.required = true;
//     });
    
//     // Ocultar todos los campos condicionales
//     document.querySelectorAll('#formComercial .conditional-field, #formComercial .info-message').forEach(field => {
//         field.classList.remove('active');
//     });
    
//     // Desplazarse al inicio del formulario
//     document.getElementById('formulario-comercial').scrollIntoView({ behavior: 'smooth' });
// }

// // FUNCIÓN: COPIAR RESUMEN AL PORTAPAPELES
// function copiarResumen(tipo) {
//     let textoResumen = '';
//     let botonCopiar = null;
    
//     if (tipo === 'residencial') {
//         textoResumen = document.getElementById('resumen-contenido-residencial').textContent;
//         botonCopiar = document.getElementById('copiar-resumen-residencial');
//     } else if (tipo === 'comercial') {
//         textoResumen = document.getElementById('resumen-contenido-comercial').textContent;
//         botonCopiar = document.getElementById('copiar-resumen-comercial');
//     }
    
//     // Verificar que hay texto para copiar
//     if (!textoResumen.trim()) {
//         alert('No hay resumen para copiar. Genera el análisis primero.');
//         return;
//     }
    
//     // Usar la API del portapapeles del navegador
//     navigator.clipboard.writeText(textoResumen)
//         .then(() => {
//             // Éxito: mostrar feedback visual
//             const textoOriginal = botonCopiar.textContent;
            
//             // Cambiar apariencia del botón temporalmente
//             botonCopiar.textContent = '✅ ¡Copiado!';
//             botonCopiar.classList.add('copiado');
            
//             // Restaurar después de 2 segundos
//             setTimeout(() => {
//                 botonCopiar.textContent = textoOriginal;
//                 botonCopiar.classList.remove('copiado');
//             }, 2000);
//         })
//         .catch(err => {
//             console.error('Error al copiar: ', err);
            
//             // Método alternativo
//             const areaTemporal = document.createElement('textarea');
//             areaTemporal.value = textoResumen;
//             document.body.appendChild(areaTemporal);
//             areaTemporal.select();
//             document.execCommand('copy');
//             document.body.removeChild(areaTemporal);
            
//             alert('Resumen copiado al portapapeles');
//         });
// }



// =============================================
// FUNCIONES DE NAVEGACIÓN
// =============================================

// Variables globales
let formularioActual = '';

// Función para seleccionar formulario desde el menú
function seleccionarFormulario(tipo) {
    console.log('Seleccionando formulario:', tipo);
    
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

// =============================================
// FUNCIONES DE MANEJO DE FORMULARIOS
// =============================================

function actualizarCamposFugas(formulario) {
    const esResidencial = formulario === 'residencial';
    const prefix = esResidencial ? 'res' : 'com';
    
    const pruebaConsumo = document.querySelector(`#form${formulario.charAt(0).toUpperCase() + formulario.slice(1)} input[name="prueba_consumo"]:checked`);
    const pruebaRazon = document.querySelector(`#form${formulario.charAt(0).toUpperCase() + formulario.slice(1)} input[name="prueba_razon"]:checked`);
    const fugasGroup = document.getElementById(`${prefix}-fugas-group`);
    const personaGroup = document.getElementById(`${prefix}-persona-atendio-group`);
    const personaInput = document.getElementById(`${prefix}-persona-atendio`);
    
    if (pruebaConsumo && pruebaConsumo.value === 'No' && pruebaRazon) {
        if (pruebaRazon.value === 'usuario ausente') {
            // Deshabilitar grupos
            fugasGroup.style.opacity = '0.5';
            fugasGroup.style.pointerEvents = 'none';
            personaGroup.style.opacity = '0.5';
            personaGroup.style.pointerEvents = 'none';
            
            // Desmarcar radios de fugas
            document.querySelectorAll(`#${prefix}-fugas-group input[type="radio"]`).forEach(radio => {
                radio.checked = false;
                radio.required = false;
            });
            
            // Ocultar campos condicionales de fugas
            document.getElementById(`${prefix}-no-se-detecto`).classList.remove('active');
            document.getElementById(`${prefix}-fuga-visible-detalle`).classList.remove('active');
            document.getElementById(`${prefix}-recomendacion-fugas`).classList.remove('active');
            
            // Limpiar inputs
            personaInput.value = '';
            personaInput.required = false;
        } else {
            // Habilitar grupos
            fugasGroup.style.opacity = '1';
            fugasGroup.style.pointerEvents = 'auto';
            personaGroup.style.opacity = '1';
            personaGroup.style.pointerEvents = 'auto';
            
            // Marcar como requeridos
            document.querySelectorAll(`#${prefix}-fugas-group input[type="radio"]`).forEach(radio => {
                radio.required = true;
            });
            personaInput.required = true;
            
            // Para "usuario no permite el ingreso" o "otra": ocultar campos de puntos de agua
            if (pruebaRazon.value === 'usuario no permite el ingreso' || pruebaRazon.value === 'otra') {
                // Ocultar campos de puntos de agua si ya están visibles
                document.getElementById(`${prefix}-no-se-detecto`).classList.remove('active');
                document.getElementById(`${prefix}-fuga-visible-detalle`).classList.remove('active');
            }
        }
    } else if (pruebaConsumo && pruebaConsumo.value === 'Sí') {
        // Habilitar todo completamente
        fugasGroup.style.opacity = '1';
        fugasGroup.style.pointerEvents = 'auto';
        personaGroup.style.opacity = '1';
        personaGroup.style.pointerEvents = 'auto';
        
        document.querySelectorAll(`#${prefix}-fugas-group input[type="radio"]`).forEach(radio => {
            radio.required = true;
        });
        personaInput.required = true;
    }
}

// Función para configurar un formulario
function configurarFormulario(prefix) {
    const formId = prefix === 'res' ? 'formResidencial' : 'formComercial';
    
    // Estado del medidor
    const estadoMedidorRadios = document.querySelectorAll(`#${formId} input[name="estado_medidor"]`);
    estadoMedidorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const otroField = document.getElementById(`${prefix}-estado-medidor-otro-field`);
            const cadenaCustodioField = document.getElementById(`${prefix}-cadena-custodio`);
            
            // Ocultar todos primero
            otroField.classList.remove('active');
            cadenaCustodioField.classList.remove('active');
            
            // Mostrar según corresponda
            if (this.value === 'Otro') {
                otroField.classList.add('active');
                cadenaCustodioField.classList.add('active');
            } else if (this.value !== 'Buen estado') {
                // Para Mal estado, Visor Derio, Paralizado: mostrar cadena de custodio
                cadenaCustodioField.classList.add('active');
            }
        });
    });
    
    // Abastecimiento (Otro)
    const abastecimientoSelect = document.getElementById(`${prefix}-abastecimiento`);
    if (abastecimientoSelect) {
        abastecimientoSelect.addEventListener('change', function() {
            const otroField = document.getElementById(`${prefix}-abastecimiento-otro`);
            if (this.value === 'Otro') {
                otroField.classList.add('active');
            } else {
                otroField.classList.remove('active');
            }
        });
    }
    
    // Caudal de ingreso
    const caudalRadios = document.querySelectorAll(`#${formId} input[name="caudal_ingreso"]`);
    caudalRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const detalleField = document.getElementById(`${prefix}-caudal-detalle`);
            if (this.value === 'Sí') {
                detalleField.classList.add('active');
            } else {
                detalleField.classList.remove('active');
            }
        });
    });
    
    // Prueba de consumo
    const pruebaConsumoRadios = document.querySelectorAll(`#${formId} input[name="prueba_consumo"]`);
    pruebaConsumoRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const detalleField = document.getElementById(`${prefix}-prueba-no-detalle`);
            const formulario = prefix === 'res' ? 'residencial' : 'comercial';
            
            if (this.value === 'No') {
                detalleField.classList.add('active');
                setTimeout(() => actualizarCamposFugas(formulario), 10);
            } else {
                detalleField.classList.remove('active');
                document.getElementById(`${prefix}-usuario-no-permite`).classList.remove('active');
                document.getElementById(`${prefix}-otra-razon`).classList.remove('active');
                setTimeout(() => actualizarCamposFugas(formulario), 10);
            }
        });
    });
    
    // Razón de no prueba de consumo
    const pruebaRazonRadios = document.querySelectorAll(`#${formId} input[name="prueba_razon"]`);
    pruebaRazonRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const usuarioNoPermite = document.getElementById(`${prefix}-usuario-no-permite`);
            const otraRazon = document.getElementById(`${prefix}-otra-razon`);
            const formulario = prefix === 'res' ? 'residencial' : 'comercial';
            
            usuarioNoPermite.classList.remove('active');
            otraRazon.classList.remove('active');
            
            if (this.value === 'usuario no permite el ingreso') {
                usuarioNoPermite.classList.add('active');
            } else if (this.value === 'otra') {
                otraRazon.classList.add('active');
            }
            
            actualizarCamposFugas(formulario);
        });
    });
    
    // Fugas detectadas
    const fugasRadios = document.querySelectorAll(`#${formId} input[name="fugas_detectadas"]`);
    fugasRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const noSeDetectoField = document.getElementById(`${prefix}-no-se-detecto`);
            const fugaVisibleField = document.getElementById(`${prefix}-fuga-visible-detalle`);
            const recomendacionField = document.getElementById(`${prefix}-recomendacion-fugas`);
            const formulario = prefix === 'res' ? 'residencial' : 'comercial';
            
            noSeDetectoField.classList.remove('active');
            fugaVisibleField.classList.remove('active');
            recomendacionField.classList.remove('active');
            
            const pruebaConsumo = document.querySelector(`#${formId} input[name="prueba_consumo"]:checked`);
            const pruebaRazon = document.querySelector(`#${formId} input[name="prueba_razon"]:checked`);
            
            const esUsuarioAusente = pruebaConsumo && pruebaConsumo.value === 'No' && 
                                    pruebaRazon && pruebaRazon.value === 'usuario ausente';
            const esUsuarioNoPermite = pruebaConsumo && pruebaConsumo.value === 'No' && 
                                      pruebaRazon && pruebaRazon.value === 'usuario no permite el ingreso';
            const esOtraRazon = pruebaConsumo && pruebaConsumo.value === 'No' && 
                               pruebaRazon && pruebaRazon.value === 'otra';
            
            if (this.value === 'No se detecto') {
                if (!esUsuarioAusente && !esUsuarioNoPermite && !esOtraRazon) {
                    noSeDetectoField.classList.add('active');
                }
            } else if (this.value === 'Se detectó fuga visible') {
                if (!esUsuarioAusente && !esUsuarioNoPermite && !esOtraRazon) {
                    fugaVisibleField.classList.add('active');
                }
            } else if (this.value === 'Se detectó fuga no visible') {
                recomendacionField.classList.add('active');
            }
        });
    });
}

// =============================================
// CONFIGURACIÓN INICIAL AL CARGAR LA PÁGINA
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Configurando event listeners');
    
    // Configurar formularios
    configurarFormulario('res');
    configurarFormulario('com');
    
    // Configurar botones de copiar
    document.getElementById('copiar-resumen-residencial')?.addEventListener('click', function() {
        copiarResumen('residencial');
    });
    
    document.getElementById('copiar-resumen-comercial')?.addEventListener('click', function() {
        copiarResumen('comercial');
    });
    
    // Agregar estilos para botones de guardar
    agregarEstilosGuardar();
    
    console.log('Event listeners configurados correctamente');
});

// =============================================
// FUNCIONES DE RESUMEN Y GUARDADO
// =============================================

// REEMPLAZA ESTA URL CON LA DE TU SCRIPT DESPLEGADO
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/TU_ID_AQUI/exec';

// Función para guardar datos en Google Sheets
async function guardarEnGoogleSheets(tipo) {
    try {
        // Obtener datos del formulario
        const formId = tipo === 'residencial' ? 'formResidencial' : 'formComercial';
        const formData = new FormData(document.getElementById(formId));
        
        // Convertir FormData a objeto
        const datos = {};
        formData.forEach((value, key) => {
            datos[key] = value;
        });
        
        // Agregar tipo de formulario
        datos.tipo = tipo;
        
        // Agregar timestamp
        datos.timestamp = new Date().toISOString();
        
        // Mostrar loading
        const botonGuardar = document.getElementById(`btn-guardar-${tipo}`);
        const textoOriginal = botonGuardar ? botonGuardar.textContent : 'Guardar';
        if (botonGuardar) {
            botonGuardar.textContent = '⏳ Guardando...';
            botonGuardar.disabled = true;
            botonGuardar.style.backgroundColor = '#f39c12';
        }
        
        // Mostrar mensaje de estado
        mostrarMensajeEstado('⏳ Guardando datos en Google Sheets...', 'info');
        
        // Enviar datos a Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Importante para evitar problemas de CORS
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });
        
        // Dado que usamos 'no-cors', no podemos leer la respuesta directamente
        // Pero podemos asumir éxito si no hay error de red
        
        // Mostrar mensaje de éxito
        mostrarMensajeEstado('✅ Datos guardados exitosamente en Google Sheets', 'success');
        
        // Restaurar botón
        if (botonGuardar) {
            botonGuardar.textContent = textoOriginal;
            botonGuardar.disabled = false;
            botonGuardar.style.backgroundColor = '';
            
            // Cambiar a verde por 2 segundos
            botonGuardar.style.backgroundColor = '#27ae60';
            setTimeout(() => {
                botonGuardar.style.backgroundColor = '';
            }, 2000);
        }
        
        return true;
        
    } catch (error) {
        console.error('Error al guardar en Google Sheets:', error);
        mostrarMensajeEstado('❌ Error al guardar. Intenta copiar el resumen manualmente.', 'error');
        
        // Restaurar botón
        const botonGuardar = document.getElementById(`btn-guardar-${tipo}`);
        if (botonGuardar) {
            botonGuardar.textContent = '💾 Guardar en Google Sheets';
            botonGuardar.disabled = false;
            botonGuardar.style.backgroundColor = '';
        }
        
        return false;
    }
}

// Función para mostrar mensajes de estado
function mostrarMensajeEstado(mensaje, tipo) {
    // Crear o actualizar el contenedor de mensajes
    let contenedorMensaje = document.getElementById('mensaje-estado');
    
    if (!contenedorMensaje) {
        contenedorMensaje = document.createElement('div');
        contenedorMensaje.id = 'mensaje-estado';
        contenedorMensaje.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(contenedorMensaje);
    }
    
    // Configurar según tipo
    switch(tipo) {
        case 'success':
            contenedorMensaje.style.backgroundColor = '#27ae60';
            break;
        case 'error':
            contenedorMensaje.style.backgroundColor = '#e74c3c';
            break;
        case 'info':
            contenedorMensaje.style.backgroundColor = '#3498db';
            break;
        default:
            contenedorMensaje.style.backgroundColor = '#2c3e50';
    }
    
    contenedorMensaje.textContent = mensaje;
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        contenedorMensaje.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            contenedorMensaje.remove();
        }, 300);
    }, 5000);
}

// =============================================
// FUNCIONES ORIGINALES DE RESUMEN
// =============================================

function generarResumenResidencial() {
    if (!document.getElementById('formResidencial').checkValidity()) {
        alert('Por favor, complete todos los campos requeridos del formulario residencial');
        return;
    }
    
    const formData = new FormData(document.getElementById('formResidencial'));
    
    let resumen = `ANÁLISIS DE CONSUMO RESIDENCIAL\n\n`;
    resumen += `DATOS BÁSICOS:\n`;
    resumen += `Contrato: ${formData.get('contrato')}\n`;
    resumen += `Servicio: ${formData.get('servicio')}\n`;
    resumen += `Estado del medidor: ${formData.get('estado_medidor')}\n`;
    if (formData.get('estado_medidor') === 'Otro' && formData.get('estado_medidor_otro')) {
        resumen += `Especificación: ${formData.get('estado_medidor_otro')}\n`;
    }
    if (formData.get('estado_medidor') !== 'Buen estado' && formData.get('numero_modificacion')) {
        resumen += `Se realiza cadena de custodio, número de sello, se modifica número ${formData.get('numero_modificacion')} por revisión de medida, se instala medidor\n`;
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
    resumen += `Registro de caudal de ingreso: ${formData.get('caudal_ingreso')}\n`;
    if (formData.get('caudal_ingreso') === 'Sí' && formData.get('caudal_cantidad')) {
        resumen += `Caudal registrado: ${formData.get('caudal_cantidad')} Litros/min\n`;
    }
    
    resumen += `Usuario permite realizar prueba de consumo: ${formData.get('prueba_consumo')}\n`;
    if (formData.get('prueba_consumo') === 'No') {
        resumen += `Razón: ${formData.get('prueba_razon')}\n`;
        if (formData.get('prueba_razon') === 'usuario no permite el ingreso' && formData.get('motivo_no_permite')) {
            resumen += `Motivo: ${formData.get('motivo_no_permite')}\n`;
        } else if (formData.get('prueba_razon') === 'otra' && formData.get('otra_razon')) {
            resumen += `Especificación: ${formData.get('otra_razon')}\n`;
        }
    }
    
    if (!(formData.get('prueba_consumo') === 'No' && formData.get('prueba_razon') === 'usuario ausente')) {
        resumen += `Problemas de fugas detectados: ${formData.get('fugas_detectadas')}\n`;
        
        if (formData.get('fugas_detectadas') === 'No se detecto' && 
            formData.get('puntos_agua_no') && 
            !(formData.get('prueba_consumo') === 'No' && 
              (formData.get('prueba_razon') === 'usuario no permite el ingreso' || 
               formData.get('prueba_razon') === 'otra'))) {
            resumen += `Se revisaron ${formData.get('puntos_agua_no')} puntos de agua y se identificó que no existe fuga\n`;
        }
        
        if (formData.get('fugas_detectadas') === 'Se detectó fuga visible' && 
            formData.get('puntos_agua_si') && formData.get('ubicacion_fuga_detalle') &&
            !(formData.get('prueba_consumo') === 'No' && 
              (formData.get('prueba_razon') === 'usuario no permite el ingreso' || 
               formData.get('prueba_razon') === 'otra'))) {
            resumen += `Se revisaron ${formData.get('puntos_agua_si')} puntos de agua y se identificó que existe fuga en: ${formData.get('ubicacion_fuga_detalle')}\n`;
        }
        
        if (formData.get('fugas_detectadas') === 'Se detectó fuga no visible') {
            resumen += `RECOMENDACIÓN: Se recomienda al usuario el servicio de detección y reparación de fugas\n`;
        }
        
        resumen += `Nombre de la persona que atendió: ${formData.get('persona_atendio')}\n`;
    }
    
    if (formData.get('observacion')) {
        resumen += `\nOBSERVACIÓN FINAL:\n${formData.get('observacion')}\n`;
    }
    
    resumen += `\nSe realiza mantenimiento liviano al medidor\n`;
    
    // Mostrar el resumen
    document.getElementById('resumen-contenido-residencial').textContent = resumen;
    document.getElementById('resumen-residencial').classList.add('active');
    
    // Agregar botón de guardar si no existe
    if (!document.getElementById('btn-guardar-residencial')) {
        const resumenDiv = document.getElementById('resumen-residencial');
        const botonCopiar = document.getElementById('copiar-resumen-residencial');
        
        const botonGuardar = document.createElement('button');
        botonGuardar.type = 'button';
        botonGuardar.id = 'btn-guardar-residencial';
        botonGuardar.className = 'btn-guardar';
        botonGuardar.innerHTML = '💾 Guardar en Google Sheets';
        botonGuardar.onclick = () => guardarEnGoogleSheets('residencial');
        
        botonCopiar.parentNode.insertBefore(botonGuardar, botonCopiar.nextSibling);
    }
    
    document.getElementById('resumen-residencial').scrollIntoView({ behavior: 'smooth' });
}

function generarResumenComercial() {
    if (!document.getElementById('formComercial').checkValidity()) {
        alert('Por favor, complete todos los campos requeridos del formulario comercial');
        return;
    }
    
    const formData = new FormData(document.getElementById('formComercial'));
    
    let resumen = `ANÁLISIS DE CONSUMO COMERCIAL-INDUSTRIAL\n\n`;
    resumen += `DATOS BÁSICOS:\n`;
    resumen += `Contrato: ${formData.get('contrato')}\n`;
    resumen += `Servicio: ${formData.get('servicio')}\n`;
    resumen += `Estado del medidor: ${formData.get('estado_medidor')}\n`;
    if (formData.get('estado_medidor') === 'Otro' && formData.get('estado_medidor_otro')) {
        resumen += `Especificación: ${formData.get('estado_medidor_otro')}\n`;
    }
    if (formData.get('estado_medidor') !== 'Buen estado' && formData.get('numero_modificacion')) {
        resumen += `Se realiza cadena de custodio, número de sello, se modifica número ${formData.get('numero_modificacion')} por revisión de medida, se instala medidor\n`;
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
    resumen += `Registro de caudal de ingreso: ${formData.get('caudal_ingreso')}\n`;
    if (formData.get('caudal_ingreso') === 'Sí' && formData.get('caudal_cantidad')) {
        resumen += `Caudal registrado: ${formData.get('caudal_cantidad')} Litros/min\n`;
    }
    
    resumen += `Usuario permite realizar prueba de consumo: ${formData.get('prueba_consumo')}\n`;
    if (formData.get('prueba_consumo') === 'No') {
        resumen += `Razón: ${formData.get('prueba_razon')}\n`;
        if (formData.get('prueba_razon') === 'usuario no permite el ingreso' && formData.get('motivo_no_permite')) {
            resumen += `Motivo: ${formData.get('motivo_no_permite')}\n`;
        } else if (formData.get('prueba_razon') === 'otra' && formData.get('otra_razon')) {
            resumen += `Especificación: ${formData.get('otra_razon')}\n`;
        }
    }
    
    if (!(formData.get('prueba_consumo') === 'No' && formData.get('prueba_razon') === 'usuario ausente')) {
        resumen += `Problemas de fugas detectados: ${formData.get('fugas_detectadas')}\n`;
        
        if (formData.get('fugas_detectadas') === 'No se detecto' && 
            formData.get('puntos_agua_no') && 
            !(formData.get('prueba_consumo') === 'No' && 
              (formData.get('prueba_razon') === 'usuario no permite el ingreso' || 
               formData.get('prueba_razon') === 'otra'))) {
            resumen += `Se revisaron ${formData.get('puntos_agua_no')} puntos de agua y se identificó que no existe fuga\n`;
        }
        
        if (formData.get('fugas_detectadas') === 'Se detectó fuga visible' && 
            formData.get('puntos_agua_si') && formData.get('ubicacion_fuga_detalle') &&
            !(formData.get('prueba_consumo') === 'No' && 
              (formData.get('prueba_razon') === 'usuario no permite el ingreso' || 
               formData.get('prueba_razon') === 'otra'))) {
            resumen += `Se revisaron ${formData.get('puntos_agua_si')} puntos de agua y se identificó que existe fuga en: ${formData.get('ubicacion_fuga_detalle')}\n`;
        }
        
        if (formData.get('fugas_detectadas') === 'Se detectó fuga no visible') {
            resumen += `RECOMENDACIÓN: Se recomienda al usuario el servicio de detección y reparación de fugas\n`;
        }
        
        resumen += `Nombre de la persona que atendió: ${formData.get('persona_atendio')}\n`;
    }
    
    if (formData.get('observacion')) {
        resumen += `\nOBSERVACIÓN FINAL:\n${formData.get('observacion')}\n`;
    }
    
    resumen += `\nSe realiza mantenimiento liviano al medidor\n`;
    
    // Mostrar el resumen
    document.getElementById('resumen-contenido-comercial').textContent = resumen;
    document.getElementById('resumen-comercial').classList.add('active');
    
    // Agregar botón de guardar si no existe
    if (!document.getElementById('btn-guardar-comercial')) {
        const resumenDiv = document.getElementById('resumen-comercial');
        const botonCopiar = document.getElementById('copiar-resumen-comercial');
        
        const botonGuardar = document.createElement('button');
        botonGuardar.type = 'button';
        botonGuardar.id = 'btn-guardar-comercial';
        botonGuardar.className = 'btn-guardar';
        botonGuardar.innerHTML = '💾 Guardar en Google Sheets';
        botonGuardar.onclick = () => guardarEnGoogleSheets('comercial');
        
        botonCopiar.parentNode.insertBefore(botonGuardar, botonCopiar.nextSibling);
    }
    
    document.getElementById('resumen-comercial').scrollIntoView({ behavior: 'smooth' });
}

// =============================================
// FUNCIONES AUXILIARES
// =============================================

function volverAlFormularioResidencial() {
    document.getElementById('resumen-residencial').classList.remove('active');
    document.getElementById('formResidencial').reset();
    document.getElementById('res-fugas-group').style.opacity = '1';
    document.getElementById('res-fugas-group').style.pointerEvents = 'auto';
    document.getElementById('res-persona-atendio-group').style.opacity = '1';
    document.getElementById('res-persona-atendio-group').style.pointerEvents = 'auto';
    document.getElementById('res-persona-atendio').required = true;
    document.querySelectorAll('#res-fugas-group input[type="radio"]').forEach(radio => {
        radio.required = true;
    });
    document.querySelectorAll('#formResidencial .conditional-field, #formResidencial .info-message').forEach(field => {
        field.classList.remove('active');
    });
    document.getElementById('formulario-residencial').scrollIntoView({ behavior: 'smooth' });
}

function volverAlFormularioComercial() {
    document.getElementById('resumen-comercial').classList.remove('active');
    document.getElementById('formComercial').reset();
    document.getElementById('com-fugas-group').style.opacity = '1';
    document.getElementById('com-fugas-group').style.pointerEvents = 'auto';
    document.getElementById('com-persona-atendio-group').style.opacity = '1';
    document.getElementById('com-persona-atendio-group').style.pointerEvents = 'auto';
    document.getElementById('com-persona-atendio').required = true;
    document.querySelectorAll('#com-fugas-group input[type="radio"]').forEach(radio => {
        radio.required = true;
    });
    document.querySelectorAll('#formComercial .conditional-field, #formComercial .info-message').forEach(field => {
        field.classList.remove('active');
    });
    document.getElementById('formulario-comercial').scrollIntoView({ behavior: 'smooth' });
}

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
    
    if (!textoResumen.trim()) {
        alert('No hay resumen para copiar. Genera el análisis primero.');
        return;
    }
    
    navigator.clipboard.writeText(textoResumen)
        .then(() => {
            const textoOriginal = botonCopiar.textContent;
            botonCopiar.textContent = '✅ ¡Copiado!';
            botonCopiar.classList.add('copiado');
            
            setTimeout(() => {
                botonCopiar.textContent = textoOriginal;
                botonCopiar.classList.remove('copiado');
            }, 2000);
        })
        .catch(err => {
            console.error('Error al copiar: ', err);
            const areaTemporal = document.createElement('textarea');
            areaTemporal.value = textoResumen;
            document.body.appendChild(areaTemporal);
            areaTemporal.select();
            document.execCommand('copy');
            document.body.removeChild(areaTemporal);
            alert('Resumen copiado al portapapeles');
        });
}

function agregarEstilosGuardar() {
    const estilos = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .btn-guardar {
            background-color: #8e44ad;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-left: 10px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn-guardar:hover {
            background-color: #7d3c98;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .btn-guardar:disabled {
            background-color: #95a5a6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .btn-guardar.copiado {
            background-color: #27ae60;
        }
        
        .btn-copiar.copiado {
            background-color: #27ae60;
        }
    `;
    
    const styleSheet = document.createElement("style");
    styleSheet.textContent = estilos;
    document.head.appendChild(styleSheet);
}
