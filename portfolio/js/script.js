document.addEventListener('DOMContentLoaded', function() {
    const terminalContent = document.getElementById('terminal-content');
    let commandInput = document.getElementById('command-input');
    const terminal = document.getElementById('terminal');
    
    commandInput.focus();
    
    let commandHistory = [];
    let historyIndex = -1;
    
    function setupCommandInput(inputElement) {
        inputElement.addEventListener('keydown', function(e) {
            if (e.key.length === 1 && inputElement.value.length >= 15) {
                e.preventDefault();
                return;
            }
            if (e.key === 'Enter') {
                const command = inputElement.value.trim();
                
                if (command) {
                    commandHistory.push(command);
                    historyIndex = commandHistory.length;
                    
                    processCommand(command);
                    
                    inputElement.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                if (commandHistory.length > 0 && historyIndex > 0) {
                    historyIndex--;
                    inputElement.value = commandHistory[historyIndex];
                }
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    inputElement.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    inputElement.value = '';
                }
                e.preventDefault();
            }
        });
    }
    
    setupCommandInput(commandInput);
    
    function processCommand(command) {
        const commandLine = document.createElement('command-line');
        commandLine.innerHTML = `
            <div class="command-line">
                <span class="prompt">koppany@portfolio:~$</span>
                <span class="command-text">${command}</span>
            </div>
        `;
        terminalContent.insertBefore(commandLine, commandInput.parentNode);
        
        let response = '';
        const cmd = command.toLowerCase();
        
        if (cmd === '/help') {
            response = document.getElementById('help-content').innerHTML;
        } else if (cmd === '/about') {
            response = document.getElementById('about-content').innerHTML;
        } else if (cmd === '/skills') {
            response = document.getElementById('skills-content').innerHTML;
        } else if (cmd === '/projects') {
            response = document.getElementById('projects-content').innerHTML;
        } else if (cmd === '/contact') {
            response = document.getElementById('contact-content').innerHTML;
        } else if (cmd === '/clear') {
            terminalContent.innerHTML = `
                <div class="welcome-message">
                    <pre class="gname">
__  __                   __
| |/ /___  _ __  _ __   /_/_ _ __  _   _ 
| ' // _ \\| '_ \\| '_ \\ / _\` | '_ \\| | | |
| . \\ (_) | |_) | |_) | (_| | | | | |_| |
|_|\\_\\___/| .__/| .__/ \\__,_|_| |_|\\__, |
          |_|   |_|                |___/
                     </pre>
                    <p>Üdvözöllek a portfólió oldalamon!</p>
                    <p>Írd be a <span class="command">/help</span> parancsot, hogy megtudd az összes elérhető parancsokat.</p>
                </div>
                <div class="command-line">
                    <span class="prompt">koppany@portfolio:~$</span>
                    <input type="text" class="command-input" id="command-input" autofocus>
                </div>
            `;
            commandInput = document.getElementById('command-input');
            setupCommandInput(commandInput);
            commandInput.focus();
            return;
        } else {
            response = `<p>A parancs nem található. Írd be a <span class="command">/help</span> parancsot, hogy megtudd az összes elérhető parancsokat.</p>`;
        }
        
        const responseElement = document.createElement('div');
        responseElement.className = 'command-response';
        responseElement.innerHTML = response;
        terminalContent.insertBefore(responseElement, commandInput.parentNode);
        
        terminal.scrollTop = terminal.scrollHeight;
    }
    
    terminal.addEventListener('click', function() {
        commandInput.focus();
    });
});