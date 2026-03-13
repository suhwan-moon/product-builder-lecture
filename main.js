class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .wrapper {
                    padding: 3rem;
                    border-radius: 2rem;
                    background: var(--card-bg);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    border: 1px solid var(--card-border);
                    text-align: center;
                    transition: all 0.5s ease;
                    max-width: 500px;
                    width: 90%;
                }
                h2 {
                    margin-top: 0;
                    font-size: 2.5rem;
                    color: var(--text-color);
                    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    margin-bottom: 2rem;
                }
                .numbers {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 1.2rem;
                    margin: 3rem 0;
                }
                .number {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--number-bg);
                    color: var(--number-text);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.8rem;
                    font-weight: 800;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    border: 2px solid rgba(255,255,255,0.2);
                }
                .number:hover {
                    transform: translateY(-10px) scale(1.1);
                }
                button {
                    background-color: var(--btn-bg);
                    color: white;
                    padding: 1.2rem 2.5rem;
                    border: none;
                    border-radius: 1rem;
                    font-size: 1.2rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
                    width: 100%;
                }
                button:hover {
                    background-color: var(--btn-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
                }
                button:active {
                    transform: translateY(0);
                }
            </style>
            <div class="wrapper">
                <h2>Lotto Numbers</h2>
                <div class="numbers">
                    <div class="number">?</div>
                    <div class="number">?</div>
                    <div class="number">?</div>
                    <div class="number">?</div>
                    <div class="number">?</div>
                    <div class="number">?</div>
                </div>
                <button id="generate">Generate Now</button>
            </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        this.shadowRoot.getElementById('generate').addEventListener('click', () => this.generateNumbers());
    }

    generateNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const numberElements = this.shadowRoot.querySelectorAll('.number');
        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        
        numberElements.forEach((el, i) => {
            el.style.transform = 'scale(0) rotate(-180deg)';
            setTimeout(() => {
                el.textContent = sortedNumbers[i];
                el.style.transform = 'scale(1) rotate(0deg)';
            }, i * 100);
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const updateToggleButton = (isLight) => {
    themeToggle.textContent = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';
};

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    updateToggleButton(true);
} else {
    updateToggleButton(false);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    updateToggleButton(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
