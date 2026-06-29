/* dust particles floating*/

const dustContainer = document.querySelector(".dust-container");

const NUMBER_OF_PARTICLES = 45;

for (let i = 0; i < NUMBER_OF_PARTICLES; i++) {

    const dust = document.createElement("span");
    dust.className = "dust";

    const size = Math.random() * 5 + 2;

    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;
    dust.style.left = `${Math.random() * 100}%`;
    dust.style.animationDuration = `${20 + Math.random() * 18}s`;
    dust.style.animationDelay = `${Math.random() * 20}s`;
    dust.style.opacity = Math.random() * 0.8;
    dustContainer.appendChild(dust);
}

/* glowing cursor */

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (event) => {
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
});

/* progress bar */

const progress = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrollTop / height) * 100;
    progress.style.width = percent + "%";
});

/* sticky navbar */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    }
    else {
        header.classList.remove("scrolled");
    }
});

/* scroll reveal */
const revealElements = document.querySelectorAll(
    ".reveal"
);

function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;
    revealElements.forEach(element=> {
        const top = element.getBoundingClientRect().top;
        if(top < trigger) {
            element.classList.add("active");
        }
    });
}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

/* writer effect top */

const typingElement = document.getElementById("typing");

if(typingElement) {
    const words = [
        "Software Developer",
        "Technical Writer",
        "Content Writer",
        "Computer Science Student"
    ];

    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;
    function type() {
        const currentWord = words[wordIndex];
        if(!deleting) {
            typingElement.textContent = currentWord.substring(0, letterIndex++);
            if(letterIndex > currentWord.length) {
                deleting = true;
                setTimeout(type,1600);
                return;
            }
        }
        else {
            typingElement.textContent =
                currentWord.substring(
                    0,
                    letterIndex--
                );
            if(letterIndex < 0) {
                deleting = false;
                wordIndex = (wordIndex+1) % words.length;
            }
        }
        setTimeout(
            type,
            deleting ? 45 : 90
        );
    }
    type();
}

/* project card effects */

const cards = document.querySelectorAll(".project-card,.writing-card,.resource-card");

cards.forEach(card=> {
    card.addEventListener(
        "mousemove",
        event=> {
            const rect = card.getBoundingClientRect();
            const x = event.clientX-rect.left;
            const y = event.clientY-rect.top;
            const rotateX = ((y/rect.height)-0.5)*8;
            const rotateY = ((x/rect.width)-0.5)*-8;
            card.style.transform=
                `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
                `;
        }
    );

    card.addEventListener(
        "mouseleave",
        ()=> {
            card.style.transform = "";
        }
    );
});

/* sparkle */

setInterval(()=> {
    const sparkle = document.createElement("div");
    sparkle.style.position = "fixed";
    sparkle.style.width = "4px";
    sparkle.style.height = "4px";
    sparkle.style.borderRadius = "50%";
    sparkle.style.background = "#E8D3A8";
    sparkle.style.left = Math.random()*100+"vw";
    sparkle.style.top = Math.random()*100+"vh";
    sparkle.style.opacity = ".9";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "-1";
    sparkle.style.transition = "opacity 2s";
    document.body.appendChild(sparkle);

    setTimeout(()=> {
        sparkle.style.opacity = "0";
    },100);

    setTimeout(()=> {
        sparkle.remove();
    },2000);

},700);

/* button shine */

const buttons = document.querySelectorAll(".primary-btn,.secondary-btn");

buttons.forEach(button=> {
    button.addEventListener(
        "click",
        event=> {
            const ripple = document.createElement("span");
            ripple.className = "ripple";
            const rect = button.getBoundingClientRect();
            ripple.style.left = event.clientX-rect.left+"px";
            ripple.style.top = event.clientY-rect.top+"px";
            button.appendChild(ripple);
            setTimeout(()=> {
                ripple.remove();
            },700);
        }
    );
});

/* navigation */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const top = section.offsetTop - 150;
        const height = section.offsetHeight;
        if(window.scrollY >= top) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* back to top */

const backToTop = document.createElement("button");
backToTop.innerHTML = "↑";
backToTop.id = "backToTop";
document.body.appendChild(backToTop);
backToTop.style.cssText = `
position:fixed;
right:30px;
bottom:30px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#8C6446;
color:white;
font-size:22px;
cursor:pointer;
opacity:0;
visibility:hidden;
transition:.3s;
z-index:1000;
box-shadow:0 10px 20px rgba(0,0,0,.3);
`;

window.addEventListener("scroll",()=> {
    if(window.scrollY > 500) {
        backToTop.style.opacity = "1";
        backToTop.style.visibility = "visible";
    }
    else {
        backToTop.style.opacity = "0";
        backToTop.style.visibility = "hidden";
    }
});

backToTop.addEventListener("click",()=> {
    window.scrollTo( {
        top:0,
        behavior:"smooth"
    });
});

/* links */

document.querySelectorAll('a[href^="#"]').forEach(link=> {
    link.addEventListener("click",function(e) {
        const target = document.querySelector(this.getAttribute("href"));
        if(target) {
            e.preventDefault();
            target.scrollIntoView( {
                behavior:"smooth"
            });
        }
    });
});

/* loading screen */

window.addEventListener("load",()=> {
    const loader = document.getElementById("loader");
    if(loader) {
        loader.style.opacity = "0";
        setTimeout(()=> {
            loader.remove();
        },600);
    }
});

/* pause anim */

document.addEventListener("visibilitychange",
    ()=> {
        document.body.style.animationPlayState =
            document.hidden
            ? "paused"
            : "running";
    }
);

/* footer */

const year = document.getElementById("year");
if(year) {
    year.textContent = new Date().getFullYear();
}

/*page end messages */

console.log(
"%cDesigned & Developed by Tayyaba Riaz",
"color:#C8A46B;font-size:16px;font-weight:bold;"
);

console.log(
"%cThanks for checking out the source code! ☕",
"color:#ffffff;font-size:13px;"
);