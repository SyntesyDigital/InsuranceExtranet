<style type="text/css">
    body .timeline-body #timeline .MuiStepLabel-label:before{
        background-color: {{$backgroundColorOuterTimeline}};
        border: 2px solid {{$borderColorOuterTimeline}};
    }
    body .timeline-body #timeline .timeline-field:nth-child(1) .MuiStepLabel-labelContainer .MuiStepLabel-label:before{
        background-color: {{$backgroundColorActiveTimeline}};
        border: 2px solid {{$borderColorActiveTimeline}};
    }
    body .timeline-body #timeline .date{
        color: {{$colorDateTimeline}};
        font-size: {{$fontSizeDateTimeline}};
    }
    body .timeline-body #timeline .MuiTypography-root div.text-default {
        color: {{$colorTextTimeline}};
        font-size: {{$fontSizeTextTimeline}};
    }
    body .timeline-body #timeline .MuiStepContent-root{
        border-left-color: {{$borderColorTimeline}};
    }
    body .timeline-body #timeline .MuiStepLabel-labelContainer{
        border-left-color: {{$borderColorTimeline}};
    }
</style>

