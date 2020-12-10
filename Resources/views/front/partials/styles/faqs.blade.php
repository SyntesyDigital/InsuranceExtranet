<style type="text/css">
    /* icon */
    body .faqs-list-widget .MuiButtonBase-root .MuiIconButton-label, 
    body .faqs-widget .MuiButtonBase-root .MuiIconButton-label{
       color: {{$elementHeadIconColor}};
    }
    body .faqs-list-widget  .MuiAccordionSummary-content i{
        color: {{$colorIconFaqs}};
        font-size: {{$fontSizeIconFaqs}};
    }

    body .faqs-list-widget  .MuiAccordionSummary-content svg{
        font-size: {{$fontSizeIconFaqs}};
    }

    /* title */
    body .faqs-list-widget .MuiAccordionSummary-root,
    body .faqs-widget .MuiAccordionSummary-root {
        background-color: {{$backgroundColorTitleFaqs}} !important;
        color: {{$colorTitleFaqs}} !important;
    }
    body .faqs-list-widget  .MuiAccordionSummary-content p,
    body .faqs-widget  .MuiAccordionSummary-content p{
        font-size: {{$fontSizeTitleFaqs}} !important;
        color: {{$colorTitleFaqs}} !important;
    }
    /* desc */
    body .faqs-list-widget .MuiCollapse-container, 
    body .faqs-widget .MuiCollapse-container{
        background-color: {{$backgroundColorDescFaqs}};
        color: {{$colorDescFaqs}};

    }
    /* container */
    body .faqs-list-widget .MuiButtonBase-root:first-child, 
    body .faqs-widget .MuiButtonBase-root:first-child {
        border-top-left-radius:  {{$borderRadiusContainerFaqs}};
        border-top-right-radius:  {{$borderRadiusContainerFaqs}};
    }
    body .faqs-list-widget .MuiButtonBase-root:not(.Mui-expanded):first-child,
    body .faqs-widget .MuiButtonBase-root:not(.Mui-expanded):first-child{
        border-bottom-left-radius:  {{$borderRadiusContainerFaqs}};
        border-bottom-right-radius:  {{$borderRadiusContainerFaqs}};
    }
    body .faqs-list-widget .MuiCollapse-container,
    body .faqs-widget .MuiCollapse-container {
        border-bottom-left-radius:  {{$borderRadiusContainerFaqs}};
        border-bottom-right-radius:  {{$borderRadiusContainerFaqs}};
    }
</style>


