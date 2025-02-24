let startX, startY, isDragging = false;
const overlay = document.getElementById('overlay');
const outputHtml = document.getElementById('outputHtml');
const iframe = document.getElementById('iframeDisplay');

document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    const embedUrl = new URL(url);
    embedUrl.pathname = '/embed' + embedUrl.pathname;
    iframe.src = embedUrl.href;
});

let selectionDiv = null;

overlay.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX - overlay.getBoundingClientRect().left;
    startY = e.clientY - overlay.getBoundingClientRect().top;

    // Remove existing selection if any
    if (selectionDiv) {
        overlay.removeChild(selectionDiv);
    }

    // Create new selection div
    selectionDiv = document.createElement('div');
    selectionDiv.style.position = 'absolute';
    selectionDiv.style.border = '2px solid red';
    selectionDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    selectionDiv.style.left = startX + 'px';
    selectionDiv.style.top = startY + 'px';
    overlay.appendChild(selectionDiv);
});

overlay.addEventListener('mousemove', function(e) {
    if (!isDragging) return;

    const currentX = e.clientX - overlay.getBoundingClientRect().left;
    const currentY = e.clientY - overlay.getBoundingClientRect().top;

    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    const left = Math.min(startX, currentX);
    const top = Math.min(startY, currentY);

    selectionDiv.style.width = width + 'px';
    selectionDiv.style.height = height + 'px';
    selectionDiv.style.left = left + 'px';
    selectionDiv.style.top = top + 'px';

    // Update selection properties display
    const selectionProps = document.getElementById('selection-properties');
    selectionProps.innerHTML = `
        Selection: ${width}x${height}<br>
        Position: (${left}, ${top})
    `;
});

overlay.addEventListener('mouseup', function() {
    if (!isDragging || !selectionDiv) return;
    isDragging = false;

    const rect = selectionDiv.getBoundingClientRect();
    const iframeRect = iframe.getBoundingClientRect();

    // Generate HTML with the selection parameters
    const html = `<div style="overflow: hidden; max-width: ${rect.width}px; height: ${rect.height}px;">
    <iframe src="${iframe.src}"
        style="border: 0px none; 
               height: ${iframeRect.height}px; 
               width: ${iframeRect.width}px;
               margin-left: -${rect.left - iframeRect.left}px;
               margin-top: -${rect.top - iframeRect.top}px;"
        frameborder="0">
    </iframe>
</div>`;

    outputHtml.value = html;
});

document.getElementById('previewBtn').addEventListener('click', function() {
    const previewSection = document.getElementById('previewSection');
    previewSection.innerHTML = outputHtml.value;
});

// Prevent text selection while dragging
overlay.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

