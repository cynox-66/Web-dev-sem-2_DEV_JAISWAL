/**
 * Event Flow Playground
 * 
 * An educational tool for understanding how JavaScript events 
 * travel through the DOM — first down (capturing), then up (bubbling).
 * 
 * The goal is clarity over cleverness. Each function does one thing,
 * and variable names read like sentences.
 */

// ============================================
// DOM Elements — cached once at startup
// ============================================

const elements = {
  grandparent: document.getElementById('grandparent'),
  parent: document.getElementById('parent'),
  child: document.getElementById('child'),
  logContainer: document.getElementById('log-container'),
  resetButton: document.getElementById('reset-button'),
  clearLogButton: document.getElementById('clear-log-button'),
  toggleCapturing: document.getElementById('toggle-capturing'),
  toggleBubbling: document.getElementById('toggle-bubbling'),
  toggleStopPropagation: document.getElementById('toggle-stop-propagation')
};

// A list of just the clickable event boxes for easy iteration
const eventBoxes = [elements.grandparent, elements.parent, elements.child];

// ============================================
// State — what the user has toggled
// ============================================

const settings = {
  capturingEnabled: true,
  bubblingEnabled: true,
  stopPropagationEnabled: false
};

// ============================================
// Helper Functions — small, focused utilities
// ============================================

/**
 * Determines the "phase" based on where the event currently is.
 * - Capturing: event is traveling DOWN toward the target
 * - Target: event has reached the clicked element
 * - Bubbling: event is traveling UP from the target
 */
function getEventPhase(event) {
  // These constants are built into the browser's Event object
  const phases = {
    1: 'capturing',
    2: 'target',
    3: 'bubbling'
  };
  return phases[event.eventPhase] || 'unknown';
}

/**
 * Formats an element's ID into a readable name.
 * "grandparent" → "Grandparent"
 */
function formatElementName(element) {
  const id = element.id;
  return id.charAt(0).toUpperCase() + id.slice(1);
}

/**
 * Creates a single log entry element with proper styling.
 * Each entry shows the phase badge, element name, and phase label.
 */
function createLogEntry(elementName, phase) {
  const entry = document.createElement('div');
  entry.className = `log-entry ${phase}`;
  
  // Phase badge (CAPTURING, TARGET, or BUBBLING)
  const badge = document.createElement('span');
  badge.className = 'phase-badge';
  badge.textContent = phase.toUpperCase();
  
  // The element that was reached
  const nameSpan = document.createElement('span');
  nameSpan.className = 'element-name';
  nameSpan.textContent = elementName;
  
  // Descriptive text
  const description = document.createElement('span');
  description.textContent = phase === 'target' ? 'reached' : 'passed through';
  
  entry.appendChild(badge);
  entry.appendChild(nameSpan);
  entry.appendChild(description);
  
  return entry;
}

/**
 * Adds a visual "clicked" effect to an element.
 * The CSS animation handles the actual pulse effect.
 */
function showClickFeedback(element) {
  element.classList.add('clicked', 'active');
  
  // Remove the animation class after it completes so it can replay
  setTimeout(() => {
    element.classList.remove('clicked');
  }, 400);
}

/**
 * Clears the placeholder text when the first real log appears.
 */
function removePlaceholderIfPresent() {
  const placeholder = elements.logContainer.querySelector('.log-placeholder');
  if (placeholder) {
    placeholder.remove();
  }
}

/**
 * Scrolls the log container to show the newest entry.
 */
function scrollLogToBottom() {
  elements.logContainer.scrollTop = elements.logContainer.scrollHeight;
}

// ============================================
// Event Handlers — the core logic
// ============================================

/**
 * The main click handler attached to each element.
 * This is called during both capturing and bubbling phases.
 */
function handleElementClick(event, element, isCapturingPhase) {
  const phase = getEventPhase(event);
  const elementName = formatElementName(element);
  
  // Skip if this phase is disabled by the user
  if (isCapturingPhase && !settings.capturingEnabled) return;
  if (!isCapturingPhase && phase === 'bubbling' && !settings.bubblingEnabled) return;
  
  // Log the event
  removePlaceholderIfPresent();
  const logEntry = createLogEntry(elementName, phase);
  elements.logContainer.appendChild(logEntry);
  scrollLogToBottom();
  
  // Visual feedback on the clicked box
  showClickFeedback(element);
  
  // Console logging for debugging (educational for learners)
  console.log(`${elementName} — ${phase.toUpperCase()} phase`);
  
  // Stop propagation if enabled and we're at the target
  if (settings.stopPropagationEnabled && phase === 'target') {
    event.stopPropagation();
    console.log('⛔ Propagation stopped at target');
  }
}

/**
 * Attaches event listeners to all boxes.
 * We attach TWO listeners to each: one for capturing, one for bubbling.
 * This lets us demonstrate both phases clearly.
 */
function attachEventListeners() {
  eventBoxes.forEach(box => {
    // Capturing listener (third argument = true)
    box.addEventListener('click', (event) => {
      handleElementClick(event, box, true);
    }, true);
    
    // Bubbling listener (third argument = false)
    box.addEventListener('click', (event) => {
      handleElementClick(event, box, false);
    }, false);
  });
}

// ============================================
// Control Handlers — buttons and toggles
// ============================================

/**
 * Resets the playground to its initial state.
 * Clears visual highlights and the event log.
 */
function resetPlayground() {
  // Remove active state from all boxes
  eventBoxes.forEach(box => {
    box.classList.remove('active', 'clicked');
  });
  
  // Clear the log and restore placeholder
  elements.logContainer.innerHTML = '<p class="log-placeholder">Events will appear here...</p>';
  
  console.log('🔄 Playground reset');
}

/**
 * Clears only the event log (keeps visual state).
 */
function clearLog() {
  elements.logContainer.innerHTML = '<p class="log-placeholder">Events will appear here...</p>';
}

/**
 * Syncs a toggle's checked state with our settings object.
 */
function handleToggleChange(toggleElement, settingKey) {
  settings[settingKey] = toggleElement.checked;
  console.log(`Setting "${settingKey}" is now ${settings[settingKey]}`);
}

// ============================================
// Initialization — wire everything up
// ============================================

function initializePlayground() {
  // Attach click handlers to the event boxes
  attachEventListeners();
  
  // Wire up control buttons
  elements.resetButton.addEventListener('click', resetPlayground);
  elements.clearLogButton.addEventListener('click', clearLog);
  
  // Wire up toggles
  elements.toggleCapturing.addEventListener('change', () => {
    handleToggleChange(elements.toggleCapturing, 'capturingEnabled');
  });
  
  elements.toggleBubbling.addEventListener('change', () => {
    handleToggleChange(elements.toggleBubbling, 'bubblingEnabled');
  });
  
  elements.toggleStopPropagation.addEventListener('change', () => {
    handleToggleChange(elements.toggleStopPropagation, 'stopPropagationEnabled');
  });
  
  console.log('✅ Event Flow Playground initialized');
}

// Start the app
initializePlayground();


// MY OLD CODE
// let logContainer = document.querySelector("#log")
// let lis = []

// function addLog(message) {
//     lis.push(message)

//     let entry = document.createElement("p")
//     entry.textContent = message
//     logContainer.appendChild(entry)
// }

// let gpc = document.querySelector("#Grandparent")
// gpc.addEventListener("click", () => {
//     gpc.style.backgroundColor = "lightgreen"
//     addLog("Grandparent clicked - Capturing")
// }, true)

// let gpb = document.querySelector("#Grandparent")
// gpb.addEventListener("click", () => {
//     gpb.style.backgroundColor = "lightgreen"
//     addLog("Grandparent clicked - Bubbling")
// }, false)

// let pc = document.querySelector("#parent")
// pc.addEventListener("click", () => {
//     pc.style.backgroundColor = "lightblue"
//     addLog("Parent clicked - Capturing")
// }, true)

// let pb = document.querySelector("#parent")
// pb.addEventListener("click", () => {
//     pb.style.backgroundColor = "lightblue"
//     addLog("Parent clicked - Bubbling")
// }, false)

// let c = document.querySelector("#child")
// c.addEventListener("click", () => {
//     c.style.backgroundColor = "lightpink"
//     addLog("Child clicked")
// }, false)
