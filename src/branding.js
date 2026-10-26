import { consultationFees } from '../shared/clinic.mjs';
export { clinicName, consultationFees } from '../shared/clinic.mjs';
export const clinicTagline = 'Helping you move better, recover smarter.';
export const consultationFee = Object.values(consultationFees).join(' / ');
export const logoUrl = `${import.meta.env.BASE_URL}images/heimric-reverie-logo.png`;
export const defaultTheme = 'gold';
// A new preference key makes the updated signature theme the initial choice.
export const themeStorageKey = 'heimric-theme-v2';
