document.getElementById('seq-run-custom').addEventListener('click', function() {
  var v1 = document.getElementById('custom-a').value;
  var v2 = document.getElementById('custom-b').value;
  var simNum1 = document.getElementById('input-a');
  var simNum2 = document.getElementById('input-b');
  if (simNum1) {
    simNum1.value = v1;
    simNum1.dispatchEvent(new Event('input', { bubbles: true }));
    simNum1.dispatchEvent(new Event('change', { bubbles: true }));
  }
  if (simNum2) {
    simNum2.value = v2;
    simNum2.dispatchEvent(new Event('input', { bubbles: true }));
    simNum2.dispatchEvent(new Event('change', { bubbles: true }));
  }
  var simPlayBtn = document.getElementById('seq-play');
  if (simPlayBtn) simPlayBtn.click();
});

document.querySelectorAll('.test-case').forEach(function(tc) {
  tc.querySelector('button').addEventListener('click', function() {
    var inputs = tc.getAttribute('data-inputs').split(',');
    document.getElementById('custom-a').value = inputs[0];
    document.getElementById('custom-b').value = inputs[1];
  });
}); 