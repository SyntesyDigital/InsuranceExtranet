<style type="text/css">
    /* icon */
    body .faqs-list-widget .MuiButtonBase-root .MuiIconButton-label, 
    body .faqs-widget .MuiButtonBase-root .MuiIconButton-label{
       color: {{$elementHeadIconColor}};
    }
    /* title */
    body .faqs-list-widget .MuiAccordionSummary-root,
    body .faqs-widget .MuiAccordionSummary-root {
        background-color: {{$backgroundColorTitleFaqs}};
    }
    body .faqs-list-widget  .MuiAccordionSummary-content p,
    body .faqs-widget  .MuiAccordionSummary-content p{
        font-size: {{$fontSizeTitleFaqs}};
        color: {{$primaryColor}};
    }
    /* desc */
    body .faqs-list-widget .MuiCollapse-container, 
    body .faqs-widget .MuiCollapse-container{
        background-color: {{$backgroundColorDescFaqs}};
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


