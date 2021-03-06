<script>
  const MODELS_FIELDS = {!! json_encode(Config('models.fields'), JSON_PRETTY_PRINT) !!};
  const TEXT = 'text';
  const NUMBER = 'number';
  const DATE = 'date';
  const SELECT = 'select';
  const FILE = 'file';
  const RICHTEXT = 'richtext';
  const PARAMETERS = {!! json_encode(Config('models.parameters'), JSON_PRETTY_PRINT) !!};
  const SESSION = {!! json_encode(Auth::session()->toArray(), JSON_PRETTY_PRINT) !!};
</script>
