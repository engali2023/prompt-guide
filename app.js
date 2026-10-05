document.addEventListener('DOMContentLoaded', function() {
    // ====== الثيم ======
    const themeBtn = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) { html.setAttribute('data-theme', savedTheme); themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙'; }
    themeBtn.addEventListener('click', () => {
        const t = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
        themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
    });

    // ====== حجم الخط ======
    const fontBtn = document.getElementById('fontSizeToggle');
    if (localStorage.getItem('largeFont') === 'true') { html.classList.add('large-font'); fontBtn.textContent = 'A+'; }
    fontBtn.addEventListener('click', () => {
        html.classList.toggle('large-font');
        const big = html.classList.contains('large-font');
        localStorage.setItem('largeFont', big);
        fontBtn.textContent = big ? 'A-' : 'A+';
    });

    // ====== الأمثلة ======
    const examples = [
        { cat: "فن رقمي", title: "مدينة سايبربانك", text: "A futuristic cyberpunk city at night, neon lights, holographic advertisements, rain reflections, cinematic lighting, 8K, digital art, masterpiece" },
        { cat: "واقعي", title: "منظر طبيعي", text: "Photorealistic mountain landscape at sunrise, golden hour, mist in valleys, highly detailed, natural colors, 8K UHD, professional photography" },
        { cat: "كرتوني", title: "شخصية مرحّة", text: "Happy alien riding skateboard on Mars, vibrant colors, playful atmosphere, Disney Pixar style, clean lines, bright lighting" },
        { cat: "زيتي", title: "لوحة كلاسيكية", text: "Oil painting of a majestic lion in savanna, golden hour, dramatic brushstrokes, Rembrandt lighting, museum quality, masterpiece" },
        { cat: "خيال علمي", title: "فضاء خارجي", text: "Hyper-detailed space scene with astronauts on alien planet, two moons, purple atmosphere, cinematic lighting, epic scale, concept art" },
        { cat: "طبيعة", title: "بحر استوائي", text: "Crystal clear tropical beach, turquoise water, white sand, palm trees, sunset colors, aerial view, drone photography, 4K" },
        { cat: "عمارة", title: "عمارة حديثة", text: "Modern minimalist architecture, large glass windows, white concrete, natural light, Scandinavian design, architectural photography, 8K" },
        { cat: "خيال", title: "تنين خيالي", text: "Epic fantasy art of a majestic dragon, fire breathing, golden scales, dramatic sky, cinematic composition, high detail, digital painting" },
        { cat: "أطفال", title: "أطفال يلعبون", text: "Happy colorful children playing in a park, sunny day, cartoon style, bright vibrant colors, cheerful atmosphere, Disney animation" },
        { cat: "حيوانات", title: "قطط مرحة", text: "Cute fluffy cat playing with yarn, soft natural lighting, cozy indoor, photorealistic, adorable, warm tones" },
        { cat: "طعام", title: "طعام شهي", text: "Professional food photography of delicious pizza, fresh toppings, cheese pulling, steam rising, restaurant lighting, detailed, 8K" },
        { cat: "احتفالات", title: "حفل زفاف", text: "Elegant wedding scene, beautiful decorations, flowers, golden lighting, romantic atmosphere, professional photography, bokeh, dreamy" },
        { cat: "جبال", title: "جبال مغطاة بالثلوج", text: "Majestic snow-capped mountains in winter, fresh snowfall, blue sky, pine trees, cinematic lighting, epic landscape, 8K UHD" },
        { cat: "داخلي", title: "غرفة معيشة عصرية", text: "Modern cozy living room, warm lighting, comfortable sofa, indoor plants, wooden accents, interior design, natural sunlight, Scandinavian" },
        { cat: "فضاء", title: "رحلة فضائية", text: "Epic spaceship flying through nebula, vibrant colors of deep space, stars, dramatic lighting, sci-fi concept art, cinematic, high detail" },
        { cat: "قلاع", title: "قلعة قديمة", text: "Ancient medieval castle on hill at sunset, dramatic clouds, golden light, epic landscape, fantasy art style, highly detailed, cinematic" },
        { cat: "ربيع", title: "حقل الزهور", text: "Beautiful spring meadow full of wildflowers, cherry blossoms, butterflies, soft sunlight, pastoral landscape, photorealistic, 4K" },
        { cat: "مدينة", title: "مدينة ليلية", text: "Night city skyline with illuminated skyscrapers, reflection on water, blue hour, long exposure, urban scene, cinematic" },
        { cat: "مسرحية", title: "مسرح روماني", text: "Ancient Roman amphitheater at golden hour, dramatic shadows, historical architecture, epic scale, cinematic photography, 8K" },
        { cat: "غابات", title: "غابة مظلمة", text: "Dark mysterious forest with fog, moonlight through trees, mystical atmosphere, eerie green colors, concept art, digital painting" }
    ];

    const container = document.getElementById('examplesList');
    container.innerHTML = examples.map((ex, i) => `
        <div class="example-card">
            <span class="ex-category">${ex.cat}</span>
            <div class="ex-title">${ex.title}</div>
            <div class="ex-text" id="prompt-${i}">${ex.text}</div>
            <button class="copy-btn" onclick="copyPrompt(${i})">نسخ البرومبت</button>
        </div>
    `).join('');

    window.copyPrompt = function(i) {
        const text = document.getElementById(`prompt-${i}`).textContent;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector(`#prompt-${i} + .copy-btn`);
            const orig = btn.textContent;
            btn.textContent = 'تم النسخ!';
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
    const quizData = [
        { q: "ما هو البرومبت؟", options: ["أ. لغة برمجة", "ب. نص وصفي لتوليد الصور", "ج. برنامج رسم", "د. نوع من الخطوط"], a: 1 },
        { q: "ما العنصر الذي يحدد أسلوب الصورة؟", options: ["أ. الإضاءة", "ب. الأسلوب الفني", "ج. الألوان", "د. الأبعاد"], a: 1 },
        { q: "ما الكلمة المهمة لجودة عالية؟", options: ["أ. Ugly", "ب. Professional", "ج. Blurry", "د. Old"], a: 1 },
        { q: "ما اللغة الأفضل لكتابة البرومبت؟", options: ["أ. العربية", "ب. الإنجليزية", "ج. الفرنسية", "د. الإسبانية"], a: 1 },
        { q: "ما الذي يجعل البرومبت أفضل؟", options: ["أ. الاختصار", "ب. الدقة والتفاصيل", "ج. الغموض", "د. الطول الزائد"], a: 1 }
    ];

    let currentQ = 0, score = 0;
    const startBtn = document.getElementById('startQuiz');
    const quizCard = document.querySelector('.quiz-card');
    const questionsDiv = document.getElementById('quizContent');
    const scoreDiv = document.getElementById('quizScore');

    startBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQ = 0; score = 0;
        document.getElementById('quizIntro').classList.add('hidden');
        questionsDiv.classList.remove('hidden');
        scoreDiv.classList.add('hidden');
        showQuestion();
    }

    function showQuestion() {
        const q = quizData[currentQ];
        questionsDiv.innerHTML = `
            <div class="quiz-question">
                <h3>${currentQ + 1}. ${q.q}</h3>
                <div class="options">
                    ${q.options.map((opt, i) => `<button class="option-btn" onclick="checkAnswer(${i})">${opt}</button>`).join('')}
                </div>
            </div>
        `;
    }

    window.checkAnswer = function(selected) {
        const q = quizData[currentQ];
        const btns = document.querySelectorAll('.option-btn');
        btns.forEach(b => b.disabled = true);
        if (selected === q.a) { btns[selected].classList.add('correct'); score++; }
        else { btns[selected].classList.add('wrong'); btns[q.a].classList.add('correct'); }
        setTimeout(() => {
            currentQ++;
            if (currentQ < quizData.length) showQuestion();
            else showScore();
        }, 1500);
    };

    function showScore() {
        questionsDiv.classList.add('hidden');
        scoreDiv.classList.remove('hidden');
        const pct = (score / quizData.length) * 100;
        let msg = pct === 100 ? "ممتاز!" : pct >= 80 ? "أحسنت!" : pct >= 60 ? "جيد!" : "راجع الدليل";
        scoreDiv.innerHTML = `
            <h3>النتيجة</h3>
            <div class="score-display">${score} / ${quizData.length}</div>
            <p>${msg}</p>
            <button onclick="location.reload()" class="btn" style="margin-top:20px;">إعادة</button>
        `;
    }

    function showToast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg; t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2000);
    }
});
