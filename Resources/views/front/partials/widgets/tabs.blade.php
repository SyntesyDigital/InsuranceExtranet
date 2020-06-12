@php
    $visible = check_visible($field['settings'],$parameters);
    $title = $field['fields'][0]['value'][App::getLocale()];
@endphp

@if($visible)
    <div id="tabsWidget">	
        <ul  class="nav nav-pills">
            <li class="active"><a href="#1a" data-toggle="tab">Contrat</a></li>
            <li><a href="#2a" data-toggle="tab">Devis</a></li>
            <li><a href="#3a" data-toggle="tab">Saisie en cours Saisie en coursSaisie en cours</a></li>
            <li><a href="#1a" data-toggle="tab">Contrat</a></li>
            <li><a href="#2a" data-toggle="tab">Devis</a></li>
            <li><a href="#3a" data-toggle="tab">Saisie en cours</a></li>
            <li><a href="#1a" data-toggle="tab">Contrat</a></li>
            <li><a href="#2a" data-toggle="tab">Devis</a></li>
            <li><a href="#3a" data-toggle="tab">Saisie en cours</a></li>
            <li><a href="#1a" data-toggle="tab">Contrat</a></li>
            <li><a href="#2a" data-toggle="tab">Devis</a></li>
            <li><a href="#3a" data-toggle="tab">Saisie en cours </a></li>
            <li><a href="#1a" data-toggle="tab">Contrat</a></li>
            <li><a href="#2a" data-toggle="tab">Devis</a></li>
            <li><a href="#3a" data-toggle="tab">Saisie en cours</a></li>
        </ul>
        <div class="tab-content clearfix">
            <div class="tab-pane active" id="1a">
                <h3>Content's background color is the same for the tab</h3>
            </div>
            <div class="tab-pane" id="2a">
                <h3>We use the class nav-pills instead of nav-tabs which automatically creates a background color for the tab</h3>
            </div>
            <div class="tab-pane" id="3a">
                <h3>We applied clearfix to the tab-content to rid of the gap between the tab and the content</h3>
            </div>
        </div>
    </div>

    <div id="tabsWidget">	
        <ul  class="nav nav-pills">
            <li class="active"><a  href="#1a" data-toggle="tab">Contrat</a></li>
            <li><a href="#2a" data-toggle="tab">Devis</a></li>
            <li><a href="#3a" data-toggle="tab">Saisie en cours Saisie en cours</a></li>
            <li><a  href="#1a" data-toggle="tab">Contrat</a></li>
            <li><a href="#2a" data-toggle="tab">Devis</a></li>
        
        </ul>
        <div class="tab-content clearfix">
            <div class="tab-pane active" id="1a">
                <h3>Content's background color is the same for the tab</h3>
            </div>
            <div class="tab-pane" id="2a">
                <h3>We use the class nav-pills instead of nav-tabs which automatically creates a background color for the tab</h3>
            </div>
            <div class="tab-pane" id="3a">
                <h3>We applied clearfix to the tab-content to rid of the gap between the tab and the content</h3>
            </div>
        </div>
    </div>
@endif