<style type="text/css">
    body #tabsWidget .tab-content{
        background-color: {{$backgroundColorContentTab}};
    }
    body #tabsWidget .nav-pills > li.active a{
        background-color: {{$backgroundColorActiveTab}};
        color: {{$fontColorActiveTab}};
    }
    body #tabsWidget .nav-pills > li:not(.active) a:hover{
        background-color: {{$backgroundHoverColorTab}};
    }
    body #tabsWidget .nav-pills > li:not(.active){
        background-color: {{$backgroundColorTab}};
        border-top-left-radius: {{$borderRadiusTab}};
        border-top-right-radius: {{$borderRadiusTab}};
    }
    body #tabsWidget .nav-pills > li > a{
        font-size: {{$fontSizeTab}};
        border-top-left-radius: {{$borderRadiusTab}};
        border-top-right-radius: {{$borderRadiusTab}};
        color: {{$fontColorTab}}
    }
</style>