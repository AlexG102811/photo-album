\<\!DOCTYPE html\>  
\<html lang="en" class="dark"\>  
\<head\>  
    \<meta charset="UTF-8"\>  
    \<meta name="viewport" content="width=device-width, initial-scale=1.0"\>  
    \<title\>ALEX.dev | Gaming Portfolio & Web Dev\</title\>  
      
    \<\!-- Tailwind CSS CDN \--\>  
    \<script src="https://cdn.tailwindcss.com"\>\</script\>  
    \<script\>  
        tailwind.config \= {  
            darkMode: 'class',  
            theme: {  
                extend: {  
                    colors: {  
                        cyber: {  
                            cyan: '\#00f0ff',  
                            purple: '\#a855f7',  
                            pink: '\#ec4899',  
                            emerald: '\#10b981',  
                            dark: '\#070913',  
                            panel: '\#0f172a',  
                            border: '\#1e293b'  
                        }  
                    },  
                    fontFamily: {  
                        sans: \['Inter', 'sans-serif'\],  
                        mono: \['JetBrains Mono', 'monospace'\],  
                        gamer: \['Rajdhani', 'sans-serif'\]  
                    }  
                }  
            }  
        }  
    \</script\>  
      
    \<\!-- Google Fonts \--\>  
    \<link rel="preconnect" href="https://fonts.googleapis.com"\>  
    \<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin\>  
    \<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800\&family=JetBrains+Mono:wght@400;600\&family=Rajdhani:wght@600;700;800\&display=swap" rel="stylesheet"\>  
      
    \<\!-- Font Awesome Icons \--\>  
    \<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"\>

    \<\!-- Firebase SDK (Optional Cloud Persistence) \--\>  
    \<script type="module"\>  
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";  
        import { getAuth, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";  
        import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        const appId \= typeof \_\_app\_id \!== 'undefined' ? \_\_app\_id : 'alex-portfolio-app';  
        let db \= null;  
        let auth \= null;  
        let currentUser \= null;

        if (typeof \_\_firebase\_config \!== 'undefined') {  
            try {  
                const firebaseConfig \= JSON.parse(\_\_firebase\_config);  
                const app \= initializeApp(firebaseConfig);  
                db \= getFirestore(app);  
                auth \= getAuth(app);  
            } catch (err) {  
                console.error("Storage setup error:", err);  
            }  
        }

        async function initAuthAndFirestore() {  
            if (\!auth || \!db) return;  
            try {  
                if (typeof \_\_initial\_auth\_token \!== 'undefined' && \_\_initial\_auth\_token) {  
                    const cred \= await signInWithCustomToken(auth, \_\_initial\_auth\_token);  
                    currentUser \= cred.user;  
                } else {  
                    const cred \= await signInAnonymously(auth);  
                    currentUser \= cred.user;  
                }

                if (\!currentUser) return;

                const avatarDocRef \= doc(db, 'artifacts', appId, 'public', 'data', 'profile', 'avatarDoc');  
                onSnapshot(avatarDocRef, (docSnap) \=\> {  
                    if (docSnap.exists()) {  
                        const data \= docSnap.data();  
                        if (data && data.avatarUrl) {  
                            const avatarImg \= document.getElementById('hud-avatar-img');  
                            if (avatarImg) {  
                                avatarImg.src \= data.avatarUrl;  
                            }  
                        }  
                    }  
                }, (error) \=\> {  
                    console.error("Error loading saved avatar:", error);  
                });  
            } catch (e) {  
                console.error("Authentication error:", e);  
            }  
        }

        window.saveAvatarToCloud \= async function(avatarUrl) {  
            if (\!db || \!currentUser) return;  
            try {  
                const avatarDocRef \= doc(db, 'artifacts', appId, 'public', 'data', 'profile', 'avatarDoc');  
                await setDoc(avatarDocRef, {  
                    avatarUrl: avatarUrl,  
                    updatedAt: new Date().toISOString()  
                }, { merge: true });  
            } catch (e) {  
                console.error("Error saving avatar:", e);  
            }  
        };

        initAuthAndFirestore();  
    \</script\>

    \<style\>  
        body {  
            font-family: 'Inter', sans-serif;  
            background-color: \#070913;  
            background-image:   
                radial-gradient(circle at 15% 15%, rgba(0, 240, 255, 0.08) 0%, transparent 40%),  
                radial-gradient(circle at 85% 85%, rgba(168, 85, 247, 0.08) 0%, transparent 40%),  
                linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),  
                linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);  
            background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;  
            color: \#f1f5f9;  
        }  
        .font-gamer {  
            font-family: 'Rajdhani', sans-serif;  
            letter-spacing: 0.05em;  
        }  
        .code-font {  
            font-family: 'JetBrains Mono', monospace;  
        }  
        .hud-panel {  
            background: rgba(15, 23, 42, 0.85);  
            backdrop-filter: blur(12px);  
            border: 1px solid rgba(0, 240, 255, 0.2);  
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(0, 240, 255, 0.03);  
        }  
        .hud-card {  
            background: rgba(15, 23, 42, 0.6);  
            backdrop-filter: blur(8px);  
            border: 1px solid rgba(255, 255, 255, 0.08);  
            transition: all 0.3s ease;  
        }  
        .hud-card:hover {  
            border-color: rgba(0, 240, 255, 0.4);  
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);  
            transform: translateY(-2px);  
        }  
        .glow-cyan {  
            box-shadow: 0 0 25px \-5px rgba(0, 240, 255, 0.4);  
        }  
        .glow-purple {  
            box-shadow: 0 0 25px \-5px rgba(168, 85, 247, 0.4);  
        }  
        .page-content {  
            display: none;  
            animation: fadeIn 0.3s ease-in-out forwards;  
        }  
        .page-content.active {  
            display: block;  
        }  
        @keyframes fadeIn {  
            from { opacity: 0; transform: translateY(8px); }  
            to { opacity: 1; transform: translateY(0); }  
        }  
        /\* Custom scrollbar \*/  
        ::-webkit-scrollbar {  
            width: 8px;  
        }  
        ::-webkit-scrollbar-track {  
            background: \#070913;  
        }  
        ::-webkit-scrollbar-thumb {  
            background: \#1e293b;  
            border-radius: 4px;  
            border: 1px solid rgba(0, 240, 255, 0.2);  
        }  
    \</style\>  
\</head\>  
\<body class="min-h-screen flex flex-col selection:bg-cyber-cyan selection:text-slate-950"\>

    \<header class="sticky top-0 z-40 hud-panel border-b border-cyan-500/30"\>  
        \<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"\>  
            \<\!-- Brand / Logo \--\>  
            \<div class="flex items-center space-x-3 cursor-pointer" onclick="switchPage('home')"\>  
                \<div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 flex items-center justify-center font-extrabold text-white text-xl shadow-lg shadow-cyan-500/20 border border-cyan-300/40"\>  
                    \<i class="fa-solid fa-gamepad text-sm"\>\</i\>  
                \</div\>  
                \<div\>  
                    \<span class="font-gamer font-extrabold text-xl tracking-wider text-white block leading-none"\>ALEX\<span class="text-cyber-cyan" id="logo-accent"\>.dev\</span\>\</span\>  
                    \<span class="text-\[10px\] code-font text-cyan-400/80 uppercase"\>Spec-Driven Gamer Dev\</span\>  
                \</div\>  
            \</div\>

            \<\!-- Desktop Navigation Menu \--\>  
            \<nav class="hidden md:flex items-center space-x-1 bg-slate-950/80 p-1.5 rounded-full border border-cyan-500/30"\>  
                \<button onclick="switchPage('home')" id="nav-home" class="nav-btn px-4 py-1.5 rounded-full text-xs font-gamer font-bold tracking-wider uppercase transition-all duration-200 text-cyan-400 bg-cyan-500/20 border border-cyan-500/40"\>  
                    \<i class="fa-solid fa-house text-xs mr-1"\>\</i\> Home  
                \</button\>  
                \<button onclick="switchPage('media')" id="nav-media" class="nav-btn px-4 py-1.5 rounded-full text-xs font-gamer font-bold tracking-wider uppercase transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800"\>  
                    \<i class="fa-solid fa-compact-disc text-xs mr-1"\>\</i\> Media  
                \</button\>  
                \<button onclick="switchPage('future')" id="nav-future" class="nav-btn px-4 py-1.5 rounded-full text-xs font-gamer font-bold tracking-wider uppercase transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800"\>  
                    \<i class="fa-solid fa-rocket text-xs mr-1"\>\</i\> Future  
                \</button\>  
                \<button onclick="switchPage('sports')" id="nav-sports" class="nav-btn px-4 py-1.5 rounded-full text-xs font-gamer font-bold tracking-wider uppercase transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800"\>  
                    \<i class="fa-solid fa-baseball-bat-ball text-xs mr-1"\>\</i\> Sports  
                \</button\>  
                \<button onclick="switchPage('projects')" id="nav-projects" class="nav-btn px-4 py-1.5 rounded-full text-xs font-gamer font-bold tracking-wider uppercase transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800"\>  
                    \<i class="fa-solid fa-code text-xs mr-1"\>\</i\> Projects  
                \</button\>  
                \<button onclick="switchPage('settings')" id="nav-settings" class="nav-btn px-4 py-1.5 rounded-full text-xs font-gamer font-bold tracking-wider uppercase transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800"\>  
                    \<i class="fa-solid fa-sliders text-xs mr-1"\>\</i\> Settings  
                \</button\>  
            \</nav\>

            \<\!-- Spec Inspector Trigger Button \--\>  
            \<div class="flex items-center space-x-2"\>  
                \<button onclick="toggleSpecDrawer()" class="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-cyber-cyan border border-cyan-500/40 text-xs px-3 py-2 rounded-xl transition-all shadow-md shadow-cyan-500/10"\>  
                    \<i class="fa-solid fa-terminal text-purple-400"\>\</i\>  
                    \<span class="hidden sm:inline font-mono"\>Inspect Page Spec\</span\>  
                \</button\>  
                  
                \<button onclick="toggleMobileMenu()" class="md:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"\>  
                    \<i class="fa-solid fa-bars text-lg"\>\</i\>  
                \</button\>  
            \</div\>  
        \</div\>

        \<\!-- Mobile Menu \--\>  
        \<div id="mobile-menu" class="hidden md:hidden bg-slate-950 border-b border-cyan-500/30 px-4 py-3 space-y-2"\>  
            \<button onclick="switchPage('home'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 font-gamer uppercase"\>\<i class="fa-solid fa-house mr-2 text-cyber-cyan"\>\</i\> 1\. Home\</button\>  
            \<button onclick="switchPage('media'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 font-gamer uppercase"\>\<i class="fa-solid fa-compact-disc mr-2 text-cyber-cyan"\>\</i\> 2\. Media\</button\>  
            \<button onclick="switchPage('future'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 font-gamer uppercase"\>\<i class="fa-solid fa-rocket mr-2 text-cyber-cyan"\>\</i\> 3\. Future\</button\>  
            \<button onclick="switchPage('sports'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 font-gamer uppercase"\>\<i class="fa-solid fa-baseball-bat-ball mr-2 text-cyber-cyan"\>\</i\> 4\. Sports\</button\>  
            \<button onclick="switchPage('projects'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 font-gamer uppercase"\>\<i class="fa-solid fa-code mr-2 text-cyber-cyan"\>\</i\> 5\. Projects\</button\>  
            \<button onclick="switchPage('settings'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 font-gamer uppercase"\>\<i class="fa-solid fa-sliders mr-2 text-cyber-cyan"\>\</i\> Settings\</button\>  
        \</div\>  
    \</header\>

    \<main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8"\>

        \<\!-- PAGE 1: HOME \--\>  
        \<section id="page-home" class="page-content active space-y-10"\>  
            \<\!-- Hero Gaming Banner \--\>  
            \<div class="relative overflow-hidden rounded-3xl p-6 sm:p-10 hud-panel border border-cyan-500/40 glow-cyan"\>  
                \<div class="absolute \-right-20 \-top-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"\>\</div\>  
                \<div class="absolute \-left-20 \-bottom-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"\>\</div\>

                \<div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"\>  
                    \<div class="lg:col-span-7 space-y-5"\>  
                        \<div class="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/40 px-3 py-1 rounded-full text-xs font-mono text-cyber-cyan"\>  
                            \<span class="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"\>\</span\>  
                            \<span id="hero-display-tagline"\>Freshman Year • Web Design Student\</span\>  
                        \</div\>

                        \<h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none"\>  
                            HEY, I'M \<span id="hero-display-name" class="text-white font-gamer"\>ALEX\</span\> 👋  
                        \</h1\>

                        \<p id="hero-display-bio" class="text-slate-300 text-sm sm:text-base leading-relaxed"\>  
                            Welcome to my 5-page personal gaming website built for my 1st year Web Design course\! I'm learning \<span class="text-cyber-cyan font-semibold"\>Spec-Driven Development\</span\> and \<span class="text-purple-400 font-semibold"\>Vibe Coding\</span\> to build modern, interactive web applications.  
                        \</p\>

                        \<\!-- Gamer Badges \--\>  
                        \<div class="flex flex-wrap gap-2 pt-1"\>  
                            \<span class="bg-slate-900/90 text-cyan-300 px-3 py-1 rounded-lg text-xs font-mono border border-cyan-500/30"\>⚾ Athlete\</span\>  
                            \<span class="bg-slate-900/90 text-purple-300 px-3 py-1 rounded-lg text-xs font-mono border border-purple-500/30"\>🎮 Siege & Fortnite\</span\>  
                            \<span class="bg-slate-900/90 text-emerald-300 px-3 py-1 rounded-lg text-xs font-mono border border-emerald-500/30"\>🎵 Country & R\&B\</span\>  
                            \<span class="bg-slate-900/90 text-amber-300 px-3 py-1 rounded-lg text-xs font-mono border border-amber-500/30"\>💻 Web Developer\</span\>  
                        \</div\>

                        \<\!-- Action Buttons \--\>  
                        \<div class="flex flex-wrap gap-3 pt-2"\>  
                            \<button onclick="switchPage('media')" class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-gamer font-bold text-base tracking-wider uppercase px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center space-x-2"\>  
                                \<span\>Explore Media\</span\>  
                                \<i class="fa-solid fa-gamepad text-xs"\>\</i\>  
                            \</button\>

                            \<button onclick="toggleSpecDrawer()" class="bg-slate-900 hover:bg-slate-800 text-white font-gamer font-bold text-base tracking-wider uppercase px-5 py-2.5 rounded-xl border border-cyan-500/30 transition-all flex items-center space-x-2"\>  
                                \<i class="fa-solid fa-code text-cyan-400"\>\</i\>  
                                \<span\>View Spec\</span\>  
                            \</button\>  
                        \</div\>  
                    \</div\>

                    \<\!-- Player Profile HUD Card Widget \--\>  
                    \<div class="lg:col-span-5"\>  
                        \<div class="bg-slate-950/90 rounded-2xl border border-cyan-500/40 p-5 shadow-2xl space-y-4 glow-purple"\>  
                            \<div class="flex items-center justify-between border-b border-slate-800 pb-3"\>  
                                \<div class="flex items-center space-x-2"\>  
                                    \<div class="w-3 h-3 rounded-full bg-cyan-400 animate-ping"\>\</div\>  
                                    \<span class="text-xs font-gamer font-bold text-cyber-cyan tracking-wider uppercase"\>PROFILE PICTURE & HUD\</span\>  
                                \</div\>  
                                \<span class="text-\[10px\] font-mono bg-gradient-to-r from-amber-500/30 to-yellow-500/30 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/60 font-bold tracking-wider shadow-lg shadow-amber-500/20 animate-pulse"\>\<i class="fa-solid fa-crown text-amber-400 mr-1"\>\</i\> MAX LEVEL 9999\</span\>  
                            \</div\>

                            \<\!-- Avatar Display & Image Insert Section \--\>  
                            \<div class="flex flex-col items-center justify-center p-4 bg-slate-900/70 rounded-xl border border-slate-800 space-y-3"\>  
                                \<div class="relative group cursor-pointer max-w-sm w-full mx-auto flex justify-center items-center" title="Click to upload image" onclick="document.getElementById('profile-avatar-input').click()"\>  
                                    \<img id="hud-avatar-img" src="https://placehold.co/400x500/0f172a/00f0ff?text=ALEX" onerror="this.src='https://placehold.co/400x500/0f172a/00f0ff?text=ALEX'" alt="Player Avatar" class="w-full h-80 sm:h-96 rounded-2xl object-cover object-center border-2 border-cyan-400 shadow-xl shadow-cyan-500/20 transition-all group-hover:border-purple-400 mx-auto"\>  
                                    \<div class="absolute inset-0 bg-slate-950/70 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"\>  
                                        \<i class="fa-solid fa-camera text-cyber-cyan text-3xl"\>\</i\>  
                                        \<span class="text-xs text-white font-mono mt-2"\>CHANGE IMAGE\</span\>  
                                    \</div\>  
                                \</div\>

                                \<\!-- Quick Player Status Info \--\>  
                                \<div class="w-full text-center space-y-1 pt-1 border-t border-slate-800/80"\>  
                                    \<span class="text-xs font-mono text-cyan-300 block"\>\<i class="fa-solid fa-circle text-\[8px\] text-emerald-400 animate-pulse mr-1"\>\</i\> Status: Online • Max Level Student-Athlete\</span\>  
                                    \<span class="text-\[11px\] code-font text-slate-400 block"\>Class of 2029 • 1st Base & Pitcher\</span\>  
                                \</div\>

                                \<\!-- Upload File & Link URL Buttons \--\>  
                                \<div class="flex items-center justify-center space-x-2 pt-1 w-full"\>  
                                    \<button type="button" onclick="document.getElementById('profile-avatar-input').click()" class="flex-1 text-xs code-font text-cyber-cyan hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 py-2 px-3 rounded-lg border border-cyan-500/30 transition-all flex items-center justify-center space-x-1.5 shadow-sm" title="Upload image file from device"\>  
                                        \<i class="fa-solid fa-upload text-cyan-400"\>\</i\>  
                                        \<span\>Upload File\</span\>  
                                    \</button\>  
                                    \<button type="button" onclick="toggleAvatarUrlInput()" class="flex-1 text-xs code-font text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 py-2 px-3 rounded-lg border border-purple-500/30 transition-all flex items-center justify-center space-x-1.5 shadow-sm" title="Insert image using web URL link"\>  
                                        \<i class="fa-solid fa-link text-purple-400"\>\</i\>  
                                        \<span\>Link URL\</span\>  
                                    \</button\>  
                                \</div\>  
                                \<\!-- Hidden File Input \--\>  
                                \<input type="file" id="profile-avatar-input" class="hidden" accept="image/\*" onchange="handleAvatarUpload(event)"\>  
                            \</div\>

                            \<\!-- Expandable Image URL Link Container \--\>  
                            \<div id="avatar-url-container" class="hidden bg-slate-900/90 p-3 rounded-xl border border-purple-500/40 space-y-2"\>  
                                \<div class="flex items-center justify-between text-xs font-mono text-purple-300"\>  
                                    \<span\>\<i class="fa-solid fa-link mr-1"\>\</i\> Paste Image Web Link\</span\>  
                                    \<button type="button" onclick="toggleAvatarUrlInput()" class="text-slate-400 hover:text-white"\>\<i class="fa-solid fa-xmark"\>\</i\>\</button\>  
                                \</div\>  
                                \<div class="flex items-center space-x-2"\>  
                                    \<input type="url" id="profile-avatar-url-input" placeholder="https://example.com/photo.jpg" class="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-400 code-font"\>  
                                    \<button type="button" onclick="applyAvatarUrl()" class="bg-purple-600 hover:bg-purple-500 text-white text-xs font-gamer font-bold uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm"\>  
                                        Apply  
                                    \</button\>  
                                \</div\>  
                                \<p id="avatar-url-error" class="text-\[10px\] text-rose-400 hidden"\>\<i class="fa-solid fa-circle-exclamation mr-1"\>\</i\> Please enter a valid HTTP/HTTPS link.\</p\>  
                            \</div\>  
                        \</div\>  
                    \</div\>  
                \</div\>  
            \</div\>

            \<\!-- Extended Home Page Section: Latest News & Stats Feed \--\>  
            \<div class="hud-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4"\>  
                \<div class="flex items-center justify-between border-b border-slate-800 pb-3"\>  
                    \<h2 class="text-lg font-gamer font-bold text-white tracking-wider uppercase flex items-center space-x-2"\>  
                        \<i class="fa-solid fa-bolt text-cyber-cyan"\>\</i\>  
                        \<span\>Recent Highlights & Activity Feed\</span\>  
                    \</h2\>  
                    \<span class="text-xs font-mono text-cyan-400"\>UPDATED TODAY\</span\>  
                \</div\>

                \<div class="grid grid-cols-1 md:grid-cols-3 gap-4"\>  
                    \<div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2"\>  
                        \<div class="flex justify-between items-center text-xs text-amber-400 font-mono"\>  
                            \<span\>\<i class="fa-solid fa-baseball-bat-ball mr-1"\>\</i\> ATHLETICS\</span\>  
                            \<span\>THIS WEEK\</span\>  
                        \</div\>  
                        \<h4 class="font-gamer font-bold text-white text-sm"\>3-Strikeout Pitching Performance\</h4\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Closed out the final 2 innings from the mound with solid fastball command and 0 earned runs.\</p\>  
                    \</div\>

                    \<div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2"\>  
                        \<div class="flex justify-between items-center text-xs text-purple-400 font-mono"\>  
                            \<span\>\<i class="fa-solid fa-code mr-1"\>\</i\> WEB DEV\</span\>  
                            \<span\>ASSIGNMENT \#1\</span\>  
                        \</div\>  
                        \<h4 class="font-gamer font-bold text-white text-sm"\>Spec-Driven Website Design\</h4\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Completed 5-page responsive layout with dark mode gaming theme, interactive specs, and settings panel.\</p\>  
                    \</div\>

                    \<div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2"\>  
                        \<div class="flex justify-between items-center text-xs text-cyber-cyan font-mono"\>  
                            \<span\>\<i class="fa-solid fa-trophy mr-1"\>\</i\> GAMING\</span\>  
                            \<span\>SQUAD VICTORY\</span\>  
                        \</div\>  
                        \<h4 class="font-gamer font-bold text-white text-sm"\>Siege Tactical Match Win\</h4\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Secured clutch defense round win with team communication and utility setup.\</p\>  
                    \</div\>  
                \</div\>  
            \</div\>

            \<\!-- Page Directory Cards \--\>  
            \<div class="space-y-4"\>  
                \<h2 class="text-xl font-gamer font-bold text-white tracking-wider uppercase flex items-center space-x-2"\>  
                    \<i class="fa-solid fa-map text-cyber-cyan"\>\</i\>  
                    \<span\>Website Directory & Level Selector\</span\>  
                \</h2\>  
                  
                \<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"\>  
                    \<div onclick="switchPage('media')" class="hud-card p-5 rounded-2xl cursor-pointer group"\>  
                        \<div class="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg mb-3 border border-purple-500/30 group-hover:scale-110 transition-transform"\>  
                            \<i class="fa-solid fa-compact-disc"\>\</i\>  
                        \</div\>  
                        \<span class="text-\[10px\] font-mono text-purple-400 block mb-1"\>PAGE 02\</span\>  
                        \<h3 class="font-gamer font-bold text-lg text-white mb-1"\>Media & Vibe\</h3\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Music playlists, favorite video games, and tech YouTube channels.\</p\>  
                    \</div\>

                    \<div onclick="switchPage('future')" class="hud-card p-5 rounded-2xl cursor-pointer group"\>  
                        \<div class="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyber-cyan flex items-center justify-center text-lg mb-3 border border-cyan-500/30 group-hover:scale-110 transition-transform"\>  
                            \<i class="fa-solid fa-rocket"\>\</i\>  
                        \</div\>  
                        \<span class="text-\[10px\] font-mono text-cyber-cyan block mb-1"\>PAGE 03\</span\>  
                        \<h3 class="font-gamer font-bold text-lg text-white mb-1"\>Future & Goals\</h3\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>High school roadmap, good grades, baseball, and MLB aspirations.\</p\>  
                    \</div\>

                    \<div onclick="switchPage('sports')" class="hud-card p-5 rounded-2xl cursor-pointer group"\>  
                        \<div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg mb-3 border border-amber-500/30 group-hover:scale-110 transition-transform"\>  
                            \<i class="fa-solid fa-baseball-bat-ball"\>\</i\>  
                        \</div\>  
                        \<span class="text-\[10px\] font-mono text-amber-400 block mb-1"\>PAGE 04\</span\>  
                        \<h3 class="font-gamer font-bold text-lg text-white mb-1"\>Sports & Fitness\</h3\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Baseball statistics, workout routines, and physical conditioning.\</p\>  
                    \</div\>

                    \<div onclick="switchPage('projects')" class="hud-card p-5 rounded-2xl cursor-pointer group"\>  
                        \<div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg mb-3 border border-emerald-500/30 group-hover:scale-110 transition-transform"\>  
                            \<i class="fa-solid fa-code"\>\</i\>  
                        \</div\>  
                        \<span class="text-\[10px\] font-mono text-emerald-400 block mb-1"\>PAGE 05\</span\>  
                        \<h3 class="font-gamer font-bold text-lg text-white mb-1"\>Projects & Setup\</h3\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Tech workstation setup, web design assignments, and contact form.\</p\>  
                    \</div\>  
                \</div\>  
            \</div\>  
        \</section\>

        \<\!-- PAGE 2: MEDIA \--\>  
        \<section id="page-media" class="page-content space-y-8"\>  
            \<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6"\>  
                \<div\>  
                    \<span class="text-xs font-mono text-purple-400 uppercase"\>Page 2 of 5\</span\>  
                    \<h1 class="text-3xl font-gamer font-extrabold text-white tracking-wider uppercase"\>Media & Vibe Hub\</h1\>  
                    \<p class="text-slate-400 text-sm mt-1"\>The games, music playlists, and tech creators that power my workflow.\</p\>  
                \</div\>  
                  
                \<div class="flex flex-wrap gap-2"\>  
                    \<button onclick="filterMedia('all')" class="media-filter-btn px-3 py-1.5 rounded-lg text-xs font-gamer font-bold uppercase bg-purple-600 text-white"\>All\</button\>  
                    \<button onclick="filterMedia('music')" class="media-filter-btn px-3 py-1.5 rounded-lg text-xs font-gamer font-bold uppercase bg-slate-900 text-slate-300 hover:bg-slate-800"\>Music\</button\>  
                    \<button onclick="filterMedia('gaming')" class="media-filter-btn px-3 py-1.5 rounded-lg text-xs font-gamer font-bold uppercase bg-slate-900 text-slate-300 hover:bg-slate-800"\>Gaming\</button\>  
                    \<button onclick="filterMedia('creators')" class="media-filter-btn px-3 py-1.5 rounded-lg text-xs font-gamer font-bold uppercase bg-slate-900 text-slate-300 hover:bg-slate-800"\>Creators\</button\>  
                    \<button onclick="filterMedia('photos')" class="media-filter-btn px-3 py-1.5 rounded-lg text-xs font-gamer font-bold uppercase bg-slate-900 text-slate-300 hover:bg-slate-800"\>Photos\</button\>  
                \</div\>  
            \</div\>

            \<\!-- Interactive Synth Audio Player Player Widget \--\>  
            \<div class="hud-panel p-5 rounded-2xl border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4"\>  
                \<div class="flex items-center space-x-4"\>  
                    \<button id="vibe-audio-btn" onclick="toggleVibeAudio()" class="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center text-lg shadow-lg shadow-purple-600/30 transition-all"\>  
                        \<i id="vibe-audio-icon" class="fa-solid fa-play"\>\</i\>  
                    \</button\>  
                    \<div\>  
                        \<span class="text-\[10px\] font-mono text-purple-400 uppercase block"\>Interactive Audio Generator\</span\>  
                        \<h4 class="font-gamer font-bold text-white text-base"\>Cyber Lo-Fi Focus Synth Stream\</h4\>  
                        \<p id="vibe-audio-status" class="text-xs text-slate-400"\>Click play to launch ambient web audio synth loops for coding focus.\</p\>  
                    \</div\>  
                \</div\>  
                \<div class="flex items-center space-x-2"\>  
                    \<span class="text-xs font-mono text-slate-400"\>BPM: \<strong class="text-cyber-cyan"\>85\</strong\>\</span\>  
                    \<span class="text-xs font-mono text-slate-400"\>Key: \<strong class="text-purple-400"\>A Minor\</strong\>\</span\>  
                \</div\>  
            \</div\>

            \<\!-- Media Grid Cards \--\>  
            \<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"\>  
                \<\!-- Music Card 1 \--\>  
                \<div class="media-card music hud-card rounded-2xl p-5 border border-slate-800"\>  
                    \<div class="flex items-center space-x-4 mb-4"\>  
                        \<div class="w-14 h-14 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 text-2xl border border-purple-500/30"\>  
                            \<i class="fa-solid fa-guitar"\>\</i\>  
                        \</div\>  
                        \<div\>  
                            \<span class="text-\[10px\] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30"\>MUSIC\</span\>  
                            \<h3 class="text-base font-gamer font-bold text-white mt-1"\>Country Hits Rotation\</h3\>  
                            \<p class="text-xs text-slate-400"\>Luke Combs, Morgan Wallen, Zach Bryan\</p\>  
                        \</div\>  
                    \</div\>  
                    \<p class="text-slate-300 text-xs leading-relaxed mb-4"\>Acoustic guitar riffs and country storytelling keep me focused during long study sessions and workout warmups.\</p\>  
                    \<div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs code-font text-slate-400"\>  
                        \<span\>\<i class="fa-solid fa-headphones text-purple-400 mr-1.5"\>\</i\> Daily Drive Playlist\</span\>  
                        \<span class="text-purple-300"\>42 Songs\</span\>  
                    \</div\>  
                \</div\>

                \<\!-- Music Card 2 \--\>  
                \<div class="media-card music hud-card rounded-2xl p-5 border border-slate-800"\>  
                    \<div class="flex items-center space-x-4 mb-4"\>  
                        \<div class="w-14 h-14 rounded-xl bg-pink-600/20 flex items-center justify-center text-pink-400 text-2xl border border-pink-500/30"\>  
                            \<i class="fa-solid fa-compact-disc"\>\</i\>  
                        \</div\>  
                        \<div\>  
                            \<span class="text-\[10px\] font-mono bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded border border-pink-500/30"\>MUSIC\</span\>  
                            \<h3 class="text-base font-gamer font-bold text-white mt-1"\>Modern R\&B Vibes\</h3\>  
                            \<p class="text-xs text-slate-400"\>SZA, Frank Ocean, Drake, Brent Faiyaz\</p\>  
                        \</div\>  
                    \</div\>  
                    \<p class="text-slate-300 text-xs leading-relaxed mb-4"\>Smooth beats and chill melodies for evening programming sessions and late-night gaming with friends.\</p\>  
                    \<div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs code-font text-slate-400"\>  
                        \<span\>\<i class="fa-solid fa-headphones text-pink-400 mr-1.5"\>\</i\> Chill Vibe Playlist\</span\>  
                        \<span class="text-pink-300"\>58 Songs\</span\>  
                    \</div\>  
                \</div\>

                \<\!-- Gaming Card 1 \--\>  
                \<div class="media-card gaming hud-card rounded-2xl p-5 border border-slate-800"\>  
                    \<div class="flex items-center space-x-4 mb-4"\>  
                        \<div class="w-14 h-14 rounded-xl bg-cyan-600/20 flex items-center justify-center text-cyber-cyan text-2xl border border-cyan-500/30"\>  
                            \<i class="fa-solid fa-shield-halved"\>\</i\>  
                        \</div\>  
                        \<div\>  
                            \<span class="text-\[10px\] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30"\>GAMING\</span\>  
                            \<h3 class="text-base font-gamer font-bold text-white mt-1"\>Rainbow Six Siege\</h3\>  
                            \<p class="text-xs text-slate-400"\>Tactical First-Person Shooter\</p\>  
                        \</div\>  
                    \</div\>  
                    \<p class="text-slate-300 text-xs leading-relaxed mb-4"\>Mainly playing defense anchors and intel roamers. Team callouts and tactical positioning are key.\</p\>  
                    \<div class="grid grid-cols-2 gap-2 text-\[11px\] code-font"\>  
                        \<div class="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-center text-cyan-300"\>Rank: Champion Top 100\</div\>  
                        \<div class="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-center text-cyan-300"\>K/D: 3.5\</div\>  
                    \</div\>  
                \</div\>

                \<\!-- Gaming Card 2 \--\>  
                \<div class="media-card gaming hud-card rounded-2xl p-5 border border-slate-800"\>  
                    \<div class="flex items-center space-x-4 mb-4"\>  
                        \<div class="w-14 h-14 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 text-2xl border border-purple-500/30"\>  
                            \<i class="fa-solid fa-crosshairs"\>\</i\>  
                        \</div\>  
                        \<div\>  
                            \<span class="text-\[10px\] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30"\>GAMING\</span\>  
                            \<h3 class="text-base font-gamer font-bold text-white mt-1"\>Fortnite Battle Royale\</h3\>  
                            \<p class="text-xs text-slate-400"\>Competitive Ranked Duos\</p\>  
                        \</div\>  
                    \</div\>  
                    \<p class="text-slate-300 text-xs leading-relaxed mb-4"\>Zero Build and Build modes. Practicing high-ground rotates and fast aim mechanics.\</p\>  
                    \<div class="grid grid-cols-2 gap-2 text-\[11px\] code-font"\>  
                        \<div class="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-center text-purple-300"\>Crown Wins: 84\</div\>  
                        \<div class="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-center text-purple-300"\>Rank: Unreal Legends\</div\>  
                    \</div\>  
                \</div\>

                \<\!-- Creators Card 1 \--\>  
                \<div class="media-card creators hud-card rounded-2xl p-5 border border-slate-800"\>  
                    \<div class="flex items-center space-x-4 mb-4"\>  
                        \<div class="w-14 h-14 rounded-xl bg-red-600/20 flex items-center justify-center text-red-400 text-2xl border border-red-500/30"\>  
                            \<i class="fa-brands fa-youtube"\>\</i\>  
                        \</div\>  
                        \<div\>  
                            \<span class="text-\[10px\] font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30"\>CREATOR\</span\>  
                            \<h3 class="text-base font-gamer font-bold text-white mt-1"\>Tech & Gaming YouTube\</h3\>  
                            \<p class="text-xs text-slate-400"\>Marques Brownlee & Gamers Nexus\</p\>  
                        \</div\>  
                    \</div\>  
                    \<p class="text-slate-300 text-xs leading-relaxed mb-4"\>Inspiration for custom PC builds, desk setups, display technology, and software development.\</p\>  
                    \<div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs code-font text-slate-400"\>  
                        \<span\>\<i class="fa-solid fa-play text-red-400 mr-1.5"\>\</i\> Daily Subscriptions\</span\>  
                        \<span class="text-red-300"\>PC Hardware\</span\>  
                    \</div\>  
                \</div\>

                \<\!-- Creators Card 2 \--\>  
                \<div class="media-card creators hud-card rounded-2xl p-5 border border-slate-800"\>  
                    \<div class="flex items-center space-x-4 mb-4"\>  
                        \<div class="w-14 h-14 rounded-xl bg-amber-600/20 flex items-center justify-center text-amber-400 text-2xl border border-amber-500/30"\>  
                            \<i class="fa-solid fa-baseball"\>\</i\>  
                        \</div\>  
                        \<div\>  
                            \<span class="text-\[10px\] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30"\>BASEBALL\</span\>  
                            \<h3 class="text-base font-gamer font-bold text-white mt-1"\>MLB Breakdown Channels\</h3\>  
                            \<p class="text-xs text-slate-400"\>Pitching Ninja & Baseball Breakdown\</p\>  
                        \</div\>  
                    \</div\>  
                    \<p class="text-slate-300 text-xs leading-relaxed mb-4"\>Studying pitch tunnel mechanics, slider rotation speeds, and MLB hitters' batting stances.\</p\>  
                    \<div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs code-font text-slate-400"\>  
                        \<span\>\<i class="fa-solid fa-video text-amber-400 mr-1.5"\>\</i\> Film Study\</span\>  
                        \<span class="text-amber-300"\>Pitching Mechanics\</span\>  
                    \</div\>  
                \</div\>  
            \</div\>

            \<\!-- 8 Picture Slots Photo Gallery Vault Section \--\>  
            \<div class="media-card photos space-y-4 pt-4"\>  
                \<div class="flex items-center justify-between border-b border-slate-800 pb-3"\>  
                    \<h2 class="text-xl font-gamer font-bold text-white tracking-wider uppercase flex items-center space-x-2"\>  
                        \<i class="fa-solid fa-images text-purple-400"\>\</i\>  
                        \<span\>Photo & Media Vault (8 Picture Slots)\</span\>  
                    \</h2\>  
                    \<span class="text-xs font-mono text-purple-300"\>\<i class="fa-solid fa-camera mr-1"\>\</i\> Interactive Slots\</span\>  
                \</div\>

                \<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"\>  
                    \<\!-- Slot 1 \--\>  
                    \<div class="hud-card p-3 rounded-2xl border border-slate-800 space-y-2 group"\>  
                        \<div class="relative overflow-hidden rounded-xl border border-slate-800 aspect-video bg-slate-900 flex items-center justify-center"\>  
                            \<img id="slot-img-1" src="https://placehold.co/600x400/0f172a/00f0ff?text=Slot+1:+Battlestation" alt="Battlestation Rig" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer" onclick="openPhotoModal(this.src, 'Slot 1: Gaming Battlestation Setup')"\>  
                            \<span class="absolute top-2 left-2 bg-slate-950/80 text-cyan-400 text-\[10px\] font-mono px-2 py-0.5 rounded border border-cyan-500/30"\>SLOT 01\</span\>  
                            \<button onclick="triggerSlotUpload(1)" class="absolute bottom-2 right-2 bg-slate-950/80 hover:bg-cyan-500 text-white hover:text-slate-950 p-1.5 rounded-lg text-xs transition-colors border border-cyan-500/30" title="Upload Picture"\>  
                                \<i class="fa-solid fa-upload"\>\</i\>  
                            \</button\>  
                        \</div\>  
                        \<div class="flex items-center justify-between pt-1"\>  
                            \<h4 class="font-gamer font-bold text-sm text-white truncate"\>Battlestation Setup\</h4\>  
                            \<span class="text-\[10px\] font-mono text-cyan-400"\>RIG\</span\>  
                        \</div\>  
                        \<p class="text-\[11px\] text-slate-400 leading-snug"\>Dual monitors with custom RGB ambient backlight.\</p\>  
                        \<input type="file" id="slot-file-1" class="hidden" accept="image/\*" onchange="handleSlotUpload(event, 1)"\>  
                    \</div\>

                    \<\!-- Slot 2 \--\>  
                    \<div class="hud-card p-3 rounded-2xl border border-slate-800 space-y-2 group"\>  
                        \<div class="relative overflow-hidden rounded-xl border border-slate-800 aspect-video bg-slate-900 flex items-center justify-center"\>  
                            \<img id="slot-img-2" src="https://placehold.co/600x400/0f172a/a855f7?text=Slot+2:+Siege+Clutch" alt="Siege Clutch Match" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer" onclick="openPhotoModal(this.src, 'Slot 2: Rainbow Six Siege Clutch')"\>  
                            \<span class="absolute top-2 left-2 bg-slate-950/80 text-purple-400 text-\[10px\] font-mono px-2 py-0.5 rounded border border-purple-500/30"\>SLOT 02\</span\>  
                            \<button onclick="triggerSlotUpload(2)" class="absolute bottom-2 right-2 bg-slate-950/80 hover:bg-purple-500 text-white hover:text-slate-950 p-1.5 rounded-lg text-xs transition-colors border border-purple-500/30" title="Upload Picture"\>  
                                \<i class="fa-solid fa-upload"\>\</i\>  
                            \</button\>  
                        \</div\>  
                        \<div class="flex items-center justify-between pt-1"\>  
                            \<h4 class="font-gamer font-bold text-sm text-white truncate"\>1v3 Siege Clutch\</h4\>  
                            \<span class="text-\[10px\] font-mono text-purple-400"\>GAMING\</span\>  
                        \</div\>  
                        \<p class="text-\[11px\] text-slate-400 leading-snug"\>Tactical defense round win on Clubhouse bomb site.\</p\>  
                        \<input type="file" id="slot-file-2" class="hidden" accept="image/\*" onchange="handleSlotUpload(event, 2)"\>  
                    \</div\>

                    \<\!-- Slot 3 \--\>  
                    \<div class="hud-card p-3 rounded-2xl border border-slate-800 space-y-2 group"\>  
                        \<div class="relative overflow-hidden rounded-xl border border-slate-800 aspect-video bg-slate-900 flex items-center justify-center"\>  
                            \<img id="slot-img-3" src="https://placehold.co/600x400/0f172a/f59e0b?text=Slot+3:+Mound+Action" alt="Pitching Mound Action" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer" onclick="openPhotoModal(this.src, 'Slot 3: Pitching Mound Action')"\>  
                            \<span class="absolute top-2 left-2 bg-slate-950/80 text-amber-400 text-\[10px\] font-mono px-2 py-0.5 rounded border border-amber-500/30"\>SLOT 03\</span\>  
                            \<button onclick="triggerSlotUpload(3)" class="absolute bottom-2 right-2 bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 p-1.5 rounded-lg text-xs transition-colors border border-amber-500/30" title="Upload Picture"\>  
                                \<i class="fa-solid fa-upload"\>\</i\>  
                            \</button\>  
                        \</div\>  
                        \<div class="flex items-center justify-between pt-1"\>  
                            \<h4 class="font-gamer font-bold text-sm text-white truncate"\>Pitching Mechanics\</h4\>  
                            \<span class="text-\[10px\] font-mono text-amber-400"\>BASEBALL\</span\>  
                        \</div\>  
                        \<p class="text-\[11px\] text-slate-400 leading-snug"\>Spring season opener throwing fastball strike 3.\</p\>  
                        \<input type="file" id="slot-file-3" class="hidden" accept="image/\*" onchange="handleSlotUpload(event, 3)"\>  
                    \</div\>

                    \<\!-- Slot 4 \--\>  
                    \<div class="hud-card p-3 rounded-2xl border border-slate-800 space-y-2 group"\>  
                        \<div class="relative overflow-hidden rounded-xl border border-slate-800 aspect-video bg-slate-900 flex items-center justify-center"\>  
                            \<img id="slot-img-4" src="https://placehold.co/600x400/0f172a/10b981?text=Slot+4:+Batting+Cage" alt="Batting Cage Practice" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer" onclick="openPhotoModal(this.src, 'Slot 4: Batting Cage Session')"\>  
                            \<span class="absolute top-2 left-2 bg-slate-950/80 text-emerald-400 text-\[10px\] font-mono px-2 py-0.5 rounded border border-emerald-500/30"\>SLOT 04\</span\>  
                            \<button onclick="triggerSlotUpload(4)" class="absolute bottom-2 right-2 bg-slate-950/80 hover:bg-emerald-500 text-white hover:text-slate-950 p-1.5 rounded-lg text-xs transition-colors border border-emerald-500/30" title="Upload Picture"\>  
                                \<i class="fa-solid fa-upload"\>\</i\>  
                            \</button\>  
                        \</div\>  
                        \<div class="flex items-center justify-between pt-1"\>  
                            \<h4 class="font-gamer font-bold text-sm text-white truncate"\>Batting Cage Reps\</h4\>  
                            \<span class="text-\[10px\] font-mono text-emerald-400"\>TRAINING\</span\>  
                        \</div\>  
                        \<p class="text-\[11px\] text-slate-400 leading-snug"\>Working on exit velocity and line drive path.\</p\>  
                        \<input type="file" id="slot-file-4" class="hidden" accept="image/\*" onchange="handleSlotUpload(event, 4)"\>  
                    \</div\>

                    \<\!-- Slot 5 \--\>  
                    \<div class="hud-card p-3 rounded-2xl border border-slate-800 space-y-2 group"\>  
                        \<div class="relative overflow-hidden rounded-xl border border-slate-800 aspect-video bg-slate-900 flex items-center justify-center"\>  
                            \<img id="slot-img-5" src="https://placehold.co/600x400/0f172a/ec4899?text=Slot+5:+Live+Concert" alt="Live Concert Vibe" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer" onclick="openPhotoModal(this.src, 'Slot 5: Live Country/R\&B Concert')"\>  
                            \<span class="absolute top-2 left-2 bg-slate-950/80 text-pink-400 text-\[10px\] font-mono px-2 py-0.5 rounded border border-pink-500/30"\>SLOT 05\</span\>  
                            \<button onclick="triggerSlotUpload(5)" class="absolute bottom-2 right-2 bg-slate-950/80 hover:bg-pink-500 text-white hover:text-slate-950 p-1.5 rounded-lg text-xs transition-colors border border-pink-500/30" title="Upload Picture"\>  
                                \<i class="fa-solid fa-upload"\>\</i\>  
                            \</button\>  
                        \</div\>  
                        \<div class="flex items-center justify-between pt-1"\>  
                            \<h4 class="font-gamer font-bold text-sm text-white truncate"\>Concert Lights\</h4\>  
                            \<span class="text-\[10px\] font-mono text-pink-400"\>MUSIC\</span\>  
                        \</div\>  
                        \<p class="text-\[11px\] text-slate-400 leading-snug"\>Summer live music tour stage atmosphere.\</p\>  
                        \<input type="file" id="slot-file-5" class="hidden" accept="image/\*" onchange="handleSlotUpload(event, 5)"\>  
                    \</div\>

                    \<\!-- Slot 6 \--\>  
                    \<div class="hud-card p-3 rounded-2xl border border-slate-800 space-y-2 group"\>  
                        \<div class="relative overflow-hidden rounded-xl border border-slate-800 aspect-video bg-slate-900 flex items-center justify-center"\>  
                            \<img id="slot-img-6" src="https://placehold.co/600x400/0f172a/00f0ff?text=Slot+6:+Web+Design+Code" alt="Web Dev Workspace" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer" onclick="openPhotoModal(this.src, 'Slot 6: Web Design Workspace')"\>  
                            \<span class="absolute top-2 left-2 bg-slate-950/80 text-cyan-400 text-\[10px\] font-mono px-2 py-0.5 rounded border border-cyan-500/30"\>SLOT 06\</span\>  
                            \<button onclick="triggerSlotUpload(6)" class="absolute bottom-2 right-2 bg-slate-950/80 hover:bg-cyan-500 text-white hover:text-slate-950 p-1.5 rounded-lg text-xs transition-colors border border-cyan-500/30" title="Upload Picture"\>  
                                \<i class="fa-solid fa-upload"\>\</i\>  
                            \</button\>  
                        \</div\>  
                        \<div class="flex items-center justify-between pt-1"\>  
                            \<h4 class="font-gamer font-bold text-sm text-white truncate"\>VS Code Studio\</h4\>  
                            \<span class="text-\[10px\] font-mono text-cyan-400"\>WEB DEV\</span\>  
                        \</div\>  
                        \<p class="text-\[11px\] text-slate-400 leading-snug"\>Spec-Driven Development layout drafting.\</p\>  
                        \<input type="file" id="slot-file-6" class="hidden" accept="image/\*" onchange="handleSlotUpload(event, 6)"\>  
                    \</div\>

                    \<\!-- Slot 7 \--\>  
                    \<div class="hud-card p-3 rounded-2xl border border-slate-800 space-y-2 group"\>  
                        \<div class="relative overflow-hidden rounded-xl border border-slate-800 aspect-video bg-slate-900 flex items-center justify-center"\>  
                            \<img id="slot-img-7" src="https://placehold.co/600x400/0f172a/a855f7?text=Slot+7:+Victory+Royale" alt="Fortnite Squad Win" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer" onclick="openPhotoModal(this.src, 'Slot 7: Fortnite Victory Royale')"\>  
                            \<span class="absolute top-2 left-2 bg-slate-950/80 text-purple-400 text-\[10px\] font-mono px-2 py-0.5 rounded border border-purple-500/30"\>SLOT 07\</span\>  
                            \<button onclick="triggerSlotUpload(7)" class="absolute bottom-2 right-2 bg-slate-950/80 hover:bg-purple-500 text-white hover:text-slate-950 p-1.5 rounded-lg text-xs transition-colors border border-purple-500/30" title="Upload Picture"\>  
                                \<i class="fa-solid fa-upload"\>\</i\>  
                            \</button\>  
                        \</div\>  
                        \<div class="flex items-center justify-between pt-1"\>  
                            \<h4 class="font-gamer font-bold text-sm text-white truncate"\>Victory Royale\</h4\>  
                            \<span class="text-\[10px\] font-mono text-purple-400"\>GAMING\</span\>  
                        \</div\>  
                        \<p class="text-\[11px\] text-slate-400 leading-snug"\>Ranked Unreal squad crown victory screenshot.\</p\>  
                        \<input type="file" id="slot-file-7" class="hidden" accept="image/\*" onchange="handleSlotUpload(event, 7)"\>  
                    \</div\>

                    \<\!-- Slot 8 \--\>  
                    \<div class="hud-card p-3 rounded-2xl border border-slate-800 space-y-2 group"\>  
                        \<div class="relative overflow-hidden rounded-xl border border-slate-800 aspect-video bg-slate-900 flex items-center justify-center"\>  
                            \<img id="slot-img-8" src="https://placehold.co/600x400/0f172a/f59e0b?text=Slot+8:+Weight+Room" alt="Strength Workout" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer" onclick="openPhotoModal(this.src, 'Slot 8: Strength & Weight Room Workout')"\>  
                            \<span class="absolute top-2 left-2 bg-slate-950/80 text-amber-400 text-\[10px\] font-mono px-2 py-0.5 rounded border border-amber-500/30"\>SLOT 08\</span\>  
                            \<button onclick="triggerSlotUpload(8)" class="absolute bottom-2 right-2 bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 p-1.5 rounded-lg text-xs transition-colors border border-amber-500/30" title="Upload Picture"\>  
                                \<i class="fa-solid fa-upload"\>\</i\>  
                            \</button\>  
                        \</div\>  
                        \<div class="flex items-center justify-between pt-1"\>  
                            \<h4 class="font-gamer font-bold text-sm text-white truncate"\>Gym Conditioning\</h4\>  
                            \<span class="text-\[10px\] font-mono text-amber-400"\>FITNESS\</span\>  
                        \</div\>  
                        \<p class="text-\[11px\] text-slate-400 leading-snug"\>Rotational power core med-ball workout.\</p\>  
                        \<input type="file" id="slot-file-8" class="hidden" accept="image/\*" onchange="handleSlotUpload(event, 8)"\>  
                    \</div\>  
                \</div\>  
            \</div\>  
        \</section\>

        \<\!-- PAGE 3: FUTURE \--\>  
        \<section id="page-future" class="page-content space-y-8"\>  
            \<div class="border-b border-slate-800 pb-6"\>  
                \<span class="text-xs font-mono text-cyan-400 uppercase"\>Page 3 of 5\</span\>  
                \<h1 class="text-3xl font-gamer font-extrabold text-white tracking-wider uppercase"\>Future Roadmap & Aspirations\</h1\>  
                \<p class="text-slate-400 text-sm mt-1"\>My 4-year high school goals, academic targets, and MLB career trajectory.\</p\>  
            \</div\>

            \<\!-- High School 4-Year Interactive Timeline \--\>  
            \<div class="hud-panel p-6 rounded-3xl border border-cyan-500/30 space-y-6"\>  
                \<h2 class="text-lg font-gamer font-bold text-white uppercase tracking-wider flex items-center space-x-2"\>  
                    \<i class="fa-solid fa-graduation-cap text-cyber-cyan"\>\</i\>  
                    \<span\>High School 4-Year Academic & Athletic Milestones\</span\>  
                \</h2\>

                \<div class="grid grid-cols-1 md:grid-cols-4 gap-4"\>  
                    \<\!-- Year 1 \--\>  
                    \<div class="bg-slate-950/90 p-4 rounded-2xl border-2 border-cyan-500/60 relative space-y-3"\>  
                        \<div class="flex items-center justify-between"\>  
                            \<span class="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold"\>YEAR 1 (NOW)\</span\>  
                            \<i class="fa-solid fa-circle-check text-cyan-400"\>\</i\>  
                        \</div\>  
                        \<h3 class="font-gamer font-bold text-lg text-white"\>Freshman Year\</h3\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Master 1st-year Web Design, maintain a high GPA, and solidify starting positions on the baseball squad.\</p\>  
                        \<div class="space-y-1"\>  
                            \<div class="flex justify-between text-\[11px\] font-mono text-slate-300"\>\<span\>Target GPA:\</span\> \<strong\>3.8+\</strong\>\</div\>  
                            \<div class="flex justify-between text-\[11px\] font-mono text-slate-300"\>\<span\>Baseball:\</span\> \<strong\>JV/Varsity Roster\</strong\>\</div\>  
                        \</div\>  
                    \</div\>

                    \<\!-- Year 2 \--\>  
                    \<div class="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3 hover:border-purple-500/40 transition-colors"\>  
                        \<div class="flex items-center justify-between"\>  
                            \<span class="text-xs font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold"\>YEAR 2\</span\>  
                            \<i class="fa-solid fa-hourglass-half text-purple-400"\>\</i\>  
                        \</div\>  
                        \<h3 class="font-gamer font-bold text-lg text-white"\>Sophomore Year\</h3\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Enroll in AP Computer Science, increase fastball velocity, and build full-stack web applications.\</p\>  
                        \<div class="space-y-1"\>  
                            \<div class="flex justify-between text-\[11px\] font-mono text-slate-300"\>\<span\>Target GPA:\</span\> \<strong\>3.9+\</strong\>\</div\>  
                            \<div class="flex justify-between text-\[11px\] font-mono text-slate-300"\>\<span\>Pitching:\</span\> \<strong\>85+ MPH Fastball\</strong\>\</div\>  
                        \</div\>  
                    \</div\>

                    \<\!-- Year 3 \--\>  
                    \<div class="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-colors"\>  
                        \<div class="flex items-center justify-between"\>  
                            \<span class="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold"\>YEAR 3\</span\>  
                            \<i class="fa-solid fa-clock text-emerald-400"\>\</i\>  
                        \</div\>  
                        \<h3 class="font-gamer font-bold text-lg text-white"\>Junior Year\</h3\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Lead the baseball team in RBI and strikeout percentage, visit Division 1 college baseball programs.\</p\>  
                        \<div class="space-y-1"\>  
                            \<div class="flex justify-between text-\[11px\] font-mono text-slate-300"\>\<span\>SAT Target:\</span\> \<strong\>1350+\</strong\>\</div\>  
                            \<div class="flex justify-between text-\[11px\] font-mono text-slate-300"\>\<span\>Recruiting:\</span\> \<strong\>D1 Showcases\</strong\>\</div\>  
                        \</div\>  
                    \</div\>

                    \<\!-- Year 4 \--\>  
                    \<div class="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3 hover:border-amber-500/40 transition-colors"\>  
                        \<div class="flex items-center justify-between"\>  
                            \<span class="text-xs font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold"\>YEAR 4\</span\>  
                            \<i class="fa-solid fa-flag-checkered text-amber-400"\>\</i\>  
                        \</div\>  
                        \<h3 class="font-gamer font-bold text-lg text-white"\>Senior Year\</h3\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Win State Championship, declare collegiate commitments or prepare for MLB Amateur Draft.\</p\>  
                        \<div class="space-y-1"\>  
                            \<div class="flex justify-between text-\[11px\] font-mono text-slate-300"\>\<span\>Goal:\</span\> \<strong\>MLB Draft / D1 Scholarship\</strong\>\</div\>  
                        \</div\>  
                    \</div\>  
                \</div\>  
            \</div\>

            \<\!-- Ultimate Dream & College Aspirations \--\>  
            \<div class="grid grid-cols-1 md:grid-cols-2 gap-6"\>  
                \<div class="hud-card p-6 rounded-2xl border border-slate-800 space-y-3"\>  
                    \<div class="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl border border-amber-500/30"\>  
                        \<i class="fa-solid fa-trophy"\>\</i\>  
                    \</div\>  
                    \<h3 class="font-gamer font-bold text-xl text-white"\>MLB Pitcher & 1st Baseman Dream\</h3\>  
                    \<p class="text-slate-300 text-xs leading-relaxed"\>  
                        Playing professional baseball in the Major Leagues is my primary long-term dream. The dedication required to excel on the mound—discipline, strategic repetition, and mental resilience—directly mirrors my passion for mastering web engineering.  
                    \</p\>  
                \</div\>

                \<div class="hud-card p-6 rounded-2xl border border-slate-800 space-y-3"\>  
                    \<div class="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyber-cyan flex items-center justify-center text-xl border border-cyan-500/30"\>  
                        \<i class="fa-solid fa-laptop-code"\>\</i\>  
                    \</div\>  
                    \<h3 class="font-gamer font-bold text-xl text-white"\>Software & Web Engineering\</h3\>  
                    \<p class="text-slate-300 text-xs leading-relaxed"\>  
                        Combining computer science with sports analytics. My secondary focus is creating sports tech software, pitching velocity telemetry web dashboards, and game engines using modern web technologies.  
                    \</p\>  
                \</div\>  
            \</div\>  
        \</section\>

        \<\!-- PAGE 4: SPORTS \--\>  
        \<section id="page-sports" class="page-content space-y-8"\>  
            \<div class="border-b border-slate-800 pb-6"\>  
                \<span class="text-xs font-mono text-amber-400 uppercase"\>Page 4 of 5\</span\>  
                \<h1 class="text-3xl font-gamer font-extrabold text-white tracking-wider uppercase"\>Sports & Athletic Conditioning\</h1\>  
                \<p class="text-slate-400 text-sm mt-1"\>Baseball performance metrics, pitching velocity stats, and workout schedules.\</p\>  
            \</div\>

            \<\!-- Baseball Stat Cards \--\>  
            \<div class="grid grid-cols-2 sm:grid-cols-4 gap-4"\>  
                \<div class="hud-card p-4 rounded-xl border border-slate-800 text-center space-y-1"\>  
                    \<span class="text-\[10px\] font-mono text-amber-400 uppercase"\>Primary Positions\</span\>  
                    \<h4 class="font-gamer font-extrabold text-2xl text-white"\>1B / RHP\</h4\>  
                    \<span class="text-\[11px\] text-slate-400"\>1st Base & Pitcher\</span\>  
                \</div\>

                \<div class="hud-card p-4 rounded-xl border border-slate-800 text-center space-y-1"\>  
                    \<span class="text-\[10px\] font-mono text-cyan-400 uppercase"\>Top Pitch Speed\</span\>  
                    \<h4 class="font-gamer font-extrabold text-2xl text-white"\>82 \<span class="text-xs text-cyan-400"\>MPH\</span\>\</h4\>  
                    \<span class="text-\[11px\] text-slate-400"\>Freshman Baseline\</span\>  
                \</div\>

                \<div class="hud-card p-4 rounded-xl border border-slate-800 text-center space-y-1"\>  
                    \<span class="text-\[10px\] font-mono text-emerald-400 uppercase"\>Batting Avg\</span\>  
                    \<h4 class="font-gamer font-extrabold text-2xl text-white"\>.385\</h4\>  
                    \<span class="text-\[11px\] text-slate-400"\>Spring Season\</span\>  
                \</div\>

                \<div class="hud-card p-4 rounded-xl border border-slate-800 text-center space-y-1"\>  
                    \<span class="text-\[10px\] font-mono text-purple-400 uppercase"\>Fielding %\</span\>  
                    \<h4 class="font-gamer font-extrabold text-2xl text-white"\>.982\</h4\>  
                    \<span class="text-\[11px\] text-slate-400"\>Infield Reliability\</span\>  
                \</div\>  
            \</div\>

            \<\!-- Interactive Baseball Stat Calculator \--\>  
            \<div class="hud-panel p-6 rounded-3xl border border-amber-500/30 space-y-4"\>  
                \<h2 class="text-lg font-gamer font-bold text-white uppercase tracking-wider flex items-center space-x-2"\>  
                    \<i class="fa-solid fa-calculator text-amber-400"\>\</i\>  
                    \<span\>Interactive Batting Average & ERA Calculator\</span\>  
                \</h2\>

                \<div class="grid grid-cols-1 md:grid-cols-2 gap-6"\>  
                    \<\!-- Batting Calc \--\>  
                    \<div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3"\>  
                        \<h4 class="font-gamer font-bold text-amber-300 text-base"\>Batting Average (AVG)\</h4\>  
                        \<div class="grid grid-cols-2 gap-3"\>  
                            \<div\>  
                                \<label class="text-\[11px\] font-mono text-slate-400 block mb-1"\>Hits\</label\>  
                                \<input type="number" id="calc-hits" value="25" oninput="calculateStats()" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white code-font"\>  
                            \</div\>  
                            \<div\>  
                                \<label class="text-\[11px\] font-mono text-slate-400 block mb-1"\>At Bats (AB)\</label\>  
                                \<input type="number" id="calc-ab" value="65" oninput="calculateStats()" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white code-font"\>  
                            \</div\>  
                        \</div\>  
                        \<div class="p-3 bg-slate-900/90 rounded-lg border border-amber-500/30 flex justify-between items-center"\>  
                            \<span class="text-xs font-mono text-slate-300"\>Calculated AVG:\</span\>  
                            \<span id="res-avg" class="text-lg font-gamer font-bold text-amber-400"\>.385\</span\>  
                        \</div\>  
                    \</div\>

                    \<\!-- ERA Calc \--\>  
                    \<div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3"\>  
                        \<h4 class="font-gamer font-bold text-cyan-300 text-base"\>Earned Run Average (ERA)\</h4\>  
                        \<div class="grid grid-cols-2 gap-3"\>  
                            \<div\>  
                                \<label class="text-\[11px\] font-mono text-slate-400 block mb-1"\>Earned Runs (ER)\</label\>  
                                \<input type="number" id="calc-er" value="6" oninput="calculateStats()" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white code-font"\>  
                            \</div\>  
                            \<div\>  
                                \<label class="text-\[11px\] font-mono text-slate-400 block mb-1"\>Innings Pitched (IP)\</label\>  
                                \<input type="number" id="calc-ip" value="21" oninput="calculateStats()" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white code-font"\>  
                            \</div\>  
                        \</div\>  
                        \<div class="p-3 bg-slate-900/90 rounded-lg border border-cyan-500/30 flex justify-between items-center"\>  
                            \<span class="text-xs font-mono text-slate-300"\>Calculated ERA:\</span\>  
                            \<span id="res-era" class="text-lg font-gamer font-bold text-cyber-cyan"\>2.00\</span\>  
                        \</div\>  
                    \</div\>  
                \</div\>  
            \</div\>

            \<\!-- Weekly Training Routine Table \--\>  
            \<div class="hud-panel p-6 rounded-3xl border border-slate-800 space-y-4"\>  
                \<h2 class="text-lg font-gamer font-bold text-white uppercase tracking-wider flex items-center space-x-2"\>  
                    \<i class="fa-solid fa-dumbbell text-purple-400"\>\</i\>  
                    \<span\>Weekly Conditioning Schedule\</span\>  
                \</h2\>

                \<div class="overflow-x-auto"\>  
                    \<table class="w-full text-left border-collapse text-xs"\>  
                        \<thead\>  
                            \<tr class="border-b border-slate-800 font-mono text-purple-400"\>  
                                \<th class="p-3"\>DAY\</th\>  
                                \<th class="p-3"\>FOCUS AREA\</th\>  
                                \<th class="p-3"\>DRILLS & EXERCISES\</th\>  
                                \<th class="p-3"\>INTENSITY\</th\>  
                            \</tr\>  
                        \</thead\>  
                        \<tbody class="divide-y divide-slate-800/60 font-sans text-slate-300"\>  
                            \<tr\>  
                                \<td class="p-3 font-mono font-bold text-white"\>Mon / Wed\</td\>  
                                \<td class="p-3 text-cyan-300 font-semibold"\>Pitching Mechanics & Bullpen\</td\>  
                                \<td class="p-3"\>Flat ground throwing, long toss, 30-pitch bullpen, changeup command\</td\>  
                                \<td class="p-3"\>\<span class="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-\[10px\] font-mono"\>HIGH\</span\>\</td\>  
                            \</tr\>  
                            \<tr\>  
                                \<td class="p-3 font-mono font-bold text-white"\>Tue / Thu\</td\>  
                                \<td class="p-3 text-purple-300 font-semibold"\>Strength & Bat Speed\</td\>  
                                \<td class="p-3"\>Squats, deadlifts, rotational core med-ball throws, tee work\</td\>  
                                \<td class="p-3"\>\<span class="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-\[10px\] font-mono"\>HEAVY\</span\>\</td\>  
                            \</tr\>  
                            \<tr\>  
                                \<td class="p-3 font-mono font-bold text-white"\>Friday\</td\>  
                                \<td class="p-3 text-amber-300 font-semibold"\>Infield & Footwork\</td\>  
                                \<td class="p-3"\>1B scoop drills, double-play turns, reaction sprints\</td\>  
                                \<td class="p-3"\>\<span class="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-\[10px\] font-mono"\>MEDIUM\</span\>\</td\>  
                            \</tr\>  
                            \<tr\>  
                                \<td class="p-3 font-mono font-bold text-white"\>Sat / Sun\</td\>  
                                \<td class="p-3 text-emerald-300 font-semibold"\>Game Day / Active Recovery\</td\>  
                                \<td class="p-3"\>Official games, mobility stretching, arm care band work\</td\>  
                                \<td class="p-3"\>\<span class="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-\[10px\] font-mono"\>PEAK\</span\>\</td\>  
                            \</tr\>  
                        \</tbody\>  
                    \</table\>  
                \</div\>  
            \</div\>  
        \</section\>

        \<\!-- PAGE 5: PROJECTS \--\>  
        \<section id="page-projects" class="page-content space-y-8"\>  
            \<div class="border-b border-slate-800 pb-6"\>  
                \<span class="text-xs font-mono text-emerald-400 uppercase"\>Page 5 of 5\</span\>  
                \<h1 class="text-3xl font-gamer font-extrabold text-white tracking-wider uppercase"\>Projects & Tech Workstation\</h1\>  
                \<p class="text-slate-400 text-sm mt-1"\>Web Design coursework, coding projects, and hardware rig specifications.\</p\>  
            \</div\>

            \<\!-- Workstation Rig Specs \--\>  
            \<div class="hud-panel p-6 rounded-3xl border border-emerald-500/30 space-y-4"\>  
                \<h2 class="text-lg font-gamer font-bold text-white uppercase tracking-wider flex items-center space-x-2"\>  
                    \<i class="fa-solid fa-desktop text-emerald-400"\>\</i\>  
                    \<span\>Gaming & Development Hardware Rig Specs\</span\>  
                \</h2\>

                \<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"\>  
                    \<div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1"\>  
                        \<span class="text-\[10px\] font-mono text-slate-400 uppercase"\>Processor (CPU)\</span\>  
                        \<h4 class="font-gamer font-bold text-white text-base"\>Intel Core i7-13700K\</h4\>  
                        \<p class="text-xs text-emerald-400"\>16 Cores • 5.4 GHz Turbo\</p\>  
                    \</div\>

                    \<div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1"\>  
                        \<span class="text-\[10px\] font-mono text-slate-400 uppercase"\>Graphics (GPU)\</span\>  
                        \<h4 class="font-gamer font-bold text-white text-base"\>NVIDIA RTX 4070 Ti\</h4\>  
                        \<p class="text-xs text-emerald-400"\>12GB GDDR6X VRAM\</p\>  
                    \</div\>

                    \<div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1"\>  
                        \<span class="text-\[10px\] font-mono text-slate-400 uppercase"\>Displays\</span\>  
                        \<h4 class="font-gamer font-bold text-white text-base"\>Dual 27" 165Hz IPS\</h4\>  
                        \<p class="text-xs text-emerald-400"\>1440p High Refresh Rate\</p\>  
                    \</div\>

                    \<div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1"\>  
                        \<span class="text-\[10px\] font-mono text-slate-400 uppercase"\>Peripherals\</span\>  
                        \<h4 class="font-gamer font-bold text-white text-base"\>Custom Mechanical Keyboard\</h4\>  
                        \<p class="text-xs text-emerald-400"\>Linear Switches • Lightweight Mouse\</p\>  
                    \</div\>  
                \</div\>  
            \</div\>

            \<\!-- Web Dev Coursework Showcase \--\>  
            \<div class="space-y-4"\>  
                \<h2 class="text-xl font-gamer font-bold text-white tracking-wider uppercase flex items-center space-x-2"\>  
                    \<i class="fa-solid fa-folder-open text-cyber-cyan"\>\</i\>  
                    \<span\>Web Design Course Assignments\</span\>  
                \</h2\>

                \<div class="grid grid-cols-1 md:grid-cols-3 gap-6"\>  
                    \<div class="hud-card p-5 rounded-2xl border border-slate-800 space-y-3"\>  
                        \<div class="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyber-cyan flex items-center justify-center text-lg border border-cyan-500/30"\>  
                            \<i class="fa-solid fa-sitemap"\>\</i\>  
                        \</div\>  
                        \<span class="text-\[10px\] font-mono text-cyan-400"\>PROJECT \#01\</span\>  
                        \<h3 class="font-gamer font-bold text-lg text-white"\>5-Page Gaming Web App\</h3\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Built with Spec-Driven Development principles, Tailwind CSS, HUD aesthetics, and full responsive layout.\</p\>  
                        \<span class="inline-block bg-cyan-500/20 text-cyan-300 text-\[10px\] font-mono px-2 py-0.5 rounded border border-cyan-500/30"\>COMPLETED\</span\>  
                    \</div\>

                    \<div class="hud-card p-5 rounded-2xl border border-slate-800 space-y-3"\>  
                        \<div class="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg border border-purple-500/30"\>  
                            \<i class="fa-solid fa-sliders"\>\</i\>  
                        \</div\>  
                        \<span class="text-\[10px\] font-mono text-purple-400"\>PROJECT \#02\</span\>  
                        \<h3 class="font-gamer font-bold text-lg text-white"\>Interactive Settings & Theme Engine\</h3\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Local storage theme customization, name editor, avatar updates, and real-time document manipulation.\</p\>  
                        \<span class="inline-block bg-purple-500/20 text-purple-300 text-\[10px\] font-mono px-2 py-0.5 rounded border border-purple-500/30"\>COMPLETED\</span\>  
                    \</div\>

                    \<div class="hud-card p-5 rounded-2xl border border-slate-800 space-y-3"\>  
                        \<div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg border border-amber-500/30"\>  
                            \<i class="fa-solid fa-chart-line"\>\</i\>  
                        \</div\>  
                        \<span class="text-\[10px\] font-mono text-amber-400"\>PROJECT \#03\</span\>  
                        \<h3 class="font-gamer font-bold text-lg text-white"\>Baseball Stat Metrics Widget\</h3\>  
                        \<p class="text-slate-400 text-xs leading-relaxed"\>Calculates real-time batting averages and earned run averages with JavaScript form inputs.\</p\>  
                        \<span class="inline-block bg-amber-500/20 text-amber-300 text-\[10px\] font-mono px-2 py-0.5 rounded border border-amber-500/30"\>COMPLETED\</span\>  
                    \</div\>  
                \</div\>  
            \</div\>

            \<\!-- Contact Form \--\>  
            \<div class="hud-panel p-6 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-4"\>  
                \<h2 class="text-lg font-gamer font-bold text-white uppercase tracking-wider flex items-center space-x-2"\>  
                    \<i class="fa-solid fa-paper-plane text-cyber-cyan"\>\</i\>  
                    \<span\>Send Message / Class Feedback\</span\>  
                \</h2\>

                \<form id="contact-form" onsubmit="handleContactSubmit(event)" class="space-y-4"\>  
                    \<div\>  
                        \<label class="text-xs font-mono text-slate-300 block mb-1"\>Your Name\</label\>  
                        \<input type="text" id="contact-name" required placeholder="Classmate or Instructor Name" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none code-font"\>  
                    \</div\>

                    \<div\>  
                        \<label class="text-xs font-mono text-slate-300 block mb-1"\>Message\</label\>  
                        \<textarea id="contact-msg" rows="3" required placeholder="Leave a comment on my website layout or web design project..." class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none code-font"\>\</textarea\>  
                    \</div\>

                    \<button type="submit" class="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-gamer font-bold py-2.5 rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"\>  
                        Send Feedback  
                    \</button\>  
                \</form\>  
                \<div id="contact-success" class="hidden p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-xs font-mono text-emerald-300"\>  
                    \<i class="fa-solid fa-circle-check mr-1"\>\</i\> Message sent successfully\! Thanks for visiting my gaming portfolio.  
                \</div\>  
            \</div\>  
        \</section\>

        \<\!-- SETTINGS PANEL \--\>  
        \<section id="page-settings" class="page-content space-y-8"\>  
            \<div class="border-b border-slate-800 pb-6"\>  
                \<span class="text-xs font-mono text-cyber-cyan uppercase"\>Control Center\</span\>  
                \<h1 class="text-3xl font-gamer font-extrabold text-white tracking-wider uppercase"\>Website Preferences & HUD Settings\</h1\>  
                \<p class="text-slate-400 text-sm mt-1"\>Customize display options, developer credentials, and local saved state.\</p\>  
            \</div\>

            \<div class="hud-panel p-6 rounded-3xl border border-cyan-500/30 max-w-3xl mx-auto space-y-6"\>  
                \<\!-- User Information Editor \--\>  
                \<div class="space-y-4"\>  
                    \<h3 class="font-gamer font-bold text-lg text-white border-b border-slate-800 pb-2"\>Profile & Tagline Editor\</h3\>  
                    \<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"\>  
                        \<div\>  
                            \<label class="text-xs font-mono text-slate-400 block mb-1"\>Developer Gamer Tag\</label\>  
                            \<input type="text" id="settings-name-input" value="ALEX" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white code-font focus:border-cyan-400 focus:outline-none"\>  
                        \</div\>  
                        \<div\>  
                            \<label class="text-xs font-mono text-slate-400 block mb-1"\>Tagline\</label\>  
                            \<input type="text" id="settings-tagline-input" value="Freshman Year • Web Design Student" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white code-font focus:border-cyan-400 focus:outline-none"\>  
                        \</div\>  
                    \</div\>  
                \</div\>

                \<\!-- Color Accent Selection \--\>  
                \<div class="space-y-3"\>  
                    \<h3 class="font-gamer font-bold text-lg text-white border-b border-slate-800 pb-2"\>Cyber Theme Accent Color\</h3\>  
                    \<div class="flex flex-wrap gap-3"\>  
                        \<button onclick="setThemeAccent('\#00f0ff')" class="px-4 py-2 rounded-xl text-xs font-gamer font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30"\>  
                            Cyan Neon  
                        \</button\>  
                        \<button onclick="setThemeAccent('\#a855f7')" class="px-4 py-2 rounded-xl text-xs font-gamer font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/50 hover:bg-purple-500/30"\>  
                            Electric Purple  
                        \</button\>  
                        \<button onclick="setThemeAccent('\#ec4899')" class="px-4 py-2 rounded-xl text-xs font-gamer font-bold uppercase bg-pink-500/20 text-pink-300 border border-pink-500/50 hover:bg-pink-500/30"\>  
                            Cyber Pink  
                        \</button\>  
                        \<button onclick="setThemeAccent('\#10b981')" class="px-4 py-2 rounded-xl text-xs font-gamer font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30"\>  
                            Matrix Emerald  
                        \</button\>  
                    \</div\>  
                \</div\>

                \<\!-- Action Button \--\>  
                \<div class="pt-2"\>  
                    \<button onclick="saveSettings()" class="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-gamer font-bold py-2.5 rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25"\>  
                        Save Preferences  
                    \</button\>  
                    \<p id="settings-saved-toast" class="text-xs font-mono text-emerald-400 text-center mt-2 hidden"\>\<i class="fa-solid fa-check mr-1"\>\</i\> Preferences saved\!\</p\>  
                \</div\>  
            \</div\>  
        \</section\>

    \</main\>

    \<\!-- SPEC INSPECTOR DRAWER \--\>  
    \<div id="spec-drawer" class="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-950/95 backdrop-filter blur-xl border-l border-cyan-500/40 z-50 transform translate-x-full transition-transform duration-300 shadow-2xl flex flex-col"\>  
        \<div class="p-4 border-b border-slate-800 flex items-center justify-between"\>  
            \<div class="flex items-center space-x-2 text-cyber-cyan font-mono text-xs"\>  
                \<i class="fa-solid fa-terminal text-purple-400"\>\</i\>  
                \<span class="font-bold uppercase tracking-wider"\>SPEC INSPECTOR\</span\>  
            \</div\>  
            \<button onclick="toggleSpecDrawer()" class="text-slate-400 hover:text-white p-1"\>  
                \<i class="fa-solid fa-xmark text-lg"\>\</i\>  
            \</button\>  
        \</div\>

        \<div class="p-5 flex-1 overflow-y-auto space-y-4 code-font text-xs"\>  
            \<div\>  
                \<span class="text-\[10px\] text-cyan-400 uppercase block"\>Active Page\</span\>  
                \<h4 id="spec-page-title" class="text-white font-bold text-sm"\>PAGE 1: HOME\</h4\>  
            \</div\>

            \<div class="space-y-1"\>  
                \<span class="text-\[10px\] text-purple-400 uppercase block"\>Page Architecture & Specs\</span\>  
                \<pre id="spec-page-json" class="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-300 text-\[11px\] overflow-x-auto whitespace-pre-wrap"\>\</pre\>  
            \</div\>

            \<div class="space-y-1"\>  
                \<span class="text-\[10px\] text-emerald-400 uppercase block"\>Tech Stack\</span\>  
                \<ul class="list-disc list-inside text-slate-400 space-y-1"\>  
                    \<li\>Single-file HTML5 structure\</li\>  
                    \<li\>Tailwind CSS Utility Framework\</li\>  
                    \<li\>Google Fonts (Inter, Rajdhani, JetBrains Mono)\</li\>  
                    \<li\>Font Awesome Icon Library\</li\>  
                    \<li\>Vanilla JavaScript DOM State Engine\</li\>  
                    \<li\>Web Audio API Synthesizer\</li\>  
                \</ul\>  
            \</div\>  
        \</div\>  
    \</div\>

    \<\!-- Footer \--\>  
    \<footer class="border-t border-slate-800/80 bg-slate-950/80 py-6"\>  
        \<div class="max-w-7xl mx-auto px-4 text-center space-y-2"\>  
            \<p class="text-xs font-gamer tracking-wider text-slate-400"\>  
                ALEX.DEV • 1ST YEAR WEB DESIGN COURSE PORTFOLIO • SPEC-DRIVEN DEVELOPMENT  
            \</p\>  
            \<p class="text-\[11px\] font-mono text-slate-400"\>  
                Designed for Desktop, Tablet, and Mobile Viewing  
            \</p\>  
        \</div\>  
    \</footer\>

    \<\!-- Photo Lightbox Modal \--\>  
    \<div id="photo-modal" class="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 hidden flex-col items-center justify-center p-4"\>  
        \<div class="relative max-w-4xl w-full bg-slate-900 border border-cyan-500/40 rounded-2xl p-4 shadow-2xl space-y-3"\>  
            \<div class="flex items-center justify-between border-b border-slate-800 pb-2"\>  
                \<span id="photo-modal-title" class="font-gamer font-bold text-white text-base"\>Photo Lightbox\</span\>  
                \<button onclick="closePhotoModal()" class="text-slate-400 hover:text-white p-1"\>  
                    \<i class="fa-solid fa-xmark text-xl"\>\</i\>  
                \</button\>  
            \</div\>  
            \<div class="flex items-center justify-center max-h-\[75vh\] overflow-hidden rounded-xl border border-slate-800 bg-black"\>  
                \<img id="photo-modal-img" src="" alt="Enlarged View" class="max-h-\[70vh\] w-auto object-contain"\>  
            \</div\>  
        \</div\>  
    \</div\>

    \<\!-- JAVASCRIPT APP CONTROLLER \--\>  
    \<script\>  
        // Page Specifications Database  
        const pageSpecs \= {  
            home: {  
                page: "Page 1: Home Dashboard",  
                purpose: "Introduce ALEX, highlight Web Design coursework, display profile picture HUD with upload features, and showcase recent updates.",  
                components: \["Hero Banner", "Profile Picture HUD Widget", "Local/URL Image Converter", "Activity Feed", "Level Selector Directory"\],  
                vibe: "Cyberpunk Gamer HUD",  
                responsive: "Fluid Grid (1 to 12 columns)"  
            },  
            media: {  
                page: "Page 2: Media & Vibe Hub",  
                purpose: "Display favorite music artists, competitive video games, and tech YouTube channels with category filters.",  
                components: \["Media Category Filter", "Web Audio Ambient Synth Player", "Game Stat Cards", "Playlist Overview"\],  
                vibe: "Neon Music & Gaming Showcase",  
                responsive: "3-column responsive grid"  
            },  
            future: {  
                page: "Page 3: Future & High School Roadmap",  
                purpose: "Outline 4-year high school goals, GPA targets, pitching speed milestones, and MLB aspirations.",  
                components: \["4-Year Interactive Timeline", "Academic Goal Cards", "Career Aspirations Overview"\],  
                vibe: "Forward-looking Tech Roadmap",  
                responsive: "4-stage horizontal/vertical milestone layout"  
            },  
            sports: {  
                page: "Page 4: Sports & Conditioning",  
                purpose: "Track baseball performance, pitching velocity, live batting average / ERA calculation, and weekly workouts.",  
                components: \["Stat Metric Cards", "Interactive Stat Calculator", "Weekly Schedule Table"\],  
                vibe: "Athletic Performance Dashboard",  
                responsive: "Dynamic stat cards & scrollable table"  
            },  
            projects: {  
                page: "Page 5: Projects & Workstation Setup",  
                purpose: "Showcase Web Design course projects, custom PC hardware rig specifications, and visitor contact form.",  
                components: \["Hardware Rig Spec Cards", "Web Coursework Gallery", "Interactive Feedback Form"\],  
                vibe: "Developer Workstation",  
                responsive: "Grid cards with form validation"  
            },  
            settings: {  
                page: "Control Center / Settings",  
                purpose: "Allow user to modify developer name, tagline, HUD theme accents, and save local preferences.",  
                components: \["Name & Tagline Form", "Theme Color Picker", "Local Storage Manager"\],  
                vibe: "System Config Terminal",  
                responsive: "Centered control card"  
            }  
        };

        let activePage \= 'home';  
        let audioCtx \= null;  
        let isPlayingAudio \= false;

        // Switch Page Handler  
        function switchPage(pageId) {  
            activePage \= pageId;

            // Hide all pages  
            document.querySelectorAll('.page-content').forEach(el \=\> el.classList.remove('active'));

            // Show selected page  
            const target \= document.getElementById(\`page-${pageId}\`);  
            if (target) {  
                target.classList.add('active');  
            }

            // Update nav button styling  
            document.querySelectorAll('.nav-btn').forEach(btn \=\> {  
                btn.className \= "nav-btn px-4 py-1.5 rounded-full text-xs font-gamer font-bold tracking-wider uppercase transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800";  
            });

            const activeBtn \= document.getElementById(\`nav-${pageId}\`);  
            if (activeBtn) {  
                activeBtn.className \= "nav-btn px-4 py-1.5 rounded-full text-xs font-gamer font-bold tracking-wider uppercase transition-all duration-200 text-cyan-400 bg-cyan-500/20 border border-cyan-500/40";  
            }

            // Update Spec Inspector info  
            updateSpecDrawerInfo(pageId);

            // Scroll to top  
            window.scrollTo({ top: 0, behavior: 'smooth' });  
        }

        // Toggle Mobile Navigation Menu  
        function toggleMobileMenu() {  
            const menu \= document.getElementById('mobile-menu');  
            menu.classList.toggle('hidden');  
        }

        // Toggle Spec Inspector Drawer  
        function toggleSpecDrawer() {  
            const drawer \= document.getElementById('spec-drawer');  
            drawer.classList.toggle('translate-x-full');  
        }

        // Update Spec Drawer Content  
        function updateSpecDrawerInfo(pageId) {  
            const spec \= pageSpecs\[pageId\] || pageSpecs\['home'\];  
            document.getElementById('spec-page-title').innerText \= spec.page;  
            document.getElementById('spec-page-json').innerText \= JSON.stringify(spec, null, 2);  
        }

        // Profile Picture Avatar Local Upload  
        function handleAvatarUpload(event) {  
            const file \= event.target.files\[0\];  
            if (file) {  
                const reader \= new FileReader();  
                reader.onload \= function(e) {  
                    const avatarUrl \= e.target.result;  
                    const img \= document.getElementById('hud-avatar-img');  
                    if (img) img.src \= avatarUrl;

                    // Persist in localStorage  
                    try {  
                        localStorage.setItem('alex\_avatar', avatarUrl);  
                    } catch(err) {  
                        console.warn("Storage warning:", err);  
                    }

                    // Cloud persist if available  
                    if (window.saveAvatarToCloud) {  
                        window.saveAvatarToCloud(avatarUrl);  
                    }  
                };  
                reader.readAsDataURL(file);  
            }  
        }

        // Toggle Avatar URL Link Input  
        function toggleAvatarUrlInput() {  
            const container \= document.getElementById('avatar-url-container');  
            container.classList.toggle('hidden');  
            document.getElementById('avatar-url-error').classList.add('hidden');  
        }

        // Apply Avatar URL Link  
        function applyAvatarUrl() {  
            const input \= document.getElementById('profile-avatar-url-input');  
            const error \= document.getElementById('avatar-url-error');  
            const url \= input.value.trim();

            if (url && (url.startsWith('http://') || url.startsWith('https://'))) {  
                error.classList.add('hidden');  
                const img \= document.getElementById('hud-avatar-img');  
                if (img) img.src \= url;

                try {  
                    localStorage.setItem('alex\_avatar', url);  
                } catch(e) {}

                if (window.saveAvatarToCloud) {  
                    window.saveAvatarToCloud(url);  
                }

                toggleAvatarUrlInput();  
            } else {  
                error.classList.remove('hidden');  
            }  
        }

        // Media Filter Handler  
        function filterMedia(category) {  
            const cards \= document.querySelectorAll('.media-card');  
            const buttons \= document.querySelectorAll('.media-filter-btn');

            buttons.forEach(btn \=\> {  
                btn.className \= "media-filter-btn px-3 py-1.5 rounded-lg text-xs font-gamer font-bold uppercase bg-slate-900 text-slate-300 hover:bg-slate-800";  
            });

            event.target.className \= "media-filter-btn px-3 py-1.5 rounded-lg text-xs font-gamer font-bold uppercase bg-purple-600 text-white";

            cards.forEach(card \=\> {  
                if (category \=== 'all' || card.classList.contains(category)) {  
                    card.style.display \= 'block';  
                } else {  
                    card.style.display \= 'none';  
                }  
            });  
        }

        // Web Audio Synth Lo-Fi Generator  
        function toggleVibeAudio() {  
            const icon \= document.getElementById('vibe-audio-icon');  
            const status \= document.getElementById('vibe-audio-status');

            if (\!isPlayingAudio) {  
                try {  
                    audioCtx \= new (window.AudioContext || window.webkitAudioContext)();  
                    playLoFiSynth();  
                    isPlayingAudio \= true;  
                    icon.className \= "fa-solid fa-pause";  
                    status.innerText \= "Playing synth lo-fi focus loop... (Click button to stop)";  
                } catch(e) {  
                    console.error("Audio error:", e);  
                }  
            } else {  
                if (audioCtx) {  
                    audioCtx.close();  
                }  
                isPlayingAudio \= false;  
                icon.className \= "fa-solid fa-play";  
                status.innerText \= "Click play to launch ambient web audio synth loops for coding focus.";  
            }  
        }

        function playLoFiSynth() {  
            if (\!audioCtx) return;  
              
            const notes \= \[220, 261.63, 329.63, 392.00\]; // A minor chord frequencies  
            let noteIdx \= 0;

            function playNote() {  
                if (\!isPlayingAudio) return;  
                const osc \= audioCtx.createOscillator();  
                const gain \= audioCtx.createGain();

                osc.type \= 'sine';  
                osc.frequency.setValueAtTime(notes\[noteIdx % notes.length\], audioCtx.currentTime);  
                  
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);  
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime \+ 1.2);

                osc.connect(gain);  
                gain.connect(audioCtx.destination);

                osc.start();  
                osc.stop(audioCtx.currentTime \+ 1.2);

                noteIdx++;  
                setTimeout(playNote, 600);  
            }

            playNote();  
        }

        // Baseball Stat Calculator Logic  
        function calculateStats() {  
            const hits \= parseFloat(document.getElementById('calc-hits').value) || 0;  
            const ab \= parseFloat(document.getElementById('calc-ab').value) || 1;  
            const er \= parseFloat(document.getElementById('calc-er').value) || 0;  
            const ip \= parseFloat(document.getElementById('calc-ip').value) || 1;

            const avg \= hits / ab;  
            const era \= (er \* 9\) / ip;

            document.getElementById('res-avg').innerText \= avg.toFixed(3).replace(/^0/, '');  
            document.getElementById('res-era').innerText \= era.toFixed(2);  
        }

        // Contact Form Submission  
        function handleContactSubmit(e) {  
            e.preventDefault();  
            document.getElementById('contact-form').reset();  
            const successMsg \= document.getElementById('contact-success');  
            successMsg.classList.remove('hidden');  
            setTimeout(() \=\> {  
                successMsg.classList.add('hidden');  
            }, 5000);  
        }

        // Theme Accent Adjuster  
        function setThemeAccent(colorHex) {  
            document.getElementById('logo-accent').style.color \= colorHex;  
        }

        // Photo Gallery Slot Handlers  
        function triggerSlotUpload(slotId) {  
            const input \= document.getElementById(\`slot-file-${slotId}\`);  
            if (input) input.click();  
        }

        function handleSlotUpload(event, slotId) {  
            const file \= event.target.files\[0\];  
            if (file) {  
                const reader \= new FileReader();  
                reader.onload \= function(e) {  
                    const imgUrl \= e.target.result;  
                    const img \= document.getElementById(\`slot-img-${slotId}\`);  
                    if (img) img.src \= imgUrl;

                    try {  
                        localStorage.setItem(\`alex\_slot\_img\_${slotId}\`, imgUrl);  
                    } catch(err) {  
                        console.warn("Storage quota limit reached for image slot");  
                    }  
                };  
                reader.readAsDataURL(file);  
            }  
        }

        function openPhotoModal(src, title) {  
            const modal \= document.getElementById('photo-modal');  
            const modalImg \= document.getElementById('photo-modal-img');  
            const modalTitle \= document.getElementById('photo-modal-title');

            if (modal && modalImg && modalTitle) {  
                modalImg.src \= src;  
                modalTitle.innerText \= title || 'Media Picture Preview';  
                modal.classList.remove('hidden');  
                modal.classList.add('flex');  
            }  
        }

        function closePhotoModal() {  
            const modal \= document.getElementById('photo-modal');  
            if (modal) {  
                modal.classList.add('hidden');  
                modal.classList.remove('flex');  
            }  
        }

        // Settings Save Handler  
        function saveSettings() {  
            const nameVal \= document.getElementById('settings-name-input').value.trim();  
            const taglineVal \= document.getElementById('settings-tagline-input').value.trim();

            if (nameVal) {  
                document.getElementById('hero-display-name').innerText \= nameVal;  
            }  
            if (taglineVal) {  
                document.getElementById('hero-display-tagline').innerText \= taglineVal;  
            }

            try {  
                localStorage.setItem('alex\_name', nameVal);  
                localStorage.setItem('alex\_tagline', taglineVal);  
            } catch(e) {}

            const toast \= document.getElementById('settings-saved-toast');  
            toast.classList.remove('hidden');  
            setTimeout(() \=\> toast.classList.add('hidden'), 3000);  
        }

        // Initialize saved preferences  
        window.onload \= function() {  
            updateSpecDrawerInfo('home');

            try {  
                const savedAvatar \= localStorage.getItem('alex\_avatar');  
                if (savedAvatar) {  
                    const img \= document.getElementById('hud-avatar-img');  
                    if (img) img.src \= savedAvatar;  
                }

                // Load saved picture slots  
                for (let i \= 1; i \<= 8; i++) {  
                    const savedSlotImg \= localStorage.getItem(\`alex\_slot\_img\_${i}\`);  
                    if (savedSlotImg) {  
                        const img \= document.getElementById(\`slot-img-${i}\`);  
                        if (img) img.src \= savedSlotImg;  
                    }  
                }

                const savedName \= localStorage.getItem('alex\_name');  
                if (savedName) {  
                    document.getElementById('hero-display-name').innerText \= savedName;  
                    document.getElementById('settings-name-input').value \= savedName;  
                }

                const savedTagline \= localStorage.getItem('alex\_tagline');  
                if (savedTagline) {  
                    document.getElementById('hero-display-tagline').innerText \= savedTagline;  
                    document.getElementById('settings-tagline-input').value \= savedTagline;  
                }  
            } catch(e) {}  
        };  
    \</script\>  
\</body\>  
\</html\>  
