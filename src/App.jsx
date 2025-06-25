import React, { useState } from 'react';

// --- Icon Components ---
const HeartIcon = ({ colorClass }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);

const SpinnerIcon = ({ className = "h-5 w-5" }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);

const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM2 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm15-5a1 1 0 00-1-1H6a1 1 0 000 2h8a1 1 0 001-1zM6 16a1 1 0 011-1h8a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

// --- Core Calculation Logic ---

function calculatePoints(data) {
    let points = 0; const { sexo, edad, colesterol_total, colesterol_hdl, presion_sistolica, en_tratamiento_pa, es_fumador, tiene_diabetes } = data;
    if (sexo === 'hombre') {
        if (edad >= 35 && edad <= 39) points += 2; else if (edad >= 40 && edad <= 44) points += 5; else if (edad >= 45 && edad <= 49) points += 7; else if (edad >= 50 && edad <= 54) points += 8; else if (edad >= 55 && edad <= 59) points += 10; else if (edad >= 60 && edad <= 64) points += 11; else if (edad >= 65 && edad <= 69) points += 12; else if (edad >= 70 && edad <= 74) points += 14; else if (edad >= 75) points += 15;
        if (edad >= 40 && edad <= 59) { if (colesterol_total >= 160 && colesterol_total <= 199) points += 2; else if (colesterol_total >= 200 && colesterol_total <= 239) points += 3; else if (colesterol_total >= 240 && colesterol_total <= 279) points += 4; else if (colesterol_total >= 280) points += 5;}
        else if (edad >= 60 && edad <= 79) { if (colesterol_total >= 160 && colesterol_total <= 199) points += 1; else if (colesterol_total >= 200 && colesterol_total <= 239) points += 1; else if (colesterol_total >= 240 && colesterol_total <= 279) points += 2; else if (colesterol_total >= 280) points += 2;}
        if (es_fumador) { if (edad >= 40 && edad <= 49) points += 5; else if (edad >= 50 && edad <= 59) points += 3; else if (edad >= 60 && edad <= 79) points += 1;}
    } else { if (edad >= 35 && edad <= 39) points += 2; else if (edad >= 40 && edad <= 44) points += 4; else if (edad >= 45 && edad <= 49) points += 5; else if (edad >= 50 && edad <= 54) points += 7; else if (edad >= 55 && edad <= 59) points += 8; else if (edad >= 60 && edad <= 64) points += 9; else if (edad >= 65 && edad <= 69) points += 10; else if (edad >= 70 && edad <= 74) points += 11; else if (edad >= 75) points += 12;
        if (edad >= 40 && edad <= 49) { if (colesterol_total >= 160 && colesterol_total <= 199) points += 2; else if (colesterol_total >= 200 && colesterol_total <= 239) points += 4; else if (colesterol_total >= 240 && colesterol_total <= 279) points += 5; else if (colesterol_total >= 280) points += 7;}
        else if (edad >= 50 && edad <= 79) { if (colesterol_total >= 160 && colesterol_total <= 199) points += 1; else if (colesterol_total >= 200 && colesterol_total <= 239) points += 2; else if (colesterol_total >= 240 && colesterol_total <= 279) points += 3; else if (colesterol_total >= 280) points += 4;}
        if (es_fumador) { if (edad >= 40 && edad <= 49) points += 4; else if (edad >= 50 && edad <= 59) points += 2; else if (edad >= 60 && edad <= 79) points += 1;}
    }
    if (colesterol_hdl < 35) points += 2; else if (colesterol_hdl >= 35 && colesterol_hdl <= 44) points += 1; else if (colesterol_hdl >= 60) points -= 1;
    if (!en_tratamiento_pa) { if (presion_sistolica >= 130 && presion_sistolica <= 139) points += 1; else if (presion_sistolica >= 140 && presion_sistolica <= 159) points += 2; else if (presion_sistolica >= 160) points += 3;}
    else { if (presion_sistolica >= 130 && presion_sistolica <= 139) points += 2; else if (presion_sistolica >= 140 && presion_sistolica <= 159) points += 4; else if (presion_sistolica >= 160) points += 5;}
    if (tiene_diabetes) { points += (sexo === 'hombre') ? 3 : 4;}
    return points;
}

function getRiskFromPoints(sexo, puntos) {
    const riskMapHombre = {'-3': 1, '-2': 1, '-1': 1, '0': 2, '1': 2, '2': 3, '3': 3, '4': 4, '5': 5, '6': 6, '7': 8, '8': 9, '9': 11, '10': 14, '11': 17, '12': 21, '13': 25, '14': 31, '15': 37, '16': 45, '17': 53};
    const riskMapMujer = {'-2': 1, '-1': 1, '0': 1, '1': 1, '2': 1, '3': 2, '4': 2, '5': 3, '6': 3, '7': 4, '8': 5, '9': 6, '10': 7, '11': 9, '12': 11, '13': 13, '14': 16, '15': 19, '16': 23, '17': 27, '18': 32, '19': 38, '20': 45, '21': 53};
    if (sexo === 'hombre') { if (puntos <= -4) return "<1"; if (puntos >= 18) return ">60"; return riskMapHombre[puntos] || "N/A";}
    else { if (puntos <= -3) return "<1"; if (puntos >= 22) return ">60"; return riskMapMujer[puntos] || "N/A";}
}

function getRiskClassification(riskValue) {
    const numericRisk = parseInt(riskValue, 10);
    if (isNaN(numericRisk)) { if (riskValue === "<1") return { level: 'Riesgo Bajo', color: 'text-green-600', bgColor: 'bg-green-100' }; return { level: 'Riesgo Muy Alto', color: 'text-red-700', bgColor: 'bg-red-100' };}
    if (numericRisk < 5) return { level: 'Riesgo Bajo', color: 'text-green-600', bgColor: 'bg-green-100' };
    else if (numericRisk < 10) return { level: 'Riesgo Moderado', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    else if (numericRisk < 20) return { level: 'Riesgo Alto', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    else return { level: 'Riesgo Muy Alto', color: 'text-red-700', bgColor: 'bg-red-100' };
}

function generateRecommendations(data) {
    const recomendaciones = [];
    if (data.es_fumador) recomendaciones.push("<strong>Dejar de fumar es la acción más importante que puede tomar para reducir su riesgo cardiovascular.</strong> Hable con su médico sobre programas y ayudas para dejar el cigarrillo.");
    if (data.presion_sistolica >= 140) { if (data.en_tratamiento_pa) recomendaciones.push("Su presión arterial sigue elevada a pesar del tratamiento. Es crucial que consulte a su médico para evaluar si su medicación actual necesita un ajuste."); else recomendaciones.push("Su presión arterial está elevada. Debe consultar a un médico para una evaluación completa y considerar iniciar un tratamiento.");}
    else if (data.presion_sistolica >= 130) recomendaciones.push("Su presión arterial está en el límite alto. Incrementar la actividad física y reducir el consumo de sal en su dieta puede ayudar a controlarla.");
    if (data.colesterol_total > 200) recomendaciones.push("Su colesterol total está por sobre el nivel recomendado. Una dieta baja en grasas saturadas y trans, y rica en fibra, puede ayudar a mejorarlo.");
    if (data.colesterol_hdl < 40) recomendaciones.push("Su colesterol 'bueno' (HDL) está bajo. El ejercicio regular, como caminatas rápidas, es muy efectivo para aumentarlo.");
    if (data.tiene_diabetes) recomendaciones.push("Siendo diabético/a, el control estricto del azúcar en la sangre (glicemia) y seguir las indicaciones de su equipo de salud es fundamental para proteger su corazón.");
    recomendaciones.push("Incorpore al menos 30 minutos de actividad física moderada la mayoría de los días de la semana.");
    recomendaciones.push("Siga una dieta saludable para el corazón, como la dieta mediterránea, rica en frutas, verduras, legumbres y pescado.");
    return recomendaciones;
}

// Simple component to render text with newlines
const FormattedText = ({ text }) => {
    return (
        <div>
            {text.split('\n').map((line, index) => (
                <p key={index} className="mb-2">{line}</p>
            ))}
        </div>
    );
};

// --- Main App Component ---

export default function App() {
    const [formData, setFormData] = useState({
        nombre: '', sexo: 'hombre', edad: 50, colesterol_total: 200, colesterol_hdl: 40,
        presion_sistolica: 120, en_tratamiento_pa: false, es_fumador: false, tiene_diabetes: false,
    });
    const [email, setEmail] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [geminiPlan, setGeminiPlan] = useState('');
    const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const processedValue = name === 'nombre' ? value : (parseInt(value, 10) || 0);
        setFormData(prev => ({ ...prev, [name]: processedValue }));
    };
    
    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value === 'true' }));
    };

    const handleCalculate = (e) => {
        e.preventDefault(); setIsLoading(true); setResult(null); setEmail(''); setGeminiPlan('');
        setTimeout(() => {
            const points = calculatePoints(formData); const risk = getRiskFromPoints(formData.sexo, points);
            const recommendations = generateRecommendations(formData); const classification = getRiskClassification(risk);
            setResult({ nombre: formData.nombre, points, risk, recommendations, classification });
            setIsLoading(false);
        }, 500);
    };
    
    // --- NEW: Gemini API Integration ---
    const handleGeneratePlan = async () => {
        if (!result) return;
        setIsGeneratingPlan(true);
        setGeminiPlan('');

        const { nombre, classification, ...patientData } = result;
        const prompt = `Actúa como un coach de salud amable y motivador. Un paciente llamado ${nombre || 'Usuario'} ha recibido los siguientes resultados de su evaluación de riesgo cardiovascular:
- Nivel de Riesgo: ${classification.level} (${result.risk}%)
- Datos del paciente: ${JSON.stringify(patientData, null, 2)}

Tu tarea es crear un "Plan de Acción Personalizado" en español. El plan debe ser positivo, fácil de entender y accionable. No repitas las recomendaciones básicas, en su lugar, expande sobre ellas.

Estructura tu respuesta de la siguiente manera:
1.  Un párrafo introductorio corto, positivo y personalizado para ${nombre || 'el usuario'}.
2.  Una sección llamada "Mis 3 Metas Clave para el Próximo Mes", con tres metas claras y realistas basadas en sus factores de riesgo principales.
3.  Una sección llamada "Consejo de la Semana", con un consejo práctico y fácil de implementar.
4.  Un párrafo de cierre motivador.

Usa un tono cercano y alentador.`;

        try {
            const apiKey = ""; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts.length > 0) {
                setGeminiPlan(data.candidates[0].content.parts[0].text);
            } else {
                setGeminiPlan("No se pudo generar el plan en este momento. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setGeminiPlan("Hubo un error de conexión al generar el plan. Por favor, revisa tu conexión a internet.");
        } finally {
            setIsGeneratingPlan(false);
        }
    };
    
    const handleSendEmail = (e) => {
        e.preventDefault(); if (!result || !email) return;
        const subject = `Resultados del Cálculo de Riesgo Cardiovascular para ${result.nombre || 'el paciente'}`;
        let body = `Estimado(a) ${result.nombre || ''},\n\nA continuación, se presentan los resultados de su cálculo de riesgo cardiovascular, basado en el score de Framingham adaptado para Chile.\n\n--------------------------------\n  • RIESGO A 10 AÑOS: ${result.risk}%\n  • CLASIFICACIÓN: ${result.classification.level}\n  • PUNTOS DE RIESGO: ${result.points}\n--------------------------------\n\nRECOMENDACIONES GENERALES:\n\n`;
        const plainTextRecommendations = result.recommendations.map(rec => '• ' + rec.replace(/<strong>/g, '').replace(/<\/strong>/g, '')).join('\n');
        body += plainTextRecommendations;
        if(geminiPlan) {
            body += `\n\n--------------------------------\nPLAN DE ACCIÓN PERSONALIZADO (GENERADO CON IA):\n--------------------------------\n\n${geminiPlan}`;
        }
        body += `\n\nAtentamente,\nSu Herramienta de Salud Cardiovascular.\n\nDescargo de responsabilidad: Esta es una herramienta educativa y no reemplaza el consejo, diagnóstico o tratamiento de un profesional médico.`;
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 md:p-8">
            <main className="max-w-6xl mx-auto">
                <header className="text-center mb-8"><h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Calculadora de Riesgo Cardiovascular</h1><p className="text-slate-600 mt-2">Basada en el score de Framingham-Chile (MINSAL).</p></header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <form onSubmit={handleCalculate} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                        <div className="space-y-6">
                            <div><label htmlFor="nombre" className="text-lg font-semibold text-slate-700">Nombre del Paciente</label><input type="text" id="nombre" name="nombre" placeholder="Ej: Juan Pérez" value={formData.nombre} onChange={handleInputChange} className="mt-2 w-full p-3 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition" /></div>
                            <fieldset><legend className="text-lg font-semibold text-slate-700 mb-2">Sexo</legend><div className="flex gap-4"><label className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.sexo === 'hombre' ? 'bg-indigo-50 border-indigo-500' : 'bg-slate-50'}`}><input type="radio" name="sexo" value="hombre" checked={formData.sexo === 'hombre'} onChange={(e) => setFormData({...formData, sexo: e.target.value})} className="sr-only" /><span className="font-medium text-slate-800">Hombre</span></label><label className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.sexo === 'mujer' ? 'bg-pink-50 border-pink-500' : 'bg-slate-50'}`}><input type="radio" name="sexo" value="mujer" checked={formData.sexo === 'mujer'} onChange={(e) => setFormData({...formData, sexo: e.target.value})} className="sr-only" /><span className="font-medium text-slate-800">Mujer</span></label></div></fieldset>
                            <div><label htmlFor="edad" className="text-lg font-semibold text-slate-700">Edad</label><input type="number" id="edad" name="edad" value={formData.edad} onChange={handleInputChange} className="mt-2 w-full p-3 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition" min="30" max="79" required /></div>
                            <div><label htmlFor="colesterol_total" className="text-lg font-semibold text-slate-700">Colesterol Total (mg/dL)</label><input type="number" id="colesterol_total" name="colesterol_total" value={formData.colesterol_total} onChange={handleInputChange} className="mt-2 w-full p-3 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition" required /></div>
                            <div><label htmlFor="colesterol_hdl" className="text-lg font-semibold text-slate-700">Colesterol HDL (mg/dL)</label><input type="number" id="colesterol_hdl" name="colesterol_hdl" value={formData.colesterol_hdl} onChange={handleInputChange} className="mt-2 w-full p-3 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition" required /></div>
                            <div><label htmlFor="presion_sistolica" className="text-lg font-semibold text-slate-700">Presión Arterial Sistólica</label><input type="number" id="presion_sistolica" name="presion_sistolica" value={formData.presion_sistolica} onChange={handleInputChange} className="mt-2 w-full p-3 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition" required /></div>
                            {[{ name: 'en_tratamiento_pa', legend: '¿En tratamiento para la presión?' }, { name: 'es_fumador', legend: '¿Es fumador/a?' }, { name: 'tiene_diabetes', legend: '¿Tiene diabetes?' }].map(field => (<fieldset key={field.name}><legend className="text-lg font-semibold text-slate-700 mb-2">{field.legend}</legend><div className="flex gap-4"><label className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData[field.name] === true ? 'bg-indigo-50 border-indigo-500' : 'bg-slate-50'}`}><input type="radio" name={field.name} value="true" checked={formData[field.name] === true} onChange={handleRadioChange} className="sr-only"/><span className="font-medium text-slate-800">Sí</span></label><label className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData[field.name] === false ? 'bg-indigo-50 border-indigo-500' : 'bg-slate-50'}`}><input type="radio" name={field.name} value="false" checked={formData[field.name] === false} onChange={handleRadioChange} className="sr-only"/><span className="font-medium text-slate-800">No</span></label></div></fieldset>))}
                        </div>
                        <button type="submit" disabled={isLoading} className="mt-8 w-full bg-indigo-600 text-white font-bold text-lg p-4 rounded-xl shadow-md hover:bg-indigo-700 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center">{isLoading ? <SpinnerIcon className="text-white h-5 w-5" /> : 'Calcular Mi Riesgo'}</button>
                    </form>
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center h-full">
                        {isLoading && <div className="text-center"><SpinnerIcon className="text-indigo-500 h-8 w-8" /><p className="mt-2 text-slate-600">Calculando...</p></div>}
                        {!isLoading && result && (
                            <div className="text-center animate-fade-in w-full">
                                <h2 className="text-xl font-bold text-slate-800 mb-2">Resultado para {result.nombre || 'el Paciente'}</h2>
                                <div className="my-4"><HeartIcon colorClass={result.classification.color} /></div>
                                <p className="text-slate-600">Riesgo a 10 años</p>
                                <p className={`text-6xl font-extrabold my-1 ${result.classification.color}`}>{result.risk}<span className="text-4xl">%</span></p>
                                <div className={`inline-block px-4 py-1.5 rounded-full font-semibold text-lg mt-2 ${result.classification.bgColor} ${result.classification.color}`}>{result.classification.level}</div>
                                <p className="text-slate-500 mt-4">Puntos de riesgo: {result.points}</p>
                                <div className="mt-6 text-left bg-emerald-50 p-4 rounded-lg"><h3 className="text-lg font-bold text-emerald-800 mb-3">Recomendaciones Generales</h3><ul className="space-y-3 list-disc list-inside text-emerald-700">{result.recommendations.map((rec, index) => (<li key={index} dangerouslySetInnerHTML={{ __html: rec }} />))}</ul></div>
                                
                                {/* --- NEW Gemini Plan Section --- */}
                                <div className="mt-6 w-full text-left">
                                    <button onClick={handleGeneratePlan} disabled={isGeneratingPlan} className="w-full bg-purple-600 text-white font-bold p-3 rounded-lg shadow-md hover:bg-purple-700 transition-all flex items-center justify-center disabled:bg-purple-400 disabled:cursor-not-allowed">
                                        {isGeneratingPlan ? <><SpinnerIcon className="text-white h-5 w-5 mr-2" /> Generando...</> : <><SparkleIcon /> Crear Plan de Acción Personalizado con IA</>}
                                    </button>
                                    {isGeneratingPlan && <div className="mt-4 p-4 bg-purple-50 rounded-lg text-center text-purple-700">Contactando a nuestro coach de salud IA...</div>}
                                    {geminiPlan && <div className="mt-4 p-4 bg-purple-50 rounded-lg text-purple-900"><h3 className="text-lg font-bold text-purple-800 mb-3">✨ Tu Plan de Acción Personalizado</h3><FormattedText text={geminiPlan} /></div>}
                                </div>

                                <div className="mt-6 w-full text-left"><h3 className="text-lg font-bold text-slate-700 mb-3">Enviar Reporte Completo por Correo</h3><form onSubmit={handleSendEmail} className="flex flex-col sm:flex-row gap-2"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" className="flex-grow w-full p-3 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition" required /><button type="submit" className="bg-slate-600 text-white font-bold p-3 rounded-lg shadow-md hover:bg-slate-700 transition-all flex items-center justify-center"><MailIcon /> Enviar</button></form></div>
                            </div>
                        )}
                        {!isLoading && !result && (<div className="text-center text-slate-500 px-4"><svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg><h2 className="mt-4 text-xl font-semibold">Esperando datos</h2><p className="mt-1">Complete el formulario para ver su resultado, recomendaciones y plan de acción con IA.</p></div>)}
                    </div>
                </div>
                <footer className="text-center mt-8 text-sm text-slate-500"><p><strong>Descargo de responsabilidad:</strong> Esta es una herramienta educativa y no reemplaza el consejo, diagnóstico o tratamiento de un profesional médico. Consulte siempre a su médico para cualquier duda sobre su salud.</p></footer>
            </main>
        </div>
    );
}

const style = document.createElement('style');
style.innerHTML = ` @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }`;
document.head.appendChild(style);
