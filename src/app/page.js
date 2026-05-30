"use client";

import React, { useState, useEffect, useRef } from 'react';

// =========================================================
// DATOS DE PREGUNTAS FRECUENTES (FAQS)
// =========================================================
const FAQS = [
  {
    q: "Se me olvidó tomar una pastilla Slinda, ¿qué hago?",
    r: `Tranquila, depende del momento en que la olvidaste.<br><br><b>Primera semana + relaciones en la semana anterior:</b> puede existir riesgo de embarazo. Consulta con tu médico.<br><br><b>Días 8 a 14:</b> tómala apenas recuerdes, aunque sean dos a la vez. Sigue con el horario normal. La protección se mantiene, no necesitas método adicional.<br><br><b>Días 15 a 24:</b> tómala apenas recuerdes. Sigue con las pastillas activas blancas. Al llegar a las pastillas verdes de placebo, no las tomes, bótalas y empieza nueva caja directamente. La protección se mantiene.<br><br><b>Pastilla verde olvidada:</b> no pasa nada, son placebo y no afectan la eficacia.`
  },
  {
    q: "¿Puedo tomar dos pastillas el mismo día si se me olvidó una?",
    r: `Sí. Las indicaciones del empaque de Slinda dicen que no hay problema en tomar dos pastillas el mismo día para recuperar la olvidada.<br><br>Sin embargo, si olvidaste <b>2 o más pastillas blancas activas</b>, debes usar protección extra (como preservativo) durante los próximos 7 días.`
  },
  {
    q: "¿Qué pasa si tomé tarde una pastilla?",
    r: `Tómala lo antes posible y sigue con el horario normal.<br><br>Revisa las indicaciones del empaque de Slinda, porque puede haber instrucciones específicas. Si hubo relaciones sexuales sin condón o tienes dudas, consulta con tu médico o farmacéutico para saber si necesitas un método de respaldo.`
  },
  {
    q: "¿Qué efectos secundarios pueden pasar con Slinda?",
    r: `<b>Frecuentes (1 de cada 10 personas):</b> dolor de cabeza, náuseas, dolor abdominal, cambios en el deseo sexual, cambios de humor, acné, molestias en los senos, menstruaciones dolorosas, sangrado irregular, aumento de peso.<br><br><b>Poco frecuentes (1 de cada 100):</b> anemia, mareos, vómitos, diarrea, estreñimiento, infecciones vaginales, depresión, ansiedad, quistes en los ovarios, sequedad vaginal, caída del pelo, presión alta, sofocos.<br><br>Si algún síntoma es intenso, no mejora o te preocupa, consulta con tu médico.`
  },
  {
    q: "¿Qué efectos secundarios graves puede generar Slinda?",
    r: `Los efectos graves son poco comunes, pero pueden incluir cáncer de mama (riesgo muy bajo), trombosis (coágulos de sangre) y trastornos psiquiátricos.<br><br>El riesgo de trombosis puede ser mayor si hay antecedentes familiares de trombosis a edad temprana, obesidad, inmovilización prolongada o cirugía mayor.<br><br>La probabilidad de que ocurran es muy baja en casi todos los casos. Consulta con tu médico si tienes síntomas intensos.`
  },
  {
    q: "¿Cuándo un efecto secundario es señal de alarma?",
    r: `Un efecto secundario es señal de alarma cuando es fuerte, no mejora o aparece con síntomas que pueden indicar algo serio.<br><br>Busca atención médica de inmediato si tienes:<br>• Dolor de cabeza fuerte<br>• Vómito fuerte<br>• Problemas para hablar<br>• Debilidad o adormecimiento de un brazo o pierna<br>• Dolor o presión en el pecho<br>• Latidos irregulares o muy rápidos<br>• Falta de aire<br>• Dolor en una pierna<br>• Pérdida o cambios en la visión<br>• Dolor fuerte de estómago<br>• Piel u ojos amarillos<br>• Dolor en la parte superior derecha del abdomen<br><br>Si el síntoma aparece de repente o afecta la respiración, el pecho, la visión, el habla o una extremidad, <b>no esperes: busca atención de inmediato.</b>`
  },
  {
    q: "Estoy tomando Slinda con otros medicamentos, ¿qué pasa?",
    r: `Algunos medicamentos pueden bajar la efectividad de Slinda o causar sangrados inesperados. Esto puede ocurrir con tratamientos para:<br>• Epilepsia (primidona, fenitoína, carbamazepina, oxcarbazepina, felbamato, topiramato)<br>• Tuberculosis (rifampicina)<br>• VIH (ritonavir, nelfinavir, nevirapina, efavirenz)<br>• Hepatitis C (boceprevir, telaprevir)<br>• Hongos (fluconazol, itraconazol, ketoconazol)<br>• Bacterias (claritromicina, eritromicina)<br>• Depresión o productos naturales como la hierba de San Juan<br>• Problemas del corazón (diltiazem)<br><br>Si el medicamento es por poco tiempo, usa preservativo (puede ser necesario hasta 28 días después de suspenderlo). Si es por largo tiempo, tu médico puede recomendarte otro método. Consulta siempre antes de combinar medicamentos.`
  },
  {
    q: "¿Cuándo debo contactar a un médico de inmediato?",
    r: `Busca atención médica si presentas:<br>• Dolor intenso o hinchazón en una pierna<br>• Dolor en el pecho sin explicación<br>• Dificultad para respirar o tos con sangre<br>• Dolor intenso en el estómago o abdomen bajo<br>• Piel u ojos amarillos u orina negra<br>• Si vas a operarte o estarás inmovilizada<br>• Sangrado vaginal inusual e intenso<br>• Sospecha de embarazo`
  },
  {
    q: "¿Cómo debo tomar Slinda?",
    r: `Debes tomar una pastilla todos los días a la misma hora. El intervalo entre una pastilla y la siguiente debe ser siempre de 24 horas. La consistencia en el horario es clave para su eficacia.`
  },
  {
    q: "¿Cuándo no debo tomar Slinda?",
    r: `No debes tomar Slinda si eres alérgica a la drospirenona, tienes coágulos de sangre, enfermedad hepática activa con función no normal, insuficiencia renal, cáncer sensible a hormonas (como cáncer de mama), sangrado vaginal inexplicable, embarazo o sospecha de embarazo.<br><br>Consulta con tu médico si tienes factores de riesgo para coágulos, como antecedentes familiares.`
  },
  {
    q: "¿Cómo puedo empezar a tomar Slinda?",
    r: `Si no venías tomando ningún otro anticonceptivo, empieza Slinda el <b>primer día de tu periodo</b>.<br><br>Si cambias desde otra pastilla, empieza cuando se acaben las pastillas activas del método anterior, sin tomar las placebo.<br><br>Si vienes de un anillo o parche, empieza Slinda el mismo día en que te lo retiren.`
  },
  {
    q: "¿Desde cuándo estoy protegida frente al embarazo?",
    r: `La protección depende de cuándo empezaste a tomar Slinda y de si la has tomado correctamente todos los días.<br><br>Si empezaste como te indicó tu médico y no has olvidado pastillas, estás protegida. Pero si empezaste en otro momento, olvidaste pastillas, las tomaste tarde, vomitaste o tuviste diarrea, revisa el empaque y usa condón como respaldo si así lo indica.`
  },
  {
    q: "¿Necesito usar preservativo los primeros días?",
    r: `Sí. Si estás empezando Slinda y no estás segura de si ya estás protegida, usa preservativo durante los primeros 7 días y sigue las instrucciones del empaque o de tu médico.`
  },
  {
    q: "¿Qué hago si quiero dejar de tomar Slinda?",
    r: `Puedes dejarla cuando quieras. Pero desde ese día ya no estarás protegida frente al embarazo.<br><br>Si no deseas quedar embarazada, usa otro método anticonceptivo. No la suspendas por tu cuenta sin hablar con tu médico, ya que te puede quedar sin protección. Agenda una consulta para planear el cambio.`
  },
  {
    q: "¿Qué hago si llevo varios días con diarrea o vómito?",
    r: `Esta situación es similar a cuando se olvida una pastilla: el activo puede no haberse absorbido bien. Usa un método anticonceptivo adicional como preservativo.<br><br>MedlinePlus indica que debes llamar al médico si el vómito o diarrea dura más de 1 día mientras tomas las pastillas activas, para saber cuánto tiempo necesitas usar método de respaldo.`
  },
  {
    q: "¿Es normal tener sangrado entre periodos?",
    r: `Sí, puede ser normal tener manchado o sangrado entre periodos, especialmente mientras el cuerpo se adapta a Slinda.<br><br>Pero si el sangrado es muy abundante, dura mucho tiempo, no mejora o te preocupa, debes consultar con un médico.`
  },
  {
    q: "¿Es normal que no me llegue el periodo tomando las pastillas?",
    r: `Sí, puede ser normal que no llegue el periodo mientras tomas Slinda.<br><br>Pero si olvidaste pastillas, las tomaste tarde, tuviste vómito o diarrea, o tuviste relaciones sin método de respaldo cuando correspondía, es mejor hacer una prueba de embarazo o consultar con tu médico.`
  },
  {
    q: "¿Las pastillas anticonceptivas engordan?",
    r: `Slinda puede causar aumento de peso en algunas personas, pero no necesariamente engorda a todas. Cada cuerpo reacciona diferente.<br><br>Si notas un aumento de peso fuerte, rápido o que te preocupa, lo mejor es consultarlo con tu médico para revisar si puede estar relacionado con la pastilla u otra causa.`
  },
  {
    q: "¿Las pastillas pueden afectar mi estado de ánimo?",
    r: `Sí, las pastillas pueden afectar el estado de ánimo en algunas personas.<br><br>Si notas tristeza intensa, cambios de ánimo fuertes, cansancio extremo o problemas para dormir, no lo ignores. Habla con tu médico para revisar si Slinda puede estar influyendo y si necesitas cambiar el método.`
  },
  {
    q: "¿Las pastillas anticonceptivas causan infertilidad?",
    r: `No. Slinda es un método anticonceptivo: ayuda a prevenir el embarazo mientras lo estás usando, pero no causa infertilidad.<br><br>Si después de suspenderla tienes dificultad para quedar embarazada o no vuelve tu periodo, lo mejor es consultar con ginecología para revisar otras posibles causas.`
  },
  {
    q: "¿Puedo tomar alcohol mientras uso Slinda?",
    r: `El alcohol en sí no cancela la protección de Slinda. Sin embargo, si el alcohol hace que olvides tomar la pastilla, la tomes tarde, vomites o tengas diarrea, la protección puede disminuir.<br><br>Toma tu pastilla siempre a la misma hora, independientemente de si consumiste alcohol.`
  },
  {
    q: "¿Qué diferencia hay entre pastilla activa y placebo?",
    r: `La pastilla <b>activa</b> es la que contiene la hormona y protege contra el embarazo.<br><br>La pastilla <b>placebo</b> no tiene hormona; está en el empaque para que no pierdas la rutina y empieces el siguiente paquete a tiempo. Si olvidas una placebo, no afecta la eficacia anticonceptiva.`
  },
  {
    q: "¿Qué pasa si me tomé una pastilla placebo por error?",
    r: `Si tomaste una placebo cuando te tocaba una activa, toma la pastilla activa que correspondía lo antes posible y sigue el empaque en orden.<br><br>Usa preservativo como respaldo si el empaque lo indica.`
  },
  {
    q: "¿Qué hago si perdí una pastilla activa?",
    r: `Toma la siguiente pastilla activa según el orden del empaque y consulta las instrucciones del blíster o llama a tu médico o farmacéutico.<br><br>Si perdiste <b>2 o más pastillas activas blancas</b>, puede que no estés protegida contra el embarazo y puede que necesites preservativo como respaldo durante 7 días.`
  },
  {
    q: "¿Qué hago si quiero cambiar de marca de pastilla?",
    r: `Agenda una consulta o habla con tu médico antes de hacer el cambio. No la suspendas por tu cuenta, porque podrías quedar sin protección frente al embarazo.<br><br>Mientras haces el cambio, sigue tomando Slinda como indica el empaque hasta que te indiquen cómo pasar al nuevo método.`
  },
  {
    q: "¿La pastilla protege contra infecciones de transmisión sexual?",
    r: `No. Slinda <b>no protege contra infecciones de transmisión sexual (ITS)</b>. Para reducir el riesgo de ITS, debes usar preservativo.`
  },
  {
    q: "¿Cuándo debería pedir una cita con mi ginecóloga?",
    r: `Deberías pedir cita si:<br>• Quieres empezar, cambiar o suspender Slinda<br>• Olvidaste 2 o más pastillas blancas activas<br>• Tuviste vómito o diarrea por más de 1 día mientras tomabas las activas<br>• No te llegó el periodo y no tomaste las pastillas correctamente<br>• Tomaste todo bien pero no te llegaron dos periodos seguidos<br>• Tienes efectos secundarios fuertes o que no se van (náuseas, acné, sangrado irregular, dolor de cabeza, cambios de ánimo, aumento de peso)<br>• Aparece cualquier señal de alarma como dolor fuerte de cabeza, presión en el pecho, falta de aire, dolor en una pierna, cambios en la visión, piel u ojos amarillos o sangrado muy abundante<br><br>Ante cualquier señal de alarma, busca atención médica de inmediato.`
  },
  {
    q: "¿Qué hago si sospecho que estoy embarazada?",
    r: `Hazte una prueba de embarazo y contacta a tu ginecóloga lo antes posible.<br><br>Mientras resuelves la duda, usa preservativo como respaldo. No ignores síntomas como náuseas, vómito o sensibilidad en los senos si sospechas embarazo.`
  }
];

// =========================================================
// COLORES PARA AVATARES DE COMUNIDAD
// =========================================================
const COLORS = [
  { bg: '#FBEAF0', c: '#C2185B' },
  { bg: '#F3EEF9', c: '#6A3D8F' },
  { bg: '#e8f4fd', c: '#1565C0' },
  { bg: '#e8f5e9', c: '#2E7D32' },
  { bg: '#fff3e0', c: '#E65100' },
  { bg: '#fce4ec', c: '#880E4F' }
];

const DISCLAIMER = '⚕️ Información validada por la Dra. Claudia Scarpeta, la Dra. Diana Solórzano y el Dr. Ricardo Paredes. Esta información es orientativa y no reemplaza una consulta médica profesional.';

// =========================================================
// COMPONENTE PRINCIPAL
// =========================================================
export default function Home() {
  const [activeScreen, setActiveScreen] = useState('landing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estados de Registro
  const [regNombre, setRegNombre] = useState('');
  const [regEdad, setRegEdad] = useState('');
  const [regHora, setRegHora] = useState('20:00');
  const [regPastilla, setRegPastilla] = useState('');
  const [regFecha, setRegFecha] = useState('');
  const [regDuda, setRegDuda] = useState('');
  
  // Estado del perfil guardado
  const [userProfile, setUserProfile] = useState(null);

  // Estados del Dashboard
  const [pillTakenToday, setPillTakenToday] = useState(false);
  const [formattedReminderTime, setFormattedReminderTime] = useState('8:00 p.m.');
  const [todayString, setTodayString] = useState('');

  // Estados de la Comunidad
  const [userPosts, setUserPosts] = useState([]);
  const [pubName, setPubName] = useState('');
  const [pubText, setPubText] = useState('');
  const [pubTag, setPubTag] = useState('Apoyo'); // Tag por defecto para postear
  const [activeTagFilter, setActiveTagFilter] = useState('Todos'); // Filtro de visualización
  const [likedPostIds, setLikedPostIds] = useState([]);

  // Estados del Chatbot
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [showFaqPanel, setShowFaqPanel] = useState(true);
  const chatMessagesEndRef = useRef(null);

  const limpiarConversacion = () => {
    if (confirm('¿Estás segura de que quieres limpiar el chat? Esto borrará el historial de esta conversación.')) {
      const initialChat = [
        {
          id: 'initial',
          role: 'assistant',
          content: `Hola, estoy aquí para ayudarte. La información que comparto ha sido validada por la <b>Dra. Claudia Scarpeta</b>, la <b>Dra. Diana Solórzano</b> y el <b>Dr. Ricardo Paredes</b>. Recuerda que es orientativa y no reemplaza una consulta médica profesional. ¿Qué necesitas consultar hoy?`
        }
      ];
      setChatMessages(initialChat);
      localStorage.setItem('serena_chat_history', JSON.stringify(initialChat));
    }
  };

  // =========================================================
  // EFECTOS E INICIALIZACIÓN
  // =========================================================
  useEffect(() => {
    // 1. Obtener fecha formateada en español para el Dashboard
    const now = new Date();
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    setTodayString(`${dias[now.getDay()]}, ${now.getDate()} de ${meses[now.getMonth()]} de ${now.getFullYear()}`);

    // 2. Cargar perfil desde localStorage
    const savedProfile = localStorage.getItem('serena_profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      setRegNombre(profile.nombre || '');
      setRegEdad(profile.edad || '');
      setRegHora(profile.hora || '20:00');
      setRegPastilla(profile.pastilla || '');
      setRegFecha(profile.fecha || '');
      setRegDuda(profile.duda || '');
      
      // Formatear hora a formato 12h
      formatReminder(profile.hora);

      // Redirigir directamente a Dashboard si el perfil ya existe
      setActiveScreen('dashboard');
    } else {
      setActiveScreen('landing');
    }

    // 3. Cargar estado de la toma diaria
    const todayDateKey = now.toISOString().slice(0, 10); // "YYYY-MM-DD"
    const lastTakenDate = localStorage.getItem('serena_last_taken_date');
    if (lastTakenDate === todayDateKey) {
      setPillTakenToday(true);
    }

    // 4. Cargar posts e historial de chat de comunidad y chatbot
    const savedPosts = localStorage.getItem('serena_posts');
    if (savedPosts) {
      setUserPosts(JSON.parse(savedPosts));
    }

    const savedLikes = localStorage.getItem('serena_liked_posts');
    if (savedLikes) {
      setLikedPostIds(JSON.parse(savedLikes));
    }

    const savedChat = localStorage.getItem('serena_chat_history');
    if (savedChat) {
      setChatMessages(JSON.parse(savedChat));
    } else {
      // Mensaje inicial del bot
      setChatMessages([
        {
          id: 'initial',
          role: 'assistant',
          content: `Hola, estoy aquí para ayudarte. La información que comparto ha sido validada por la <b>Dra. Claudia Scarpeta</b>, la <b>Dra. Diana Solórzano</b> y el <b>Dr. Ricardo Paredes</b>. Recuerda que es orientativa y no reemplaza una consulta médica profesional. ¿Qué necesitas consultar hoy?`
        }
      ]);
    }

    setIsLoaded(true);
  }, []);

  // Scroll automático en el chat al recibir nuevos mensajes
  useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  // Auxiliar para formatear la hora del recordatorio de 24h a 12h
  const formatReminder = (hora24) => {
    if (!hora24) return;
    const parts = hora24.split(':');
    const hh = parseInt(parts[0]);
    const mm = parts[1];
    const h12 = hh >= 12 
      ? `${hh === 12 ? 12 : hh - 12}:${mm} p.m.` 
      : `${hh === 0 ? 12 : hh}:${mm} a.m.`;
    setFormattedReminderTime(h12);
  };

  // Guardar en localStorage de forma genérica
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Helper para codificar texto a iniciales de nombre para avatares de comunidad
  const getInitials = (name) => {
    return name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
  };

  // Helper para generar hash numérico sutil basado en el nombre para asignar colores consistentes
  const getHashIndex = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h) % COLORS.length;
  };

  // =========================================================
  // ACCIONES DEL USUARIO
  // =========================================================
  
  // Guardar el formulario de Registro
  const guardarRegistro = () => {
    if (!regNombre.trim()) {
      alert('Por favor ingresa tu nombre.');
      return;
    }
    
    const profileData = {
      nombre: regNombre.trim(),
      edad: regEdad,
      hora: regHora,
      pastilla: regPastilla,
      fecha: regFecha,
      duda: regDuda
    };

    localStorage.setItem('serena_profile', JSON.stringify(profileData));
    setUserProfile(profileData);
    formatReminder(regHora);
    setActiveScreen('dashboard');
  };

  // Restablecer datos (Reset/Cerrar sesión) para demostración o re-editar perfil
  const resetearDatos = () => {
    if (confirm('¿Estás segura de que quieres restablecer tu perfil? Esto borrará tus recordatorios y datos locales.')) {
      localStorage.removeItem('serena_profile');
      localStorage.removeItem('serena_last_taken_date');
      localStorage.removeItem('serena_posts');
      localStorage.removeItem('serena_liked_posts');
      localStorage.removeItem('serena_chat_history');
      
      setUserProfile(null);
      setRegNombre('');
      setRegEdad('');
      setRegHora('20:00');
      setRegPastilla('');
      setRegFecha('');
      setRegDuda('');
      setPillTakenToday(false);
      setUserPosts([]);
      setLikedPostIds([]);
      setChatMessages([
        {
          id: 'initial',
          role: 'assistant',
          content: `Hola, estoy aquí para ayudarte. La información que comparto ha sido validada por la <b>Dra. Claudia Scarpeta</b>, la <b>Dra. Diana Solórzano</b> y el <b>Dr. Ricardo Paredes</b>. Recuerda que es orientativa y no reemplaza una consulta médica profesional. ¿Qué necesitas consultar hoy?`
        }
      ]);
      setActiveScreen('landing');
    }
  };

  // Registrar toma diaria
  const registrarToma = () => {
    const todayDateKey = new Date().toISOString().slice(0, 10);
    localStorage.setItem('serena_last_taken_date', todayDateKey);
    setPillTakenToday(true);
  };

  // =========================================================
  // LOGICA DE LA COMUNIDAD
  // =========================================================
  const publicarPost = () => {
    const name = pubName.trim() || 'Anónima';
    const text = pubText.trim();
    if (!text) {
      alert('Por favor escribe tu mensaje.');
      return;
    }
    if (text.length < 5) {
      alert('Tu mensaje es muy corto. ¡Cuéntanos un poco más!');
      return;
    }

    const newPost = {
      id: Date.now().toString() + '_' + Math.random().toString(36).slice(2, 7),
      name: name,
      text: text,
      tag: pubTag, // Usamos el tag seleccionado por el usuario en el formulario
      ts: Date.now(),
      likes: 0
    };

    const updatedPosts = [newPost, ...userPosts];
    setUserPosts(updatedPosts);
    saveToLocalStorage('serena_posts', updatedPosts);

    setPubName('');
    setPubText('');
    setPubTag('Apoyo'); // resetear tag
  };

  const toggleLike = (postId) => {
    let newLikes = [...likedPostIds];
    const isLiked = newLikes.includes(postId);

    const updatedPosts = userPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: Math.max(0, post.likes + (isLiked ? -1 : 1))
        };
      }
      return post;
    });

    if (isLiked) {
      newLikes = newLikes.filter(id => id !== postId);
    } else {
      newLikes.push(postId);
    }

    setLikedPostIds(newLikes);
    setUserPosts(updatedPosts);
    saveToLocalStorage('serena_liked_posts', newLikes);
    saveToLocalStorage('serena_posts', updatedPosts);
  };

  // Lista de publicaciones del Equipo Serena precargadas
  const teamPosts = [
    {
      id: 'team_1',
      name: 'Equipo Serena',
      tag: 'Anuncio',
      isTeam: true,
      text: 'Recordatorio: tomar tu pastilla a la misma hora cada día ayuda a mantener la rutina y la eficacia del método.',
      timeText: 'Hoy · Información general'
    },
    {
      id: 'team_2',
      name: 'Equipo Serena',
      tag: 'Consejo',
      isTeam: true,
      text: '¿Se te olvida tomar la pastilla? Asóciala a algo que ya haces a diario, como lavarte los dientes o poner el cargador del celular.',
      timeText: 'Ayer · Rutinas de toma'
    },
    {
      id: 'team_3',
      name: 'Equipo Serena',
      tag: 'Apoyo',
      isTeam: true,
      text: 'No estás sola. Muchas dudas sobre anticonceptivos son muy comunes y merecen respuestas claras.',
      timeText: 'Hace 2 días'
    },
    {
      id: 'team_4',
      name: 'Equipo Serena',
      tag: 'Anuncio',
      isTeam: true,
      text: 'Antes de seguir consejos de internet, verifica que vengan de una fuente confiable como MedlinePlus o un profesional de salud.',
      timeText: 'Hace 3 días'
    },
    {
      id: 'team_5',
      name: 'Equipo Serena',
      tag: 'Apoyo',
      isTeam: true,
      text: 'Recuerda: si tienes síntomas fuertes o algo te preocupa, consúltalo con un profesional de salud.',
      timeText: 'Hace 4 días'
    }
  ];

  // Agrupar y filtrar posts (los del equipo + los del usuario)
  const allPosts = [...userPosts, ...teamPosts];

  // Aplicar filtro por tag
  const filteredPosts = allPosts.filter(post => {
    if (activeTagFilter === 'Todos') return true;
    return post.tag === activeTagFilter;
  });

  // Renderizar la marca de tiempo de posts de usuario
  const formatTimeAgo = (ts) => {
    const d = Date.now() - ts;
    const m = Math.floor(d / 60000);
    if (m < 1) return 'Ahora mismo';
    if (m < 60) return `Hace ${m} min`;
    const h = Math.floor(m / 60);
    if (h < 24) return `Hace ${h} h`;
    const days = Math.floor(h / 24);
    return `Hace ${days} día${days > 1 ? 's' : ''}`;
  };

  // =========================================================
  // LOGICA DEL CHATBOT
  // =========================================================
  
  // Agregar un mensaje al chat
  const appendChatMessage = (role, content) => {
    const newMsg = {
      id: Date.now().toString() + '_' + Math.random().toString(36).slice(2, 7),
      role,
      content
    };
    
    setChatMessages(prev => {
      const updated = [...prev, newMsg];
      saveToLocalStorage('serena_chat_history', updated);
      return updated;
    });
  };

  // Responder instantáneamente con FAQ médica local
  const responderFAQLocal = (faqIndex) => {
    const faq = FAQS[faqIndex];
    appendChatMessage('user', faq.q);
    
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      // Insertamos la respuesta con disclaimer formateada
      appendChatMessage('assistant', faq.r);
    }, 450);
  };

  // Enviar mensaje de texto libre usando la API de Next.js
  const enviarMensajeLibre = async () => {
    const text = chatInput.trim();
    if (!text || isTyping) return;

    setChatInput('');
    appendChatMessage('user', text);
    
    setIsTyping(true);

    // Limpiamos y preparamos historial para la API de Next.js
    // El backend se encargará de limitar o mapear el historial
    const savedChat = localStorage.getItem('serena_chat_history');
    let history = savedChat ? JSON.parse(savedChat) : [];
    
    // Añadimos el último mensaje manual para garantizar envío correcto
    history.push({ role: 'user', content: text });
    
    // Filtrar para evitar mensajes duplicados seguidos del mismo rol
    const cleanHistory = [];
    for (let i = 0; i < history.length; i++) {
      if (i === 0 || history[i].role !== history[i - 1].role) {
        cleanHistory.push({ role: history[i].role, content: history[i].content });
      }
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: cleanHistory.slice(-15) }) // enviamos los últimos 15 mensajes
      });

      const data = await res.json();
      setIsTyping(false);

      if (!res.ok || !data.text) {
        appendChatMessage('assistant', `Tuve un pequeño inconveniente procesando tu consulta (${data.error || 'error desconocido'}). Por favor, asegúrate de haber configurado tu API Key en el archivo <code>.env.local</code> e inténtalo de nuevo.`);
      } else {
        appendChatMessage('assistant', data.text);
      }
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      appendChatMessage('assistant', 'No se pudo establecer conexión con el servicio de IA de Serena. Verifica tu conexión de red local y que el servidor de desarrollo esté activo.');
    }
  };

  // Filtrar FAQs según el buscador
  const filteredFaqs = FAQS.filter(faq => 
    faq.q.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
    faq.r.toLowerCase().includes(faqSearchQuery.toLowerCase())
  );

  const displayedFaqs = showAllFaqs ? filteredFaqs : filteredFaqs.slice(0, 5);

  // =========================================================
  // INTERFAZ RENDERIZADA
  // =========================================================
  if (!isLoaded) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#FFF8F9', fontFamily: 'sans-serif', color: '#E8547A' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'serif', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Cargando Serena...</h2>
          <p style={{ color: '#8B6A8E', fontSize: '0.9rem' }}>Preparando tu acompañamiento diario 💕</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* NAVEGACIÓN GLOBAL */}
      <nav>
        <div className="nav-logo" onClick={() => setActiveScreen(userProfile ? 'dashboard' : 'landing')} style={{ cursor: 'pointer' }}>Serena</div>
        <div className="nav-links desktop-only">
          <button className={`nav-link ${activeScreen === 'landing' ? 'active' : ''}`} onClick={() => setActiveScreen('landing')}>Inicio</button>
          {userProfile && (
            <button className={`nav-link ${activeScreen === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveScreen('dashboard')}>Mi Panel</button>
          )}
          <button className={`nav-link ${activeScreen === 'chat-screen' ? 'active' : ''}`} onClick={() => setActiveScreen('chat-screen')}>Chat de Apoyo</button>
          <button className={`nav-link ${activeScreen === 'community' ? 'active' : ''}`} onClick={() => setActiveScreen('community')}>Comunidad</button>
          
          {userProfile ? (
            <button className="nav-cta" onClick={resetearDatos} style={{ background: '#8B6A8E' }}>Salir</button>
          ) : (
            <button className="nav-cta" onClick={() => setActiveScreen('register')}>Comenzar</button>
          )}
        </div>

        {/* Botón de Menú Hamburguesa para Móviles */}
        <button className="nav-hamburger" onClick={() => setMobileMenuOpen(true)}>
          ☰
        </button>
      </nav>

      {/* MENÚ LATERAL MÓVIL (DRAWER) */}
      {mobileMenuOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="drawer-box">
            <button className="drawer-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
            <div className="drawer-logo">Serena</div>
            <div className="drawer-links">
              <button className={`drawer-link ${activeScreen === 'landing' ? 'active' : ''}`} onClick={() => { setActiveScreen('landing'); setMobileMenuOpen(false); }}>Inicio</button>
              {userProfile && (
                <button className={`drawer-link ${activeScreen === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveScreen('dashboard'); setMobileMenuOpen(false); }}>Mi Panel</button>
              )}
              <button className={`drawer-link ${activeScreen === 'chat-screen' ? 'active' : ''}`} onClick={() => { setActiveScreen('chat-screen'); setMobileMenuOpen(false); }}>Chat de Apoyo</button>
              <button className={`drawer-link ${activeScreen === 'community' ? 'active' : ''}`} onClick={() => { setActiveScreen('community'); setMobileMenuOpen(false); }}>Comunidad</button>
              
              {userProfile ? (
                <button className="drawer-cta" onClick={() => { resetearDatos(); setMobileMenuOpen(false); }} style={{ background: '#8B6A8E' }}>Salir</button>
              ) : (
                <button className="drawer-cta" onClick={() => { setActiveScreen('register'); setMobileMenuOpen(false); }}>Comenzar</button>
              )}
            </div>
          </div>
        </>
      )}

      {/* PANTALLA: LANDING (INICIO) */}
      <div id="landing" className={`screen ${activeScreen === 'landing' ? 'active' : ''}`}>
        <section className="hero">
          <div className="hero-badge"><span>💊</span> Para mujeres que usan pastillas anticonceptivas</div>
          <h1 className="hero-title">Información segura para <em>entender tu método</em></h1>
          <p className="hero-sub">Acompañamiento digital para mujeres que usan pastillas anticonceptivas, con información <strong>validada por ginecólogos</strong> y basada en <strong>MedlinePlus</strong>.</p>
          <div className="hero-validated">
            <div className="hero-val-item"><span className="hero-val-icon">👩‍⚕️</span><div><strong>Validado por ginecólogos</strong><span>Dra. Scarpeta · Dra. Solórzano · Dr. Paredes</span></div></div>
            <div className="hero-val-divider"></div>
            <div className="hero-val-item"><span className="hero-val-icon">📋</span><div><strong>Basado en MedlinePlus</strong><span>Fuente médica de referencia internacional</span></div></div>
          </div>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => setActiveScreen(userProfile ? 'dashboard' : 'register')}>Comenzar</button>
            {userProfile && (
              <button className="btn-secondary" onClick={() => setActiveScreen('dashboard')}>Ir a mi panel</button>
            )}
          </div>
          <div className="hero-pills">
            <div className="pill">💬 Chat con IA 24/7</div>
            <div className="pill">⏰ Recordatorios diarios</div>
            <div className="pill">👩‍⚕️ Info validada por ginecólogos</div>
            <div className="pill">📋 Basado en MedlinePlus</div>
            <div className="pill">🤝 Comunidad de mujeres</div>
          </div>
        </section>

        <section className="trust-section">
          <p className="section-label">Respaldo médico</p>
          <h2 className="section-title">Información validada por ginecólogos y MedlinePlus</h2>
          <p className="section-sub">Todo el contenido de Serena es revisado por especialistas y basado en fuentes médicas de referencia internacional.</p>
          <div className="trust-doctors">
            <div className="doctor-card"><div className="doctor-avatar">👩‍⚕️</div><div className="doctor-info"><strong>Dra. Claudia Scarpeta</strong><span>Ginecóloga</span></div></div>
            <div className="doctor-card"><div className="doctor-avatar">👩‍⚕️</div><div className="doctor-info"><strong>Dra. Diana Solórzano</strong><span>Ginecóloga</span></div></div>
            <div className="doctor-card"><div className="doctor-avatar">👨‍⚕️</div><div className="doctor-info"><strong>Dr. Ricardo Paredes</strong><span>Ginecólogo</span></div></div>
          </div>
          <div className="trust-source-banner">
            <span className="trust-source-logo">📋</span>
            <div><strong>Basado en MedlinePlus</strong><p>MedlinePlus es un servicio de la Biblioteca Nacional de Medicina de EE.UU., considerada una de las fuentes más confiables de información médica en español.</p></div>
          </div>
          <div className="trust-grid" style={{ marginTop: '1.5rem' }}>
            <div className="trust-card"><div className="trust-icon">🔄</div><h3>Contenido actualizado</h3><p>Revisamos periódicamente la información para mantenerla al día con las recomendaciones médicas vigentes.</p></div>
            <div className="trust-card"><div className="trust-icon">💬</div><h3>Lenguaje claro</h3><p>Explicamos todo en términos sencillos, sin tecnicismos innecesarios, para que puedas entender tu método.</p></div>
            <div className="trust-card"><div className="trust-icon">🔒</div><h3>Tu privacidad primero</h3><p>Tu información es privada y nunca se comparte sin tu consentimiento.</p></div>
          </div>
          <div className="trust-disclaimer-wrap"><p className="trust-disclaimer">⚠️ La información es educativa y no reemplaza una consulta médica profesional.</p></div>
        </section>

        <section className="how-section">
          <p className="section-label">Cómo funciona</p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Simple, claro y a tu ritmo</h2>
          <p className="section-sub">Serena se adapta a tu rutina para que usar tu método anticonceptivo sea más fácil y seguro.</p>
          <div className="steps">
            <div className="step"><div className="step-num">1</div><div className="step-text"><h4>Crea tu cuenta</h4><p>Registra tu nombre, edad y los datos de tu pastilla en pocos minutos.</p></div></div>
            <div className="step"><div className="step-num">2</div><div className="step-text"><h4>Registra tu pastilla y horario</h4><p>Dinos qué pastilla usas y a qué hora la tomas para personalizar tu experiencia.</p></div></div>
            <div className="step"><div className="step-num">3</div><div className="step-text"><h4>Recibe recordatorios</h4><p>Te avisamos cada día a tu hora para que nunca olvides tu toma.</p></div></div>
            <div className="step"><div className="step-num">4</div><div className="step-text"><h4>Consulta el chat cuando tengas dudas</h4><p>Nuestro chat está disponible 24/7 con respuestas inmediatas o de Inteligencia Artificial.</p></div></div>
            <div className="step"><div className="step-num">5</div><div className="step-text"><h4>Participa en la comunidad</h4><p>Un espacio seguro de acompañamiento con otras mujeres.</p></div></div>
            <div className="step"><div className="step-num">6</div><div className="step-text"><h4>Usa tu método con más confianza</h4><p>Entiende mejor tu anticonceptivo y toma decisiones informadas.</p></div></div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button className="btn-primary" onClick={() => setActiveScreen(userProfile ? 'dashboard' : 'register')}>Empezar ahora</button>
          </div>
        </section>

        {/* PIE DE PÁGINA */}
        <footer>
          <div className="footer-inner">
            <div className="footer-logo">Serena</div>
            <div className="footer-tagline">Acompañamiento digital para mujeres que usan pastillas anticonceptivas.</div>
            <div className="footer-grid">
              <div className="footer-col">
                <h5>Producto</h5>
                <span onClick={() => setActiveScreen('chat-screen')}>Chat de apoyo</span>
                <span onClick={() => setActiveScreen('community')}>Comunidad</span>
                {userProfile && <span onClick={() => setActiveScreen('dashboard')}>Recordatorios</span>}
              </div>
              <div className="footer-col">
                <h5>Legal</h5>
                <span>Política de privacidad</span>
                <span>Términos y condiciones</span>
                <span>Aviso de cookies</span>
              </div>
              <div className="footer-col">
                <h5>Contacto</h5>
                <span>hola@serena.app</span>
                <span>Instagram</span>
              </div>
            </div>
            <div className="footer-medical">⚕️ Aviso médico: La información presentada en Serena es de carácter educativo y no reemplaza la consulta con un profesional de salud. Ante cualquier duda médica, consulta a tu ginecólogo o médico de confianza.</div>
            <div className="footer-bottom"><span>© 2026 Serena. Todos los derechos reservados.</span><span>Basado en MedlinePlus</span></div>
          </div>
        </footer>
      </div>

      {/* PANTALLA: REGISTRO */}
      <div id="register" className={`screen ${activeScreen === 'register' ? 'active' : ''}`}>
        <div className="form-screen">
          <div className="form-header"><h2>Bienvenida a Serena 💕</h2><p>Cuéntanos un poco sobre ti para personalizar tu experiencia.</p></div>
          <div className="form-card">
            <div className="form-group">
              <label>Tu nombre</label>
              <input type="text" value={regNombre} onChange={(e) => setRegNombre(e.target.value)} placeholder="¿Cómo te llamas?" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Edad</label>
                <input type="number" value={regEdad} onChange={(e) => setRegEdad(e.target.value)} placeholder="Ej: 24" min="15" max="55" />
              </div>
              <div className="form-group">
                <label>Hora de toma</label>
                <input type="time" value={regHora} onChange={(e) => setRegHora(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Pastilla anticonceptiva que usas</label>
              <select value={regPastilla} onChange={(e) => setRegPastilla(e.target.value)}>
                <option value="">Selecciona o escribe...</option>
                <option value="Slinda">Slinda</option>
                <option value="Microgynon">Microgynon</option>
                <option value="Yasmin">Yasmin</option>
                <option value="Diane 35">Diane 35</option>
                <option value="Cerazette">Cerazette</option>
                <option value="Otra">Otra</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fecha en que empezaste a tomarla</label>
              <input type="date" value={regFecha} onChange={(e) => setRegFecha(e.target.value)} />
            </div>
            <div className="form-group">
              <label>¿Cuál es tu principal duda o necesidad?</label>
              <textarea value={regDuda} onChange={(e) => setRegDuda(e.target.value)} placeholder="Ej: Me olvido seguido de tomarla, o me preocupan los efectos secundarios..."></textarea>
            </div>
            <button className="btn-full" onClick={guardarRegistro}>Guardar y continuar →</button>
            <p className="form-note">🔒 Tu información es privada y se usa solo para personalizar tu experiencia en Serena.</p>
          </div>
        </div>
      </div>

      {/* PANTALLA: DASHBOARD (MI PANEL) */}
      <div id="dashboard" className={`screen ${activeScreen === 'dashboard' ? 'active' : ''}`}>
        <div className="dash-wrap">
          <div className="dash-greeting">
            <h2>Hola, {userProfile?.nombre || 'bienvenida'} 💕</h2>
            <p>{todayString}</p>
          </div>
          
          <div className="reminder-card">
            <div className="reminder-label">Recordatorio de hoy</div>
            <h3>Hoy debes tomar tu pastilla a las {formattedReminderTime}.</h3>
            <div className="reminder-status">
              <div className={`status-dot ${pillTakenToday ? 'done' : ''}`}></div>
              <span className="status-text">{pillTakenToday ? '¡Tomada hoy!' : 'Pendiente'}</span>
            </div>
            
            {!pillTakenToday ? (
              <button className="btn-tome" onClick={registrarToma}>✓ Ya la tomé</button>
            ) : (
              <p className="confirm-msg" style={{ display: 'block' }}>✨ Toma registrada con éxito. Nos vemos mañana a la misma hora.</p>
            )}
          </div>
          
          <div className="dash-grid">
            <div className="dash-card" onClick={() => setActiveScreen('chat-screen')}>
              <div className="dash-card-icon">💬</div>
              <h4>Chat de Apoyo 24/7</h4>
              <p>Resuelve tus dudas con Inteligencia Artificial o preguntas frecuentes.</p>
            </div>
            <div className="dash-card" onClick={() => setActiveScreen('community')}>
              <div className="dash-card-icon">🤝</div>
              <h4>Comunidad</h4>
              <p>Un espacio seguro de acompañamiento y apoyo mutuo.</p>
            </div>
            <div className="dash-card" onClick={() => setActiveScreen('register')}>
              <div className="dash-card-icon">⏰</div>
              <h4>Ajustar perfil</h4>
              <p>Edita tu horario de recordatorio o marca de pastilla.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PANTALLA: CHAT (CHATBOT E INTELIGENCIA ARTIFICIAL) */}
      <div id="chat-screen" className={`screen ${activeScreen === 'chat-screen' ? 'active' : ''}`}>
        <div className="chat-wrap">
          <div className="chat-header">
            <div className="chat-avatar">🌸</div>
            <div className="chat-header-info" style={{ flex: 1 }}>
              <h3>Serena <span className="chat-badge">👩‍⚕️ Info validada</span></h3>
              <p style={{ fontSize: '0.73rem', marginTop: '0.15rem' }}>Dra. Scarpeta · Dra. Solórzano · Dr. Paredes</p>
            </div>
            <button className="header-calendar-btn" onClick={() => setIsModalOpen(true)}>
              📅 Cita
            </button>
          </div>
          
          <div className="chat-messages" style={{ maxHeight: '55vh', minHeight: '380px' }}>
            {chatMessages.map((msg, index) => (
              <div key={msg.id || index} className={`msg ${msg.role === 'user' ? 'msg-user' : 'msg-bot'}`}>
                <div className="msg-name">{msg.role === 'user' ? 'Tú' : 'Serena'}</div>
                <div 
                  className="msg-bubble"
                  dangerouslySetInnerHTML={{ __html: msg.content + (msg.role === 'assistant' && msg.id !== 'initial' ? `<br><br><small style="color:var(--text-soft);font-size:0.78rem">${DISCLAIMER}</small>` : '') }}
                />
              </div>
            ))}

            {isTyping && (
              <div className="msg msg-bot" id="typing-indicator">
                <div className="msg-name">Serena</div>
                <div className="msg-bubble">
                  <div className="typing-dots"><span></span><span></span><span></span></div>
                </div>
              </div>
            )}
            
            <div ref={chatMessagesEndRef} />
          </div>

          {/* BUSCADOR Y LISTA DE FAQS CONDICIONAL */}
          {showFaqPanel && (
            <div className="quick-wrap" style={{ marginTop: '0.8rem', background: '#fff', padding: '1rem', borderRadius: 'var(--r)', border: '1px solid var(--border-light)' }}>
              <div className="quick-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span>Preguntas frecuentes validadas:</span>
                <input 
                  type="text" 
                  placeholder="🔍 Buscar pregunta..." 
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  style={{ width: '180px', padding: '0.35rem 0.65rem', fontSize: '0.78rem', border: '1.5px solid var(--border-light)', borderRadius: '15px' }}
                />
              </div>
              
              <div className="quick-grid" style={{ maxHeight: '140px', overflowY: 'auto', gap: '0.4rem', marginTop: '0.5rem' }}>
                {displayedFaqs.length > 0 ? (
                  displayedFaqs.map((faq, index) => {
                    const originalIndex = FAQS.findIndex(f => f.q === faq.q);
                    return (
                      <button 
                        key={index} 
                        className="quick-btn" 
                        onClick={() => {
                          responderFAQLocal(originalIndex);
                          // Opcionalmente podemos colapsar el menú al responder en móvil
                          if (typeof window !== 'undefined' && window.innerWidth < 600) {
                            setShowFaqPanel(false);
                          }
                        }}
                        disabled={isTyping}
                      >
                        {faq.q}
                      </button>
                    );
                  })
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-soft)', padding: '0.5rem 0' }}>No se encontraron preguntas similares. Escríbela en la caja de abajo libremente 💬</p>
                )}

                {!showAllFaqs && filteredFaqs.length > 5 && (
                  <button className="quick-btn" style={{ fontWeight: 'bold', color: 'var(--rose)', textAlign: 'center' }} onClick={() => setShowAllFaqs(true)}>
                    Ver más preguntas frecuentes ({filteredFaqs.length - 5})...
                  </button>
                )}
                {showAllFaqs && (
                  <button className="quick-btn" style={{ fontWeight: 'bold', color: 'var(--rose)', textAlign: 'center' }} onClick={() => setShowAllFaqs(false)}>
                    Ocultar preguntas extras...
                  </button>
                )}
              </div>
            </div>
          )}

          {/* PILLS DE ACCIÓN RÁPIDA (FLOTANTES) */}
          <div className="chat-pills-bar" style={{ marginTop: '0.8rem' }}>
            <button className={`chat-pill ${showFaqPanel ? 'active' : ''}`} onClick={() => setShowFaqPanel(!showFaqPanel)}>
              {showFaqPanel ? '📖 Ocultar Preguntas' : '🔍 Buscar Preguntas'}
            </button>
            <button className="chat-pill" onClick={limpiarConversacion}>
              🗑️ Limpiar chat
            </button>
          </div>

          {/* CAJA DE ENVIAR MENSAJE */}
          <div className="chat-input-area" style={{ marginTop: '0.5rem' }}>
            <input 
              className="chat-input" 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviarMensajeLibre()}
              placeholder="Escribe tu consulta personalizada aquí..." 
              disabled={isTyping}
            />
            <button className="chat-send" onClick={enviarMensajeLibre} disabled={isTyping || !chatInput.trim()}>
              ↑
            </button>
          </div>
        </div>
      </div>

      {/* PANTALLA: COMUNIDAD */}
      <div id="community" className={`screen ${activeScreen === 'community' ? 'active' : ''}`}>
        <div className="comm-wrap">
          <div className="comm-header"><h2>Comunidad Serena 🤝</h2><p>Un espacio seguro de acompañamiento, apoyo y tranquilidad.</p></div>
          <div className="comm-rules">
            <h4>Normas de nuestra comunidad:</h4>
            <div className="rules-list">
              <span className="rule-tag">💕 Respeto y empatía</span>
              <span className="rule-tag">🔒 Privacidad garantizada</span>
              <span className="rule-tag">🚫 Sin juicios</span>
              <span className="rule-tag">✅ Información verificada</span>
              <span className="rule-tag">🤝 Sin discriminación</span>
            </div>
          </div>
          <div className="comm-disclaimer">ℹ️ Las experiencias compartidas son personales y no reemplazan la orientación de un profesional de salud.</div>

          {/* CREACIÓN DE PUBLICACIONES CON TAGS */}
          <div className="publish-box">
            <h4>✍️ Comparte con la comunidad</h4>
            <div className="form-group" style={{ marginBottom: '0.75rem' }}>
              <input 
                type="text" 
                className="publish-name-input" 
                value={pubName} 
                onChange={(e) => setPubName(e.target.value)} 
                placeholder="Tu nombre o apodo (ej: María, Anónima...)" 
                maxLength={40} 
                style={{ marginBottom: 0 }}
              />
            </div>
            
            {/* SELECTOR DE TAG PARA PUBLICACIÓN */}
            <div className="form-group" style={{ marginBottom: '0.75rem' }}>
              <label style={{ fontSize: '0.78rem', marginBottom: '0.25rem', color: 'var(--text-soft)' }}>Categoría del mensaje:</label>
              <select 
                value={pubTag} 
                onChange={(e) => setPubTag(e.target.value)}
                style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
              >
                <option value="Apoyo">Apoyo 🌸</option>
                <option value="Consejo">Consejo 💡</option>
                <option value="Pregunta">Pregunta ❓</option>
              </select>
            </div>

            <textarea 
              className="publish-textarea" 
              value={pubText}
              onChange={(e) => setPubText(e.target.value)}
              placeholder="Escribe tu experiencia, consejo o mensaje de apoyo..." 
              maxLength={400}
            />
            
            <div className="publish-footer">
              <span className="publish-char">{pubText.length} / 400</span>
              <button className="btn-publish" onClick={publicarPost}>Publicar 💕</button>
            </div>
            <p className="publish-warn">⚠️ No compartas información médica como si fuera consejo profesional. Las experiencias personales no reemplazan la consulta con tu ginecóloga.</p>
          </div>

          {/* FILTRO DE PUBLICACIONES */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-soft)', marginRight: '0.5rem' }}>Filtrar por:</span>
            <div className="rules-list" style={{ display: 'inline-flex', gap: '0.35rem' }}>
              {['Todos', 'Apoyo', 'Consejo', 'Pregunta', 'Anuncio'].map((tagFilter) => (
                <button
                  key={tagFilter}
                  onClick={() => setActiveTagFilter(tagFilter)}
                  style={{
                    background: activeTagFilter === tagFilter ? 'var(--rose)' : '#fff',
                    color: activeTagFilter === tagFilter ? '#fff' : 'var(--fuchsia)',
                    border: '1px solid var(--rose-mid)',
                    padding: '0.35rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.18s'
                  }}
                >
                  {tagFilter === 'Todos' && 'Mostrar Todo'}
                  {tagFilter === 'Apoyo' && 'Apoyo 🌸'}
                  {tagFilter === 'Consejo' && 'Consejos 💡'}
                  {tagFilter === 'Pregunta' && 'Preguntas ❓'}
                  {tagFilter === 'Anuncio' && 'Anuncios 📢'}
                </button>
              ))}
            </div>
          </div>

          <div id="user-posts" style={{ marginBottom: '1.5rem' }}>
            <div className="comm-section-label">Mensajes ({filteredPosts.length})</div>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => {
                const color = COLORS[getHashIndex(post.name)];
                const isLiked = likedPostIds.includes(post.id);
                return (
                  <div key={post.id} className="comm-msg user-post" style={{ marginBottom: '1rem' }}>
                    <div className="comm-msg-head">
                      <div className="comm-avatar" style={{ background: post.isTeam ? 'var(--rose-light)' : color.bg, color: post.isTeam ? 'var(--rose)' : color.c }}>
                        {post.isTeam ? '📢' : getInitials(post.name)}
                      </div>
                      <div className="comm-msg-meta">
                        <strong>
                          {post.name}{' '}
                          <span className={`comm-tag ${post.tag === 'Anuncio' ? 'tag-anuncio' : post.tag === 'Consejo' ? 'tag-consejo' : 'tag-apoyo'}`}>
                            {post.tag}
                          </span>
                        </strong>
                        <span>{post.timeText || formatTimeAgo(post.ts)}</span>
                      </div>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: post.text.replace(/\n/g, '<br>') }} />
                    
                    {!post.isTeam && (
                      <div className="comm-msg-actions">
                        <button className={`btn-like ${isLiked ? 'liked' : ''}`} onClick={() => toggleLike(post.id)}>
                          💕 <span className="like-count">{post.likes}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="comm-empty">Aún no hay publicaciones en esta categoría. ¡Sé la primera en compartir! 💕</div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE AGENDA (WHATSAPP INTEGRADO) */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={(e) => e.target.classList.contains('modal-overlay') && setIsModalOpen(false)}>
        <div className="modal-box">
          <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
          <div className="modal-title">📅 Agendar cita médica</div>
          <div className="modal-sub">Comunícate directamente con nuestros ginecólogos validadores para agendar tu consulta por llamada o chat de WhatsApp.</div>

          {/* DOCTOR: CLAUDIA */}
          <div className="doctor-option">
            <div className="doctor-option-avatar">👩‍⚕️</div>
            <div className="doctor-option-info">
              <strong>Dra. Claudia Scarpeta</strong>
              <span>Ginecóloga · Consulta presencial y virtual</span>
              <span className="doc-phone">📞 +57 312 845 6701</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <a href={`https://wa.me/573128456701?text=Hola%20Dra.%20Claudia%20Scarpeta%2C%20vengo%20desde%20la%20aplicaci%C3%B3n%20Serena%20y%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20para%20agendar%20una%20consulta%20m%C3%A9dica%20contigo.`} target="_blank" rel="noopener noreferrer">
                <button className="btn-call" style={{ background: '#25D366', color: '#fff', width: '100%' }}>WhatsApp 💬</button>
              </a>
              <a href="tel:+573128456701"><button className="btn-call" style={{ width: '100%', padding: '0.35rem' }}>Llamar</button></a>
            </div>
          </div>

          {/* DOCTOR: DIANA */}
          <div className="doctor-option">
            <div className="doctor-option-avatar">👩‍⚕️</div>
            <div className="doctor-option-info">
              <strong>Dra. Diana Solórzano</strong>
              <span>Ginecóloga · Consulta presencial y virtual</span>
              <span className="doc-phone">📞 +57 315 273 9084</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <a href={`https://wa.me/573152739084?text=Hola%20Dra.%20Diana%20Sol%C3%B3rzano%2C%20vengo%20desde%20la%20aplicaci%C3%B3n%20Serena%20y%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20para%20agendar%20una%20consulta%20m%C3%A9dica%20contigo.`} target="_blank" rel="noopener noreferrer">
                <button className="btn-call" style={{ background: '#25D366', color: '#fff', width: '100%' }}>WhatsApp 💬</button>
              </a>
              <a href="tel:+573152739084"><button className="btn-call" style={{ width: '100%', padding: '0.35rem' }}>Llamar</button></a>
            </div>
          </div>

          {/* DOCTOR: RICARDO */}
          <div className="doctor-option">
            <div className="doctor-option-avatar">👨‍⚕️</div>
            <div className="doctor-option-info">
              <strong>Dr. Ricardo Paredes</strong>
              <span>Ginecólogo · Consulta presencial y virtual</span>
              <span className="doc-phone">📞 +57 318 694 2057</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <a href={`https://wa.me/573186942057?text=Hola%20Dr.%20Ricardo%20Paredes%2C%20vengo%20desde%20la%20aplicaci%C3%B3n%20Serena%20y%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20para%20agendar%20una%20consulta%20m%C3%A9dica%20contigo.`} target="_blank" rel="noopener noreferrer">
                <button className="btn-call" style={{ background: '#25D366', color: '#fff', width: '100%' }}>WhatsApp 💬</button>
              </a>
              <a href="tel:+573186942057"><button className="btn-call" style={{ width: '100%', padding: '0.35rem' }}>Llamar</button></a>
            </div>
          </div>

          <p className="modal-disclaimer">⚠️ Los números son de contacto exclusivo para pacientes de Serena. Horario de atención: lunes a viernes 7:00 a.m. – 6:00 p.m.</p>
        </div>
      </div>

    </div>
  );
}
