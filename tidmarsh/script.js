

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

const createListener = (from, to) => {
  document.getElementById(from).addEventListener("change", function ({target}) {
    if (document.getElementById(`from${from}`)) {
      document.getElementById(`from${from}`).remove();
    }
    document.getElementById(to).removeAttribute("disabled");
    document.getElementById(to).innerHTML += `<option id='fromSelect11'>${target.value}</option>`;
  })
}

const addListeners = () => {
  createListener('select11', 'select13');
  createListener('select12', 'select13');
  createListener('select21', 'select23');
  createListener('select22', 'select23');
  createListener('select13', 'select14');
  createListener('select23', 'select14');
}

ready(addListeners())
