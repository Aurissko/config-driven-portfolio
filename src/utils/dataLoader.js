import rawConfig from '../data/config.json';

// Safety check: Ensure rawConfig is at least an empty object if the import fails
const config = rawConfig || {};

// =====================================================================================
// ANTI-CORRUPTION LAYER (BULLETPROOFING)
// This layer imports data from config.json and safely exports it to the application.
// The empty object {} and array [] fallbacks guarantee that the UI components 
// will never crash (e.g. "cannot read properties of undefined (reading 'map')") 
// even if a user accidentally deletes a whole section from the JSON file.
// =====================================================================================
export const profileData = config.profileData || {
  name: "Name Missing",
  headline: "Headline Missing",
  subheading: "Subheading Missing",
  currentFocus: "Focus Missing",
  githubUrl: "#"
};

export const contactConfig = config.contactConfig || {
  email: "#",
  linkedin: "#"
};
export const tickerStats = Array.isArray(config.tickerStats) ? config.tickerStats : [];
export const skillsConfig = config.skillsConfig || {};
export const projects = Array.isArray(config.projects) ? config.projects : [];
export const skillsRadarData = Array.isArray(config.skillsRadarData) ? config.skillsRadarData : [];
export const experienceData = Array.isArray(config.experienceData) ? config.experienceData : [];
export const references = Array.isArray(config.references) ? config.references : [];