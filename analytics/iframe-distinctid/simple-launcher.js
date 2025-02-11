// Create container div for the iframe
const container = document.createElement('div');
container.id = 'message-container';
container.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #f0f0f0;
    border-top: 1px solid #ccc;
`;

// Create and configure the iframe
const iframe = document.createElement('iframe');
iframe.id = 'message-iframe';
iframe.src = 'iframe.html'
iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
`;

// Add iframe to container
container.appendChild(iframe);

// Add container to body
document.body.appendChild(container);

iframe.onload = () => {
    // Send pypestreamConfig to iframe using postMessage
    iframe.contentWindow.postMessage({
        type: 'CONFIG_UPDATE',
        config: window.pypestreamConfig
    }, '*');
};