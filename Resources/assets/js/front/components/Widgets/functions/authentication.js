
/**
 * Helper equivalent to check if content is allowed depending on user rights.
 * allowed_link
 * file : Modules/Extranet/Helpers/allowed_link.php
 * @param {*} content 
 */
export function allowedLink(content) {

  if(userSession.hasRole('user')){
    var allowedPages = userSession.getAllowedPages();

    if(allowedPages == null || allowedPages === undefined)
      return true;

    if(content !== undefined && content.url !== undefined){
      var slug = content.url; 
      if(allowedPages[slug] !== undefined){
        return allowedPages[slug];
      }
    }
  }

  return true;

}
