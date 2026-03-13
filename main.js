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
                    width: 100%;
                    box-sizing: border-box;
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

class PartnershipForm extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .wrapper {
                    margin-top: 2rem;
                    padding: 2rem;
                    border-radius: 1.5rem;
                    background: var(--card-bg);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    border: 1px solid var(--card-border);
                    max-width: 500px;
                    width: 100%;
                    box-sizing: border-box;
                    transition: all 0.5s ease;
                }
                h3 {
                    margin-top: 0;
                    color: var(--text-color);
                    text-align: center;
                    margin-bottom: 1.5rem;
                }
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                label {
                    color: var(--text-color);
                    font-size: 0.9rem;
                    font-weight: bold;
                }
                input, textarea {
                    padding: 0.8rem;
                    border-radius: 0.5rem;
                    border: 1px solid var(--card-border);
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--text-color);
                    font-size: 1rem;
                    transition: border-color 0.3s;
                }
                body.light-mode input, body.light-mode textarea {
                    background: rgba(255, 255, 255, 0.9);
                    color: #333;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--btn-bg);
                }
                button {
                    background-color: var(--btn-bg);
                    color: white;
                    padding: 1rem;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 0.5rem;
                }
                button:hover {
                    background-color: var(--btn-hover);
                    transform: translateY(-2px);
                }
            </style>
            <div class="wrapper">
                <h3>제휴 문의</h3>
                <form action="https://formspree.io/f/xpqylayk" method="POST">
                    <label>이메일</label>
                    <input type="email" name="email" placeholder="example@domain.com" required>
                    <label>문의 내용</label>
                    <textarea name="message" rows="4" placeholder="문의 내용을 입력해주세요" required></textarea>
                    <button type="submit">문의 보내기</button>
                </form>
            </div>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('lotto-generator', LottoGenerator);
customElements.define('partnership-form', PartnershipForm);

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
