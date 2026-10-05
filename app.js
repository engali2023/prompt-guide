document.addEventListener('DOMContentLoaded', function() {
    // ====== الثيم ======
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) { html.setAttribute('data-theme', savedTheme); themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙'; }
    themeToggle.addEventListener('click', function() {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // ====== حجم الخط ======
    const fontSizeToggle = document.getElementById('fontSizeToggle');
    if (localStorage.getItem('largeFont') === 'true') { html.classList.add('large-font'); fontSizeToggle.textContent = '🔡'; }
    fontSizeToggle.addEventListener('click', function() {
        html.classList.toggle('large-font');
        const isLarge = html.classList.contains('large-font');
        localStorage.setItem('largeFont', isLarge);
        fontSizeToggle.textContent = isLarge ? '🔡' : '🔤';
    });

    // ====== الأمثلة ======
    const examples = [
        { cat: "🎨 فن رقمي", title: "مدينة سايبربانك", text: "A futuristic cyberpunk city at night, neon lights, holographic advertisements, rain reflections, cinematic lighting, 8K, digital art, masterpiece" },
        { cat: "📸 واقعي", title: "منظر طبيعي واقعي", text: "Photorealistic mountain landscape at sunrise, golden hour, mist in valleys, highly detailed, natural colors, 8K UHD, professional photography" },
        { cat: "🎬 كرتوني", title: "شخصية كرتونية مرحة", text: "Happy alien riding skateboard on Mars, vibrant colors, playful atmosphere, Disney Pixar style, clean lines, bright lighting" },
        { cat: "🖼️ زيتي", title: "لوحة كلاسيكية", text: "Oil painting of a majestic lion in savanna, golden hour, dramatic brushstrokes, Rembrandt lighting, museum quality, masterpiece" },
        { cat: "⚡ خيال علمي", title: "فضاء خارجي", text: "Hyper-detailed space scene with astronauts on alien planet, two moons, purple atmosphere, cinematic lighting, epic scale, concept art" },
        { cat: "🏖️ طبيعة", title: "بحر استوائي", text: "Crystal clear tropical beach, turquoise water, white sand, palm trees, sunset colors, aerial view, drone photography, 4K" },
        { cat: "🏛️ عمارة", title: "عمارة حديثة", text: "Modern minimalist architecture, large glass windows, white concrete, natural light, Scandinavian design, architectural photography, 8K" },
        { cat: "🐉 خيال", title: "تنين خيالي", text: "Epic fantasy art of a majestic dragon, fire breathing, golden scales, dramatic sky, cinematic composition, high detail, digital painting" },
        { cat: "👶 أطفال", title: "أطفال يلعبون", text: "Happy colorful children playing in a park, sunny day, cartoon style, bright vibrant colors, cheerful atmosphere, Disney animation" },
        { cat: "🐾 حيوانات", title: "قطط مرحة", text: "Cute fluffy cat playing with yarn, soft natural lighting, cozy indoor, photorealistic, adorable, warm tones" },
        { cat: "🍕 طعام", title: "طعام شهي", text: "Professional food photography of delicious pizza, fresh toppings, cheese pulling, steam rising, restaurant lighting, detailed, 8K" },
        { cat: "🎉 احتفالات", title: "حفل زفاف", text: "Elegant wedding scene, beautiful decorations, flowers, golden lighting, romantic atmosphere, professional photography, bokeh, dreamy" },
        { cat: "🌊 جبال", title: "جبال مغطاة بالثلوج", text: "Majestic snow-capped mountains in winter, fresh snowfall, blue sky, pine trees, cinematic lighting, epic landscape, 8K UHD" },
        { cat: "🏠 داخلي", title: "غرفة معيشة عصرية", text: "Modern cozy living room, warm lighting, comfortable sofa, indoor plants, wooden accents, interior design, natural sunlight, Scandinavian" },
        { cat: "🚀 فضاء", title: "رحلة فضائية", text: "Epic spaceship flying through nebula, vibrant colors of deep space, stars, dramatic lighting, sci-fi concept art, cinematic, high detail" },
        { cat: "🏰 قلاع", title: "قلعة قديمة", text: "Ancient medieval castle on hill at sunset, dramatic clouds, golden light, epic landscape, fantasy art style, highly detailed, cinematic" },
        { cat: "🌸 ربيع", title: "حقل الزهور", text: "Beautiful spring meadow full of wildflowers, cherry blossoms, butterflies, soft sunlight, pastoral landscape, photorealistic, 4K" },
        { cat: "🏙️ مدينة", title: "مدينة ليلية", text: "Night city skyline with illuminated skyscrapers, reflection on water, blue hour, long exposure, urban scene, cinematic" },
        { cat: "🎭 مسرحية", title: "مسرح روماني", text: "Ancient Roman amphitheater at golden hour, dramatic shadows, historical architecture, epic scale, cinematic photography, 8K" },
        { cat: "🌳 غابات", title: "غابة مظلمة", text: "Dark mysterious forest with fog, moonlight through trees, mystical atmosphere, eerie green colors, concept art, digital painting" }
    ];

    const examplesContainer = document.getElementById('examplesList');
    examplesContainer.innerHTML = examples.map((ex, i) => `
        <div class="example-item">
            <span class="ex-category">${ex.cat}</span>
            <div class="ex-title">${ex.title}</div>
            <div class="ex-text" id="prompt-${i}">${ex.text}</div>
            <button class="copy-btn" onclick="copyPrompt(${i})">📋 نسخ البرومبت</button>
        </div>
    `).join('');

    window.copyPrompt = function(i) {
        const text = document.getElementById(`prompt-${i}`).textContent;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector(`#prompt-${i} + .copy-btn`);
            const orig = btn.textContent;
            btn.textContent = '✅ تم!';
            btn.style.background = '#28a745'; btn.style.color = 'white';
            showToast('تم نسخ البرومبت بنجاح!');
            setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 2000);
        }).catch(() => {
            const ta = document.createElement('textarea'); ta.value = text;
            document.body.appendChild(ta); ta.select(); document.execCommand('copy');
            document.body.removeChild(ta); showToast('تم النسخ!');
        });
    };

    // ====== الاختبار ======
    const quizQuestions = [
        { q: "ما هو البرومبت؟", options: ["أ. لغة برمجة", "ب. نص وصفي للذكاء الاصطناعي", "ج. برنامج للرسم", "د. نوع من الخطوط"], answer: 1 },
        { q: "ما العنصر الذي يحدد أسلوب الصورة؟", options: ["أ. الإضاءة", "ب. الأسلوب الفني", "ج. الألوان", "د. الأبعاد"], answer: 1 },
        { q: "ما الكلمة المهمة لجودة عالية في البرومبت؟", options: ["أ. Ugly", "ب. Professional", "ج. Blurry", "د. Old"], answer: 1 },
        { q: "أي لغة أفضل لكتابة البرومبت للحصول على نتائج أفضل؟", options: ["أ. العربية", "ب. الإنجليزية", "ج. الفرنسية", "د. الإسبانية"], answer: 1 },
        { q: "ما الذي يجعل البرومبت أفضل؟", options: ["أ. الاختصار", "ب. الدقة والتفاصيل", "ج. الغموض", "د. الطول الزائد"], answer: 1 }
    ];

    let currentQuestion = 0;
    let score = 0;

    const startBtn = document.getElementById('startQuizBtn');
    const quizIntro = document.getElementById('quizIntro');
    const quizContent = document.getElementById('quizContent');
    const quizResult = document.getElementById('quizResult');

    startBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQuestion = 0; score = 0;
        quizIntro.classList.add('hidden');
        quizContent.classList.remove('hidden');
        quizResult.classList.add('hidden');
        showQuestion();
    }

    function showQuestion() {
        const q = quizQuestions[currentQuestion];
        quizContent.innerHTML = `
            <div class="quiz-question">
                <h3>${currentQuestion + 1}. ${q.q}</h3>
                <div class="options">
                    ${q.options.map((opt, i) => `<button class="option-btn" onclick="checkAnswer(${i})">${opt}</button>`).join('')}
                </div>
            </div>
        `;
    }

    window.checkAnswer = function(selected) {
        const q = quizQuestions[currentQuestion];
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.disabled = true);
        
        if (selected === q.answer) {
            buttons[selected].classList.add('correct');
            score++;
        } else {
            buttons[selected].classList.add('wrong');
            buttons[q.answer].classList.add('correct');
        }

        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 1500);
    };

    function showResult() {
        quizContent.classList.add('hidden');
        quizResult.classList.remove('hidden');
        const percentage = (score / quizQuestions.length) * 100;
        let message = "";
        if (percentage === 100) message = "🎉 ممتاز! أنت خبير حقيقي!";
        else if (percentage >= 80) message = "👏 أحسنت! لديك معرفة جيدة جداً.";
        else if (percentage >= 60) message = "👍 جيد! استمر في التعلم.";
        else message = "📚 أنصحك بقراءة الدليل مرة أخرى.";

        quizResult.innerHTML = `
            <h3>نتيجتك</h3>
            <div class="quiz-score">${score} / ${quizQuestions.length}</div>
            <p>${message}</p>
            <button onclick="location.reload()" class="btn-primary mt-2" style="margin-top:20px;">إعادة الاختبار</button>
        `;
    }

    function showToast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg; t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2000);
    }
});
