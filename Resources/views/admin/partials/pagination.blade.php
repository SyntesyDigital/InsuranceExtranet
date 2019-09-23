@if(isset($items))
@if(ceil($items->total() / $items->perPage()) > 1)
<nav>
  <ul class="pagination">
    <li>
        <a href="{{ $items->previousPageUrl() }}" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>

    @for ($i = 1; $i < ceil($items->total() / $items->perPage()) + 1; $i++)
    <li class="@if($items->currentPage() == $i) active @endif">
        <a href="{{ $items->url($i) }}&typology_id=@if(isset($typology_id)){{ $typology_id }}@endif">{{ $i }}</a>
    </li>
    @endfor

    <li>
        <a href="{{ $items->nextPageUrl() }}" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>
  </ul>
</nav>
@endif
@endif
