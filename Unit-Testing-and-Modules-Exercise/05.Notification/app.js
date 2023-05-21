function notify(message) {
  let notificationDiv = document.getElementById('notification');
  notificationDiv.textContent = message;
  notificationDiv.style.display = 'block';
  notificationDivHandler(notificationDiv);
  function notificationDivHandler(notificationDiv) {
    let notificationSetAttributeValue = notificationDiv.getAttribute('notification-set');
    if (notificationSetAttributeValue !== 'true') {
      notificationDiv.setAttribute('notification-set', 'true');
      notificationDiv.addEventListener('click', () => {
        notificationDiv.style.display = 'none';
      });
    }
  }
}





