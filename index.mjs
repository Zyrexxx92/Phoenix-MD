import { spawn } from 'child_process';
import { join } from 'path';

function start() {
    const args = [join(__dirname, 'index.js'), ...process.argv.slice(2)];
    console.log([process.argv[0], ...args].join('\n'));
    
    let isRunning = true; // Flag to track if the process is running

    const p = spawn(process.argv[0], args, {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    });

    p.on('message', data => {
        console.log('[RECEIVED]', data);
        switch (data) {
            case 'reset':
                p.kill(); // Using `p.kill()` directly
                isRunning = false;
                start(); // Restart the process
                break;
            case 'uptime':
                p.send(process.uptime());
                break;
            case 'multi':
                console.log('Multi command received'); // Placeholder, add your implementation here
                break;
            default:
                console.log('Unknown command received:', data);
        }
    });

    p.on('exit', code => {
        console.error('Exited with code:', code);
        if (isRunning && (code === '.' || code === 1 || code === 0)) {
            start(); // Restart the process if it exited unexpectedly
        }
    });
}

start();
