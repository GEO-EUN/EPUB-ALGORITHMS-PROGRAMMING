document.getElementById('sel-run-custom').addEventListener('click', function() {
  var simPlayBtn = document.getElementById('sel-play');
  if (simPlayBtn) simPlayBtn.click();
});

document.querySelectorAll('.test-case').forEach(function(tc) {
  tc.querySelector('button').addEventListener('click', function() {
    var inputs = tc.getAttribute('data-inputs').split(',');
    document.getElementById('custom-score').value = inputs[0];
    document.getElementById('custom-threshold').value = inputs[1];
  });
}); 