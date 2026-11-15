/* Короткая форма заявки. Бэкенда у сайта нет, поэтому форма собирает
   сообщение и открывает Telegram (текст подставлен и скопирован в буфер)
   или почтовую программу с готовым письмом. */
(function () {
  var form = document.getElementById('leadForm');
  if (!form) return;
  var en = (document.documentElement.lang || '').indexOf('en') === 0;
  var TG = 'https://t.me/Dmitrii_Diezel';
  var MAIL = 'i@creativedm.ru';
  var via = 'tg';
  var status = form.querySelector('.lead-status');

  form.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('button[data-via]');
    if (b) via = b.getAttribute('data-via');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var el = form.elements;
    var name = el['lead-name'].value.trim();
    var contact = el['lead-contact'].value.trim();
    var task = el['lead-task'].value.trim();
    var text = en
      ? 'Hello, Dmitry!' + (name ? ' My name is ' + name + '.' : '') + '\n\nTask: ' + task + '\n\nHow to reach me: ' + contact
      : 'Здравствуйте, Дмитрий!' + (name ? ' Меня зовут ' + name + '.' : '') + '\n\nЗадача: ' + task + '\n\nКак со мной связаться: ' + contact;

    try { if (window.ym) ym(72239779, 'reachGoal', via === 'tg' ? 'lead_form_telegram' : 'lead_form_email'); } catch (_) {}

    if (via === 'tg') {
      try { if (navigator.clipboard) navigator.clipboard.writeText(text).catch(function () {}); } catch (_) {}
      window.open(TG + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      if (status) status.textContent = en
        ? 'Telegram is opening with your message. The text is also copied, in case you need to paste it.'
        : 'Открываю Telegram с вашим сообщением. Текст ещё и скопирован, если понадобится вставить вручную.';
    } else {
      var subject = en ? 'Project enquiry from brandmanager.su' : 'Заявка с сайта brandmanager.su';
      location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
      if (status) status.textContent = en
        ? 'If your mail app did not open, write to ' + MAIL + '.'
        : 'Если почта не открылась, напишите на ' + MAIL + '.';
    }
  });
})();
