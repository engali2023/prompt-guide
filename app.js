document.addEventListener('DOMContentLoaded', function() {
    // ====== إدارة الثيم (نهاري/ليلي) ======
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // التحقق من الثيم المحفوظ
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        themeToggle.querySelector('.icon').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.querySelector('.icon').textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // ====== تكبير الخط ======
    const fontSizeToggle = document.getElementById('fontSizeToggle');
    const isLargeFont = localStorage.getItem('largeFont') === 'true';
    
    if (isLargeFont) {
        html.classList.add('large-font');
        fontSizeToggle.querySelector('.icon').textContent = '🔡';
    }

    fontSizeToggle.addEventListener('click', function() {
        html.classList.toggle('large-font');
        const isLarge = html.classList.contains('large-font');
        localStorage.setItem('largeFont', isLarge);
        fontSizeToggle.querySelector('.icon').textContent = isLarge ? '🔡' : '🔤';
    });

    // ====== أمثلة البرومبتات ======
    const promptExamples = [
        {
            category: "🎨 فن رقمي",
            title: "مدينة مستقبلية سايبربانك",
            text: "A futuristic cyberpunk city at night, neon lights, holographic advertisements, rain reflections on the streets, dramatic lighting, highly detailed, 8K resolution, digital art style"
        },
        {
            category: "📸 واقعي",
            title: "صورة طبيعية واقعية",
            text: "A photorealistic image of a beautiful mountain landscape at sunrise, golden hour lighting, mist covering the valleys, highly detailed, natural colors, 8K UHD, professional photography"
        },
        {
            category: "🎬 كرتوني",
            title: "شخصيات كرتونية مرحة",
            text: "Cartoon style illustration of a happy alien riding a skateboard on Mars, vibrant colors, playful atmosphere, Disney Pixar style, clean lines, bright lighting"
        },
        {
            category: "🖼️ زيتي",
            title: "لوحة كلاسيكية",
            text: "An oil painting of a majestic lion in the savanna at golden hour, warm tones, dramatic brushstrokes, Rembrandt lighting, museum quality, masterpiece"
        },
        {
            category: "⚡ خيال علمي",
            title: "فضاء خارجي",
            text: "A hyper-detailed space scene with astronauts exploring an alien planet, two moons in the sky, purple atmosphere, cinematic lighting, epic scale, concept art"
        },
        {
            category: "🏖️ طبيعة",
            title: "بحر استوائي",
            text: "Crystal clear tropical beach with turquoise water, white sand, palm trees swaying in the breeze, sunset colors, aerial view, drone photography style, 4K"
        },
        {
            category: "🏛️ عمارة",
            title: "عمارة حديثة",
            text: "Modern minimalist architecture with large glass windows, white concrete, natural light, Scandinavian design, architectural photography, clean lines, 8K"
        },
        {
            category: "🐉 خيال",
            title: "تنين خيالي",
            text: "Epic fantasy art of a majestic dragon flying over ancient ruins, fire breathing, golden scales, dramatic sky with clouds, cinematic composition, high detail, digital painting"
        }
    ];

    const examplesContainer = document.getElementById('examplesList');
    
    examplesContainer.innerHTML = promptExamples.map((example, index) => `
        <div class="example-card">
            <span class="example-category">${example.category}</span>
            <div class="example-title">${example.title}</div>
            <div class="example-text" id="prompt-${index}">${example.text}</div>
            <button class="copy-btn" onclick="copyPrompt(${index})">📋 نسخ البرومبت</button>
        </div>
    `).join('');

    // ====== نسخ البرومبت ======
    window.copyPrompt = function(index) {
        const text = document.getElementById(`prompt-${index}`).textContent;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector(`#prompt-${index} + .copy-btn`);
            const originalText = btn.textContent;
            btn.textContent = '✅ تم النسخ!';
            btn.classList.add('copied');
            showToast('تم نسخ البرومبت بنجاح!');
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('copied');
            }, 2000);
        }).catch(() => {
            // طريقة بديلة
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast('تم نسخ البرومبت بنجاح!');
        });
    };

    // ====== Toast ======
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
});
