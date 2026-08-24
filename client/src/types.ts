export type Row=Record<string,any>&{id?:number};
export type SiteData={profile:Row;settings:Row;theme:Row;layout:Row;seo:Row;about:Row;menus:Row[];sections:Row[];experiences:Row[];educations:Row[];skills:Row[];certifications:Row[];projects:Row[];services:Row[];achievements:Row[];testimonials:Row[];clients:Row[];socialLinks:Row[];customSections:Row[];resumes:Row[]};
