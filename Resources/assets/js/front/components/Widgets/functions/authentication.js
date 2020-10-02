
/**
 * Helper equivalent to check if content is allowed depending on user rights.
 * allowed_link
 * file : Modules/Extranet/Helpers/allowed_link.php
 * @param {*} content 
 */
export function allowedLink(content) {

  const ROLE_USER = 4;  //FIXME put as constant

  if(userSession.hasRole(ROLE_USER)){ 
    if(content !== undefined && content.url !== undefined){
      var slug = content.url; 
      return userSession.isAllowedSlug(slug);
    }
  }

  return true;

}
