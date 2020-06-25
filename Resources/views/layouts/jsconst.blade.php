<script>
  const MODELS_FIELDS = {!! json_encode(Config('models.fields'), JSON_PRETTY_PRINT) !!};
  const TEXT = 'text';
  const NUMBER = 'number';
  const DATE = 'date';
  const SELECT = 'select';
  const FILE = 'file';
  const RICHTEXT = 'richtext';
  const PARAMETERS = {!! json_encode(Config('models.parameters'), JSON_PRETTY_PRINT) !!};
  const SESSION = {!! Auth::session() ? json_encode(Auth::session()->toArray(), JSON_PRETTY_PRINT) : 'null' !!};
  const EXPORT_MODELS = {!! json_encode([
      'Element' => \Modules\Extranet\Entities\Element::class,
      'ElementModel' => \Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel::class
  ], JSON_PRETTY_PRINT) !!};
</script>
