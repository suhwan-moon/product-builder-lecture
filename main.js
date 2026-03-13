class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .wrapper {
                    padding: 2rem;
                    border-radius: 1rem;
                    background: var(--card-bg);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                    border: 1px solid var(--card-border);
                    text-align: center;
                    transition: all 0.3s;
                }
                h2 {
                    margin-top: 0;
                    color: var(--text-color);
                }
                .numbers {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin: 2rem 0;
                }
                .number {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: var(--number-bg);
                    color: var(--number-text);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                    transition: all 0.3s;
                }
                button {
                    background-color: var(--btn-bg);
                    color: white;
                    padding: 1rem 2rem;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 0.3s, box-shadow 0.3s;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0);
                }
                button:hover {
                    background-color: var(--btn-hover);
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                }
            </style>
            <div class="wrapper">
                <h2>Lotto Number Generator</h2>
                <div class="numbers">
                    <div class="number">?</div>
                    <div class="number">?</div>
                    <div class="number">?</div>
                    <div class="number">?</div>
                    <div class="number">?</div>
                    <div class="number">?</div>
                </div>
                <button id="generate">Generate Numbers</button>
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
        Array.from(numbers).sort((a, b) => a - b).forEach((number, index) => {
            numberElements[index].textContent = number;
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = 'Dark Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
