const lastMessageTimes = new Map();
const lastCommandTimes = new Map();

// Funktion zur Überprüfung, ob eine Nachricht Spam ist
async function checkSpam(m, prefix, isCmd) {

    const phoneNumber = m;

    console.log("Nachricht:");
    console.log("Prefix:", isCmd);


    
  // Überprüfe, ob die Telefonnummer des Absenders bereits in der DB ist und ob die letzte Nachricht innerhalb der letzten X Sekunden gesendet wurde (Cooldown)
  if (lastMessageTimes.has(phoneNumber)) {
    const lastTime = lastMessageTimes.get(phoneNumber);
    const currentTime = Date.now();
    const cooldown = 5000; // Hier kannst du den Cooldown-Wert in Millisekunden anpassen (z.B. 5000 = 5 Sekunden)
    if (currentTime - lastTime < cooldown) {
      // Wenn die Nachricht zu schnell nach der letzten gesendet wurde, ist es Spam
      console.log('Message sent too quickly after the last one, ignoring message.');
      return false; 
    }
  }

  // Überprüfe, ob der Nutzer in der Vergangenheit bereits einen Befehl ausgeführt hat
  if (lastCommandTimes.has(phoneNumber)) {
    const lastCommandTime = lastCommandTimes.get(phoneNumber);
    const currentTime = Date.now();
    const commandCooldown = 10000; // Hier kannst du den Cooldown-Wert für Befehle in Millisekunden anpassen (z.B. 10000 = 10 Sekunden)
    if (currentTime - lastCommandTime < commandCooldown) {
      // Wenn der Nutzer in der Vergangenheit einen Befehl ausgeführt hat und erneut eine Nachricht sendet, ist es Spam
      console.log('Message sent too quickly after the last command, ignoring message.');
      return true;
    }
  }

  // Speichere den Zeitpunkt der aktuellen Nachricht in der Map
  lastMessageTimes.set(phoneNumber, Date.now());

  // Wenn die Nachricht nicht als Spam betrachtet wird, gebe false zurück
  return false;
}


// Exportiere die Funktion checkSpam

checkSpam();

module.exports = checkSpam;
