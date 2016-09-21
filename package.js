Package.describe({
  name:     'ksrv:datatables-reactive',
  version:  '0.0.1',
  summary:  'Simple template for usage jQuery dataTables plugin',
  git:      '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.1');
  api.use('ecmascript');
  api.use('templating');

  api.addFiles('dataTables.html', ['client']);
  api.addFiles('dataTables.js', ['client']);
});
