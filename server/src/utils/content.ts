import sanitizeHtml from 'sanitize-html';
export const cleanHtml=(value:unknown)=>sanitizeHtml(String(value??''),{allowedTags:sanitizeHtml.defaults.allowedTags.concat(['img','h1','h2','h3','figure','figcaption']),allowedAttributes:{...sanitizeHtml.defaults.allowedAttributes,img:['src','alt','title','width','height','loading'],a:['href','name','target','rel']},allowedSchemes:['http','https','mailto','tel']});

