document.addEventListener('DOMContentLoaded', function() {
    // ====== الثيم (نهاري/ليلي) ======
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
    themeToggle.addEventListener('click', function() {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // ====== تكبير الخط ======
    const fontSizeToggle = document.getElementById('fontSizeToggle');
    if (localStorage.getItem('largeFont') === 'true') {
        html.classList.add('large-font');
        fontSizeToggle.textContent = '🔡';
    }
    fontSizeToggle.addEventListener('click', function() {
        html.classList.toggle('large-font');
        const isLarge = html.classList.contains('large-font');
        localStorage.setItem('largeFont', isLarge);
        fontSizeToggle.textContent = isLarge ? '🔡' : '🔤';
    });

    // ====== أمثلة البرومبتات ======
    const examples = [
        { category: "🎨 فن رقمي", title: "مدينة سايبربانك", text: "A futuristic cyberpunk city at night, neon lights, holographic advertisements, rain reflections on the streets, dramatic lighting, highly detailed, 8K resolution, digital art style" },
        { category: "📸 واقعي", title: "منظر طبيعي واقعي", text: "A photorealistic image of a beautiful mountain landscape at sunrise, golden hour lighting, mist covering the valleys, highly detailed, natural colors, 8K UHD, professional photography" },
        { category: "🎬 كرتوني", title: "شخصية كرتونية مرحة", text: "Cartoon style illustration of a happy alien riding a skateboard on Mars, vibrant colors, playful atmosphere, Disney Pixar style, clean lines, bright lighting" },
        { category: "🖼️ زيتي", title: "لوحة كلاسيكية", text: "An oil painting of a majestic lion in the savanna at golden hour, warm tones, dramatic brushstrokes, Rembrandt lighting, museum quality, masterpiece" },
        { category: "⚡ خيال علمي", title: "فضاء خارجي", text: "A hyper-detailed space scene with astronauts exploring an alien planet, two moons in the sky, purple atmosphere, cinematic lighting, epic scale, concept art" },
        { category: "🏖️ طبيعة", title: "بحر استوائي", text: "Crystal clear tropical beach with turquoise water, white sand, palm trees swaying in the breeze, sunset colors, aerial view, drone photography style, 4K" },
        { category: "🏛️ عمارة", title: "عمارة حديثة", text: "Modern minimalist architecture with large glass windows, white concrete, natural light, Scandinavian design, architectural photography, clean lines, 8K" },
        { category: "🐉 خيال", title: "تنين خيالي", text: "Epic fantasy art of a majestic dragon flying over ancient ruins, fire breathing, golden scales, dramatic sky with clouds, cinematic composition, high detail, digital painting" },
        { category: "👶 أطفال", title: "أطفال يلعبون", text: "Happy colorful children playing in a park on a sunny day, cartoon style, bright vibrant colors, cheerful atmosphere, Disney animation style" },
        { category: "🐾 حيوانات", title: "قطط مرحة", text: "Cute fluffy cat playing with a ball of yarn, soft natural lighting, cozy indoor setting, photorealistic, adorable, warm tones" },
        { category: "🍕 طعام", title: "طعام شهي", text: "Professional food photography of a delicious pizza with fresh toppings, mozzarella cheese pulling, steam rising, warm restaurant lighting, highly detailed, 8K" },
        { category: "🎉 احتفالات", title: "حفل زفاف", text: "Elegant wedding scene with beautiful decorations, flowers, golden lighting, romantic atmosphere, professional photography, bokeh effect, dreamy" },
        { category: "🌊 جبال", title: "جبال مغطاة بالثلوج", text: "Majestic snow-capped mountains in winter, fresh snowfall, blue sky, pine trees, cinematic lighting, epic landscape photography, 8K UHD" },
        { category: "🏠 داخلي", title: "غرفة معيشة عصرية", text: "Modern cozy living room with warm lighting, comfortable sofa, indoor plants, wooden accents, interior design, natural sunlight, Scandinavian style" },
        { category: "🚀 فضاء", title: "رحلة فضائية", text: "Epic spaceship flying through a nebula, vibrant colors of deep space, stars, dramatic lighting, sci-fi concept art, cinematic composition, high detail" },
        { category: "🏰 قلاع", title: "قلعة قديمة", text: "Ancient medieval castle on a hill at sunset, dramatic clouds, golden light, epic landscape, fantasy art style, highly detailed, cinematic" },
        { category: "🌸 ربيع", title: "حقل الزهور", text: "Beautiful spring meadow full of colorful wildflowers, cherry blossoms, butterflies, soft sunlight, pastoral landscape, photorealistic, 4K" },
        { category: "🏙️ مدينة", title: "مدينة ليلية", text: "Night city skyline with illuminated skyscrapers, reflection on water, blue hour, long exposure photography, urban scene, cinematic" },
        { category: "🎭 مسرحية", title: "مسرح روماني", text: "Ancient Roman amphitheater at golden hour, dramatic shadows, historical architecture, epic scale, cinematic photography, 8K" },
        { category: "🌳 غابات", title: "غابة مظلمة", text: "Dark mysterious forest with fog, moonlight filtering through trees, mystical atmosphere, eerie green colors, concept art, digital painting" }
    ];

    const examplesContainer = document.getElementById('examplesList');
    examplesContainer.innerHTML = examples.map((ex, i) => `
        <div class="example-card">
            <span class="example-category">${ex.category}</span>
            <div class="example-title">${ex.title}</div>
            <div class="example-text" id="prompt-${i}">${ex.text}</div>
            <button class="copy-btn" onclick="copyPrompt(${i})">📋 نسخ البرومبت</button>
        </div>
    `).join('');

    // ====== نسخ البرومبت ======
    window.copyPrompt = function(i) {
        const text = document.getElementById(`prompt-${i}`).textContent;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector(`#prompt-${i} + .copy-btn`);
            const orig = btn.textContent;
            btn.textContent = '✅ تم النسخ!';
            btn.classList.add('copied');
            showToast('تم نسخ البرومبت بنجاح!');
            setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = text; document.body.appendChild(ta);
            ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
            showToast('تم نسخ البرومبت بنجاح!');
        });
    };

    // ====== Toast ======
    function showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
});
