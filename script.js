document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del Modal y al nuevo Overlay de Audio
    const modal = document.getElementById('modal');
    const cerrarModalBtn = document.querySelector('.cerrar-modal');
    const modalImagen = document.getElementById('modalImagen');
    const modalFrase = document.getElementById('modalFrase');
    const audioOverlay = document.getElementById('audioOverlay'); // Overlay de audio

    // --- Configuración de Tone.js para la Música (Melodía de Piano MUY Romántica y de Acordes) ---
    let loop = null;

    // Función que inicializa y reproduce el audio
    function iniciarMusica() {
        // Detiene la función si ya está corriendo para evitar duplicados
        if (Tone.Transport.state !== 'stopped') return;
        
        console.log("Iniciando motor de audio con melodía MÁS ROMÁNTICA...");

        // 1. Efectos: Reverb más largo y Delay sutil para un ambiente de ensueño
        const delay = new Tone.FeedbackDelay("8n", 0.3).toDestination();
        const reverb = new Tone.Reverb({
            decay: 4.0, // Cola de reverberación más larga
            wet: 0.6 
        }).chain(delay, Tone.Destination);

        // 2. Crear un PolySynth para tocar acordes (sonido de Rhodes/Piano Eléctrico suave)
        // Usamos PolySynth porque tocará varios tonos a la vez (los acordes)
        const synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "triangle" // Onda triangular para un sonido cálido y menos percusivo
            },
            envelope: {
                attack: 0.5, // Ataque muy suave (legato)
                decay: 1.5,
                sustain: 0.7,
                release: 4.0 // Liberación larga para que el sonido se desvanezca
            }
        }).chain(reverb); 

        // Reducimos el volumen general para que sea música de fondo
        Tone.Destination.volume.value = -15; // Más bajo aún

        // 3. Secuencia de Acordes (Progresión Romántica I-vi-IV-V en Do Mayor)
        // Cmaj7 -> Am7 -> Fmaj7 -> G7. Se usa Tone.Part para una estructura musical clara.
        const chordProgression = [
            // Cmaj7 (Tónica) - Profundo y estable
            { time: 0, chord: ["C4", "E4", "G4", "B4"], duration: "1.5m" }, // Dura 1.5 medidas

            // Am7 (Relativo menor) - Toque de melancolía dulce
            { time: "1.5m", chord: ["A3", "C4", "E4", "G4"], duration: "0.5m" }, // Dura 0.5 medidas

            // Fmaj7 (Subdominante) - Elevación emocional
            { time: "2m", chord: ["F4", "A4", "C5", "E5"], duration: "1m" }, // Dura 1 medida

            // G7 (Dominante) - Tensión que resuelve
            { time: "3m", chord: ["G3", "B3", "D4", "F4"], duration: "1m" }, // Dura 1 medida
        ];
        
        // 4. Crear el Part (la secuencia principal)
        if (loop) loop.dispose();
        
        loop = new Tone.Part((time, value) => {
            synth.triggerAttackRelease(
                value.chord, 
                value.duration, 
                time, 
                0.8 // Velocidad
            ); 
        }, chordProgression);

        loop.loop = true; // Hacer que el patrón se repita
        loop.loopEnd = "4m"; // La secuencia dura 4 medidas
        loop.start(0);

        // 5. Iniciar el motor de tiempo
        Tone.Transport.bpm.value = 70; // BPM muy lento y romántico
        Tone.Transport.start();
        console.log("Música de fondo MÁS ROMÁNTICA iniciada.");

        // 6. Ocultar el overlay
        audioOverlay.classList.add('hidden');
        document.body.removeEventListener('click', iniciarMusica);
    }

    // Se necesita interacción del usuario (el primer clic/tap) para iniciar el audio.
    // El overlay maneja este primer clic y llama a iniciarMusica
    audioOverlay.addEventListener('click', iniciarMusica, { once: true });
    
    // Si la persona hace clic en cualquier lugar (aunque no sea el overlay), también funciona como fallback
    document.body.addEventListener('click', iniciarMusica, { once: true });


    // --- Datos de la Galería (Cumplidos para Ella) ---
    const perritosData = [
        // Mantienes tus datos originales con el nombre "Fernanda" incluido
        { 
            nombre: "Fernanda, Eres Hermosa", 
            raza: "Mi Universo", 
            descripcion: "Tu belleza es tan única que ilumina todo a tu alrededor.", 
            imagen: "img/perrito_1.jpg", 
            likes: 15, 
            frase: "Fernanda, Tu belleza va mucho más allá de lo que ven mis ojos; reside en la bondad de tu alma y en la forma mágica en que haces que el mundo parezca un lugar mejor, simplemente existiendo." 
        },
        { 
            nombre: "Fernanda, Tu Sonrisa", 
            raza: "Mi Tesoro", 
            descripcion: "La razón más dulce y pura de mi felicidad diaria.", 
            imagen: "img/perrito_2.jpg", 
            likes: 22, 
            frase: "Fernanda, Cuando sonríes, el tiempo se detiene y todos mis problemas se disuelven. Es mi refugio, mi dosis diaria de alegría, y el sonido más dulce que he escuchado jamás." 
        },
        { 
            nombre: "Fernanda, Tu Inteligencia", 
            raza: "Mi Guía", 
            descripcion: "Admiro la forma brillante en que resuelves la vida.", 
            imagen: "img/perrito_3.jpg", 
            likes: 8, 
            frase: "Fernanda, Tu mente es un laberinto fascinante y brillante. Me encanta la profundidad de tus pensamientos, tu curiosidad insaciable y la forma en que me enseñas algo nuevo cada día sin siquiera intentarlo." 
        },
        { 
            nombre: "Fernanda, Tu Calidez", 
            raza: "Mi Hogar", 
            descripcion: "Estar a tu lado es encontrar la paz y la certeza.", 
            imagen: "img/perrito_4.jpg", 
            likes: 30, 
            frase: "Fernanda, La calidez que emana de ti es mi verdadero hogar. No importa dónde estemos, si estoy contigo, siento que he llegado al lugar donde pertenezco. Eres mi paz y mi certeza." 
        },
        { 
            nombre: "Fernanda, Tu Espíritu", 
            raza: "Mi Admiración", 
            descripcion: "Tienes un alma gentil que inspira a todos los que te rodean.", 
            imagen: "img/perrito_5.jpg", 
            likes: 12, 
            frase: "Fernanda, Admiro profundamente la fuerza silenciosa de tu espíritu. Eres resiliente, apasionada y la forma en que enfrentas la vida con tanta gracia me inspira a ser una mejor persona." 
        },
        { 
            nombre: "Fernanda, Tu Corazón", 
            raza: "Mi Fortuna", 
            descripcion: "El más puro y bondadoso que he tenido la suerte de conocer.", 
            imagen: "img/perrito_6.jpg", 
            likes: 19, 
            frase: "Fernanda, Tienes el corazón más grande y generoso que existe. La manera en que cuidas de los demás y tu capacidad de amar incondicionalmente son un regalo invaluable que atesoro cada día." 
        },
        { 
            nombre: "Fernanda, Tu Esencia", 
            raza: "Mi Milagro", 
            descripcion: "Simplemente, eres la mejor parte de mi vida.", 
            imagen: "img/perrito_7.jpg", 
            likes: 25, 
            frase: "Fernanda, No hay nadie más en el mundo como tú. Tu esencia, tu energía, tus peculiaridades; todo en conjunto es la mezcla perfecta que me hace sentir la persona más afortunada de este planeta." 
        },
        { 
            nombre: "Fernanda, Tu Magia", 
            raza: "Mi Sueño", 
            descripcion: "Todo lo que tocas se convierte en algo maravilloso.", 
            imagen: "img/perrito_8.jpg", 
            likes: 18, 
            frase: "Fernanda, Hay una magia sutil en la forma en que transformas lo ordinario en extraordinario. Estar a tu lado es vivir en un cuento de hadas donde cada día es una nueva aventura llena de luz." 
        },
        { 
            nombre: "Fernanda, Tu Ternura", 
            raza: "Mi Amor", 
            descripcion: "Tu presencia me llena de calma y alegría.", 
            imagen: "img/perrito_9.jpg", 
            likes: 35, 
            frase: "Fernanda, Tu ternura es el ancla que me mantiene firme. Es ese pequeño gesto cariñoso o esa mirada dulce que me recuerda que el amor es el motor más poderoso del universo." 
        },
        { 
            nombre: "Fernanda, Eres Perfecta", 
            raza: "Mi Todo", 
            descripcion: "En todos tus detalles, eres la persona ideal.", 
            imagen: "img/perrito_10.jpg", 
            likes: 10, 
            frase: "Fernanda, Para mí, la perfección no es la ausencia de fallos, sino la maravillosa y completa persona que eres. Acepto y amo cada parte de ti. Eres, y siempre serás, mi todo." 
        }
    ];

    const galeria = document.getElementById('galeriaPerritos');

    // --- Funciones del Modal ---

    function abrirModal(perro) {
        modalImagen.src = perro.imagen;
        modalFrase.textContent = perro.frase; 
        modal.classList.add('visible'); 
    }

    function cerrarModal() {
        modal.classList.remove('visible');
    }

    cerrarModalBtn.addEventListener('click', cerrarModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // --- Funciones de la Galería ---

    function crearTarjeta(perro) {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-perro');

        tarjeta.innerHTML = `
            <div class="imagen-contenedor">
                <img src="${perro.imagen}" alt="Perrito ${perro.nombre}">
            </div>
            <div class="info">
                <h2 class="nombre">${perro.nombre} (${perro.raza})</h2>
                <p class="descripcion">${perro.descripcion}</p>
                <button class="boton-like" data-liked="false">
                    <i class="far fa-heart"></i> <span class="contador">${perro.likes}</span> Likes
                </button>
            </div>
        `;
        
        tarjeta.addEventListener('click', (event) => {
            if (!event.target.closest('.boton-like')) {
                abrirModal(perro);
            }
        });

        const botonLike = tarjeta.querySelector('.boton-like');
        botonLike.addEventListener('click', manejarLike);

        return tarjeta;
    }

    // Carga todos los perritos en la galería
    function cargarPerritos() {
        galeria.innerHTML = ''; 
        perritosData.forEach(perro => {
            galeria.appendChild(crearTarjeta(perro));
        });
    }

    function manejarLike(event) {
        event.stopPropagation(); 
        
        const boton = event.currentTarget;
        const contadorSpan = boton.querySelector('.contador');
        const icono = boton.querySelector('i');
        let likes = parseInt(contadorSpan.textContent);
        let liked = boton.getAttribute('data-liked') === 'true';

        if (liked) {
            likes--;
            icono.classList.remove('fas');
            icono.classList.add('far');
            boton.classList.remove('liked');
            boton.setAttribute('data-liked', 'false');
        } else {
            likes++;
            icono.classList.remove('far');
            icono.classList.add('fas'); 
            boton.classList.add('liked');
            boton.setAttribute('data-liked', 'true');
        }

        contadorSpan.textContent = likes;
    }

    // Inicialización al cargar la página
    cargarPerritos();
});